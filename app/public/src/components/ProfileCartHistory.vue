<!-- .:::: TEMPLATE ::::. -->
<template>

    <!-- Lista de compras -->
    <div v-if="!showing_cart">

        <!-- Informações de rodapé -->
        <h2 class="form-h2">Histórico de Compras</h2>
        <p class="text-common-color">Quantia de compras efetuadas: {{shopping_carts.length}}.</p><br>

        <!-- Compras cadastradas -->
        <table class="form-table" v-if="shopping_carts.length > 0">

            <!-- Cabeçalho da tabela -->
            <tr class="form-table-header-row">
                <th class="form-table-title-item">Data e Hora da Compra</th>
                <th class="form-table-center-item">Valor Total</th>
                <th class="form-table-last-item">Mais Detalhes</th>
            </tr>

            <!-- Itens da tabela -->
            <tr 
                v-for="(cart, index) in shopping_carts" 
                :key="cart" 
                :class="index % 2 === 0 ? 'form-table-item-row-0' : 'form-table-item-row-1'">
                <td>
                    <label>{{format_cart_datetime(cart.datetime)}}</label>
                </td>
                <td>
                    <label>{{format_price(cart.subtotal + cart.freight)}}</label>
                </td>
                <td>
                    <a @click="start_cart_view(cart, index)">Visualizar</a>
                </td>
            </tr>

        </table>

    </div>

    <!-- Visão do carrinho -->
    <div v-if="showing_cart">

        <div class="form-double-section">

            <!-- Data de compra -->
            <div class="form-vertical-section">
                <h2 class="form-h2">Data e Hora da Compra</h2>
                <p class="form-info-container form-normal-input-text">
                    {{format_cart_datetime(active_cart.datetime)}}
                </p>
            </div>

            <!-- Número da Fatura -->
            <div class="form-vertical-section">
                <h2 class="form-h2">Número da Fatura</h2>
                <p class="form-info-container form-normal-input-text">
                    {{active_cart.invoice}}
                </p>
            </div>
        
        </div>

        <div class="form-double-section">

            <!-- Subtotal -->
            <div class="form-vertical-section">
                <h2 class="form-h2">Subtotal</h2>
                <p class="form-info-container form-normal-input-text">
                    {{format_price(active_cart.subtotal)}}
                </p>
            </div>

            <!-- Frete -->
            <div class="form-vertical-section">
                <h2 class="form-h2">Frete</h2>
                <p class="form-info-container form-normal-input-text">
                    {{format_price(active_cart.freight)}}
                </p>
            </div>

        </div>

        <!-- Informações da tabela -->
        <h2 class="form-h3">Itens do Carrinho</h2>
        <p class="text-common-color">Quantia de produtos únicos: {{cart_products.length}}.</p><br>

        <!-- Produtos cadastrados -->
        <table class="form-table" v-if="cart_products.length > 0">

            <!-- Cabeçalho da tabela -->
            <tr class="form-table-header-row">
                <th class="form-table-title-item">Título do Produto</th>
                <th class="form-table-center-item">Quantidade</th>
                <th class="form-table-last-item">Subtotal</th>
            </tr>

            <!-- Itens da tabela -->
            <tr 
                v-for="(cart_product, index) in cart_products" 
                :key="cart_product" 
                :class="index % 2 === 0 ? 'form-table-item-row-0' : 'form-table-item-row-1'">
                <td>
                    <label>{{cart_product.title}}</label>
                </td>
                <td>
                    <label>{{cart_product.quantity}}</label>
                </td>
                <td>
                    <label>{{format_price(cart_product.subtotal)}}</label>
                </td>
            </tr>

        </table>

        <!-- Botão para voltar -->
        <button class="form-button gray-button" @click="stop_cart_view()">Voltar</button>

    </div>

</template>

<!-- .:::: SCRIPT ::::. -->
<script>

    // Para manipulação da base de dados
    import { 
        select_product_by_id, 
        select_cart_products, 
        select_user_shopping_carts, 
    } from '@/utils/database-management';

    // Acesso a estados compartilhados
    import store from '@/store';

    // Para formatação de strings
    import { 
        format_date_to_string, 
        format_number_to_price 
    } from '@/utils/utils';

    // Lógica local
    export default {

        // Nome da componente
        name: 'ProfileCartHistory', 

        // Dados locais
        data() {
            return {

                // Carrinhos
                shopping_carts: [], 

                // Mock
                mock_cart: {
                    user: "", 
                    invoice: "", 
                    datetime: "", 
                    subtotal: 0.0, 
                    freight: 0.0, 
                }, 

                // Carrinho anterior
                last_cart_index: -1, 

                // Produtos do carrinho
                cart_products: [], 

                // Controle de visão
                showing_cart: false, 

            };
        }, 

        // Aquisição dos carrinhos
        created: async function() {
            await select_user_shopping_carts(store.getters.user_id).then(res => {
                if(res != null){
                    this.shopping_carts = res;
                }
            });
        }, 

        // Atributos computados
        computed: {
            active_cart() {
                if(this.last_cart_index >= 0){
                    return this.shopping_carts[this.last_cart_index];
                }
                return this.mock_cart;
            }, 
        }, 

        // Métodos auxiliares
        methods: {

            // Retorna a string de data
            format_cart_datetime(datetime){
                return format_date_to_string(datetime);
            }, 

            // Retorna a string de preço
            format_price(price) {
                return format_number_to_price(price);
            }, 

            // Inicializa a visão do carrinho
            start_cart_view: async function(cart, index){

                // Flag
                this.showing_cart = true;

                // Para evitar carregamentos desnecessários
                if(this.last_cart_index != index){
                    this.last_cart_index = index;

                    // Seleciona os produtos do carrinho
                    await select_cart_products(cart.user, cart.invoice).then(res => {
                        if(res != null){
                            this.cart_products = res;
                        }else{
                            this.cart_products = [];
                        }
                    });

                    // Seleciona os títulos
                    for(const cp of this.cart_products){
                        cp.title = "???";
                        await select_product_by_id(cp.product).then(res => {
                            if(res != null){
                                cp.title = res.title;
                            }
                        });
                    }

                    // Ordena as compras
                    await this.cart_products.sort(function(a,b){
                        return a.getTime() - b.getTime();
                    });
                }
                window.scrollTo(0,60);
            }, 

            // Finaliza a visualização do carrinho
            stop_cart_view() {
                this.showing_cart = false;
                window.scrollTo(0,60);
            }, 
        }, 
    }

</script>


<!-- .:::: STYLE ::::. -->
<style scoped>
    @import "@/css/profile-form.css";
</style>