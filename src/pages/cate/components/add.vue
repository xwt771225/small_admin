<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="上级分类" label-width="80px">
          <el-select v-model="form.pid">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option label="顶级分类" :value="0"></el-option>
            <!-- 动态数据 -->
            <el-option v-for="item in list" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称" label-width="80px">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="分类图片" label-width="80px" v-if="form.pid!==0">
          <el-upload
            class="avatar-uploader"
            action="#"
           :on-change="changeImg"
          >
          
          <!-- 将图片地址赋值给变量 -->
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  requestCateAdd,
  requestCateDetail,
  requestCateUpdate
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      list: "cate/list"
    })
  },
  data() {
    return {
      //上传完成后图片的地址
      imageUrl:"",
      //图标集合
      // icons: [
      //   "el-icon-setting",
      //   "el-icon-s-help",
      //   "el-icon-s-operation",
      //   "el-icon-s-grid"
      // ],
      //路由集合
      // urls: [
      //   "/home",
      //   "/menu",
      //   "/role",
      //   "/manage",
      //   "/cate",
      //   "/spec",
      //   "/goods",
      //   "/banner",
      //   "/seckill"
      // ],
      form: {
        pid: 0,
        catename: "",
        img: null,
        status: 1
      }
    };
  },
  methods: {
    ...mapActions({
      requestList: "cate/requestList"
    }),
    //修改图片
changeImg(e){

//上传的文件不能超过2M
if(e.size>2*1024*1024){
  warningAlert("上传文件的图片不能超过2M");
  return;
}
//上传的文件必须是.png.jpg.gif.jpeg
var extname=e.name.slice(e.name.lastIndexOf("."));
// console.log(extname)打印截取的后缀名
var extArr=[".png", ".jpg", ".gif", ".jpeg"];
if(!extArr.some(iteam=>iteam===extname)){
   warningAlert("上传文件必须是图片");
        return;
}
  // console.log(e)
  //file是上传的文件
  var file=e.raw;
  this.imageUrl=URL.createObjectURL(file)
  this.form.img=file;
  // console.log(URL.createObjectURL(file))将一个文件转化为地址
},
    //重置内容
    empty() {
      this.form = {
        pid: 0,
        catename: "",
        img: null,
        status: 1
      };
      this.imageUrl=""
    },
    //取消
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //点击了添加按钮
    add() {
      requestCateAdd(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          //重置form数据
          this.empty();
          //弹框消失
          this.cancel();
          //再次请求list数据
          // this.requestList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //获取某一条数据
    getDetail(id) {
      requestCateDetail({ id: id }).then(res => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl=this.$imgPre+res.data.list.img
      });
    },
    //修改
    update() {
      requestCateUpdate(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.requestList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  },
  mounted() {}
};
</script>
<style scoped lang="stylus">
//  穿透
.add>>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.add>>>.el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>