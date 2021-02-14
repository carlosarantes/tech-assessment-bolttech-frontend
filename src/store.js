import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
      auth : {
          email: null,
          password: null,
          jwt: null,
          logged : false,
          authErros : [ ]
      }
    },
    getters:{
        authEmail(state) {
            return state.auth.email;
        },
        authPassword(state) {
            return state.auth.password;
        },
        authErrors(state){
            return state.auth.authErros;
        }
    },
    actions:{
        async login({ state }) {
            try {
                const result = await axios.post('http://localhost:3338/api/v1/users', { 
                    email : state.auth.email,
                    password : state.auth.password
                });

                console.log(result);
            } catch (e) {
                console.log(e)
            }
        },
        register() {

        }
    },
    mutations: {
        setAuthEmail(state, email) {
            state.auth.email = email;
        },
        setAuthPassword(state, password) {
            state.auth.password = password;
        }
    }
});