# -- coding: utf-8 --
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
            # print(fp)
            target = fetch_destination(fp)
            if isShortLink(target):
                # 如果是符合格式的短码，解析真实相对路径
                target = shortLinkDecode(rootdir, target)
            if len(target)>1:
                # 如果为空也不移动
                base = os.path.join(rootdir, target)
                if os.path.exists(base):
                    shutil.move(fp, base)
                    print(f'- [[{name}]]')

def isShortLink(target):
    '''
    shortlink：文件夹前面的唯一数字前缀的组合
    如 03-01 就代表是 03-Projects目录下的一个子目录，其名称前缀是01
    注意前缀不要超过2个字符，前缀使用-连接，这样可以得到类似MAC地址的效果
    '''
    assert '-' in target, "destination is not a valid path!"
    parts = target.split('-')  # 一级目录必包含 -
    f2 = parts[1]
    if len(f2)>2:
        # 一级目录即便是00-MOC，MOC的长度也是3
        return False
    else:
        return True

def shortLinkDecode(rootdir, target):
    parts = target.split('-')
    layers = []
    rdir = rootdir
    for p in parts:
        paths = os.listdir(rdir)
        fullname = []
        for path in paths:
            if path.startswith(f'{p}-'):
                sdir = os.path.join(rdir, path)
                if os.path.isdir(sdir):
                    # 避免以序号开头的md文件造成干扰
                    fullname.append(path)
                    rdir = sdir
        # 注意数字前缀必须是同目录中唯一的
        assert len(fullname)==1, "Folder prefix short code error!"
        layers.append(fullname[0])
    full_path = '/'.join(layers)
    return full_path


def test_shortLink():
    rootdir = r"X:\projects\working"
    # target = "03-6"
    target = "10-本科毕设"
    if isShortLink(target):
        target = shortLinkDecode(rootdir, target)
    print(target)   


def test_move():
    # shutil能够把文件移动一个另一个文件夹内
    fp1= r"C:\Users\sheldon\Desktop\细菌运动-4.gif"
    fp2 = r"C:\Users\sheldon\Desktop\新建文件夹"
    shutil.move(fp1, fp2)

if __name__=='__main__':
    # test_fetch_front_matter()
    # test_move()
    # test_shortLink()

    main()