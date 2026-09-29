import { createApp } from 'vue';
import App from './App.vue';
import { animateDirective } from './directives/animate.js';
import './input.css';

const app = createApp(App);

app.directive('animate', animateDirective());
app.mount('#app');
