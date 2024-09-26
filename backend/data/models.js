const { Sequelize, DataTypes } = require("sequelize");
const defineModels = (sequelizeInstance) => {
    const User = sequelizeInstance.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    const Area = sequelizeInstance.define("Area", {
        code: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        parentCode: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    // const Book = sequelizeInstance.define("Book", {
    //     id: {
    //         type: DataTypes.INTEGER,
    //         primaryKey: true,
    //     },
    //     bookname: {
    //         type: DataTypes.STRING,
    //         allowNull: false,
    //     },
    //     author: {
    //         type: DataTypes.STRING,
    //         allowNull: false,
    //     },
    //     publisher: {
    //         type: DataTypes.STRING,
    //         allowNull: false,
    //     },
    // });

    const UserInfo = sequelizeInstance.define("UserInfo", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "id",
            },
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nickname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        desc: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    const Student = sequelizeInstance.define("Student", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        gender: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        hope_salary: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        salary: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        classNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        province: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        area: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
    });

    return { User, Area, /*  Book, */ UserInfo, Student };
};

module.exports = defineModels;
