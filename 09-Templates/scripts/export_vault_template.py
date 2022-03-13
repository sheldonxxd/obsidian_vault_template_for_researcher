import os, shutil

def export_vault_template(wks):
    '''
    此函数用于将我当下使用的 obsidian vault 导出为一个模板
    仅仅拷贝一些模板，query以及插件主题和配置文件，去除个人笔记内容。
    '''

    total_ = []
    # 在桌面新建一个空白vault目录
    target = os.path.expanduser('~/Desktop/my_vault_template')
    total_.append(target)
    if not os.path.exists(target):
        os.mkdir(target)

    # 复制 .obsidian, 00-MOC 和 09-Templates 目录和内部全部内容
    full = ['.obsidian', '00-MOC', '09-Templates']
    for fp in full:
        shutil.copytree(src=wks+'/'+fp, dst=target+'/'+fp)
        total_.append(target+'/'+fp)
    
    # 复制 02-Reading/pdfs 中的重要文件
    this = '02-Reading/pdfs'
    os.makedirs(target+'/'+this)
    files = ['acs-nano.csl', 
             'markdown.css', 
             'Mdnotes Default Template.md',
             'template.docx',
             'paper2docx.py',
             'getCitationKeys.py',
            ]
    for f in files:
        shutil.copy(wks+'/'+this+'/'+f, target+'/'+this+'/'+f)
        total_.append(target+'/'+this+'/'+f)
        
    # 复制其它空目录并填充占位文件
    space = ['01-Diary/日志存档', 
             '01-Diary/周小结', 
             '01-Diary/月总结', 
             '01-Diary/本周事务', 
             '03-Projects', 
             '06-Cards', 
             '07-Archives',
             '08-Assets/Excalidraw'
            ]
    for this in space:
        sdir = os.path.join(target, this)
        os.makedirs(sdir, exist_ok=True)
        with open(sdir+'/.keep', 'w', encoding='utf-8') as f:
            f.write('this file is created for keeping the folder after git.')
        total_.append(sdir)
    
    for idx, t in enumerate(total_):
        print(f'Copied [{idx+1}]: {t}.')

if __name__=='__main__':
    wks = r"X:\projects\working"
    export_vault_template(wks)