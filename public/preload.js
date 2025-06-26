const { contextBridge, ipcRenderer } = require('electron');

// 暴露安全的API给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  // 监听来自主进程的消息
  onNewRectangle: (callback) => {
    ipcRenderer.on('new-rectangle', callback);
  },
  
  // 移除监听器
  removeAllListeners: (channel) => {
    ipcRenderer.removeAllListeners(channel);
  },
  
  // 获取屏幕信息
  getScreenInfo: () => {
    return ipcRenderer.invoke('get-screen-info');
  }
});

// 在窗口加载完成后通知主进程
window.addEventListener('DOMContentLoaded', () => {
  console.log('Preload script loaded');
});