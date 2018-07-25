<template>
    <section>
        <Header></Header>
        <List></List>
        <AboutSection></AboutSection>
        <Footer></Footer>
    </section>
</template>

<script>

import Header from '../components/HomeComponents/Header.vue'
import List from '../components/HomeComponents/List.vue'
import AboutSection from '../components/HomeComponents/AboutSection.vue'
import Footer from '../components/HomeComponents/Footer.vue'

export default {
  name: 'Home',
  components: {
      Header,
      List,
      AboutSection,
      Footer
  }
}
</script>
<style lang="scss">
</style>
