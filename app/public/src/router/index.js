// Importação dos elementos necessários para a construção de rotas
import { createRouter, createWebHistory } from 'vue-router';

// Importação dos componentes das rotas
import PlayersView from "@/views/PlayersView.vue"
import BankView from "@/views/BankView.vue"

// Rotas estabelecidas
const routes = [

  // Página principal (jogadores)
  {
    path: '/', 
    name: 'players', 
    component: PlayersView, 
  },

  // Página do banco
  {
    path: '/bank', 
    name: 'bank', 
    component: BankView,
  },

];

// Roteador
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Exportação do roteador para uso externo
export default router;
