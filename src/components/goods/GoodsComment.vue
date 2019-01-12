<template>
  <div>
    <comment :id="id"></comment>
  </div>
</template>

<script>
  import comment from '../subcomponents/comment.vue'
  export default {
    name: "",
    data() {
      return {
        id:this.$route.params.id
      }
    },
    methods: {

    },
    components:{
      comment
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>

</style>