<!-- .:::: TEMPLATE ::::. -->
<template>

    <!-- Informações -->
    <h2 class="form-h2" v-if="!updating_data && !updating_security">Informações</h2>
    <button @click="start_data_updates()" v-if="!updating_data && !updating_security" class="form-button standard-button">Alterar Dados</button>
    <div v-if="updating_data">

        <!-- Nome -->
        <h2 class="form-h2">Nome</h2>
        <p class="form-info-container form-normal-input-text" v-if="!updating_data">{{user_data.name}}</p>
        <input 
            v-model="user_data.name" 
            type="text" 
            class="form-info-container text" 
            v-if="updating_data"
            :class="{'form-normal-input-text': name_is_valid && !name_is_empty}">
        <p v-if="!name_is_valid" class="form-failed-input-text">O nome informado é inválido (deve conter somente caracteres alfanuméricos).</p>
        <p v-if="name_is_empty" class="form-failed-input-text">Este campo é obrigatório.</p>

        <!-- E-Mail -->
        <h2 class="form-h2">E-Mail</h2>
        <p class="form-info-container form-normal-input-text" v-if="!updating_data">{{user_data.email}}</p>
        <input 
            v-model="user_data.email" 
            type="email" 
            class="form-info-container text" 
            v-if="updating_data"
            :class="{'form-normal-input-text': email_is_valid && !email_is_empty}">
        <p v-if="!email_is_valid" class="form-failed-input-text">O e-mail informado é inválido.</p>
        <p v-if="email_is_empty" class="form-failed-input-text">Este campo é obrigatório.</p>
        
        <!-- Data de Nascimento -->
        <h2 class="form-h2">Data de Nascimento</h2>
        <p class="form-info-container form-normal-input-text" v-if="!updating_data">{{user_data.birth_date}}</p>
        <input 
            v-model="user_data.birth_date" 
            type="date" 
            class="form-info-container text" 
            v-if="updating_data"
            :class="{'form-normal-input-text': birth_date_is_valid && !birth_date_is_empty}">
        <p v-if="!birth_date_is_valid" class="form-failed-input-text">A data informada é inválida.</p>
        <p v-if="birth_date_is_empty" class="form-failed-input-text">Este campo é obrigatório.</p>

        <!-- Telefone -->
        <h2 class="form-h2">Telefone</h2>
        <p class="form-info-container form-normal-input-text" v-if="!updating_data">{{user_data.phone_number}}</p>
        <input 
            v-model="user_data.phone_number" 
            type="tel" 
            pattern="\([0-9]{2}\) [0-9]{5}-[0-9]{4}"
            class="form-info-container text" 
            v-if="updating_data"
            :class="{'form-normal-input-text': phone_number_is_valid && !phone_number_is_empty}">
        <p v-if="!phone_number_is_valid" class="form-failed-input-text">O telefone informado é inválido.</p>
        <p v-if="phone_number_is_empty" class="form-failed-input-text">Este campo é obrigatório.</p>

        <!-- Confirmar senha -->
        <h2 class="form-h2">Confirme sua Senha</h2>
        <input 
            v-model="input_password" 
            placeholder="⋅⋅⋅"
            type="password" 
            class="form-info-container text"
            :class="{'form-normal-input-text': password_is_valid && !password_is_empty}">
        <p v-if="!password_is_valid" class="form-failed-input-text">A senha informada é inválida.</p>
        <p v-if="password_is_empty" class="form-failed-input-text">Este campo é obrigatório.</p>
            
        <!-- Alterar dados pessoais -->
        <div class="form-update-buttons-section">
            <button @click="update_data()" class="form-button standard-button">Salvar Alterações</button>
            <button @click="cancel_data_updates(true)" class="form-button gray-button">Cancelar</button>
        </div>
    </div>

    <!-- Segurança -->
    <h2 v-if="!updating_security && !updating_data" class="form-h2 form-top-label-with-margin">Segurança</h2>
    <button @click="start_security_updates()" v-if="!updating_security && !updating_data" class="form-button standard-button">Alterar Senha</button>
    <div v-if="updating_security">

        <!-- Senha antiga -->
        <h2 class="form-h2">Senha Anterior</h2>
        <input 
            v-model="old_password" 
            placeholder="⋅⋅⋅"
            type="password" 
            class="form-info-container text"
            :class="{'form-normal-input-text': old_password_is_valid && !old_password_is_empty}">
        <p v-if="!old_password_is_valid" class="form-failed-input-text">A senha informada é inválida.</p>
        <p v-if="old_password_is_empty" class="form-failed-input-text">Este campo é obrigatório.</p>

        <!-- Nova Senha -->
        <h2 class="form-h2">Nova Senha</h2>
        <input 
            v-model="new_password" 
            placeholder="⋅⋅⋅"
            type="password" 
            class="form-info-container text"
            :class="{'form-normal-input-text': new_password_is_valid && !new_password_is_empty}">
        <p v-if="!new_password_is_valid" class="form-failed-input-text">A senha informada é inválida.</p>
        <p v-if="new_password_is_empty" class="form-failed-input-text">Este campo é obrigatório.</p>

        <!-- Botões de alteração -->
        <div class="form-update-buttons-section">
            <button @click="update_security()" class="form-button standard-button">Salvar Senha</button>
            <button @click="cancel_security_updates(true)" class="form-button gray-button">Cancelar</button>
        </div>

    </div>

</template>


<!-- .:::: SCRIPT ::::. -->
<script>

    // Acesso ao Vuex e à base de dados
    import store from '@/store/index.js';
    import { select_user_by_id, update_user } from '@/utils/database-management';

    // Para validação de formulário
    import { 
        validate_attribute_by_callback, 
        validate_attribute_by_regex, 
        validate_alphanumeric_attribute, 
        validate_email_attribute, 
        validate_birth_date_attribute, 
    } from '@/utils/form-validation';

    // Lógica local
    export default {

        // Nome do componente
        name: "ProfileData", 

        // Dados locais
        data() {
            return {

                // Dados do usuário
                user_data: {
                    id: 0, 
                    email: "", 
                    name: "", 
                    password: "", 
                    phone_number: "", 
                    birth_date: "", 
                    role: "customer", 
                }, 

                // Para controlar habilitação de alterações
                updating_data: false, 
                updating_security: false, 

                // Controle de nome de alteração
                name_is_valid: true, 
                name_is_empty: false, 

                // Controle de email de alteração
                email_is_valid: true, 
                email_is_empty: false, 

                // Controle de data de nascimento de alteração
                birth_date_is_valid: true, 
                birth_date_is_empty: false, 

                // Controle de telefone de alteração
                phone_number_is_valid: true, 
                phone_number_is_empty: false, 

                // Controle de senha (dados pessoais)
                input_password: "", 
                password_is_valid: true, 
                password_is_empty: false, 

                // Controle de senha (segurança)
                old_password: "", 
                new_password: "", 
                old_password_is_valid: true, 
                old_password_is_empty: false, 
                new_password_is_valid: true, 
                new_password_is_empty: false, 
            };
        }, 

        // Aquisição dos dados do usuário
        created() {
            select_user_by_id(store.getters.user_id).then(res => {
                this.user_data = res;
            });
        }, 

        // Métodos auxiliares
        methods: {

            // Inicializa as alterações dos dados pessoais
            start_data_updates() {
                this.updating_data = true;
                if(this.updating_security === true){
                    this.cancel_security_updates();
                }
            }, 

            // Validação de alterações dos dados pessoais
            validate_data_updates() {

                // Para controle do resultado
                let output = true;

                // Validação de nome
                if (
                    validate_alphanumeric_attribute (
                        this, 
                        this.user_data.name, 
                        "name_is_empty", 
                        "name_is_valid"
                    ) === false
                ){
                    output = false;
                }

                // Validação de e-mail
                if (
                    validate_email_attribute (
                        this, 
                        this.user_data.email, 
                        "email_is_empty", 
                        "email_is_valid"
                    ) === false
                ){
                    output = false;
                }

                // Validação de senha
                if (
                    validate_attribute_by_callback (
                        this, 
                        this.input_password, 
                        password => {return password.length >= 3}, 
                        "password_is_empty", 
                        "password_is_valid"
                    ) === false
                ){
                    output = false;
                }

                // Validação de data de nascimento
                if (
                    validate_birth_date_attribute (
                        this, 
                        this.user_data.birth, 
                        "birth_date_is_empty", 
                        "birth_date_is_valid"
                    ) === false
                ){
                    output = false;
                }

                // Validação de telefone
                if (
                    validate_attribute_by_regex (
                        this, 
                        this.user_data.phone_number, 
                        new RegExp("[0-9]+", "g"), 
                        "phone_number_is_empty", 
                        "phone_number_is_valid"
                    ) === false
                ){
                    output = false;
                }

                return output;
            }, 

            // Atualização dos dados pessoais
            update_data() {

                // Cancela possíveis atualizações de segurança
                if(this.update_security === true){
                    this.cancel_security_updates(false);
                }

                // Valida os dados pessoais
                if(this.validate_data_updates()) {

                    // Verifica a senha fornecida
                    if(this.input_password === this.user_data.password){
                        
                        // Controle
                        this.password_is_valid = true;
                        this.updating_data = false;
                        this.input_password = "";
                        
                        // Modificação do usuário
                        update_user(this.user_data);
                        this.$store.commit("set_user", this.user_data);

                        // Informa ao usuário
                        alert("Dados pessoais atualizados com sucesso.");
                    }
                    
                    // Senha inválida
                    else{
                        this.password_is_valid = false;
                    }
                }
            }, 

            // Cancela as atualizações dos dados pessoais
            cancel_data_updates(scroll) {
                select_user_by_id(store.getters.user_id).then(res => {
                    this.user_data = res;
                });
                this.updating_data = false;
                if(scroll === true){
                    window.scrollTo(0,60);
                }
            }, 

            // Inicializa as alterações de segurança
            start_security_updates() {
                this.updating_security = true;
                if(this.updating_data === true){
                    this.cancel_data_updates();
                }
            }, 

            // Valida as informações de segurança
            validate_security() {

                // Para controle do resultado
                let output = true;

                // Validação da senha antiga
                if (
                    validate_attribute_by_callback (
                        this, 
                        this.old_password, 
                        password => {return password.length >= 3}, 
                        "old_password_is_empty", 
                        "old_password_is_valid"
                    ) === false
                ){
                    output = false;
                }

                // Validação da nova senha
                if (
                    validate_attribute_by_callback (
                        this, 
                        this.new_password, 
                        password => {return password.length >= 3}, 
                        "new_password_is_empty", 
                        "new_password_is_valid"
                    ) === false
                ){
                    output = false;
                }

                return output;
            }, 

            // Atualiza a senha
            update_security() {

                // Cancela possíveis atualizações de dados pessoais em andamento
                if(this.update_data === true){
                    this.cancel_data_updates(false);
                }

                // Validação das senhas fornecidas
                if(this.validate_security()) {
                    if(this.old_password === this.user_data.password){

                        // Controle
                        this.updating_security = false;
                        this.old_password_is_valid = true;
                        this.user_data.password = this.new_password;
                        this.old_password = "";
                        this.new_password = "";

                        // Modificação do usuário
                        update_user(this.user_data);

                        // Informa ao usuário
                        alert("Nova senha cadastrada com sucesso.");
                    }
                    
                    // Senha inválida
                    else{
                        this.old_password_is_valid = false;
                    }
                }
            }, 

            // Cancela as alterações de segurança
            cancel_security_updates(scroll) {
                this.updating_security = false;
                if(scroll === true){
                    window.scrollTo(0,60);
                }
            }, 
        }, 
    }

</script>


<!-- .:::: STYLE ::::. -->
<style>
    @import "../css/profile-form.css";
</style>