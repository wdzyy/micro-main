const path = require('path');
const { name } = require('./package');
const { version } = require('./package');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // 路径前缀
  publicPath: './',
  lintOnSave: true,
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建.
  productionSourceMap: false,
  /*css: {
    loaderOptions: {
      sass: {
        // 全局引入变量和 mixin
        prependData: `
          @import "@/assets/scss/variable.scss";
          @import "@/assets/scss/mixin.scss";
        `
      }
    }
  },*/
  devServer: {
    port: 3000,
    proxy: {
      '/apis/': {
        target: 'http://111.229.6.89:7300/mock',
        ws: false,
        changOrigin: true,
        pathRewrite: {
          '^/apis/': '/'
        }
      }
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache'
    }
  },
  // 自定义webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`
    }
  },
  pages: {
    index: {
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
      meta: { revised: `版本号, ${version}` }
    }
  }
};
