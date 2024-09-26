<template>
  <div class="user-header">
    <div>
      <el-button type="danger" @click="handleAdd">+新增</el-button>
    </div>
    <div>
      <el-form :inline="true" :model="formInline">
        <el-row>
          <el-form-item label="客户">
            <el-input v-model="formInline.keyword" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="客户经理">
            <el-input v-model="formInline.keyword" placeholder="请输入用户名" />
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <div>
      <el-button type="primary" @click="handleSerch">查询</el-button>
      <el-button color="#626aef" @click="handleSerch">帮助</el-button>
    </div>
  </div>
  <div class="table">
    <!-- 表格部分 -->
    <el-table :data="list" style="width: 100%" height="500px">
      <el-table-column
          v-for="item in tableLabel"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          :width="item.width ? item.width : 125"
          :sortable="item.prop == 'number' ? true : false"
          align="center"
      />
      <el-table-column
          fixed="right"
          align="center"
          label="操作"
          min-width="180"
      >
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
            >
            <el-button type="danger" size="small" @click="handleDelete(scope.row)"
            >删除</el-button
            >
            <el-button color="#6ec2fe" size="small" @click="handleServiceShow(scope.row)"
            >查看</el-button
            >
          </template>


      </el-table-column>
    </el-table>
    <!-- 分页管理部分 -->
    <el-pagination
        small
        background
        layout="prev, pager, next"
        :total="config.total"
        @current-change="changePage"
        class="pager mt-4"
    />
  </div>
  <!-- 新增服务表单 -->
  <el-dialog
      v-model="dialogVisible"
      :title="action == 'add' ? '客户创建' : '编辑客户信息'"
      width="35%"
      :before-close="handleClose"
  >
    <el-form :inline="true" :model="formUser" ref="userForm">
      <el-row>
        <el-col :span="12">
          <el-form-item
              label="编号"
              prop="number"
              :rules="[{ required: false, message: '' }]"
          >
            <el-input v-model="formUser.name" placeholder="请输入编号" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
              label="客户"
              prop="name"
              :rules="[
              { required: true, message: '客户是必填项' },
            ]"
          >
            <el-input v-model="formUser.name" placeholder="请输入客户名称" />
          </el-form-item>
        </el-col>
      </el-row>


      <el-row>
        <el-col :span="12">
          <el-form-item
              label="客户经理"
              prop="name"
              :rules="[{ required: true, message: '客户经理是必填项' }]"
          >
            <el-input v-model="formUser.name" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
              label="银行账号"
              prop="number"
              :rules="[
              { required: true, message: '银行账号是必填项' },
              { type: 'number', message: '银行账号必须是数字' },
            ]"
          >
            <el-input v-model.number="formUser.age" placeholder="请输入银行账号" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item
            label="地址"
            prop="addr"
            :rules="[{ required: true, message: '地址是必填项' }]"
        >
          <el-input
              v-model="formUser.addr"
              type="textarea"
              placeholder="请输入地址"
          />
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
              label="电话"
              prop="number"
              :rules="[{ required: true, message: '电话是必填项' }]"
          >
            <el-input v-model.number="formUser.age" placeholder="请输入电话号码" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="justify-content: flex-end">
        <el-form-item>
          <el-button type="primary" @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
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
  <!-- 编辑客户信息表单 -->
  <el-dialog
      v-model="handleServiceVisible"
      title="编辑客户信息"
      width="35%"
      :before-close="handleCloseService"
  >
    <el-form :inline="true" :model="formUser" ref="userForm">
      <el-row>
        <el-col :span="12">
          <el-form-item
              label="编号"
              prop="number"
              :rules="[{ required: false, message: '' }]"
          >
            <el-input v-model="formUser.name" placeholder="请输入编号" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
              label="客户"
              prop="name"
              :rules="[
              { required: true, message: '客户是必填项' },
            ]"
          >
            <el-input v-model="formUser.name" placeholder="请输入客户名称" />
          </el-form-item>
        </el-col>
      </el-row>


      <el-row>
        <el-col :span="12">
          <el-form-item
              label="客户经理"
              prop="name"
              :rules="[{ required: true, message: '客户经理是必填项' }]"
          >
            <el-input v-model="formUser.name" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
              label="银行账号"
              prop="number"
              :rules="[
              { required: true, message: '银行账号是必填项' },
              { type: 'number', message: '银行账号必须是数字' },
            ]"
          >
            <el-input v-model.number="formUser.age" placeholder="请输入银行账号" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item
            label="地址"
            prop="addr"
            :rules="[{ required: true, message: '地址是必填项' }]"
        >
          <el-input
              v-model="formUser.addr"
              type="textarea"
              placeholder="请输入地址"
          />
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
              label="电话"
              prop="number"
              :rules="[{ required: true, message: '电话是必填项' }]"
          >
            <el-input v-model.number="formUser.age" placeholder="请输入电话号码" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="justify-content: flex-end">
        <el-form-item>
          <el-button type="primary" @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
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
<!--查看客户信息-->
  <el-dialog
      v-model="serviceShowVisible"
      title="客户信息"
      width="80%"
      :before-close="handleCloseServiceFeedBack"
  >
    <div>
      <el-button type="danger" @click="handleServiceConnectShow(row)">联系人</el-button>
      <el-button type="primary" @click="handleAdd">历史订单</el-button>
      <el-button color="#626aef" @click="handleAdd">交往记录</el-button>
    </div>
    <el-form :inline="true" :model="formUser" ref="userForm">
      <el-row>
        <el-col :span="12">
          <el-form-item
              label="编号"
              prop="name"
              :rules="[{ required: false, message: '' }]"
          >

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
              label="客户"
              prop="sex"
              :rules="[{ required: true, message: '性别是必选项' }]"
          >

          </el-form-item>
        </el-col>
      </el-row>
      <el-dialog
          v-model="serviceConnectShowVisible"
          title="联系人信息"
          width="80%"
          :before-close="handleCloseServiceShow"
      >
      <el-table :data="list" style="width: 100%" height="500px">
          <el-table-column
              v-for="item in tableConnect"
              :key="item.prop"
              :label="item.label"
              :prop="item.prop"
              :width="item.width ? item.width : 125"
              :sortable="item.prop == 'number' ? true : false"
              align="center"
          />
          <el-table-column
              fixed="right"
              align="center"
              label="操作"
              min-width="180"
          >
          </el-table-column>
        </el-table>
      </el-dialog>
      <el-row>
        <el-col :span="12">
          <el-form-item label="客户经理" prop="age">                 </el-form-item>
        </el-col>
        <el-form-item label="地址" prop="addr">                   </el-form-item>
      </el-row>
      <el-row>


        <el-col :span="12">
          <el-form-item label="电话" prop="birth">

          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="银行账号" prop="addr">  </el-form-item>
        </el-col>
      </el-row>
      <el-row style="justify-content: flex-end">
        <el-form-item>
          <el-button type="primary" @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-row>
    </el-form>
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
        label: "编号"
      },
      {
        prop: "name",
        label: "客户",
        width: '240px'
      },
      {
        prop: "name",
        label: "客户经理",
      },
      {
        prop: "birth",
        label: "上次下单时间",
      },
      {
        prop: "name",
        label: "创建人",
        width: 200,
      },
      {
        prop: "addr",
        label: "状态",
        width: 320,
      },
    ]);
    const tableConnect = reactive([
      {
        prop: "name",
        label: "姓名",
        width: '240px'
      },
      {
        prop: "sex",
        label: "性别"
      },

      {
        prop: "name",
        label: "职位",
      },
      {
        prop: "number",
        label: "办公电话",
      },
      {
        prop: "number",
        label: "手机",
        width: 200,
      },
      {
        prop: "addr",
        label: "状态",
        width: 320,
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
      console.log(res);
      config.total = res.count;
      list.value = res.list.map((item) => {
        item.sexLabel = item.sex === 0 ? "女" : "男";
        return item;
      });
      // console.log(list)
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
    const handleServiceVisible = ref(false)
    const serviceFeedbackVisible = ref(false)
    const serviceShowVisible = ref(false)
    const serviceConnectShowVisible = ref(false)
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
    const handleCloseService = () => {
      handleServiceVisible.value = false
    }
    const handleCloseServiceFeedback = () => {
      serviceFeedbackVisible.value = false
    }
    const handleCloseServiceShow = () => {
      serviceShowVisible.value = false
    }

    // 添加用户的form数据
    const formUser = reactive({
      name: "", // 添加用户的 用户名
      age: "",
      sex: "",
      birth: "",
      addr: "",
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
    // 进行服务的处理
    const handleService = () => {
      handleServiceVisible.value = true;
    }
    // 进行服务的反馈
    const handleServiceFeedback = () => {
      serviceFeedbackVisible.value = true;
    }
    // 进行服务的展示
    const handleServiceShow = () => {
      serviceShowVisible.value = true;
    }
    const handleServiceConnectShow = (row) => {
      // 根据需要可以传递row以便显示特定信息
      serviceConnectShowVisible.value = true;
      // 也可以在这里设置与row相关的显示数据
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
    const handleShow = () => {
      action.value = "add";
      dialogVisible.value = true;
    };
    return {
      list,
      tableLabel,
      tableConnect,
      config,
      changePage,
      formInline,
      handleSerch,
      handleShow,
      dialogVisible,
      handleServiceVisible,
      serviceFeedbackVisible,
      serviceShowVisible,
      serviceConnectShowVisible,
      handleClose,
      handleServiceConnectShow,
      handleService,
      handleServiceShow,
      handleServiceFeedback,
      handleCloseService,
      handleCloseServiceFeedback,
      handleCloseServiceShow,
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
