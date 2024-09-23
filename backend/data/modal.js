const Sequelize = require("sequelize");
const { sequelize } = require("./connect");
const User = sequelize.define("User", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

const Area = sequelize.define("Area", {
    code: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    value: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    parentCode: {
        type: Sequelize.STRING,
        allowNull: true,
    },
});

const Book = sequelize.define("Book", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    bookname: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    publisher: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

const UserInfo = sequelize.define("UserInfo", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id",
        },
    },
    avatar: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    nickname: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    desc: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    gender: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

// 导出模型和 sequelize 实例
module.exports = {
    sequelize,
    User,
    Area,
    Book,
    UserInfo,
};
