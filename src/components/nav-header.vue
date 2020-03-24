<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  
}
.layout-logo {
  width: 100px;
  height: 30px;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
  color: aliceblue;
  line-height: 30px;
}
.layout-nav {
  float:right;
}
.layout-footer-center {
  text-align: center;
}

.bg {
  background: url(/static/pictures/background.jpg) no-repeat center center /
    cover;
  text-align: center;
  color: #fff;
  position: relative;
  display: flex;
  justify-content: center;
}
.nav-search {
  padding-top: 80px;
  padding-bottom: 80px;
  width: 50%;
}
.nav-bar {
  display: flex;
  justify-content: center;
}
</style>
<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">brand</div>
          <div class="layout-nav">
            <MenuItem name="1">
              <a href="http://47.116.1.19:8767/swagger-ui.html"><Icon type="ios-navigate"></Icon>API 文档</a>
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Content>
        <div class="bg">
          <div class="nav-search">
            <Input size="large" search enter-button placeholder="搜索关键字" v-model="value" @on-search="search"/>
          </div>
        </div>
        <div style="background: #fff;">
          <div class="nav-bar">
            <Menu mode="horizontal" @on-select="handleSelect">
              <MenuItem name="1">言情女生</MenuItem>
              <MenuItem name="2">玄幻奇幻</MenuItem>
              <MenuItem name="3">都市青春</MenuItem>
              <MenuItem name="4">武侠仙侠</MenuItem>
              <MenuItem name="5">唯美纯爱</MenuItem>
              <MenuItem name="6">科幻灵异</MenuItem>
              <MenuItem name="7">轻小说</MenuItem>
              <MenuItem name="8">历史军事</MenuItem>
              <MenuItem name="9" style="display:none">排行榜</MenuItem>
            </Menu>
          </div>
        </div>
      </Content>
    </Layout>
  </div>
</template>
<script>
export default {};
</script>
<script>
export default {
  data() {
    return {
      value: ""
    };
  },
  methods: {
    search: function() {
      this.$router.push({
        path: "/searchdetail",
        query: {
          searchname: this.value
        }
      });
    },
    handleSelect(key) {
      var value = "";
      console.log(key);
      if (key == 1) {
        value = "言情";
      } else if (key == 2) {
        value = "玄幻";
      } else if (key == 3) {
        value = "都市";
      } else if (key == 4) {
        value = "武侠";
      } else if (key == 5) {
        value = "唯美";
      } else if (key == 6) {
        value = "科幻";
      } else if (key == 7) {
        value = "轻小说";
      } else if (key == 8) {
        value = "历史";
      } else if (key == 9) {
        value = "排行榜";
      }
      if (value != "排行榜") {
        this.$router.push({
          path: "/showsort",
          query: {
            nvtype: value,
            nvpage: "1"
          }
        });
      } else {
        this.$router.push({
          path: "/showrank"
        });
      }
    }
  }
};
</script>
