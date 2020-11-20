<template>
    <p><b>Previsualizacion:</b></p>
        <div v-if="ver === ''">
            <div class="alert alert-danger w-50" role="alert">
                No a seleccionado ningun archivo
            </div>
        </div>
        <div v-else class="w-50 my-1">
            <img class="card-img-top " :src="ver" alt="" >
        </div>
    <div class="row">
        <div class="w-50 col">
            <form
            @submit.prevent="subirimagen"
            @change="verimagen"
            enctype="multipart/form-data">
                <div class="custom-file">
                    <input type="file" ref="file" class="custom-file-input my-1" id="file" accept="image/*" required>
                    <label class="custom-file-label text-left" for="file">selecione una imagen</label>
                    <input type="text" maxlength="100" v-model="nombre" id="nombre" placeholder="Nombre del producto" class="form-control my-1" required>
                    <textarea class="form-control my-1" maxlength="255" placeholder="Descripcion del producto" v-model="descripcion" id="descripcion" required></textarea>
                    <input type="text" maxlength="20" v-model="precio" id="precio" placeholder="Precio del producto" class="form-control my-1" required>
                    <button type="submit" class="w-100 btn btn-success btn-sm">subir</button>
                </div>
            </form>
        </div>
        <div class="w-50 col">
            <div>
                <span>Categorias:</span>
            </div>
            <div v-if="alerta === true">
                <div class="alert alert-danger" role="alert">
                    Seleccione almenos una categoria
                </div>
            </div>
            <div class="h-50 w-75 d-inline-block overflow-auto border rounded bg-light" style="width: 120px;">
                <div v-for="categoria in cat" :key="categoria.id">
                    <input type="checkbox" :id="categoria.nombre" :value="categoria.id" v-model="idCategoria" >
                    <label :for="categoria.nombre" >{{ categoria.nombre }}</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name:'Crear producto',
    data(){
        return{
            idCategoria: [],
            ver: "",
            image: "",
            cat: [],
            nombre: "",
            alerta: false,
            nombre: "",
            descripcion: "",
            precio: ""
        }
    },
    mounted(){
        axios.get('http://localhost:1337/categorias').then((response) => {
            this.cat = response.data
        })
    },
    methods: {
        verimagen(e){
            this.ver = URL.createObjectURL(e.target.files[0])
            this.image = e.target.files[0]
        },
        subirimagen(){
            if(this.idCategoria.length == 0)
            {
                this.alerta = true
            }else{
                this.alerta = false
                const token = localStorage.getItem('token')
                var formData = new FormData();
                let data = {
                    nombre: this.nombre.toLowerCase(),
                    descripcion: this.descripcion.toLowerCase(),
                    precio: this.precio, 
                    categorias: this.idCategoria 
                    }

                formData.append("files.imagen", this.image);
                formData.append("data", JSON.stringify(data));
                
                axios.post("http://localhost:1337/productos", formData ,{
                    headers:{
                        'Authorization': 'Bearer ' + token,
                        "Content-Type": 'multipart/form-data',
                    }
                }).then((response) => {
                    this.$router.push("/")
                })
            }
        }
    }
}
</script>