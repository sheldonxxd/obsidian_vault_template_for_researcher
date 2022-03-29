
from obs import BibFileIO, Obsidian
import os, sys, io, pyperclip
import requests
from bs4 import BeautifulSoup
from utils import get_citekey_from_filepath

def fetch_info(ckey, bibfile):
    '''
    ckey: 其实就是citation key，如 xxd2020
    bibfile: bib文件地址
    '''
    worker = BibFileIO()
    worker.load(bibfile)
    info = worker.library[ckey]
    doi = info['doi']
    info2 = fetch_from_pubmed(doi)
    if type(info2) is dict:
        content = "\n### PubMed Statistics"
        for key in info2:
            content += f'\n{key}:: {info2[key]}'
    else:
        # print("pubmed not found!")
        # print(info)
        today = datetime.today().strftime("%Y-%m-%d")
        info3 = {'cited_times': fetch_from_bing(doi),
                'journal':journalname(info), 
                'publish_date': info['date'], 
                'queryAt': f'{today}',
                }
        content = "\n### Zotero Statistics"
        for key in info3:
            content += f'\n{key}:: {info3[key]}'
    print(content)
    pyperclip.copy(content)

def journalname(info):
    assert type(info) is dict, "entry error!"
    if 'shortjournal' in info.keys():
        return info['shortjournal']
    elif 'journaltitle' in info.keys():
        return info['journaltitle']
    else:
        return 'unknown'

def fetch_from_bing(doi):
    '''目前bing学术算是国内能够愉快访问并替代google的选择了'''
    bing_url = 'https://cn.bing.com/academic'
    query = f'{bing_url}/search?q={quote(doi)}'
    explorers = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'AppleWebKit/537.36 (KHTML, like Gecko)',
        'Chrome/98.0.4758.102',
        'Safari/537.36',
        'Edg/98.0.1108.62',
    ]
    headers = {'user-agent':' '.join(explorers)}
    r = requests.get(url=query, headers=headers)
    if r.status_code != 200:
        return 0
    soup = BeautifulSoup(r.content)
    try:
        aca_content = soup.find(class_='aca_main')
        aca_list = aca_content.find_all(class_='b_hPanel')
        cited_times = aca_list[-2].find(class_='aca_content').text.strip()
    except:
        cited_times = 0
    return cited_times


def fetch_from_pubmed(doi):
    pubmed_url = 'https://pubmed.ncbi.nlm.nih.gov'
    query = f'{pubmed_url}/?term={quote(doi)}'
    explorers = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'AppleWebKit/537.36 (KHTML, like Gecko)',
        'Chrome/98.0.4758.102',
        'Safari/537.36',
        'Edg/98.0.1108.62',
    ]
    headers = {'user-agent':' '.join(explorers)}
    r = requests.get(url=query, headers=headers)
    # print(type(r.status_code), r.status_code)
    if r.status_code != 200:
        # 如果网络不好或者断线，也提取zotero中信息
        return False
    soup = BeautifulSoup(r.content)
    # assert not soup.find(class_='altered-search-explanation query-error-message'), "Not found in PubMed!"
    if soup.find(class_='altered-search-explanation query-error-message'):
        # 2022-03-17 17:12:07
        # 有时候文章没有被收录到PubMed，其中一些信息就还是从zotero中提取吧
        return False
    try:
        cited_times = soup.find(id='citedby').find(class_='amount').text
    except:
        cited_times = 0
    source = soup.find(class_='article-source')
    journal = source.find(class_='journal-actions dropdown-block').find('button').text.strip()
    date, other = source.find(class_='cit').text.split(';')
    issue, page = other.split(':')
    try:
        # 2022-03-16 08:51:16
        # 发现有的是没有地址的
        affiliation = soup.find(class_='affiliation-link')['title']
    except:
        affiliation = '-'
    authors = soup.find_all(class_='authors-list-item')
    author1 = authors[0].find(class_='full-name').text
    author2 = authors[-1].find(class_='full-name').text
    author2_url = pubmed_url + authors[-1].find(class_='full-name')['href']
    pmid = soup.find(class_='identifier pubmed').find(class_='current-id').text
    pmurl = pubmed_url +'/'+ pmid +'/'
    today = datetime.today().strftime("%Y-%m-%d")
    info = {'cited_times': cited_times,
            'journal':journal, 
            'publish_date': date, 
            'issue':issue, 
            'page':page[:-1],
            'fisrt_author': author1,
            'corresponding_author': f'[{author2}]({author2_url})',
            'address': affiliation, 
            'pubmed_id': f'[{pmid}]({pmurl})',
            'queryAt': f'{today}',
            }
    return info

def fetch_from_crossref(doi):
    query = f'https://api.crossref.org/works/{quote(doi)}'
    res = urlopen(query)  # 返回的是json二进制文件
    assert res.getcode()==200, "Internet Connection Error/ Not found in CrossRef!"
    data = json.loads(res.read())
    entry = data['message']
    info = {}
    info['title'] = entry['title'][0]
    info['fisrt_author'] = entry['author'][0]['given']+ ' ' + entry['author'][0]['family']
    cauthor = entry['author'][-1]['given']+ ' ' + entry['author'][-1]['family']
    curl = entry['author'][-1]['ORCID']
    cis = entry['author'][-1]['authenticated-orcid']
    if cis:
        co = f'[{cauthor}]({curl})'
    else:
        co = cauthor
    info['corresponding_author'] = co
    info['address'] = entry['author'][0]['affiliation'][0]['name']
    info['journal'] = entry['container-title'][0]
    info['type'] = entry['type']
    date = datetime.fromtimestamp(entry['created']['timestamp']/1000)
    info['publish_date'] = date.strftime("%Y-%m-%d")
    info['volume'] = entry['volume']
    info['issue'] = entry['issue']
    info['page'] = entry['page']
    info['doi'] = entry['DOI']
    info['cited_times'] = entry['is-referenced-by-count']
    info['queryAt'] = datetime.today().strftime("%Y-%m-%d")
    for key in info:
        print(f'{key}:: {info[key]}')


def get_vault_rootdir():
    script_path = os.path.abspath(sys.argv[0])  
    lib_path, script_fname = os.path.split(script_path)
    rootdir = lib_path.split('08-Assets')[0]
    return rootdir 


def main():
    try:
        vault = Obsidian()
        bibfile = vault.paths['bib']
        # 再获取当前文件的 citation key
        fp = vault.inputs[1]
        ckey = get_citekey_from_filepath(fp)
        fetch_info(ckey, bibfile)
    except Exception as e:
        print(str(e))    

def test():
    ckey = 'Stockhammer2021'
    bibfile = r"X:\projects\working\02-Reading\pdfs\MyLibrary.bib"
    fetch_info(ckey, bibfile)

def test_crossref():
    doi = '10.1038/s41467-021-23951-x'
    fetch_from_crossref(doi)

if __name__=='__main__':
    main()
    # test()
    # test_crossref()
    # 2022-03-22 19:53:27 complete