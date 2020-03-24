<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.content {
  height: 300px;
  width: 100%;
}
.nav-banner {
  height: 300px;
  background: #ffffff;
}
.nav-rank {
  height: 300px;
  background: #423e3e;
}

.rankli {
  display: flex;
  flex-wrap: wrap;
  color: rgb(216, 147, 20);
}
a {
  color: #ffffff;
}
ol {
  margin-left: 10px;
}
li {
  margin: 5px 20px;
}
img {
  height: 300px;
  width: 100%;
  margin: 0;
}
</style>
<template>
  <div class="layout">
    <Layout>
      <Layout>
        <Content class="content">
          <Row>
            <Col span="14">
              <div class="nav-banner">
                <Carousel autoplay loop :autoplay-speed="speed">
                  <CarouselItem v-for="item in bannercover" v-bind:key="item.id">
                    <img :src="item" alt />
                  </CarouselItem>
                </Carousel>
              </div>
            </Col>
            <Col span="10">
              <div class="nav-rank">
                <Tabs value="name1" color="red">
                  <TabPane label="点击排行榜" name="name1">
                    <div>
                      <ol class="rankli">
                        <li v-for="data in rex1" v-bind:key="data.id">
                          <a @click="todetail(data.z_href)">{{data.z_title}}</a>
                        </li>
                      </ol>
                    </div>
                  </TabPane>
                  <TabPane label="推荐排行榜" name="name2">
                    <div>
                      <ol class="rankli">
                        <li v-for="data in rex2" v-bind:key="data.id">
                          <a @click="todetail(data.z_href)">{{data.z_title}}</a>
                        </li>
                      </ol>
                    </div>
                  </TabPane>
                  <TabPane label="收藏排行榜" name="name3">
                    <div>
                      <ol class="rankli">
                        <li v-for="data in rex3" v-bind:key="data.id">
                          <a @click="todetail(data.z_href)">{{data.z_title}}</a>
                        </li>
                      </ol>
                    </div>
                  </TabPane>
                </Tabs>
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
export default {
  name: "bannerrank",
  data() {
    return {
      bannercover: [
        "/static/pictures/banner/3.jpg",
        "/static/pictures/banner/1.jpg",
        "/static/pictures/banner/2.jpg"
      ],
      value2: 0,
      rex1: "",
      rex2: "",
      rex3: "",
      speed: 8000
    };
  },
  mounted() {
    this.load()
  },
  methods: {
    load(){
          var self = this;
    var value = "";
    var fenlei = "";
    value = "api/e1bookrank2";
    this.axios
      .get(value, {
        params: {}
      })
      .then(function(rest) {
        if (rest.data != null) {
          if (rest.data.code != 0) {
            var rex = rest.data.data.list;
            self.rex1 = rex[0].ranklist;
            self.rex2 = rex[1].ranklist;
            self.rex3 = rex[2].ranklist;
          }else{
              console.log("再次加载")
            self.load()
          }
        }
      });
    },
    todetail: function(value) {
      this.$router.push({
        path: "/detail",
        query: {
          url: value
        }
      });
    }
  }
};
</script>
