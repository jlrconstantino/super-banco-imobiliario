<!-- .:::: TEMPLATE ::::. -->
<template>

  <!-- HEADER -->
  <!-- <HeaderComponent></HeaderComponent> -->

  <!-- PÁGINA PRINCIPAL -->
  <div id="main-container" :class="{ 'main-container-margin' : display_margin }">
    <router-view></router-view>
  </div>

</template>


<!-- .:::: SCRIPT ::::. -->
<script>

  // Importação dos componentes
  // import HeaderComponent from './components/HeaderComponent.vue'

  // Lógica local
  export default {

    // Componentes
    /*
    components: {
      HeaderComponent, 
    },
    */

    // Apresentação de margem
    computed: {
      display_margin() {
        return this.$route.name != "bank";
      }, 
    }
  }
  
</script>


<!-- .:::: STYLE ::::. -->
<style>
  @import "./css/reset.css";
  @import "./css/global-style.css";
</style>
