<template>
  <div class="row">
    <router-view></router-view>
  </div>
</template>
<script>
// import Navbar from "./components/navbar";

export default {
  name: "app",
  data() {
    return {
    };
  },
  components: {
    // Navbar,
  },
  created() {
  },
  methods: {
  },
};
</script>
<style>
* {
  box-sizing: border-box;
}
body{
  width:100%;
  min-height: 100vh;
  margin: 0 auto;
}
a{
  text-decoration: none;
}
.v-switch-core{
  width: 30px !important;
  height: 16px !important;
}
.v-switch-button{
  width: 12px !important;
  height: 12px !important;
  top: -1px !important;
  left: 0 !important;
  transform: translate3d(16px, 3px, 0px) !important;
}
.tag-loading{
  display:inline-block;position: fixed;bottom: 0;right: 0;background:black;color: white;padding: 3px 12px;border-top-left-radius: 8px;
}
.html-body{
    width: 100%;
    display: inline-block;
    position: relative;
}
.html-body img{
    max-width: 100% !important;
}
th, td{
  padding: 6px;
}
tr{
  border: 1px solid #ddd;
}
.hover{
  cursor: pointer;
  color: #000
}
.hover:hover{
  color: var(--success)
}
/* table thead{
  border-top: 3px solid var(--primary);
  background: var(--primary-light);
}
table thead th{
  color: var(--primary);
}
.ql-align-center{
  text-align: center;
}
.html-body p{
  font-size: 15px;
  line-height: 26px;
  margin-bottom: 15px;
}
.post-meta span{
    font-size: 12px;
    color: #a3a3a3;
    margin-right: 8px;
    padding-right: 10px;
    border-right: 1px solid #ccc;
    line-height: 12px;
    display: inline-block;
}
.post-meta span.post-date{
    border-right: 0;
}
.post-title {
    font-size: 30px !important;
    line-height: 40px;
    padding: 15px 0 8px;
    margin: 0;
}
.post-title{
    font-weight: 700;
}
.content-preview{
    font-family: "Battambang",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif !important;
}
.content-preview iframe{
  max-width: 100%;
} */
@media screen and (max-width: 1000px) {
  .body{
    width: 100%;
    max-width: 100%;
    min-height: 100%;
  }
}
</style>