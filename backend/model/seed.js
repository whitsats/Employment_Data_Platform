const { user, area, students, userinfo } = require("./data");
const { Sequelize } = require("sequelize");
const defineModels = require("./models");
const mysql = require("mysql2/promise");
const path = require("path");
const customPath = path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`);
require("dotenv").config({ path: customPath });
// 数据库配置
const dbName = process.env.DATA_BASE;
const username = process.env.DATA_BASE_USER;
const password = process.env.DATA_BASE_PWD;
const host = process.env.DATA_BASE_HOST;

// 递归插入 Area 数据
async function insertAreaData(areaData, parentCode = null, Area) {
    for (const area of areaData) {
        await Area.create({
            code: area.code,
            value: area.value,
            parentCode: parentCode,
        });
        if (area.children) {
            await insertAreaData(area.children, area.code, Area);
        }
    }
}

// 创建数据库和表并插入数据
async function createDatabase() {
    const connection = await mysql.createConnection({
        user: username,
        password: password,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    await connection.end();

    // 重新连接到指定的数据库
    const sequelizeWithDB = new Sequelize(dbName, username, password, {
        host: host,
        dialect: "mysql",
        logging: false,
    });

    // 定义模型
    const { User, Area, UserInfo, Student } = defineModels(sequelizeWithDB);

    // 同步模型
    await sequelizeWithDB.sync({ force: true });

    // 插入数据
    await User.create(user);
    await UserInfo.bulkCreate(userinfo);
    await Student.bulkCreate(students);
    await insertAreaData(area, null, Area);

    console.log("Database and tables created, data inserted.");
}

// 删除数据库
async function clearDatabase() {
    const connection = await mysql.createConnection({
        user: username,
        password: password,
    });
    await connection.query(`DROP DATABASE IF EXISTS ${dbName}`);
    await connection.end();
    console.log("Database dropped.");
}

// 处理命令行参数
const command = process.argv[2];
if (command === "create") {
    createDatabase().catch((err) => console.error(err));
} else if (command === "clear") {
    clearDatabase().catch((err) => console.error(err));
} else {
    console.log('Invalid command. Use "create" or "clear".');
}
