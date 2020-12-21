<template>
  <div style="margin-top:12%">
      <form novalidate class="md-layout" @submit.prevent="validatePayment">
      <md-card class="md-layout-item md-size-50 md-small-size-100" style="margin-left:25%">
        <md-card-header>
          <div class="md-title">Realizar Pago</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('cedula')">
                <label for="cedula">Cedula</label>
                <md-input id="cedula" name="cedula" autocomplete="cedula" v-model="form.cedula" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.cedula.required">La cedula es Requerida</span>
                <span class="md-error" v-else-if="!$v.form.cedula.maxlength">Cedula Invalida</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('phone')">
                    <label for="mount">Monto</label>
                    <md-input type="number" name="mount" id="mount" v-model="form.mount" :disabled="sending" />
                    <span class="md-error" v-if="!$v.form.mount.required">El monto es Requerido</span>
                </md-field>
            </div>
          </div>

            <md-field :class="getValidationClass('email')">
                <label for="email">Email</label>
                <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.email.required">El email es Requerido</span>
                <span class="md-error" v-else-if="!$v.form.email.email">Email Invalido</span>
            </md-field>

            <md-field :class="getValidationClass('descripcion')">
                <label for="descripcion">Descripcion</label>
                <md-input type="descripcion" name="descripcion" id="descripcion" autocomplete="descripcion" v-model="form.descripcion" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.descripcion.required">La descripcion es Requerido</span>
                <span class="md-error" v-else-if="!$v.form.descripcion.descripcion">descripcion Invalida</span>
            </md-field>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-raised md-primary" :disabled="sending">Realizar Pago</md-button>
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
    numeric,
    integer,
    maxLength
  } from 'vuelidate/lib/validators'
export default {
    name: 'client',
    mixins: [validationMixin],
    data: () => ({
      form: {
        mount: null,
        cedula: null,
        descripcion: null,
        email: null,
      },
      sending: false
    }),
    validations: {
      form: {
        mount: {
          required,
          numeric
        },
        cedula: {
          required,
          maxLength: minLength(3),
          integer
        },
        descripcion: {
          required
        },
        email: {
          required,
          email
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
        this.form.mount = null
        this.form.cedula = null
        this.form.descripcion = null
        this.form.email = null
      },
      pay() {
        this.sending = true
        
        let data = {
            descripcion:this.form.descripcion,
            cedula:this.form.cedula,
            email:this.form.email,
            monto:this.form.mount
        }
        this.$axios.post('http://localhost:3000/pay',data)
        .then((response) => {
            console.log(response);
            let error = response.data.error;
            if(error){
                Swal.fire('Ups...', response.data.message, 'error')
            }else{
                Swal.fire('Proceso de Verificacion', response.data.data, 'success').then(()=>{
                  this.$router.push({name: 'home'})
                })
            }
            this.sending = false;
            this.clearForm();
        })
        .catch((error) => {
            console.log(error.response);
            Swal.fire('Ups...', error.response.data.message, 'error')
            this.sending = false;
            this.message = error.message;
        });
      },
      validatePayment () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.pay()
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
</style>
