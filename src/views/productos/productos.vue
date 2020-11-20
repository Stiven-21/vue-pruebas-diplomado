<template>
    <div align="center">
        <a href="/crear-producto" class="text-primary mx-2">Añadir producto</a>
    </div>
    <div class="col-12 text-center" v-if="alerta === true">
        <div class="alert alert-danger" role="alert">
            <p>No haz publicado ninguna imagen</p>
        </div>
    </div>
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
    name: 'Productos',
    data(){
        return{
            alerta: false,
            productos: []
        }
    },
    mounted(){
        this.misproductos()
    },
    methods: {
        misproductos(){
            const token = localStorage.getItem('token')
            fetch('http://localhost:1337/producto/me', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(res => res.json())
            .then(data => {
                this.productos = data
                if(this.productos.length == 0)
                {
                    this.alerta = true
                }else{
                    this.alerta = false
                }
            })
        },
    }
}
</script>