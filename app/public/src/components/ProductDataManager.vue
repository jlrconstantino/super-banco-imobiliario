<!-- .:::: TEMPLATE ::::. -->
<template>

    <!-- Subtítulo da Página -->
    <h2 class="form-h2">{{page_title}}</h2>
    <br>

    <!-- Título do Produto -->
    <h3 class="form-h3">Título do Produto</h3>
    <input 
        v-model="title" 
        type="text" 
        class="form-info-container text"
        :class="{'form-normal-input-text': title_is_valid && !title_is_empty}">
    <p v-if="!title_is_valid" class="form-failed-input-text">O título informado é inválido.</p>
    <p v-if="title_is_empty" class="form-failed-input-text">Este campo é obrigatório.</p>

    <!-- Preço e Quantidade em Estoque -->
    <div class="form-double-section">

        <!-- Preço -->
        <div class="form-vertical-section">
            <h3 class="form-h3">Preço Unitário</h3>
            <input 
                v-model="price" 
                type="number" 
                step="0.01"
                class="form-info-container text"
                :class="{'form-normal-input-text': price_is_valid && !price_is_empty}">
            <p v-if="!price_is_valid" class="form-failed-input-text">O preço informado é inválido.</p>
            <p v-if="price_is_empty" class="form-failed-input-text">Este campo é obrigatório.</p>
        </div>

        <!-- Quantidade em Estoque -->
        <div class="form-vertical-section">
            <h3 class="form-h3">Quantidade em Estoque</h3>
            <input 
                v-model="stock" 
                type="number" 
                class="form-info-container text"
                :class="{'form-normal-input-text': stock_is_valid && !stock_is_empty}">
            <p v-if="!stock_is_valid" class="form-failed-input-text">A quantidade informada é inválida.</p>
            <p v-if="stock_is_empty" class="form-failed-input-text">Este campo é obrigatório.</p>
        </div>

    </div>

    <!-- Autor e Editora -->
    <div class="form-double-section">

        <!-- Autor -->
        <div class="form-vertical-section">
            <h3 class="form-h3">Autor</h3>
            <input 
                v-model="author" 
                type="text" 
                class="form-info-container text"
                :class="{'form-normal-input-text': author_is_valid && !author_is_empty}">
            <p v-if="!author_is_valid" class="form-failed-input-text">O autor informado é inválido.</p>
            <p v-if="author_is_empty" class="form-failed-input-text">Este campo é obrigatório.</p>
        </div>

        <!-- Editora -->
        <div class="form-vertical-section">
            <h3 class="form-h3">Editora</h3>
            <input 
                v-model="publisher" 
                type="text" 
                class="form-info-container text"
                :class="{'form-normal-input-text': publisher_is_valid && !publisher_is_empty}">
            <p v-if="!publisher_is_valid" class="form-failed-input-text">A editora informada é inválida.</p>
            <p v-if="publisher_is_empty" class="form-failed-input-text">Este campo é obrigatório.</p>
        </div>
    
    </div>

    <!-- Acabamento e Ano de Edição -->
    <div class="form-double-section">

        <!-- Acabamento -->
        <div class="form-vertical-section">
            <h3 class="form-h3">Acabamento</h3>
            <input 
                v-model="finishing" 
                type="text" 
                class="form-info-container text"
                :class="{'form-normal-input-text': finishing_is_valid && !finishing_is_empty}">
            <p v-if="!finishing_is_valid" class="form-failed-input-text">O acabamento informado é inválido.</p>
            <p v-if="finishing_is_empty" class="form-failed-input-text">Este campo é obrigatório.</p>
        </div>

        <!-- Ano de Edição -->
        <div class="form-vertical-section">
            <h3 class="form-h3">Ano de Edição</h3>
            <input 
                v-model="year" 
                type="number" 
                class="form-info-container text"
                :class="{'form-normal-input-text': year_is_valid && !year_is_empty}">
            <p v-if="!year_is_valid" class="form-failed-input-text">O ano de edição informado é inválido.</p>
            <p v-if="year_is_empty" class="form-failed-input-text">Este campo é obrigatório.</p>
        </div>
    
    </div>

    <!-- Linguagem e Quantidade de Páginas -->
    <div class="form-double-section">

        <!-- Linguagem -->
        <div class="form-vertical-section">
            <h3 class="form-h3">Linguagem</h3>
            <input 
                v-model="language" 
                type="text" 
                class="form-info-container text"
                :class="{'form-normal-input-text': language_is_valid && !language_is_empty}">
            <p v-if="!language_is_valid" class="form-failed-input-text">A linguagem informada é inválida.</p>
            <p v-if="language_is_empty" class="form-failed-input-text">Este campo é obrigatório.</p>
        </div>

        <!-- Páginas -->
        <div class="form-vertical-section">
            <h3 class="form-h3">Quantidade de Páginas</h3>
            <input 
                v-model="pages" 
                type="number" 
                class="form-info-container text"
                :class="{'form-normal-input-text': pages_is_valid && !pages_is_empty}">
            <p v-if="!pages_is_valid" class="form-failed-input-text">A quantidade informada é inválida.</p>
            <p v-if="pages_is_empty" class="form-failed-input-text">Este campo é obrigatório.</p>
        </div>

    </div>

    <!-- Descrição -->
    <h3 class="form-h3">Descrição</h3>
    <input 
        v-model="description" 
        type="textfield" 
        class="form-info-container text"
        :class="{'form-normal-input-text': description_is_valid && !description_is_empty}">
    <p v-if="!description_is_valid" class="form-failed-input-text">A descrição informada é inválida.</p>
    <p v-if="description_is_empty" class="form-failed-input-text">Este campo é obrigatório.</p>

    <!-- Imagem -->
    <h3 class="form-h3">Imagem de Capa</h3>
    <input 
        v-model="image_source" 
        type="text" 
        class="form-info-container text"
        :class="{'form-normal-input-text': image_source_is_valid && !image_source_is_empty}">
    <p v-if="!image_source_is_valid" class="form-failed-input-text">A fonte informada é inválida.</p>
    <p v-if="image_source_is_empty" class="form-failed-input-text">Este campo é obrigatório.</p>

    <!-- Confirmação de senha -->
    <template v-if="is_updating">
        <h3 class="form-h3">Confirme sua Senha</h3>
        <input 
            v-model="password" 
            placeholder="⋅⋅⋅"
            type="password" 
            class="form-info-container text"
            :class="{'form-normal-input-text': password_is_valid && !password_is_empty}">
        <p v-if="!password_is_valid" class="form-failed-input-text">A senha informada é inválida.</p>
        <p v-if="password_is_empty" class="form-failed-input-text">Este campo é obrigatório.</p>
    </template>

    <!-- Botões de Ação -->
    <div class="form-update-buttons-section">
        <button class="form-button standard-button" @click="submit()">{{action_button_label}}</button>
        <button class="form-button gray-button" @click="cancel()">Cancelar</button>
    </div>

</template>


<!-- .:::: SCRIPT ::::. -->
<script>

    // Para manipulação de base de dados
    import { add_product, select_product_by_id, update_product } from '@/utils/database-management';

    // Para manipulação de formulários
    import { 
        validate_alphanumeric_attribute, 
        validate_attribute_by_callback, 
        validate_attribute_by_regex, 
        validate_text_attribute, 
        validate_password_by_id 
    } from '@/utils/form-validation';

    // Lógica local
    export default {
        
        // Nome da componente
        name: "ProductDataManager", 

        // Dados locais
        data() {
            return {

                // Produto
                product: null, 

                // Verifica se é uma atualização
                is_updating: false, 
                action_button_label: "Criar Produto", 
                page_title: "Adicionando Novo Produto", 

                // Para controle de senha
                password: "", 
                password_is_valid: true, 
                password_is_empty: false, 

                // Para controle de título
                title: "",
                title_is_empty: false,
                title_is_valid: true,

                // Para controle de preço
                price: "", 
                price_is_empty: false,
                price_is_valid: true,

                // Para controle de quantidade em estoque
                stock: "", 
                stock_is_empty: false,
                stock_is_valid: true,

                // Para controle de autor
                author: "", 
                author_is_empty: false,
                author_is_valid: true,

                // Para controle de editora
                publisher: "", 
                publisher_is_empty: false,
                publisher_is_valid: true,

                // Para controle de acabamento
                finishing: "", 
                finishing_is_empty: false,
                finishing_is_valid: true,

                // Para controle de ano de edição
                year: "", 
                year_is_empty: false,
                year_is_valid: true,

                // Para controle de linguagem
                language: "", 
                language_is_empty: false,
                language_is_valid: true,

                // Para controle de quantidade de páginas
                pages: "", 
                pages_is_empty: false,
                pages_is_valid: true,

                // Para controle de descrição
                description: "", 
                description_is_empty: false,
                description_is_valid: true,

                // Para controle de fonte de imagem
                image_source: "", 
                image_source_is_empty: false,
                image_source_is_valid: true,
            };
        }, 

        // Verifica se é uma adição ou uma atualização
        created: async function() {
            const id = this.$route.query.id;
            if(id != null && id > -1) {

                // Requisição do produto
                await select_product_by_id(id).then(res => {
                    if(res != null) {
                        this.product = res;
                    }
                })

                // Verificação
                if(this.product != null){

                    // Lógica de página
                    this.is_updating = true;
                    this.action_button_label = "Salvar Alterações";
                    this.page_title = "Alterando os Dados do Produto";

                    // Cópia do produto
                    this.title = this.product.title;
                    this.price = this.product.price;
                    this.stock = this.product.stock;
                    this.author = this.product.author;
                    this.publisher = this.product.publisher;
                    this.finishing = this.product.finishing;
                    this.year = this.product.year;
                    this.language = this.product.language;
                    this.pages = this.product.pages;
                    this.description = this.product.description;
                    this.image_source = this.product.image_source;
                }
            }
        }, 

        // Métodos
        methods: {

            // Validação do formulário
            validate() {

                // Para controle de resultado
                let output = true;

                // Validação de título
                if (
                    validate_alphanumeric_attribute (
                        this, 
                        this.title, 
                        "title_is_empty", 
                        "title_is_valid"
                    ) === false
                ){
                    output = false;
                }

                // Validação de preço
                if (
                    validate_attribute_by_callback (
                        this, 
                        this.price, 
                        price => {return price >= 0}, 
                        "price_is_empty", 
                        "price_is_valid"
                    ) === false
                ){
                    output = false;
                }

                // Validação de quantidade em estoque
                if (
                    validate_attribute_by_callback (
                        this, 
                        this.stock, 
                        stock => {return stock >= 0}, 
                        "stock_is_empty", 
                        "stock_is_valid"
                    ) === false
                ){
                    output = false;
                }

                // Validação de autoria
                if (
                    validate_alphanumeric_attribute (
                        this, 
                        this.author, 
                        "author_is_empty", 
                        "author_is_valid"
                    ) === false
                ){
                    output = false;
                }

                // Validação de editora
                if (
                    validate_alphanumeric_attribute (
                        this, 
                        this.publisher, 
                        "publisher_is_empty", 
                        "publisher_is_valid"
                    ) === false
                ){
                    output = false;
                }

                // Validação de acabamento
                if (
                    validate_alphanumeric_attribute (
                        this, 
                        this.finishing, 
                        "finishing_is_empty", 
                        "finishing_is_valid"
                    ) === false
                ){
                    output = false;
                }

                // Validação de ano da edição
                if (
                    validate_attribute_by_regex (
                        this, 
                        this.year, 
                        new RegExp("^[0-9]+$", "g"), 
                        "year_is_empty", 
                        "year_is_valid"
                    ) === false
                ){
                    output = false;
                }

                // Validação de linguagem
                if (
                    validate_alphanumeric_attribute (
                        this, 
                        this.language, 
                        "language_is_empty", 
                        "language_is_valid"
                    ) === false
                ){
                    output = false;
                }

                // Validação de quantidade de páginas
                if (
                    validate_attribute_by_callback (
                        this, 
                        this.pages, 
                        pages => {return pages > 0}, 
                        "pages_is_empty", 
                        "pages_is_valid"
                    ) === false
                ){
                    output = false;
                }

                // Validação de descrição
                if (
                    validate_text_attribute (
                        this, 
                        this.description, 
                        "description_is_empty", 
                        "description_is_valid"
                    ) === false
                ){
                    output = false;
                }

                // Validação de fonte de imagem
                if (
                    validate_text_attribute (
                        this, 
                        this.image_source, 
                        "image_source_is_empty", 
                        "image_source_is_valid"
                    ) === false
                ){
                    output = false;
                }
            
                // Validação de senha
                if(this.is_updating === true){
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
                }

                return output;
            }, 


            // Submissão do formulário
            submit: async function() {

                // Validação dos dados
                if(this.validate() === true) {

                    // Validação da senha se necessário
                    if(this.is_updating === true){
                        await validate_password_by_id(this.$store.getters.user_id, this.password).then(res => {
                            if(res === true) {
                                this.password_is_valid = true;

                                // Produto a ser adicionado
                                const product = {
                                    id: this.product.id, 
                                    title: this.title, 
                                    price: this.price, 
                                    stock: this.stock, 
                                    rating: this.product.rating, 
                                    sales: this.product.sales, 
                                    author: this.author, 
                                    publisher: this.publisher, 
                                    finishing: this.finishing, 
                                    year: this.year, 
                                    language: this.language, 
                                    pages: this.pages, 
                                    description: this.description, 
                                    image_source: this.image_source, 
                                };

                                // Adição do produto à base de dados
                                update_product(product);
                                alert("Produto modificado com sucesso.");

                                // Navegação à tabela de produtos
                                this.$emit("submit");
                                window.scrollTo(0, 60);
                            }

                            // Senha inválida
                            else {
                                this.password_is_valid = false;
                            }
                        })
                    }
                    
                    // Ausência de necessidade de validação de senha
                    else {

                        // Produto a ser adicionado
                        const product = {
                            title: this.title, 
                            price: this.price, 
                            stock: this.stock, 
                            rating: 0.0, 
                            sales: 0, 
                            author: this.author, 
                            publisher: this.publisher, 
                            finishing: this.finishing, 
                            year: this.year, 
                            language: this.language, 
                            pages: this.pages, 
                            description: this.description, 
                            image_source: this.image_source, 
                        };

                        // Adição do produto à base de dados
                        add_product(product);
                        alert("Novo produto adicionado com sucesso.");

                        // Navegação à tabela de produtos
                        this.$emit("submit");
                        window.scrollTo(0, 60);
                    }
                }
            }, 

            // Cancela o formulário
            cancel() {
                this.$emit("submit");
                window.scrollTo(0, 60);
            }, 

        }, 
    }
</script>


<!-- .:::: STYLE ::::. -->
<style>
    @import "../css/profile-form.css";
</style>