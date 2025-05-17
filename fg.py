from webview import *
import time
from webview.dom import DOMEventHandler
import os
bvid = '114514'
with open('./bvid.txt','r') as bvrd:
    bvid = bvrd.read()
from http.cookies import SimpleCookie
sessdatas = 'None'
x=0
cookie = None
bili_jcts = 'None'
def cookiesdaoru():
    global sessdatas, bili_jcts
    with open('./temp.txt','r') as file:
        filedata = file.read()
        print(filedata)
        filedata = filedata.split('; ')
    for file in filedata:
        if file.find('SESSDATA') !=-1:
            file = file.replace('SESSDATA=', '')
            sessdatas = file
        if file.find('bili_jct') !=-1:
            file = file.replace('bili_jct=', '')
            bili_jcts = file

def auto_click(window):
   global sessdatas, bili_jcts,cookie,x
   if os.path.exists('D:\\temp.txt'):
        cookiesdaoru()
   while x==0:

       element = window.dom.get_element("#bilibili-player > div > div > div.bpx-player-primary-area > div.bpx-player-video-area > div.bpx-player-control-wrap > div.bpx-player-control-entity > div.bpx-player-control-bottom > div.bpx-player-control-bottom-right > div.bpx-player-ctrl-btn.bpx-player-ctrl-quality")
       print(element)
       if element != None:



           cookiedaoru = 'document.cookie = "SESSDATA={0}; domain=.bilibili.com; path=/; expires=Tue, 20 May 2025 03:50:59 GMT; SameSite=Lax";'.format(sessdatas)
           print(cookiedaoru)
           window.evaluate_js(cookiedaoru)

           cookiedaoru = 'document.cookie = "bili_jct={0}; domain=.bilibili.com; path=/; expires=Thu, 21 Jun 2026 03:51:00 GMT; SameSite=Lax";'.format(bili_jcts)
           print(cookiedaoru)
           window.evaluate_js(cookiedaoru)
           cookiedaoru = 'window.location.reload()'
           print(cookiedaoru)
           window.evaluate_js(cookiedaoru)
           x=1
   while True:
       element = window.dom.get_element("#bilibili-player > div > div > div.bpx-player-primary-area > div.bpx-player-video-area > div.bpx-player-control-wrap > div.bpx-player-control-entity > div.bpx-player-control-bottom > div.bpx-player-control-bottom-right > div.bpx-player-ctrl-btn.bpx-player-ctrl-quality")
       if element != None:
           js_code = """
                    function checkElement(){
                        var button = document.querySelector('#bilibili-player > div > div > div.bpx-player-primary-area > div.bpx-player-video-area > div.bpx-player-control-wrap > div.bpx-player-control-entity > div.bpx-player-control-bottom > div.bpx-player-control-bottom-right > div.bpx-player-ctrl-btn.bpx-player-ctrl-web');
                        if (button && button.offsetHeight > 0 && button.offsetWidth > 0) {
                            button.click();
                        }
                    }
                    checkElement()
                    """
           window.evaluate_js(js_code)
           cookiedaoru = """
           const big = document.querySelector("#bilibili-player > div > div > div.bpx-player-primary-area > div.bpx-player-video-area > div.bpx-player-control-wrap > div.bpx-player-control-entity > div.bpx-player-control-bottom > div.bpx-player-control-bottom-right > div.bpx-player-ctrl-btn.bpx-player-ctrl-web");
           big.remove();
           """
           window.evaluate_js(cookiedaoru)
           cookiedaoru = """
           const p =document.querySelector("#bilibili-player > div > div > div.bpx-player-primary-area > div.bpx-player-video-area > div.bpx-player-control-wrap > div.bpx-player-control-entity > div.bpx-player-control-bottom > div.bpx-player-control-bottom-right > div.bpx-player-ctrl-btn.bpx-player-ctrl-full");
           p.remove();
           """
           window.evaluate_js(cookiedaoru)

           cookiedaoru ="""
           const r = document.querySelector("#bilibili-player > div > div > div.bpx-player-primary-area > div.bpx-player-video-area > div.bpx-player-control-wrap > div.bpx-player-control-entity > div.bpx-player-control-bottom > div.bpx-player-control-bottom-right > div.bpx-player-ctrl-btn.bpx-player-ctrl-wide");
           r.remove();
           """
           window.evaluate_js(cookiedaoru)
           window.show()
           break





if __name__ == '__main__':
    window = create_window('Bilibili player', url=f'https://www.bilibili.com/video/{bvid}')
    cookiesdaoru()
    start(auto_click,window)
    window.hide()