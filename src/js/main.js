import '../scss/main.scss';
import '../img/worst_ever.jpg';

// importing this doesn't pickup icons - USE CDN FOR NOW in main.scss
// import 'element-ui/lib/theme-default/index.css'

import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from 'axios'
import Chart from 'chartjs'
import _ from 'lodash'

Vue.use(ElementUI)

const pi = 3.11;
console.log(pi);

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
