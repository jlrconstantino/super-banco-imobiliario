<!-- .:::: TEMPLATE ::::. -->
<template>
    <div class="player-container">
        <img class="player-image" :src="require(`@/assets/players/${filename}`)">
        <div class="player-balance">
            <img src="@/assets/icons/dollar-alt.svg">
            <p>25.000</p>
        </div>
        <div class="player-patrimony">
            <img src="@/assets/icons/building.svg">
            <p>32.000</p>
        </div>
    </div>
</template>


<!-- .:::: SCRIPT ::::. -->
<script>

    // Lógica local
    export default {

        // Nome do componente
        name: 'PlayerComponent',

        // Atributos externos
        props: {
            'filename': String
        }, 

        // Métodos auxiliares
        methods: {
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
    .player-balance, .player-patrimony {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .player-balance {
        margin-bottom: 0.3rem;
        width: 100%;
    }
    .player-patrimony {
        width: 75%;
    }
    .player-balance p, .player-patrimony p {
        width: auto;
        max-width: calc(75%-2rem);
        height: auto;
        font-weight: bold;
        justify-content: center;
        padding: 0.5rem 1rem;
        border-radius: 8px;
    }
    .player-balance img, .player-patrimony img {
        width: 20%;
        height: auto;
    }
    .player-patrimony img {
        margin-right: 5%;
    }
    .player-balance p {
        background-color: var(--main-white);
        font-size: 1.4rem;
        color: var(--main-blue);
    }
    .player-patrimony p {
        background-color: var(--main-blue);
        font-size: 1rem;
        color: var(--main-white);
    }

</style>