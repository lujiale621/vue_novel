<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-footer-center {
  text-align: center;
}
img {
  height: 200px;
  width: 160px;
}
.daheader {
  margin: 0px 20px;
}
.daheader2 {
  margin: 5px 20px;
}
.name {
  font-size: 20px;
}
.author {
  color: cadetblue;
  margin-top: 5px;
}
.datxt {
  font-size: 12px;
  padding: 10px 0px;
  border-bottom: 2px dotted rgba(231, 228, 228, 0.753);
}
.introduce {
  margin: 10px 20px;
  height: 67px;
  overflow: hidden;
}
.button {
  margin: 10px 5px;
  width: 100px;
}
.button1 {
  margin: 10px 5px;
  width: 100px;
  margin-left: 20px;
}
.list {
  margin-top: 20px;
}
.hreflist {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
.lit {
  color: cadetblue;
  border-bottom: 1px solid rgba(231, 228, 228, 0.753);
}
.bookdetail {
  height: 228px;
  width: 100%;
}
.content {
  display: flex;
  flex-direction: row;
}
.li {
  display: flex;
  flex-direction: row;
}
.href {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
<template>
  <div class="layout">
    <Layout>
      <Content :style="{padding: '0 50px'}">
        <Breadcrumb :style="{margin: '20px 0'}">
          <BreadcrumbItem :to="{ path: '/home' }">Home</BreadcrumbItem>
          <BreadcrumbItem>{{data.tag}}</BreadcrumbItem>
          <BreadcrumbItem>{{data.name}}</BreadcrumbItem>
        </Breadcrumb>
        <Card>
          <div style="min-height: 200px;">
            <div class="content">
              <img :src="data.cover" alt />
              <div class="bookdetail">
                <div class="daheader">
                  <Row>
                    <Col span="6">
                      <div class="name">{{data.name}}</div>
                    </Col>
                    <Col span="6">
                      <div class="author">作者:{{data.author}}</div>
                    </Col>
                  </Row>
                </div>
                <div class="daheader2">
                  <Row>
                    <Col span="6" class="datxt">分类:{{data.tag}}</Col>
                    <Col span="6" class="datxt">状态:{{data.status}}</Col>
                    <Col span="8" class="datxt">更新:{{data.time}}</Col>
                  </Row>
                </div>
                <div class="introduce">
                  <Row>
                    <Col span="18">
                      <div>简介:{{data.introduce}}</div>
                    </Col>
                  </Row>
                </div>
                <div class="content">
                  <Button class="button1" type="info">开始阅读</Button>
                  <Button class="button">放入书架</Button>
                  <Button class="button">txt下载</Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Content>

      <Content :style="{padding: '0 50px'}" class="list">
        <Card>
          <div>
            <Row>
              <Col span="8" v-for="(lit,ix) in links" :key="lit.id" class="lit">
                <div class="li">
                  <Icon type="ios-checkmark" />
                  <div class="href" @click="toread(lit.url,ix)">{{lit.num.slice(0,14)}}</div>
                </div>
              </Col>
            </Row>
          </div>
        </Card>
      </Content>
      <Footer class="layout-footer-center">2020 &copy; Lujiale</Footer>
    </Layout>
  </div>
</template>
<script>
export default {
  name: "navdetail",
  props: {
    data:'',
    links:'',
    parenturl:''
    },
  data() {
    return {

    };
  },
  mounted() {

  },
  methods: {
    toread(value,ix) {
      console.log('parenturl')
      console.log(this.parenturl)
      this.$router.push({
        path: "/readcontent",
        query: {
          url: value,
          index:parseInt(ix),
          parenturl:this.parenturl
        }
      });
    }
  }
};
</script>