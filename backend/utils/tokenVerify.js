const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
const tokenVerify = async (ctx, next) => {
    // 认证规则
    // 如果认证通过 await next
    // 如果认证不通过, 下面的中间件不执行，直接返回错误响应
    let token;
    let { authorization } = ctx.headers;
    if (!authorization) {
        ctx.status = 400;
        ctx.body = {
            code: 10008,
            message: "未携带token",
        };
        return;
    }
    if (authorization.split(" ")[0] !== "Bearer") {
        ctx.status = 400;
        ctx.body = ctx.status = 400;
        ctx.body = {
            code: 10008,
            message: "token格式不正确",
        };
        return;
    }
    token = authorization.split(" ")[1];
    try {
        jwt.verify(token, secret);
        await next();
    } catch (error) {
        ctx.status = 401;
        ctx.body = {
            code: 10009,
            message: error.message,
        };
    }
};

module.exports = {
    tokenVerify,
};
