<template>
  <div class="app-container">
    <div class="header"><h1>Welcome, {{ user.name }}</h1></div>
    <div v-for="(item, $index) in errors" :key="$index"> {{ item.confirm_password[0] }} {{ item.password[0] }} {{ item.old_password[0] }} </div>
    <el-form ref="form" :model="form" label-width="300px">
      <el-form-item label="Current Password">
        <el-input v-model="form.old_password" />
      </el-form-item>
      <el-form-item label="New Password">
        <el-input v-model="form.password" />
      </el-form-item>
      <el-form-item label="Confirm Password">
        <el-input v-model="form.confirm_password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">
          Update
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import UserResource from '@/api/userChangePassword';
const userResource = new UserResource();

export default {
  data() {
    return {
      user: {},
      form: {
        old_password: '',
        password: '',
        confirm_password: '',
      },
      errors: [],
    };
  },
  watch: {
    '$route': 'getUser',
  },
  created() {
    this.getUser();
  },
  methods: {
    async getUser() {
      const data = await this.$store.dispatch('user/getInfo');
      this.user = data;
    },
    resetForm() {
      Object.keys(this.form).forEach((key) => {
        this.form[key] = '';
      });
    },
    onSubmit() {
      userResource.changePassword(this.form).then(response => {
        this.resetForm();
        this.$message({
          type: 'success',
          message: 'Category info has been updated successfully',
          duration: 5 * 1000,
        });
      }).catch(error => {
        console.log(error);
      });
    },
  },
};
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

