<template>
  <div style="margin-top:12%">
      <form novalidate class="md-layout" style="margin-bottom:60px" @submit.prevent="validateCode">
        <md-card class="md-layout-item md-size-50 md-small-size-100" style="margin-left:25%">
          <md-card-header>
            <div class="md-title">Verificar Codigo</div>
          </md-card-header>

          <md-card-content>
            <md-field :class="getValidationClass('code')">
              <label for="cedula">Codigo</label>
              <md-input type="text" id="code" name="code" autocomplete="code" v-model="form.code" :disabled="sending" />
              <span class="md-error" v-if="!$v.form.code.required">El codigo es Requerido</span>
            </md-field>
          </md-card-content>
          <input type="hidden" name="session" v-model="session">

          <md-progress-bar md-mode="indeterminate" v-if="sending" />

          <md-card-actions>
            <md-button type="submit" class="md-raised md-primary" :disabled="sending">Verificar codigo</md-button>
          </md-card-actions>
        </md-card>
      </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import Swal from 'sweetalert2';
import {
    required,
    email,
    minLength,
    maxLength
  } from 'vuelidate/lib/validators'
export default {
    name: 'verify',
    mixins: [validationMixin],
    data: () => ({
      form: {
        code: null
      },
      session:null,
      sending: false,
      balance: null
    }),
    validations: {
      form: {
        code: {
          required
        }
      }
    },
    mounted(){
      this.session= this.$route.params.session;
    },
    methods: {
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset()
        this.form.code = null
      },
      consultBalance() {
        this.sending = true
        
        let data = {
            token:this.form.code,
            session_id:this.session
        }
        this.$axios.post('http://localhost:3000/confirm-payment',data)
        .then((response) => {
            console.log(response);
            let error = response.data.error;
            if(error){
                Swal.fire('Ups...', response.data.message, 'error')
            }else{
              Swal.fire('Pago Verificado', response.data.data, 'success').then(()=>{
                this.$router.push({name: 'home'}); 
              })
            }
            this.sending = false;
            this.clearForm();
        })
        .catch((error) => {
            console.log(error.response);
            Swal.fire('Ups...', error.response.data.message, 'error')
            this.sending = false;
        });
      },
      validateCode () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.consultBalance()
        }
      }
    }
  }
</script>

<style>
.md-card-media.md-ratio-1-1 img{
    top:30% !important;
}
.swal-height {
  height: 30vh;
}

.md-table-head{ text-align: center !important; }
</style>
