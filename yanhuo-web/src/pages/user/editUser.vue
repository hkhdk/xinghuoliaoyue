<script lang="ts" setup>
import { ref, reactive, nextTick, watch, toRefs, defineProps } from 'vue'
import { genFileId, ElInput, ElMessage } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile, FormInstance, FormRules, UploadUserFile } from 'element-plus'
import { Plus } from "@element-plus/icons-vue";
//import { useUserStore } from "@/store/userStore";
const emit = defineEmits(["clickUserInfo"]);
const props = defineProps({
  dialogVisible: Boolean,
  userInfo: Object
})
//const userStore = useUserStore();
//使用父组件传递过来的值
const { dialogVisible, userInfo } = toRefs(props)
// const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const form = ref<any>({});
const fileList = ref<UploadUserFile[]>([]);
form.value = { ...userInfo.value };
watch(
  () => userInfo.value,
  (newVal) => {
    form.value = { ...newVal.value };
    console.log(123, form.value);
  }
)

const handleClick = (isConfirm: boolean, data: any) => {
  emit('clickUserInfo', isConfirm, data);
}

const upload = ref<UploadInstance>()

const handleExceed: UploadProps['onExceed'] = (files) => {
  // console.log(files);
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
  // console.log(upload.value);
}

const handleChange = (file, fileList) => {
  console.log('file', file, file.raw);
  if (file.status === 'ready') {

    form.value.avatar = URL.createObjectURL(file.raw);
    fileList.value = [file.raw]; // Add file to fileList

  }
  console.log('FileList:', fileList.value); // Debugging: Output the fileList
}


const handleClose = (tag: string) => {
  form.value.tag.splice(form.value.tag.indexOf(tag), 1)
}

const inputValue = ref('')
const inputVisible = ref(false)
const InputRef = ref<InstanceType<typeof ElInput>>()
const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

const handleInputConfirm = () => {
  if(form.value.tag === null){
    form.value.tag = []
  }
  console.log(inputValue.value);
  if(inputValue.value.length>20){
    ElMessage.error('标签长度不能大于20')
    inputVisible.value = false
    inputValue.value = ''
    return
  }

  if (inputValue.value) {
    form.value.tag.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}
const ruleFormRef = ref<FormInstance>()

interface RuleForm {
  avatar: any,
  username: string
  description: string
  tag: string[]
}

const rules = reactive<FormRules<RuleForm>>({
  avatar: [
    { type: 'any', required: true, message: 'Please input activity form', trigger: 'blur' },
  ],
  username: [
    { required: true, message: '账号不能为空', trigger: 'blur' },
    { min: 2, max: 15, message: '账号不能小于2或大于15个字', trigger: 'blur' },
  ],
  description: [
    // { required: true, message: '个性签名不允许为空', trigger: 'blur' },
    { max: 50, message: '个性签名长度不能大于50字', trigger: 'blur' },
  ],
  // tag: [
  //   {
  //     type: 'array',
  //     // required: true,
  //     message: '标签不允许为空',
  //     trigger: 'change',
  //   },
  // ],
})

import { updateUser } from "@/api/user";
const handleClickSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      let params = new FormData();
      let f = { ...form.value };
      f.tag = f.tag ? f.tag.join(',') : ''
      params.append("data", JSON.stringify(f));
      // params.append("description", f.description);
      // params.append("tag", f.tag.join(','));

      fileList.value.forEach((file: any) => {
        params.append("file", file.raw);
      });
      updateUser(params)
        .then((res: any) => {
          const { data } = res;
          console.log(form, params, data, 'submit!')
          handleClick(false, data)
          ElMessage.success("修改资料成功");
        })
        .catch((error: any) => {
          console.log(error);
          // ElMessage.error(error);
        });
    } else {
      console.log('error submit!', fields)
      // ElMessage.error("");
    }
  })
}
</script>
<template>
  <el-dialog :model-value="dialogVisible" title="编辑个人信息" width="50%" draggable @closed="handleClick(false, false)">
    <el-form ref="ruleFormRef" :model="form" :rules="rules">
      <el-form-item label="头像：" :label-width="formLabelWidth" prop="avatar">
        <!-- http://localhost:88/api/util/oss/saveBatch/0 -->
        <el-upload ref="upload" class="avatar-uploader" action="#" v-model:file-list="fileList" :show-file-list="false"
          :limit="1" :on-exceed="handleExceed" :auto-upload="false" :multiple="false" @change="handleChange">
          <img v-if="form.avatar" :src="form.avatar" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="用户名：" :label-width="formLabelWidth" prop="username">
        <el-input v-model="form.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="个性签名：" :label-width="formLabelWidth" prop="description">
        <el-input v-model="form.description" autocomplete="off" />
      </el-form-item>
      <el-form-item label="标签：" :label-width="formLabelWidth" prop="tag">
        <el-tag v-for="tag in form.tag" :key="tag" closable :disable-transitions="false" @close="handleClose(tag)">
          {{ tag }}
        </el-tag>
        <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" style="width: 100px;" size="small"
          @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" />
        <el-button v-else-if="form.tag ? form.tag.length < 5 : true" class="button-new-tag" size="small" @click="showInput">
          + 新标签
        </el-button>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClick(false, false)">关闭</el-button>
        <el-button type="primary" @click="handleClickSubmit(ruleFormRef)">
          提交
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>



<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  object-fit: cover;
  border-radius: 50%;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>