import { createApp } from 'vue'
import App from './App.vue'


// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                colors: {
                    primary: '#3f51b5',
                    secondary: '#b0bec5',
                    accent: '#8c9eff',
                    error: '#b71c1c',
                    background: '#ffffff',  // You can specify other color properties here as needed
                    // ... other color properties
                },
                dark: false
            },
            dark: {
                colors: {
                    primary: '#3f51b5',
                    secondary: '#b0bec5',
                    accent: '#8c9eff',
                    error: '#b71c1c',
                    background: '#424242',  // You can specify other color properties here as needed
                    // ... other color properties
                },
                dark: true
            }
        }
    }
});

createApp(App)
.use(vuetify)
.mount('#app')