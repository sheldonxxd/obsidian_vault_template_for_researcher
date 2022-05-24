# -- coding: utf-8 --

from datetime import datetime
import json
import requests
import random
from urllib.request import quote


class CrossRef:
    '''根据doi从crossref上获取信息'''
    def __init__(self, doi):
        self.doi = doi
        self.query_date = datetime.today().strftime("%Y-%m-%d")
        self.entry = None
    
    def connect(self):
        query = f'https://api.crossref.org/works/{quote(self.doi)}'
        email = self.fake_email_address()
        repo_url = "https://github.com/sheldonxxd/obsidian_vault_template_for_researcher"
        repo_ver = "1.7"
        explorers = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
            'AppleWebKit/537.36 (KHTML, like Gecko)',
            'Chrome/98.0.4758.102',
            'Safari/537.36',
            'Edg/98.0.1108.62',
            f'ObsidianResearcherVault/{repo_ver} ({repo_url}; {email})',
        ]
        headers = {'user-agent':' '.join(explorers)}
        # 2022-04-27 21:43:30
        # Include a “mailto:” in your User-Agent header.
        # https://api.crossref.org/swagger-ui/index.html#/Works/get_works__doi_
        try:
            res = requests.get(url=query, 
                               headers=headers, 
                               stream=True,
                               timeout=5)
            data = json.loads(res.content)
            self.entry = data['message']
        except Exception as e:
            # 未必访问成功
            print(str(e))        

    def fake_email_address(self):
        coms = ['@hotmail.com', '@google.com', '@qq.com', '@163.com']
        com = random.choice(coms)
        rang = random.randint(4, 12)
        chars = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'
        name = "".join(random.choice(chars) for i in range(rang))
        addr = name + com
        return addr

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
            else:
                # 2022-05-20 14:48:39
                # 为了能够保持跟pdf中一直的引文顺序，对于没有doi的直接收藏key
                ref_list2.append(ref['key'])
        return ref_list2

    def get_bibliography(self):
        '''自定义输出bibliography，包含标题，期刊，日期和引用次数'''
        title = self.get_title()
        journal = self.get_journal_name()
        date = self.get_published_date()
        cited_times = self.get_cited_times()
        ref_url = f'https://doi.org/{self.doi}'
        line = f'[{title}]({ref_url}), **{journal}**, date: {date}, cited: {cited_times}.'
        return 
    
    def save(self, fp):
        '''将从 crossref 中抓取的信息保存为 json 文件'''
        if self.entry is not None:
            with open(fp, 'w', encoding='utf-8') as f:
                json.dump(self.entry, f)
