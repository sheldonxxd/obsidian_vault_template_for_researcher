import os, re
from copy import deepcopy

def isMdnote(fp):
    '''判断一个文件是否为mdnote文献笔记'''
    _, fname = os.path.split(fp)
    if fname.startswith('@'):
        return True
    else:
        False

def get_citekey_from_filepath(fp):
    '''mdnotes文件以citekey作为文件名，可以直接提取'''
    _, fname = os.path.split(fp)
    assert fname.startswith('@'), 'Only mdnotes file could be annotated!'
    name, _ = os.path.splitext(fname)
    ckey = name[1:]
    return ckey


def fetch_front_matter(fp):
    '''提取markdown文件中的 front matter 信息为字典'''
    with open(fp, 'r', encoding='utf-8') as f:
        content = f.read()
    parts = content.split('---\n')
    info = {}
    if len(parts)>1:
        part = parts[1].strip()  # 去除最后的\n
        items = part.split('\n')
        # print(items)
        for item in items:
            key, value = item.strip().split(': ')
            info[key] = value
    return info


def removeCodeBlock(content):
    '''去除代码块和行内代码部分内容'''
    it = re.finditer('\`{3}', content)
    cuts = []
    idx = 0
    for match in it:
        if idx%2:
            x = match.start()
        else:
            x = match.end()
        cuts.append(x)
    assert len(cuts)%2==0, "remove code block error!"
    content2 = deepcopy(content)
    N = int(len(cuts)/2)
    for i in range(N):
        content2 = content2.replace(content[cuts[i]:cuts[i+1]], '')
    it2 = re.finditer('\`', content2)
    idx = 0
    cuts = []
    for match in it2:
        if idx%2:
            x = match.start()
        else:
            x = match.end()
        cuts.append(x)
    assert len(cuts)%2==0, "remove code block error!"
    content3 = deepcopy(content2)
    N = int(len(cuts)/2)
    for i in range(N):
        content3 = content3.replace(content2[cuts[i]:cuts[i+1]], '')
    return content3



def find_wiki_links(fp):
    '''提取笔记中所有的wiki双链'''
    with open(fp, 'r', encoding='utf-8') as f:
        content = f.read()
    content = removeCodeBlock(content)
    it1 = re.finditer('\[\[', content)
    xx = []
    for match in it1:
        x = match.end()
        xx.append(x)
    it2 = re.finditer('\]\]', content)
    yy = []
    for match in it2:
        y = match.start()
        yy.append(y)
    names = []
    for idx, x in enumerate(xx):
        name = content[x : yy[idx]]
        names.append(name)
    # 继续对特殊字符进行处理，如|，^，# 这种
    fnames = []
    for k in names:
        match = re.search('[\|\^\#]', k)
        if match:
            fname = k[:match.start()]
        else:
            fname = k
        fnames.append(fname)
    return fnames
