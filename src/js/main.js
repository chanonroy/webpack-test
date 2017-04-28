import '../scss/main.scss';
import '../img/worst_ever.jpg';

import Vue from 'vue'
import ElementUI from 'element-ui'

// importing this doesn't pickup icons - USE CDN FOR NOW in main.scss
// import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)

const pi = 3.12;
console.log(pi);

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
