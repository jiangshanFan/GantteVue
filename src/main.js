// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import gunter from './components/gante_test/gante'

// Vue.use(gunter)
// import Gante from './components/gante_test/gante.vue'

// const VueGante = Vue.extend(Gante)
// let gante = null

// function $gante(params) {
//   return new Promise(resolve => {
//     if (!gante) {
//       gante = new VueGante()
//       gante.$mount()
//       let container = 'body'
//       if (params.container) {
//         container = params.container
//       }
//       // console.log('document.querySelector(container)',document.querySelector(container))
//       document.querySelector(container).appendChild(gante.$el)
//     }
//     gante.init(params)
//     resolve()
//   })
// }

// Vue.prototype.$gante = $gante

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
