<template>
  <div class="row p-2 shadow-lg bg-white sticky-top border-bottom">
    <div class="col-3 align-self-center text-right">
      <img src="https://g1alexander.github.io/frameworks-css/src/bootstrap/actividad4/assets/logo/logo.svg" height="25" width="25">&nbsp;
      <font face = "Californian FB" size = "4">
        <a href="/" class="card-link text-secondary">Restaurant</a>
      </font>
    </div>
    <div class="col-5 text-center"></div>
    <div class="col-4 align-self-center text-left">
      <div v-if="sesion === ''">
        <a href="/login" class="btn btn-dark btn-sm">iniciar sesion</a>
      </div>
      <div v-else>
        <a href="/productos" class="text-primary mx-2">Mis productos</a>
        <a href="/perfil" class="text-primary mx-2">Mi perfil</a>
        <a href="/categoria" class="text-primary mx-2">categorias</a>
      </div>
    </div>
  </div>
  <router-view/>
</template>

<script>
export default {
    data(){
        return{
            sesion: {},
        }
    },
    mounted() {
        //localStorage.removeItem('token');
        //localStorage.removeItem('user');
        //localStorage.setItem('token', "123cwd12");
        this.validarsesion()
    },
    methods: {
      validarsesion(){
        if((localStorage.getItem("token")) === null){
            this.sesion = '';
        }else{
            this.sesion = localStorage.getItem('token');
        };
      }
    }
}
</script>


<style>

</style>
