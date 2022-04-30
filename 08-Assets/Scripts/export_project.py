# -- coding: utf-8 --
from obs import Obsidian, Project

def main():
    '''针对指定project子目录进行处理'''
    vault = Obsidian()
    fp = vault.inputs[1]
    xxd = Project(fp)
    xxd.duplicate_vault_template()
    xxd.export_project()

if __name__=='__main__':
    main()