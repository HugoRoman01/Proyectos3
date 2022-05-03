import requests

def test(modulos):

    for mod in modulos:
        r = requests.get("http://127.0.0.1:5000/api/"+mod+"/test")
        if r.status_code == 200:
            print("Modulo: "+mod+" - Test: OK")
        else:
            print("Modulo: "+mod+" - Test: ERROR")



if __name__ == '__main__':
    
    modulos = ['login', 'registro', 'eventos','admin']

    test(modulos)
