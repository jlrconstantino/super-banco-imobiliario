// Importação dos elementos necessários para a construção de rotas
import { createRouter, createWebHistory } from 'vue-router';

// Importação do Vuex
import store from '@/store/index.js';

// Importação dos componentes das rotas
import AccountWrapperView from '@/views/AccountWrapperView.vue';
import AccountNavigationView from '@/views/AccountNavigationView.vue';
import CartView from '@/views/CartView.vue';
import CategoriesManager from '@/components/CategoriesManager.vue';
import CategoryView from '@/views/CategoryView.vue';
import HomeView from '@/views/HomeView.vue';
import LogRegForm from '@/components/LogRegForm.vue';
import ProductsManager from '@/components/ProductsManager.vue';
import ProductView from '@/views/ProductView.vue';
import ProfileAddresses from '@/components/ProfileAddresses.vue';
import ProfileCartHistory from '@/components/ProfileCartHistory.vue';
import ProfileData from '@/components/ProfileData.vue';
import ProfilePayment from '@/components/ProfilePayment.vue';
import PurchasePayment from '@/components/PurchasePayment.vue';
import PurchaseAddress from '@/components/PurchaseAddress.vue';
import PurchaseFinal from '@/components/PurchaseFinal.vue';
import PurchaseView from '@/views/PurchaseView.vue';
import SearchView from '@/views/SearchView.vue';
import UsersManager from '@/components/UsersManager.vue';

// Rotas estabelecidas
const routes = [

  // Página principal
  {
    path: '/', 
    name: 'home', 
    component: HomeView, 
  },

  // Carrinho de compras
  {
    path: '/cart', 
    name: 'cart', 
    component: CartView, 
  }, 

  // Finalização de compras
  {
    path: '/purchase', 
    name: 'purchase', 
    redirect: {name: 'purchase-payment-method'}, 
    meta: {requires_authentication: true}, 
    component: PurchaseView, 
    children: [

      // Página de método de pagamento da compra
      {
        name: 'purchase-payment-method', 
        path: '', 
        component: PurchasePayment
      }, 

      // Página de endereço de entrega da compra
      {
        name: 'purchase-delivery-address', 
        path: '', 
        component: PurchaseAddress
      }, 

      // Página de método de pagamento da compra
      {
        name: 'purchase-final', 
        path: '', 
        component: PurchaseFinal
      }, 

    ], 
  }, 

  // Página de produto
  {
    path: '/product', 
    name: 'product', 
    component: ProductView, 
    query: ['id'], 
  }, 

  // Página de busca
  {
    path: '/search', 
    name: 'search', 
    component: SearchView, 
  }, 

  // Página de busca por categoria
  {
    path: '/category', 
    name: 'category', 
    query: ['id'], 
    component: CategoryView, 
  }, 

  // Página da conta de usuário
  {
    path: '/account', 
    name: 'account', 
    redirect: {name: 'login'}, 
    component: AccountWrapperView, 
    children: [

      // Página de login/registro
      {
        path: 'login', 
        name: 'login', 
        component: LogRegForm
      }, 

      // Página de perfil do usuário (requer autenticação)
      {
        path: 'profile', 
        name: 'profile', 
        component: AccountNavigationView, 
        redirect: {name: 'profile-data'}, 
        meta: {
          requires_authentication: true, 
        }, 
        children: [

          // Página de dados pessoais do usuário
          {
            name: 'profile-data', 
            path: 'data', 
            component: ProfileData
          }, 

          // Página de métodos de pagamento do usuário
          {
            name: 'profile-payment-methods', 
            path: 'payment-methods', 
            component: ProfilePayment
          }, 

          // Página de endereços de entrega do usuário
          {
            name: 'profile-addresses', 
            path: 'addresses', 
            component: ProfileAddresses
          }, 

          // Página de histórico de compras
          {
            name: 'profile-cart-history', 
            path: 'cart-history', 
            component: ProfileCartHistory
          }, 

          // Página de gerenciamento de usuários
          {
            name: 'manage-users', 
            path: 'manage-users', 
            component: UsersManager, 
            meta: {
              requires_admin_role: true, 
            }, 
          }, 

          // Página de gerenciamento de produtos
          {
            name: 'manage-products', 
            path: 'manage-products', 
            component: ProductsManager, 
            meta: {
              requires_admin_role: true, 
            }, 
          }, 

          // Página de gerenciamento de categorias
          {
            name: 'manage-categories', 
            path: 'manage-categories', 
            component: CategoriesManager, 
            meta: {
              requires_admin_role: true, 
            }, 
          }, 
        ], 
      }, 
    ], 
  }, 
];

// Roteador
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Para verificações especiais de rota
router.beforeEach((to, from, next) => {

  // Verifica necessidade de autenticação
  if (to.matched.some(record => record.meta.requires_authentication)) {

    // Verifica autenticação
    if (store.getters.is_authenticated) {

      // Verifica necessidade de permissões administrativas
      if (to.matched.some(record => record.meta.requires_admin_role)) {

        // Verifica permissão administrativa
        if(store.getters.is_admin){
          next();
        }

        // Não é um administrador
        else{
          next({name: 'home'})
        }
      }

      // Não necessita de permissões administrativas
      else{
        next();
      }
    } 
    
    // Usuário não autenticado
    else {
      next({name: 'login'});
    }
  } 
  
  // Página não necessita autenticação
  else {
    next();
  }

  // Verifica saída da página de finalização de compra
  if(from.name.length >= 8 && from.name.substring(0,8) === 'purchase'){
    if(to.name.length < 8 || to.name.substring(0,8) !== 'purchase'){
      store.commit("end_purchase_finalization");
    }
  }
})

// Exportação do roteador para uso externo
export default router;
