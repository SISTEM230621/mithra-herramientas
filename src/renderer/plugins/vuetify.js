import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#97a3ae',
                pantone: '#c7893e',
                'pantone-dark': '#986029',
                success: '#38c172',
                warning: '#ffc107',
                error: '#dc3545',
                info: '#17a2b8',
                // accent: '#86BBD8',
                secondary: '#6c757d',
                dark: '#2c2c2c'
            },
        },
    },
});
