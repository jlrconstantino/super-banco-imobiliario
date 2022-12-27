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
        name: 'PurchaseView', 

        // Dados locais
        data() {
            return {

                // Para controle do título da página
                page_title: "Método de Pagamento", 

                // Opções do menu lateral
                sidebar_options: [
                    {to: {name: 'purchase-payment-method'}, title: "Método de Pagamento"}, 
                    {to: {name: 'purchase-delivery-address'}, title: "Endereço de Entrega"}, 
                    {to: {name: 'purchase-final'}, title: "Revisar e Finalizar Compra"}
                ], 
            };
        }, 

        // Métodos auxiliares
        methods: {
            set_title(title) {
                this.page_title = title;
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
</style>