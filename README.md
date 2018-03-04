## 项目简述
一个集本地资源管理器、在线代码编辑器和在线预览功能于一体的代码工具，未来将引入Markdown编辑器和个人博客功能。本项目的初衷是开发一个基于自己使用习惯的工具，用于收集、整理和记录各种纷杂的前端资源，也以此来提升自己前端技术，同时，基于目前自己所掌握的前端知识，运用目前比较流行的前端技术，试图打造一个完美的个人项目。因此，在此过程中，项目不断进行推翻重构，才初步完成目前比较满意的架构。
## 项目架构
本项目尽可能达到全栈技术体系，后端采用Node.js平台，使用express做为服务器，ejs做为模版引擎，前端使用Vue.js进行组件式开发和组件复用，使用webpack进行前端资源打包，整个项目大量使用ES6语法，所有异步操作使用Promise进行封装处理；在项目结构上，采用常用的MVC模式，各个功能模块按照文件夹进行组织，使得项目整体一目了然，目前，已经完成项目的整体架构，后期将引入单元测试工具和异常日志处理及上传阿里云进行CDN处理等，同时不断进行完善功能，使之尽可能达到产品级要求。
以下是项目结构：
```tree
├── build
├── configs
├── controls
├── public
│   ├── asset
│   ├── data
│   ├── editor
│   ├── home
│   ├── tools
│   ├── utils
│   ├── widgets
├── routes
│   ├── document.js
│   ├── tools.js
├── runtime
│   ├── app.js
│   ├── route.js
├── views
│   ├── home
│   ├── tools
├── app.js
├── package.json
├── README.md
└── webpack.config.js
```
## 项目截图
界面参考自VSCode风格（Dark+主题），以下是运行效果
## 项目进度
- 完成express路由功能基础配置
- 完成express控制器基础代码
- 完成Node端服务器运行时配置
- 完成webpack打包配置，支持本地开发环境、测试环境和正式环境三种配置
- 完成Node端对本地目录结构的递归遍历，并支持将遍历的数据结构保存为json数据文件
- 左侧树形菜单，支持无限层级
- 部分基础Vue组件，包括树形组件和文字提示框组件
- 代码文件（html、css和js等）的在线预览，支持语法高亮
......
## 项目运行
``` bash
git clone https://github.com/lycorisra/CodeStudio.git  

# 安装依赖包
npm install

# 运行本地开发环境
npm run dev-server

# webpack打包，发布到正式环境前运行该命令
npm run build (打包)

```
## License
[ISC](https://github.com/lycorisra/CodeStudio/blob/master/LICENSE)