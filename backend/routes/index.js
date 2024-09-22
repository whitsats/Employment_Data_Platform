const router = require("koa-router")();
const { JsonDB, Config } = require("node-json-db");
const { v4: uuidv4 } = require("uuid");
const db = new JsonDB(new Config("myDatabase", true, false, "/"));
// 校验用户名是否合法
const validateUsername = (username) =>
    /^[a-zA-Z0-9\u4e00-\u9fa5]{8,}$/.test(username);

// 校验密码长度
const validatePassword = (password) => password.length >= 6;

router.post("/register", async (ctx) => {
    const { username, password } = ctx.request.body;
    // 校验是否有提供用户名和密码
    if (!username || !password) {
        ctx.status = 400;
        ctx.body = {
            code: 10001,
            message: "用户名或密码不能为空",
            data: null,
        };
        return;
    }

    // 校验用户名格式是否正确
    if (!validateUsername(username)) {
        ctx.status = 400;
        ctx.body = {
            code: 10003,
            message: "用户名必须是中英文和数字组成，且不少于8位",
            data: null,
        };
        return;
    }

    // 校验密码长度是否满足要求
    if (!validatePassword(password)) {
        ctx.status = 400;
        ctx.body = {
            code: 10002,
            message: "密码长度不能少于6位",
            data: null,
        };
        return;
    }

    // 检查用户名是否已被注册
    let users = [];
    try {
        users = db.getData("/users");
    } catch (error) {
        // 如果没有用户数据，初始化为空
        users = [];
    }

    const isUsernameTaken = users.some((user) => user.username === username);

    if (isUsernameTaken) {
        ctx.status = 400;
        ctx.body = {
            code: 10005,
            message: "用户名已被占用",
            data: null,
        };
        return;
    }

    // 生成用户ID并保存到数据库
    const userId = uuidv4(); // 使用uuid生成唯一的用户ID
    const newUser = {
        id: userId,
        username: username,
        password: password, // 在实际生产中，应该对密码进行加密处理
    };

    users.push(newUser);
    db.push("/users", users);

    // 成功返回
    ctx.status = 200;
    ctx.body = {
        code: 10000,
        message: "注册成功",
        data: {
            id: userId,
            account: username,
        },
    };
});

// 图书管理

// 新闻接口

// 天气接口

// 图片上传

// 个人信息

module.exports = router;
