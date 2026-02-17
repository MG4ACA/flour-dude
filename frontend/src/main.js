import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'

// PrimeVue CSS
import 'primevue/resources/themes/lara-light-amber/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

// Tailwind CSS
import './style.css'

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
  ripple: true,
  inputStyle: 'filled'
})

app.mount('#app')
