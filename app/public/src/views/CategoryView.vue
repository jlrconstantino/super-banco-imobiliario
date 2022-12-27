<!-- .:::: TEMPLATE ::::. -->
<template>
    <div id="container">
        <h2 class="subtitle">{{target_category_name}}</h2>
        <p class="text-common-color">Produtos encontrados: {{filtered_books.length}}</p>
    </div>
    <BookSection :books="filtered_books"></BookSection>
</template>


<!-- .:::: SCRIPT ::::. -->
<script>

    // Importação de componentes
    import BookSection from "../components/BookSection.vue";

    // Para manipulação da base de dados local
    import { select_all_categories, select_all_products, select_all_product_categories } from "@/utils/database-management";

    // Lógica local
    export default {
        
        // Nome do componente
        name: "CategoryView", 

        // Atribuição de componentes externos
        components: {
            BookSection,
        }, 

        // Dados locais
        data() {
            return {

                // Elementos de rota
                invalid_category: "Categoria Inválida", 
                target_category_name: "Categoria Inválida", 
                target_category_id: 0, 

                // Livros
                books: [],

                // Categorias dos livros
                books_categories: [], 
                
                // Controle assíncrono
                data_is_ready: false, 
            };
        }, 

        // Carregamento da base de dados
        created: async function() {

            // Carrega os livros
            await select_all_products().then(res => {
                this.books = res;
            });

            // Carrega as categorias dos livros
            await select_all_product_categories().then(res => {
                this.books_categories = res;
            });

            // Aviso de disponibilidade dos dados
            this.data_is_ready = true;
        }, 

        // Para selecionar a categoria
        updated: async function() {

            // Carrega as categorias globais
            let categories = [];
            await select_all_categories().then(res => {
                categories = res;
            });

            // Obtém o ID da categoria sendo requisitada
            this.target_category_id = this.$route.query.id;
            if(this.target_category_id == null){
                this.target_category_name = this.invalid_category;
                this.target_category_id = 0;
            }else{

                // Obtém o nome da categoria sendo requisitada
                let target_category_id = this.target_category_id;
                let page_title = categories.find(category => {
                    return category.id.toString() === target_category_id;
                });
                if(page_title != null){
                    this.target_category_name = page_title.name;
                }else{
                    this.target_category_name = this.invalid_category;
                }
            }
        }, 

        // Para filtragem em tempo-real
        computed: {
            filtered_books: function() {

                // Verificação de disponibilidade
                if(this.data_is_ready === true){

                    // Tentativa de filtragem
                    try {

                        // Para cada livro, seleciona aqueles com a categoria fornecida
                        return this.books.filter(book => {
                            let categories = this.books_categories.filter(book_category => {
                                return book_category.product == book.id; 
                            });
                            if(categories.length > 0){
                                return categories.some(book_category => {
                                    return book_category.category == this.target_category_id;
                                });
                            }
                            return false;
                        });
                    }

                    // Exceções
                    catch(_){
                        return [];
                    }
                }
                return [];
            }, 
        }, 
    }

</script>


<!-- .:::: STYLE ::::. -->
<style scoped>
    #container {
        width: 80%;
        margin-bottom: 4%;
    }
    h2 {
        margin-bottom: 2vh;
    }
</style>