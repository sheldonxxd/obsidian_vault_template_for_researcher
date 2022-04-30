from obs import CrossRef

def test(doi):
    a = CrossRef(doi)
    print(a.get_title())


if __name__=='__main__':
    doi = '10.1021/acs.analchem.0c01074'
    test(doi)
