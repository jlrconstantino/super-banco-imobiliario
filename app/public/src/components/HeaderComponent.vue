<!-- .:::: TEMPLATE ::::. -->
<template>
    <div id="header-container" v-if="not_in_bank">
        <header>
            <img class="header-img" :class="{ 'header-img--hidden': !show_header }" src="@/assets/logo/logo.png">
        </header>
    </div>
</template>


<!-- .:::: SCRIPT ::::. -->
<script>

    // Lógica local
    export default {

        // Nome do componente
        name: 'HeaderComponent',

        // Para escutar eventos de rolagem
        mounted () {
            window.addEventListener('scroll', this.on_scroll);
        },
        beforeUnmount () {
            window.removeEventListener('scroll', this.on_scroll);
        },

        // Dados locais
        data() {
            return {

                // Controle de rolagem
                last_scroll_position: 0, 
                show_header: true, 

            }
        }, 

        // Métodos auxiliares
        methods: {

            // Navegação comum
            go_to_page(name) {
                this.$router.push({name: name});
                window.scrollTo(0,0);
            }, 

            // Rolagem
            on_scroll() {

                // Posição atual
                const current_scroll_position = window.pageYOffset || document.documentElement.scrollTop;

                // Verificação e atualização
                if (Math.abs(this.last_scroll_position - current_scroll_position) > 50) {
                    this.show_header = current_scroll_position <= 50;
                    this.last_scroll_position = current_scroll_position;
                }
            },
        }, 

        // Quando não está no banco
        computed: {
            not_in_bank() {
                return this.$route.name !== "bank";
            }
        },
    }
</script>


<!-- .:::: STYLE ::::. -->
<style>
    #header-container {
        top: 0;
        position: fixed;
        height: auto;
        width: 100%;
        z-index: -10;
    }
    header {
        width: 100%;
        height: 100%;
    }
    @media (orientation: portrait) {
        .header-img {
            width: 96%;
            height: auto;
        }
    }
    @media (orientation: landscape) {
        .header-img {
            width: 40%;
            height: auto;
        }
    }
    .header-img {
        margin: 2% 2%;
        transform: translate3d(0, 0, 0);
        transition: 0.1s all ease-out;
    }
    .header-img--hidden {
        box-shadow: none;
        transform: translate3d(0, -150%, 0);
    }
</style>