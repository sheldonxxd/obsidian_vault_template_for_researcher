import os, re
# from PIL import Image

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
            key, value = item.split(': ')
            info[key] = value.strip()
    return info

# def png2jpg(fp):
#     '''
#     将比较大的png图片转成jpg格式
#     https://blog.csdn.net/weixin_40446557/article/details/104059660
#     '''
#     fname, ext = os.path.splitext(fp)
#     fp2 = fname + '.jpg'
#     assert ext=='.png', "not png file input!"
#     try:
#         img = Image.open(fp)
#         if img.mode=='RGBA':
#             r,g,b,a = img.split()
#             img = Image.merge("RGB", (r,g,b))
#         img.convert('RGB').save(fp2, quality=70)
#     except Exception as e:
#         print(str(e))
#     return fp2


