<!-- .:::: TEMPLATE ::::. -->
<template>
    <div id="header-container">
        <header>

            <!-- Barra fixa superior -->
            <div id="header-top-bar" @mouseover="show_categories_menu = false"> 

                <!-- Título -->
                <div id="header-top-bar-title">
                    <img @click="go_to_page('home')" src="../assets/logo/logo.png" class="header-top-bar-img" id="header-logo-img">
                </div>

                <!-- Campo de busca textual -->
                <div id="header-top-bar-search">
                    <input @keyup.enter="search_by_title(search_string)" v-model="search_string" type="text" placeholder="O que você procura?" id="header-searcher">
                </div>

                <!-- Perfil -->
                <div id="header-top-bar-user">
                    <img @click="go_to_page('profile')" src="../assets/icons/user-circle.svg" class="header-top-bar-img" id="header-top-bar-user-img">
                    <div id="header-top-bar-user-text-container">
                        <p v-if="logged===false" class="header-top-bar-text header-top-bar-user-p1">Olá, bem-vindo(a)!</p>
                        <p v-if="logged===false" @click="go_to_page('profile')" class="hover-interaction-link-alternative header-top-bar-text header-top-bar-user-p2">Entre ou cadastre-se</p>
                        <p v-if="logged===true" @click="go_to_page('profile')" class="hover-interaction-link-alternative header-top-bar-text header-top-bar-user-p1">{{username}}</p>
                    </div>
                </div>

                <!-- Carrinho -->
                <div id="header-top-bar-shop">
                    <img @click="go_to_page('cart')" src="../assets/icons/shopping-bag.svg" class="header-top-bar-img" id="header-top-bar-cart-img">
                </div>

            </div>

            <!-- Barra fixa inferior -->
            <div class="header-bottom-bar" :class="{ 'header-bottom-bar--hidden': !show_bottom_bar }">

                <!-- Menu de categorias -->
                <div id="header-categories-wrapper" @mouseover="show_categories_menu = true">
                    <div id="header-categories-interface">
                        <img src="../assets/icons/bars.svg">
                        <button>Categorias</button>
                        <img src="../assets/icons/angle-down.svg" :class="{'header-categories-image-hover': show_categories_menu}">
                    </div>
                    <div v-if="show_categories_menu && show_bottom_bar" id="header-categories-hidden-menu">
                        <a 
                            v-for="category in menu_categories" 
                            :key="category" 
                            @click="search_by_category(category)" 
                            class="hover-interaction-link header-bot-bar-text"
                        >{{category.name}}</a>
                    </div>
                </div>
                
                <!-- Listagem de categorias em ênfase -->
                <a 
                    v-for="category in this.$store.state.featured_categories" 
                    :key="category" 
                    @click="search_by_category({id: -1, name: category})" 
                    class="hover-interaction-link header-bot-bar-text"
                    @mouseover="show_categories_menu = false"
                >{{category}}</a>

            </div>

        </header>
    </div>
</template>


<!-- .:::: SCRIPT ::::. -->
<script>

    // Vuex
    import store from '@/store/index.js';

    // Para manipulação da base de dados
    import { select_all_categories } from '@/utils/database-management';

    // Lógica local
    export default {

        // Nome do componente
        name: 'HeaderComponent',

        // Dados locais
        data() {
            return {

                // Para pesquisa textual
                search_string: "", 

                // Para controle da barra inferior do cabeçalho
                show_bottom_bar: true, 
                last_scroll_position: 0, 

                // Para controlar o menu dropdown
                show_categories_menu: false, 

                // Itens do menu de categorias
                menu_categories: [], 
            };
        }, 

        // Para carregas as categorias da base de dados
        created() {
            select_all_categories().then(res => {
                this.menu_categories = res;
            });
        }, 

        // Para escutar eventos de rolagem e de clique
        mounted () {
            window.addEventListener('scroll', this.on_scroll);
            window.addEventListener('click', this.on_click);
        },
        beforeUnmount () {
            window.removeEventListener('scroll', this.on_scroll);
            window.removeEventListener('click', this.on_click);
        },

        // Métodos auxiliares
        methods: {

            // Navegação comum
            go_to_page(name) {
                this.$router.push({name: name});
                window.scrollTo(0,0);
            }, 

            // Pesquisa
            search_by_title(str) {
                if(str != ""){
                    this.$router.push({name: "search", query: {target: str}});
                    window.scrollTo(0,0);
                    this.search_string = "";
                }
            }, 

            // Busca por categoria
            search_by_category(category){
                this.$router.push({name: "category", query: {id: category.id}});
                window.scrollTo(0,0);
            }, 

            // Rolagem
            on_scroll() {

                // Posição atual
                const current_scroll_position = window.pageYOffset || document.documentElement.scrollTop;

                // Verificação e atualização
                if (Math.abs(this.last_scroll_position - current_scroll_position) > 80) {
                    this.show_bottom_bar = current_scroll_position < this.last_scroll_position;
                    this.last_scroll_position = current_scroll_position;
                }
            },

            // Clique
            on_click() {
                this.show_categories_menu = false;
            }
        }, 

        // Atributos computados
        computed: {

            // Observa modificações de login
            logged: () => {
                return store.getters.is_authenticated;
            }, 
            username: () => {
                return store.state.user.name;
            }, 
        }
    }
</script>


<!-- .:::: STYLE ::::. -->
<style>
    @import "../css/colors.css";

    /* **************** AJUSTE DE POSICIONAMENTO DO HEADER **************** */

    /* Contêiner da barra de navegação */
    #header-container {
        top: 0;
        position: fixed;
        min-height: 20%;
        height: 20%;
        max-height: 20%;
        width: 100%;
    }

    header {
        width: 100%;
        height: 100%;
    }


    /* **************** SEÇÃO SUPERIOR DO HEADER **************** */

    /* Seção superior da barra de navegação */
    #header-top-bar {
        padding: 1rem 1rem;
        width: 100%;
        height: 60%;
        max-height: 60%;
        position: absolute;
        z-index: 10;
        top: 0;
        right: 0;
        background-color: var(--foreground-color);
        display: flex;
        overflow: hidden;
        justify-content: space-around;
        align-items: center;
        box-shadow: var(--box-shadow);
    }

    /* Imagens para a barra superior */
    .header-top-bar-img {
        height: 100%;/*6vh;*/
        width: auto;
        filter: brightness(0) invert(1);
        transition: 0.1s all ease-out;
    }
    .header-top-bar-img:hover {
        cursor: pointer;
        filter: brightness(0) invert(1) drop-shadow(4px 4px 8px #afc8d6);
    }


    /* Seção esquerda da barra superior */
    #header-top-bar-title {
        justify-content: flex-start;
        width: auto;
        overflow: hidden;
    }

    /* Imagem de logo */
    #header-logo-img {
        height: 14vh;
        width: auto;
    }

    /* Coloração do texto */
    .header-top-bar-text {
        color: var(--header-top-bar-text-color);
    }


    /* Seção central da barra superior */
    #header-top-bar-search {
        width: 45%;
        height: 60%;
        justify-content: center;
        display: flex;
    }

    /* Caixa de pesquisa */
    #header-searcher {
        justify-content: baseline;
        width: 100%;
        height: 100%;
        border-radius: 8px;
        background-color: var(--header-searcher-background-color);
        border: var(--header-searcher-border);
        box-shadow: var(--box-shadow-minimized);
        padding-left: 1rem;
    }


    /* Seção para o status de usuário */
    #header-top-bar-user {
        width: 18%;
        justify-content: safe center;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    /* Imagem para o usuário */
    #header-top-bar-user-img {
        height: 6vh;
        justify-content: flex-start;
    }

    /* Contêiner dos elementos textuais */
    #header-top-bar-user-text-container {
        justify-content: flex-end;
        display: flex;
        flex-direction: column;
    }

    /* Ajuste de posição dos textos */
    .header-top-bar-user-p1 {justify-content: flex-start;}
    .header-top-bar-user-p2 {justify-content: flex-end;}


    /* Seção direita da barra superior */
    #header-top-bar-shop {
        width: auto;
        justify-content: flex-end;
    }

    /* Imagem para o carrinho */
    #header-top-bar-cart-img {
        height: 6vh;
    }



    /* **************** SEÇÃO INFERIOR DO HEADER **************** */

    /* Seção inferior da barra de navegação */
    .header-bottom-bar {
        width: 100%;
        height: 40%;
        position: absolute;
        top: calc(60% + 2rem);
        z-index: 0;
        background-color: var(--header-bottom-bar-background-color);
        box-shadow: 0.2rem 0.2rem 0.5rem rgba(0, 0, 0, 0.281);
        display: inline-flex;
        justify-content: space-evenly;
        align-items: center;
        transform: translate3d(0, 0, 0);
        transition: 0.1s all ease-out;
    }
    .header-bottom-bar--hidden {
        box-shadow: none;
        transform: translate3d(0, -100%, 0);
    }


    /* Envólucro do menu de categorias */
    #header-categories-wrapper {
        width: auto;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
    }

    /* Menu de categorias */
    #header-categories-interface {
        height: 90%;
        width: auto;
        display: inline-flex;
        justify-content: space-around;
        align-items: center;
    }

    /* Botão do menu de categorias */
    #header-categories-interface button {
        height: 90%;
        background-color: var(--header-bottom-bar-background-color);
        font-size: 1rem;
        padding-left: 1.5rem;
        padding-right: 3.5rem;
        font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
        border: 0;
    }

    /* Ícones do menu de categorias */
    #header-categories-interface img{
        height: 60%;
        filter: grayscale(1);
        transition: 0.3s all ease-out;
    }
    .header-categories-image-hover {
        transform: rotate(180deg);
    }

    /* Menu oculto */
    #header-categories-hidden-menu {
        position: absolute;
        top: 100%;
        width: 20%;
        min-height: 10px;
        background-color: var(--header-bottom-bar-background-color);
        box-shadow: var(--box-shadow-minimized);
        animation: menu 0.3s ease forwards;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 0.8rem;
        gap: 0.8rem;
    }
    

    /* Itens com links */
    .header-bot-bar-item {
        justify-content: baseline;
    }

    /* Coloração do texto */
    .header-bot-bar-text {
        color: var(--header-bottom-bar-text-color);
    }

</style>