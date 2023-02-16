<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Hola mundo</h1>
    <button class="btn btn-primary" @click="goToJournal">Journal</button>
    <button class="btn btn-secondary">Mundo</button>
    <button class="btn btn-success">Danilo</button>
  </div>
</template>

<script>
export default {
  methods: {
    goToJournal() {
      this.$router.push({ name: 'no-entry'})
    }
  },
}
</script>