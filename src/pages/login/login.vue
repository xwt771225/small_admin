<template>
   <div class="login">
    <div class="con">
      <h3>登录</h3>
      <el-input class="input" clearable></el-input>
      <el-input class="input" clearable show-password></el-input>
      <div class="btn-box">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {

components: {},
  data() {
    return {};
  },
  methods: {
      login(){
          this.$router.push("/")
      }
  },
  mounted() {},
}
</script>

<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #553444, #303d60);
}
.con {
  width: 380px;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
h3 {
  line-height: 80px;
  font-size: 28px;
  text-align: center;
}
.input {
  margin-bottom: 40px;
}
.btn-box {
  text-align: center;
}
</style>