import io, os, sys, shutil
from obs import Obsidian
from utils import fetch_front_matter

def isCompleted(fp):
    try:
        info = fetch_front_matter(fp)
        if info['status'] == 'complete':
            return True
        else:
            return False
    except:
        return False

def fetch_destination(fp):
    info = fetch_front_matter(fp)
    return info['destination']

def main():
    '''
    解析「本周事务」中笔记的front-matter信息
    根据 project-folder 和 status 等情况
    将已完成的内容转移到指定的 project子目录
    '''
    # 获取obsidian 根目录
    vault = Obsidian()
    rootdir = vault.paths['vault']
    this_week = rootdir + '/01-Diary/本周事务'
    files = os.listdir(this_week)
    for file in files:
        name, ext = os.path.splitext(file)
        fp = os.path.join(this_week, file)
        if isCompleted(fp):
            target = fetch_destination(fp)
            if len(target)>1:
                # 如果为空也不移动
                base = os.path.join(rootdir, target)
                if os.path.exists(base):
                    shutil.move(fp, base)
                    print(f'- [[{name}]]')
            

def test_move():
    # shutil能够把文件移动一个另一个文件夹内
    fp1= r"C:\Users\sheldon\Desktop\细菌运动-4.gif"
    fp2 = r"C:\Users\sheldon\Desktop\新建文件夹"
    shutil.move(fp1, fp2)


if __name__=='__main__':
    # test_fetch_front_matter()
    # test_move()
    main()