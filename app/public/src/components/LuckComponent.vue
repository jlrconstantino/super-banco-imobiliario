<!-- .:::: TEMPLATE ::::. -->
<template>
    <div id="luck-container">
        <h2 v-if="!is_landscape">Sorte ou Revés</h2>
        <div class="player-displayer">
            <player-selector @change="left_player_id = $event" class="left" :keyname="'L'">
            </player-selector>
        </div>
        <div class="calculator">
            <transaction-calculator 
                @add="(value) => add_balance(value)"
                @reduce="(value) => reduce_balance(value)">
            </transaction-calculator>
        </div>
        <div class="player-displayer" :class="{'player-column' : is_landscape}">
            <small-displayer v-for="player in unselected_players" :player_id="player.id" :key="player" class="small-displayer">
            </small-displayer>
        </div>
    </div>
</template>


<!-- .:::: SCRIPT ::::. -->
<script>

    // Store
    import store from '@/store';

    // Jogador vazio e atualização de jogador
    import { update_player } from '@/utils/database-management';

    // Componentes
    import PlayerSelectorComponentVue from './PlayerSelectorComponent.vue';
    import CalculatorComponentVue from './CalculatorComponent.vue';
    import SmallPlayerComponentVue from './SmallPlayerComponent.vue';

    // Lógica local
    export default {

        // Componentes
        name: 'LuckComponent', 
        components: {
            'player-selector': PlayerSelectorComponentVue, 
            'transaction-calculator': CalculatorComponentVue,
            'small-displayer': SmallPlayerComponentVue,
        }, 

        // Jogador-alvo e operação
        data() {
            return {
                left_player_id: -1, 
                target_value: 0, 
            };
        },

        // Métodos auxiliares
        methods: {

            // Adicionar saldo
            add_balance(value) {

                // Validação de valor
                value = parseInt(value);
                if(value > 0) {

                    // Validação de jogador
                    if(this.left_player_id >= 0){

                        // Atualização do jogador-alvo
                        store.commit("add_balance", {
                            id: this.left_player_id, 
                            value: value * this.unselected_players.length,
                        });
                        let left_player = store.getters.players[this.left_player_id];
                        update_player(left_player);

                        // Atualização dos demais jogadores
                        for(let i=0; i<this.unselected_players.length; ++i){
                            store.commit("reduce_balance", {
                                id: this.unselected_players[i].id, 
                                value: value,
                            });
                            update_player(this.unselected_players[i]);
                        }

                        // Atualização do ID salvo
                        store.commit("update_id", {
                            key: 'L', 
                            value: this.left_player_id,
                        });
                    }
                    
                }else{
                    alert("O valor fornecido é inválido.");
                }
            }, 

            // Remover saldo
            reduce_balance(value) {

                // Validação de valor
                value = parseInt(value);
                if(value > 0) {

                    // Validação de jogador
                    if(this.left_player_id >= 0){

                        // Atualização do jogador-alvo
                        store.commit("reduce_balance", {
                            id: this.left_player_id, 
                            value: value * this.unselected_players.length,
                        });
                        let left_player = store.getters.players[this.left_player_id];
                        update_player(left_player);

                        // Atualização dos demais jogadores
                        for(let i=0; i<this.unselected_players.length; ++i){
                            store.commit("add_balance", {
                                id: this.unselected_players[i].id, 
                                value: value,
                            });
                            update_player(this.unselected_players[i]);
                        }

                        // Atualização do ID salvo
                        store.commit("update_id", {
                            key: 'L', 
                            value: this.left_player_id,
                        });
                    }
                    
                }else{
                    alert("O valor fornecido é inválido.");
                }
            },
        }, 

        // Atributos computados
        computed: {

            // Jogadores não selecionados
            unselected_players() {
                return store.getters.active_players.filter((player) => {
                    return player.id != this.left_player_id;
                });
            },

            // Detecção de orientação da tela
            is_landscape() {
                return screen.orientation.type[0] === 'l';
            },
        },
    }
</script>


<!-- .:::: STYLE ::::. -->
<style>
    @import "../css/colors.css";

    /* Contêiner */
    #luck-container {
        width: 100%;
        display: inline-flex;
        align-items: flex-start;
        gap: 2.5%;
    }
    #luck-container .player-displayer {
        margin: 0 0.5%;
        width: 20%;
    }
    #luck-container .player-column {
        margin-left: 2%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    #luck-container .small-displayer {
        margin-bottom: 3%;
    }
    #luck-container .calculator {
        width: 50%;
    }

    /* Adaptações para dispositivo móvel */
    #luck-container h2 {
        width: 100%;
        height: auto;
        text-align: center;
        font-size: 1.4rem;
        font-weight: bold;
        color: var(--main-blue);
        margin: 1rem 0;
    }
    @media (orientation: portrait) {
        #luck-container {
            width: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
        }
        #luck-container .player-displayer {
            padding: 2.5% 1%;
            width: 87.5%;
        }
        #luck-container .calculator {
            padding: 0 1.5%;
            width: 87.5%;
        }
        #luck-container .right {
            margin-bottom: 7.5%;
        }
    }
</style>