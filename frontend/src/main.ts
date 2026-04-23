import L from 'leaflet'
(window as any).L = L
import App from './App.vue'
import router from './router'
import './css/main.less'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import { createApp } from 'vue'


const app = createApp(App)

app.use(router)

app.mount('#app')
