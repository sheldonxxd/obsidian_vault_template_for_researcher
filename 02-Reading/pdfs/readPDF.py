import os, glob, sys

def write(wks):
    fps = glob.glob(os.path.join(wks, '*.pdf'))
    keys = [os.path.split(x)[-1].split(' ')[0] for x in fps]
    for idx, key in enumerate(keys):
        md_fp = os.path.join(wks, key+'.md')
        if not os.path.exists(md_fp):
            with open(md_fp, 'w', encoding='utf-8') as f:
                pdf_fname = os.path.split(fps[idx])[-1]
                content = f'---\nannotation-target: {pdf_fname}\nalias: {key}\ntags: pdf笔记\n---\n'
                f.write(content)
                print(f'阅读文献[[{key}]]\n,')  # 当被 templater 插件调用时可以直接把内容输入到笔记中

if __name__ == '__main__':
    wks = os.path.abspath(sys.argv[0])
    write(wks)
    
