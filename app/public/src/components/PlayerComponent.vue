<!-- .:::: TEMPLATE ::::. -->
<template>
    <div class="player-container">
        <img class="player-image" :src="require(`@/assets/players/${player.filename}`)">
        <div class="player-balance">
            <img src="@/assets/icons/dollar-alt.svg">
            <p>
                <animated-number :number="player.balance"></animated-number>
            </p>
        </div>
    </div>
</template>


<!-- .:::: SCRIPT ::::. -->
<script>

    // Estados compartilhados
    import store from '@/store';

    // Animador numérico
    import NumberAnimatorComponentVue from './NumberAnimatorComponent.vue';

    // Lógica local
    export default {

        // Nome do componente
        name: 'PlayerComponent', 
        components: {'animated-number': NumberAnimatorComponentVue},

        // Atributos externos
        props: {
            'player_id': {default: 0}
        }, 

        // Jogador
        computed: {
            player() {
                return store.getters.players[this.player_id];
            }, 
        },
        
    }
</script>


<!-- .:::: STYLE ::::. -->
<style scoped>
    @import "../css/colors.css";

    /* Contêiner principal */
    .player-container {
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-bottom: 1rem;
    }
    @media (orientation: portrait) {
        .player-container {
            width: 40%;
        }
    }
    @media (orientation: landscape) {
        .player-container {
            width: 25%;
        }
    }

    /* Imagem do jogador */
    .player-image {
        padding: 5% 15%;
        width: 70%;
        height: auto;
        margin-bottom: 1rem;
        border-radius: 12px;
        transition: 0.1s all ease-out;
    }
    .player-image:hover {
        cursor: pointer;
        filter: drop-shadow(0 0 25px var(--main-blue));
    }

    /* Informações do jogador */
    .player-balance {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-bottom: 0.3rem;
        width: 100%;
    }
    .player-balance p {
        width: auto;
        max-width: calc(75%-2rem);
        height: auto;
        font-weight: bold;
        justify-content: center;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        background-color: var(--main-white);
        font-size: 1.4rem;
        color: var(--main-blue);
    }
    .player-balance img {
        width: 20%;
        height: auto;
    }

</style>