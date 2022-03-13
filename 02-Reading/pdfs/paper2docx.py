# coding=utf-8
import os, shutil, re, subprocess, sys
import bibtexparser
from bibtexparser.bwriter import BibTexWriter
from bibtexparser.bibdatabase import BibDatabase
# 2022-03-13 12:07:30
# 使用quote解决中文路径的url转码
from urllib.request import quote  

class Convertor():
    '''将论文草稿导出为带参考文献的docx'''
    def __init__(self, vault, fp, bib, style, template, css):
        self.vault = vault
        self.md = fp
        self.bib = bib
        self.cls = style
        self.css = css
        self.template = template
        base, ext = os.path.splitext(fp)
        _, self.name = os.path.split(base)
        self.export_dir = os.path.expanduser(f'~/Desktop/Export/Export-{self.name}')
        self.new_asset_dir = os.path.join(self.export_dir, self.name)
        if not os.path.exists(self.new_asset_dir):
            os.makedirs(self.new_asset_dir)
        with open(fp, 'r', encoding='utf-8') as f:
            self.content = f.read()

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

        self.citations = re.findall('\[\[\@([a-zA-Z]+[0-9]{4}[a-z]?)]]', content2)
        for item in self.citations:
            link = f'[@{item}]'  # 多一个空格
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
        command = f'pandoc -t html5 -s {source} --citeproc --bibliography="{self.bib}" --csl="{self.cls}" --from markdown+emoji --webtex --self-contained -c {self.css} -o {target}'
        with open(self.export_dir+'/command-html.txt', 'w', encoding='utf-8') as f:
            f.write(command)
        try:
            ret = subprocess.Popen(command, shell=True, cwd=self.export_dir)           
        except Exception as e:
            print(str(e))
    
    def toBib(self):
        '''收集文稿中的citation导出为一个独立的bib文件'''
        worker = BibFileIO()
        worker.load(self.bib)
        new_lib = []
        for key in self.citations:
            new_lib.append(worker.library[key])
        worker.new_library = new_lib
        fp2 = os.path.join(self.export_dir, f'refs.bib')
        worker.save(fp2)

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


if __name__=='__main__':
    try:
        script_path = os.path.abspath(sys.argv[0])  
        # 这里要使用绝对路径，否则后面pandoc转的时候找资源会使用 export_dir 的相对路径
        lib_path, script_fname = os.path.split(script_path)
        vault = lib_path.split('02-Reading')[0] # obsidian 根目录
        bib = f"{lib_path}/MyLibrary.bib"
        style = f"{lib_path}/acs-nano.csl"
        template = f"{lib_path}/template.docx"
        css = f"{lib_path}/markdown.css"
        fp = sys.argv[1]
        xxd = Convertor(vault, fp, bib, style, template, css)
        xxd.toDesktop()
        xxd.toDocx()
        xxd.toBib()
        xxd.toHTML()
        # print(lib_path)
    except Exception as e:
        print(str(e))    
