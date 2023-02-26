<template>
  <div class="d-flex justify-content-center align-items-center">
    <h2>
      No hay nada seleccionado.
    </h2>
  </div>
  <Fab
    @on:click="createNewEntry"
  />
</template>

<script>
import { defineAsyncComponent } from 'vue';

  export default {
    components: {
      Fab: defineAsyncComponent( () => import(/* webpackChunkName: 'FabButton' */'../components/FabButton'))
    },
    methods: {
      createNewEntry() {
        this.$router.push({name: 'entry', params: {id: 'new'}})
      }
    },
  }
</script>

<style lang="scss" scoped>
div {
  height: 100%;
}
</style>