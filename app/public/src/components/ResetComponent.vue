<!-- .:::: TEMPLATE ::::. -->
<template>
    <div id="reset-container">
        <h2 v-if="!is_landscape">Reiniciar Jogo</h2>
        <div class="player-reset" v-for="player in players" :key="player">
            <player-reset :player_id="player.id"></player-reset>
        </div>
        <div id="resetter">
            <p>Patrimônio inicial para os jogadores:</p>
            <div class="input-number">
                <button @click="decrement_initial_cash()"></button>
                <input v-model="initial_cash" type="number" min="0" max="500000" step="5000">
                <button @click="increment_initial_cash()" class="plus"></button>
            </div>
            <button class="button" @click="reset_game()">Novo Jogo</button>
        </div>
    </div>
</template>


<!-- .:::: SCRIPT ::::. -->
<script>

    // Compartilhamento de estados
    import store from '@/store';

    // Manipulação de base de dados
    import { update_player } from '@/utils/database-management';  

    // Componentes
    import PlayerResetComponentVue from './PlayerResetComponent.vue';

    // Lógica local
    export default {

        // Componente
        name: 'ResetComponent', 
        components: {
            'player-reset': PlayerResetComponentVue, 
        }, 

        // Valor inicial
        data() {
            return {
                initial_cash: 25000, 
            };
        }, 

        // Métodos
        methods: {

            // Controle de input
            increment_initial_cash() {
                this.initial_cash += 5000;
            },
            decrement_initial_cash() {
                this.initial_cash -= 5000;
                if(this.initial_cash < 0)
                    this.initial_cash = 0;
            },

            // Novo jogo
            reset_game() {
                let players = store.getters.players;
                for(let i=0; i<players.length; ++i) {
                    players[i].balance = this.initial_cash;
                    update_player(players[i]);
                }
                alert("Novo jogo criado.");
            },
        }, 

        // Atributos computados
        computed: {
            players() {
                return store.getters.players;
            },
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
    #reset-container {
        width: 100%;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }
    #reset-container .player-reset {
        margin-left: 2%;
        margin-right: 2.5%;
        margin-bottom: 2%;
        width: 28%;
    }
    @media (orientation: portrait) {
        #reset-container .player-reset {
            width: 86.5%;
        }
    }

    /* Seção de reset */
    #resetter {
        margin-left: 4.5%;
        width: 90%;
        height: auto;
        background-color: var(--deepest-blue);
        border: 2px solid var(--main-blue);
        border-radius: 8px;
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
    }
    #resetter p, #resetter input {
        text-align: center;
        color: var(--main-blue);
        font-size: 1.8rem;
    }
    #resetter p {
        font-weight: bold;
    }
    @media (orientation: portrait) {
        #resetter {
            margin-top: 5%;
            margin-bottom: 5%;
            margin-right: 4.5%;
            width: 100%;
            flex-direction: column;
        }
        #resetter p {
            margin: 5% 0;
        }
        #resetter .input-number, #resetter .button {
            margin-bottom: 5%;
        }
        #resetter p, #resetter input {
            font-size: 1.2rem;
        } 
    }
    @media (orientation: landscape) {
        #resetter button {
            font-size: 1.8rem;
        }
    }

    /* Quantia de capital inicial */
    #resetter .input-number {
        display: inline-flex;
        transition-duration: 0.1s;
        transition-timing-function: linear;
        color: var(--main-blue);
    }
    #resetter .input-number, #resetter .input-number * {
        outline: none;
        box-sizing: border-box;
    }
    #resetter input {
        -webkit-appearance: textfield;
        -moz-appearance: textfield;
        appearance: textfield;
        border: none;
        background-color: transparent;
        color: var(--main-blue);
    }
    #resetter input::-webkit-inner-spin-button,
    #resetter input::-webkit-outer-spin-button {
        -webkit-appearance: none;
    }
    #resetter .input-number button {
        border: 2px solid var(--main-blue);
        background-color: transparent;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: 2.3rem;
        height: 2.3rem;
    }
    @media (orientation: portrait) {
        #resetter .input-number button {
            width: 1.7rem;
            height: 1.7rem;
        }   
    }
    #resetter .input-number button:before,
    #resetter .input-number button:after {
        display: inline-block;
        position: absolute;
        content: '';
        width: 1rem;
        height: 2px;
        background-color: var(--main-blue);
        transform: translate(-50%, -50%);
    }
    #resetter .input-number button.plus:after {
        transform: translate(-50%, -50%) rotate(90deg);
    }

</style>