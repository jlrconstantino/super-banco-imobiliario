<!-- .:::: TEMPLATE ::::. -->
<template>

    <!-- Seção de cartões -->
    <div v-if="!adding_card">

        <!-- Informações de rodapé -->
        <h2 class="form-h2">Cartões de Crédito</h2>
        <p class="text-common-color">Quantia de elementos cadastrados: {{cards_data.length}}.</p><br>

        <!-- Cartões de crédito cadastrados -->
        <table class="form-table" v-if="cards_data.length > 0">

            <!-- Cabeçalho da tabela -->
            <tr class="form-table-header-row">
                <th class="form-table-title-item">Título do Cartão</th>
                <th class="form-table-center-item">Número do Cartão</th>
                <th class="form-table-last-item">Selecionar Cartão</th>
            </tr>

            <!-- Itens da tabela -->
            <tr 
                v-for="(card, index) in cards_data" 
                :key="card" 
                :class="{
                    'form-table-item-row-0' : index % 2 === 0, 
                    'form-table-item-row-1' : index % 2 !== 0, 
                    'form-table-item-row-emphasis' : active_card === index
                }">
                <td>
                    <label>{{card.title}}</label>
                </td>
                <td>
                    <label>{{card.number.substring(0,5) + "..."}}</label>
                </td>
                <td>
                    <a @click="select_credit_card(card, index)">{{active_card === index ? 'Selecionado' : 'Selecionar'}}</a>
                </td>
            </tr>

        </table>

        <!-- Botões de gerenciamento de cartões de crédito -->
        <div class="form-update-buttons-section">
            <button @click="start_card_addition()" class="form-button standard-button">Adicionar cartão</button>
            <button @click="go_to_profile_payment()" class="form-button orange-button">Gerenciar cartões</button>
        </div>

    </div>

    <!-- Seção de adição e modificação de cartões -->
    <div v-if="adding_card">

        <!-- Título do cartão -->
        <h2 class="form-h2">Título do Cartão</h2>
        <p class="text-common-color" style="margin-bottom: 1rem;">(somente para referência)</p>
        <input 
            v-model="card_title" 
            type="text"
            class="form-info-container text"
            :class="{'form-normal-input-text': card_title_is_valid && !card_title_is_empty}"
            @keyup.enter="add_card()">
        <p v-if="!card_title_is_valid" class="form-failed-input-text">O título informado é inválido (deve conter somente caracteres alfanuméricos).</p>
        <p v-if="card_title_is_empty" class="form-failed-input-text">Este campo é obrigatório.</p>

        <div class="form-double-section">

            <!-- Número do cartão -->
            <div class="form-vertical-section">
                <h2 class="form-h2">Número do Cartão</h2>
                <input 
                    v-model="card_number" 
                    type="text" 
                    placeholder="1111 2222 3333 4444"
                    maxlength="19"
                    class="form-info-container text"
                    :class="{'form-normal-input-text': card_number_is_valid && !card_number_is_empty}"
                    @keyup.enter="add_card()">
                <p v-if="!card_number_is_valid" class="form-failed-input-text">O número informado é inválido.</p>
                <p v-if="card_number_is_empty" class="form-failed-input-text">Este campo é obrigatório.</p>
            </div>

            <!-- Proprietário do Cartão -->
            <div class="form-vertical-section">
                <h2 class="form-h2">Proprietário do Cartão</h2>
                <input 
                    v-model="cardholder" 
                    placeholder=""
                    type="text" 
                    class="form-info-container text"
                    :class="{'form-normal-input-text': cardholder_is_valid && !cardholder_is_empty}"
                    @keyup.enter="add_card()">
                <p v-if="!cardholder_is_valid" class="form-failed-input-text">O nome informado é inválido.</p>
                <p v-if="cardholder_is_empty" class="form-failed-input-text">Este campo é obrigatório.</p>
            </div>
        
        </div>

        <div class="form-double-section">

            <!-- Data de validade do cartão -->
            <div class="form-vertical-section">
                <h2 class="form-h2">Data de Validade</h2>
                <input 
                    v-model="expiration_date" 
                    type="month" 
                    class="form-info-container text"
                    :class="{'form-normal-input-text': expiration_date_is_valid && !expiration_date_is_empty}"
                    @keyup.enter="add_card()">
                <p v-if="!expiration_date_is_valid" class="form-failed-input-text">A data informada é inválida.</p>
                <p v-if="expiration_date_is_empty" class="form-failed-input-text">Este campo é obrigatório.</p>
            </div>

            <!-- Código de Segurança -->
            <div class="form-vertical-section">
                <h2 class="form-h2">Código de Segurança</h2>
                <input 
                    v-model="security_code" 
                    placeholder=""
                    type="text" 
                    maxlength="3"
                    class="form-info-container text"
                    :class="{'form-normal-input-text': security_code_is_valid && !security_code_is_empty}"
                    @keyup.enter="add_card()">
                <p v-if="!security_code_is_valid" class="form-failed-input-text">O código informado é inválido.</p>
                <p v-if="security_code_is_empty" class="form-failed-input-text">Este campo é obrigatório.</p>
            </div>

        </div>

        <!-- Confirmação de senha -->
        <h2 class="form-h2">Confirme sua Senha</h2>
        <input 
            v-model="password" 
            placeholder="⋅⋅⋅"
            type="password" 
            class="form-info-container text"
            :class="{'form-normal-input-text': password_is_valid && !password_is_empty}"
            @keyup.enter="add_card()">
        <p v-if="!password_is_valid" class="form-failed-input-text">A senha informada é inválida.</p>
        <p v-if="password_is_empty" class="form-failed-input-text">Este campo é obrigatório.</p>
        <div class="form-info-container text" style="margin-bottom:2rem;">
            <input class="save-card-input"
                v-model="save_card"
                value="false"
                type="checkbox"
                @keyup.enter="add_card()">
            <span class="text">Salvar este cartão em sua conta.</span>
        </div>

        <!-- Botões de ação -->
        <div class="form-update-buttons-section">

            <!-- Adição -->
            <button @click="add_card()" class="form-button standard-button">Selecionar Cartão</button>
            <button @click="cancel_card_addition()" class="form-button gray-button">Cancelar</button>

        </div>

    </div>

</template>


<!-- .:::: SCRIPT ::::. -->
<script>

    // Para manipulação do banco de dados
    import store from '@/store';
    import { add_credit_card, select_user_credit_cards } from '@/utils/database-management';

    // Para manipulação de formulários
    import { 
        validate_attribute_by_callback, 
        validate_attribute_by_regex, 
        validate_alphanumeric_attribute, 
        validate_password_by_id 
    } from '@/utils/form-validation';

    // Lógica local
    export default {

        // Nome do componente
        name: "PurchasePayment", 

        // Dados locais
        data() {
            return {

                // Cartões de Crédito
                total_database_cards: 0, 
                cards_data: [], 
                target_card_id: "", 

                // Para controle de adição
                adding_card: false, 
                save_card: false, 

                // Controle de título
                card_title: "", 
                card_title_is_valid: true, 
                card_title_is_empty: false, 

                // Controle de número de cartão
                previous_card_number: "", 
                card_number: "", 
                card_number_is_valid: true, 
                card_number_is_empty: false, 

                // Controle de data de validade
                expiration_date: "", 
                expiration_date_is_valid: true, 
                expiration_date_is_empty: false, 

                // Controle de código de segurança
                security_code: "", 
                security_code_is_valid: true, 
                security_code_is_empty: false, 

                // Controle de nome de proprietário
                cardholder: "", 
                cardholder_is_valid: true, 
                cardholder_is_empty: false,
                
                // Controle de senha
                password: "", 
                password_is_valid: true, 
                password_is_empty: false, 
            };
        }, 

        // Aquisição dos dados do usuário
        created() {
            select_user_credit_cards(store.getters.user_id).then(res => {
                if(res != null) {
                    this.cards_data = res;
                }
            });
        }, 

        // Atributos computados
        computed: {
            active_card: {
                get() {
                    return store.getters.payment_method_index;
                }, 
                set(value) {
                    store.commit("set_payment_method_index", value);
                },
            }, 
        }, 

        // Métodos auxiliares
        methods: {

            // Navega para a página de gerenciamento de cartões de crédito
            go_to_profile_payment(){
                this.$router.push({name: 'profile-payment-methods'});
                window.scrollTo(0,0);
            }, 

            // Seleciona um cartão pré-existente
            select_credit_card(card, index){
                this.active_card = index;
                store.commit("set_payment_method", card);
            }, 
            
            // Inicializa a adição de um novo cartão de crédito
            start_card_addition() {
                this.adding_card = true;
                window.scrollTo(0,60);
            }, 

            // Redefine os dados de formulário
            reset_card_form() {

                // Título
                this.card_title = "";
                this.card_title_is_valid = true;
                this.card_title_is_empty = false;

                // Número de cartão
                this.previous_card_number = "";
                this.card_number = "";
                this.card_number_is_valid = true;
                this.card_number_is_empty = false;

                // Data de validade
                this.expiration_date = "";
                this.expiration_date_is_valid = true;
                this.expiration_date_is_empty = false;

                // Código de segurança
                this.security_code = "";
                this.security_code_is_valid = true;
                this.security_code_is_empty = false;

                // Nome de proprietário
                this.cardholder = "";
                this.cardholder_is_valid = true;
                this.cardholder_is_empty = false;
                
                // Senha
                this.password = "";
                this.password_is_valid = true;
                this.password_is_empty = false;
            }, 

            // Cancela a adição de um novo cartão de crédito
            cancel_card_addition() {
                this.adding_card = false;
                window.scrollTo(0,60);
                this.reset_card_form();
            }, 

            // Valida as informações fornecidas
            validate_card_info() {

                // Para controle do resultado
                let output = true;

                // Validação de título de cartão
                if (
                    validate_alphanumeric_attribute (
                        this, 
                        this.card_title, 
                        "card_title_is_empty", 
                        "card_title_is_valid"
                    ) === false
                ){
                    output = false;
                }

                // Validação de número do cartão
                if (
                    validate_attribute_by_regex (
                        this, 
                        this.card_number, 
                        new RegExp("^([0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4})$", "g"), 
                        "card_number_is_empty", 
                        "card_number_is_valid"
                    ) === false
                ){
                    output = false;
                }

                // Validação de data de validade
                if (
                    validate_attribute_by_regex (
                        this, 
                        this.expiration_date, 
                        /* eslint-disable */
                        new RegExp("^[0-9]{4}-[0-9]{2}$", "g"), 
                        /* eslint-enable */
                        "expiration_date_is_empty", 
                        "expiration_date_is_valid"
                    ) === false
                ){
                    output = false;
                }

                // Validação de proprietário
                if (
                    validate_alphanumeric_attribute (
                        this, 
                        this.cardholder, 
                        "cardholder_is_empty", 
                        "cardholder_is_valid"
                    ) === false
                ){
                    output = false;
                }

                // Validação de código de segurança
                if (
                    validate_attribute_by_regex (
                        this, 
                        this.security_code, 
                        new RegExp("^[0-9]{3}$", "g"), 
                        "security_code_is_empty", 
                        "security_code_is_valid"
                    ) === false
                ){
                    output = false;
                }

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

            // Valida a senha do usuário
            validate_password: async function() {
                let output = true;
                await validate_password_by_id(store.getters.user_id, this.password).then(res => {
                    if(res === true){
                        this.password_is_valid = true;
                    }else{
                        this.password_is_valid = false;
                        output = false;
                    }
                });
                return output;
            }, 

            // Valida as informações e a senha do usuário
            validate_card_info_and_password: async function() {

                // Para controle da saída
                let output = false;

                // Validação das informações e da senha
                if(this.validate_card_info() === true) {
                    await this.validate_password().then(res => {
                        if(res === true){
                            output = true;
                        }
                    });
                }

                return output;
            }, 

            // Adiciona um novo cartão
            add_card: async function() {
                
                // Validação dos dados e da senha
                this.validate_card_info_and_password().then(res => {
                    if(res === true){

                        // Cria o novo cartão
                        const credit_card = {
                            user: store.getters.user_id, 
                            number: this.card_number, 
                            title: this.card_title, 
                            security_code: this.security_code, 
                            cardholder: this.cardholder, 
                            expiration_date: this.expiration_date, 
                        };
                        store.commit("set_payment_method", credit_card);

                        // Caso queira salvar em base de dados
                        if(this.save_card === true) {

                            // Adição do novo cartão
                            add_credit_card(credit_card);

                            // Atualização dos dados da página
                            this.active_card = this.cards_data.length;
                            this.cards_data.push(credit_card);

                            // Avisa ao usuário
                            alert("Novo cartão de crédito cadastrado com sucesso.");
                        }else{
                            alert("Cartão de crédito selecionado com sucesso.");
                        }

                        // Finalização
                        this.cancel_card_addition();
                    }
                });
            }, 
        }, 
    }

</script>


<!-- .:::: STYLE ::::. -->
<style scoped>
    @import "../css/profile-form.css";
    @import "../css/colors.css";
    .save-card-input {
        border: var(--box-border);
        box-shadow: 0.05rem 0.05rem 0.2rem rgba(0, 0, 0, 0.281);
        margin-right: 1rem;
    }
</style>