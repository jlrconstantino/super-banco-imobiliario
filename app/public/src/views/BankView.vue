<!-- .:::: TEMPLATE ::::. -->
<template>

    <!-- Faixa inicial (menu do banco) -->
    <div id="bank-header">
        <div class="d1"></div>
        <div class="d2"></div>
        <button class="button" @click="alert()">TRANSAÇÃO</button>
        <button class="button" @click="alert()">POSSE</button>
        <button class="green-button" @click="alert()">SORTE</button>
        <button class="red-button" @click="alert()">RESET</button>
        <div class="d2"></div>
    </div>

    <!-- Retorno aos jogadores -->
    <div id="bank-footer">
        <div class="d1"></div>
        <div class="d2"></div>
        <button class="button" @click="go_to_players()">JOGADORES</button>
        <div class="d2"></div>
    </div>

</template>


<!-- .:::: SCRIPT ::::. -->
<script>

    // Lógica local
    export default {

        // Nome do componente
        name: 'BankView',

        // Atribuição de componentes
        components: {
        }, 

        // Navegação
        methods: {
            go_to_players() {
                this.$router.push({name: 'players'});
                window.scrollTo(0,0);
            }
        }, 
    }
</script>


<!-- .:::: STYLE ::::. -->
<style>

    /* Header do banco */
    @media (orientation: portrait) {
        #bank-header {
            background-color: yellow;
        }
    }
    @media (orientation: landscape) {
        #bank-header {
            background-color: yellow;
        }
    }
    #bank-header {
        width: 100%;
        height: auto;
        background-color: var(--deepest-blue);
        display: inline-flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-items: center;
        gap: 0;
    }

    /* footer do banco */
    @media (orientation: portrait) {
        #bank-footer {
            margin-top: 5%;
        }
    }
    #bank-footer {
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        flex-direction: column;
        background-color: var(--deepest-blue);
    }

    /* Listras */
    .d1 {
        width: 100%;
        height: 1.5rem;
        background-color: var(--ease-deep-blue);
    }
    .d2 {
        width: 100%;
        height: 1rem;
        background-color: var(--deep-blue);
    }
</style>