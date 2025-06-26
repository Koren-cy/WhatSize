# WhatSize - 精确尺寸显示工具

一个现代化的桌面应用程序，用于在屏幕上精确显示指定尺寸的矩形，帮助用户直观地了解物体的实际大小。

## 功能特性

### 🎯 核心功能
- **精确尺寸显示**: 支持毫米、厘米、英寸、像素等多种单位
- **DPI 精确校准**: 商业级三种校准方法确保毫米级精度
- **实时预览**: 所见即所得的矩形显示
- **拖拽定位**: 可自由拖拽矩形到屏幕任意位置
- **多单位支持**: mm、cm、inch、px 四种常用单位

### 🎨 界面特性
- **现代化设计**: 采用毛玻璃效果和渐变背景
- **响应式布局**: 适配不同屏幕尺寸
- **直观控制**: 简洁易用的控制面板
- **实时信息**: 显示屏幕DPI、分辨率等关键信息

### ⚙️ 自定义选项
- **颜色调节**: 自定义矩形颜色
- **透明度控制**: 0.1-1.0 范围内调节透明度
- **边框设置**: 0-10px 边框宽度调节
- **位置控制**: 精确的百分比位置设置
- **显示选项**: 可切换矩形和尺寸标注的显示

### 🔧 DPI 校准系统
- **物理标尺校准**: 使用真实标尺进行最高精度校准（±0.1mm）
- **信用卡校准**: 利用标准信用卡尺寸进行便捷校准（±0.5mm）
- **自动检测**: 基于系统信息的智能 DPI 估算（±2mm）
- **校准历史**: 自动保存和管理校准记录
- **实时应用**: 校准结果立即生效，无需重启

## 技术栈

- **前端框架**: React 18
- **桌面框架**: Electron
- **样式方案**: Styled Components
- **构建工具**: Create React App
- **打包工具**: Electron Builder

## 安装和运行

### 环境要求
- Node.js 16.0 或更高版本
- npm 或 yarn 包管理器

### 开发环境

1. **克隆项目**
   ```bash
   git clone <repository-url>
   cd WhatSize
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动开发服务器**
   ```bash
   npm run electron-dev
   ```

### 生产构建

1. **构建应用**
   ```bash
   npm run build
   ```

2. **打包桌面应用**
   ```bash
   npm run electron-pack
   ```

## 使用指南

### 基本操作

1. **设置尺寸**
   - 在左侧控制面板输入所需的宽度和高度
   - 选择合适的单位（mm、cm、inch、px）

2. **调整位置**
   - 使用鼠标直接拖拽矩形
   - 或在控制面板中输入精确的百分比位置

3. **自定义外观**
   - 点击颜色选择器更改矩形颜色
   - 使用滑块调节透明度和边框宽度

4. **显示控制**
   - 使用"显示/隐藏矩形"按钮控制矩形显示
   - 使用"显示/隐藏尺寸标注"按钮控制标注显示

### 快捷键

- `Ctrl+N` (Windows/Linux) 或 `Cmd+N` (macOS): 新建矩形
- `Ctrl+Q` (Windows/Linux) 或 `Cmd+Q` (macOS): 退出应用
- `F11`: 全屏模式

### DPI 校准使用

为确保最高精度，建议首次使用时进行 DPI 校准：

1. **打开校准页面**
   - 点击控制面板中的「精确校准 DPI」按钮

2. **选择校准方法**
   - **物理标尺校准**（推荐）：使用真实标尺测量屏幕标尺
   - **信用卡校准**：使用标准信用卡作为参考
   - **自动检测**：基于系统信息快速估算

3. **完成校准**
   - 按照页面指引完成测量
   - 点击「应用 DPI 设置」保存结果

4. **验证精度**
   - 创建已知尺寸的矩形进行验证
   - 校准后精度可达 ±0.1mm（物理标尺方法）

### 精度说明

- **未校准**：基于系统DPI估算，精度约 ±2-5mm
- **已校准**：根据校准方法，精度可达 ±0.1-2mm
- **最佳实践**：每个显示器单独校准，定期重新校准

详细校准指南请参考：[DPI_CALIBRATION_GUIDE.md](./DPI_CALIBRATION_GUIDE.md)

## 项目结构

```
WhatSize/
├── public/
│   ├── electron.js         # Electron 主进程
│   ├── preload.js          # 预加载脚本
│   ├── index.html          # HTML 模板
│   └── manifest.json       # PWA 配置
├── src/
│   ├── components/
│   │   ├── Header.js       # 头部组件
│   │   ├── ControlPanel.js # 控制面板组件
│   │   ├── RectangleDisplay.js # 矩形显示组件
│   │   └── DPICalibration.js # DPI校准组件
│   ├── App.js              # 主应用组件
│   ├── index.js            # React 入口
│   └── index.css           # 全局样式
├── package.json            # 项目配置
├── README.md               # 项目说明
└── DPI_CALIBRATION_GUIDE.md # DPI校准详细指南
```

## 开发说明

### 组件架构

- **App.js**: 主应用组件，管理全局状态
- **Header.js**: 显示应用标题和屏幕信息
- **ControlPanel.js**: 提供所有控制选项
- **RectangleDisplay.js**: 核心显示组件，处理矩形渲染和交互

### 状态管理

应用使用 React Hooks 进行状态管理：
- `dimensions`: 矩形尺寸和单位
- `position`: 矩形位置（百分比）
- `appearance`: 颜色、透明度、边框等外观设置
- `display`: 显示选项控制

### 单位转换

应用内置了完整的单位转换系统：
```javascript
const convertToPixels = (value, unit) => {
  const dpi = window.devicePixelRatio * 96;
  switch (unit) {
    case 'mm': return (value / 25.4) * dpi;
    case 'cm': return (value / 2.54) * dpi;
    case 'inch': return value * dpi;
    case 'px': return value;
  }
};
```

## 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 更新日志

### v1.0.0
- 初始版本发布
- 基础矩形显示功能
- 多单位支持
- 现代化界面设计
- 拖拽交互功能

## 技术支持

如果您在使用过程中遇到问题，请：

1. 查看本 README 文件
2. 搜索已有的 Issues
3. 创建新的 Issue 并详细描述问题

---

**WhatSize** - 让尺寸可视化变得简单直观！