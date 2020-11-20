<template>
    <h1 align="center">Categorias</h1>
    <form @submit.prevent="agregarcategoria">
        <input type="text" v-model="cate" id="cate" placeholder="Categoria" class="form-control" required>
        <button type="submit">Publicar categoria</button>
    </form>
    <table align="center">
        <tr>
            <div align="center" v-for="cat in categorias" :key="cat.id">
                <td><p> {{ cat.id }} </p></td>
                <td><p> {{ cat.nombre }} </p></td>
            </div>
        </tr>
    </table>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Categoria',
    data(){
        return{
            categorias: [],
            cate: ""
        }
    },
    mounted(){
        axios.get('http://localhost:1337/categorias').then((response) => {
        this.categorias = response.data
        })
    },
    methods: {
        agregarcategoria() {
        fetch('http://localhost:1337/categorias', {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
          body: JSON.stringify({
              nombre: this.cate.toLowerCase(),
          })
        }).then(async (response)=> {
          if(!response.ok){
            throw await response.json();
          }
          return response.json();
        }).then((data) => {
          this.$router.push(location.href="/categoria")
        })
        .catch((err)=> {  })
      }
    }
}
</script>