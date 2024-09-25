<template>
  <div class="user-header">
    <el-button type="primary" @click="handleAdd">+新增</el-button>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="请输入">
        <el-input v-model="formInline.keyword" placeholder="请输入客户名称" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSerch">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table :data="list" style="width: 100%" height="500px">
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :width="item.width ? item.width : 200"
      />
      <el-table-column fixed="right" label="操作" min-width="180">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button type="danger" size="small" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      small
      background
      layout="prev, pager, next"
      :total="config.total"
      @current-change="changePage"
      class="pager mt-4"
    />
  </div>
  <el-dialog
    v-model="dialogVisible"
    :title="action == 'add' ? '新增用户' : '编辑用户'"
    width="60%"
    :before-close="handleClose"
  >
    <el-form :inline="true" :model="formUser" ref="userForm">
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="编号"
            prop="number"
          >
            <el-input v-model="formUser.number" placeholder="编号为系统自动生成" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="机会来源"
            prop="from"            
          > 
            <el-input v-model.number="formUser.from"  />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="客户名称"
            prop="name"
            :rules="[{ required: true, message: '客户名称是必填项' }]"
          >
            <el-input v-model="formUser.name" placeholder="请输入客户名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="成功几率(%)"
            prop="probability"            
            :rules="[
              { required: true, message: '成功几率是必填项且必须是数字' },
              { type: 'number', message: '成功几率必须是数字' },
            ]"
          >
            <el-input v-model.number="formUser.probability" placeholder="请输入成功几率" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="15">
          <el-form-item
            label="概要"
            prop="summary"
            :rules="[{ required: true, message: '概要是必填项' }]"            
          >
            <el-input style="width: 300px" autosize v-model="formUser.summary" placeholder="请输入概要" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="联系人"
            prop="person"                       
          >
            <el-input v-model="formUser.person" placeholder="请输入联系人名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="联系人电话"
            prop="phonenumber"           
          >
            <el-input v-model.number="formUser.phonenumber" placeholder="请输入联系人电话" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="机会描述"
            prop="chance"    
            :rules="[{ required: true, message: '机会描述是必填项' }] "      
          >
            <el-input style="width: 300px" autosize
            type="textarea" v-model="formUser.chance" placeholder="请输入机会描述" />            
          </el-form-item>
        </el-col>    
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="创建人"
            prop="maker"    
            :rules="[{ required: true, message: '创建人是必填项' }] "      
          >
            <el-input style="width: 300px" v-model="formUser.maker" placeholder="请输入创建人" />
          </el-form-item>
        </el-col> 
        <el-col :span="12">
          <el-form-item
            label="创建时间"
            prop="timemaker"                
            :rules="[{ required: true, message: '创建时间是必选项' }] "      
          >            
            <el-date-picker
              v-model="formUser.timemaker"
              type="date"
              label="创建时间"
              placeholder="请选择"
              style="width: 100%"
            />
          </el-form-item>
        </el-col> 
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="指派给"
            prop="for"                       
          >
            <el-input v-model="formUser.for" placeholder="请输入联系人名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="指派时间"
            prop="fortime"           
          >
            <el-input v-model.number="formUser.fortime" placeholder="请输入联系人电话" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="justify-content: flex-end">
        <el-form-item>
          <el-button type="primary" @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <!-- <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确定</el-button
        >
      </span>
    </template> -->
  </el-dialog>
</template>


<script>
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  reactive,
} from "vue";

export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance();
    const list = ref([]);
    const tableLabel = reactive([
      {
        prop: "number",
        label: "编号",
        width:100
      },
      {
        prop: "name",
        label: "客户名称",
      },
      {
        prop: "summary",
        label: "概要",
        width: 150,
      },
      {
        prop: "chance",
        label: "联系人",
        width: 150,
      },
      {
        prop: "chance",
        label: "联系方式",
        width: 200,
      },
      {
        prop: "chance",
        label: "创建时间",
        width: 200,
      },
    ]);
    onMounted(() => {
      getUserData(config);
    });
    const config = reactive({
      total: 0,
      page: 1,
      name: "",
    });
    const getUserData = async (config) => {
      let res = await proxy.$api.getUserData(config);
      // console.log(res);
      config.total = res.count;
      list.value = res.list.map((item) => {
        item.sexLabel = item.sex === 0 ? "女" : "男";
        return item;
      });
    };
    const changePage = (page) => {
      // console.log(page);
      config.page = page;
      getUserData(config);
    };
    const formInline = reactive({
      keyword: "",
    });
    const handleSerch = () => {
      config.name = formInline.keyword;
      getUserData(config);
    };
    // 控制模态框的显示隐藏
    const dialogVisible = ref(false);
    const handleClose = (done) => {
      ElMessageBox.confirm("确定关闭吗?")
        .then(() => {
          proxy.$refs.userForm.resetFields();
          done();
        })
        .catch(() => {
          // catch error
        });
    };
    // 添加用户的form数据
    const formUser = reactive({
      name: "", // 添加用户的 用户名
      number: "",
      from: "",
      summary: "",
      person: "",
      probability: "",
      phonenumber: "",
      chance: "",
      maker: "",
      timemaker: "",
      for: "",
      fortime:""
    });
    const timeFormat = (time) => {
      var time = new Date(time);
      var year = time.getFullYear();
      var month = time.getMonth() + 1;
      var date = time.getDate();
      function add(m) {
        return m < 10 ? "0" + m : m;
      }
      return year + "-" + add(month) + "-" + add(date);
    };
    // 添加用户
    const onSubmit = () => {
      proxy.$refs.userForm.validate(async (valid) => {
        if (valid) {
          if (action.value == "add") {
            formUser.birth = timeFormat(formUser.birth);
            let res = await proxy.$api.addUser(formUser);
            if (res) {
              // console.log(proxy.$refs);
              dialogVisible.value = false;
              proxy.$refs.userForm.resetFields();
              getUserData(config);
            }
          } else {
            // 编辑的接口
            formUser.sex == "男" ? (formUser.sex = 1) : (formUser.sex = 0);
            let res = await proxy.$api.editUser(formUser);
            if (res) {
              // console.log(proxy.$refs);
              dialogVisible.value = false;
              proxy.$refs.userForm.resetFields();
              getUserData(config);
            }
          }
        } else {
          ElMessage({
            showClose: true,
            message: "请输入正确的内容",
            type: "error",
          });
        }
      });
    };
    // 取消
    const handleCancel = () => {
      dialogVisible.value = false;
      proxy.$refs.userForm.resetFields();
    };
    // 区分编辑和新增
    const action = ref("add");
    // 编辑用户
    const handleEdit = (row) => {
      // 浅拷贝

      action.value = "edit";
      dialogVisible.value = true;
      row.sex == 1 ? (row.sex = "男") : (row.sex = "女");
      proxy.$nextTick(() => {
        Object.assign(formUser, row);
      });
    };
    // 新增用户
    const handleAdd = () => {
      action.value = "add";
      dialogVisible.value = true;
    };
    // 删除用户
    const handleDelete = (row) => {
      ElMessageBox.confirm("你确定删除吗?")
        .then(async () => {
          await proxy.$api.deleteUser({
            id: row.id,
          });

          ElMessage({
            showClose: true,
            message: "删除成功",
            type: "success",
          });
          getUserData(config);
        })
        .catch(() => {
          // catch error
        });
    };
    return {
      list,
      tableLabel,
      config,
      changePage,
      formInline,
      handleSerch,
      dialogVisible,
      handleClose,
      formUser,
      onSubmit,
      handleCancel,
      action,
      handleEdit,
      handleAdd,
      handleDelete,
    };
  },
});
</script>

<style lang="less" scoped>
.table {
  position: relative;
  height: 520px;
  .pager {
    position: absolute;
    right: 0;
    bottom: -20px;
  }
}
.user-header {
  display: flex;
  justify-content: space-between;
}
</style>
