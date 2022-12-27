<!-- .:::: TEMPLATE ::::. -->
<template>
    <div id="container">
        <h2 class="subtitle">Resultado da Busca</h2>
        <p class="text-common-color">Produtos encontrados: {{filtered_books.length}}</p>
        <p class="text-common-color">Pesquisa realizada: <span style="font-weight: bold;">{{this.$route.query.target}}</span></p>
    </div>
    <BookSection :books="filtered_books"></BookSection>
</template>


<!-- .:::: SCRIPT ::::. -->
<script>

    // Importação de componentes
    import BookSection from "../components/BookSection.vue";

    // Para manipulação da base de dados local
    import { select_all_products } from "@/utils/database-management";

    // Lógica local
    export default {
        
        // Nome do componente
        name: "SearchView", 

        // Atribuição de componentes externos
        components: {
            BookSection,
        }, 

        // Dados locais
        data() {
            return {
                books: [],
            };
        }, 

        // Carregamento da base de dados
        created() {
            select_all_products().then(res => {
                this.books = res;
            });
        }, 

        // Para filtragem em tempo-real
        computed: {
            filtered_books: function() {
                try{
                    let pattern = new RegExp(this.$route.query.target.toLowerCase(), "g");
                    return this.books.filter(book => {
                        return pattern.test(book.title.toLowerCase());
                    });
                }catch(exception){
                    return [];
                }
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