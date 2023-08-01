<template>
  <v-app>
    <v-main>
      <v-container class="fill-height">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="6">
            <v-card>
              <v-card-title class="headline">Login</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="submitForm">
                  <v-text-field
                      v-model="state.email"
                      label="Email"
                      type="email"
                      required
                  ></v-text-field>
                  <div class="input-errors">
                    <div class="error-msg" v-for="error in v$.email.$errors" :key="error.$uid">{{ error.$message }}</div>
                  </div>

                  <v-text-field
                      v-model="state.password"
                      label="Password"
                      type="password"
                      required
                  ></v-text-field>
                  <div class="input-errors">
                    <div class="error-msg" v-for="error in v$.password.$errors" :key="error.$uid">{{ error.$message }}</div>
                  </div>
                  <v-btn color="primary" type="submit">Login</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';
import router from "@/router";

export default {
  setup() {
    const state = ref({
      email: '',
      password: '',
    });

    const rules = {
      email: { required, email },
      password: { required, minLength: minLength(6) },
    };

    const v$ = useVuelidate(rules, state);

    const submitForm = async () => {
      const result = await v$.value.$validate();
      if (result) {
        await router.push('/game')
      } else {
        console.log('Please fill in all fields correctly.');
      }
    };

    return {
      state,
      v$,
      submitForm,
    };
  },
};
</script>

