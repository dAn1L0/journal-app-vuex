<template>
  <div 
    class="entry-container mb-3 pointer p-2"
    @click="$router.push({ name: 'entry', params: {id: 10} })"
  >
    <div class="entry-title d-flex">
      <span class="text-success fs-5 fw-bold">15</span>
      <span class="mx-1 fs-5">febrero</span>
      <span class="mx-2 fw-light">2023, jueves</span>
    </div>
    <div class="entry-description">
      Excepteur labore sint consequat esse adipisicing sint sunt pariatur exercitation reprehenderit laborum. Proident dolor voluptate laborum exercitation adipisicing. Enim id nisi amet ea consectetur dolor ea. Id sint elit reprehenderit adipisicing minim duis duis minim veniam elit consectetur est velit ea. Mollit est sunt deserunt ut officia labore. Id occaecat ad in ullamco minim ea minim nisi amet tempor. Nulla ipsum consectetur tempor aliquip sunt ad laborum ullamco.
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>
.entry-container {
  border-bottom: 1px solid #2c3e50;
  transition: 0.2 all ease-in;
  &:hover{
    background-color: lighten($color: grey, $amount: 45);
    transition: 0.2 all ease-in;
  }
  .entry-description {
    font-size: 12px;
  }
}
.entry-title {
  font-weight: 600;
}
</style>