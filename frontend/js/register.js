const registerForm = document.querySelector(".register-form");
const validateUsername = (username) =>
    /^[a-zA-Z0-9\u4e00-\u9fa5]{6,}$/.test(username);
const validatePassword = (password) => password.length >= 6;
registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = serialize(registerForm, { hash: true, empty: true });
    if (!data.username || !data.password) {
        showToast("用户名和密码不为空", "warning");
        return;
    }
    if (!validateUsername(data.username)) {
        showToast("用户名格式错误", "warning");
        return;
    }
    if (!validatePassword(data.password)) {
        showToast("密码长度不能少于6位", "warning");
        return;
    }
    try {
        const res = await axios.post("/register", data);
        console.log(res);
        // 如果成功则本地存储用户名
        const obj = {}; // 存储用户名及其他
        obj.username = res.data.username;
        obj.token = res.data.token;
        localStorage.setItem("userMsg", JSON.stringify(obj));

        showToast(res.message, "success");
        // 跳转页面
        setTimeout(() => {
            location.href = "./login.html";
        }, 1500);
    } catch (err) {
        console.log(err);
        return showToast(err.response.data.message, "danger");
    }
});
