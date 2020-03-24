<style lang="less" scoped>
.title {
  text-align: center;
}
p {
  margin: 12px;
  color: #49423a;
  font-size: 20px;
}
.content {
  padding: 0px 30px;
  background: #f1f1f1;
}
.center {
  display: flex;
  justify-content: center;
}
.button {
  width: 100%;
}
html {
  margin: 0px;
  width: 100%;
  height: 100%;
}
</style>
<template>
  <div class="layout">
    <Layout>
      <Content>
        <div class="content">
          <Scroll class="scroll" :on-reach-top="pageto" :on-reach-bottom="pageto" height="1000">
            <div v-for="(it,index) in list" :key="index">
              <div class="title">
                <h1>{{it.title}}</h1>
              </div>
              <hr />
              <div>
                <p v-for="(text,index) in it.bookcontent" :key="index">{{text}}</p>
              </div>
            </div>
          </Scroll>
        </div>
      </Content>
    </Layout>
  </div>
</template>
<script>
export default {
  
  data() {
    return {
      url: "",
      bookcontent: "",
      title: "",
      index: "",
      parenturl: "",
      bookdetail: "",
      artlinks: "",
      list: [],
      isloading: false,
      value2: false
    };
  },
  created() {
    this.url = this.$route.query.url;
    this.index = this.$route.query.index;
    this.parenturl = this.$route.query.parenturl;
    console.log('parenturl:')
    console.log(this.parenturl)
  },
  methods: {
    read(dex) {
      var par = "";
      par = this.artlinks[dex].url;
    },
    toread(isinit) {
      this.isloading = true;
      var self = this;
      var value = "/api/e1bookcontent";
      var par = "";
      if (!isinit) {
         console.log("加载下一章")
        par = this.artlinks[this.index].url;
        console.log(par)
      } else {
        par = this.url;
      }

      this.axios
        .get(value, {
          params: {
            xscontent: par
          }
        })
        .then(function(rest) {
          self.isloading = false;
          if (rest.data != null) {
            if (rest.data.code != 0) {
              if (isinit) {
                var unit = {};
                self.bookcontent = rest.data.data.content;
                self.title = rest.data.data.num;
                unit.title = self.title;
                unit.bookcontent = self.bookcontent;
                self.list.push(unit);
              } else {
                var unit = {};
                var content = rest.data.data.content;
                var title = rest.data.data.num;
                unit.title = title;
                unit.bookcontent = content;
                self.list.push(unit);
                console.log(self.list);
              }
            }else{
              console.log('再次加载')
              self.toread(false)
            }
          }
        });
    },
    init() {
          this.$Spin.show();
      var value = "api/e1bookdetail";
      var self = this;
      this.axios
        .get(value, {
          params: {
            xsdetail: this.parenturl
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
            }else{
              console.log('再次加载')
              self.init()
            }
          }
        });
    },
    pageto() {
      var tag = "next";
      return new Promise(resolve => {
        if (this.isloading == false) {
          if (tag == "pre") {
            this.index = parseInt(this.index) - 1;

            this.toread(false);
          } else if (tag == "next") {
            this.index = parseInt(this.index) + 1;
            console.log("index:" + this.index);
            this.toread(false);
          }
        }
        setTimeout(() => {
          resolve();
        }, 2000);
      });
    }
  },
  mounted() {
    var value = "/api/e1bookcontent";
    this.toread(true);
    this.init();
    console.log("mounted");
  }
};
</script>