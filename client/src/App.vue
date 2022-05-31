<template>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* font-size:14px */
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.order-item {
  padding: 0.5em;
  padding-top: 1rem;
}
.order-item .left span {
  display: block;
  border: 1px solid #333;
  border-radius: 0.567rem;
  text-align: center;
  color: #333333;
  line-height: 1.8rem;
}

</style>
