# -- coding: utf-8 --
from obs import Obsidian, BibFileIO, CrossRef
from utils import isMdnote, get_citekey_from_filepath

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
    bus = CrossRef(doi)
    if bus.entry is not None:
        data = {
            'journal': bus.get_journal_name(),
            'publish_date': bus.get_published_date(),
            'cited_times': bus.get_cited_times(),
            'queryAt': bus.query_date,
        }
    else:
        data = {
            'journal': info['journaltitle'],
            'publish_date': info['date'],
            'cited_times': 0,
            'queryAt': bus.query_date,
        }        
    content = "\n### CrossRef Statistics"
    for key in data:
        content += f"\n{key}:: {data[key]}"

    print(content)

if __name__ == '__main__':
    main()

