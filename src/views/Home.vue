<template>
    <div v-for="p in productos" :key="p.id">
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row no-gutters">
                <div class="col-md-4">
                <img :src="'http://localhost:1337'+ p.imagen.url" class="card-img" alt="...">
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">{{ p.nombre }}:</h5>
                    <p class="card-text">{{ p.descripcion }}</p>
                    <p class="card-text"><small class="text-muted">{{ p.precio }}</small></p>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data(){
        return{
            sesion: {},
            productos: []
        }
    },
    mounted() {
        //location.reload();
        //localStorage.removeItem('token');
        //localStorage.removeItem('user')
        //localStorage.setItem('token', "123cwd12");
        //this.sesion = JSON.parse(localStorage.getItem('user'))
        if((localStorage.getItem("token")) === null){
            this.sesion = '';
        }else{
            this.sesion = localStorage.getItem('token');
        };
        this.getproductos()
    },
    methods: {
        getproductos(){
            fetch('http://localhost:1337/productos')
            .then(res => res.json())
            .then(data => {
                this.productos = data
            })
        },
    }
}
</script>
