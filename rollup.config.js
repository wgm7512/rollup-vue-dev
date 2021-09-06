
// 解析 vue
import vue from 'rollup-plugin-vue';
// rollup.js 编译支持 npm 模块和 CommonJS 模块
import commonjs from '@rollup/plugin-commonjs';
// 打包前，先清空 dist 文件夹
import clear from 'rollup-plugin-clear';
// 编译代码
import babel from 'rollup-plugin-babel';
// 压缩代码
import { uglify } from 'rollup-plugin-uglify';
// 热更新
import livereload from "rollup-plugin-livereload";
// 提供服务
import serve from "rollup-plugin-serve";
// 将我们编写的源码与依赖的第三方库进行合并
import resolve from "rollup-plugin-node-resolve";
// 替换环境变量
import replace from 'rollup-plugin-replace';


const NODE_ENV = process.env.NODE_ENV;

let envPlugins = [];

const isPrd = NODE_ENV === 'production';

if (isPrd) {
  envPlugins = [
    uglify(),
  ];
} else {
  envPlugins = [
    livereload(),
    serve({
      open: true, // 自动打开页面
      port: 3004,
      openPage: '/public/index.html', // 打开的页面
      contentBase: ''
    })
  ];
}

export default {
  input: isPrd ? 'src/lib-main.js' : 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  },
  plugins: [
    clear({
      targets: ['dist'],
      watch: true,
    }),
    vue({
      css: true,
      compileTemplate: true
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    }),
    ...envPlugins
  ]
};