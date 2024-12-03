const router = require("koa-router")();
const { login, register } = require("../controller/userController");
const upload = require("../utils/uploadConfig");
const {
    getUserInfoById,
    updateAvatar,
    updateUserInfo,
} = require("../controller/userInfoController");
const KoaJwt = require("koa-jwt");
const {
    getAllStudents,
    deleteStudent,
    addStudent,
    getStudentDetails,
    updateStudent,
    getStudentsByPage,
    getDashboardData,
} = require("../controller/studentController");
const {
    getProvinces,
    getCitiesByProvince,
    getAreasByCity,
} = require("../controller/areaController");

const secret = process.env.SECRET_KEY;
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
/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: 获取面板数据
 *     description: 获取学生数据的聚合信息
 *     tags:
 *       - 毕业生管理
 *     responses:
 *       200:
 *         description: 成功获取面板数据
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 请求结果的描述消息
 *                   example: 获取面板数据成功
 *                 data:
 *                   type: object
 *                   properties:
 *                     overview:
 *                       type: object
 *                       properties:
 *                         salary:
 *                           type: integer
 *                           description: 平均薪资
 *                         student_count:
 *                           type: integer
 *                           description: 学员数量
 *                         age:
 *                           type: integer
 *                           description: 平均年龄
 *                         class_count:
 *                           type: integer
 *                           description: 班级个数
 *                     year:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           month:
 *                             type: string
 *                             description: 月份
 *                           salary:
 *                             type: integer
 *                             description: 薪资
 *                     salaryData:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           label:
 *                             type: string
 *                             description: 薪资范围
 *                           b_count:
 *                             type: integer
 *                             description: 男生人数
 *                           g_count:
 *                             type: integer
 *                             description: 女生人数
 *                     groupData:
 *                       type: object
 *                       additionalProperties:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                               description: 姓名
 *                             hope_salary:
 *                               type: integer
 *                               description: 期望薪资
 *                             salary:
 *                               type: integer
 *                               description: 实际薪资
 *                     provinceData:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             description: 省份
 *                           value:
 *                             type: integer
 *                             description: 人数
 *       500:
 *         description: 获取面板数据时发生错误
 */
router.get("/dashboard", getDashboardData);
router.use(KoaJwt({ secret }));
/**
 * @swagger
 * /userInfo/{id}:
 *   get:
 *     summary: 获取用户信息
 *     description: 根据用户ID获取用户信息
 *     tags: [个人信息]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 用户ID
 *         schema:
 *           type: number
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
router.get("/userInfo/:userId", getUserInfoById);
/**
 * @swagger
 * /userInfo/{userId}/avatar:
 *   put:
 *     summary: 更新用户头像
 *     description: 根据用户ID上传并更新用户头像
 *     tags: [个人信息]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: 用户ID
 *         schema:
 *           type: number
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
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: 用户ID
 *         schema:
 *           type: number
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
/**
 * @swagger
 * /studentsList:
 *   get:
 *     summary: 获取全部学生信息
 *     description: 获取所有学生的详细信息
 *     tags:
 *       - 毕业生管理
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 成功获取学生列表
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 响应消息
 *                   example: 获取学生列表成功
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: 学生ID
 *                       name:
 *                         type: string
 *                         description: 学生姓名
 *                       age:
 *                         type: integer
 *                         description: 学生年龄
 *                       gender:
 *                         type: integer
 *                         description: 学生性别
 *                       hope_salary:
 *                         type: float
 *                         description: 期望薪资
 *                       salary:
 *                         type: float
 *                         description: 实际薪资
 *                       classNumber:
 *                         type: string
 *                         description: 班级编号
 *                       province:
 *                         type: string
 *                         description: 省份
 *                       city:
 *                         type: string
 *                         description: 城市
 *                       area:
 *                         type: string
 *                         description: 区域
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: 创建时间
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: 更新时间
 *       500:
 *         description: 无法获取学生列表
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 错误消息
 *                   example: 无法获取学生列表
 */
router.get("/studentsList", getAllStudents);
/**
 * @swagger
 * /students:
 *   get:
 *     summary: 分页查询学生
 *     description: 根据分页参数查询学生列表
 *     tags:
 *       - 毕业生管理
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: 页码
 *       - in: query
 *         name: pageSize
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: 每页显示的学生数量
 *     responses:
 *       200:
 *         description: 成功获取学生列表
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 请求结果的描述消息
 *                   example: 获取学生列表成功
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: 学生ID
 *                       name:
 *                         type: string
 *                         description: 学生姓名
 *                       age:
 *                         type: integer
 *                         description: 学生年龄
 *                       gender:
 *                         type: integer
 *                         description: 学生性别
 *                       province:
 *                         type: string
 *                         description: 省份
 *                       city:
 *                         type: string
 *                         description: 城市
 *                       area:
 *                         type: string
 *                         description: 地区
 *                       hope_salary:
 *                         type: integer
 *                         description: 期望薪资
 *                       salary:
 *                         type: integer
 *                         description: 就业薪资
 *                       classNumber:
 *                         type: string
 *                         description: 班级号
 *       500:
 *         description: 获取学生列表时发生错误
 */
router.get("/students", getStudentsByPage);
/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: 获取学生详情
 *     description: 根据学生ID获取学生的详细信息
 *     tags:
 *       - 毕业生管理
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 学生ID
 *     responses:
 *       200:
 *         description: 成功获取学生详情
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 请求结果的描述消息
 *                   example: 获取学生详情成功
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: 学生ID
 *                     name:
 *                       type: string
 *                       description: 学生姓名
 *                     age:
 *                       type: integer
 *                       description: 学生年龄
 *                     gender:
 *                       type: integer
 *                       description: 学生性别
 *                     province:
 *                       type: string
 *                       description: 省份
 *                     city:
 *                       type: string
 *                       description: 城市
 *                     area:
 *                       type: string
 *                       description: 地区
 *                     hope_salary:
 *                       type: integer
 *                       description: 期望薪资
 *                     salary:
 *                       type: integer
 *                       description: 就业薪资
 *                     classNumber:
 *                       type: string
 *                       description: 班级号
 *       404:
 *         description: 学生未找到
 *       500:
 *         description: 获取学生详情时发生错误
 */
router.get("/students/:id", getStudentDetails);
/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: 删除学生
 *     description: 根据学生ID删除学生
 *     tags:
 *       - 毕业生管理
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 学生ID
 *     responses:
 *       204:
 *         description: 成功删除学生，无返回数据
 *       404:
 *         description: 学生未找到
 *       500:
 *         description: 删除学生时发生错误
 */
router.delete("/students/:id", deleteStudent);
/**
 * @swagger
 * /students:
 *   post:
 *     summary: 新增学生
 *     description: 添加一个新的学生
 *     tags:
 *       - 毕业生管理
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 姓名，最多30字符
 *                 example: 周生生
 *               age:
 *                 type: integer
 *                 description: 年龄
 *                 example: 20
 *               gender:
 *                 type: integer
 *                 description: 性别 0 男 1 女
 *                 example: 1
 *               province:
 *                 type: string
 *                 description: 省份
 *                 example: 北京
 *               city:
 *                 type: string
 *                 description: 城市
 *                 example: 北京市
 *               area:
 *                 type: string
 *                 description: 地区
 *                 example: 顺义区
 *               hope_salary:
 *                 type: integer
 *                 description: 期望薪资
 *                 example: 10000
 *               salary:
 *                 type: integer
 *                 description: 就业薪资
 *                 example: 20000
 *               classNumber:
 *                 type: string
 *                 description: 班级号
 *                 example: 2204A
 *     responses:
 *       201:
 *         description: 添加学生成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 请求结果的描述消息
 *                   example: 添加学生成功
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: 学生ID
 *                     name:
 *                       type: string
 *                       description: 学生姓名
 *                     age:
 *                       type: integer
 *                       description: 学生年龄
 *                     gender:
 *                       type: integer
 *                       description: 学生性别
 *                     province:
 *                       type: string
 *                       description: 省份
 *                     city:
 *                       type: string
 *                       description: 城市
 *                     area:
 *                       type: string
 *                       description: 地区
 *                     hope_salary:
 *                       type: integer
 *                       description: 期望薪资
 *                     salary:
 *                       type: integer
 *                       description: 就业薪资
 *                     classNumber:
 *                       type: string
 *                       description: 班级号
 *       400:
 *         description: 请求参数错误
 *       500:
 *         description: 添加学生时发生错误
 */
router.post("/students", addStudent);
/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: 修改学生数据
 *     description: 根据学生ID修改学生的详细信息
 *     tags:
 *       - 毕业生管理
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 学生ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 姓名
 *                 example: 周生生
 *               age:
 *                 type: integer
 *                 description: 年龄
 *                 example: 20
 *               gender:
 *                 type: integer
 *                 description: 性别 0 男 1 女
 *                 example: 1
 *               province:
 *                 type: string
 *                 description: 省份
 *                 example: 北京
 *               city:
 *                 type: string
 *                 description: 城市
 *                 example: 北京市
 *               area:
 *                 type: string
 *                 description: 地区
 *                 example: 顺义区
 *               hope_salary:
 *                 type: integer
 *                 description: 期望薪资
 *                 example: 10000
 *               salary:
 *                 type: integer
 *                 description: 就业薪资
 *                 example: 20000
 *               classNumber:
 *                 type: string
 *                 description: 班级号
 *                 example: 2204A
 *     responses:
 *       200:
 *         description: 修改学生成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 请求结果的描述消息
 *                   example: 修改学生成功
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: 学生ID
 *                     name:
 *                       type: string
 *                       description: 学生姓名
 *                     age:
 *                       type: integer
 *                       description: 学生年龄
 *                     gender:
 *                       type: integer
 *                       description: 学生性别
 *                     province:
 *                       type: string
 *                       description: 省份
 *                     city:
 *                       type: string
 *                       description: 城市
 *                     area:
 *                       type: string
 *                       description: 地区
 *                     hope_salary:
 *                       type: integer
 *                       description: 期望薪资
 *                     salary:
 *                       type: integer
 *                       description: 就业薪资
 *                     classNumber:
 *                       type: string
 *                       description: 班级号
 *       404:
 *         description: 学生未找到
 *       500:
 *         description: 修改学生时发生错误
 */
router.put("/students/:id", updateStudent);
/**
 * @swagger
 * /area/province:
 *   get:
 *     summary: 获取省份列表数据
 *     description: 获取所有省份的列表数据
 *     tags:
 *       - 地区查询
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 成功获取省份列表
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 请求结果的描述消息
 *                   example: 获取省份列表成功
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: 省份名称
 *       500:
 *         description: 获取省份列表时发生错误
 */
router.get("/area/province", getProvinces);
/**
 * @swagger
 * /area/{provinceCode}/cities:
 *   get:
 *     summary: 获取某个省份下的城市列表
 *     description: 根据省份代码获取该省份下的所有城市列表
 *     tags:
 *       - 地区查询
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: provinceCode
 *         required: true
 *         schema:
 *           type: string
 *         description: 省份代码
 *     responses:
 *       200:
 *         description: 成功获取城市列表
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 请求结果的描述消息
 *                   example: 获取城市列表成功
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: 城市名称
 *       500:
 *         description: 获取城市列表时发生错误
 */
router.get("/area/:provinceCode/cities", getCitiesByProvince);
/**
 * @swagger
 * /area/{cityCode}/areas:
 *   get:
 *     summary: 获取某个城市下的区域列表
 *     description: 根据城市代码获取该城市下的所有区域列表
 *     tags:
 *       - 地区查询
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cityCode
 *         required: true
 *         schema:
 *           type: string
 *         description: 城市代码
 *     responses:
 *       200:
 *         description: 成功获取区域列表
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 请求结果的描述消息
 *                   example: 获取区域列表成功
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: 区域名称
 *       500:
 *         description: 获取区域列表时发生错误
 */
router.get("/area/:cityCode/areas", getAreasByCity);
module.exports = router;
