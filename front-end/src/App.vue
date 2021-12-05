<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/upload">Upload</router-link> |
      <router-link to="/liked">Liked</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
* {
  background-color: #282828;
  color: #f9f9f9;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  display: flex;
  justify-content: space-around;
  font-size: xx-large;
  border-bottom: solid #f9f9f9;
}

#nav a {
  font-weight: bold;
  color: #f9f9f9;
}

#nav a.router-link-exact-active {
  color: #60f0f0;
}
</style>
