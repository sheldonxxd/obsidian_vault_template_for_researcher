from obs import Obsidian, BibFileIO, Page
import os, re, shutil
import subprocess
from urllib.request import quote

class Convertor():
    '''将论文草稿导出为带参考文献的docx'''
    def __init__(self, test_fp="path/to/md"):
        vault = Obsidian()
        try:
            self.md = vault.inputs[1]
        except:
            self.md = test_fp
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

    def getWikiLinks(self):
        '''收集在[[something]]中的内容'''
        parts = self.content.split('![[')
        outlinks = []
        for part in parts:
            if ']]' in part:
                cut = part.split(']]')[0]
                outlinks.append(cut)
        return outlinks        

    def wiki2md(self):
        '''
        插图标记转换：将![[??]]转化为![]()格式
        参考文献标记转换：将[[??]]转化为[@??]格式
        '''
        content2 = self.content
        figures = self.getWikiLinks()
        for fig in figures:
            fig2 = fig
            # 2022-03-13 12:07:52
            # 这里有好多种情况，如果是音频和视频，可以转成html标记
            if "|" in fig:
                # wiki双链中存在一些参数控制，比如 
                # ![[img.png|300]]: 图片显示宽度为 300
                # ![[img.png#center|fig1. this is caption|400]]：图片居中，有caption，宽度400
                # ![[img.png#center|fig1. this is caption]]：图片居中，有caption
                img_width = 400
                fig_caption = ""
                fig_parts = fig.split("|")
                if len(fig_parts)==3:
                    fig, fig_caption, img_width = fig_parts
                    fig, position = fig.split("#")
                elif len(fig_parts)==2:
                    fig, residual = fig_parts
                    if "#" in fig:
                        fig, position = fig.split("#")
                        fig_caption = residual
                    else:
                        img_width = residual
                # 这种情况直接就是图片的处理，但是得用 html 标签
                if len(fig_caption)==0:
                    fig_caption, ext = os.path.splitext(fig)
                url = quote(self.name+'/'+fig)
                # link = f'\n<img alt="{fig_caption}" src="{url}" width="{img_width}">\n'
                link = f'\n![{fig_caption}]({url})\n'
            else:
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
            content2 = content2.replace(f'![[{fig2}]]', link)

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
    
    def fetch_iframes(self, text):
        '''从文本中提取iframe'''
        pattern = '\<iframe.+>\<\/iframe\>'
        iframes = re.findall(pattern, text)
        return iframes

    def fetch_srcs(self, iframe):
        '''从iframe代码中提取src'''
        pattern = 'src=\"(.+)\"'
        srcs = re.findall(pattern, iframe)
        return srcs

    def getAssets(self):
        fnames = []
        figures = self.getWikiLinks()
        # print(figures)
        for fig in figures:
            r = re.search('[\|\^\#]', fig)
            if r:
            # 2022-05-13 08:38:29
            # 注意如果包含特殊符号则处理一下并更新变量
                fig = fig[:r.start()]
            fnames.append(fig)
        filelist = []
        for root, folders, files in os.walk(self.vault):
            for file in files:
                if file in fnames:
                    filelist.append(os.path.join(root, file))
        # print(filelist)
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
        self.ex_html = os.path.abspath(target)
    
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