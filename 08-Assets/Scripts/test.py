from obs import Project

fp = r"X:\projects\working\03-Projects\黑曜石玩家指南\本章小结-恭喜入门obsidian.md"

a = Project(fp)
for f in a.filelist:
    print(f)
a.duplicate_vault_template()
a.export_project()