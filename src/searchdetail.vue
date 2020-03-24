<style lang="less" scoped>
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
  float: right;
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
img {
  height: 130px;
  width: 110px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 15px;
}

.name {
  font-size: 18px;

  color: #3f8d94;
}
.time {
  width: 60px;
  color: #888;
  font-size: 8px;
  text-align: right;
  line-height: 29px;
}
.introduce {
  overflow: hidden;
  height: 56px;
  clear: both;
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 12px;
  color: #888;
}
.coverpar {
  text-align: center;
}
.card {
  border-top: 1px solid #eee;
  height: 148px;
}
.detaildata {
  clear: both;
}
.tag {
  font-size: 12px;
  float: left;
  margin-right: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
}
.newart {
  color: #3f8d94;
  font-size: 12px;
  overflow: hidden;
}
.title {
  display: flex;
  flex-direction: row;
}
</style>
<template>
  <div class="layout">
    <Layout>
      <Content>
        <div class="layout">
          <Layout>
            <Header>
              <Menu mode="horizontal" theme="dark" active-name="1">
                <div class="layout-logo">brand</div>
                <div class="layout-nav">
                  <MenuItem name="1">
                    <a href="http://47.116.1.19:8767/swagger-ui.html">
                      <Icon type="ios-navigate"></Icon>API 文档
                    </a>
                  </MenuItem>
                </div>
              </Menu>
            </Header>
            <Content>
              <div class="bg">
                <div class="nav-search">
                  <Input
                    size="large"
                    search
                    enter-button
                    placeholder="搜索关键字"
                    v-model="searchname"
                    @on-search="search"
                  />
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
        <Breadcrumb :style="{margin: '20px 20px'}">
          <BreadcrumbItem :to="{ path: '/home' }">Home</BreadcrumbItem>
          <BreadcrumbItem>搜索结果</BreadcrumbItem>
        </Breadcrumb>
        <Card>
          <Row>
            <Col v-for="item in res" :key="item.id" span="12" class="card">
              <Row>
                <Col span="8" class="coverpar">
                  <img :src="item.cover" alt />
                </Col>
                <Col span="16">
                  <div class="title">
                    <div class="name" @click="toreaddetail(item.url)">{{item.name}}</div>
                    <div class="time">{{item.time}}</div>
                  </div>
                  <div class="detaildata">
                    <div class="tag">类型:{{item.tag}}</div>
                    <div class="tag">状态:{{item.status}}</div>
                  </div>
                  <div class="introduce">{{item.introduce}}</div>
                  <div class="newart">最新章节:{{item.num.slice(0,13)}}...</div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Content>
    </Layout>
  </div>
</template>
<script>
import navheader from "./components/nav-header";

export default {
  data() {
    return {
      searchname: "",
      res: ""
    };
  },
  created() {
    this.searchname = this.$route.query.searchname;
  },
  reload() {
    console.log("reload");
  },
  mounted() {
    this.loaddata();
  },
  methods: {
    loaddata() {
      this.$Spin.show();
      var value = "api/e1searchbook";
      var self = this;
      this.axios
        .get(value, {
          params: {
            xsname: this.searchname
          }
        })
        .then(function(rest) {
          self.$Spin.hide();
          if (rest.data != null) {
            if (rest.data.code != 0) {
              self.res = rest.data.data.list;
            }
          }
        });
    },
    search: function() {
      this.loaddata();
    },
    toreaddetail: function(value) {
      this.$router.push({
        path: "/detail",
        query: {
          url: value
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
  },
  components: { navheader }
};
</script>