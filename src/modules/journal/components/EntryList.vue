<template>
  <div class="entry-list-container">
    <div class="px-2 pt-2">
      <input
        type="text"
        class="form-control"
        placeholder="Buscar"
      />
    </div>
    <div class="entry-scroll-area">
      <Entry
        v-for="item in 50"
        :key="item"
      />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

  export default {
    components: {
      Entry: defineAsyncComponent( () => import(/* webpackChunkName: 'Entry' */'./EntryComp'))
    }
  }
</script>

<style lang="scss" scoped>
input {
  &:focus {
    box-shadow: none;
  }
}
.entry-list-container{
  border-right: 1px solid #2c3e50;
  height: calc( 100vh - 56px );
}
.entry-scroll-area{
  height: calc( 100vh - 100px );
  overflow: scroll;
}
</style>