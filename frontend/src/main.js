import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// PrimeVue CSS (load first)
import 'primeicons/primeicons.css';
import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/lara-light-amber/theme.css';

// Tailwind CSS (load last so utilities take precedence)
import './style.css';

const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
  ripple: true,
  inputStyle: 'filled',
});
app.use(ToastService);

app.mount('#app');
