# coding=utf-8

from obs import Convertor

def main():
    try:
        xxd = Convertor()
        xxd.toDesktop()
        xxd.toDocx()
        xxd.toBib()
        xxd.toHTML()
    except Exception as e:
        print(str(e)) 

def test():
    fp = r"X:\projects\working\01-Diary\本周事务\进一步阅读原文.md"
    try:
        xxd = Convertor()
        xxd.md = fp
        xxd.toDesktop()
        xxd.toDocx()
        xxd.toBib()
        xxd.toHTML()
    except Exception as e:
        print(str(e)) 

if __name__=='__main__':
    main() 
    # test()  
    # 2022-03-22 19:47:06 complete

