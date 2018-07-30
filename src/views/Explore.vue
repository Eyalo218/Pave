<template>
    <section>
        <control-panel></control-panel>
        <related-searches></related-searches>
        <trip-list></trip-list>
    </section>
</template>

<script>
import tripList from "../components/ExploreComponents/List.vue";
import controlPanel from "../components/ExploreComponents/ControlPanel.vue";
import relatedSearches from "../components/ExploreComponents/relatedSearches.vue";

export default {
  components: {
    tripList,
    controlPanel,
    relatedSearches
  },
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {}
};
</script>

<style>
</style>
