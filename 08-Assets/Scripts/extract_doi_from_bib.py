# -- coding: utf-8 --
from obs import BibFileIO
import pyperclip, os

def main(fp):
    '''
    从bibtex文件（如WOS或者X-MOL下载的）中提取doi
    方便批量导入zotero中
    '''
    worker = BibFileIO()
    worker.load(fp)
    dois = []
    for ckey in worker.library:
        entry = worker.library[ckey]
        if 'doi' in entry.keys():
            doi = entry['doi']
            dois.append(doi)
    content = '\n'.join(dois)
    pyperclip.copy(content)
    print(content)

if __name__=='__main__':
    fname = 'savedrecs'
    fp = os.path.expanduser(f'~/Desktop/{fname}.bib')
    main(fp)