<template>
  <div class="heroBlock">
    <v-carousel
        cycle
         :show-arrows="false"
         hide-delimiter-background
         height="600"
         delimiter-icon="mdi-minus"
         >
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
        <v-row class="title fill-height hidden-xs-only" align="center" justify="center">{{ item.title }}</v-row>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  name: "Hero",
  data() {
    return {
      items: [
        {
          src: require("../assets/images/shop1.jpg"),
          title: "Shop Online"
        },
        {
          src: require("../assets/images/shop3.jpg"),
          title: "Shop Online"
        },
        {
          src: require("../assets/images/shop5.jpg"),
          title: "We are professional"
        },
          {
          src: require("../assets/images/shop6.jpg"),
          title: "Hassle Free"
        }
      ]
    };
  }
};
</script>
