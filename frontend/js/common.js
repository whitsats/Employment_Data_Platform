const showToast = (msg, level) => {
    const mytoast = document.querySelector(".my-toast");
    mytoast.classList.remove(
        "bg-primary",
        "bg-success",
        "bg-warning",
        "bg-danger"
    );
    mytoast.classList.add("bg-" + level);
    const toastObj = new bootstrap.Toast(mytoast);
    toastObj.show();
    document.querySelector(".toast-body").innerHTML = msg;
};
// 设置axios的基地址
axios.defaults.baseURL = "http://localhost:3000";

// 在本地存储中获取用户信息
const data = localStorage.getItem("userMsg")
    ? JSON.parse(localStorage.getItem("userMsg"))
    : {};

// 请求拦截器
axios.interceptors.request.use(
    // 在发送请求之前做些什么
    (config) => {
        // 获取token并添加到请求头中
        const { token } = data;
        if (token) {
            config.headers["Authorization"] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
axios.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        console.log(error);
        // 对响应错误做点什么
        if (error.response.status === 401) {
            showToast("您的登录信息过期,请重新登录", "warning");
            // 删除过期用户信息
            localStorage.removeItem("userMsg");
            // 延时跳转
            setTimeout(() => {
                location.href = "./login.html";
            }, 1500);
        }
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);
