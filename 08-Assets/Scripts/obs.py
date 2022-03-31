import bibtexparser
from bibtexparser.bwriter import BibTexWriter
from bibtexparser.bibdatabase import BibDatabase

import os
import sys
import io
import re
import shutil
import subprocess
import platform
import pyperclip

from urllib.request import quote, urlopen
from datetime import datetime
import time
import json


sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
# 2022-03-16 09:42:53
# 出现print打印字符在cmd的一些错误
# https://blog.csdn.net/jim7424994/article/details/22675759

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


class Convertor():
    '''将论文草稿导出为带参考文献的docx'''
    def __init__(self):
        vault = Obsidian()
        try:
            self.md = vault.inputs[1]
        except:
            self.md = ''
        self.vault = vault.paths['vault']
        self.bib = vault.paths['bib']
        self.cls = vault.paths['csl']
        self.css = vault.paths['css']
        self.template = vault.paths['docx']
        base, ext = os.path.splitext(self.md)
        _, self.name = os.path.split(base)
        self.export_dir = os.path.expanduser(f'~/Desktop/obsidian-export/Export-{self.name}')
        self.new_asset_dir = os.path.join(self.export_dir, self.name)
        if not os.path.exists(self.new_asset_dir):
            os.makedirs(self.new_asset_dir)
        with open(self.md, 'r', encoding='utf-8') as f:
            self.content = f.read()
        # 2022-03-22 19:21:29
        self.bib_worker = BibFileIO()
        self.bib_worker.load(self.bib)

    def toDesktop(self):
        '''先把obsidian附件导出到桌面'''
        files = self.getAssets()
        for src in files:
            base, fname = os.path.split(src)
            dst = self.new_asset_dir + '/'+fname
            shutil.copy(src, dst)
        # 然后修改双链语法标记为符合规范的markdown标记
        content = self.wiki2md()
        self.fp2 = os.path.join(self.export_dir, self.name+'.md')
        with open(self.fp2, 'w', encoding='utf-8') as f:
            f.write(content)

    def wiki2md(self):
        '''
        插图标记转换：将![[??]]转化为![]()格式
        参考文献标记转换：将[[??]]转化为[@??]格式
        '''
        content2 = self.content
        figures = re.findall('\!\[\[(.+)]]', self.content)
        for fig in figures:
            # 2022-03-13 12:07:52
            # 这里有好多种情况，如果是音频和视频，可以转成html标记
            base, ext = os.path.splitext(fig)
            url = f'{self.name}/{fig}'
            if ext in ['.png', '.jpg', '.jpeg', '.gif']:
                link = f'\n![{base}]({url})\n'
            elif ext in ['.mp3', '.m4a']:
                url = quote(url)
                link = f'\n<audio controls src="{url}"></audio>\n'       
            elif ext in ['.mp4', '.webm']:
                url = quote(url)
                link = f'\n<video controls src="{url}"></video>\n'
            else:
                link = f'🔗《{base}》'                         
            content2 = content2.replace(f'![[{fig}]]', link)

        self.citations = re.findall('\[\[\@([a-zA-Z\-]+[0-9]{4}[a-z]?)]]', content2)
        # 2022-03-18 15:17:01
        # 有些 citationkey可能是 @Sograte-Idrissi2019 这种，中间多了一个符号-，
        # 所以前面的正则稍作了修改，注意对这个符号做反义处理

        # 2022-03-22 19:17:37
        # 发现有些时候 item 不在 bib 中时，pandoc 转格式会报错
        # 所以这里加强检验
        self.citations = list(filter(self.insideLibrary, self.citations))
        for item in self.citations:
            if self.insideLibrary(item):
                link = f'[@{item}]'
                content2 = content2.replace(f'[[@{item}]]', link)
        # 最后处理以下多个插入引用
        content2 = content2.replace('];[', ";")
        # 2022-02-14 15:57:44
        # 增加对空格的支持
        content3 = content2.replace('] [', ';')
        # 2022-03-12 10:16:31
        # 如果有引用参考文献，最后一行添加三级标题参考文献
        if len(self.citations)>0:
            content3 += '\n\n### 参考文献\n\n'        
        return content3

    def insideLibrary(self, citekey):
        '''判断citekey是否在bib的library中'''
        if citekey in self.bib_worker.library.keys():
            return True
        else:
            return False

    def getAssets(self):
        fnames = re.findall('\!\[\[(.+)]]', self.content)
        filelist = []
        for root, folders, files in os.walk(self.vault):
            for file in files:
                if file in fnames:
                    filelist.append(os.path.join(root, file))
        return filelist 

    def toDocx(self):
        target = os.path.join(self.export_dir, self.name+'.docx')
        command = f'pandoc --citeproc --from markdown+emoji --bibliography="{self.bib}" --csl="{self.cls}" --reference-doc="{self.template}" "{self.fp2}" -o "{target}"'
        with open(self.export_dir+'/command-docx.txt', 'w', encoding='utf-8') as f:
            f.write(command)
        try:
            ret = subprocess.Popen(command, shell=True, cwd=self.export_dir)           
        except Exception as e:
            print(str(e))
    
    def toHTML(self):
        source = os.path.join(self.export_dir, self.name+'.md')
        assert os.path.exists(source), "源markdown文件未生成！"
        target = os.path.join(self.export_dir, self.name+'.html')
        command = f'pandoc -t html5 -s "{source}" --citeproc --bibliography="{self.bib}" --csl="{self.cls}" --from markdown+emoji --webtex --self-contained -c "{self.css}" -o "{target}"'
        with open(self.export_dir+'/command-html.txt', 'w', encoding='utf-8') as f:
            f.write(command)
        try:
            ret = subprocess.Popen(command, shell=True, cwd=self.export_dir)           
        except Exception as e:
            print(str(e))
    
    def toBib(self):
        '''收集文稿中的citation导出为一个独立的bib文件'''
        new_lib = []
        for key in self.citations:
            if self.insideLibrary(key):
                new_lib.append(self.bib_worker.library[key])
        if len(new_lib)>0:
            self.bib_worker.new_library = new_lib
            fp2 = os.path.join(self.export_dir, f'refs.bib')
            self.bib_worker.save(fp2)


class CrossRef:
    '''根据doi从crossref上获取信息'''
    def __init__(self, doi):
        query = f'https://api.crossref.org/works/{quote(doi)}'
        res = urlopen(query)  # 返回的是json二进制文件
        assert res.getcode()==200, "Internet Connection Error/ Not found in CrossRef!"
        data = json.loads(res.read())
        self.entry = data['message']
        self.doi = doi
        self.query_date = datetime.today().strftime("%Y-%m-%d")

    def get_cited_times(self):
        '''获取此文被引用的次数'''
        return self.entry['is-referenced-by-count']

    def get_title(self):
        '''获取文章标题'''
        return self.entry['title'][0]

    def get_journal_name(self):
        '''获取期刊名称'''
        return self.entry['container-title'][0]

    def get_published_date(self):
        '''获取发表日期'''
        date = datetime.fromtimestamp(self.entry['created']['timestamp']/1000)
        return date.strftime("%Y-%m-%d")

    def get_ref_doi_list(self):
        '''获取参考文献doi列表'''
        ref_list = self.entry['reference']
        # print(ref_list)
        # 2022-03-26 10:36:47
        # 有些ref没有doi，所以直接过滤掉好了
        # ref_list2 = list(map(lambda x:x['DOI'], ref_list))
        ref_list2 = []
        for ref in ref_list:
            if 'DOI' in ref.keys():
                ref_list2.append(ref['DOI'])
        return ref_list2

    def get_bibliography(self):
        '''自定义输出bibliography，包含标题，期刊，日期和引用次数'''
        title = self.get_title()
        journal = self.get_journal_name()
        date = self.get_published_date()
        cited_times = self.get_cited_times()
        ref_url = f'https://doi.org/{ref_doi}'
        line = f'[{title}]({ref_url}), **{journal}**, date: {date}, cited: {cited_times}.'
        return line      


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
                key, value = item.strip().split(': ')
                info[key] = value
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