<!-- .:::: TEMPLATE ::::. -->
<template>

    <!-- Header -->
    <div id="players-header">
        <div class="d1"></div>
        <div class="d2"></div>
        <h1>BANCO IMOBILIÁRIO</h1>
        <div class="d2"></div>
    </div>

    <!-- Mostrador de jogadores -->
    <TransitionGroup name="players-displayer" tag="div" class="players-displayer">
        <div class="displayer" v-for="id in player_ids" :key="id">
            <player-displayer :player_id="id"></player-displayer>
        </div>
    </TransitionGroup>

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

    // Compartilhamento de estados
    import store from '@/store';

    // Importação dos componentes
    import PlayerComponentVue from '@/components/PlayerComponent.vue';

    // Lógica local
    export default {

        // Componentes
        name: 'PlayersView', 

        // Aquisição dos IDs dos jogadores
        computed: {
            player_ids(){ 
                return store.getters.players.sort((a,b) => {
                    return a.balance - b.balance;
                }).map((player) => {
                    return player.id;
                });
            },
        }, 

        // Atribuição de componentes
        components: {
            "player-displayer": PlayerComponentVue,
        }, 

        // Navegação
        methods: {
            go_to_bank() {
                this.$router.push({name: 'bank'});
                window.scrollTo(0,0);
            },
        }, 
    }
</script>


<!-- .:::: STYLE ::::. -->
<style>

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

    /* Header do banco */
    #players-header {
        width: 100%;
        height: auto;
        background-color: var(--deepest-blue);
        display: inline-flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-items: center;
        gap: 0;
    }
    #players-header h1 {
        width: 100%;
        height: auto;
        text-align: center;
        font-size: 2.4rem;
        font-weight: bold;
        color: var(--main-blue);
        margin: 1rem 0;
    }
    @media (orientation: portrait) {
        #players-header h1 {
            font-size: 2rem;
        }
    }

    /* Mostrador de jogadores */
    .players-displayer {
        width: 90%;
        padding: 5%;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        gap: 2rem;
    }
    .players-displayer .displayer {
        margin-right: 2.5%;
        margin-bottom: 0.5%;
        width: 28%;
    }
    @media (orientation: portrait) {
        .players-displayer {
            gap: 1rem;
        }
        .players-displayer .displayer {
            margin-left: -6%;
            margin-right: 4.5%;
            margin-bottom: -2.5%;
            width: 40%;
        }
    }
    .players-displayer-enter-active, .players-displayer-leave-active {
        transition: all 0.5s ease;
    }
    .players-displayer-enter-from, .players-displayer-leave-to {
        opacity: 0;
        transform: translateX(30px);
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