<!-- .:::: TEMPLATE ::::. -->
<template>

    <!-- Contêiner geral -->
    <div id="player-selector-container">

        <!-- Modo paisagem -->
        <template v-if="is_landscape">
            <select name="Selecionar jogador" v-model="player" class="button">
                <option v-for="elem in players" :key="elem" :value="elem">{{elem.name}}</option>
            </select>
            <img :src="require(`@/assets/players/${player.filename}`)" class="player-icon">
            <div class="secondary-container">
                <img class="dollar-icon" src="@/assets/icons/blue-dollar-alt.svg">
                <p>
                    <animated-number :number="player.balance"></animated-number>
                </p>
            </div>
        </template>

        <!-- Modo retrato -->
        <template v-if="!is_landscape">
            <div class="portrait-container">
                <select name="Selecionar jogador" v-model="player" class="button">
                    <option v-for="elem in players" :key="elem" :value="elem">{{elem.name}}</option>
                </select>
                <div class="secondary-container">
                    <img class="dollar-icon" src="@/assets/icons/blue-dollar-alt.svg">
                    <p>
                        <animated-number :number="player.balance"></animated-number>
                    </p>
                </div>
            </div>
            <div class="player-icon-container">
                <img :src="require(`@/assets/players/${player.filename}`)" class="player-icon">
            </div>
        </template>

    </div>
</template>


<!-- .:::: SCRIPT ::::. -->
<script>

    // Compartilhamento de estados
    import store from '@/store';

    // Jogador vazio
    import { get_dummy_player } from '@/utils/utils';

    // Animador numérico
    import NumberAnimatorComponentVue from './NumberAnimatorComponent.vue';

    // Lógica local
    export default {

        // Nome do componente
        name: 'PlayerSelectorComponent', 
        components: {'animated-number': NumberAnimatorComponentVue},

        // Atributos computados
        computed: {

            // Jogadores
            players() {
                return store.getters.active_players;
            },

            // Detecção de orientação da tela
            is_landscape() {
                return screen.orientation.type[0] === 'l';
            },
        },

        // Dados locais
        data() { 
            return {
                player: get_dummy_player(), 
            };
        }, 

        // Atributos externos
        props: {
            keyname: String,
        }, 

        // Seleção inicial do jogador
        mounted() {
            let id = store.getters.saved_ids[this.keyname];
            this.player = store.getters.players[id];
            this.on_player_select();
        }, 

        // Atualização do jogador (aviso externo)
        methods: {
            on_player_select() {
                this.$emit("change", this.player.id);
            },
        }, 

        // Atualizações de jogador
        watch: {
            player() {
                this.on_player_select();
            }, 
        },
    }
</script>


<!-- .:::: STYLE ::::. -->
<style>
    @import "../css/colors.css";

    /* Contêiner */
    #player-selector-container {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 2px solid var(--main-blue);
        background-color: var(--deepest-blue);
        padding: 1rem;
        border-radius: 8px;
    }
    @media (orientation: portrait) {
        #player-selector-container {
            flex-direction: row;
        }   
    }

    /* Adaptações adicionais para dispositivos móveis */
    #player-selector-container .portrait-container {
        width: 75%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    /* Seletor */
    #player-selector-container select {
        width: 90%;
        height: auto;
        margin-bottom: 1rem;
        text-align: center;
        font-size: 1.8rem;
    }
    @media (orientation: portrait) {
        #player-selector-container select {
            font-size: 1.2rem;
        }   
    }

    /* Imagem */
    #player-selector-container .player-icon-container {
        width: 25%;
        border: 2px solid var(--main-blue);
        height: auto;
        padding: 1rem;
    }
    #player-selector-container .player-icon {
        width: 60%;
        height: auto;
        padding: 1rem;
        filter: saturate(200%) hue-rotate(180deg);
    }
    @media (orientation: portrait) {
        #player-selector-container .player-icon {
            width: 100%;
            padding: 0;
        }   
    }

    /* Saldo */
    #player-selector-container .secondary-container {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    #player-selector-container p {
        width: 75%;
        height: auto;
        font-weight: bold;
        justify-content: center;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        font-size: 1.8rem;
        text-align: center;
        color: var(--main-blue);
        border: 2px solid var(--main-blue);
    }
    #player-selector-container .dollar-icon {
        width: auto;
        height: 2.5rem;
    }
    @media (orientation: portrait) {
        #player-selector-container p {
            width: 55%;
            font-size: 1.2rem;
        }
        #player-selector-container .dollar-icon {
            height: 2rem;
        }
    }

</style>