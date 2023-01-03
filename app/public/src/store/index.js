// Importações
import { createStore } from 'vuex';

// Para compartilhamento de estados
const store = createStore({

  // Estados compartilhados
  state: {

    // Jogadores
    players: [
      {id: 0, name: 'bag', balance: 25000, hue: 0, active: true, filename: 'bag.png'}, 
      {id: 1, name: 'bank', balance: 25000, hue: 0, active: true, filename: 'bank.png'}, 
      {id: 2, name: 'briefcase', balance: 25000, hue: 0, active: true, filename: 'briefcase.png'}, 
      {id: 3, name: 'coin', balance: 25000, hue: 0, active: true, filename: 'coin.png'}, 
      {id: 4, name: 'coinstack', balance: 25000, hue: 0, active: true, filename: 'coins.png'}, 
      {id: 5, name: 'piggybank', balance: 25000, hue: 0, active: true, filename: 'piggybank.png'}, 
    ], 

    // Jogadores salvos
    saved_ids: {'u': 0, 'bl': 0, 'br': 0, 'L': 0}, 

  },

  // Métodos acessores
  getters: {

    // Jogadores
    players(state) {
      return state.players;
    }, 

    // Jogadores ativos
    active_players(state) {
      return state.players.filter((player) => {
        return player.active === true;
      });
    },

    // Jogadores salvos
    saved_ids(state) {
      return state.saved_ids;
    },

  },

  // Métodos modificadores
  mutations: {
    
    // Adiciona saldo a um jogador
    // 'payload' deve possuir 'id' e 'value'
    add_balance(state, payload) {
      let player = state.players.find(p => {
        return p.id == payload.id;
      });
      player.balance += payload.value;
    }, 

    // Remove saldo de um jogador
    // 'payload' deve possuir 'id' e 'value'
    reduce_balance(state, payload) {
      let player = state.players.find(p => {
        return p.id == payload.id;
      });
      player.balance -= payload.value;
    }, 

    // Modifica um ID salvo
    // 'payload' deve possuir 'key' e 'value'
    update_id(state, payload) {
      state.saved_ids[payload.key] = payload.value;
    }, 

    // Ativa/desativa um jogador
    toggle_player_activation(state, id) {
      if(state.players[id].active === true){
        state.players[id].active = false;
      }else{
        state.players[id].active = true;
      }
    },
  },

  actions: {
  },
  modules: {
  }
})

// Exportação
export default store;