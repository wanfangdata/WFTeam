<template>
    <div class="login">
        <el-card style="width: 400px;">
            <div slot="header" class="clearfix">
                <span class="h1" style="line-height: 36px;">Login</span>
                <el-button type="primary" style="float:right;" @click="login">登入</el-button>
            </div>
            <el-form :model="loginForm" :rules="loginFormRules" ref="loginForm">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="loginForm.userName"></el-input>
                </el-form-item>
            </el-form>
        </el-card>
    
        <el-dialog title="完善资料" :visible.sync="profileFormVisible" size="tiny">
            <el-form :model="profileForm" :rules="profileFormRules" ref="profileForm">
                <el-form-item label="真实姓名" prop="realName">
                    <el-input v-model="profileForm.realName"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="profileFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="completeProfile()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import bus from '../bus.js';

export default {
    data() {
        return {
            loginForm: {
                userName: ''
            },
            loginFormRules: {
                userName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
                ]
            },
            profileFormVisible: false,
            profileForm: {
                realName: ''
            },
            profileFormRules: {
                realName: [
                    { required: true, message: '请输入真实姓名', trigger: 'blur' },
                    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                ]
            }
        };
    },
    mounted() { },
    methods: {
        login() {
            this.$refs['loginForm'].validate((valid) => {
                if (valid) {
                    this.$http.post('/api/user/login', this.loginForm)
                        .then(response => {
                            let user = response.data;

                            // 保存认证信息
                            this.$http.defaults.headers.common['api_key'] = user.userName;

                            if (!user.realName) {
                                this.profileFormVisible = true;
                                return false;
                            }
                            else {
                                this.$notify({
                                    message: '正在登入...',
                                    type: 'success'
                                });
                                bus.$emit('loginComplete', user);
                                this.$router.push('/');
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
                else {
                    return false;
                }
            });
        },
        completeProfile() {
            this.$refs['profileForm'].validate((valid) => {
                if (valid) {
                    this.$http.put('/api/user/profile', this.profileForm)
                        .then(response => {
                            this.$notify({
                                message: '正在登入...',
                                type: 'success'
                            });
                            bus.$emit('loginComplete', { userName: this.loginForm.userName, realName: this.profileForm.realName });
                            this.$router.push('/');
                        })
                        .catch(error => {
                            console.log(error);

                        });
                }
                else {
                    return false;
                }
            });
        }
    }
}
</script>

<style>
.login {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
