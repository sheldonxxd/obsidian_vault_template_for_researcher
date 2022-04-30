# -- coding: utf-8 --
import os,sys, shutil, re, io
import base64 
from urllib.request import unquote, urlopen
from obs import Obsidian

def embed(url, rootdir, pattern):
    _, ext = os.path.splitext(url)
    if not url.startswith("http"):
        fp = rootdir + url
        with open(fp, 'rb') as f:
            data = base64.b64encode(f.read())
    else:
        try:
            res = urlopen(url)
            data = base64.b64encode(res.read())
        except Exception as e:
            print(str(e))
    data_str = f'data:image/{ext};base64,'+str(data, 'utf-8')
    content = pattern.replace('(.+)', data_str)
    # 注意跟前面 re.sub 用到的 pattern 保持一致
    return content

def convert(url, rootdir, filename):
    '''
    url: 导出幻灯片html的index.html文件路径
    rootdir: vault库的根目录绝对地址
    filename: PPT源文件文件名
    '''
    wks, _ = os.path.split(url)
    with open(url, 'r', encoding='utf-8') as f:
        content = f.read()
    pattern = '<img src="(.+)" alt="'
    # 寻找插图的标签
    content2 = re.sub(pattern, 
                      lambda x: embed(x.group(1), rootdir, pattern), 
                      content)
    # 覆盖写入原文件
    
    with open(url, 'w', encoding='utf-8') as f:
        f.write(content2)
    # 重命名html文件
    url2 = os.path.join(wks, filename+'.html')
    os.rename(url, url2) 
    # 移动到桌面
    target = os.path.expanduser('~/Desktop/obsidian-slides/')
    if os.path.exists(target):
        shutil.copy(url2, target)
    else:
        shutil.copytree(wks, target)
    shutil.rmtree(wks) 


def main():
    try:
        # 给 obsidian templater 插件cmd调用的接头，参考如下：
        # python ./02-Reading/pdfs/paper2docx.py <% tp.file.path() %>
        vault = Obsidian()
        rootdir = vault.paths['vault']
        # 再获取当前文件的 citation key
        fp = vault.inputs[1]
        base, ext = os.path.splitext(fp)
        _, fname = os.path.split(base)
        url = os.path.join(rootdir, fname, 'index.html')
        assert os.path.exists(url), 'Exported Slides HTML File Not Found!'
        convert(url, rootdir, fname)
    except Exception as e:
        print(str(e))   

def test():
    fp = r"X:\projects\working\01-Diary\本周事务\科普talk之我们要干嘛.md"
    rootdir = r"X:\projects\working"
    base, ext = os.path.splitext(fp)
    _, fname = os.path.split(base)
    url = os.path.join(rootdir, fname, 'index.html')
    assert os.path.exists(url), 'Exported Slides HTML File Not Found!'
    convert(url, rootdir, fname)

if __name__=='__main__':
    # test()
    main()