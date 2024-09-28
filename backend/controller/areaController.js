const { sequelize } = require("../data/connect");
const { Area } = require("../data/models")(sequelize);

const getProvinces = async (ctx) => {
    try {
        const provinces = await Area.findAll({
            attributes: ["value"],
            where: {
                parentCode: null,
            },
        });
        const provinceList = provinces.map((province) => province.value);
        ctx.status = 200;
        ctx.body = {
            message: "获取省份列表成功",
            data: provinceList,
        };
    } catch (error) {
        console.error("Error fetching provinces:", error);
        ctx.status = 500;
        ctx.body = { message: "获取省份列表时发生错误" };
    }
};

const getCitiesByProvince = async (ctx) => {
    try {
        const { provinceCode } = ctx.params;
        const cities = await Area.findAll({
            attributes: ["value"],
            where: {
                parentCode: provinceCode,
            },
        });
        const cityList = cities.map((city) => city.value);
        ctx.status = 200;
        ctx.body = {
            message: "获取城市列表成功",
            data: cityList,
        };
    } catch (error) {
        console.error("Error fetching cities:", error);
        ctx.status = 500;
        ctx.body = { message: "获取城市列表时发生错误" };
    }
};
const getAreasByCity = async (ctx) => {
    try {
        const { cityCode } = ctx.params;
        const areas = await Area.findAll({
            attributes: ["value"],
            where: {
                parentCode: cityCode,
            },
        });
        const areaList = areas.map((area) => area.value);
        ctx.status = 200;
        ctx.body = {
            message: "获取区域列表成功",
            data: areaList,
        };
    } catch (error) {
        console.error("Error fetching areas:", error);
        ctx.status = 500;
        ctx.body = { message: "获取区域列表时发生错误" };
    }
};
module.exports = {
    getProvinces,
    getCitiesByProvince,
    getAreasByCity,
};
