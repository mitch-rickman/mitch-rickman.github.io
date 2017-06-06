<template>
  <div id="app">
    <Background></Background>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Background from './components/Background'

export default {
  name: 'app',
  components: {
    Hello,
    Background
  }
}
</script>

<style>
#app {
  
}
</style>
