import Hello from './components/Hello.vue';


Hello.install = Vue => {
  Vue.component(Hello.name, Hello);
};

// 导出组件
export default Hello;
