<template>
  <div style="margin-top:12%">
      <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100" style="margin-left:25%">
        <md-card-header>
          <div class="md-title">Registrar Cliente</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('firstName')">
                <label for="first-name">Nombre</label>
                <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.firstName" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.firstName.required">El nombre es Requerido</span>
                <span class="md-error" v-else-if="!$v.form.firstName.minlength">Nombre Invalido</span>
                <span class="md-error" v-else-if="!$v.form.firstName.alpha">Nombre Invalido</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('lastName')">
                <label for="last-name">Apellido</label>
                <md-input name="last-name" id="last-name" autocomplete="family-name" v-model="form.lastName" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.lastName.required">El apellido es Requerido</span>
                <span class="md-error" v-else-if="!$v.form.lastName.minlength">Apellido Invalido</span>
                <span class="md-error" v-else-if="!$v.form.lastName.alpha">Apellido Invalido</span>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('cedula')">
                <label for="cedula">Cedula</label>
                <md-input type="number" id="cedula" name="cedula" autocomplete="cedula" v-model="form.cedula" :disabled="sending" />
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

            <md-field :class="getValidationClass('email')">
                <label for="email">Email</label>
                <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.email.required">El email es Requerido</span>
                <span class="md-error" v-else-if="!$v.form.email.email">Email Invalido</span>
            </md-field>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-raised md-primary" :disabled="sending">Crear Cliente</md-button>
        </md-card-actions>
      </md-card>
      <md-snackbar :md-active.sync="userSaved">El cliente se ha guardado correctamente!</md-snackbar>
      <md-snackbar :md-active.sync="error">{{message}}</md-snackbar>
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
    alpha,
    maxLength
  } from 'vuelidate/lib/validators'
export default {
    name: 'client',
    mixins: [validationMixin],
    data: () => ({
      form: {
        firstName: null,
        lastName: null,
        cedula: null,
        phone: null,
        email: null,
      },
      userSaved: false,
      sending: false,
      error: false,
      message: '',
      lastUser: null
    }),
    validations: {
      form: {
        firstName: {
          alpha,
          required,
          minLength: minLength(3)
        },
        lastName: {
          alpha,
          required,
          minLength: minLength(3)
        },
        cedula: {
          required,
          integer,
          maxLength: minLength(3)
        },
        phone: {
          required,
          integer
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
        this.form.firstName = null
        this.form.lastName = null
        this.form.cedula = null
        this.form.phone = null
        this.form.email = null
      },
      saveUser () {
        this.sending = true
        
        let data = {
            nombres:`${this.form.firstName} ${this.form.lastName}`,
            cedula:this.form.cedula,
            email:this.form.email,
            celular:this.form.phone
        }
        this.$axios.post('http://localhost:3000/client',data)
        .then((response) => {
            console.log(response);
            let error = response.data.error;
            if(error){
                Swal.fire('Ups...', response.data.message, 'error')
            }else{
                Swal.fire('Cliente Registrado!', response.data.data, 'success')
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
      validateUser () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.saveUser()
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
