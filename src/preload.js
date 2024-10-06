const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  setScaleFactor: (callback) => {
    // 定义监听器
    const listener = (event, scaleFactor) => callback(scaleFactor);
    
    // 绑定监听器
    ipcRenderer.on('set-scale-factor', listener);
    
    // 返回一个函数，用于移除监听器
    return () => {
      ipcRenderer.removeListener('set-scale-factor', listener);
    };
  },
});
