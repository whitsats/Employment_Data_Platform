const router = require("koa-router")();
const { login, register } = require("../controller/authController");
/**
 * @swagger
 * /register:
 *   post:
 *     summary: 用户注册
 *     description: 用户注册接口
 *     tags: [登陆注册]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: john_doe
 *               password: password123
 *     responses:
 *       '201':
 *         description: 注册成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     username:
 *                       type: string
 *             example:
 *               code: 0
 *               message: "注册成功"
 *               data: {
 *                 "id": 1,
 *                 "username": "john_doe"
 *               }
 *       '400':
 *         description: 请求参数错误
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                 message:
 *                   type: string
 *                 data:
 *                   type: null
 *             example:
 *               code: 10001
 *               message: "用户名或密码不能为空"
 *               data: null
 *       '500':
 *         description: 服务器错误
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                 message:
 *                   type: string
 *                 data:
 *                   type: string
 *             example:
 *               code: 10002
 *               message: "服务器错误"
 *               data: "Internal Server Error"
 */
router.post("/register", register);
/**
 * @swagger
 * /login:
 *   post:
 *     summary: 用户登陆
 *     description: 用户登陆接口
 *     tags: [登陆注册]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: john_doe
 *               password: password123
 *     responses:
 *       '200':
 *         description: 登陆成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     username:
 *                       type: string
 *             example:
 *               code: 10000
 *               message: "登陆成功"
 *               data: {
 *                 "id": 1,
 *                 "username": "john_doe"
 *               }
 *       '400':
 *         description: 请求参数错误
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                 message:
 *                   type: string
 *                 data:
 *                   type: null
 *             example:
 *               code: 10004
 *               message: "用户名或密码不能为空"
 *               data: null
 *       '500':
 *         description: 服务器错误
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                 message:
 *                   type: string
 *                 data:
 *                   type: string
 *             example:
 *               code: 10004
 *               message: "服务器错误"
 *               data: "Internal Server Error"
 */
router.post("/login", login);

// 图书管理

// 新闻接口

// 天气接口

// 图片上传

// 个人信息

module.exports = router;
