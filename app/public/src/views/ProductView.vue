<!-- .:::: TEMPLATE ::::. -->
<template>

    <!-- Visão geral do produto -->
    <div v-if="data_is_ready" class="product-container-div" id="product-overview-container">

        <!-- Imagens do produto -->
        <div id="product-overview-left-container">
            
            <!-- Imagem de exibição -->
            <div id="product-overview-image-container">
                <div id="product-current-display-image-container">
                    <img :src="require(`@/assets/sample-books/${product.image_source}`)" alt="product's image" id="product-current-display-image">
                </div>
            </div>

        </div>

        <!-- Seção direita -->
        <div id="product-overview-right-container">
            
            <!-- Avaliação e informações básicas -->
            <div class="product-bordered-container">

                <!-- Avaliação -->
                <div id="product-review-container">
                    <img :src="rating_stars[0]" alt="product's review" class="product-review-image">
                    <img :src="rating_stars[1]" alt="product's review" class="product-review-image">
                    <img :src="rating_stars[2]" alt="product's review" class="product-review-image">
                    <img :src="rating_stars[3]" alt="product's review" class="product-review-image">
                    <img :src="rating_stars[4]" alt="product's review" class="product-review-image">
                    <p id="product-review-number-displayer">({{this.product.rating}})</p>
                </div>

                <!-- Título e informações -->
                <div id="product-overview-info">
                    <h2 id="product-title">{{product.title}}</h2>
                    <table>
                        <tr>
                            <td class="text-darker-color">Autor:</td>
                            <td class="text-common-color" id="product-spec-author">{{product.author}}</td>
                        </tr>
                        <tr>
                            <td class="text-darker-color">Editora:</td>
                            <td class="text-common-color" id="product-spec-publisher">{{product.publisher}}</td>
                        </tr>
                    </table>
                </div>
            
            </div>

            <!-- Compra -->
            <div id="product-purchase-container" class="product-bordered-container">
                <h3 id="product-price">{{format_price(product.price)}}</h3>
                <p id="product-price-alternative">{{format_price_installment(product.price, 8)}}</p>
                <button id="product-purchase-button" class="standard-button" @click="go_to_cart()"> COMPRAR </button>
            </div>

            <!-- Frete -->
            <FreightCalculator v-model="freight" id="freight-calculator"></FreightCalculator>

        </div>

    </div>

    <!-- Descrição do produto -->
    <div id="product-description-container" class="product-container-div product-bordered-container">
        <h3 class="product-subtitle"> Descrição </h3>
        <p id="product-description" class="text-common-color text-justify">{{product.description}}</p>
    </div>

    <!-- Características adicionais do produto -->
    <div id="product-specs-container" class="product-container-div product-bordered-container">
        <h3 class="product-subtitle"> Características </h3>
        <table class="text-common-color">
            <tr> 
                <td>Acabamento</td>
                <td id="product-spec-finish">{{product.finishing}}</td>
            </tr>
            <tr> 
                <td>Ano da edição</td>
                <td id="product-spec-edition">{{product.year}}</td>
            </tr>
            <tr> 
                <td>Idioma</td>
                <td id="product-spec-language">{{product.language}}</td>
            </tr>
            <tr> 
                <td>Número de páginas</td>
                <td id="product-spec-pages">{{product.pages}}</td>
            </tr>
        </table>
    </div>

    <!-- Avaliação -->
    <div 
        id="product-rate-container" 
        class="product-container-div product-bordered-container" 
        v-if="!this.$store.getters.is_admin && this.$store.getters.is_authenticated">
        <div class="form-vertical-section">
            <h3 class="product-subtitle">Avaliação</h3>
            <template v-if="!has_rating">
                <input 
                    v-model="rating" 
                    type="number" 
                    step="0.1"
                    class="form-info-container text"
                    :class="{'form-normal-input-text': rating_is_valid && !rating_is_empty}"
                    @keyup.enter="rate_product()">
                <p v-if="!rating_is_valid" class="form-failed-input-text">A avaliação informada é inválida: deve estar entre 0.0 e 5.0 (inclusive).</p>
                <p v-if="rating_is_empty" class="form-failed-input-text">Este campo é obrigatório.</p>
                <button @click="rate_product()" class="form-button standard-button">Submeter</button>
            </template>
            <p v-if="has_rating">Sua avaliação: <span class="">{{format_rating()}}</span>.</p>
        </div>
    </div>

    <!-- Administração -->
    <div id="product-admin-container" class="product-container-div product-bordered-container" v-if="this.$store.getters.is_admin">
        <h3 class="product-subtitle">Administração</h3>
        <button @click="manage_product()" class="form-button standard-button">Gerenciar este Produto</button>
    </div>

</template>


<!-- .:::: SCRIPT ::::. -->
<script>

    // Para importação da base de dados
    import { add_rating, select_product_by_id, select_user_product_rating, update_product_rating } from '@/utils/database-management';

    // Para manipulação de formulário
    import { validate_attribute_by_callback } from '@/utils/form-validation';

    // Importação de componentes
    import FreightCalculator from '@/components/FreightCalculator.vue';

    // Lógica local
    export default {

        // Nome do componente para exportação
        name: 'ProductView', 

        // Atribuição de componentes
        components: {
            FreightCalculator, 
        }, 

        // Dados locais
        data() {
            return {

                // Para controlar o frete
                freight: 0.0, 

                // Caminhos das estrelas
                full_star: null, 
                half_star: null, 
                null_star: null, 

                // Para computar avaliação
                rating: 5.0, 
                has_rating: false, 
                rating_is_empty: false, 
                rating_is_valid: true, 
                refresh: false, 

                // Produto
                product: {
                    id: 0, 
                    title: "", 
                    price: 0.0, 
                    stock: 0, 
                    rating: 0.0, 
                    sales: 0, 
                    author: "",
                    publisher: "",
                    finishing: "", 
                    year: 0, 
                    language: "", 
                    pages: 0, 
                    description: "",
                    image_source: require("@/assets/sample-books/404.jpg"),
                }, 
                
                // Para controle assíncrono
                data_is_ready: false, 
            };
        }, 

        // Obtenção dos caminhos das estrelas e do produto
        created: async function() {

            // Estrelas
            this.full_star = require("@/assets/icons/full-star.svg");
            this.half_star = require("@/assets/icons/half-star.svg");
            this.null_star = require("@/assets/icons/null-star.svg");

            // Obtenção dos itens
            try{

                // Produto
                await select_product_by_id(this.$route.query.id).then(res => {
                    if(res != null){
                        this.product = res;
                    }
                    this.data_is_ready = true;
                });

                // Avaliação
                if(this.data_is_ready === true){
                    try {
                        await select_user_product_rating(this.$store.getters.user_id, this.$route.query.id).then(res => {
                            if(res != null && res.rating !== undefined) {
                                this.rating = res.rating;
                                this.has_rating = true;
                            }
                        });
                    } catch(_) {
                        this.has_rating = false;
                    }
                }
            }catch(_){
                this.data_is_ready = true;
            }
        }, 

        // Métodos auxiliares
        methods: {

            // Formatação de strings
            format_price(price) {
                return "R$ " + price.toFixed(2).toString().replace('.', ',');
            }, 
            format_price_installment(price, installments) {
                return "Ou em até " + installments.toString() + "x de R$ " + (price/installments).toFixed(2).toString().replace('.', ',') + "."
            }, 
            format_rating() {
                try {
                    return parseFloat(this.rating).toFixed(1).replace('.', ',')
                } catch(_) {
                    return "???";
                }
            }, 

            // Navegação
            go_to_cart() {
                this.$router.push({name: 'cart'});
                this.$store.commit("add_cart_item", this.$route.query.id);
                window.scrollTo(0,60);
            }, 
            manage_product() {
                this.$router.push({name: 'manage-products', query: {id: this.product.id}});
                window.scrollTo(0,60);
            }, 

            // Validação da avaliação fornecida
            validate_rating() {
                
                // Para controle de resultado
                let output = true;

                // Validação de número do cartão
                if (
                    validate_attribute_by_callback (
                        this, 
                        this.rating, 
                        rating => {return (rating >= 0.0 && rating <= 5.0 );}, 
                        "rating_is_empty", 
                        "rating_is_valid"
                    ) === false
                ){
                    output = false;
                }

                return output;
            }, 

            // Envio da avaliação fornecida
            rate_product: async function() {

                // Validação
                if(this.validate_rating() === true) {

                    // Adição ao banco de dados 
                    const rating = {
                        user: this.$store.getters.user_id, 
                        product: this.product.id, 
                        rating: this.rating, 
                    };
                    await add_rating(rating);

                    // Atualização da página
                    alert("Avaliação enviada com sucesso.");
                    this.has_rating = true;

                    // Atualização da base de dados
                    let new_rating = 0.0;
                    await update_product_rating(this.product.id).then(res => {
                        if(res != null && res >= 0.0) {
                            new_rating = res;
                        }
                    });
                    this.product.rating = new_rating;
                    this.refresh = !this.refresh;
                }
            }, 
        },

        // Cômputo da avaliação do produto
        computed: {
            rating_stars: function(){
                this.refresh;
                let stars = [0, 0, 0, 0, 0];
                let rating = 5.0;
                if(this.product != null){
                    rating = this.product.rating;
                }
                let index = 0;
                while(rating >= 1.0) {
                    stars[index] = this.full_star;
                    rating -= 1.0;
                    index += 1;
                }
                if(rating >= 0.75){
                    stars[index] = this.full_star;
                    index += 1;
                }else if(rating >= 0.25){
                    stars[index] = this.half_star;
                    index += 1;
                }
                while(index < 5){
                    stars[index] = this.null_star;
                    index += 1;
                }
                return stars;
            }, 
        }, 
    }
</script>


<!-- .:::: STYLE ::::. -->
<style>
    @import "../css/colors.css";
    @import "../css/global-style.css";

    /* **************** GERAIS **************** */

    :root {
        --product-box-border: 1px groove rgba(190, 190, 190, 0.9);
    }

    
    /* Calculadora de frete */
    #freight-calculator {
        margin-top: 4%;
    }

    /* Divisão de itens */
    .product-container-div {
        width: 80%;
        height: auto;
    }

    /* Contêineres com borda */
    .product-bordered-container {
        padding: 1rem;
        border: var(--product-box-border);
        border-radius: 5px;
    }

    /* Texto de subtítulo */
    .product-subtitle {
        font-size: 2rem; 
        color: var(--text-color);
    }


    /* **************** VISÃO GERAL DO PRODUTO: SEÇÃO ESQUERDA **************** */

    /* Adição de espaçamento superior */
    #product-overview-container {
        margin-top: 8vh;
    }

    /* Contêiner esquerdo */
    #product-overview-left-container {
        width: 45%;
        height: auto;
        float: left;
    }

    /* Mostrador das imagens disponíveis */
    #product-overview-little-images-container {
        width: 20%;
        max-height: 48vh;
        float: left;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        gap: 3vh;
    }

    /* Mostrador de uma imagem disponível */
    #product-overview-little-images-container div {
        width: 100%;
        box-shadow: var(--inner-box-shadow);
    }

    /* Imagem de exibição disponível */
    #product-overview-little-images-container img {
        width: 100%;
        height: auto;
        position: relative;
        z-index: -1;
    }

    /* Mostrador da imagem de exibição */
    #product-overview-image-container {
        width: 80%;
        float: right;
        display: flex;
        align-items: center;
    }

    /* Seta para mudança de imagem */
    .product-arrow-image {
        width: 15%;
        height: auto;
        filter: brightness(70%);
        z-index: -1;
    }

    /* Contêiner da imagem de exibição atual */
    #product-current-display-image-container {
        width: 70%;
        box-shadow: var(--inner-box-shadow);
    }

    /* Imagem de exibição atual */
    #product-current-display-image {
        width: 100%;
        height: auto;
        position: relative;
        z-index: -1;
    }


    /* **************** VISÃO GERAL DO PRODUTO: SEÇÃO DIREITA **************** */

    /* Contêiner direito */
    #product-overview-right-container {
        width: 55%;
        height: auto;
        float: right;
    }

    /* Avaliação do produto */
    #product-review-container {
        width: 15%;
        display: inline-flex;
        margin-bottom: 0.5rem;
    }

    /* Estrela de avaliação */
    .product-review-image {
        width: 20%;
        height: auto;
    }

    /* Mostrador numérico da avaliação */
    #product-review-number-displayer {
        color: var(--review-text-color);
        padding-left: 0.3rem;
    }

    /* Texto de Título */
    #product-title {
        font-size: 2.5rem; 
        color: var(--text-darker-color);
    }

    /* Tabela de informações de autor e de editora */
    #product-overview-info table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0 1rem;
    }

    /* Redução de cobertura de largura */
    #product-spec-author, #product-spec-publisher {
        width: 87%;
    }

    /* Contêiner da seção de compra */
    #product-purchase-container {
        margin-top: 4vh;
        padding: 3rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    /* Preço do título */
    #product-price {
        margin-bottom: 0.2rem;
        color: rgb(38, 38, 177);
        font-size: 2.4rem;
    }

    /* Texto alternativo do preço */
    #product-price-alternative {
        color: var(--text-color);
        font-size: 1.2rem;
        margin-bottom: 1rem;
    }

    /* Botão de compra */
    #product-purchase-button {
        width: 40%;
        height: 3.6rem;
        font-size: 1.8rem;
    }


    /* **************** DESCRIÇÃO DO PRODUTO **************** */

    /* Contêiner */
    #product-description-container {
        margin-top: 4vh;
    }

    /* Texto da descrição */
    #product-description-container p {
        padding-top: 1rem;
    }


    /* **************** ESPECIFICAÇÕES DO PRODUTO **************** */

    /* Contêiner */
    #product-specs-container {
        margin-top: 4vh;
    }

    /* Tabela de especificações */
    #product-specs-container table {
        width: 100%;
    }

    /* Linha da tabela de especificações */
    #product-specs-container tr {
        border-bottom: var(--product-box-border);
        margin-bottom: 1rem;
    }

    /* Item da tabela de especificações */
    #product-specs-container td {
        padding-top: 1rem;
    }

    /* Administração */
    #product-admin-container, #product-rate-container {
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
    #product-admin-container h3, #product-rate-container h3 {
        margin-bottom: 1rem;
    }
    #product-rate-container input {
        width: 40%;
    }
    #product-rate-container p {
        font-size: 1.2rem;
        color: var(--text-color);
    }
    #product-rate-container span {
        color: var(--review-text-color);
    }

</style>