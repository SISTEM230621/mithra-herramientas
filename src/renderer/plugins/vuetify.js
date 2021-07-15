import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#0B3954',
                success: '#20BF55',
                warning: '#E3B505',
                error: '#FF5A5F',
                info: '#01BAEF',
                accent: '#86BBD8',
                secondary: '#56758A',
            },
        },
    },
});
