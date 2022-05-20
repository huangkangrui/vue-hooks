<!--
 * @Author: huangkangrui 1505207242@qq.com
 * @Date: 2022-05-08 17:43:25
 * @LastEditors: CodeDragon 1505207242@qq.com
 * @LastEditTime: 2022-05-20 22:57:14
 * @FilePath: \vue-hooks\src\App.vue
 * @Description: 
-->
<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/loadingDelay">LoadingDelay</router-link> |
    <router-link to="/polling">Polling</router-link> |
    <router-link to="/autoRun">AutoRun</router-link> |
    <router-link to="/refreshOnWindowFocus">RefreshOnWindowFocus</router-link> |
    <router-link to="/debounce">Debounce</router-link> |
    <router-link to="/throttle">Throttle</router-link> |
  </nav>
  <router-view/>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
