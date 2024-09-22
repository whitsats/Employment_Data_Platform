const router = require("koa-router")(); //引入路由函数
const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "就业数据平台API接口",
        version: "1.0.0",
        description: "就业数据平台API接口v1.0.0",
    },
    tags: [
        {
            name: "登陆注册",
            description: "用户的登陆和注册接口",
        },
        {
            name: "pet",
            description: "Everything about your Pets",
        },
        {
            name: "store",
            description: "Access to Petstore orders",
        },
    ],
    host: "localhost:3000",
    basePath: "/",
};

const options = {
    swaggerDefinition,
    apis: ["./routes/*.js"], // 写有注解的router的存放地址
};

const swaggerSpec = swaggerJSDoc(options);

// 通过路由获取生成的注解文件
router.get("/swagger.json", async function (ctx) {
    ctx.set("Content-Type", "application/json");
    ctx.body = swaggerSpec;
});

module.exports = router;
