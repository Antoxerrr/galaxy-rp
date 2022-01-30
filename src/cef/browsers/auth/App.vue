<template>
  <v-app>
    <v-container class="fill-height">
      <v-row
          align="center"
          justify="center"
      >
        <v-col
            cols="12"
            sm="8"
            md="5"
        >
          <v-card
              id="auth-block"
              class="pa-3 rounded"
              tile
              outlined
          >
            <v-card-subtitle class="text-sm-center auth-card-subtitle">
              GALAXY RP
            </v-card-subtitle>
            <v-card-text>
              <v-form @submit.prevent="login">
                <v-text-field
                    class="auth-text-field"
                    label="Имя пользователя"
                    name="username"
                    v-model="username"
                    type="text"
                    outlined
                ></v-text-field>

                <v-text-field
                    class="auth-text-field"
                    id="password"
                    v-model="password"
                    label="Пароль"
                    name="password"
                    type="password"
                    hint="Минимум 8 символов"
                    outlined
                ></v-text-field>
                <v-btn
                    class="auth-button"
                    color="primary"
                    type="submit"
                    depressed
                    block
                >Войти</v-btn>
                <v-layout justify-center align-center v-if="wrongCredentials">
                  <p class="mt-5 error--text">Неверный логин или пароль</p>
                </v-layout>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  methods: {
    login() {
      mp.trigger('loginData', this.username, this.password);
    },
    error() {
      this.wrongCredentials = true;
    }
  },
  data() {
    return {
      username: '',
      password: '',
      wrongCredentials: false
    }
  }
};
</script>

<style>
@import "../common/css/default.css";
body {
  background: #66b3ee;
}
</style>