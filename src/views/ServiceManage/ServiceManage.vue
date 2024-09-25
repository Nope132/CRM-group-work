<template>
  <div class="user-header">
    <div>
      <el-button type="danger" @click="handleAdd">+新增</el-button>
    </div>
    <div>
      <el-form :inline="true" :model="searchForm">
        <el-row>
          <el-form-item label="客户">
            <el-input
              v-model="searchForm.customer"
              placeholder="请输入客户名"
            />
          </el-form-item>
          <el-form-item label="概要">
            <el-input v-model="searchForm.overview" placeholder="请输入概要" />
          </el-form-item>
          <el-form-item label="服务类型">
            <el-select
              v-model="searchForm.serveType"
              placeholder="全部"
              style="width: 120px"
            >
              <el-option label="全部" :value="0" />
              <el-option label="咨询" :value="1" />
              <el-option label="建议" :value="2" />
              <el-option label="投诉" :value="3" />
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="创建日期">
            <el-col :span="11">
              <el-date-picker
                v-model="searchForm.createDateBegin"
                type="date"
                placeholder="选择开始日期"
                style="width: 100%"
              />
            </el-col>
            <el-col :span="1" class="text-center">
              <span class="text-gray-500">----</span>
            </el-col>
            <el-col :span="11">
              <el-date-picker
                v-model="searchForm.createDateEnd"
                type="date"
                placeholder="选择结束日期"
                style="width: 100%"
              />
            </el-col>
          </el-form-item>
          <el-form-item label="状态">
            <el-select
              v-model="searchForm.state"
              placeholder="全部"
              style="width: 120px"
            >
              <el-option label="全部" :value="0" />
              <el-option label="新创建" :value="1" />
              <el-option label="已分配" :value="2" />
              <el-option label="已处理" :value="3" />
              <el-option label="已归档" :value="4" />
            </el-select>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <div>
      <el-button type="primary" @click="handleSerch">查询</el-button>
      <el-button color="#626aef" @click="handleHelp">帮助</el-button>
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
        label="分配给"
        align="center"
        min-width="180"
      >
        <template #default>
          <el-select
            style="width: 100px"
            v-model="tableLabel.name"
            :placeholder="list[0].name"
          >
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.name"
              value="xiaoming"
            />
          </el-select>
          <el-button type="primary" size="small">分配</el-button>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        align="center"
        label="操作"
        min-width="180"
      >
        <template #default>
          <el-button type="success" size="small" @click="handleService()"
            >处理</el-button
          >
          <el-button
            type="warning"
            size="small"
            @click="handleServiceFeedback()"
            >反馈</el-button
          >
          <el-button color="#6ec2fe" size="small" @click="handleServiceShow()"
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
    :title="action == 'add' ? '服务创建' : '编辑用户'"
    width="35%"
    :before-close="handleClose"
  >
    <el-form :inline="true" :model="formUser" ref="userForm">
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="编号"
            prop="name"
            :rules="[{ required: false, message: '' }]"
          >
            <el-input v-model="formUser.name" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="服务类型"
            prop="sex"
            :rules="[{ required: true, message: '性别是必选项' }]"
          >
            <el-select v-model="formUser.sex" placeholder="请选择">
              <el-option label="男" value="0" />
              <el-option label="女" value="1" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="概要"
            prop="age"
            :rules="[
              { required: true, message: '年龄是必填项' },
              { type: 'number', message: '年龄必须是数字' },
            ]"
          >
            <el-input v-model.number="formUser.age" placeholder="请输入年龄" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="客户"
            prop="name"
            :rules="[{ required: true, message: '姓名是必填项' }]"
          >
            <el-input v-model="formUser.name" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="状态"
            prop="age"
            :rules="[
              { required: true, message: '年龄是必填项' },
              { type: 'number', message: '年龄必须是数字' },
            ]"
          >
            <el-input v-model.number="formUser.age" placeholder="请输入年龄" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item
          label="服务请求"
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
            label="创建人"
            prop="addr"
            :rules="[{ required: true, message: '地址是必填项' }]"
          >
            <el-input v-model="formUser.addr" placeholder="请输入地址" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="创建时间"
            prop="birth"
            :rules="[{ required: true, message: '出生日期是必选项' }]"
          >
            <el-date-picker
              v-model="formUser.birth"
              type="date"
              label="出生日期"
              placeholder="请输入"
              style="width: 100%"
            />
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
  <!-- 服务处理表单 -->
  <el-dialog
    v-model="handleServiceVisible"
    title="服务处理"
    width="35%"
    :before-close="handleCloseService"
  >
    <el-form :inline="true" :model="formUser" ref="userForm">
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="编号"
            prop="name"
            :rules="[{ required: false, message: '' }]"
          >
            456
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="服务类型"
            prop="sex"
            :rules="[{ required: true, message: '性别是必选项' }]"
          >
            咨询
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="概要" prop="age">
            询问收音机订单运费承担方式
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="客户" prop="name"> 太阳药业 </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="age"> 已分配 </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="服务请求" prop="addr">
          收音机订单运费如何承担？
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="创建人" prop="addr"> 小明 </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="创建时间" prop="birth">
            2007年12月02日 15时26分58秒
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="分配给" prop="addr"> 旺财 </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="分配时间" prop="birth">
            2007年12月02日 15时26分58秒
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item
          label="服务处理"
          prop="addr"
          :rules="[{ required: true, message: '处理方式是必填项' }]"
        >
          <el-input
            v-model="formUser.addr"
            type="textarea"
            placeholder="请输入处理方式"
          />
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="处理人"
            prop="addr"
            :rules="[{ required: true, message: '处理人是必填项' }]"
          >
            <el-input placeholder="请输入处理人" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="处理时间"
            prop="birth"
            :rules="[{ required: true, message: '处理人是必填项' }]"
          >
            <el-input placeholder="请输入处理时间" />
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
  <!-- 服务反馈表单 -->
  <el-dialog
    v-model="serviceFeedbackVisible"
    title="服务反馈"
    width="35%"
    :before-close="handleCloseServiceFeedBack"
  >
    <el-form :inline="true" :model="formUser" ref="userForm">
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="编号"
            prop="name"
            :rules="[{ required: false, message: '' }]"
          >
            456
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="服务类型"
            prop="sex"
            :rules="[{ required: true, message: '性别是必选项' }]"
          >
            咨询
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="概要" prop="age">
            询问收音机订单运费承担方式
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="客户" prop="name"> 太阳药业 </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="age"> 已分配 </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="服务请求" prop="addr">
          收音机订单运费如何承担？
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="创建人" prop="addr"> 小明 </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="创建时间" prop="birth">
            2007年12月02日 15时26分58秒
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="分配给" prop="addr"> 旺财 </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="分配时间" prop="birth">
            2007年12月02日 15时26分58秒
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="服务处理" prop="addr">
          回电话给刘经理： 根据相关制度，7元/吨*公里内由我们负责，之外由客户负责
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="处理人" prop="addr"> 郭晓梅 </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="处理时间" prop="birth">
            2007年12月02日 15时26分58秒
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="处理结果"
            prop="addr"
            :rules="[{ required: true, message: '处理结果是必填项' }]"
          >
            <el-input placeholder="请输入处理结果" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="满意度"
            prop="birth"
            :rules="[{ required: true, message: '满意度是必填项' }]"
          >
            <el-select v-model="formInline.keyword" placeholder="请选择...">
              <el-option label="☆☆☆☆☆" value="全部" />
              <el-option label="☆☆☆☆" value="beijing" />
            </el-select>
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
  <!-- 服务展示表单 -->
  <el-dialog
    v-model="serviceShowVisible"
    title="服务反馈"
    width="35%"
    :before-close="handleCloseServiceFeedBack"
  >
    <el-form :inline="true" :model="formUser" ref="userForm">
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="编号"
            prop="name"
            :rules="[{ required: false, message: '' }]"
          >
            456
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="服务类型"
            prop="sex"
            :rules="[{ required: true, message: '性别是必选项' }]"
          >
            咨询
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="概要" prop="age">
            询问收音机订单运费承担方式
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="客户" prop="name"> 太阳药业 </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="age"> 已分配 </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="服务请求" prop="addr">
          收音机订单运费如何承担？
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="创建人" prop="addr"> 小明 </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="创建时间" prop="birth">
            2007年12月02日 15时26分58秒
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="分配给" prop="addr"> 旺财 </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="分配时间" prop="birth">
            2007年12月02日 15时26分58秒
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="服务处理" prop="addr">
          回电话给刘经理： 根据相关制度，7元/吨*公里内由我们负责，之外由客户负责
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="处理人" prop="addr"> 郭晓梅 </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="处理时间" prop="birth">
            2007年12月02日 15时26分58秒
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="处理结果" prop="addr">
            处理结果的内容
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="满意度" prop="birth"> ☆☆☆☆☆ </el-form-item>
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
    const searchForm = reactive({
      customer: '',
      overview: '',
      serveType: 0,
      createDateBegin: '',
      createDateEnd: '',
      state: 0
    })
    const tableLabel = reactive([
      {
        prop: "number",
        label: "编号"
      },
      {
        prop: "addr",
        label: "客户",
        width: '240px'
      },
      {
        prop: "age",
        label: "概要",
      },
      {
        prop: "sexLabel",
        label: "服务类型",
      },
      {
        prop: "name",
        label: "创建人",
        width: 200,
      },
      {
        prop: "birth",
        label: "创建日期",
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
      console.log(searchForm)
      // config.name = formInline.keyword;
      // getUserData(searchForm);
    };
    // 控制模态框的显示隐藏
    const dialogVisible = ref(false);
    const handleServiceVisible = ref(false)
    const serviceFeedbackVisible = ref(false)
    const serviceShowVisible = ref(false)
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
      searchForm,
      handleSerch,
      dialogVisible,
      handleServiceVisible,
      serviceFeedbackVisible,
      serviceShowVisible,
      handleClose,
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
