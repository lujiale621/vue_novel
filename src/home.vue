<style lang="less" scoped>
</style>
<template>
  <div class="layout">
    <layout>
      <Content>
        <navheader class="navheader"></navheader>
        <bannerrank></bannerrank>
        <div>
          <Row>
            <Col span="12">
              <bread mtype="都市" mtag="最热"></bread>
            </Col>
            <Col span="12">
              <bread mtype="玄幻" mtag="最热"></bread>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <bread mtype="言情" mtag="最热"></bread>
            </Col>
            <Col span="12">
              <bread mtype="武侠" mtag="最热"></bread>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <bread mtype="唯美" mtag="最热"></bread>
            </Col>
            <Col span="12">
              <bread mtype="科幻" mtag="最热"></bread>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <bread mtype="轻小说" mtag="最热"></bread>
            </Col>
            <Col span="12">
              <bread mtype="历史" mtag="最热"></bread>
            </Col>
          </Row>
        </div>
      </Content>
    </layout>
  </div>
</template>
<script>
import navheader from "./components/nav-header";
import bannerrank from "./components/banner-rank";
import bread from "./components/bread-card";
export default {
  name: "home",

  data() {
    return {};
  },
  components: { navheader, bannerrank, bread }
};
</script>
