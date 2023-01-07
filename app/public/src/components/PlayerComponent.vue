<!-- .:::: TEMPLATE ::::. -->
<template>
    <div id="player-displayer-container">
        <p class="player-info player-name" type="text">{{player.name}}</p>
        <img :src="require(`@/assets/players/${player.filename}`)" class="player-icon" :style="css_variables">
        <div id="player-displayer-cash-container">
            <img src="@/assets/icons/blue-dollar-alt.svg">
            <p>{{player.balance.toLocaleString("br")}}</p>
        </div>
    </div>
</template>


<!-- .:::: SCRIPT ::::. -->
<script>

    // Compartilhamento de estados
    import store from '@/store';

    // Jogador vazio
    import { get_dummy_player } from '@/utils/utils';

    // Lógica local
    export default {

        // Nome do componente
        name: 'PlayerDisplayerComponent', 

        // Dados do jogador
        data() { 
            return {
                player: get_dummy_player(), 
            };
        }, 

        // ID do jogador
        props: {
            player_id: {default: 0},
        }, 

        // Seleção inicial do jogador
        mounted() {
            this.player = store.getters.players[this.player_id];
        }, 

        // Atributos computados
        computed: {

            // Para automação do filtro CSS
            css_variables() {
                return {
                    '--hue-rotation': this.player.hue + 'deg'
                };
            }, 
        },
    }
</script>


<!-- .:::: STYLE ::::. -->
<style>
    @import "../css/colors.css";

    /* Contêiner */
    #player-displayer-container {
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

    /* Seletor */
    #player-displayer-container .player-info {

        width: 85%;
        height: auto;

        margin-top: 2%;
        padding: 0.5rem 1rem;

        text-align: center;
        font-size: 1.8rem;

        color: var(--main-blue);
        background-color: var(--deepest-blue);
    }
    #player-displayer-container .player-name {
        font-weight: bold;
        border-radius: 8px;
        border: 2px solid var(--main-blue);
        margin-bottom: 1rem;
    }
    @media (orientation: portrait) {
        #player-displayer-container .player-info {
            font-size: 1.2rem;
        }   
    }


    /* Imagem */
    #player-displayer-container .player-icon {
        width: 60%;
        height: auto;
        padding: 1rem;

        /* Filtro automatizado */
        filter: hue-rotate(var(--hue-rotation));
    }


    /* Dinheiro */
    #player-displayer-cash-container {
        margin-top: 4%;
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
    }
    #player-displayer-cash-container img {
        height: 2.5rem;
        width: 2.5rem;
    }
    #player-displayer-cash-container p {
        padding: 0.5rem 0;
        width: 75%;
        font-size: 1.8rem;
        font-weight: bold;
        text-align: center;
        color: var(--main-blue);
        border: 4px inset var(--main-blue);
    }
    @media (orientation: portrait) {
        #player-displayer-cash-container img {
            height: 1.9rem;
            width: 1.9rem;
        }
        #player-displayer-cash-container p {
            font-size: 1.2rem;
        }
    }
    

</style>