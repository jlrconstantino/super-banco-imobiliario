<!-- .:::: TEMPLATE ::::. -->
<template>

    <!-- Seção inicial -->
    <div v-if="selected_product_id == null && !adding_product">

        <!-- Wrapper vertical -->
        <div class="form-vertical-section">

            <!-- Apresentação -->
            <h2 class="form-h2">Gerenciar Produtos</h2>
            <p class="text-common-color">Quantia de produtos encontrados: {{filtered_products_data.length}}.</p>
            <br>

            <!-- Caixa de pesquisa -->
            <input 
                v-model="search_string" 
                type="text" 
                placeholder="Pesquisar por nome ou por ID" 
                id="searcher">
            
            <!-- Adicionar produto -->
            <button 
                @click="start_product_insertion()" 
                class="gray-button form-button add-product-button">
                Adicionar Produto
            </button>

        </div>

        <!-- Produtos cadastrados -->
        <table class="form-table" v-if="filtered_products_data.length > 0">

            <!-- Cabeçalho da tabela -->
            <tr class="form-table-header-row">
                <th class="form-table-title-item">Nome do Produto</th>
                <th class="form-table-center-item">Quantia em Estoque</th>
                <th class="form-table-last-item">Mais Detalhes</th>
            </tr>

            <!-- Itens da tabela -->
            <tr 
                v-for="(product, index) in filtered_products_data" 
                :key="product" 
                :class="index % 2 === 0 ? 'form-table-item-row-0' : 'form-table-item-row-1'">
                <td>
                    <label>{{product.title}}</label>
                </td>
                <td>
                    <label>{{product.stock}}</label>
                </td>
                <td>
                    <a @click="start_product_update(product.id)">Visualizar/Modificar</a>
                </td>
            </tr>

        </table>

    </div>

    <!-- Seção de visualização do produto -->
    <div v-if="selected_product_id != null">
        
        <!-- Seção de dados -->
        <div v-if="!updating_data && !updating_security && !updating_categories">

            <!-- Apresentação -->
            <h2 class="form-h2">Dados do Produto</h2>
            <br>

            <!-- Nome do produto -->
            <h3 class="form-h3">Título</h3>
            <p class="form-info-container text">{{selected_product.title}}</p>

            <!-- Preço e Quantia em estoque -->
            <div class="form-double-section margin-bottom-div margin-top-div">
                <div class="form-vertical-section">
                    <h3 class="form-h3">Preço</h3>
                    <p class="form-info-container text">{{selected_product.price}}</p>
                </div>
                <div class="form-vertical-section">
                    <h3 class="form-h3">Quantidade em Estoque</h3>
                    <p class="form-info-container text">{{selected_product.stock}}</p>
                </div>
            </div>

            <!-- Autor e Editora -->
            <div class="form-double-section margin-bottom-div">
                <div class="form-vertical-section">
                    <h3 class="form-h3">Autor</h3>
                    <p class="form-info-container text">{{selected_product.author}}</p>
                </div>
                <div class="form-vertical-section">
                    <h3 class="form-h3">Editora</h3>
                    <p class="form-info-container text">{{selected_product.publisher}}</p>
                </div>
            </div>

            <!-- Ano e Acabamento -->
            <div class="form-double-section margin-bottom-div">
                <div class="form-vertical-section">
                    <h3 class="form-h3">Ano da Edição</h3>
                    <p class="form-info-container text">{{selected_product.year}}</p>
                </div>
                <div class="form-vertical-section">
                    <h3 class="form-h3">Acabamento</h3>
                    <p class="form-info-container text">{{selected_product.finishing}}</p>
                </div>
            </div>

            <!-- Linguagem e Total de páginas -->
            <div class="form-double-section margin-bottom-div">
                <div class="form-vertical-section">
                    <h3 class="form-h3">Linguagem</h3>
                    <p class="form-info-container text">{{selected_product.language}}</p>
                </div>
                <div class="form-vertical-section">
                    <h3 class="form-h3">Quantia de Páginas</h3>
                    <p class="form-info-container text">{{selected_product.pages}}</p>
                </div>
            </div>

            <!-- Descrição -->
            <h3 class="form-h3">Descrição</h3>
            <p class="form-info-container text description margin-bottom-div">{{selected_product.description}}</p>

            <!-- Fonte da Imagem -->
            <h3 class="form-h3">Fonte da Imagem</h3>
            <p class="form-info-container text">{{selected_product.image_source}}</p>

            <!-- Seção de Estatísticas -->
            <h2 class="form-h2 statistics-section">Estatísticas do Produto</h2>

            <!-- Avaliação e Total de vendas -->
            <div class="form-double-section margin-bottom-div">
                <div class="form-vertical-section">
                    <h3 class="form-h3">Avaliação Média</h3>
                    <p class="form-info-container text">{{selected_product.rating}}</p>
                </div>
                <div class="form-vertical-section">
                    <h3 class="form-h3">Total de Vendas</h3>
                    <p class="form-info-container text">{{selected_product.sales}}</p>
                </div>
            </div>

            <!-- Botões de ação -->
            <div class="form-update-buttons-section margin-top-div">
                <button @click="start_data_update()" class="standard-button">Atualizar Dados</button>
                <button @click="start_product_removal()" class="red-button">Remover Produto</button>
                <button @click="start_categories_update()" class="standard-button">Gerenciar Categorias</button>
            </div>
            <div class="form-update-buttons-section margin-top-div">
                <button @click="return_to_table()" class="gray-button">Voltar</button>
            </div>

        </div>

        <!-- Seção de remoção -->
        <div v-if="updating_security">

            <!-- Subtítulo -->
            <h2 class="form-h2">Confirmando Remoção do Produto</h2>
            <br>

            <!-- Confirmação de senha -->
            <h3 class="form-h3">Confirme sua Senha</h3>
            <input 
                v-model="password" 
                placeholder="⋅⋅⋅"
                type="password" 
                class="form-info-container text"
                :class="{'form-normal-input-text': password_is_valid && !password_is_empty}">
            <p v-if="!password_is_valid" class="form-failed-input-text">A senha informada é inválida.</p>
            <p v-if="password_is_empty" class="form-failed-input-text">Este campo é obrigatório.</p>

            <!-- Botões para remoção -->
            <div class="form-update-buttons-section">
                <button @click="remove_product()" class="red-button">Confirmar Remoção</button>
                <button @click="cancel_product_removal()" class="gray-button">Cancelar</button>
            </div>

        </div>

        <!-- Atualização dos dados -->
        <div v-if="updating_data">
            <product-manager @submit="cancel_product_removal()"></product-manager>
        </div>

        <!-- Seção de gerenciamento de categorias -->
        <div v-if="updating_categories">

            <!-- Apresentação -->
            <h2 class="form-h2">Categorias do Produto</h2>
            <p class="text-common-color">Quantia de categorias cadastradas: {{product_categories.length}}.</p>
            <br>

            <!-- Categorias -->
            <table class="form-table" v-if="product_categories.length > 0">

                <!-- Cabeçalho da tabela -->
                <tr class="form-table-header-row">
                    <th class="form-table-title-item">Nome da Categoria</th>
                    <th class="form-table-center-item">ID</th>
                    <th class="form-table-last-item">Remover</th>
                </tr>

                <!-- Itens da tabela -->
                <tr 
                    v-for="(product_category, index) in product_categories" 
                    :key="product_category" 
                    :class="index % 2 === 0 ? 'form-table-item-row-0' : 'form-table-item-row-1'">
                    <td>
                        <label>{{product_category.name}}</label>
                    </td>
                    <td>
                        <label>{{product_category.id}}</label>
                    </td>
                    <td>
                        <img 
                            class="thrash-icon" 
                            src="../assets/icons/trash.svg" 
                            @click="remove_category(product_category, index)">
                    </td>
                </tr>

            </table>

            <!-- Adição de Categoria -->
            <h3 class="form-h3 margin-top-div">Adicionar Categoria</h3>
            <input 
                v-model="category_name" 
                placeholder="Nome"
                type="text" 
                class="form-info-container text"
                :class="{'form-normal-input-text': category_name_is_valid && !category_name_is_empty}"
                @keyup.enter="add_category()">
            <p v-if="!category_name_is_valid" class="form-failed-input-text">A categoria informada é inválida.</p>
            <p v-if="category_name_is_empty" class="form-failed-input-text">Este campo é obrigatório.</p>

            <!-- Botões para controle -->
            <div class="form-update-buttons-section">
                <button @click="add_category()" class="standard-button">Adicionar</button>
                <button @click="cancel_category_update()" class="gray-button">Voltar</button>
            </div>

        </div>

    </div>

    <!-- Novo produto -->
    <div v-if="adding_product">
        <product-manager @submit="cancel_product_removal()"></product-manager>
    </div>

</template>


<!-- .:::: SCRIPT ::::. -->
<script>

    // Para manipulação da base de dados
    import { 
        add_category, 
        add_product_category, 
        delete_product, 
        delete_product_category, 
        select_all_products, 
        select_category_by_id, 
        select_category_by_name, 
        select_product_categories
    } from '@/utils/database-management';

    // Para manipulação de formulários
    import { validate_alphanumeric_attribute, validate_attribute_by_callback, validate_password_by_id } from '@/utils/form-validation';

    // Importação de componentes
    import ProductDataManager from './ProductDataManager.vue';

    // Lógica local
    export default {

        // Nome do componente
        name: "ProductsManager", 

        // Atribuição de componentes
        components: {
            'product-manager': ProductDataManager, 
        }, 
        
        // Dados locais
        data() {
            return {
                
                // Dados dos produtos
                products_data: [], 
                dummy_product: {
                    id: -1, 
                    title: "???", 
                    price: 0, 
                    stock: 0, 
                    rating: 0.0, 
                    sales: 0, 
                    author: "???", 
                    publisher: "???", 
                    finishing: "???", 
                    year: 0, 
                    language: "???", 
                    pages: 0, 
                    description: "???", 
                    image_source: "???", 
                }, 

                // Para controle de fluxo
                search_string: "", 
                updating_data: false, 
                updating_security: false, 
                updating_categories: false, 
                adding_product: false, 

                // Para controle de formulário
                password: "", 
                password_is_empty: false, 
                password_is_valid: true, 

                // Categorias do produto
                product_categories: [], 
                category_name: "", 
                category_name_is_valid: true, 
                category_name_is_empty: false, 
            };
        }, 

        // Carrega os dados dos produtos
        created() {
            select_all_products().then(res => {
                if(res != null) {
                    this.products_data = res;
                }
            });
        }, 

        // Métodos auxiliares
        methods: {

            // Retorna à visualização da tabela
            return_to_table() {
                this.$router.push({name: 'manage-products'});
                window.scrollTo(0,60);
            }, 

            // Reseta o formulário
            reset_form() {
                this.password = "";
                this.password_is_empty = false;
                this.password_is_valid = true;
                this.category_name = "";
                this.category_name_is_empty = false;
                this.category_name_is_valid = true;
            }, 
            
            // Visualização / atualização do produto
            start_product_update(product_id) {
                this.$router.push({name: 'manage-products', query: {id: product_id}});
                window.scrollTo(0,60);
            }, 

            // Adição de produto
            start_product_insertion() {
                this.updating_security = false;
                this.updating_data = false;
                this.updating_categories = false;
                this.adding_product = true;
                window.scrollTo(0,60);
            }, 

            // Atualizações de permissão
            start_data_update() {
                this.updating_security = false;
                this.updating_data = true;
                this.updating_categories = false;
                this.adding_product = false;
                window.scrollTo(0,60);
            }, 

            // Inicializa a remoção
            start_product_removal() {
                this.updating_security = true;
                this.updating_data = false;
                this.updating_categories = false;
                this.adding_product = false;
                window.scrollTo(0,60);
            }, 

            // Inicializa o gerenciamento de categorias
            start_categories_update: async function() {

                // Sinalização
                this.updating_security = false;
                this.updating_data = false;
                this.updating_categories = true;
                this.adding_product = false;

                // Obtenção das categorias
                if(this.selected_product.id >= 0){
                    await select_product_categories(this.selected_product.id).then(res => {
                        if(res != null){
                            this.product_categories = res;
                        }
                    });
                    this.product_categories.forEach(async (pc, index) => {
                        await select_category_by_id(pc.category).then(res => {
                            if(res != null){
                                this.product_categories[index] = res;
                            }
                        });
                    });
                }

                // Rolagem
                window.scrollTo(0,60);
            }, 

            // Remove uma categoria
            remove_category(product_category, index) {
                this.product_categories.splice(index, 1);
                delete_product_category(this.selected_product.id, product_category.id);
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

                // Validação
                if(this.validate_category_name() === true){

                    // Verificação de pré-existência
                    let category = null;
                    await select_category_by_name(this.category_name).then(res => {
                        category = res;
                    });

                    // Categoria inexistente: cria-se uma nova
                    if(category == null){
                        await add_category({name: this.category_name}).then(res => {
                            category = res;
                        });
                    }

                    // Adição da categoria de produto
                    const product_category = {
                        product: this.selected_product.id, 
                        category: category.id
                    };
                    await add_product_category(product_category);

                    // Adição estática
                    this.product_categories.push(category);
                }
            }, 

            // Valida a remoção
            validate_product_removal() {
                
                // Para controle de resultado
                let output = true;

                // Validação de senha
                if (
                    validate_attribute_by_callback (
                        this, 
                        this.password, 
                        password => {return password.length >= 3}, 
                        "password_is_empty", 
                        "password_is_valid"
                    ) === false
                ){
                    output = false;
                }

                return output;
            }, 

            // Remoção de produto
            remove_product: async function() {

                // Valida os dados
                if(this.validate_product_removal() === true){

                    // Valida a senha
                    await validate_password_by_id(this.$store.getters.user_id, this.password).then(res => {
                        if(res === true) {
                            this.password_is_valid = true;

                            // Atualiza a base de dados
                            delete_product(this.selected_product);

                            // Avisa ao produto e finaliza
                            alert("Produto removido com sucesso.");
                            this.updating_security = false;
                            this.$router.push({name: 'manage-products'});
                            window.scrollTo(0,60);
                        }
                        else{
                            this.password_is_valid = false;
                        }
                    });
                }
            }, 

            // Cancela a remoção
            cancel_product_removal() {
                this.reset_form();
                this.updating_security = false;
                window.scrollTo(0,60);
            }, 

            // Cancela a gerência de categorias
            cancel_category_update() {
                this.reset_form();
                this.updating_categories = false;
                window.scrollTo(0,60);
            }, 
        }, 

        // Atributos computados
        computed: {

            // ID selecionado por rota
            selected_product_id() {
                try {
                    return this.$route.query.id;
                } catch(_) {
                    return null;
                }
            }, 

            // Produto selecionado
            selected_product() {
                const target_id = this.selected_product_id;
                if(target_id != null){
                    let output = this.products_data.find(product => {
                        return product.id == target_id;
                    });
                    if(output != null){
                        return output;
                    }
                }
                return this.dummy_product;
            }, 

            // Produtos selecionados
            filtered_products_data() {

                // Sem pesquisa
                if(this.search_string == null || this.search_string == ""){
                    return this.products_data;
                }

                // Padrão de busca
                const pattern = new RegExp(this.search_string.toLowerCase(), "g");

                // Padrão numérico
                const numeric_parser = new RegExp("^[0-9]+$", "g");
                if(numeric_parser.test(this.search_string) === true){
                    return this.products_data.filter(product => {
                        return pattern.test(product.id.toString());
                    });
                }

                // Padrão alfanumérico
                return this.products_data.filter(product => {
                    return pattern.test(product.title.toLowerCase());
                });
            }, 
        }, 

        // Observa mudanças de rota
        watch:{
            $route (){
                this.updating_data = false;
                this.updating_security = false;
            }
        }, 
    }

</script>


<!-- .:::: STYLE ::::. -->
<style scoped>
    @import "../css/profile-form.css";

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
        margin-bottom: 1rem;
    }

    /* Tabela */
    table {
        margin-bottom: 0;
    }

    /* Divisões com margens */
    .margin-bottom-div {
        margin-bottom: 2rem;
    }
    .margin-top-div {
        margin-top: 2rem;
    }

    /* Botões */
    button {
        font-size: 1rem;
        height: 2.5rem;
        width: auto;
        min-width: 25%;
    }

    /* Texto descritivo */
    .description {
        text-align: justify;
    }

    /* Botão de adicionar produto */
    .add-product-button {
        margin-top: 0.5rem;
        margin-bottom: 2rem;
        width: 50%;
    }

    /* Subtítulo de estatísitcas */
    .statistics-section {
        margin: 2rem 0;
    }


    /* TABELA DE CATEGORIAS */
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