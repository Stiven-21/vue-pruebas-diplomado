<template>
    <h1 align="center">EDITAR USUARIO</h1>
    <!--editar imagen--> 
    <h3 align="center">Imagen del Usuario</h3>
    <div class="row">
        <div class="w-50">
            <form
            @submit.prevent="subirimagen"
            @change="verimagen"
            enctype="multipart/form-data">
                <div class="custom-file">
                    <input type="file" ref="file" class="custom-file-input my-1" id="file" accept="image/*" required>
                    <label class="custom-file-label text-left" for="file">selecione una imagen</label>
                    <button type="submit" class="w-100 btn btn-success btn-sm">guardar imagen</button>
                </div>
            </form>
        </div>
        <div class="w-50" align="center">
            <p><b>Previsualizacion:</b></p>
            <div v-if="ver === ''">
                <div class="alert alert-danger w-50" role="alert">
                    No a seleccionado ningun archivo
                </div>
            </div>
            <div v-else class="w-50 my-1">
                <img class="card-img-top " :src="ver" alt="" >
            </div>
        </div>
    </div>
    <!--editar datos--> 
    <h3 align="center">Datos del Usuario</h3>
    <form @submit.prevent="actualizardatos">
        <div class="custom-file">
            <input type="text" v-model="user" id="user" placeholder="Usuario" class=" form-control mb-2" required>
            <input type="email" v-model="email" id="email" placeholder="E-mail" class=" form-control mb-2" required>
            <input type="password" v-model="password" id="password" placeholder="Contraseña" class=" form-control mb-2" autocomplete="off" required>
            <input type="text" v-model="celular" id="celular" placeholder="Celular" class=" form-control mb-2" required>
            <button type="submit" class="mt-2 btn btn-success rounded-pill btn-block">guardar datos</button>
        </div>
    </form>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Perfil',
    data(){
        return{
            perfil: [],
            ide: "",
            ver: "",
            image: "",
            user: "",
            email: "",
            password: "",
            celular: "",
        }
    },
    mounted() {
        this.miperfil();
    },
    methods: {
        verimagen(e){
            this.ver = URL.createObjectURL(e.target.files[0])
            this.image = e.target.files[0]
        },
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
        subirimagen(){
            const token = localStorage.getItem('token')
            this.ide = this.perfil.foto
            var formData = new FormData();
            let data = {}
            formData.append("files.imagen", this.image);
            formData.append("data", JSON.stringify(data));
            axios.put("http://localhost:1337/fotos/"+this.ide, formData ,{
                headers:{
                    'Authorization': 'Bearer ' + token,
                    "Content-Type": 'multipart/form-data',
                }
            }).then((response) => {
                this.$router.push(location.href="/perfil")
            })
        },
        actualizardatos() {
            const token = localStorage.getItem('token')
            this.ide = this.perfil.id
            axios.put("http://localhost:1337/users/"+this.ide, {
                username: this.user.toLowerCase(),
	            email: this.email,
	            password: this.password,
	            celular: this.celular
            },{
                headers:{
                    'Authorization': 'Bearer ' + token,
                    "Content-Type": 'multipart/form-data',
                }
            }).then((response) => {
                this.$router.push(location.href="/perfil")
            })
        }
    }
}
</script>