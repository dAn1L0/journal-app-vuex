<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between px-2">
      <div>
        <span class="text-success fs-3 fw-bold">{{ day }}</span>
        <span class="mx-1 fs-3">{{ month }}</span>
        <span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
      </div>
      <div>
        <input
          type="file"
          @change="onSelectedImage"
          ref="imageSelector"
          v-show="false"
          accept="image/png, image/jpeg"
        />
        <button
          v-if="entry.id"
          @click="onDeleteEntry"
          class="btn btn-outline-danger mx-2 border-0"
        >
          Borrar
          <i class="fa fa-trash-alt"></i>
        </button>
        <button
          class="btn btn-outline-primary border-0"
          @click="onSelectImage"
        >
          Cargar imagen
          <i class="fa fa-upload"></i>
        </button>
      </div>
    </div>
    <hr />
    <div class="d-flex flex-column px-2 h-75">
      <textarea v-model="entry.description" placeholder="¿Qué sucedió hoy?"></textarea>
    </div>
    <img
      v-if="entry.picture && !localImage"
      :src="entry.picture"
      alt="entry-view-picture"
      class="img-thumbnail"
    />
    <img
      v-if="localImage"
      :src="localImage"
      alt="entry-view-picture"
      class="img-thumbnail"
    />
  </template>
  <Fab
    icon="fa-save"
    @on:click="saveEntry"
  />
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex'
import getDayMonthYear from '../helpers/getDayMonthYear'
import Alerta from 'sweetalert2';
import uploadImage from '../helpers/uploadImage'

  export default {
    props: {
      id: {
        type: String,
        required: true
      }
    },
    components: {
      Fab: defineAsyncComponent(() => import(/* webpackChuckName: 'FabOnEntryView'*/ '../components/FabButton') )
    },
    data() {
      return {
        entry: null,
        localImage: null,
        file: null
      }
    },
    computed: {
      ...mapGetters('journal', ['getEntryById']),
      day(){
        const { day } = getDayMonthYear( this.entry.date )
        return day
      },
      month() {
        const { month } = getDayMonthYear( this.entry.date )
        return month
      },
      yearDay(){
        const { yearDay } = getDayMonthYear( this.entry.date )
        return yearDay
      }
    },
    methods: {
      ...mapActions('journal', ['updateEntry', 'createEntry', 'deleteEntry']),
      loadEntry() {
        let entry;
        if ( this.id === 'new') {
          entry = {
            date: new Date().getTime(),
            description: ''
          }
        } else {
          entry = this.getEntryById( this.id )
          if ( !entry ) return this.$router.push({ name: 'no-entry' })
        }
        this.entry = entry
      },
      async saveEntry() {

        new Alerta({
          title: 'Espere un momento.',
          allowOutsideClick: false,
          width: '16rem'
        })
        Alerta.showLoading()

        const picture = await uploadImage( this.file )
        this.entry.picture = picture

        if ( this.entry.id ) {
          await this.updateEntry(this.entry)
          Alerta.fire({
            title: 'Guardado',
            text: 'Entrada actualizada con éxito',
            icon: 'success',
            width: '16rem',
            timer: 1500
          })
        } else {
          if ( this.entry.description === '' ) return
          const id = await this.createEntry( this.entry )
          this.$router.push({ name: 'entry', params: {id}})
          Alerta.fire({
            title: 'Guardado',
            text: 'Entrada registrada con éxito',
            icon: 'success',
            width: '16rem',
            timer: 1500
          })
        }
        this.file = null
      },
      async onDeleteEntry() {
        if ( !this.entry.id ) return

        const { isConfirmed } = await Alerta.fire({
          title: '¿Está seguro?',
          text: 'Una vez borrado, no se puede recuperar.',
          showDenyButton: true,
          confirmButtonText: 'Sí, estoy seguro',
          width: '16rem'
        })

        if ( !isConfirmed ) return
        new Alerta({
          title: 'Espere por favor',
          allowOutsideClick: false,
          width: '16rem'
        })
        Alerta.showLoading()

        await this.deleteEntry( this.entry.id )
        this.$router.push({ name: 'no-entry' })

        const Toast = Alerta.mixin({
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: false,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Alerta.stopTimer)
            toast.addEventListener('mouseleave', Alerta.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Entrada eliminada',
        })
      },
      async onSelectedImage( event ) {
        const file = event.target.files[0]
        if ( !file ) {
          this.localImage = null
          this.file =null
          return
        }
        this.file = file
        const fr = new FileReader()
        fr.onload = () => this.localImage = fr.result
        fr.readAsDataURL( file )
      },
      onSelectImage() {
        this.$refs.imageSelector.click()
      }
    },
    created() {
      this.loadEntry()
      // console.log( this.id )
    },
    watch: {
      id() {
        this.loadEntry()
      }
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