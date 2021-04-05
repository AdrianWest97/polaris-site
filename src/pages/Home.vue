<template>
  <div>
    <Hero />
    <Steps/>
    <FeaturedProducts />
  </div>
</template>

<script>
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import Steps from "../components/Steps";

export default {
  name: "Home",

  components: {
    Hero,
    FeaturedProducts,
    Steps
  },
    mounted(){
    this.$store.commit('ui/SET_HEADER_FOOTER',true)
  }
};
</script>