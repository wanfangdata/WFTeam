export default {
    name: 'project',
    data() {
        return {
            projects: [],
            dialogFormVisible: false,
            addForm: {
                projectName: '',
                projectKey: ''
            },
            rules: {
                projectName: [
                    { required: true, message: '请输入项目名', trigger: 'blur' },
                    { max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                ],
                projectKey: [
                    { required: true, message: '请输入项目Key', trigger: 'blur' },
                    { min: 2, max: 50, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    mounted() {
        this.getProjects();
    },
    methods: {
        addProject(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$http.post('/api/project', this.addForm)
                        .then(response => {
                            console.log(response);
                        })
                        .catch(error => {
                            if (error.response) {
                                // The request was made and the server responded with a status code 
                                // that falls out of the range of 2xx 
                                console.log(error.response.data);
                                console.log(error.response.status);
                                console.log(error.response.headers);
                            } else if (error.request) {
                                // The request was made but no response was received 
                                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of 
                                // http.ClientRequest in node.js 
                                console.log(error.request);
                            } else {
                                // Something happened in setting up the request that triggered an Error 
                                console.log('Error', error.message);
                            }
                            console.log(error.config);
                        });
                } else {

                    return false;
                }
            });
        },
        getProjects() {
            this.projects = [
                { projectKey: 'Project1', projectName: '项目1', hours: 16 }
            ];
        }
    }
}