const { app, BrowserWindow, screen, ipcMain} = require('electron');
const iconv = require('iconv-lite');
let xiaochuangdelete
const { exec } = require('child_process'); // 引入 child_process 模块
const fs = require('fs');
const path = require('path');
const bili_jct ='bili_jct.txt'
let bili_jct1 = fs.readFileSync(bili_jct, 'utf-8');
const SESSDATA = 'SESSDATA.txt'
const BIGtitle = fs.readFileSync('BIGtitle.txt','utf-8')
const SESSDATA1 = fs.readFileSync(SESSDATA,'utf-8');
const buffer = fs.readFileSync('UPname.txt','utf-8');
const UPname = iconv.decode(buffer, 'windows-1252'); // 解码
const UPname1 = iconv.decode(BIGtitle, 'windows-1252'); // 解码
console.log(UPname);
console.log(UPname1)
// 定义标志变量
let hasRefreshed = false;//防止反复刷新BUG
let biliclock;

const bvid = 'bvid.txt';
let bvid1 = fs.readFileSync(bvid, 'utf-8');

function createWindow() {
  const primaryDisplay = screen.getPrimaryDisplay();
  const scaleFactor = primaryDisplay.scaleFactor; // 获取缩放因子
  const win = new BrowserWindow({
   // width: 700,
   width: 1050,
    //height: 422,
    height: 525,
    show: false,
    frame: false,
    transparent: true,
    resizable: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
    backgroundColor: '#000000'
  });

  win.loadURL('https://www.bilibili.com/video/'+bvid1);

  win.webContents.on('did-finish-load', async () => {
    
    //win.webContents.insertCSS(`
     // body {
      //  display: flex;
       // flex-direction: row;
      //  margin: 0;
      //  overflow: hidden;
     // }
    ///  #mirror-vdcon {
     //   width: 70%; /* 左侧视频宽度 */
     // }
    //  #custom-sidebar {
    //    width: 30%; /* 右侧自定义内容宽度 */
     //   background-color: #f0f0f0;
     //   padding: 20px;
    //    overflow-y: auto;
    //    color: #333;
    //  }
   // `);
   win.webContents.executeJavaScript(`
    const sidebar = document.createElement('div');
    sidebar.id = 'custom-sidebar';
    sidebar.innerHTML = '<h2>UPname${UPname}</h2><p>${BIGtitle}</p>';
    document.body.appendChild(sidebar);
  `);
  
    if (!hasRefreshed) {
      // 设置 Cookie
      await win.webContents.executeJavaScript(`
        document.cookie = "SESSDATA=${SESSDATA1}; path=/; domain=.bilibili.com";
        document.cookie = "bili_jct=${bili_jct1}; path=/; domain=.bilibili.com";
      `);

      // 刷新页面
      win.reload();
      hasRefreshed = true;
    }

    // 保留原有的计时逻辑
    win.webContents.executeJavaScript(`document.querySelector("#mirror-vdcon").className = "new-class";`);
    win.webContents.executeJavaScript(`document.documentElement.style.overflowX = 'hidden';`);
    win.webContents.executeJavaScript(`document.body.style.overflow = 'hidden';`);

    win.webContents.executeJavaScript(
      'document.querySelector(\'#reco_list\').style.display = \'none\';'
    );
    win.webContents.executeJavaScript(
      'document.querySelector(\'#mirror-vdcon > div.right-container.is-in-large-ab > div > a\').style.display = \'none\';'
    );
    win.webContents.executeJavaScript(
      'document.querySelector(\'#v_desc > div.basic-desc-info\').style.display = \'none\';'  
    );
    win.webContents.executeJavaScript(
      'document.querySelector(\'#v_desc > div\').style.display = \'none\';'  
    );

    win.webContents.executeJavaScript(
      'document.querySelector(\'#v_tag\').style.display = \'none\';' 
    );
    win.webContents.executeJavaScript(
      'document.querySelector(\'#biliMainHeader > div > div\').style.display = \'none\';' 
    );
    win.webContents.executeJavaScript(
      'document.querySelector(\'#bannerAd\').style.display = \'none\';'   
    );
    win.webContents.executeJavaScript(
      'document.querySelector(\'#biliMainHeader\').style.display = \'none\';'//隐藏
    );
    win.webContents.executeJavaScript(
      'document.querySelector(\'#bannerAd\').style.display = \'none\';'
    );



    win.webContents.executeJavaScript(
      'document.querySelector(\'#danmukuBox > div\').style.display = \'none\';'
    );
    win.webContents.executeJavaScript(
      'document.querySelector(\'#right-bottom-banner\').style.display = \'none\';'
    );
    win.webContents.executeJavaScript(
      'document.querySelector(\'#right-bottom-banner > div > picture > img\').style.display = \'none\';'
    );
    win.webContents.executeJavaScript(`
      const wo = document.querySelector("#mirror-vdcon > div.right-container.is-in-large-ab > div > div:nth-child(8) > div.base-video-sections-v1");
  `);
  win.webContents.executeJavaScript(`
      wo.style.width = "500px"
      wo.style.left = "670px"
      wo.style.top = "100px"
`);
win.webContents.executeJavaScript(`
    const oi = document.querySelector("#bilibili-player > div > div > div.bpx-player-primary-area > div.bpx-player-sending-area > div")

  `);
//win.openDevTools()
win.webContents.executeJavaScript(`
      oi.style.width = "500px"
      oi.style.left = "670px"
      oi.style.top = "150px"
  `);
  win.webContents.executeJavaScript(`
    const dianzan = document.querySelector("#arc_toolbar_report > div.video-toolbar-left > div.video-toolbar-left-main > div:nth-child(1)")
    `);
    win.webContents.executeJavaScript(`
      dianzan.style.width = "500px"
      dianzan.style.left = "670px"
      dianzan.style.top = "-500px"
  `);
  win.webContents.executeJavaScript(`
    const toubi = document.querySelector("#arc_toolbar_report > div.video-toolbar-left > div.video-toolbar-left-main > div:nth-child(2)")
    `);

    win.webContents.executeJavaScript(`
      toubi.style.width = "500px"
      toubi.style.left = "250px"
      toubi.style.top = "-500px"
  `);
  win.webContents.executeJavaScript(`
    const shoucang = document.querySelector("#arc_toolbar_report > div.video-toolbar-left > div.video-toolbar-left-main > div:nth-child(3)")
    `);
    win.webContents.executeJavaScript(`
      shoucang.style.width = "500px"
      shoucang.style.left = "-180px"
      shoucang.style.top = "-500px"
  `);

    win.webContents.executeJavaScript(
  'document.querySelector(\'#bilibili-player > div > div > div.bpx-player-primary-area > div.bpx-player-sending-area > div\').style.display = \'none\';'
  );
  win.webContents.executeJavaScript(`
    'document.querySelector(\'#mirror-vdcon > div.right-container.is-in-large-ab > div > div:nth-child(8) > div.pop-live-small-mode.part-1\').style.display = \'none\';'
    `);
    win.webContents.executeJavaScript(`
      'document.querySelector(\'#right-bottom-banner\').style.display = \'none\';'
      `);
    win.webContents.executeJavaScript(`
     'document.querySelector(\'#bannerAd\').style.display = \'none\';'
    `);
    win.webContents.executeJavaScript(`
      'document.querySelector(\'#mirror-vdcon > div.right-container.is-in-large-ab\').style.display = \'none\';'
     `);
    win.webContents.executeJavaScript(`
      const UP = document.querySelector("#mirror-vdcon > div.right-container.is-in-large-ab > div > div.up-panel-container > div.up-info-container")
      `)
   win.webContents.executeJavaScript(`
      const u = document.querySelector("#commentapp")
       `)
     win.webContents.executeJavaScript(`
          u.style.position="absolute"
          u.style.width = "350px"
          u.style.top = "100px"
          u.style.left = "655px"
          `)
      win.webContents.executeJavaScript(`
        const guding1 =document.querySelector("#viewbox_report > div.video-info-title > div.video-info-title-inner.video-info-title-inner-overflow > h1")
         `)        
     win.webContents.executeJavaScript(`
    guding1.style.position = "fixed"
       `)
    win.webContents.executeJavaScript(`
    const guding2 = document.querySelector("#bilibili-player")
    `)  
    win.webContents.executeJavaScript(`
    guding2.style.position = "fixed"
         `)
     win.show();
    biliclock = setInterval(() => {
      win.webContents.executeJavaScript(`document.querySelector("#mirror-vdcon").className = "new-class";`);
      win.webContents.executeJavaScript(`
      const xiaochuangdelete = document.querySelector("#bilibili-player > div > div")
      `)
win.webContents.executeJavaScript(`
    xiaochuangdelete.removeAttribute('data-screen')
     `)
     win.webContents.executeJavaScript(`
      const pingbi = document.querySelector("#right-bottom-banner")
      const pingbi2 = document.querySelector("#bannerAd > div")
       `)  
      win.webContents.executeJavaScript(`
      pingbi.className = " __web-inspector-hide-shortcut__"
      pingbi2.className = " __web-inspector-hide-shortcut__"
       `)      
    }, 1000);
    //win.openDevTools()
    window.api.setScaleFactor((scaleFactor) => {
      // 根据当前缩放因子调整内容显示
      const adjustmentFactor = scaleFactor / 1.25; // 1.25 是开发时的缩放比例
    
      // 调整样式以适配缩放因子
      document.documentElement.style.transform = `scale(${adjustmentFactor})`;
      document.documentElement.style.transformOrigin = 'top left'; // 保持左上角为参考点
    });
    // 在渲染进程脚本中，调用 setScaleFactor，并保存返回的移除监听器函数
const removeScaleFactorListener = window.api.setScaleFactor((scaleFactor) => {
  console.log('Received scale factor:', scaleFactor);
});

// 监听窗口关闭事件，执行清理操作
window.addEventListener('beforeunload', () => {
  // 调用函数来移除监听器
  removeScaleFactorListener();
  console.log('Listener removed');
});

  });

  win.webContents.openDevTools();
  win.webContents.closeDevTools();

  win.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  win.on('ready-to-show', () => {
    win.show();
  });

  win.webContents.on('dom-ready', () => {
    console.log('2、一个窗口中的文本加载完成');
  });

  win.webContents.on('close', () => {
    console.log('8、关闭窗口');
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  clearInterval(biliclock);
  exec('taskkill /IM EBP.exe /F')
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
