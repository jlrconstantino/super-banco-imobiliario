<!-- .:::: TEMPLATE ::::. -->
<template>
    <div id="unary-transaction-container">
        <h2 v-if="!is_landscape">Um Jogador</h2>
        <div class="player-selector">
            <player-selector @change="target_player_id = $event" :keyname="'u'">
            </player-selector>
        </div>
        <div class="calculator">
            <transaction-calculator 
                @add="(value) => add_balance(value)"
                @reduce="(value) => reduce_balance(value)">
            </transaction-calculator>
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
        name: 'UnaryComponent', 
        components: {
            'player-selector': PlayerSelectorComponentVue, 
            'transaction-calculator': CalculatorComponentVue,
        }, 

        // Jogador-alvo e operação
        data() {
            return {
                target_player_id: -1, 
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

                    // Validação de ID
                    if(this.target_player_id >= 0){

                        // Atualização local
                        store.commit("add_balance", {
                            id: this.target_player_id, 
                            value: value,
                        });
                        store.commit("update_id", {
                            key: 'u', 
                            value: this.target_player_id,
                        });

                        // Atualização no banco de dados
                        let player = store.getters.players[this.target_player_id];
                        update_player(player);
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

                    // Validação de ID
                    if(this.target_player_id >= 0){

                        // Validação de saldo disponível
                        let player = store.getters.players[this.target_player_id];
                        if(value <= player.balance) {

                            // Atualização local
                            store.commit("reduce_balance", {
                                id: this.target_player_id, 
                                value: value,
                            });

                            // Atualização no banco de dados
                            update_player(player);

                        }else{
                            alert("Não há saldo o suficiente para esta operação.");
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
    #unary-transaction-container {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-around;
    }
    #unary-transaction-container .player-selector {
        width: 30%;
    }
    #unary-transaction-container .calculator {
        padding-right: 2.5%;
        width: 60%;
    }

    /* Adaptações para dispositivo móvel */
    #unary-transaction-container h2 {
        width: 100%;
        height: auto;
        text-align: center;
        font-size: 1.4rem;
        font-weight: bold;
        color: var(--main-blue);
        margin: 1rem 0;
    }
    @media (orientation: portrait) {
        #unary-transaction-container {
            width: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
        }
        #unary-transaction-container .player-selector {
            padding: 2.5% 1.5%;
            width: 87.5%;
        }
        #unary-transaction-container .calculator {
            padding: 0 1.5%;
            width: 87.5%;
            margin-bottom: 7.5%;
        }
    }
</style>