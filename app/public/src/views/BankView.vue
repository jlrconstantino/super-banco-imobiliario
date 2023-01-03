<!-- .:::: TEMPLATE ::::. -->
<template>

    <!-- Faixa inicial (menu do banco) -->
    <div id="bank-header">
        <div class="d1">
            <p id="bank-header-left-p">Super Banco Imobiliário</p>
            <p id="bank-header-right-p">Safra</p>
        </div>
        <div class="d2"></div>
        <button class="button" @click="enable_transactions()">UNÁRIO</button>
        <button class="button" @click="enable_possessions()">BINÁRIO</button>
        <button class="green-button" @click="enable_luck()">SORTE</button>
        <button class="red-button" @click="enable_reset()">RESET</button>
        <div class="d2"></div>
    </div>

    <!-- Conteúdo -->
    <unary v-if="show_unary_transactions"></unary>
    <binary v-if="show_binary_transactions"></binary>
    <luck v-if="show_luck"></luck>
    <reset v-if="show_reset"></reset>

    <!-- Retorno à tela de jogadores -->
    <div id="bank-footer">
        <div class="d1"></div>
        <div class="d2"></div>
        <button class="button" @click="go_to_players()">JOGADORES</button>
        <div class="d2"></div>
    </div>

</template>


<!-- .:::: SCRIPT ::::. -->
<script>

    // Componentes
    import UnaryComponentVue from '@/components/UnaryComponent.vue';
    import BinaryComponentVue from '@/components/BinaryComponent.vue';
    import LuckComponentVue from '@/components/LuckComponent.vue';
    import ResetComponentVue from '@/components/ResetComponent.vue';

    // Lógica local
    export default {

        // Nome do componente
        name: 'BankView',

        // Atribuição de componentes
        components: {
            'unary': UnaryComponentVue, 
            'binary': BinaryComponentVue, 
            'luck': LuckComponentVue, 
            'reset': ResetComponentVue,
        }, 

        // Dados locais
        data() {
            return {
                show_unary_transactions: true, 
                show_binary_transactions: false, 
                show_luck: false, 
                show_reset: false,
            };
        }, 

        // Navegação
        methods: {
            go_to_players() {
                this.$router.push({name: 'players'});
                window.scrollTo(0,0);
            }, 
            enable_transactions() {
                this.show_unary_transactions = true;
                this.show_binary_transactions = false;
                this.show_luck = false;
                this.show_reset = false;
            },
            enable_possessions() {
                this.show_unary_transactions = false;
                this.show_binary_transactions = true;
                this.show_luck = false;
                this.show_reset = false;
            },
            enable_luck() {
                this.show_unary_transactions = false;
                this.show_binary_transactions = false;
                this.show_luck = true;
                this.show_reset = false;
            },
            enable_reset() {
                this.show_unary_transactions = false;
                this.show_binary_transactions = false;
                this.show_luck = false;
                this.show_reset = true;
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
    #bank-header {
        width: 100%;
        height: auto;
        background-color: var(--deepest-blue);
        display: inline-flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-items: center;
        gap: 0;
        margin-bottom: 2%;
    }
    #bank-header .d1 {
        display: inline-flex;
        align-items: center;
    }
    #bank-header p {
        font-weight: bold;
        color: var(--main-blue);
    }
    #bank-header-left-p {
        padding: 0 2.5%;
        width: 95%;
    }
    #bank-header-right-p {
        padding: 0 2.5%;
        width: 5%;
    }
    @media (orientation: portrait) {
        #bank-header {
            margin-bottom: 1%;
        }
        #bank-header .button, #bank-header .red-button, #bank-header .green-button {
            padding: 0.25rem 0.5rem;
            font-size: 1rem;
        }
        #bank-header .d1 {
            height: 1rem;
        }
        #bank-header .d2 {
            height: 0.5rem;
        }
        #bank-header p {
            font-size: 0.64rem;
        }
        #bank-header-left-p {
            padding: 0 2.5%;
            width: 80%;
        }
        #bank-header-right-p {
            padding: 0 2.5%;
            width: 10%;
        }
    }

    /* footer do banco */
    #bank-footer {
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        flex-direction: column;
        background-color: var(--deepest-blue);
        margin-top: 2%;
    }
    @media (orientation: portrait) {
        #bank-footer {
            margin-top: 5%;
        }
    }
</style>