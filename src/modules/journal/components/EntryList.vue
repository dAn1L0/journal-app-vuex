<template>
  <div class="entry-list-container">
    <div class="px-2 pt-2">
      <input
        type="text"
        class="form-control"
        placeholder="Buscar"
        v-model="term"
      />
    </div>
    <div class="my-1 d-flex flex-column mx-2">
      <button
        class="btn btn-sm btn-outline-primary shadow-none"
        @click="$router.push({ name: 'entry', params: { id: 'new' } })"
      >
        <i class="fa fa-plus-square"></i>
        Nueva entrada
      </button>
    </div>
    <div class="entry-scroll-area">
      <Entry
        v-for="entry in entriesByTerm"
        :key="entry.id"
        :entry="entry"
      />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapGetters } from 'vuex';


  export default {
    components: {
      Entry: defineAsyncComponent( () => import(/* webpackChunkName: 'Entry' */'./EntryComp'))
    },
    computed: {
      ...mapGetters('journal', ['getEntriesByTerm']),
      entriesByTerm() {
        return this.getEntriesByTerm( this.term )
      }
    },
    data() {
      return {
        term: ''
      }
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