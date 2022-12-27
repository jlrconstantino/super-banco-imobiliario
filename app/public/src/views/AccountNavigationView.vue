<!-- .:::: TEMPLATE ::::. -->
<template>
    <div id="page-container">

        <!-- Título -->
        <h2 class="subtitle">{{page_title}}</h2>
        <div id="main-container">

            <!-- Menu lateral -->
            <div id="left-container">

                <!-- Itens comuns -->
                <router-link 
                    v-for="option in sidebar_options" 
                    @click="set_title(option.title)"
                    :key="option" 
                    :to="option.to" 
                    class="left-container-item"
                >{{option.title}}</router-link>

                <!-- Itens administrativos -->
                <template v-if="this.$store.getters.is_admin">
                    <router-link 
                        v-for="option in sidebar_admin_options" 
                        @click="set_title(option.title)"
                        :key="option" 
                        :to="option.to" 
                        class="left-container-item admin-item"
                    >{{option.title}}</router-link>
                </template>

                <!-- Logout -->
                <a id="logout-text" class="left-container-item" @click="logout()">Sair</a>
            </div>

            <!-- Seção de visualização -->
            <div id="right-container">
                <router-view></router-view>
            </div>

        </div>
    </div>
</template>


<!-- .:::: SCRIPT ::::. -->
<script>

    // Lógica local
    export default {

        // Nome do componente
        name: 'AccountNavigationView', 

        // Dados locais
        data() {
            return {

                // Para controle do título da página
                page_title: "Dados Pessoais", 

                // Opções do menu lateral
                sidebar_options: [
                    {to: {name: 'profile-data'}, title: "Dados Pessoais"}, 
                    {to: {name: 'profile-payment-methods'}, title: "Métodos de Pagamento"}, 
                    {to: {name: 'profile-addresses'}, title: "Endereços de Entrega"}, 
                    {to: {name: 'profile-cart-history'}, title: "Histórico de Compras"}, 
                ], 
                
                // Opções administrativas do menu lateral
                sidebar_admin_options: [
                    {to: {name: 'manage-users'}, title: "Gerenciar Usuários"}, 
                    {to: {name: 'manage-products'}, title: "Gerenciar Produtos"}, 
                    {to: {name: 'manage-categories'}, title: "Gerenciar Categorias"}, 
                ], 
            };
        }, 

        // Métodos auxiliares
        methods: {
            set_title(title) {
                this.page_title = title;
            },
            logout(){
                this.$store.commit("logout");
                this.$router.push({name: "home"});
                window.scrollTo(0,0);
            }, 
        }, 
    }

</script>


<!-- .:::: STYLE ::::. -->
<style scoped>

    @import "../css/colors.css";

    /* Contêineres */
    #page-container {
        width: 80%;
    }
    #main-container {
        margin-top: 0;
        display: block;
        width: 100%;
        height: auto;
    }
    #left-container {
        width: calc(20% - 2rem);
        float: left;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 0;
    }
    #right-container {
        width: calc(80% - 2rem);
        /*min-height: 16.0rem;*/
        padding: 1rem;
        float: right;
        border: var(--box-light-border);
        box-shadow: var(--box-shadow-left);
    }

    /* Elementos do menu lateral */
    .left-container-item {
        top: 0;
        left: 0;
        width: 100%;
        padding: 1rem;
        min-height: 2.0rem;
        font-size: 1.2rem;
        color: var(--text-color);
        box-shadow: var(--box-shadow-left);
        /*border: var(--box-light-border);*/
        transition-duration: 0.3s;
        transition-timing-function: linear;
    }
    .left-container-item:hover {
        color: var(--link-hover-color);
    }
    .admin-item {
        color: var(--review-text-color);
        background-color: var(--blue-emphasis-color);
    }

    /* Logout */
    #logout-text {
        font-size: 1.2rem;
        color: var(--red-text-color);
        text-decoration: underline;
        background-color: var(--red-emphasis-color);
    }
    #logout-text:hover {
        color: var(--dark-red-text-color);
    }
</style>