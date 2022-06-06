# -- coding: utf-8 --
import bibtexparser
from bibtexparser.bwriter import BibTexWriter
from bibtexparser.bibdatabase import BibDatabase

import os
import sys
import io
import re
import shutil
import platform

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

class Obsidian:
    '''
    跟 templater 插件交互的基本接口
    主要定义了一些重要的路径
    '''
    def __init__(self):
        vdir = self.get_vault_rootdir()
        sdir = os.path.join(vdir, '08-Assets', 'Scripts')
        self.inputs = sys.argv
        self.paths = {
            'vault': vdir,
            'reading': os.path.join(vdir, '02-Reading'),
            'project': os.path.join(vdir, '03-Projects'),
            'asset': os.path.join(vdir, '08-Assets'),
            'script': sdir,
            'csl': os.path.join(sdir, 'acs-nano.csl'),
            'bib': os.path.join(sdir, 'MyLibrary.bib'),
            'docx': os.path.join(sdir, 'template.docx'),
            'css': os.path.join(sdir, 'markdown.css'),
        }
        
    def get_vault_rootdir(self):
        script_path = os.path.abspath(sys.argv[0])  
        lib_path, script_fname = os.path.split(script_path)
        rootdir = lib_path.split('08-Assets')[0]
        return rootdir 


class BibFileIO:
    def __init__(self):
        '''bib文件读写基类'''
        self.db = BibDatabase()
        self.writer = BibTexWriter()
        self.library = {}
        self.new_library = []  # 用于装修改后的entries

    def load(self, fp, test=False):
        '''
        load the library.bib
        '''
        with open(fp, encoding='utf-8') as bibtex_file:
            bib_database = bibtexparser.load(bibtex_file)
        self.library = bib_database.entries_dict
        if test:
            print('{} entries loaded!'.format(len(self.library)))
        
    def save(self, fp2, test=False):
        '''
        https://bibtexparser.readthedocs.io/en/master/tutorial.html
        '''
        db = self.db
        db.entries = self.new_library  #注意这里为list
        writer = self.writer
        with open(fp2, 'w', encoding='utf-8') as bibfile:
            # 注意编码是 utf-8，默认的 gbk 会出错
            bibfile.write(writer.write(db))
        if test:
            print('[Save to] {}'.format(fp2))
    
    def ckey2doi(self):
        '''新建一个字典数据，将doi作为key，cite key 作为 vaule'''
        self.doi2ckey = {}
        for ckey in self.library:
            entry = self.library[ckey]
            if 'doi' in entry.keys():
                doi = self.library[ckey]['doi']
                self.doi2ckey[doi] = ckey


class Page:
    '''针对obsidian中提供的page进行处理'''
    def __init__(self, fp):
        self.vault = Obsidian()
        self.fp = fp
        with open(self.fp, 'r', encoding='utf-8') as f:
            self.content = f.read()
        # 按照模板，大部分都是存在front-matter的。
        self.front_matter, self.main_text = self.split_front_matter()
        # front_matter 为字典， main_text 为字符串
        self.outlinks = self.getOutLinkFiles()
        self.relative_outlinks = self.getOutLinks()

    def split_front_matter(self):
        '''分离提取front_matter'''
        parts = self.content.split('---\n')
        info = {}
        main_text = self.content
        if len(parts)>1:
            part = parts[1].strip()  # 去除最后的\n
            items = part.split('\n')
            # print(items)
            for item in items:
                key, value = item.split(': ')
                info[key] = value.strip()
            main_text = '---\n'.join(parts[1:])
        return info, main_text

    def getOutLinkFiles(self):
        fnames = self.getOutLinks()
        filelist = []
        rootdir = self.vault.paths['vault']
        for root, folders, files in os.walk(rootdir):
            for file in files:
                fname, ext = os.path.splitext(file)
                # markdown文件在 fnames 中是没有后缀的
                if fname in fnames or file in fnames:
                    filelist.append(os.path.join(root, file))
        return filelist
    
    def getOutLinks(self):
        '''不怕双链的一半存在于inline code中的搞法'''
        parts = self.main_text.split('[[')
        outlinks = []
        for part in parts:
            if ']]' in part:
                cut = part.split(']]')[0]
                r = re.search('[\|\^\#]', cut)
                if r:
                    cut = cut[:r.start()]
                outlinks.append(cut)
        return outlinks


class Project:
    '''针对project进行处理'''
    def __init__(self, fp):
        '''
        fp: 课题项目文件夹根目录内的文件路径
        '''
        self.choosed_file = fp
        self.vault = Obsidian()
        self.project_rootdir = self.vault.paths['project']
        # print(self.project_rootdir)
        # print(self.choosed_file)
        assert '03-Projects' in self.choosed_file, "The active file is not inside a project subfolder!"
        _, relative_path = self.choosed_file.split('03-Projects')
        rpath = os.path.normcase(relative_path)
        sysinfo = platform.system()
        if sysinfo=='Windows':
            project_name = rpath.split('\\')[1]
        else:
            project_name = rpath.split('/')[1]
        self.project_name = project_name
        self.project_dir = os.path.join(self.project_rootdir, self.project_name)
        self.filelist = self.getFileList()
        self.outFileList = self.getOutLinkFiles()
        self.filelist.extend(self.outFileList)
        self.filelist = list(set(self.filelist))  # 去重

    def getFileList(self):
        '''获取本项目文件内所有文件的地址列表'''
        rootdir = self.project_dir
        filelist = []
        for root, folders, files in os.walk(rootdir):
            for file in files:        
                fname, ext = os.path.splitext(file)
                if ext == '.md':
                    # 仅收集markdown文件
                    filelist.append(os.path.join(root, file))
        return filelist

    def getOutLinkFiles(self):
        '''
        收集本project所有笔记中产生的外链，
        包括笔记和附件并收集路径，
        注意外链笔记的外链并不做进一步收集。
        '''
        filelist2 = []
        for fp in self.filelist:
            p = Page(fp)
            filelist2.extend(p.outlinks)
        return filelist2

    def duplicate_vault_template(self):
        '''将valut库模板所需相关文件先复制过去'''
        # total_ = []
        wks = self.vault.paths['vault']
        self.new_vault = os.path.expanduser(f'~/Desktop/Obsidian-Project-{self.project_name}/')
        assert not os.path.exists(self.new_vault), "Already exported!"
        target = self.new_vault
        # 复制 .obsidian, 00-MOC 和 09-Templates 目录和内部全部内容
        full = ['.obsidian', 
                '00-MOC', 
                '09-Templates', 
                '08-Assets/Scripts']
        for fp in full:
            shutil.copytree(src=wks+'/'+fp, dst=target+'/'+fp)
            # total_.append(target+'/'+fp)
        # 复制其它空目录并填充占位文件
        space = ['01-Diary/日志存档', 
                '01-Diary/周小结', 
                '01-Diary/月总结', 
                '01-Diary/本周事务',
                '02-Reading/mdnotes',
                '02-Reading/1-summary',
                '02-Reading/2-topics',
                '02-Reading/3-people',
                '03-Projects', 
                '05-Life/01-Album',
                '06-Cards', 
                '07-Archives',
                '08-Assets/Excalidraw',
                '08-Assets/MindMap',
                '08-Assets/pdfs',
                ]
        for this in space:
            sdir = os.path.join(target, this)
            os.makedirs(sdir, exist_ok=True)
            with open(sdir+'/.keep', 'w', encoding='utf-8') as f:
                f.write('this file is created for keeping the folder after git.')
            # total_.append(sdir)
        # for idx, t in enumerate(total_):
        #     print(f'Copied [{idx+1}]: {t}.')

    def export_project(self):
        '''得到了该项目所有相关的文件列表后导出到桌面形成新的vault'''
        for fp in self.filelist:
            fp2 = fp.replace(self.vault.paths['vault'], self.new_vault)
            base = os.path.dirname(fp2)
            if not os.path.exists(base):
                os.makedirs(base, exist_ok=True)
            shutil.copy(fp, fp2)