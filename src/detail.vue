<style lang="less" scoped>
</style>
<template>
  <div class="layout">
    <layout>
      <Content>
        <navheader class="navheader"></navheader>
        <navdetail :data="bookdetail" :parenturl="url" :links="artlinks"></navdetail>
      </Content>
    </layout>
  </div>
</template>
<script>
import navheader from "./components/nav-header"
import navdetail from "./components/nav-detail"
export default {
  name: "detail",
  data() {
    return {
      url: "",
      bookdetail: "",
      artlinks: ""
    };
  },
  created() {
    this.url = this.$route.query.url;
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      this.$Spin.show();
      var value = "api/e1bookdetail";
      var self = this;
      this.axios
        .get(value, {
          params: {
            xsdetail: this.url
          }
        })
        .then(function(rest) {
          self.$Spin.hide();
          if (rest.data != null) {
            if (rest.data.code != 0) {
              self.bookdetail = rest.data.data.data;
              console.log(self.bookdetail);
              self.artlinks = rest.data.data.list;
              console.log(self.artlinks);
            } else {
              console.log("再次加载")
              self.load();
            }
          }
        });
    }
  },
  components: { navheader, navdetail }
};
</script>