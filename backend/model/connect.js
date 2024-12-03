const Sequelize = require("sequelize");
// 创建一个新的 Sequelize 实例
const sequelize = new Sequelize(
    process.env.DATA_BASE,
    process.env.DATA_BASE_USER,
    process.env.DATA_BASE_PWD,
    {
        host: process.env.DATA_BASE_HOST,
        dialect: process.env.DIALECT,
        dialectModule: require(process.env.DIALECT_MODULE), // 使用 mysql2 作为数据库驱动
    }
);

// 测试数据库连接
sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((error) => {
        console.error("Unable to connect to the database:", error);
    });

exports.sequelize = sequelize;
