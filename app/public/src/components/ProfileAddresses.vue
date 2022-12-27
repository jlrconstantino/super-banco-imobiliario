<!-- .:::: TEMPLATE ::::. -->
<template>

    <!-- Seção de endereços -->
    <div v-if="!adding_address && !updating_address">

        <!-- Informações de rodapé -->
        <h2 class="form-h2">Endereços de Entrega</h2>
        <p class="text-common-color">Quantia de elementos cadastrados: {{addresses_data.length}}.</p><br>

        <!-- Endereços cadastrados -->
        <table class="form-table" v-if="addresses_data.length > 0">

            <!-- Cabeçalho da tabela -->
            <tr class="form-table-header-row">
                <th class="form-table-title-item">Título do Endereço</th>
                <th class="form-table-center-item">Prévia do Endereço</th>
                <th class="form-table-last-item">Modificar Endereço</th>
            </tr>

            <!-- Itens da tabela -->
            <tr 
                v-for="(address, index) in addresses_data" 
                :key="address" 
                :class="index % 2 === 0 ? 'form-table-item-row-0' : 'form-table-item-row-1'">
                <td>
                    <label>{{address.title}}</label>
                </td>
                <td>
                    <label>{{get_address_preview(address)}}</label>
                </td>
                <td>
                    <a @click="start_address_update(address)">Modificar</a>
                </td>
            </tr>

        </table>

        <!-- Botão de adição de endereço -->
        <button @click="start_address_addition()" class="form-button standard-button">Adicionar endereço</button>

    </div>

    <!-- Seção de adição e modificação de endereços -->
    <div v-if="adding_address || updating_address">

        <!-- Título do endereço -->
        <h2 class="form-h2">Título do endereço</h2>
        <p class="text-common-color" style="margin-bottom: 1rem;">(somente para referência)</p>
        <input 
            v-model="address_title" 
            type="text"
            class="form-info-container text"
            :class="{'form-normal-input-text': address_title_is_valid && !address_title_is_empty}">
        <p v-if="!address_title_is_valid" class="form-failed-input-text">O título informado é inválido (deve conter somente caracteres alfanuméricos).</p>
        <p v-if="address_title_is_empty" class="form-failed-input-text">Este campo é obrigatório.</p>


        <!-- CEP do endereço -->
        <h2 class="form-h2">CEP</h2>
        <input 
            v-model="cep" 
            type="text" 
            placeholder="12345-123"
            class="form-info-container text"
            :class="{'form-normal-input-text': cep_is_valid && !cep_is_empty}">
        <p v-if="!cep_is_valid" class="form-failed-input-text">O CEP informado é inválido.</p>
        <p v-if="cep_is_empty" class="form-failed-input-text">Este campo é obrigatório.</p>


        <div class="form-double-section">

            <!-- Estado do endereço -->
            <div class="form-vertical-section">
                <h2 class="form-h2">Estado</h2>
                <select 
                    v-model="address_state" 
                    class="form-info-container text"
                    :class="{'form-normal-input-text': address_state_is_valid && !address_state_is_empty}">
                    <option v-for="element in states_list" :key="element" :value="element">{{element}}</option>
                </select>
                <p v-if="!address_state_is_valid" class="form-failed-input-text">O estado informado é inválido.</p>
                <p v-if="address_state_is_empty" class="form-failed-input-text">Este campo é obrigatório.</p>
            </div>

            <!-- Cidade do endereço -->
            <div class="form-vertical-section">
                <h2 class="form-h2">Cidade</h2>
                <input 
                    v-model="city" 
                    type="text" 
                    class="form-info-container text"
                    :class="{'form-normal-input-text': city_is_valid && !city_is_empty}">
                <p v-if="!city_is_valid" class="form-failed-input-text">A cidade informada é inválida.</p>
                <p v-if="city_is_empty" class="form-failed-input-text">Este campo é obrigatório.</p>
            </div>

        </div>


        <div class="form-double-section">

            <!-- Bairro do endereço -->
            <div class="form-vertical-section">
                <h2 class="form-h2">Bairro</h2>
                <input 
                    v-model="district" 
                    type="text" 
                    class="form-info-container text"
                    :class="{'form-normal-input-text': district_is_valid && !district_is_empty}">
                <p v-if="!district_is_valid" class="form-failed-input-text">O bairro informado é inválido.</p>
                <p v-if="district_is_empty" class="form-failed-input-text">Este campo é obrigatório.</p>
            </div>

            <!-- Rua do endereço -->
            <div class="form-vertical-section">
                <h2 class="form-h2">Rua</h2>
                <input 
                    v-model="street" 
                    type="text" 
                    class="form-info-container text"
                    :class="{'form-normal-input-text': street_is_valid && !street_is_empty}">
                <p v-if="!street_is_valid" class="form-failed-input-text">A rua informada é inválida.</p>
                <p v-if="street_is_empty" class="form-failed-input-text">Este campo é obrigatório.</p>
            </div>

        </div>


        <div class="form-double-section">

            <!-- Número do endereço -->
            <div class="form-vertical-section">
                <h2 class="form-h2" style="margin-bottom: 3.0rem;">Número</h2>
                <input 
                    v-model="number" 
                    type="text" 
                    maxlength="8"
                    class="form-info-container text"
                    :class="{'form-normal-input-text': number_is_valid && !number_is_empty}">
                <p v-if="!number_is_valid" class="form-failed-input-text">O número informado é inválido.</p>
                <p v-if="number_is_empty" class="form-failed-input-text">Este campo é obrigatório.</p>
            </div>

            <!-- Complemento do endereço -->
            <div class="form-vertical-section">
                <h2 class="form-h2">Complemento</h2>
                <p class="text-common-color" style="margin-bottom: 1rem;">(opcional)</p>
                <input 
                    v-model="complement" 
                    type="text" 
                    maxlength="16"
                    class="form-info-container text"
                    :class="{'form-normal-input-text': complement_is_valid}">
                <p v-if="!complement_is_valid" class="form-failed-input-text">O complemento informado é inválido.</p>
            </div>

        </div>


        <!-- Confirmação de senha -->
        <h2 class="form-h2">Confirme sua Senha</h2>
        <input 
            v-model="password" 
            placeholder="⋅⋅⋅"
            type="password" 
            class="form-info-container text"
            :class="{'form-normal-input-text': password_is_valid && !password_is_empty}">
        <p v-if="!password_is_valid" class="form-failed-input-text">A senha informada é inválida.</p>
        <p v-if="password_is_empty" class="form-failed-input-text">Este campo é obrigatório.</p>


        <!-- Botões de ação -->
        <div class="form-update-buttons-section">

            <!-- Adição -->
            <button v-if="adding_address" @click="add_address()" class="form-button standard-button">Salvar endereço</button>
            <button v-if="adding_address" @click="cancel_address_addition()" class="form-button gray-button">Cancelar</button>

            <!-- Atualização -->
            <button v-if="updating_address" @click="update_address()" class="form-button standard-button">Salvar endereço</button>
            <button v-if="updating_address" @click="delete_address()" class="form-button red-button">Remover endereço</button>
            <button v-if="updating_address" @click="cancel_address_update()" class="form-button gray-button">Cancelar</button>

        </div>

    </div>

</template>


<!-- .:::: SCRIPT ::::. -->
<script>

    // Para manipulação do banco de dados
    import store from '@/store';
    import { 
        add_delivery_address, 
        delete_delivery_address, 
        select_user_delivery_addresses, 
        update_delivery_address
    } from '@/utils/database-management';

    // Para validação de formulário
    import { 
        validate_attribute_by_regex, 
        validate_alphanumeric_attribute, 
        validate_attribute_by_callback, 
        validate_optional_alphanumeric_attribute,
        validate_password_by_id  
    } from "@/utils/form-validation.js";

    // Lógica local
    export default {

        // Nome do componente
        name: "ProfileAddresses", 

        // Dados locais
        data() {
            return {

                // Lista de estados brasileiros
                states_list: [
                    "Acre", "Alagoas", "Amapá", "Amazonas", 
                    "Bahia", "Ceará", "Distrito Federal", "Espírito Santo", 
                    "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul", 
                    "Minas Gerais", "Pará", "Paraíba", "Paraná", 
                    "Pernambuco", "Piauí", "Rio de Janeiro", "Rio Grande do Norte", 
                    "Rio Grande do Sul", "Rondônia", "Roraima", "Santa Catarina",
                    "São Paulo","Sergipe","Tocantins",
                ], 

                // Endereços de entrega
                addresses_data: [], 

                // Para controle de adição e modificação de endereços
                adding_address: false, 
                updating_address: false, 

                // Controle de título
                address_title: "", 
                address_title_is_valid: true, 
                address_title_is_empty: false, 

                // Controle de CEP
                cep: "", 
                cep_is_valid: true, 
                cep_is_empty: false, 

                // Controle de estado
                address_state: "", 
                address_state_is_valid: true, 
                address_state_is_empty: false, 

                // Controle de cidade
                city: "", 
                city_is_valid: true, 
                city_is_empty: false, 

                // Controle de bairro
                district: "", 
                district_is_valid: true, 
                district_is_empty: false, 

                // Controle de rua
                street: "", 
                street_is_valid: true, 
                street_is_empty: false, 

                // Controle de número de endereço
                number: "", 
                number_is_valid: true, 
                number_is_empty: false, 

                // Controle de complemento
                complement: "", 
                complement_is_valid: true, 
                
                // Controle de senha
                password: "", 
                password_is_valid: true, 
                password_is_empty: false, 
            };
        }, 

        // Aquisição dos dados do usuário
        created() {
            select_user_delivery_addresses(store.getters.user_id).then(res => {
                if(res != null) {
                    this.addresses_data = res;
                }
            })
        }, 

        // Métodos auxiliares
        methods: {

            // Obtém a pré-visualização de um endereço
            get_address_preview(address) {
                return address.street + ", " + address.number;
            }, 

            // Redefine os dados de formulário
            reset_address_form() {

                // Título
                this.address_title = "";
                this.address_title_is_valid = true;
                this.address_title_is_empty = false;

                // CEP
                this.cep = "";
                this.previous_cep = "";
                this.cep_is_valid = true;
                this.cep_is_empty = false;

                // Estado
                this.address_state = "";
                this.address_address_state_is_valid = true;
                this.address_address_state_is_empty = false;

                // Cidade
                this.city = "";
                this.city_is_valid = true;
                this.city_is_empty = false;

                // Bairro
                this.district = "";
                this.district_is_valid = true;
                this.district_is_empty = false; 

                // Rua
                this.street = "";
                this.street_is_valid = true;
                this.street_is_empty = false;

                // Número de endereço
                this.number = "";
                this.number_is_valid = true;
                this.number_is_empty = false;

                // Complemento
                this.complement = "";
                this.complement_is_valid = true;
                
                // Senha
                this.password = "";
                this.password_is_valid = true;
                this.password_is_empty = false;
            }, 
            
            // Inicializa a adição de um novo endereço de crédito
            start_address_addition() {
                if(this.updating_address === true){
                    this.cancel_address_update();
                }
                this.adding_address = true;
                window.scrollTo(0,60);
            }, 

            // Cancela a adição de um novo endereço de crédito
            cancel_address_addition() {
                this.adding_address = false;
                window.scrollTo(0,60);
                this.reset_address_form();
            }, 

            // Valida as informações fornecidas
            validate_address_info() {

                // Para controle do resultado
                let output = true;

                // Validação de título
                if (
                    validate_alphanumeric_attribute (
                        this, 
                        this.address_title, 
                        "address_title_is_empty", 
                        "address_title_is_valid"
                    ) === false
                ){
                    output = false;
                }

                // Validação de CEP
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

                // Validação de estado
                if (
                    validate_alphanumeric_attribute (
                        this, 
                        this.address_state, 
                        "address_state_is_empty", 
                        "address_state_is_valid"
                    ) === false
                ){
                    output = false;
                }

                // Validação de cidade
                if (
                    validate_alphanumeric_attribute (
                        this, 
                        this.city, 
                        "city_is_empty", 
                        "city_is_valid"
                    ) === false
                ){
                    output = false;
                }

                // Validação de bairro
                if (
                    validate_alphanumeric_attribute (
                        this, 
                        this.district, 
                        "district_is_empty", 
                        "district_is_valid"
                    ) === false
                ){
                    output = false;
                }

                // Validação de rua
                if (
                    validate_alphanumeric_attribute (
                        this, 
                        this.street, 
                        "street_is_empty", 
                        "street_is_valid"
                    ) === false
                ){
                    output = false;
                }

                // Validação de número
                if (
                    validate_attribute_by_regex (
                        this, 
                        this.number, 
                        new RegExp("^[0-9]+$", "g"), 
                        "number_is_empty", 
                        "number_is_valid"
                    ) === false
                ){
                    output = false;
                }

                // Validação de complemento (opcional)
                if (
                    validate_optional_alphanumeric_attribute (
                        this, 
                        this.complement, 
                        "complement_is_valid"
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


            // Valida as informações e a senha do usuário
            validate_address_info_and_password: async function() {

                // Para controle da saída
                let output = true;

                // Validação das informações e da senha
                if(this.validate_address_info() === true) {
                    try{
                        await validate_password_by_id(store.getters.user_id, this.password).then(res => {
                            if(res === true){
                                this.password_is_valid = true;
                            }else{
                                this.password_is_valid = false;
                                output = false;
                            }
                        });
                    }catch(e){
                        alert(e);
                        output = false;
                    }
                }else{
                    output = false;
                }

                return output;
            }, 


            // Adiciona um novo endereço
            add_address: async function() {
                
                // Validação dos dados e da senha
                this.validate_address_info_and_password().then(res => {
                    if(res === true){

                        // Cria o novo endereço de entrega
                        let delivery_address = {
                            user: store.getters.user_id, 
                            zip: this.cep, 
                            title: this.address_title, 
                            state: this.address_state, 
                            city: this.city, 
                            district: this.district, 
                            street: this.street, 
                            number: this.number, 
                            complement: this.complement, 
                        };

                        // Adição do novo endereço
                        add_delivery_address(delivery_address);

                        // Atualização dos dados da página
                        this.addresses_data.push(delivery_address);
                        this.cancel_address_addition();

                        // Avisa o usuário
                        alert("Novo endereço de entrega cadastrado com sucesso.");
                    }
                });
            }, 

            // Inicializa a modificação de um endereço pré-existente
            start_address_update(address) {

                // Verifica se está adicionando um endereço
                if(this.adding_address === true){
                    this.cancel_address_addition();
                }

                // Obtenção dos dados do endereço alvo
                this.previous_cep = address.zip;
                this.cep = address.zip;
                this.address_title = address.title;
                this.address_state = address.state;
                this.city = address.city;
                this.district = address.district;
                this.street = address.street;
                this.number = address.number;
                this.complement = address.complement;

                // Atualização da página
                this.updating_address = true;
                window.scrollTo(0,60);
            }, 

            // Cancela a modificação de um endereço pré-existente
            cancel_address_update() {
                this.updating_address = false;
                window.scrollTo(0,60);
                this.reset_address_form();
            }, 

            // Atualiza um endereço pré-existente
            update_address: async function() {

                // Validação dos dados e da senha
                this.validate_address_info_and_password().then(res => {
                    if(res === true){

                        // Cria o novo endereço de entrega
                        let delivery_address = {
                            user: store.getters.user_id, 
                            zip: this.cep, 
                            title: this.address_title, 
                            state: this.address_state, 
                            city: this.city, 
                            district: this.district, 
                            street: this.street, 
                            number: this.number, 
                            complement: this.complement, 
                        };

                        // Atualização do endereço
                        update_delivery_address(this.previous_cep, delivery_address);

                        // Atualização dos dados da página
                        let address_index = this.addresses_data.findIndex(element => {
                            return (
                                element.user === delivery_address.user &&
                                element.zip === this.previous_cep
                            );
                        });
                        if(address_index >= 0){
                            this.addresses_data[address_index] = delivery_address;
                        }
                        this.cancel_address_update();

                        // Avisa o usuário
                        alert("Endereço de entrega atualizado com sucesso.");
                    }
                });
            }, 

            // Remove um endereço de crédito pré-existente
            delete_address: async function() {

                // ID do usuário
                const user_id = store.getters.user_id;

                // Validação senha
                validate_password_by_id(user_id, this.password).then(res => {
                    if(res === true){

                        // Remoção do endereço
                        delete_delivery_address(user_id, this.previous_cep);

                        // Atualização dos dados da página
                        let address_index = this.addresses_data.findIndex(element => {
                            return (
                                element.user === user_id &&
                                element.zip === this.previous_cep
                            );
                        });
                        if(address_index >= 0){
                            this.addresses_data.splice(address_index, 1);
                        }
                        this.cancel_address_update();

                        // Avisa o usuário
                        alert("Endereço de entrega removido com sucesso.");
                    }
                });
            }, 
        }, 
    }

</script>


<!-- .:::: STYLE ::::. -->
<style>
    @import "../css/profile-form.css";
</style>