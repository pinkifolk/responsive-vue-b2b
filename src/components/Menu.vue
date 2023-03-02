<template>
  <div>
    <v-app-bar 
    app
    color="white"
    >
        <v-app-bar-nav-icon @click="scrollTop"></v-app-bar-nav-icon>

          <v-toolbar-title @click="inicio" style="cursor: pointer">B2B Provaltec</v-toolbar-title>  

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon @click="salir">mdi-login</v-icon>
          </v-btn>
    </v-app-bar>
    <v-navigation-drawer
          v-model="drawer"
          absolute
          width="300"
          height="100vh"
          temporary          
          dark
    >
    <div v-for="data in getUserData" :key="data.index">
      <v-layout mt-4 column align-center>
        <v-flex>
          <v-avatar>
            <v-icon size="48">mdi-account-circle</v-icon>
          </v-avatar>
        </v-flex>
        <v-flex >
          <p class="mt-1 white--text">{{data.nombre+' ' + data.apellido}}</p>        
        </v-flex>      
        </v-layout>
        <v-layout align-center>
          <v-flex>
            <p class="ml-5 mb-0 white--text caption">Ejecutivo: {{data.vendedor}} </p>
            <p class="ml-5 mb-2 white--text caption">Descuento: {{data.descuento}}% </p>
        </v-flex>
      </v-layout>
      </div>
      <v-divider></v-divider>
      <v-list>
        <!-- menu Valvulas Industriales -->
        <v-list-group
        v-for="item in menu" :key="item.id">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </template>
        <v-list-group  v-for="child in item.menu"
            :key="child.title"
            no-action
            sub-group
            :prepend-icon="child.sub">
          <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="child.title"></v-list-item-title>
              </v-list-item-content>            
            </template>
            <v-list-item
            v-for="sub in child.menu" :key="sub.title">
            <v-list-item-content>
              <router-link :to="{name:'productos', params:{id:sub.id}}" style="text-decoration:none" >
                <v-list-item-title v-text="sub.title"></v-list-item-title>
              </router-link>
            </v-list-item-content>
          </v-list-item>
          </v-list-group>
        </v-list-group>
        <!-- Menu secundario -->
         <v-list-group
        v-for="item in menuSecondary"
        :key="item.title"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in item.menu"
          :key="child.title"
        >
          <v-list-item-content>
              <router-link :to="{name:'productos', params:{id:child.id}}" style="text-decoration:none">
                <v-list-item-title v-text="child.title" class="white--text"></v-list-item-title>
              </router-link>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      </v-list>
  </v-navigation-drawer>
</div>
</template>

<script>
import axios from 'axios';
export default {
     data: () => ({
        drawer: false, // no mostrar el menu lateral, true para mostrar
        menu: [
              {
                  id: 1,
                  title: "Valvulas Industriales",
                  menu: [
                      { title: "Valvula Aguja", 
                        menu: [
                              { id:3,title: "Aguja Hilo NPT" }
                          ] },
                      { title: "Alivio y Seguridad", 
                        menu: [
                              { id:4,title: "Alivio Hilo NPT y BSP" },
                              { id:5,title: "Alivio Flange ANSI" },
                              { id:6,title: "Seguridad Hilo NPT" },
                              { id:7,title: "Seguridad Flange ANSI" }
                          ] },
                      { title: "Valvula Bola", 
                        menu: [
                              { id:110,title: "Bola Bronce Hilo BSP" },
                              { id:75,title: "Bola Bronce Hilo NPT" },
                              { id:125,title: "Bola 1.000PSI Hilo NPT" },
                              { id:10,title: "Bola 2.000 A 10.000 BSP" },
                              { id:81,title: "Bola 3 Vias NPT y FLG " },
                              { id:142,title: "Bola DIN PN16 - PN40" },
                              { id:9,title: "Bola Flange ANSI 150" },
                              { id:109,title: "Bola Flange ANSI 150 y 300" },
                              { id:90,title: "Bola Partida V" },
                              { id:2,title: "Bola Revestida" },
                              { id:11,title: "Bola Socket Weld" },
                              { id:955,title: "Bola Termoplastica" },
                              { id:12,title: "Bola Trunnion FL 150 300 600" },
                              { id:145,title: "Bola Wafer 150" }
                          ] },
                      { title: "Valvula Compuerta", 
                        menu: [
                              { id:15,title: "Compuerta ANSI 125 y 150" },
                              { id:111,title: "Compuerta ANSI 300 y 600" },
                              { id:16,title: "Compuerta DIN PN10/16/25" },
                              { id:1298,title: "Compuerta Hilo BSP" },
                              { id:13,title: "Compuerta Hilo NPT" },
                              { id:32,title: "Compuerta Red Incendio" },
                              { id:14,title: "Compuerta Socket Weld" }
                          ] },
                      { title: "Valvula Cono", 
                        menu: [
                              { id:99,title: "Cono Excentrica" },
                              { id:18,title: "Cono Lubricada" },
                              { id:19,title: "Cono Revestida" },
                              { id:17,title: "Cono Sleeve" }
                          ] },
                      { title: "Valvula Diafragma", 
                        menu: [
                              { id:112,title: "Diafragma Recta" },
                              { id:113,title: "Diafragma Vertedero" }
                          ] },
                      { title: "Valvula Globo", 
                        menu: [
                              { id:168,title: "Globo Angular DIN PN16/40" },
                              { id:33,title: "Globo Angular Red Incendio" },
                              { id:79,title: "Globo Control Neumatico" },
                              { id:1313,title: "Globo Hilo BSP" },
                              { id:30,title: "Globo Hilo NPT" },
                              { id:28,title: "Globo Recta FL ANSI 125 150" },
                              { id:115,title: "Globo Recta FL ANSI 300 600" },
                              { id:29,title: "Globo Recta FL DIN PN16 PN40" },
                              { id:84,title: "Globo Revestida" },
                              { id:31,title: "Globo Socket Weld" },
                          ] },
                      { title: "Valvula Guillotina", 
                        menu: [
                              { id:152,title: "Guillotina DIN" },
                              { id:41,title: "Guillotina Lug ANSI" },
                              { id:34,title: "Guillotina Pasante ANSI" },
                              { id:35,title: "Guillotina Wafer ANSI" }
                          ] },
                      { title: "Valvula Mariposa", 
                        menu: [
                              { id:38,title: "Mariposa Lug ANSI" },
                              { id:137,title: "Mariposa Norma DIN" },
                              { id:39,title: "Mariposa Red Incendio" },
                              { id:80,title: "Mariposa Revestida ANSI" },
                              { id:37,title: "Mariposa Wafer ANSI" }
                          ] },
                      { title: "Valvula Pilotada", 
                        menu: [
                              { id:130,title: "Pilotada Alivio" },
                              { id:126,title: "Pilotada Flotador" },
                              { id:127,title: "Pilotada Reductora" },
                              { id:1114,title: "Pilotada Red Incendio" },//revisar
                              { id:128,title: "Pilotada Solenoide" },//revisar
                              { id:129,title: "Pilotada Sostenedora" }
                          ] },
                      { title: "Valvula Pinch", 
                        menu: [
                              { id:139,title: "Valvula Pinch ANSI" }
                          ] },
                      { title: "Valvula Reductora", 
                        menu: [
                              { id:57,title: "Reductora Liquidos Flange" },
                              { id:56,title: "Reductora Liquidos Hilo" },
                              { id:85,title: "Reductora Aire Vapor" },
                          ] },
                      { title: "Valvula Retencion", 
                        menu: [
                              { id:58,title: "Retenciones flg ANSI 150" },
                              { id:1269,title: "Retenciones flg ANSI 300 y 600" },
                              { id:61,title: "Retenciones DIN PN16/40" },
                              { id:977,title: "Retenciones Hilo BSP" },
                              { id:117,title: "Retenciones Hilo NPT" },
                              { id:91,title: "Retenciones Red Incendio" },
                              { id:60,title: "Retenciones Revestidas" },
                              { id:201,title: "Retenciones Socket Weld" },
                              { id:63,title: "Retenciones Tipo Wafer" }
                          ] },
                      { title: "Valvula Solenoide",
                        menu: [
                              { id:101,title: "Solenoide Hilo NPT" }
                          ] },
                      { title: "Valvula Venteo", 
                        menu: [
                              { id:71,title: "Simple efecto Hilo NPT" },
                              { id:123,title: "Doble efecto Hilo NPT" },
                              { id:72,title: "Doble efecto ANSI Flange" },
                              { id:119,title: "Doble efecto DIN Flange" },
                              { id:124,title: "Triple Hilo NPT" },
                              { id:121,title: "Triple efecto ANSI Flange" },
                              { id:73,title: "Triple efecto DIN Flange" }
                          ] }
                  ]
              }            
        ], // menu valvulas industriales en duro (pendientes para las mejoras)
        menuSecondary:[
              {
                  id: 45,
                  title: "Filtros Industriales",
                  menu: [
                      { id:23,title: "Filtro Canasto" },
                      { id:138,title: "Filtro Duplex" },
                      { id:131,title: "Filtro Tipo H" },
                      { id:24,title: "Filtro Tipo Y ANSI"},
                      { id:132,title: "Filtro Tipo Y DIN"},
                      { id:114,title: "Filtro Tipo Y Hilo y SW"},
                      { id:88,title: "Filtro Red Incendio"},
                      { id:1366,title: "Prefiltro Sedimento"},
                  ]
              },
              { 
                id: 48, title: "Fitting y Flanges", 
                menu: [
                      { id:77,title: "Fitting A105 #3000 NPT"},
                      { id:78,title: "Fitting A105 #3000 SW"},
                      { id:1340,title: "Fitting SS316 #3000 NPT"},
                      { id:1341,title: "Fitting SS316 #3000 SW"},
                      { id:1316,title: "Flange Ciego ANSI y DIN"},
                      { id:1319,title: "Flange Plano DIN"},
                      { id:1317,title: "Flange Slip On ANSI"},
                      { id:1318,title: "Flange Welding Neck"},
                  ] 
              },
              { 
                id: 24, title: "Red Incendio", 
                menu: [
                      { id:199,title: "Alivio Red Incendio"},//revisar
                      { id:169,title: "Bola Red Incendio"},//revisar
                      { id:170,title: "Compuerta UL/FM"},//revisar
                      { id:171,title: "Filtro Red Incendio"},//revisar
                      { id:172,title: "Globo Angular UL/FM"},//revisar
                      { id:332,title: "Grifo Red Incendio"},//revisar
                      { id:173,title: "Mariposa Red Incendio"},//revisar
                      { id:175,title: "Reductora Red Incendio"},//revisar
                      { id:176,title: "Retenciones UL/FM"},//revisar
                      { id:336,title: "Restrictora de Presion"},//revisar
                      { id:329,title: "Siamesas Red Incendio"},//revisar
                      { id:333,title: "Tapa Valvula Angulares"},//revisar
                      { id:233,title: "Ventosa Red Incendio"}//revisar
                  ] 
              },
              { 
                id: 53, title: "Accesorios", 
                menu: [
                      { id:1331,title: "Amortiguador"},
                      { id:1327,title: "Grifo Red Incendio"},
                      { id:1333,title: "Juntas Expansion"},
                      { id:1336,title: "Juntas Desmontaje"},
                      { id:1332,title: "Manometros"},
                      { id:1337,title: "Manometros y Termometro"},
                      { id:1335,title: "Rompedora de Vacio"},
                      { id:1326, title: "Siamesas Red Incendio"},
                      { id:1325,title: "Tapas de Valvula"},
                      { id:1334,title: "Trampa Conexion FLG"},
                      { id:1338,title: "Trampa Conexion NPT"},
                  ] 
              },
        ],// menu secundario en duro, este contiene bronce, filtro, fitiing y flange, red incendio, accesorios y filtracion de agua (pendientes para las mejoras)
        getUserData:[], // arreglo que muestra la informacion del usuario en el menu lateral
       }),
      mounted(){
        // ejecutamos la funcion al cargar la pagina
        this.mostrarMenu();
        this.getUser();
      },
      methods:{
          /*
          ----------------------------------------------------------------	
              Funcion: salir
              Descripcion: Esta funcion hace un logOff de la aplicacion, 
              elimina los datos almacenados en el localstorage y nos envia
              al inicio.
          ----------------------------------------------------------------
        */
        salir(){
          localStorage.clear()
          this.$router.push('/')
        },
        /*
          ----------------------------------------------------------------	
              Funcion: inicio
              Descripcion: Esta funcion un acceso directo para llegar al
              dashboard que es el inicio despues de ingresar el sistema
          ----------------------------------------------------------------
        */
        inicio(){
           if(this.$route.path === '/dashboard'){  
            }else{
              this.$router.push('/dashboard')
            }           
        },
        /*
          ----------------------------------------------------------------	
              Funcion: mostrarMenu
              Descripcion: Esta funcion activa el menu lateral cuando la 
              URL sea igual a dashboard
          ----------------------------------------------------------------
        */
        mostrarMenu(){
          if(this.$route.path === '/dashboard'){
            this.drawer=true            
          } 
      },
      scrollTop () {
        this.drawer= true
        setTimeout(() =>{
          window.scrollTo({
            top: 0
          })
        })
      },
      /*
          ----------------------------------------------------------------	
              Funcion: getUser
              Descripcion: Esta funcion se conecta a la API para obtener 
              los datos del usuario, obtiene el nombre + aéllido,
              el ejecutivo asignado y el descuento que tiene.
          ----------------------------------------------------------------
        */
      async getUser(){
        const id = localStorage.getItem('user')
        await axios.get('/api/user/sales/'+ id)
          .then(response =>{
            this.getUserData = response.data.results            
          })
          .catch(error => console.log(error))
        },
    },
}
</script>

<style>

</style>