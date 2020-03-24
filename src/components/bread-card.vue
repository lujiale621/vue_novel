<style lang="less" scoped>
.title {
  height: 32px;
  background: #f7f7f7;
  color: #666;
  line-height: 32px;
  border: 1px solid #d8d8d8;
  border-top: 2px solid #b4cdd2;
}
.em {
  padding-left: 10px;
  font-size: 10px;
  font-style: normal;
}
.label {
  height: 16px;
  width: 4px;
  background: #75a4b4;
  margin-left: 12px;
}
li {
  height: 24px;
  overflow: hidden;
}
img {
  box-shadow: 1px 1px 2px #bbb;
  border-radius: 0.3em;
  height: 100%;
  width: 100%;
  margin-top: 10px;
}
.bookname {
  color: rgb(53, 174, 230);
  font-size: 15px;
  padding: 0px 10px;
  overflow: hidden;
  height: 24px;
}
.introduce {
  font-size: 11px;
  padding: 5px 10px;
  height: 85px;
  overflow: hidden;
}
.breadcard {
  padding: 0px 10px;
  margin-top: 10px;
}
.layout {
  border: 1px solid #d8d8d8;
  margin: 5px;
}
</style>
<template>
  <div class="layout">
    <Layout>
      <Content>
        <Row>
          <Col span="24">
            <div>
              <div class="title">
                <span class="label"></span>
                <em>{{mtype}}</em>
              </div>
              <div class="breadcard">
                <Row>
                  <Col span="12">
                    <div>
                      <Row>
                        <Col span="8">
                          <img :src="box[0].cover" alt />
                        </Col>
                        <Col span="16">
                          <div class="bookname" @click="todetail(box[0].url)">{{box[0].title}}</div>
                          <div class="introduce">简介:{{box[0].introduce}}...</div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col span="12">
                    <div>
                      <Row>
                        <Col span="8">
                          <img :src="box[1].cover" alt />
                        </Col>
                        <Col span="16">
                          <div class="bookname" @click="todetail(box[1].url)">{{box[1].title}}</div>
                          <div class="introduce">简介:{{box[1].introduce}}...</div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>
              <div class="breadcard">
                <Row>
                  <Col span="12">
                    <ul style="list-style: none;">
                      <li
                        v-for="item in box.slice(2,7)"
                        :key="item.id"
                        @click="todetail(item.url)"
                      >{{item.type}} {{item.title}}</li>
                    </ul>
                  </Col>
                  <Col span="12">
                    <ul style="list-style: none;">
                      <li
                        v-for="item in box.slice(7,12)"
                        :key="item.id"
                        @click="todetail(item.url)"
                      >{{item.type}} {{item.title}}</li>
                    </ul>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  </div>
</template>
<script>
export default {
  name: "bread",
  props: {
    mtype: String,
    mtag: String
  },
  data() {
    return {
      box: [
        "url",
        "title",
        "cover",
        "type",
        "statue",
        "textsize",
        "lastupdata",
        "lastupdatalink",
        "introduce",
        "updatatime"
      ]
    };
  },
  methods: {
    todetail: function(value) {
      this.$router.push({
        path: "/detail",
        query: {
          url: value
        }
      });
    },
    load(){
        var self = this;
    var value = "";
    var fenlei = "";
    value = "api/e1booksort";
    if (this.mtype == "都市") {
      fenlei = "dushi";
    } else if (this.mtype == "玄幻") {
      fenlei = "xuanhuan";
    } else if (this.mtype == "言情") {
      fenlei = "yanqing";
    } else if (this.mtype == "武侠") {
      fenlei = "wuxia";
    } else if (this.mtype == "唯美") {
      fenlei = "danmei";
    } else if (this.mtype == "科幻") {
      fenlei = "kehuan";
    } else if (this.mtype == "历史") {
      fenlei = "lishi";
    } else if (this.mtype == "轻小说") {
      fenlei = "lightnovel";
    }  
    this.axios
      .get(value, {
        params: {
          page: "1",
          xsfenlei: fenlei
        }
      })
      .then(function(rest) { 
        if (rest.data != null) {
          if (rest.data.code != 0) {
            self.box = rest.data.data.list;
          }else{
              console.log("再次加载")
            self.load()
          }
        }
      });
  },
  },
  mounted() {
    this.load()
  }
};
</script>