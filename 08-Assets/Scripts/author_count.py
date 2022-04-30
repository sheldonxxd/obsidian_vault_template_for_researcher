# -- coding: utf-8 --
from obs import Obsidian, BibFileIO
from utils import fetch_front_matter
from collections import Counter

def main():
    vault = Obsidian()
    # 从大牛通讯录中读取要显示的数量
    fp = vault.inputs[1]
    info = fetch_front_matter(fp)
    assert 'top_n' in info.keys(), "Invalid page!"
    top_n = int(info['top_n'])
    # 读取bib文献库
    bib = vault.paths['bib']
    xxd = BibFileIO()
    xxd.load(bib)
    library = xxd.library
    data = []
    n = 0
    for key in library:
        entry = library[key]
        if 'author' in entry.keys():
            value = entry['author']
            if ' and ' in value:
                # 注意空格，否则 ander会被cut
                authors = value.split(' and ')
            else:
                # 有可能只有一个作者
                authors = [value.strip()]
            authors = [x.strip() for x in authors]
            # 去除多余的空格
            data.extend(authors)
            # 收集作者列表
    res = Counter(data)
    rank = res.most_common()
    # 排序
    assert top_n<len(rank), "Out of range!"
    for i in range(top_n):
        try:
            item = rank[i]
            name, count = item
            if ',' in name:
                # zotero默认存放的是 last name 在前
                last_name, first_name = name.split(', ')
            else:
                # Zotero中Jasmine（茉莉花）插件合并姓名
                # 2022-04-30 11:57:12
                last_name = name
                first_name = ''
            print(f'[[{first_name} {last_name}]] : {count}')
        except Exception as e:
            print(item)
            print(str(e))
            continue


if __name__=='__main__':
    main()
