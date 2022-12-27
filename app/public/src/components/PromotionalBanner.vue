<!-- .:::: TEMPLATE ::::. -->
<template>
    <div class="promotional-banner">
        <div class="promotional-banner-text-container">
            <h2 class="promotional-banner-text"> BANNER </h2>
        </div>
    </div>
</template>


<!-- .:::: SCRIPT ::::. -->
<script>
    export default {
        name: 'PromotionalBanner',
    }
</script>


<!-- .:::: STYLE ::::. -->
<style>
    @import "../css/global-style.css";

    /* Contêiner do banner */
    .promotional-banner {
        width: 100%;
        height: 48vh;
        background-color: lightblue;
    }

    /* Contém o título de demonstração */
    .promotional-banner-text-container {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }

    /* Título de demonstração */
    .promotional-banner-text {
        font-size: 12vh;
        color: rgb(140, 140, 140);
        justify-content: center;
        margin-left: 39%;
    }

    /* Imagem do banner */
    .promotional-banner-img {
        width: 100%;
        height: 100%;
    }
</style>