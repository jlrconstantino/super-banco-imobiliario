<!-- .:::: TEMPLATE ::::. -->
<template>

    <!-- Seção inicial -->
    <div v-if="selected_user_id == null">

        <!-- Apresentação -->
        <h2 class="form-h2">Gerenciar Usuários</h2>
        <p class="text-common-color">Quantia de usuários encontrados: {{filtered_users_data.length}}.</p>
        <br>

        <!-- Caixa de pesquisa -->
        <input 
            v-model="search_string" 
            type="text" 
            placeholder="Pesquisar por nome ou por e-mail" 
            id="searcher">

        <!-- Usuários cadastrados -->
        <table class="form-table" v-if="filtered_users_data.length > 0">

            <!-- Cabeçalho da tabela -->
            <tr class="form-table-header-row">
                <th class="form-table-title-item">E-Mail do Usuário</th>
                <th class="form-table-center-item">Nome do Usuário</th>
                <th class="form-table-last-item">Mais Detalhes</th>
            </tr>

            <!-- Itens da tabela -->
            <tr 
                v-for="(user, index) in filtered_users_data" 
                :key="user" 
                :class="index % 2 === 0 ? 'form-table-item-row-0' : 'form-table-item-row-1'">
                <td>
                    <label>{{user.email}}</label>
                </td>
                <td>
                    <label>{{user.name}}</label>
                </td>
                <td>
                    <a @click="start_user_update(user.id)">Visualizar/Modificar</a>
                </td>
            </tr>

        </table>

    </div>

    <!-- Seção de visualização do usuário -->
    <div v-if="selected_user_id != null">
        
        <!-- Apresentação 1 -->
        <h2 class="form-h2">Dados do Usuário</h2>
        <br>

        <!-- Nome e E-mail -->
        <div class="form-double-section margin-bottom-div">
            <div class="form-vertical-section">
                <h3 class="form-h3">E-Mail</h3>
                <p class="form-info-container text">{{selected_user.email}}</p>
            </div>
            <div class="form-vertical-section">
                <h3 class="form-h3">Nome</h3>
                <p class="form-info-container text">{{selected_user.name}}</p>
            </div>
        </div>

        <!-- Data de nascimento e Telefone -->
        <div class="form-double-section margin-bottom-div">
            <div class="form-vertical-section">
                <h3 class="form-h3">Data de Nascimento</h3>
                <p class="form-info-container text">{{selected_user.birth_date}}</p>
            </div>
            <div class="form-vertical-section">
                <h3 class="form-h3">Número de Telefone</h3>
                <p class="form-info-container text">{{selected_user.phone_number}}</p>
            </div>
        </div>
        
        <!-- Permissões -->
        <div v-if="!updating_permissions" class="margin-bottom-div margin-top-div">
            <h2 class="form-h2">Permissões do Usuário</h2>
            <br>
            <h3 class="form-h3">Função</h3>
            <p class="form-info-container text">{{selected_user.role}}</p>
            <br>
            <button @click="start_permissions_update()" class="standard-button">Modificar</button>
        </div>
        
        <!-- Atualização de Permissões -->
        <div v-if="updating_permissions" class="margin-bottom-div margin-top-div">

            <!-- Subtítulo -->
            <h2 class="form-h2">Atualizando Permissões do Usuário</h2>
            <br>
            
            <!-- Seleção de função (role) -->
            <h3 class="form-h3">Função</h3>
            <select 
                v-model="role" 
                class="form-info-container text margin-bottom-div"
                :value="selected_user.role">
                <option value="customer">customer</option>
                <option value="admin">admin</option>
            </select>

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

            <!-- Botões de Ação -->
            <div class="form-update-buttons-section margin-top-div">
                <button @click="update_permissions()" class="standard-button">Salvar Alterações</button>
                <button @click="cancel_permissions_update()" class="gray-button">Cancelar Alterações</button>
            </div>

        </div>

        <!-- Seção de segurança -->
        <div v-if="!updating_security" class="margin-top-div">
            <h2 class="form-h2">Segurança</h2>
            <br>
            <button 
                @click="start_user_removal()" 
                class="red-button"
                v-if="!is_self">
                Remover Usuário
            </button>
            <button 
                @click="alert('Impossível remover a si.');" 
                class="gray-button"
                v-if="is_self">
                Remover Usuário
            </button>
        </div>
        <div v-if="updating_security" class="margin-top-div">

            <!-- Subtítulo -->
            <h2 class="form-h2">Confirmando Remoção do Usuário</h2>
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

            <!-- Botões de Ação -->
            <div class="form-update-buttons-section">
                <button 
                    @click="remove_user()" 
                    class="red-button">
                    Confirmar Remoção
                </button>
                <button @click="cancel_user_removal()" class="gray-button">Cancelar</button>
            </div>

        </div>

    </div>

</template>


<!-- .:::: SCRIPT ::::. -->
<script>

    // Para manipulação da base de dados
    import { delete_user, select_all_users, update_user } from '@/utils/database-management';

    // Para manipulação de formulários
    import { validate_attribute_by_callback, validate_password_by_id } from '@/utils/form-validation';

    // Lógica local
    export default {

        // Nome do componente
        name: "UsersManager",
        
        // Dados locais
        data() {
            return {
                
                // Dados dos usuários
                users_data: [], 
                dummy_user: {
                    id: -1, 
                    name: "???", 
                    email: "???", 
                    password: "???", 
                    phone_number: "???", 
                    birth_date: "???", 
                    role: "???"
                }, 

                // Para controle de fluxo
                search_string: "", 
                updating_permissions: false, 
                updating_security: false, 

                // Para controle de senha
                password: "", 
                password_is_valid: true, 
                password_is_empty: false, 

                // Para controle de função
                role: "customer", 
            };
        }, 

        // Carrega os dados dos usuários
        created() {
            select_all_users().then(res => {
                if(res != null) {
                    this.users_data = res;
                }
            });
        }, 

        // Métodos auxiliares
        methods: {
            
            // Visualização / atualização do usuário
            start_user_update(user_id) {
                this.$router.push({name: 'manage-users', query: {id: user_id}});
                window.scrollTo(0,0);
            }, 

            // Reseta o formulário
            reset_form() {
                this.password = "";
                this.password_is_empty = false;
                this.password_is_valid = true;
            }, 

            // Atualizações de permissão
            start_permissions_update() {
                this.reset_form();
                this.updating_security = false;
                this.updating_permissions = true;
            }, 

            // Valida as permissões
            validate_permissions_update() {

                // Para controle de resultado
                let output = true;

                // Validação de função
                if (this.role != "customer" && this.role != "admin"){
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

            // Atualiza as permissões
            update_permissions: async function() {

                // Valida os dados
                if(this.validate_permissions_update() === true){

                    // Valida a senha
                    await validate_password_by_id(this.$store.getters.user_id, this.password).then(res => {
                        if(res === true) {
                            this.password_is_valid = true;

                            // Atualiza a base de dados se houve modificações
                            if(this.role != this.selected_user.role){
                                this.selected_user.role = this.role;
                                update_user(this.selected_user);
                            }

                            // Avisa ao usuário e finaliza
                            alert("Alterações de permissão efetuadas com sucesso.");
                            this.updating_permissions = false;

                        }
                        else{
                            this.password_is_valid = false;
                        }
                    });
                }
            }, 

            // Cancela as atualizações de permissão
            cancel_permissions_update() {
                this.reset_form();
                this.updating_permissions = false;
            }, 

            // Inicializa a remoção
            start_user_removal() {
                this.reset_form();
                this.updating_security = true;
                this.updating_permissions = false;
            }, 

            // Valida a remoção
            validate_user_removal() {
                
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

            // Remoção de usuário
            remove_user: async function() {

                // Valida os dados
                if(this.validate_user_removal() === true){

                    // Valida a senha
                    await validate_password_by_id(this.selected_user.id, this.password).then(res => {
                        if(res === true) {
                            this.password_is_valid = true;

                            // Atualiza a base de dados
                            delete_user(this.selected_user);

                            // Avisa ao usuário e finaliza
                            alert("Usuário removido com sucesso.");
                            this.updating_security = false;
                            this.$router.push({name: 'manage-users'});
                            window.scrollTo(0,0);
                        }
                        else{
                            this.password_is_valid = false;
                        }
                    });
                }
            }, 

            // Cancela a remoção
            cancel_user_removal() {
                this.reset_form();
                this.updating_security = false;
            }, 
        }, 

        // Atributos computados
        computed: {

            // Verifica se é o próprio usuário
            is_self() {
                return this.$store.getters.user_id == this.selected_user.id;
            }, 

            // ID selecionado por rota
            selected_user_id() {
                try {
                    return this.$route.query.id;
                } catch(_) {
                    return null;
                }
            }, 

            // Usuário selecionado
            selected_user() {
                const target_id = this.selected_user_id;
                if(target_id != null){
                    let output = this.users_data.find(user => {
                        return user.id == target_id;
                    });
                    if(output != null){
                        return output;
                    }
                }
                return this.dummy_user;
            }, 

            // Usuários selecionados
            filtered_users_data() {

                // Sem pesquisa
                if(this.search_string == null || this.search_string == ""){
                    return this.users_data;
                }

                // Padrão de busca
                const pattern = new RegExp(this.search_string, "g");

                // Filtragem
                return this.users_data.filter(user => {
                    return (
                        pattern.test(user.name.toLowerCase()) || 
                        pattern.test(user.email.toLowerCase())
                    );
                });
            }, 
        }, 
    }

</script>


<!-- .:::: STYLE ::::. -->
<style scoped>
    @import "../css/profile-form.css";

    /* Caixa de pesquisa */
    #searcher {
        width: auto;
        min-width: calc(35% - 2rem);
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

</style>