<template lang="pug">
  #app
    img(alt="Vue logo", src="./assets/logo.png")
    el-button(@click="show = !show") Ouvrir un formulaire
    FormulaireTrello(v-if="show", title="Envoyer à Trello")
</template>

<script>
import FormulaireTrello from "./components/FormulaireTrello";

export default {
  name: "app",
  data() {
    return {
      show: false,
    };
  },
  components: {
    FormulaireTrello,
  },
};
</script>
<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
  display flex
  flex-direction column
  justify-content center
  align-items center
  .links
    margin-top 25px
    a
      margin 20px
</style>
