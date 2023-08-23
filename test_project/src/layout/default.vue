<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="body" id="container">
    <HeaderCommon />
    <div class="row" style="border: 1px solid white">
      <div class="common-layout"><slot /></div>

      <FooterCommon />
    </div>
  </div>
</template>

<script>
import HeaderCommon from "@/components/commonHeader.vue";
import FooterCommon from "@/components/commonFooter.vue";

export default {
  components: { HeaderCommon, FooterCommon },
};
</script>
<style>
.body {
  margin-left: 1cm;
  margin-right: 1cm;
}
</style>
