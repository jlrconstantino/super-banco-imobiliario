<!-- .:::: TEMPLATE ::::. -->
<template>
    <div id="player-reset-container">
        <p class="player-name">{{player.name}}</p>
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
    #player-reset-container .player-name {

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
        #player-reset-container .player-name {
            font-size: 1.2rem;
        }   
    }

</style>