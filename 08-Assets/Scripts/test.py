import logging

logging.basicConfig(level=logging.DEBUG #设置日志输出格式
                    ,filename="test.log" #log日志输出的文件位置和文件名
                    ,filemode="w" #文件的写入格式，w为重新写入文件，默认是追加
                    ,format="%(asctime)s - %(name)s - %(levelname)-9s - %(filename)-8s : %(lineno)s line - %(message)s" #日志输出的格式
                    # -8表示占位符，让输出左对齐，输出长度都为8位
                    ,datefmt="%Y-%m-%d %H:%M:%S" #时间输出的格式
                    )

############## 测试某个功能 ###################

from crossref import CrossRef

def test(doi):
    a = CrossRef(doi)
    a.connect()
    print(a.get_title())


##############################################

if __name__=='__main__':
    try:
        doi = '10.1088/1361-6420/aa72b2'  # 一个无效的doi
        test(doi)
    except Exception as e:
        logging.exception(e)
