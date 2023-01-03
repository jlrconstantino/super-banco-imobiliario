<!-- .:::: TEMPLATE ::::. -->
<template>
    <div id="calculator-container">

        <!-- Visor -->
        <div id="calculator-display">
            <p>{{output}}</p>
        </div>

        <!-- clear, pró-labore, delete -->
        <div class="row">
            <button class="button alt" @click="set_display('0')">C</button>
            <button class="button alt" @click="set_display('2000')">
                <img src="@/assets/icons/money-bill.svg" class="icon">
            </button>
            <button class="button alt" @click="del()">
                <img src="@/assets/icons/arrow-left.svg" class="icon">
            </button>
        </div>

        <!-- 1, 2, 3 -->
        <div class="row">
            <button class="button" @click="add_number('1')">1</button>
            <button class="button" @click="add_number('2')">2</button>
            <button class="button" @click="add_number('3')">3</button>
        </div>

        <!-- 4, 5, 6 -->
        <div class="row">
            <button class="button" @click="add_number('4')">4</button>
            <button class="button" @click="add_number('5')">5</button>
            <button class="button" @click="add_number('6')">6</button>
        </div>

        <!-- 7, 8, 9 -->
        <div class="row">
            <button class="button" @click="add_number('7')">7</button>
            <button class="button" @click="add_number('8')">8</button>
            <button class="button" @click="add_number('9')">9</button>
        </div>

        <!-- +, 0, - -->
        <div class="row">
            <button class="green-button" @click="add_balance()">
                <img src="@/assets/icons/plus.svg" class="icon">
            </button>
            <button class="button" @click="add_number('0')">0</button>
            <button class="red-button" @click="reduce_balance()">
                <img src="@/assets/icons/minus.svg" class="icon">
            </button>
        </div>
    </div>
</template>


<!-- .:::: SCRIPT ::::. -->
<script>

    // Lógica local
    export default {

        // Nome do componente
        name: 'CalculatorComponent', 

        // Valor da calculadora
        data() {
            return {
                output: "0", 
            };
        }, 

        // Métodos auxiliares
        methods: {

            // Adiciona um número ao visor
            add_number(number) {
                if(this.output[0] === '0') {
                    this.output = number;
                }else{
                    this.output += number;
                }
            }, 

            // Deleta um número do visor
            del() {
                this.output = this.output.slice(0,-1);
                if(this.output === "") {
                    this.output = "0";
                }
            }, 

            // Atribui um valor ao número do visor
            set_display(value) {
                this.output = value;
            }, 

            // Transação de adição
            add_balance() {
                this.$emit("add", this.output);
            }, 

            // Transação de remoção
            reduce_balance() {
                this.$emit("reduce", this.output);
            }, 

            // Controle de botões
            handle_button(event) {
                switch(event.key) {

                    // Números
                    case '0': this.add_number('0'); break;
                    case '1': this.add_number('1'); break;
                    case '2': this.add_number('2'); break;
                    case '3': this.add_number('3'); break;
                    case '4': this.add_number('4'); break;
                    case '5': this.add_number('5'); break;
                    case '6': this.add_number('6'); break;
                    case '7': this.add_number('7'); break;
                    case '8': this.add_number('8'); break;
                    case '9': this.add_number('9'); break;

                    // Clear
                    case 'c': this.set_display('0'); break;

                    // 2000
                    case 'End': this.set_display('0'); break;
                    case 'Home': this.set_display('2000'); break;

                    // Delete
                    case 'Delete': this.del(); break;
                    case 'Backspace': this.del(); break;

                    // Add
                    case '=': this.add_balance(); break;
                    case '+': this.add_balance(); break;
                    case 'Enter': this.add_balance(); break;

                    // Reduce
                    case '-': this.reduce_balance(); break;
                    case ' ': this.reduce_balance(); break;

                    default: break;
                }
            }
        }, 

        // Uso de botões
        mounted() { window.addEventListener('keyup', (event) => this.handle_button(event)); }, 
        unmounted() { window.removeEventListener("keyup", (event) => this.handle_button(event)); }, 
    }
</script>


<!-- .:::: STYLE ::::. -->
<style>
    @import "../css/colors.css";

    /* Contêiner */
    #calculator-container {
        width: 100%;
        height: auto;
        background-color: var(--deepest-blue);
        border: 2px solid var(--main-blue);
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 8px;
    }

    /* Visor */
    #calculator-display {
        width: calc(95% - 1rem);
        border: 12px ridge var(--main-blue);
        background-color: var(--foreground-color);
        padding: 0.5rem;
    }
    #calculator-display p {
        font-size: 1.8rem;
        text-align: center;
        color: var(--main-blue);
        font-weight: bold;
    }

    /* Botões */
    #calculator-container .row {
        width: 100%;
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 1%;
    }
    #calculator-container button {
        width: 32%;
        font-size: 1.8rem;
        margin-bottom: 0;
        height: 3.8rem;
        max-height: 3.8rem;
        overflow: hidden;
    }
    #calculator-container .row .icon {
        height: 2.5rem;
        width: auto;
    }
    #calculator-container .alt {
        border: 2px solid #31809b;
        color: #31809b;
        background-color: var(--deep-blue);
    }
    #calculator-container .alt:hover {
        color: rgb(77, 153, 179);
        border: 2px solid rgb(77, 153, 179);
    }
</style>