<template>
    <div align="center">
        <h1>Perfil</h1>
        <p>{{ perfil.username }}</p>
        <p>{{ perfil.email }}</p>
        <p>{{ perfil.celular }}</p>
        <div v-for="img in perfilimg" :key="img.id">
            <div v-if="img.imagen === null">
                <div class="alert alert-danger" role="alert">
                    <p>El usuario no tiene imagen</p>
                </div>
            </div>
            <div v-else>
                <img :src="'http://localhost:1337'+ img.imagen.url" height="100" width="100">
            </div>
        </div>
        <a href="/editar-usuario" class="btn btn-outline-danger btn-sm rounded-pill mb-2 mx-1">editar</a>
        <button @click="salir" class="btn btn-outline-danger btn-sm rounded-pill mb-2 mx-1">Cerrar sesion</button>
    </div>
</template>

<script>
export default {
    name: 'Perfil',
    data(){
        return{
            perfil: [],
            perfilimg: []
        }
    },
    mounted() {
        this.miperfil();
        this.miperfilimg();
    },
    methods: {
        miperfil(){
            const token = localStorage.getItem('token')
            fetch('http://localhost:1337/users/me', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(res => res.json())
            .then(data => {
                this.perfil = data
            })
        },
        miperfilimg(){
            const token = localStorage.getItem('token')
            fetch('http://localhost:1337/foto/me', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.perfilimg = data
            })
        },
        salir(){
            localStorage.removeItem('token'),
            localStorage.removeItem('user'),
            this.$router.push(location.href="/")
        }
    }
}
</script>