# -- coding: utf-8 --
from obs import Obsidian, BibFileIO
from utils import get_citekey_from_filepath, isMdnote
import re, os, json
from crossref import CrossRef

def main():
    vault = Obsidian()
    fp = vault.inputs[1]
    # fp = r"X:\projects\working\02-Reading\mdnotes\@Liu2022b.md"
    hwj = BibFileIO()
    hwj.load(vault.paths['bib'])
    if isMdnote(fp):
        ## 如果是 mdnote 文件笔记，则补全其参考文献
        # 获取文献的doi
        ckey = get_citekey_from_filepath(fp)
        hwj.ckey2doi()
        existed_doi_dict = hwj.doi2ckey
        entry = hwj.library[ckey]
        doi = entry['doi']
        
        # 准备向crossref发起查询
        xxd = CrossRef(doi)
        base, ext = os.path.splitext(fp)
        json_cache_file = base + '.json'
        if os.path.exists(json_cache_file):
            with open(json_cache_file, 'r') as fj:
                xxd.entry = json.load(fj)
            # print("Found Cached Record!")
        else:
            # 如果本地不存在crossref的查询缓存，则连接crossref站点获取数据并保存缓存
            xxd.connect()
            xxd.save(json_cache_file)
        
        # 获取引文列表或打印
        assert xxd.entry is not None, "CrossRef Connection Error!"
        refs = xxd.get_ref_doi_list()
        count = 0
        print('### References\n')
        for idx, ref_doi in enumerate(refs):
            if ref_doi in existed_doi_dict.keys():
                # 如果引文已经存在于本地文库，则替换为双链
                line = f'{idx+1}. [[@{existed_doi_dict[ref_doi]}]]'
                # 注意 mdnotes带有 @前缀
                count += 1
            else:
                ref_url = f'https://doi.org/{ref_doi}'
                line = f'{idx+1}. [{ref_doi}]({ref_url})'
            print(line)
        print(f'\n Currently {count} references inside library! @{xxd.query_date}')
    else:
        ## 如果是其它文件，比如草稿，则解析正文内容获取 citation key
        with open(fp, 'r', encoding='utf-8') as f:
            content = f.read()
        citations = re.findall('\[\[\@([a-zA-Z\-]+[0-9]{4}[a-z]?)]]', content)
        print('### 参考文献\n')
        for item in citations:
            ref = hwj.library[item]
            title = ref['title']
            title = title.replace('{{','').replace('}}','')
            title = re.sub(pattern="{.+{", repl="", string=title)
            doi = ref['doi']
            doi_url = f'https://doi.org/{doi}'
            try:
                journal = ref['journaltitle']
            except:
                journal = 'Book'
            date = ref['date']
            line = f'- {item} >> [{title}]({doi_url}), **{journal}**, date:{date}.'
            print(line)

if __name__=='__main__':
    main()