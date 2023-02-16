<template>
  <div class="entry-title d-flex justify-content-between px-2">
    <div>
      <span class="text-success fs-3 fw-bold">2</span>
      <span class="mx-1 fs-3">febrero</span>
      <span class="mx-2 fs-4 fw-light">2023, jueves</span>
    </div>
    <div>
      <button class="btn btn-outline-danger mx-2 border-0">
        Borrar
        <i class="fa fa-trash-alt"></i>
      </button>
      <button class="btn btn-outline-primary border-0">
        Cargar imagen
        <i class="fa fa-upload"></i>
      </button>
    </div>
  </div>
  <hr />
  <div class="d-flex flex-column px-2 h-75">
    <textarea placeholder="¿Qué sucedió hoy?"></textarea>
  </div>
  <Fab icon="fa-save"/>
  <img
    src="https://cdn.pixabay.com/photo/2023/02/14/22/12/birds-7790506_960_720.jpg" 
    alt="entry-view-picture"
    class="img-thumbnail"
  />
</template>

<script>
import { defineAsyncComponent } from 'vue';

  export default {
    components: {
      Fab: defineAsyncComponent(() => import(/* webpackChuckName: 'FabOnEntryView'*/ '../components/FabButton') )
    }
  }
</script>

<style lang="scss" scoped>
textarea {
  font-size: 20px;
  border: none;
  height: 100%;
  resize: none;

  &:focus {
    outline: none;
  }
}
img {
  width: 200px;
  position: fixed;
  bottom: 100px;
  right: 20px;
  box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>