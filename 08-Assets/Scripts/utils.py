import os, re

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
            cuts = item.split(":")
            key = cuts[0]
            value = ':'.join(cuts[1:])
            info[key] = value.strip()
    return info



