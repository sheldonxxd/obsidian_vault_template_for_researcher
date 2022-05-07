# -- coding: utf-8 --
from obs import Obsidian
import os, datetime, re, sys, io
import pyperclip

def main():
    vault = Obsidian()
    # fp = vault.inputs[1]
    kanban = os.path.join(vault.paths['vault'], '00-MOC/任务看板.md')
    assert os.path.exists(kanban), "任务看板不存在！"
    with open(kanban, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    # 收集已经完成的任务
    tasks = []
    for line in lines:
        if line.startswith('- [x] '):
            #已经归档的任务前缀
            tasks.append(line)
    data = list(map(lambda x:transform(x), tasks))
    write_gantt(data)

def transform(line):
    '''
    对单条已完成的任务字符串进行解析变形
    分别得到四个内容：
    1. 任务开始时间
    2. 任务结束时间
    3. 任务分类标签
    4. 任务名称
    '''
    line = line.strip()
    end = line[6:25]
    start = line[-25:-15] + ' ' + line[-9:-1]
    content = line[29:-29]
    ps = content.split(' ')
    tags = []
    name = ''
    for idx, p in enumerate(ps):
        if p.startswith('#'):
            tags.append(p[1:])
        else:
            # match = re.search('[\@\-]', p)
            # if not match:
            #     name = p 
            name += ' '+p
    name = name.strip()
    if len(tags)==0:
        tags = ['Other']
    task_info = {
        'start': start,
        'end': end,
        'tags': tags,
        'name': name,
        'duration': dur(start, end),
    }
    return task_info

def test1():
    line = r'- [x] 2022-04-10 15:50:56 -- #写文章 [[FNA-PAINT-Intro-part1]] @[[2022-04-09]] @@{14:56:27}'
    print(transform(line))

def dur(start, end):
    '''
    对如 2022-03-28 14:42:54 格式的两个时间戳字符串进行计算
    '''
    t1 = datetime.datetime.fromisoformat(start)
    t2 = datetime.datetime.fromisoformat(end)
    dt = str(t2-t1)
    # 32 days, 0:29:39
    # 接下来解析字符串就可以了
    if ',' in dt:
        days, res = dt.split(', ')
        d = days.split(' ')[0]
        h, m, s = res.split(':')
    else:
        d = '0'
        h, m, s = dt.split(':')
    if m.startswith('0'):
        m = m[1:]
    data = {
        'days': d+'d',
        'hours': h+'h',
        'mins': m+'min',
        'secs': s+'sec',
    }
    dur_str = ''
    ds = ['d ', 'h ', 'min ']
    idx = 0
    for c in [d, h, m]:
        if c!='0':
            dur_str += f'{c}{ds[idx]}'
        idx += 1
    # 精度调整为分钟
    if d=='0' and h=='0' and m=='0':
        dur_str = '1min'
    return dur_str

def test2():
    start = '2022-03-28 14:42:54'
    a = datetime.datetime.fromisoformat(start)
    end = '2022-04-29 15:12:33'
    b = datetime.datetime.fromisoformat(end)
    c = b - a
    print(c.days)
    print(c)
    print(c.total_seconds())
    print(c.resolution)
    print(str(c))

def test3():
    start = '2022-03-28 14:42:54'
    end = '2022-04-29 15:12:33'
    info = dur(start, end)
    print(info)

def write_gantt(data):
    '''按照mermaid-gantt的语法弄好字符串'''
    title = '本周项目事务甘特图'
    head = f'```mermaid\ngantt\ntitle {title}\ndateFormat YYYY-MM-DD HH:mm:ss\naxisFormat %m-%d\n'
    # 然后对data做一个分组，按照标签
    tags = []
    for task in data:
        tags.extend(task['tags'])
    tags = list(set(tags)) # 去重一下
    sections = ''
    counter = 1
    for idx, tag in enumerate(tags):
        section = f'section {tag}\n'
        sections += section
        for task in data:
            if tag in task['tags']:
                item = f"{task['name']} :t{counter}, {task['start']}, {task['duration']}\n"
                sections += item
                counter += 1
    content = head + sections + '```'
    print(content)
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    pyperclip.copy(content)


def test4():
    line = r'- [x] 2022-04-09 16:14:28 -- #写文章 [[起草FNA-PAINT工作的标题]] @[[2022-04-09]] @@{14:55:47}'
    data = transform(line)
    write_gantt([data])


if __name__=='__main__':
    main()
    # test1()




    

    