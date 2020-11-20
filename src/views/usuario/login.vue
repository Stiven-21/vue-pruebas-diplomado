<template>
    <h1>Iniciar Sesión</h1>
    <form @submit.prevent="login">
        <input type="email" v-model="email" id="email" placeholder="E-mail" class=" form-control mb-2">
        <input type="password" v-model="password" id="password" placeholder="Contraseña" class=" form-control mb-2">
        <div v-if="error === true">
            <span style="color: red">E-mail o contraseña incorrectos</span>
        </div>
        <button type="submit" class="mt-2 btn btn-success rounded-pill btn-block">Iniciar sesión</button>
    </form>
    <div class="text-right text-secondary mx-3">
      <h6><small>
        o <a href="/registrarse" class="text-secondary">registrate aquí</a>
      </small></h6>
    </div>
    <hr width="75%" align="center"/>
</template>

<script>
export default {
    name: 'Login',
    data(){
        return{
            error: false
        }
    },
    mounted(){
        if((localStorage.getItem("token")) != null){
            this.$router.push("/")
        };
    },
    methods: {
        login() {
      this.error = false,

      fetch('http://localhost:1337/auth/local', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          identifier: this.email,
          password: this.password
        })
      }).then(async (response)=> {
        if(!response.ok){
          throw await response.json();
        }
        return response.json();
      }).then((data) => {
        localStorage.setItem('token', data.jwt),
        localStorage.setItem('user', JSON.stringify(data.user)),
        this.$router.push(location.href="/")
      })
      .catch((err)=> {
        this.error = true
      })
    }
    }
}
</script>
