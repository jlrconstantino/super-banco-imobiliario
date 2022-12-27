<!-- .:::: TEMPLATE ::::. -->
<template>

    <!-- Apresentação -->
    <h2 class="form-h2">Categorias</h2>
    <p class="text-common-color">Quantia de categorias cadastradas: {{categories.length}}.</p>
    <br>

    <!-- Caixa de pesquisa -->
    <input 
        v-model="search_string" 
        type="text" 
        placeholder="Pesquisar por nome ou por ID" 
        id="searcher">

    <!-- Adição de Categoria -->
    <h3 class="form-h3">Adicionar Categoria</h3>
    <input 
        v-model="category_name" 
        placeholder="Nome"
        type="text" 
        class="form-info-container text"
        :class="{'form-normal-input-text': category_name_is_valid && !category_name_is_empty}"
        @keyup.enter="add_category()">
    <p v-if="!category_name_is_valid" class="form-failed-input-text">A categoria informada é inválida.</p>
    <p v-if="category_name_is_empty" class="form-failed-input-text">Este campo é obrigatório.</p>
    <p v-if="category_name_is_used" class="form-failed-input-text">A categoria informada já está cadastrada.</p>

    <!-- Botão para controle -->
    <button @click="add_category()" class="form-button standard-button margin-bot-div">Adicionar</button>

    <!-- Categorias -->
    <table class="form-table" v-if="filtered_categories_data.length > 0">

        <!-- Cabeçalho da tabela -->
        <tr class="form-table-header-row">
            <th class="form-table-title-item">Nome da Categoria</th>
            <th class="form-table-center-item">ID</th>
            <th class="form-table-last-item">Remover</th>
        </tr>

        <!-- Itens da tabela -->
        <tr 
            v-for="(category, index) in filtered_categories_data" 
            :key="category" 
            :class="index % 2 === 0 ? 'form-table-item-row-0' : 'form-table-item-row-1'">
            <td>
                <label>{{category.name}}</label>
            </td>
            <td>
                <label>{{category.id}}</label>
            </td>
            <td>
                <img 
                    class="thrash-icon" 
                    src="../assets/icons/trash.svg" 
                    @click="remove_category(category)">
            </td>
        </tr>

    </table>

</template>

<!-- .:::: SCRIPT ::::. -->
<script>

    // Para manipulação da base de dados
    import { 
        add_category, 
        delete_category,
        select_all_categories, 
        select_category_by_name, 
    } from '@/utils/database-management';

    // Para validação de formulários
    import { validate_alphanumeric_attribute } from '@/utils/form-validation';

    // Lógica local
    export default {

        // Nome da componente
        name: 'CategoriesManager', 

        // Dados locais
        data() {
            return {

                // Categorias
                categories: [], 

                // Formulário
                category_name: "", 
                category_name_is_valid: true, 
                category_name_is_empty: false, 
                category_name_is_used: false,

                // Pesquisa
                search_string: "", 

                // Sincronismo
                adding_category: false, 
            };
        }, 

        // Aquisição das categorias
        created: async function(){
            await select_all_categories().then(res => {
                if(res != null){
                    this.categories = res;
                }
            });
        }, 

        // Métodos auxiliares
        methods: {

            // Remove uma categoria
            remove_category(category) {
                delete_category(category);
                let index = this.categories.findIndex(c => {
                    return c.id == category.id;
                });
                if(index >= 0){
                    this.categories.splice(index, 1);
                }
            }, 

            // Valida a categoria
            validate_category_name() {
                
                // Para controle de resultado
                let output = true;

                // Validação de nome
                if (
                    validate_alphanumeric_attribute (
                        this, 
                        this.category_name, 
                        "category_name_is_empty", 
                        "category_name_is_valid"
                    ) === false
                ){
                    output = false;
                }

                return output;
            }, 

            // Adiciona uma categoria
            add_category: async function() {

                // Sincronização
                if(this.adding_category === false){

                    // Sinalização
                    this.adding_category = true;

                    // Validação
                    if(this.validate_category_name() === true){

                        // Verificação de pré-existência
                        let category = null;
                        await select_category_by_name(this.category_name).then(res => {
                            category = res;
                        });

                        // Categoria inexistente: cria-se uma nova
                        if(category == null){
                            this.category_name_is_used = false;
                            await add_category({name: this.category_name}).then(res => {
                                category = res;
                            });
                            this.categories.push(category);
                        }else{
                            this.category_name_is_used = true;
                        }
                    }

                    // Sinalização
                    this.adding_category = false;
                }
            }, 
        }, 

        // Atributos computados
        computed: {
            filtered_categories_data() {

                // Sem pesquisa
                if(this.search_string == null || this.search_string == ""){
                    return this.categories;
                }

                // Padrão de busca
                const pattern = new RegExp(this.search_string.toLowerCase(), "g");

                // Padrão numérico
                const numeric_parser = new RegExp("^[0-9]+$", "g");
                if(numeric_parser.test(this.search_string) === true){
                    return this.categories.filter(category => {
                        return pattern.test(category.id.toString());
                    });
                }

                // Padrão alfanumérico
                return this.categories.filter(category => {
                    return pattern.test(category.name.toLowerCase());
                });
            }, 
        }, 
    }

</script>


<!-- .:::: STYLE ::::. -->
<style scoped>
    @import "@/css/profile-form.css";

    /* Caixa de pesquisa */
    #searcher {
        width: 55%;
        height: 1rem;
        font-size: 1rem;
        border-radius: 8px;
        background-color: var(--header-searcher-background-color);
        border: var(--header-searcher-border);
        box-shadow: var(--box-shadow-minimized);
        padding: 1rem;
        margin-bottom: 3rem;
    }

    /* Input */
    input {
        width: 55%;
    }

    /* Botão de adição */
    button {
        margin-left: 1rem;
        width: 10%;
    }

    /* Margem inferior */
    .margin-bot-div {
        margin-bottom: 2rem;
    }

    /* Ícone de remoção */
    .thrash-icon {
        height: 1.5rem;
        width: auto;
        transition: 0.3s all ease-out;
    }
    .thrash-icon:hover {
        cursor: pointer;
        filter: brightness(0) drop-shadow(4px 4px 8px #acacac);
    }
</style>