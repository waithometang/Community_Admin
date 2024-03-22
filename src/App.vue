<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
  
}
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.elmain {
  width: 1300px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
  border: solid 1px #e0e5e5;
}

.router_title {
  text-align: left;
  color: #333333;
  font-size: 16px;
  line-height: 45px;
  text-indent: 10px;
  background-color: white;
  border-bottom: solid 1px #f3f5f5;
  font-weight: normal;
}

.div_mom {
  padding: 20px;
  background: #f3f5f5;
}

.hover:hover {
  color: #32a9ff;
  cursor: pointer;
}

.el-menu {
  border-right: none;
}

.custom-tooltip {
  width: 100% !important;
  height: 10% !important;
  position: absolute;
  top: 0;
  left: 0;
}

.custom-tooltip-item {
  width: 150px;
  height: 50px;
  position: relative;
  float: left;
  margin-left: 20px;
  border-left-style: solid;
  border-left-width: 5px;
}

.custom-tooltip-item:first-child {
  margin-left: 0;
}

.custom-tooltip-item-name {
  width: 80%;
  height: 20px;
  position: absolute;
  top: 0px;
  left: 10px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
}

.custom-tooltip-item-value {
  width: 80%;
  height: 30px;
  position: absolute;
  bottom: 0px;
  left: 10px;
  color: #262626;
  font-size: 22px;
  /*font-weight: bold*/
}
body {
  min-height: 98vh;
}
</style>
