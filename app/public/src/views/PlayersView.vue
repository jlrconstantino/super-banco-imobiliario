<!-- .:::: TEMPLATE ::::. -->
<template>

    <!-- Mostrador de jogadores -->
    <div id="players-displayer">
        <player filename="bag.png"></player>
        <player filename="bank.png"></player>
        <player filename="briefcase.png"></player>
        <player filename="coin.png"></player>
        <player filename="coins.png"></player>
        <player filename="piggybank.png"></player>
    </div>

    <!-- Acesso ao banco -->
    <div id="players-bank-access">
        <div class="d1"></div>
        <div class="d2"></div>
        <button class="button" @click="go_to_bank()">BANCO</button>
        <div class="d2"></div>
    </div>

</template>


<!-- .:::: SCRIPT ::::. -->
<script>

    // Importação dos componentes
    import PlayerComponentVue from '@/components/PlayerComponent.vue';

    // Lógica local
    export default {

        // Nome do componente
        name: 'PlayersView',

        // Atribuição de componentes
        components: {
            "player": PlayerComponentVue,
        }, 

        // Navegação
        methods: {
            go_to_bank() {
                this.$router.push({name: 'bank'});
                window.scrollTo(0,0);
            }
        }, 
    }
</script>


<!-- .:::: STYLE ::::. -->
<style>

    /* Mostrador de jogadores */
    #players-displayer {
        width: 90%;
        padding: 5%;
        height: auto;
        display: inline-flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-items: center;
        gap: 2rem;
    }

    /* Acesso ao banco */
    @media (orientation: portrait) {
        #players-bank-access {
            margin-top: 5%;
        }
    }
    #players-bank-access {
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        flex-direction: column;
        background-color: var(--deepest-blue);
    }
    #players-bank-access .d1 {
        width: 100%;
        height: 1.5rem;
        background-color: var(--ease-deep-blue);
    }
    #players-bank-access .d2 {
        width: 100%;
        height: 1rem;
        background-color: var(--deep-blue);
    }
</style>