<!-- .:::: TEMPLATE ::::. -->
<template>
    <div id="binary-transaction-container">
        <h2 v-if="!is_landscape">Dois Jogadores</h2>
        <div class="player-selector">
            <player-selector @change="left_player_id = $event" class="left" :keyname="'bl'">
            </player-selector>
        </div>
        <div class="calculator">
            <transaction-calculator 
                @add="(value) => add_balance(value)"
                @reduce="(value) => reduce_balance(value)">
            </transaction-calculator>
        </div>
        <div class="player-selector">
            <player-selector @change="right_player_id = $event" class="right" :keyname="'br'">
            </player-selector>
        </div>
    </div>
</template>


<!-- .:::: SCRIPT ::::. -->
<script>

    // Store
    import store from '@/store';

    // Jogador vazio e atualização de jogador
    import { update_player } from '@/utils/database-management';

    // Seletor de jogador e calculadora
    import PlayerSelectorComponentVue from './PlayerSelectorComponent.vue';
    import CalculatorComponentVue from './CalculatorComponent.vue';

    // Lógica local
    export default {

        // Componentes
        name: 'BinaryComponent', 
        components: {
            'player-selector': PlayerSelectorComponentVue, 
            'transaction-calculator': CalculatorComponentVue,
        }, 

        // Jogador-alvo e operação
        data() {
            return {
                left_player_id: -1, 
                right_player_id: -1, 
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
                    if(this.left_player_id >= 0 && this.right_player_id >= 0){
                        if(this.left_player_id != this.right_player_id){

                            // Verificação do saldo
                            let right_player = store.getters.players[this.right_player_id];
                            if(right_player.balance >= value) {

                                // Atualização do armazenamento local
                                store.commit("add_balance", {
                                    id: this.left_player_id, 
                                    value: value,
                                });
                                store.commit("reduce_balance", {
                                    id: this.right_player_id, 
                                    value: value,
                                });
                                store.commit("update_id", {
                                    key: 'bl', 
                                    value: this.left_player_id,
                                });
                                store.commit("update_id", {
                                    key: 'br', 
                                    value: this.right_player_id,
                                });

                                // Atualização do armazenamento da base de dados
                                let left_player = store.getters.players[this.left_player_id];
                                update_player(left_player);
                                update_player(right_player);

                            }else{
                                alert("O segundo jogador não possui saldo o suficiente para esta transação.");
                            }
                        }else{
                            alert("A transação requer dois jogadores distintos.");
                        }
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
                    if(this.left_player_id >= 0 && this.right_player_id >= 0){
                        if(this.left_player_id != this.right_player_id){

                            // Verificação do saldo
                            let left_player = store.getters.players[this.left_player_id];
                            if(left_player.balance >= value) {

                                // Atualização do armazenamento local
                                store.commit("reduce_balance", {
                                    id: this.left_player_id, 
                                    value: value,
                                });
                                store.commit("add_balance", {
                                    id: this.right_player_id, 
                                    value: value,
                                });
                                store.commit("update_id", {
                                    key: 'bl', 
                                    value: this.left_player_id,
                                });
                                store.commit("update_id", {
                                    key: 'br', 
                                    value: this.right_player_id,
                                });

                                // Atualização do armazenamento da base de dados
                                let right_player = store.getters.players[this.right_player_id];
                                update_player(left_player);
                                update_player(right_player);

                            }else{
                                alert("O primeiro jogador não possui saldo o suficiente para esta transação.");
                            }
                        }else{
                            alert("A transação requer dois jogadores distintos.");
                        }
                    }
                }else{
                    alert("O valor fornecido é inválido.");
                }
            },

        }, 

        // Atributos computados
        computed: {

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
    #binary-transaction-container {
        width: 100%;
        display: inline-flex;
        align-items: flex-start;
        gap: 2.5%;
    }
    #binary-transaction-container .player-selector {
        margin: 0 0.5%;
        width: 20%;
    }
    #binary-transaction-container .calculator {
        width: 50%;
    }

    /* Adaptações para dispositivo móvel */
    #binary-transaction-container h2 {
        width: 100%;
        height: auto;
        text-align: center;
        font-size: 1.4rem;
        font-weight: bold;
        color: var(--main-blue);
        margin: 1rem 0;
    }
    @media (orientation: portrait) {
        #binary-transaction-container {
            width: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
        }
        #binary-transaction-container .player-selector {
            padding: 2.5% 1%;
            width: 87.5%;
        }
        #binary-transaction-container .calculator {
            padding: 0 1.5%;
            width: 87.5%;
        }
        #binary-transaction-container .right {
            margin-bottom: 7.5%;
        }
    }
</style>