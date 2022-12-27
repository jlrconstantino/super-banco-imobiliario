// Importações
import { createStore } from 'vuex';

// Para compartilhamento de estados
const store = createStore({

  // Estados compartilhados
  state: {

    // Para definir as categorias em ênfase
    featured_categories: [
      "Mais Vendidos", 
      "Promoções", 
      "Lançamentos", 
      "Infantil", 
    ], 

    // Usuário ativo
    user: {
      id: null, 
      name: null, 
      role: null, 
    }, 

    // Carrinho ativo
    cart: [

    ], 

    // Frete ativo
    freight: 0.0, 

    // Método de compra ativo
    payment_method: null, 
    payment_method_index: -1, 

    // Endereço de entrega ativo
    delivery_address: null, 
    delivery_address_index: -1, 

  },

  // Métodos acessores customizados
  getters: {

    // ID do usuário
    user_id(state) {
      return state.user.id;
    }, 

    // Nome do usuário
    user_name(state) {
      return state.user.name;
    }, 

    // Para verificar autenticação
    is_authenticated(state) {
      return state.user.id != null;
    },

    // Para verificar permissões administrativas
    is_admin(state) {
      return state.user.role === 'admin';
    }, 

    // Frete
    freight(state) {
      return state.freight;
    }, 

    // Retorna o carrinho de compras
    get_shopping_cart(state) {
      return state.cart;
    }, 

    // Retorna a quantia total de elementos no carrinho
    get_shopping_cart_total_quantity(state) {
      let output = 0;
      for(const item of state.cart){
        output += item.quantity;
      }
      return output;
    }, 

    // Retorna o subtotal do carrinho de compras
    get_shopping_cart_subtotal(state) {
      let output = 0.0;
      for(const item of state.cart){
        output += item.subtotal;
      }
      return output;
    }, 

    // Retorna o método de pagamento ativo
    payment_method(state) {
      return state.payment_method;
    }, 

    // Retorna o endereço de entrega ativo
    delivery_address(state) {
      return state.delivery_address;
    }, 

    // Retorna o índice do método de pagamento ativo
    payment_method_index(state) {
      return state.payment_method_index;
    }, 

    // Retorna o índice do endereço de entrega ativo
    delivery_address_index(state) {
      return state.delivery_address_index;
    }, 
  },

  // Métodos modificadores
  mutations: {


    // Modifica o usuário
    set_user(state, user) {
      state.user.id = user.id;
      state.user.name = user.name;
      state.user.role = user.role;
    }, 


    // Realiza logout
    logout(state) {
      state.user.id = null;
      state.user.name = null;
      state.user.role = null;
      state.cart = [];
      state.payment_method = null;
      state.delivery_address = null;
    }, 


    // Atualiza o frete
    set_freight(state, value) {
      state.freight = value;
    }, 


    // Adiciona um item ao carrinho
    add_cart_item(state, product_id) {

      // Verifica existência prévia
      let index = state.cart.findIndex(item => {
        return item.product == product_id;
      });
      
      // Adição de um novo item
      if(index < 0){
        state.cart.push({
          product: product_id, 
          quantity: 1, 
          subtotal: 0, 
        });
      }
    }, 


    // Remove um item do carrinho
    remove_cart_item(state, product_id) {

      // Verifica existência prévia
      let index = state.cart.findIndex(item => {
        return item.product == product_id;
      });

      // Remoção
      if(index !== -1) {
        state.cart.splice(index, 1);
      }
    }, 


    // Limpa o carrinho
    clear_cart(state) {
      state.cart.length = 0;
    }, 


    // Atualiza a quantidade de um item do carrinho de compras
    update_cart_item_quantity(state, payload) {
      state.cart[payload.index].quantity = payload.quantity;
    }, 


    // Atualiza o subtotal de um item do carrinho de compras
    update_cart_item_subtotal(state, payload) {
      state.cart[payload.index].subtotal = payload.subtotal;
    }, 


    // Desativa os atributos de finalização de compra
    end_purchase_finalization(state) {
      state.payment_method = null;
      state.delivery_address = null;
      state.payment_method_index = -1;
      state.delivery_address_index = -1;
    }, 


    // Seleciona um método de pagamento
    set_payment_method(state, payment_method) {
      state.payment_method = payment_method;
    }, 


    // Seleciona um endereço de entrega
    set_delivery_address(state, delivery_address) {
      state.delivery_address = delivery_address;
    }, 


    // Seleciona um índice para método de pagamento
    set_payment_method_index(state, payment_method_index) {
      state.payment_method_index = payment_method_index;
    }, 


    // Seleciona um índice apra endereço de entrega
    set_delivery_address_index(state, delivery_address_index) {
      state.delivery_address_index = delivery_address_index;
    }, 
  },

  actions: {
  },
  modules: {
  }
})

// Exportação
export default store;