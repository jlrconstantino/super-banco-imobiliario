<!-- .:::: TEMPLATE ::::. -->
<template>
    <div id="small-player-container">
        <p class="player-name">{{player.name}}</p>
        <div class="secondary-container">
            <img class="dollar-icon" src="@/assets/icons/blue-dollar-alt.svg">
            <p class="animated-number">
                <animated-number :number="player.balance"></animated-number>
            </p>
        </div>
    </div>
</template>


<!-- .:::: SCRIPT ::::. -->
<script>

    // Compartilhamento de estados
    import store from '@/store';

    // Jogador vazio
    import { get_dummy_player } from '@/utils/utils';

    // Animador numérico
    import NumberAnimatorComponentVue from './NumberAnimatorComponent.vue';

    // Lógica local
    export default {

        // Nome do componente
        name: 'SmallPlayerComponent', 
        components: {'animated-number': NumberAnimatorComponentVue},

        // Dados locais
        data() { 
            return {
                player: get_dummy_player(), 
            };
        }, 

        // Atributos externos
        props: {
            player_id: {default: 0},
        }, 

        // Seleção inicial do jogador
        mounted() {
            this.player = store.getters.players[this.player_id];
        }, 
    }
</script>


<!-- .:::: STYLE ::::. -->
<style>
    @import "../css/colors.css";

    /* Contêiner */
    #small-player-container {
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
    #small-player-container .player-name {

        width: 85%;
        height: auto;

        margin-top: 2%;
        margin-bottom: 1rem;
        padding: 0.5rem 1rem;

        text-align: center;
        font-size: 1.8rem;
        font-weight: bold;
        color: var(--main-blue);

        border: 2px solid var(--main-blue);
        background-color: var(--deepest-blue);
        border-radius: 8px;

        transition-duration: 0.1s;
        transition-timing-function: linear;
    }
    @media (orientation: portrait) {
        #small-player-container .player-name {
            font-size: 1.2rem;
        }   
    }

    /* Saldo */
    #small-player-container .secondary-container {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    #small-player-container .animated-number {
        width: 65%;
        height: auto;
        font-weight: bold;
        justify-content: center;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        font-size: 1.8rem;
        text-align: center;
        color: var(--main-blue);
        border: 2px solid var(--main-blue);
    }
    #small-player-container .dollar-icon {
        width: auto;
        height: 2.5rem;
    }
    @media (orientation: portrait) {
        #small-player-container .animated-number {
            width: 70%;
            font-size: 1.2rem;
        }
        #small-player-container .dollar-icon {
            height: 2rem;
        }
    }

</style>