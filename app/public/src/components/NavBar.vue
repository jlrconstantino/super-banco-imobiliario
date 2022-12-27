<!-- .:::: TEMPLATE ::::. -->
<template>
    <div id="container">
        <nav>
            <a 
                v-for="(page, index) in pages" 
                :key="index" 
                class="hover-interaction-link"
                @click="go_to_page(index)"
            >{{get_route_name(page, index)}}</a>
            <hr>
        </nav>
    </div>
</template>


<!-- .:::: SCRIPT ::::. -->
<script>

    // Lógica local
    export default {

        // Nome do componente
        name: "NavBar", 

        // Dados locais
        data() {
            return {

                // Para controle de navegação
                pages: ["Página Principal"], 
                routes: [{name: "home"}], 

                // Rotas especiais (não duplicam)
                exclusive_route_names: [
                    "purchase", 
                    "purchase-payment-method", 
                    "purchase-delivery-address",
                    "purchase-final"
                ], 
            };
        }, 

        // Métodos auxiliares
        methods: {

            // Navegação
            go_to_page(index) {
                this.$router.push(this.routes[index]);
                window.scrollTo(0,0);
            },

            // Nome da rota
            get_route_name(page, index) {
                if(index > 0){
                    return "\t>\t" + page;
                }
                return page;
            }, 
        }, 

        // Observação das mudanças de rota
        watch: {
            '$route': function(to) {

                // Verificação indexada de rotas pré-existentes
                let matches = 0;
                try {

                    // Página de finalização de compra
                    if((to.name.length >= 8 && to.name.substring(0,8) === 'purchase')) {

                        // Verifica se a última rota é de compra
                        const last_route_name = this.routes[this.routes.length - 1].name;
                        if(!(last_route_name.length >= 8 && last_route_name.substring(0, 8) === 'purchase')){

                            // Em caso contrário, adiciona uma nova rota de finalização de compra
                            this.pages.push("Finalizar Compra");
                            this.routes.push(to);
                        }
                        matches = 1;
                    }

                    // Demais casos
                    else {
                        for(let i = 0; i < this.routes.length && matches === 0; ++i){
                            if(this.routes[i].name === to.name && to.name != 'category'){
                                matches += 1;

                                // Truncamento da lista de rotas
                                this.pages.length = i + 1;
                                this.routes.length = i + 1;
                            }
                        }
                    }
                }catch(_){
                    // Nada a fazer
                }

                // Adição de rota
                if(matches === 0){

                    // Construção do nome
                    let page_name = "";
                    switch(to.name) {

                        // Página de produto
                        case "product":
                            page_name = this.$route.params.title;
                            if(page_name == null){
                                page_name = "Produto";
                            }else if(page_name.length > 32){
                                page_name = page_name.substring(0, 32) + "...";
                            }
                            break;

                        // Carrinho de compras
                        case "cart":
                            page_name = "Carrinho de Compras";
                            break;

                        // Página de busca textual
                        case "search": 
                            page_name = "Resultado da Busca";
                            this.pages.length = 1;
                            this.routes.length = 1;
                            break;
                        
                        // Página de busca por categoria
                        case "category":
                            page_name = this.$route.query.target;
                            if(page_name == null){
                                page_name = "Categoria";
                            }
                            this.pages.length = 1;
                            this.routes.length = 1;
                            break;
                        
                        // Login
                        case "login":
                            page_name = "Login";
                            this.pages.length = 1;
                            this.routes.length = 1;
                            break;
                        
                        // Página de perfil
                        case "profile" || "account":
                            page_name = "Minha Conta";
                            this.pages.length = 1;
                            this.routes.length = 1;
                            break;
                        
                        // Dados pessoais
                        case "profile-data":
                            page_name = "Dados Pessoais";
                            this.pages.length = 1;
                            this.routes.length = 1;
                            break;
                        
                        // Métodos de pagamento
                        case "profile-payment-methods":
                            page_name = "Métodos de Pagamento";
                            this.pages.length = 1;
                            this.routes.length = 1;
                            break;

                        // Endereços de entrega
                        case "profile-addresses":
                            page_name = "Endereços de Entrega";
                            this.pages.length = 1;
                            this.routes.length = 1;
                            break;
                        
                        case "profile-cart-history":
                            page_name = "Histórico de Compras";
                            this.pages.length = 1;
                            this.routes.length = 1;
                            break;

                        // Gerenciar usuários
                        case "manage-users":
                            page_name = "Gerenciar Usuários";
                            this.pages.length = 1;
                            this.routes.length = 1;
                            break;

                        // Gerenciar produtos
                        case "manage-products":
                            page_name = "Gerenciar Produtos";
                            this.pages.length = 1;
                            this.routes.length = 1;
                            break;

                        // Gerenciar categorias
                        case "manage-categories":
                            page_name = "Gerenciar Categorias";
                            this.pages.length = 1;
                            this.routes.length = 1;
                            break;

                        // Finalização de compra
                        case "purchase":
                            page_name = "Finalizar Compra";
                            break;
                        
                        // Outros
                        default: 
                            page_name = "Página"
                            break;
                    }

                    // Adição dos novos elementos
                    this.pages.push(page_name);
                    this.routes.push(to);
                }
            }
        }
    }
</script>


<!-- .:::: STYLE ::::. -->
<style scoped>
    @import "../css/colors.css";

    #container {
        background-color: var(--navigation-bar-background-color);
        padding-top: 3vh;
        padding-bottom: 1vh;
        width: 100%;
    }

    nav {
        width: 80%;
        margin: 0 auto;
    }

    a {
        font-size: 0.9rem;
        padding-right: 2px;
        color: #555555;
    }
</style>