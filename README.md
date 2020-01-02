###项目主要介绍了
#### webpack的常用配置
常用的一些插件：  
- `npm i -D html-webpack-plugin` 打包生成的js文件已经被自动引入html文件中  
- `npm i -D clean-webpack-plugin` 一个plugin来帮我们在打包输出前清空文件夹  
- 需要一些loader来解析我们的css文件 `npm i -D style-loader css-loader`  
- 如果我们使用less来构建样式，则需要多安装两个 `npm i -D less less-loader`  
- 为css添加浏览器前缀 `npm i -D postcss-loader autoprefixer`   
- 想用把css拆分出来用外链的形式引入css文件 `npm i -D mini-css-extract-plugin`  
- 这里需要说的细一点,上面我们所用到的mini-css-extract-plugin会将所有的css样式合并为一个css文件。如果你想拆分为一一对应的多个css文件,我们需要使用到extract-text-webpack-plugin，而目前mini-css-extract-plugin还不支持此功能。我们需要安装@next版本的extract-text-webpack-plugin  
`npm i -D extract-text-webpack-plugin@next`  
- 打包 图片、字体、媒体、等文件，url-loader 一般与file-loader搭配使用，功能与 file-loader 类似，如果文件小于限制的大小。则会返回 base64 编码，否则使用 file-loader 将文件移动到输出的目录中
- 为了使我们的js代码兼容更多的环境，用babel转义js文件  
`npm i babel-loader @babel/preset-env @babel/core`  
上面的babel-loader只会将 ES6/7/8语法转换为ES5语法，但是对新api并不会转换 例如(promise、Generator、Set、Maps、Proxy等)
此时我们需要借助babel-polyfill来帮助我们转换
`npm i @babel/polyfill`
####搭建vue的开发环境
- vue-loader 用于解析.vue文件，vue-template-compiler 用于编译模板
`npm i -D vue-loader vue-template-compiler vue-style-loader`
 `npm i -S vue`
- 配置webpack-dev-server进行热更新 `npm i -D webpack-dev-server`
- 在package.json配置打包命令
```
"scripts": {
    "dev": "webpack-dev-server --config build/webpack.config.js --open",
    "build": "webpack --config build/webpack.config.js"
  }
```

- 区分开发环境与生产环境  
webpack.dev.js是开发环境配置文件。开发环境主要实现的是热更新,不要压缩代码，完整的sourceMap
webpack.prod.js是生产环境配置文件，生产环境主要实现的是压缩代码、提取css文件、合理的sourceMap、分割代码，需要安装以下模块:
`npm i -D  webpack-merge copy-webpack-plugin optimize-css-assets-webpack-plugin uglifyjs-webpack-plugin`  
webpack-merge 合并配置  
copy-webpack-plugin 拷贝静态资源  
optimize-css-assets-webpack-plugin 压缩css  
uglifyjs-webpack-plugin 压缩js
webpack mode设置production的时候会自动压缩js代码。原则上不需要引入uglifyjs-webpack-plugin进行重复工作。但是optimize-css-assets-webpack-plugin压缩css的同时会破坏原有的js压缩，所以这里我们引入uglifyjs进行压缩

#### 优化打包速度
- 合理的配置mode参数与devtool参数  
mode可设置development production两个参数
如果没有设置，webpack4 会将 mode 的默认值设置为 production 
production模式下会进行tree shaking(去除无用代码)和uglifyjs(代码压缩混淆)
- 缩小文件的搜索范围(配置include exclude alias noParse extensions)
