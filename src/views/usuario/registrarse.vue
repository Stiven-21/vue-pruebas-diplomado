<template>
    <h1>Registrare</h1>
    <form @submit.prevent="Registrar">
        <div class="custom-file">
            <input type="file" ref="file" class="custom-file-input my-1" id="file" accept="image/*" disabled>
            <label class="custom-file-label text-left" for="file">selecione una imagen</label>
            <input type="text" v-model="user" id="user" placeholder="Usuario" class=" form-control mb-2" required>
            <input type="email" v-model="email" id="email" placeholder="E-mail" class=" form-control mb-2" required>
            <input type="password" v-model="password" id="password" placeholder="Contraseña" class=" form-control mb-2" autocomplete="off" required>
            <input type="text" v-model="celular" id="celular" placeholder="Celular" class=" form-control mb-2" required>
            <button type="submit" class="mt-2 btn btn-success rounded-pill btn-block">Registrarse</button>
        </div>
    </form>
    <div class="text-right text-secondary mx-3">
      <h6><small>
        o <a href="/login" class="text-secondary">inicia sesion</a>
      </small></h6>
    </div>
    <hr class="mb-2" width="75%" align="center"/>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Registrarse',
    data(){
        return{
            user: "",
            email: "",
            password: "",
            celular: "",
            image: "",
 
        }
    },
    mounted(){
        if((localStorage.getItem("token")) != null){
            this.$router.push("/")
        };
    },
    methods:{
        Registrar() {
            fetch('http://localhost:1337/auth/local/register', {
            method: 'POST',
            headers:{
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.user.toLowerCase(),
	            email: this.email,
	            password: this.password,
	            celular: this.celular
            })
            }).then(async (response)=> {
                if(!response.ok){
                throw await response.json();
                }
                return response.json();
            }).then((data) => {
                localStorage.setItem('token', data.jwt),
                localStorage.setItem('user', JSON.stringify(data.user)),
                this.imguser(data.jwt);
                this.$router.push(location.href="/")
            })
            .catch((err)=> {
                this.error = true
            })
        },
        imguser(token){
            var formData = new FormData();
            let data = {}
            formData.append("files.imagen", this.image);
            formData.append("data", JSON.stringify(data));
            axios.post("http://localhost:1337/fotos", formData ,{
                headers:{
                    'Authorization': 'Bearer ' + token,
                    "Content-Type": 'multipart/form-data',
                }
            }).then((response) => {})

        }
    }
}
</script>