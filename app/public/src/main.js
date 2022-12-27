// Importações
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import { start_local_storage } from "./utils/local-storage-management.js";

// Inicialização do repositório local
// start_local_storage();

// Criação do aplicativo
createApp(App).use(store).use(router).mount('#app');