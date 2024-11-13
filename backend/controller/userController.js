const { sequelize } = require("../model/connect");
const { User } = require("../model/models")(sequelize);
const { createUserInfo } = require("./userInfoController");
const jwt = require("jsonwebtoken");

const secret = "your_jwt_secret";

// 校验用户名是否合法
const validateUsername = (username) =>
    /^[a-zA-Z0-9\u4e00-\u9fa5]{6,}$/.test(username);
// 校验密码长度
const validatePassword = (password) => password.length >= 6;
const register = async (ctx) => {
    const { username, password } = ctx.request.body;
    console.log(ctx.request.body);
    console.log(username, password);
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
            message: "用户名必须是中英文和数字组成，且不少于6位",
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

    try {
        // 检查用户名是否已存在
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            ctx.status = 400;
            ctx.body = {
                code: 10005,
                message: "用户名已存在",
                data: null,
            };
            return;
        }
        // 创建新用户
        const newUser = await User.create({ username, password });
        // 创建用户详情
        createUserInfo(newUser);
        ctx.body = {
            code: 0,
            message: "注册成功",
            data: newUser,
        };
    } catch (error) {
        ctx.status = 500;
        ctx.body = {
            code: 10002,
            message: "服务器错误",
            data: error.message,
        };
    }
};
const login = async (ctx) => {
    const { username, password } = ctx.request.body;

    // 校验是否有提供用户名和密码
    if (!username || !password) {
        ctx.status = 400;
        ctx.body = {
            code: 10004,
            message: "用户名或密码不能为空",
            data: null,
        };
        return;
    }

    // 校验用户名和密码长度
    if (username.length < 6) {
        ctx.status = 400;
        ctx.body = {
            code: 10004,
            message: "用户名长度不能少于6位",
            data: null,
        };
        return;
    }

    if (password.length < 6) {
        ctx.status = 400;
        ctx.body = {
            code: 10004,
            message: "密码长度不能少于6位",
            data: null,
        };
        return;
    }
    try {
        // 查找用户
        const user = await User.findOne({ where: { username, password } });
        if (!user) {
            ctx.status = 400;
            ctx.body = {
                code: 10004,
                message: "用户名或密码错误",
                data: null,
            };
            return;
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            secret,
            {
                expiresIn: "1h",
            }
        );
        // 登录成功
        ctx.status = 200;
        ctx.body = {
            code: 10000,
            message: "登录成功",
            data: {
                ...user.dataValues,
                token,
            },
        };
    } catch (error) {
        ctx.status = 500;
        ctx.body = {
            code: 10004,
            message: "服务器错误",
            data: error.message,
        };
    }
};

module.exports = {
    register,
    login,
};
