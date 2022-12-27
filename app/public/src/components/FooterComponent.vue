<!-- .:::: TEMPLATE ::::. -->
<template>
  <div id="footer-container">
    <footer>

        <!-- Barra de separação -->
        <div id="footer-top-bar">

            <!-- Facebook -->
            <div class="footer-social-media-container">
                <img class="footer-social-media-img" src="../assets/icons/facebook.svg">
                <p class="text-center footer-social-media-text"> @facebook </p>
            </div>

            <!-- Instagram -->
            <div class="footer-social-media-container">
                <img class="footer-social-media-img" src="../assets/icons/instagram.svg">
                <p class="text-center footer-social-media-text"> @instagram </p>
            </div>

            <!-- Twitter -->
            <div class="footer-social-media-container">
                <img class="footer-social-media-img" src="../assets/icons/twitter.svg">
                <p class="text-center footer-social-media-text"> @twitter </p>
            </div>
            
        </div>

        <!-- Conteúdo adicional -->
        <div id="footer-bot-bar">

            <!-- Logo -->
            <div id="footer-bot-left-section">
                <h3 class="footer-bot-bar-text">Book Store</h3>
                <p class="footer-bot-bar-text">© Todos os direitos reservados.</p>

                <!-- Links -->
                <br><br>
                <h4 class="footer-bot-bar-text">Seções:</h4>
                <a @click="go_to_page('home')" class="hover-interaction-link header-bot-bar-text">Página Principal</a>
                <a @click="go_to_page('account')" class="hover-interaction-link header-bot-bar-text">Página de Usuário</a>
                <a @click="go_to_page('cart')" class="hover-interaction-link header-bot-bar-text">Carrinho de Compras</a>
                <br>
                <h4 class="footer-bot-bar-text">Principais Categorias:</h4>
                <a 
                    v-for="category in this.$store.state.featured_categories" 
                    :key="category" 
                    @click="search_by_category()" 
                    class="hover-interaction-link header-bot-bar-text"
                    @mouseover="show_categories_menu = false"
                >{{category}}</a>
            </div>

            <!-- Sobre nós -->
            <div id="footer-bot-right-section">
                <h4>Quem somos:</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante at diam aliquam luctus et ut ligula. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla blandit aliquet lacus nec tempor. Duis sem est, imperdiet quis tristique at, placerat a augue. Cras ac interdum justo, sit amet posuere sem. Nulla accumsan, justo tempus vulputate fermentum, mi urna suscipit nunc, ut suscipit tortor metus vitae lacus. Morbi eros ligula, venenatis et nisl non, placerat vestibulum tortor. In semper pharetra diam, sed bibendum lacus ornare et.</p>
            </div>

        </div>

    </footer>
  </div>
</template>


<!-- .:::: SCRIPT ::::. -->
<script>

    // Lógica local
    export default {

        // Nome da componente 
        name: 'FooterComponent', 

        // Métodos auxiliares
        methods: {

            // Navegação comum
            go_to_page(name) {
                this.$router.push({name: name});
                window.scrollTo(0,0);
            }, 

            // Busca por categoria
            search_by_category(){
                this.$router.push({name: "category", query: {id: -1}});
                window.scrollTo(0,0);
            }, 
        }
    }
</script>


<!-- .:::: STYLE ::::. -->
<style>
    @import "../css/colors.css";

    /* **************** AJUSTE DE POSICIONAMENTO DO HEADER **************** */

    /* Contêiner da barra de navegação */
    #footer-container {
        padding-top: 8vh;
        width: 100%;
        left: 0;
        bottom: 0;
        overflow: hidden;
    }


    /* **************** SEÇÃO SUPERIOR DO HEADER **************** */

    /* Seção superior da barra de navegação */
    #footer-top-bar {
        padding: 1rem 1rem;
        width: 100%;
        max-height: 5vh;
        background-color: var(--foreground-color);
        display: inline-flex;
        align-items: center;
        justify-content: space-around;
    }

    /* Contêiner de mídia social */
    .footer-social-media-container {
        width: 30vw;
        height: 4vh;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    /* Ícone da mídia social */
    .footer-social-media-img {
        height: 100%;
        width: auto;
        filter: contrast(0) brightness(100);
        margin-right: 0.5vw;
    }

    /* Texto da mídia social */
    .footer-social-media-text {
        height: 100%;
        font-size: 3vh;
        color: antiquewhite;
    }


    /* **************** SEÇÃO INFERIOR DO HEADER **************** */

    /* Seção inferior da barra de navegação */
    #footer-bot-bar {
        padding: 2rem;
        width: 100%;
        background-color: var(--footer-color);
        display: inline-flex;
        align-items: flex-start;
        justify-content: space-around;
    }

    /* Texto do título */
    #footer-bot-bar h3 {
        font-size: 2rem;
        margin-bottom: 1rem;
    }
    #footer-bot-bar h4 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }

    /* Texto de rodapé */
    .footer-bot-bar-text {
        color: var(--text-color);
    }

    /* Organização espacial */
    #footer-bot-left-section {
        position: flex-start;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }
    #footer-bot-right-section {
        position: flex-end;
        text-align: justify;
        width: 40%;
    }
</style>