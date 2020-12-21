<template>
    <md-tabs class="md-transparent" md-alignment="fixed">
      <md-tab to="/" md-label="Inicio"></md-tab>
      <md-tab to="/client" md-label="Crear cliente"></md-tab>
      <md-tab to="/balance" md-label="Consultar saldo"></md-tab>
      <md-tab to="/recharge" md-label="Realizar Recarga"></md-tab>
      <md-tab to="/pay" md-label="Realizar pago"></md-tab>
    </md-tabs>
</template>

<script>
export default {
  name: 'navbar',
  data () {
    return {}
  },
  methods:{
    isPath (path) {
      return this.$route.path === path
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding: 0 10%;
  color: #2c3e50;
}

.md-button-content{
  color: white !important;
  font-weight: bold;
}

.md-button.md-active{
  color: white !important;
}

body{
  background-color: rgb(37, 37, 37);
  background-repeat: no-repeat;
  background-size: 100%;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
