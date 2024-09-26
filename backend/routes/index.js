const router = require("koa-router")();
const { login, register } = require("../controller/userController");
const {
    getUserInfoById,
    updateAvatar,
    updateUserInfo,
    upload,
} = require("../controller/userInfoController");
const KoaJwt = require("koa-jwt");
const secret = "your_jwt_secret";

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
 *                     token:
 *                       type: string
 *             example:
 *               code: 10000
 *               message: "登陆成功"
 *               data: {
 *                 "id": 1,
 *                 "username": "john_doe",
 *                 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWU6ImFkbWluIiwiaWF0IjoxNjMzMDI0NzQyLCJleHAiOjE2MzMwMjg3NDJ9.7"
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

router.use(KoaJwt({ secret }));

/**
 * @swagger
 * /userInfo/{id}:
 *   get:
 *     summary: 获取用户信息
 *     description: 根据用户ID获取用户信息
 *     tags: [个人信息]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 用户ID
 *         schema:
 *           type: number
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Bearer token
 *         schema:
 *           type: string
 *           example: Bearer <token>
 *     responses:
 *       '200':
 *         description: 获取用户信息成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 10000
 *                 message:
 *                   type: string
 *                   example: 获取用户信息成功
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: number
 *                       example: 1
 *                     avatar:
 *                       type: string
 *                       example: "http://example.com/avatar.png"
 *                     nickname:
 *                       type: string
 *                       example: "nickname"
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     desc:
 *                       type: string
 *                       example: "这个人很懒，没有留下什么介绍"
 *                     gender:
 *                       type: number
 *                       example: 0
 *       '400':
 *         description: 请求参数错误或用户信息不存在
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 10004
 *                 message:
 *                   type: string
 *                   example: 用户信息不存在
 *                 data:
 *                   type: null
 *       '500':
 *         description: 服务器错误
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 10004
 *                 message:
 *                   type: string
 *                   example: 服务器错误
 *                 data:
 *                   type: string
 *                   example: 错误信息
 */
router.get("/settings/:userId", getUserInfoById);
/**
 * @swagger
 * /userInfo/{userId}/avatar:
 *   put:
 *     summary: 更新用户头像
 *     description: 根据用户ID上传并更新用户头像
 *     tags: [个人信息]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: 用户ID
 *         schema:
 *           type: number
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Bearer token
 *         schema:
 *           type: string
 *           example: Bearer <token>
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: 用户头像文件
 *     responses:
 *       '200':
 *         description: 头像更新成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 10000
 *                 message:
 *                   type: string
 *                   example: 头像更新成功
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: number
 *                       example: 1
 *                     avatar:
 *                       type: string
 *                       example: "/uploads/avatar-1633024800000.png"
 *       '400':
 *         description: 请求参数错误或用户信息不存在
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 10004
 *                 message:
 *                   type: string
 *                   example: 用户信息不存在或头像文件不能为空
 *                 data:
 *                   type: null
 *       '500':
 *         description: 服务器错误
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 10004
 *                 message:
 *                   type: string
 *                   example: 服务器错误
 *                 data:
 *                   type: string
 *                   example: 错误信息
 */
router.put("/userInfo/:userId/avatar", upload.single("avatar"), updateAvatar);
/**
 * @swagger
 * /userInfo/{userId}:
 *   put:
 *     summary: 更新用户基本信息
 *     description: 根据用户ID更新用户的基本信息（不包括头像）
 *     tags: [个人信息]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: 用户ID
 *         schema:
 *           type: number
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Bearer token
 *         schema:
 *           type: string
 *           example: Bearer <token>
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 description: 用户昵称
 *                 example: "nickname"
 *               email:
 *                 type: string
 *                 description: 用户邮箱
 *                 example: "user@example.com"
 *               desc:
 *                 type: string
 *                 description: 用户描述
 *                 example: "这个人很懒，没有留下什么介绍"
 *               gender:
 *                 type: number
 *                 description: 用户性别
 *                 example: 0
 *     responses:
 *       '200':
 *         description: 用户信息更新成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 10000
 *                 message:
 *                   type: string
 *                   example: 用户信息更新成功
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: number
 *                       example: 1
 *                     avatar:
 *                       type: string
 *                       example: "/uploads/avatar-1633024800000.png"
 *                     nickname:
 *                       type: string
 *                       example: "nickname"
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     desc:
 *                       type: string
 *                       example: "这个人很懒，没有留下什么介绍"
 *                     gender:
 *                       type: number
 *                       example: 0
 *       '400':
 *         description: 请求参数错误或用户信息不存在
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 40001
 *                 message:
 *                   type: string
 *                   example: 用户信息不存在
 *                 data:
 *                   type: null
 *       '500':
 *         description: 服务器错误
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 40001
 *                 message:
 *                   type: string
 *                   example: 服务器错误
 *                 data:
 *                   type: string
 *                   example: 错误信息
 */
router.put("/userInfo/:userId", updateUserInfo);

module.exports = router;
