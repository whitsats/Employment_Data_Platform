const Koa = require("koa");
const app = new Koa();
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyParser = require("koa-bodyparser");
const logger = require("koa-logger");
const cors = require("koa2-cors");
const { koaSwagger } = require("koa2-swagger-ui");
const swagger = require("./utils/swagger");

const index = require("./routes/index"); // 引入用户路由

// error handler
onerror(app);
// middlewares
app.use(cors());
app.use(
    bodyParser({
        enableTypes: ["json", "form", "text"],
    })
);
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

// logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
app.use(
    koaSwagger({
        routePrefix: "/swagger", // host at /swagger instead of default /docs
        swaggerOptions: {
            url: "/swagger.json", // example path to json 其实就是之后swagger-jsdoc生成的文档地址
        },
    })
);
app.use(swagger.routes(), swagger.allowedMethods());
app.use(index.routes()).use(index.allowedMethods());
// error-handling
app.on("error", (err, ctx) => {
    console.error("server error", err, ctx);
});

module.exports = app;
