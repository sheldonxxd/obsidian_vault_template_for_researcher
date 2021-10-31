import os, sys, pyperclip

def fetch(test=False):
    '''
    在zotero中批量导出选中的多个条目的citationkey（需要better bibtex插件）到桌面，
    注意就使用默认命名“导出的条目.txt”，然后在obsidian中运行此代码实现内容抓取
    '''
    # fp = os.path.expanduser('~/Desktop/导出的条目.txt')
    script_path = sys.argv[0]
    lib_path, script_fname = os.path.split(script_path)
    fp = os.path.join(lib_path, '导出的条目.txt')
    if not os.path.exists(fp):
        print("用户桌面不存在文件：导出的条目.txt")
    else:
        with open(fp, 'r', encoding='utf-8') as f:
            content = f.read()
            # \cite{key1,key2,...,keyN}
            keys = content[6:-1].split(',')
            if test:
                print(keys)
        content2 = '\n'.join([f'- [[@{k.strip()}]] ' for k in keys])
        # 除了逗号之外，还有空格
        if test:
            print(content2)
        pyperclip.copy(content2)
        # 将内容复制到粘贴板
        os.remove(fp)
        # 清除导出的条目临时文件

if __name__=='__main__':
    try:
        fetch()
    except Exception as e:
        print(str(e))    
