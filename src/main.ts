import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import {createStream} from "@/pixelstreaming";

createStream()
createApp(App).mount('#app')
