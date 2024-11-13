const { sequelize } = require("../model/connect");
const { UserInfo } = require("../model/models")(sequelize);
const gravatar = require("../utils/createAvatar");
const createUserInfo = async (UserModal) => {
    await UserInfo.create({
        userId: UserModal.id,
        avatar: gravatar(UserModal.username + "@backend.com"),
        nickname: UserModal.username,
        email: UserModal.username + "@backend.com",
        desc: "这个人很懒，没有留下什么介绍",
        gender: 0,
    });
};

const getUserInfoById = async (ctx) => {
    const userId = ctx.params.userId;
    try {
        const userInfo = await UserInfo.findOne({ where: { userId } });
        if (!userInfo) {
            ctx.status = 400;
            ctx.body = {
                code: "400001",
                message: "校验失败：请检查必填项字段",
                data: null,
            };
        } else {
            ctx.status = 200;
            ctx.body = {
                message: "获取用个人设置成功",
                data: userInfo,
            };
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = {
            code: "400001",
            message: "服务器错误",
            data: error.message,
        };
    }
};

const updateAvatar = async (ctx) => {
    const { userId } = ctx.params;
    const file = ctx.file;

    if (!file) {
        ctx.status = 400;
        ctx.body = {
            code: 10004,
            message: "头像文件不能为空",
            data: null,
        };
        return;
    }

    try {
        const userInfo = await UserInfo.findOne({ where: { userId } });
        if (!userInfo) {
            ctx.status = 400;
            ctx.body = {
                message: "用户信息不存在",
                data: null,
            };
            return;
        }

        userInfo.avatar = `/uploads/${file.filename}`;
        await userInfo.save();

        ctx.status = 200;
        ctx.body = {
            message: "头像更新成功",
            data: {
                userId: userInfo.userId,
                avatar: userInfo.avatar,
            },
        };
    } catch (error) {
        ctx.status = 500;
        ctx.body = {
            message: "服务器错误",
            data: error.message,
        };
    }
};

const updateUserInfo = async (ctx) => {
    const { userId } = ctx.params;
    const { nickname, email, desc, gender } = ctx.request.body;

    try {
        const userInfo = await UserInfo.findOne({ where: { userId } });
        if (!userInfo) {
            ctx.status = 400;
            ctx.body = {
                code: 40001,
                message: "用户信息不存在",
                data: null,
            };
            return;
        }

        userInfo.nickname = nickname || userInfo.nickname;
        userInfo.email = email || userInfo.email;
        userInfo.desc = desc || userInfo.desc;
        userInfo.gender = gender !== undefined ? gender : userInfo.gender;
        await userInfo.save();

        ctx.status = 200;
        ctx.body = {
            code: 10000,
            message: "用户信息更新成功",
            data: userInfo,
        };
    } catch (error) {
        ctx.status = 500;
        ctx.body = {
            code: 40001,
            message: "服务器错误",
            data: error.message,
        };
    }
};

module.exports = {
    createUserInfo,
    getUserInfoById,
    updateAvatar,
    updateUserInfo,
};
