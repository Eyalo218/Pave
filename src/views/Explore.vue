<template>
    <section>
      <div class="pinned-trip-modal-open"></div>
        <control-panel></control-panel>
        <related-searches></related-searches>
        <trip-list></trip-list>
    </section>
</template>

<script>
import tripList from "../components/ExploreComponents/List.vue";
import controlPanel from "../components/ExploreComponents/ControlPanel.vue";
import relatedSearches from "../components/ExploreComponents/relatedSearches.vue";
import { eventBus, PINNED_TRIP } from "../service/eventBus.js";
export default {
  components: {
    tripList,
    controlPanel,
    relatedSearches
  },
  data() {
    return {};
  },
  created() {
    console.log('created');
  },
  computed: {},
  methods: {
  }
};
</script>

<style lang="scss" scoped>
</style>
