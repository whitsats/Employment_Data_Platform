const Sequelize = require("sequelize");

// 创建一个新的 Sequelize 实例
const sequelize = new Sequelize("backend", "root", "123456", {
    host: "localhost",
    dialect: "mysql",
    dialectModule: require("mysql2"), // 使用 mysql2 作为数据库驱动
});

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
