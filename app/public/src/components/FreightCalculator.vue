<!-- .:::: TEMPLATE ::::. -->
<template>
    <div class="shipping-container shipping-bordered-container">
        <p class="main-text text-darker-color"> Calcule o frete e o prazo de entrega: </p>
        <div class="secondary-container">
            <input 
                v-model="cep" 
                type="text" 
                placeholder="12345-123"
                class="shipping-input text"
                @keyup.enter="calculate_freight()"
                :class="{'form-normal-input-text': cep_is_valid && !cep_is_empty}">
            <button 
                @click="calculate_freight()"
                class="pink-button" 
            >Consultar</button>
        </div>
        <p v-if="!cep_is_valid" class="form-failed-input-text">O CEP informado é inválido.</p>
        <p v-if="cep_is_empty" class="form-failed-input-text">Este campo é obrigatório.</p>
        <p v-if="show_result" class="result-text text-common-color">
            Para o seu endereço, o valor de frete estimado é de {{result}}, 
            enquanto a previsão de entrega é de até 20 dias úteis.
        </p>
    </div>
</template>

<!-- .:::: SCRIPT ::::. -->
<script>

    // Validação e formatação de formulário
    import { validate_attribute_by_regex } from '@/utils/form-validation';

    // Lógica local
    export default {

        // Nome da componente
        name: 'FreightCalculator', 

        // Parâmetros
        props: {
            freight: Number, 
        }, 

        // Dados locais
        data() {
            return {

                // Para controle de CEP
                cep: "",
                cep_is_valid: true, 
                cep_is_empty: false, 
                show_result: false, 
            };
        }, 

        // Métodos auxiliares
        methods: {

            // Validação de CEP
            validate_cep() {

                // Para controle de resultado
                let output = true;

                // Validação
                if (
                    validate_attribute_by_regex (
                        this, 
                        this.cep, 
                        new RegExp("^[0-9]{5}-[0-9]{3}$", "g"), 
                        "cep_is_empty", 
                        "cep_is_valid"
                    ) === false
                ){
                    output = false;
                }

                return output;
            }, 

            // Calcula o CEP
            calculate_freight() {
                if(this.validate_cep() === true) {
                    this.show_result = true;
                    this.$emit("update:freight", 14.90);
                }else{
                    this.show_result = false;
                }
            }, 
        }, 

        // Valores computados
        computed: {

            // Resultado para visualização
            result() {
                return "R$ 14,90";
            }, 
        }
    }

</script>


<!-- .:::: STYLE ::::. -->
<style scoped>

    @import "@/css/profile-form.css";

    /* Texto */
    .main-text {
        font-size: 1.0rem;
    }
    .result-text {
        font-size: 1.0rem;
        width: calc(100% - 1rem);
        text-align: center;
        background-color: rgb(200, 200, 200);
        padding: 0.5rem;
    }

    /* Contêineres com borda */
    .shipping-bordered-container {
        padding: 1rem;
        border: var(--product-box-border);
        border-radius: 5px;
    }

    /* Contêiner da calculadora de frete */
    .shipping-container {
        background-color: rgb(219, 219, 219);
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .secondary-container {
        display: flex;
        align-items: center;
        justify-content: space-around;
        gap: 1rem;
    }

    /* Entrada para inserção do CEP */
    .shipping-input {
        text-align: center;
        font-size: 1rem;
        height: 2rem;
        border-radius: 5px;
        width: 55%;
        border: var(--product-box-border);
        box-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.281);
    }

    /* Botão de consulta */
    .pink-button {
        font-size: 1rem;
        height: 2rem;
        width: 35%;
    }

    /* Textos normal e indicador de falhas */
    .form-normal-input-text {
        margin-bottom: 0rem;
    }
    .form-failed-input-text {
        color: var(--red-text-color);
        margin-bottom: 0rem;
    }
    
</style>