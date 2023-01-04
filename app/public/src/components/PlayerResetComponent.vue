<!-- .:::: TEMPLATE ::::. -->
<template>
    <div id="player-reset-container">
        <input class="player-info player-name" v-model="player.name" type="text">
        <img :src="require(`@/assets/players/${player.filename}`)" class="player-icon" :style="css_variables">
        <p class="player-info player-hue-text">Coloração</p>
        <input class="player-hue" v-model="player.hue" type="range" min="0" max="360">
        <button :class="{'green-button' : player.active, 'red-button': !player.active}" @click="toggle_activation()">{{button_text}}</button>
    </div>
</template>


<!-- .:::: SCRIPT ::::. -->
<script>

    // Compartilhamento de estados
    import store from '@/store';

    // Jogador vazio
    import { get_dummy_player } from '@/utils/utils';

    // Lógica local
    export default {

        // Nome do componente
        name: 'PlayerResetComponent', 

        // Dados do jogador
        data() { 
            return {
                player: get_dummy_player(), 
            };
        }, 

        // ID do jogador
        props: {
            player_id: {default: 0},
        }, 

        // Seleção inicial do jogador
        mounted() {
            this.player = store.getters.players[this.player_id];
        }, 

        // Troca a ativação do jogador
        methods: {
            toggle_activation() {
                this.player.active = this.player.active == true ? false : true;
            },
        },

        // Atributos computados
        computed: {

            // Para automação do filtro CSS
            css_variables() {
                return {
                    '--hue-rotation': this.player.hue + 'deg'
                };
            }, 

            // Para selecionar o rótulo do botão
            button_text() {
                if(this.player.active === true)
                    return 'Ativado';
                return 'Desativado';
            },
        },
    }
</script>


<!-- .:::: STYLE ::::. -->
<style>
    @import "../css/colors.css";

    /* Contêiner */
    #player-reset-container {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 2px solid var(--main-blue);
        background-color: var(--deepest-blue);
        padding: 1rem;
        border-radius: 8px;
    }

    /* Seletor */
    #player-reset-container .player-info {

        width: 85%;
        height: auto;

        margin-top: 2%;
        padding: 0.5rem 1rem;

        text-align: center;
        font-size: 1.8rem;

        color: var(--main-blue);
        background-color: var(--deepest-blue);

        transition-duration: 0.1s;
        transition-timing-function: linear;
    }
    #player-reset-container .player-name {
        font-weight: bold;
        border-radius: 8px;
        border: 2px solid var(--main-blue);
        margin-bottom: 1rem;
    }
    #player-reset-container .player-hue-text {
        border-bottom: 1px solid var(--main-blue);
        margin-bottom: 0.8rem;
    }
    @media (orientation: portrait) {
        #player-reset-container .player-info {
            font-size: 1.2rem;
        }   
    }


    /* Imagem */
    #player-reset-container .player-icon {
        width: 60%;
        height: auto;
        padding: 1rem;

        /* Filtro automatizado */
        filter: hue-rotate(var(--hue-rotation));
    }


    /* Hue-range */
    #player-reset-container .player-hue {
        width: 85%;
        height: 1rem;
        -webkit-appearance: none;
        appearance: none;
        background: var(--deepest-blue);
        border: 1px solid var(--main-blue);
        border-radius: 8px;
        opacity: 0.7;
        -webkit-transition: .2s;
        transition: opacity .2s;
        margin-top: 2%;
        margin-bottom: 2rem;
    }
    #player-reset-container .player-hue:hover {
        opacity: 1.0;
    }
    #player-reset-container .player-hue::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 1.8rem;
        height: 1.8rem;
        border: 2px solid var(--main-blue);
        border-radius: 50%;
        background: var(--deepest-blue);
        cursor: pointer;
    }

</style>