# -- coding: utf-8 --
from obs import Obsidian, BibFileIO
from utils import isMdnote, get_citekey_from_filepath
from crossref import CrossRef
import os, json

def main():
    vault = Obsidian()
    try:
        fp = vault.inputs[1]
        # fp = r"X:\projects\working\02-Reading\mdnotes\@Liu2022b.md"
    except:
        print("No Filepath input!")
    assert isMdnote(fp), "Not Mdnote file!"
    ckey = get_citekey_from_filepath(fp)

    bibfile = vault.paths['bib']
    worker = BibFileIO()
    worker.load(bibfile)
    info = worker.library[ckey]
    doi = info['doi']
   
    xxd = CrossRef(doi)
    base, ext = os.path.splitext(fp)
    json_cache_file = base + '.json'
    if os.path.exists(json_cache_file):
        with open(json_cache_file, 'r') as fj:
            xxd.entry = json.load(fj)
    else:
        xxd.connect()
        xxd.save(json_cache_file)

    if xxd.entry is not None:
        data = {
            'journal': xxd.get_journal_name(),
            'publish_date': xxd.get_published_date(),
            'cited_times': xxd.get_cited_times(),
            'queryAt': xxd.query_date,
        }
    else:
        data = {
            'journal': info['journaltitle'],
            'publish_date': info['date'],
            'cited_times': 0,
            'queryAt': xxd.query_date,
        }        
    content = "\n### CrossRef Statistics"
    for key in data:
        content += f"\n{key}:: {data[key]}"

    print(content)

if __name__ == '__main__':
    main()

