<!-- .:::: TEMPLATE ::::. -->
<template>
    <div id="main-container">

        <!-- Seção de login -->
        <div id="left-container" class="container">
            
            <!-- Subtítulo -->
            <h2 class="subtitle">Acesse sua conta</h2>
            
            <!-- Seção de e-mail -->
            <p class="text-darker-color">E-mail</p>
            <input 
                type="email" 
                placeholder="email@eee.com" 
                v-model="login_email"
                @keyup.enter="login()"
                :class="{
                    'failed-input': !login_email_is_valid || login_email_is_empty || !login_email_is_registered, 
                    'normal-input': login_email_is_valid && !login_email_is_empty && login_email_is_registered
                }">
            <p v-if="!login_email_is_valid" class="failed-input-text">O e-mail informado é inválido.</p>
            <p v-if="login_email_is_empty" class="failed-input-text">Este campo é obrigatório.</p>
            <p v-if="!login_email_is_registered" class="failed-input-text">O e-mail informado não está cadastrado.</p>

            <!-- Seção de senha -->
            <p class="text-darker-color">Senha</p>
            <input 
                type="password" 
                v-model="login_password"
                placeholder="⋅⋅⋅"
                @keyup.enter="login()"
                :class="{
                    'failed-input': !login_password_is_valid || login_password_is_empty, 
                    'normal-input': login_password_is_valid && !login_password_is_empty
                }">
            <p v-if="!login_password_is_valid" class="failed-input-text">A senha informada é inválida.</p>
            <p v-if="login_password_is_empty" class="failed-input-text">Este campo é obrigatório.</p>
            <a 
                class="text-common-color hover-interaction-link-darker" 
                @click="forgot_password()">Esqueceu sua senha?</a>

            <!-- Submit -->
            <button class="standard-button" @click="login()" @keyup.enter="login()">Entrar</button>

        </div>

        <!-- Seção de cadastro -->
        <div id="right-container" class="container">

            <!-- Subtítulo -->
            <h2 class="subtitle">Cadastre-se</h2>

            <!-- Seção de nome -->
            <p class="text-darker-color">Nome</p>
            <input 
                type="text" 
                v-model="name"
                placeholder="" 
                @keyup.enter="register()"
                :class="{
                    'failed-input': !name_is_valid || name_is_empty, 
                    'normal-input': name_is_valid && !name_is_empty
                }">
            <p v-if="!name_is_valid" class="failed-input-text">O nome informado é inválido (deve conter somente letras).</p>
            <p v-if="name_is_empty" class="failed-input-text">Este campo é obrigatório.</p>

            <!-- Seção de e-mail -->
            <p class="text-darker-color">E-mail</p>
            <input 
                type="email" 
                v-model="reg_email"
                placeholder="email@eee.com" 
                @keyup.enter="register()"
                :class="{
                    'failed-input': !reg_email_is_valid || reg_email_is_empty, 
                    'normal-input': reg_email_is_valid && !reg_email_is_empty
                }">
            <p v-if="!reg_email_is_valid" class="failed-input-text">O e-mail informado é inválido.</p>
            <p v-if="reg_email_is_empty" class="failed-input-text">Este campo é obrigatório.</p>
            <p v-if="reg_email_is_registered" class="failed-input-text">Este e-mail já está em uso.</p>

            <!-- Seção de senha -->
            <p class="text-darker-color">Senha</p>
            <input 
                type="password" 
                v-model="reg_password"
                @keyup.enter="register()"
                placeholder="⋅⋅⋅"
                :class="{
                    'failed-input': !reg_password_is_valid || reg_password_is_empty, 
                    'normal-input': reg_password_is_valid && !reg_password_is_empty
                }">
            <p v-if="!reg_password_is_valid" class="failed-input-text">A senha deve conter, no mínimo, três caracteres.</p>
            <p v-if="reg_password_is_empty" class="failed-input-text">Este campo é obrigatório.</p>

            <!-- Seção de data de nascimento -->
            <p class="text-darker-color">Data de nascimento</p>
            <input 
                type="date" 
                v-model="birth_date"
                @keyup.enter="register()"
                placeholder="dd/mm/aaaa"
                :class="{
                    'failed-input': !birth_date_is_valid || birth_date_is_empty, 
                    'normal-input': birth_date_is_valid && !birth_date_is_empty
                }">
            <p v-if="!birth_date_is_valid" class="failed-input-text">A data informada é inválida.</p>
            <p v-if="birth_date_is_empty" class="failed-input-text">Este campo é obrigatório.</p>

            <!-- Seção de telefone -->
            <p class="text-darker-color">Telefone</p>
            <input 
                type="tel" 
                pattern="\([0-9]{2}\) [0-9]{5}-[0-9]{4}"
                v-model="phone_number"
                @keyup.enter="register()"
                placeholder="(99)99999-9999"
                :class="{
                    'failed-input': !phone_number_is_valid || phone_number_is_empty, 
                    'normal-input': phone_number_is_valid && !phone_number_is_empty
                }">
            <p v-if="!phone_number_is_valid" class="failed-input-text">O telefone informado é inválido.</p>
            <p v-if="phone_number_is_empty" class="failed-input-text">Este campo é obrigatório.</p>
            
            <!-- Submit -->
            <button class="standard-button" @click="register()" @keyup.enter="register()">Cadastrar</button>

        </div>
    </div>
</template>


<!-- .:::: SCRIPT ::::. -->
<script>

    // Para manipulação de base de dados
    import { add_user, select_user_by_email, select_all_users } from "@/utils/database-management.js";

    // Para manipulação de formulários
    import { 
        validate_alphanumeric_attribute, 
        validate_attribute_by_regex, 
        validate_attribute_by_callback, 
        validate_email_attribute
    } from "@/utils/form-validation.js";

    // Lógica local
    export default {

        // Nome do componente
        name: "LogRegForm", 
        
        // Dados locais
        data() {
            return { 

                // Usuários da base de dados
                users: null, 
                
                // Controle de email de login
                login_email: "", 
                login_email_is_valid: true, 
                login_email_is_registered: true, 
                login_email_is_empty: false, 

                // Controle de senha de login
                login_password: "", 
                login_password_is_valid: true, 
                login_password_is_empty: false, 

                // Controle de nome de cadastro
                name: "", 
                name_is_valid: true, 
                name_is_empty: false, 

                // Controle de email de cadastro
                reg_email: "", 
                reg_email_is_valid: true, 
                reg_email_is_empty: false, 
                reg_email_is_registered: false, 
                registering: false, 

                // Controle de senha de cadastro
                reg_password: "", 
                reg_password_is_valid: true, 
                reg_password_is_empty: false, 

                // Controle de data de nascimento de cadastro
                birth_date: "", 
                birth_date_is_valid: true, 
                birth_date_is_empty: false, 

                // Controle de telefone de cadastro
                phone_number: "", 
                phone_number_is_valid: true, 
                phone_number_is_empty: false, 
            };
        }, 

        // Leitura dos usuários da base de dados
        created() {
            select_all_users().then(res => {
                this.users = res;
            });
        }, 

        // Métodos auxiliares
        methods: {

            // Esquecimento da senha
            forgot_password() {
                alert("Infelizmente, não há algo que possa ser feito acerca disso no momento.");
            }, 

            // Validação de login
            validate_login() {

                // Para controle do resultado
                let output = true;
                /* eslint-disable */
                const email_parser = new RegExp("^([a-zA-Z0-9_]+@[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+)$", "g");
                /* eslint-enable */

                // Validação de e-mail
                // Verificação de string vazia
                if(this.login_email === ""){
                    this.login_email_is_empty = true;
                    this.login_email_is_valid = true;
                    this.login_email_is_registered = true;
                    output = false;
                }
                // E-mail fornecido
                else{
                    this.login_email_is_empty = false;

                    // Teste de formatação
                    if(email_parser.test(this.login_email)){
                        this.login_email_is_valid = true;

                        // Verificação de usuário pré-existente
                        if(this.users.some(user => {return user.email === this.login_email})) {
                            this.login_email_is_registered = true;
                        }else{
                            this.login_email_is_registered = false;
                            output = false;
                        }
                    }
                    // Formatação inválida
                    else{
                        this.login_email_is_valid = false;
                        this.login_email_is_registered = true;
                        output = false;
                    }
                }

                // Validação de senha
                if (
                    validate_attribute_by_callback (
                        this, 
                        this.login_password, 
                        password => {return password.length >= 3}, 
                        "login_password_is_empty", 
                        "login_password_is_valid"
                    ) === false
                ){
                    output = false;
                }

                return output;
            }, 

            // Realização de login
            login: async function() {

                // Validação inicial
                if(this.validate_login() === true){

                    // Busca pelo usuário
                    let target_user = null;
                    await select_user_by_email(this.login_email).then(res => {
                        target_user = res;
                    });
                    if(target_user != null){

                        // Validação de senha
                        if(target_user.password === this.login_password){
                            this.login_password_is_valid = true;

                            // Login
                            this.$store.commit("set_user", target_user);
                            this.$router.go(-1);
                        }
                        
                        // Senha inválida
                        else{
                            this.login_password_is_valid = false;
                        }
                    }else{
                        this.login_password_is_valid = false;
                    }
                }
            }, 

            // Validação de registro
            validate_register() {

                // Para controle do resultado
                let output = true;

                // Validação de nome
                if (
                    validate_alphanumeric_attribute (
                        this, 
                        this.name, 
                        "name_is_empty", 
                        "name_is_valid"
                    ) === false
                ){
                    output = false;
                }

                // Validação de e-mail
                if (
                    validate_email_attribute(
                        this, 
                        this.reg_email, 
                        "reg_email_is_empty", 
                        "reg_email_is_valid"
                    ) === false
                ){
                    output = false;
                }

                // Validação de senha
                if (
                    validate_attribute_by_callback (
                        this, 
                        this.reg_password, 
                        password => {return password.length >= 3}, 
                        "reg_password_is_empty", 
                        "reg_password_is_valid"
                    ) === false
                ){
                    output = false;
                }

                // Validação de data de nascimento
                if (
                    validate_attribute_by_regex(
                        this, 
                        this.birth_date, 
                        new RegExp("^[0-9]{4}-[0-9]{2}-[0-9]{2}$", "g"), 
                        "birth_date_is_empty", 
                        "birth_date_is_valid"
                    ) === false
                ){
                    output = false;
                }

                // Validação de telefone
                if (
                    validate_attribute_by_regex(
                        this, 
                        this.phone_number, 
                        new RegExp("[0-9]+", "g"), 
                        "phone_number_is_empty", 
                        "phone_number_is_valid"
                    ) === false
                ){
                    output = false;
                }

                return output;
            }, 

            // Cadastro de uma nova conta
            register: async function() {

                // Verificação de sincronismo
                if(this.registering === false){

                    // Sincronismo
                    this.registering = true;

                    // Por garantia
                    this.reg_email_is_registered = false;

                    // Validação
                    if(this.validate_register()){

                        // Verificação de usuário pré-existente
                        let existent_user = null;
                        await select_user_by_email(this.reg_email).then(res => {
                            existent_user = res;
                        });
                        if(existent_user == null){

                            // Criação da nova conta
                            let new_user = {
                                id: this.users.length, 
                                email: this.reg_email, 
                                name: this.name, 
                                password: this.reg_password, 
                                phone_number: this.phone_number, 
                                birth_date: this.birth_date, 
                                role: "customer", 
                            };

                            // Adição da nova conta
                            add_user(new_user);

                            // Atualização dos usuários
                            this.users.push(new_user);

                            // Login
                            this.$store.commit("set_user", new_user);
                            this.$router.go(-1);
                        }

                        // E-mail já registrado
                        else {
                            this.reg_email_is_registered = true;
                        }
                    }

                    // Sincronismo
                    this.registering = false;
                }
            }, 

        }, 
    }

</script>


<!-- .:::: STYLE ::::. -->
<style scoped>

    @import "../css/colors.css";
    @import "../css/global-style.css";

    /* Contêineres */
    #main-container {
        margin-top: 0;
        display: block;
        width: 80%;
        height: auto;
        border: var(--box-border);
        border-radius: 5px;
    }
    .container {
        width: calc(49% - 2rem);
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }
    #left-container {
        float: left;
    }
    #right-container {
        float: right;
        padding-left: 2rem;
        border-left: var(--box-border);
    }

    /* Subtítulo */
    .subtitle {
        font-size: 1.8rem;
        margin-bottom: 1.8rem;
    }

    /* Texto */
    p {
        font-size: 1rem;
        margin-bottom: 0.3rem;
    }

    /* Formulário */
    input {
        font-size: 1.0rem;
        width: 70%;
        height: 1.5rem;
        padding: 5px;
        border: var(--box-border);
        box-shadow: var(--box-shadow-minimized);
        border-radius: 5px;
        margin-bottom: 5px;
    }
    .normal-input{
        margin-bottom: 1.0rem;
    }
    .failed-input {
        border: var(--box-red-border);
        color: rgba(221, 52, 52, 0.9);
    }
    .failed-input-text {
        color: rgba(221, 52, 52, 0.9);
        margin-bottom: 1rem;
    }

    /* Botão */
    button {
        width: auto;
        min-width: 30%;
        height: 2.2rem;
        font-size: 1.2rem;
        margin-bottom: 1rem;
        margin-top: 1.5rem;
    }

</style>