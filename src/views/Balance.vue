<template>
  <div style="margin-top:12%">
      <form novalidate class="md-layout" style="margin-bottom:60px" @submit.prevent="validateBalance">
        <md-card class="md-layout-item md-size-50 md-small-size-100" style="margin-left:25%">
          <md-card-header>
            <div class="md-title">Consultar Saldo</div>
          </md-card-header>

          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('cedula')">
                  <label for="cedula">Cedula</label>
                  <md-input type="text" id="cedula" name="cedula" autocomplete="cedula" v-model="form.cedula" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.cedula.required">La cedula es Requerida</span>
                  <span class="md-error" v-else-if="!$v.form.cedula.maxlength">Cedula Invalida</span>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('phone')">
                      <label for="phone">Telefono</label>
                      <md-input name="phone" id="phone" autocomplete="family-name" v-model="form.phone" :disabled="sending" />
                      <span class="md-error" v-if="!$v.form.phone.required">El telefono es Requerido</span>
                  </md-field>
              </div>
            </div>
          </md-card-content>

          <md-progress-bar md-mode="indeterminate" v-if="sending" />

          <md-card-actions>
            <md-button type="submit" class="md-raised md-primary" :disabled="sending">Consultar Saldo</md-button>
          </md-card-actions>
        </md-card>
      </form>
      <md-table v-if="balance">
        <md-table-row>
          <md-table-head>Cedula</md-table-head>
          <md-table-head>Nombres</md-table-head>
          <md-table-head>Email</md-table-head>
          <md-table-head>Telefono</md-table-head>
          <md-table-head>Saldo</md-table-head>
        </md-table-row>

        <md-table-row>
          <md-table-cell>{{balance.cedula}}</md-table-cell>
          <md-table-cell>{{balance.nombres}}</md-table-cell>
          <md-table-cell>{{balance.email}}</md-table-cell>
          <md-table-cell>{{balance.telefono}}</md-table-cell>
          <md-table-cell>{{balance.wallet.saldo}} $</md-table-cell>
        </md-table-row>
      </md-table>
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
    name: 'balance',
    mixins: [validationMixin],
    data: () => ({
      form: {
        cedula: null,
        phone: null,
      },
      sending: false,
      balance: null
    }),
    validations: {
      form: {
        cedula: {
          required,
          maxLength: minLength(3)
        },
        phone: {
          required
        }
      }
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
        this.form.cedula = null
        this.form.phone = null
      },
      consultBalance() {
        this.sending = true
        this.balance = null;
        
        // Instead of this timeout, here you can call your API
        let data = {
            cedula:this.form.cedula,
            celular:this.form.phone
        }
        this.$axios.post('http://localhost:3000/balance',data)
        .then((response) => {
            console.log(response);
            let error = response.data.error;
            if(error){
                Swal.fire('Ups...', response.data.message, 'error')
            }else{
              this.balance = response.data.data[0];
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
      validateBalance () {
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
