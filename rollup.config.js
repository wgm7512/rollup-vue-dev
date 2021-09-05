
import vue from 'rollup-plugin-vue';
import commonjs from '@rollup/plugin-commonjs';
import clear from 'rollup-plugin-clear';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import livereload from "rollup-plugin-livereload";
import serve from "rollup-plugin-serve";
import resolve from "rollup-plugin-node-resolve";
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
    replace({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
    resolve(),
    vue({
      css: true,
      compileTemplate: true
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    }),
    ...envPlugins
  ]
};