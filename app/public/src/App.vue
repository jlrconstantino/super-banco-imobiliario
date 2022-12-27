<!-- .:::: TEMPLATE ::::. -->
<template>

  <!-- HEADER -->
  <HeaderComponent></HeaderComponent>

  <!-- PÁGINA PRINCIPAL -->
  <div id="main-container">
    <NavBar></NavBar>
    <router-view></router-view>
  </div>

  <!-- FOOTER -->
  <FooterComponent></FooterComponent>

</template>


<!-- .:::: SCRIPT ::::. -->
<script>

  // Importação dos componentes
  import HeaderComponent from './components/HeaderComponent.vue'
  import NavBar from './components/NavBar.vue'
  import FooterComponent from './components/FooterComponent.vue'

  // Lógica local
  export default {

    // Componentes
    components: {
      HeaderComponent, 
      NavBar, 
      FooterComponent, 
    }

  }
  
</script>


<!-- .:::: STYLE ::::. -->
<style>
  @import "./css/reset.css";
  @import "./css/global-style.css";
</style>
