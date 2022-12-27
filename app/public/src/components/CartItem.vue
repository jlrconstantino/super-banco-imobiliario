<!-- .:::: TEMPLATE ::::. -->
<template>

    <!-- Linha de uma tabela de itens -->
    <tr>

        <!-- Apresentação do item -->
        <td class="book-container cart-td" :class="{'bot-mar-td' : last_item === true}">

            <!-- Imagem do item -->
            <div class="cart-item-image-container">
                <img :src="require(`@/assets/sample-books/${book.image_source}`)" alt="product's image" class="cart-item-image">
            </div>

            <!-- Descrição do item -->
            <div class="cart-item-info-container">
                <h4 
                    class="cart-item-title text-darker-color hover-interaction-link-darker" 
                    @click="go_to_product_page()"
                >
                    {{book.title}}
                </h4>
                <table>
                    <tr>
                        <td class="text-darker-color left-td">Autor:</td>
                        <td class="text-common-color right-td">{{book.author}}</td>
                    </tr>
                    <tr>
                        <td class="text-darker-color left-td">Editora:</td>
                        <td class="text-common-color right-td">{{book.publisher}}</td>
                    </tr>
                    <tr>
                        <td class="text-darker-color left-td">Edição:</td>
                        <td class="text-common-color right-td">{{book.year}}</td>
                    </tr>
                </table>
            </div>
        </td>

        <!-- Quantidade do item -->
        <td class="centered-content cart-td" :class="{'bot-mar-td' : last_item === true}">
            <input 
                type="number" 
                min="1" 
                :max="book.stock"
                class="text-common-color"
                v-model="quantity">
            <p 
                class="text form-failed-input-text quantity-text"
                v-if="!quantity_is_valid">
                A quantidade fornecida é inválida. 
                Por favor, forneça um valor entre 1 e 
                {{book.stock}} (inclusive).
            </p>
        </td>
        
        <!-- Subtotal do item -->
        <td class="centered-content cart-td" :class="{'bot-mar-td' : last_item === true}">
            <h3 class="text-common-color">{{subtotal_string}}</h3>
        </td>

        <!-- Remover este item -->
        <td class="centered-content cart-td" :class="{'bot-mar-td' : last_item === true}">
            <img class="thrash-icon" src="../assets/icons/trash.svg" @click="remove_self()">
        </td>
    </tr>
</template>


<!-- .:::: SCRIPT ::::. -->
<script>

    // Importações
    import { select_product_by_id } from '@/utils/database-management';
    import { format_number_to_price } from '@/utils/utils';

    // Lógica local
    export default {

        // Nome do componente
        name: 'CartItem', 

        // Parâmetros
        props: {
            is_odd: Boolean, 
            cart_product: Object, 
            cart_product_index: Number, 
            last_item: Boolean, 
            subtotal: Number,
        }, 

        // Dados locais
        data() {
            return {

                // Validação
                quantity_is_valid: true, 

                // Livro
                book: {
                    id: 0,
                    title: "", 
                    price: 0, 
                    stock: 0, 
                    rating: 0, 
                    sales: 0, 
                    author: "", 
                    publisher: "", 
                    finishing: "", 
                    year: "", 
                    language: "", 
                    pages: 0, 
                    description: "", 
                    image_source: require("@/assets/sample-books/404.jpg"),
                }, 
            }; 
        }, 

        // Carrega o livro da base de dados
        created: async function() {

            // Obtenção do livro
            await select_product_by_id(this.cart_product.product).then(res => {
                this.book = res;
            });

            // Atualização do subtotal
            const payload = {
                index: this.cart_product_index, 
                subtotal: this.cart_product.quantity * this.book.price,
            };
            this.$store.commit("update_cart_item_subtotal", payload);
        }, 

        // Atributos computados
        computed: {

            // Para controle de quantidade
            quantity: {
                get() {
                    return this.cart_product.quantity;
                }, 
                set(value) {

                    // Validação
                    if(value >= 0 && value <= this.book.stock){
                        this.quantity_is_valid = true;
                        if(value == 0){
                            value = 1;
                        }

                        // Estrutura de atualização
                        const payload = {
                            index: this.cart_product_index, 
                            quantity: value, 
                            subtotal: value * this.book.price,
                        };

                        // Atualização Vuex
                        this.$store.commit("update_cart_item_quantity", payload);
                        this.$store.commit("update_cart_item_subtotal", payload);
                    }

                    // Quantidade inválida
                    else{
                        this.quantity_is_valid = false;
                    }
                }, 
            }, 

            // Para controle de subtotal
            subtotal_string() {
                if(this.cart_product.subtotal != null){
                    return format_number_to_price(this.cart_product.subtotal);
                }
                return "R$ 0,00";
            }, 
        }, 

        // Métodos auxiliares
        methods: {

            // Remoção do item do carrinho
            remove_self() {
                this.$store.commit("remove_cart_item", this.book.id);
            }, 

            // Navega à página de produto
            go_to_product_page() {
                this.$router.push({name: 'product', query: {id: this.book.id}, params: {title: this.book.title}});
                window.scrollTo(0,0);
            }, 
        },  
    }
</script>


<!-- .:::: STYLE ::::. -->
<style scoped>

    @import "../css/colors.css";
    @import "../css/profile-form.css";

    /* Borda */
    .cart-td {
        margin-top: 1rem;
        margin-left: 1rem;
        margin-right: 1rem;
    }
    .bot-mar-td {
        margin-bottom: 1.5rem;
        border-bottom: 0;
    }
    
    /* Contêiner da seção de capa e de informações */
    .book-container {
        width: 100%;
        display: inline-flex;
        justify-content: space-around;
        align-items: flex-start;
        padding: 0.5rem;
    }
    
    /* Contêiner da imagem do item */
    .cart-item-image-container {
        width: 33%;
        box-shadow: var(--inner-box-shadow);
    }

    /* Imagem do item */
    .cart-item-image {
        width: 100%;
        height: 100%; /*calc(290px * 0.8);*/
        position: relative;
        z-index: -1;
    }

    /* Contêiner das informações básicas do item */
    .cart-item-info-container {
        width: 60%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    /* Título do item */
    .cart-item-title {
        width: 100%;
        font-size: 1.8rem;
        margin-bottom: 1rem;
        text-align: left;
    }

    /* Tabela de informações básicas */
    .cart-item-info-container table {
        width: 100%;
    }
    .cart-item-info-container table td {
        text-align: left;
    }
    .left-td {
        width: 20%;
    }
    .right-td {
        width: 80%;
    }

    /* Centraliza o conteúdo das células */
    .centered-content {
        vertical-align: middle;
    }

    /* Define a quantidade do produto */
    input {
        font-size: 1.2rem;
        text-align: center;
        width: 80%;
        height: calc(1.2rem * 2.5);
        border-radius: 4px;
        border: var(--box-border);
    }

    /* Subtotal */
    h3 {
        font-size: 1.5rem;
    }

    /* Ícone de remoção */
    .thrash-icon {
        width: 40%;
        transition: 0.3s all ease-out;
    }
    .thrash-icon:hover {
        cursor: pointer;
        filter: brightness(0) drop-shadow(4px 4px 8px #acacac);
    }

    /* Informação de quantidade */
    .quantity-text { 
        text-align: justify;
        margin-top: 1rem;
    }
</style>