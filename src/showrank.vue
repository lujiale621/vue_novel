<style lang="less" scoped>
</style>
<template>
  <div class="layout">
    <Layout>
      <Content>
        <navheader></navheader>
      </Content>
    </Layout>
  </div>
</template>
<script>
import navheader from "./components/nav-header";

export default {
  data() {
    return {
      res: ""
    };
  },
  mounted() {
    var value = "api/e1bookrank1";
    var self = this;
    this.axios
      .get(value, {
        params: {}
      })
      .then(function(rest) {
        if (rest.data != null) {
          if (rest.data.code != 0) {
            self.res = rest.data.data.list;
            console.log(self.res);
          }
        }
      });
  },
  components: { navheader }
};
</script>