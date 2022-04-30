# -- coding: utf-8 --
from obs import Obsidian, Page
from utils import png2jpg

def main():
    vault = Obsidian()
    fp = vault.inputs[1]
    note = Page(fp)
    idx = 0
    for f in note.outlinks:
        if f.endswith('.png'):
            f2 = png2jpg(f)
            idx += 1
    print(f"\n\n%%共{idx}张png图片已经转化为jpg格式，请使用`Ctrl+H`替换所有的`.png`为`.jpg`。%%")

if __name__=='__main__':
    main()
