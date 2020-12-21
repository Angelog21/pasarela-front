<template>
  <div style="margin-top:12%">
    <div class="md-layout md-gutter">
        <div class="md-layout-item">
            <md-card>
                <md-card-media-cover md-solid>
                    <md-card-media md-ratio="1:1">
                    <img src="../assets/img/cliente.jpg" alt="Skyscraper">
                    </md-card-media>

                    <md-card-area>
                    <md-card-header>
                        <span class="md-title">Crear Cliente</span>
                    </md-card-header>

                    <md-card-actions>
                        <md-button class="md-fab md-primary" @click="toClient()">
                            <i class="fa fa-link"></i>
                        </md-button>
                    </md-card-actions>
                    </md-card-area>
                </md-card-media-cover>
            </md-card>
        </div>
        <div class="md-layout-item">
            <md-card>
                <md-card-media-cover md-solid>
                    <md-card-media md-ratio="1:1">
                    <img src="../assets/img/consultar.jpg" alt="Skyscraper">
                    </md-card-media>

                    <md-card-area>
                    <md-card-header>
                        <span class="md-title">Consultar saldo</span>
                    </md-card-header>

                    <md-card-actions>
                        <md-button class="md-fab md-primary" @click="toConsult()">
                            <i class="fa fa-link"></i>
                        </md-button>
                    </md-card-actions>
                    </md-card-area>
                </md-card-media-cover>
            </md-card>
        </div>
        <div class="md-layout-item">
            <md-card>
                <md-card-media-cover md-solid>
                    <md-card-media md-ratio="1:1">
                    <img src="../assets/img/cliente.jpg" alt="Skyscraper">
                    </md-card-media>

                    <md-card-area>
                    <md-card-header>
                        <span class="md-title">Realizar Recarga</span>
                    </md-card-header>

                    <md-card-actions>
                        <md-button class="md-fab md-primary" @click="toRecharge()">
                            <i class="fa fa-link"></i>
                        </md-button>
                    </md-card-actions>
                    </md-card-area>
                </md-card-media-cover>
            </md-card>
        </div>
        <div class="md-layout-item">
            <md-card>
                <md-card-media-cover md-solid>
                    <md-card-media md-ratio="1:1">
                    <img src="../assets/img/pagar.jpg" alt="Skyscraper">
                    </md-card-media>

                    <md-card-area>
                    <md-card-header>
                        <span class="md-title">Realizar Pago</span>
                    </md-card-header>

                    <md-card-actions>
                        <md-button class="md-fab md-primary" @click="toPay()">
                            <i class="fa fa-link"></i>
                        </md-button>
                    </md-card-actions>
                    </md-card-area>
                </md-card-media-cover>
            </md-card>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
      toClient(){
        this.$router.push({name: 'client'}); 
      },
      toConsult(){
          this.$router.push({name: 'balance'}); 
      },
      toRecharge(){
          this.$router.push({name: 'recharge'}); 
      },
      toPay(){
          this.$router.push({name: 'pay'}); 
      }
  }
}
</script>

<style>
.md-card-media.md-ratio-1-1 img{
    top:30% !important;
}
</style>
