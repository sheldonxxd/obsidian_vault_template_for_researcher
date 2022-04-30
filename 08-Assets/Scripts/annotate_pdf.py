# -- coding: utf-8 --
import os, sys
from obs import Obsidian


def find_pdf(fp):
    '''fp为文献笔记的路径，此函数用于解析文献笔记数据，在pdfs目录中找到对应的pdf文件'''
    _, fname = os.path.split(fp)
    with open(fp, 'r', encoding='utf-8') as f:
        info = f.readlines()
    for line in info:
        if line.startswith('#'):
            title = line[1:].strip()
            # 第一个出现的标题
            break
    # print(title)

    vault = Obsidian()
    wks = os.path.join(vault.paths['asset'], 'pdfs')
    pdfs = []
    for file in os.listdir(wks):
        if file.endswith('pdf'):
            name, ext = os.path.splitext(file)
            part_of_title = name[5:-1]  
            # 前面是year-，后面可能有序号，但同一篇文章的附件最好不要超过9，不然这里要出错
            if title.startswith(part_of_title):
                # print(part_of_title)
                pdfs.append(file)
    # print(pdfs)
    return pdfs

def annotate(fp):
    wks, fname = os.path.split(fp)
    assert fname.startswith('@'), 'Only mdnotes file could be annotated!'
    fname2 = fname[1:]
    name, ext = os.path.splitext(fname2)
    pdfs = find_pdf(fp)
    assert len(pdfs)>=1, 'PDF file not find!'
    if len(pdfs)>9:
        pdfs = pdfs[:9]
        print('Only annotate 9 of all attachments!')
    for idx, pdf in enumerate(pdfs):
        name2 = f'{name}-{idx+1}'
        fname_idx = f'{name2}.md'
        fp_idx = os.path.join(wks, fname_idx)
        assert not os.path.exists(fp_idx), 'Annotation already existed!'
        # 创建 annotation 文件，需要 obsidian annotater 插件配合
        content = f'---\nannotation-target: {pdf}\n---\n\n'
        with open(fp_idx, 'w', encoding='utf-8') as f:
            f.write(content) 
    # 在原有文献笔记末尾追加pdf annotator行
    content2 = "\n### Attachments\npdf:: "
    for idx, pdf in enumerate(pdfs):
        name2 = f'{name}-{idx+1}'       
        content2 += f'[[{name2}]] '
        # with open(fp, 'a', encoding='utf-8') as f:
        #     f.write(content2)
        # templator调用时可以直接打印到active page 上。
    print(content2)


if __name__=='__main__':
    # fp = r"X:\projects\working\02-Reading\pdfs\@Zhang2022.md"
    # fp = r"X:\projects\working\02-Reading\pdfs\@Stehr2021a.md"
    # # # find_pdf(fp)
    # annotate(fp)

    try:
        # 给 obsidian templater 插件cmd调用的接头，参考如下：
        # python ./02-Reading/pdfs/paper2docx.py <% tp.file.path() %>
        fp = sys.argv[1]
        annotate(fp)
    except Exception as e:
        print(str(e))   

    # 2022-03-22 19:58:50 complete