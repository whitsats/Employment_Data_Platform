const { sequelize } = require("../data/connect");
const { Student } = require("../data/models")(sequelize);

// 获取全部学生列表的控制器
const getAllStudents = async (ctx) => {
    try {
        const students = await Student.findAll();
        ctx.status = 200;
        ctx.body = {
            message: "获取学生列表成功",
            data: students,
        };
    } catch (error) {
        console.error("Error fetching students:", error);
        ctx.status = 500;
        ctx.body = { message: "无法获取学生列表" };
    }
};

const deleteStudent = async (ctx) => {
    try {
        const { id } = ctx.params;
        const student = await Student.findByPk(id);
        if (!student) {
            ctx.status = 404;
            ctx.body = { message: "学生未找到" };
            return;
        }
        await student.destroy();
        ctx.status = 204; // No Content
    } catch (error) {
        console.error("Error deleting student:", error);
        ctx.status = 500;
        ctx.body = { message: "删除学生时发生错误" };
    }
};

const addStudent = async (ctx) => {
    try {
        const {
            name,
            age,
            gender,
            province,
            city,
            area,
            hope_salary,
            salary,
            classNumber,
        } = ctx.request.body;
        const newStudent = await Student.create({
            name,
            age,
            gender,
            province,
            city,
            area,
            hope_salary,
            salary,
            classNumber,
        });
        ctx.status = 201;
        ctx.body = {
            message: "添加学生成功",
            data: newStudent,
        };
    } catch (error) {
        console.error("Error adding student:", error);
        ctx.status = 500;
        ctx.body = { message: "添加学生时发生错误" };
    }
};
const getStudentDetails = async (ctx) => {
    try {
        const { id } = ctx.params;
        const student = await Student.findByPk(id);
        if (!student) {
            ctx.status = 404;
            ctx.body = { message: "学生未找到" };
            return;
        }
        ctx.status = 200;
        ctx.body = {
            message: "获取学生详情成功",
            data: student,
        };
    } catch (error) {
        console.error("Error fetching student details:", error);
        ctx.status = 500;
        ctx.body = { message: "获取学生详情时发生错误" };
    }
};

const updateStudent = async (ctx) => {
    try {
        const { id } = ctx.params;
        const {
            name,
            age,
            gender,
            province,
            city,
            area,
            hope_salary,
            salary,
            classNumber,
        } = ctx.request.body;
        const student = await Student.findByPk(id);
        if (!student) {
            ctx.status = 404;
            ctx.body = { message: "学生未找到" };
            return;
        }
        student.name = name;
        student.age = age;
        student.gender = gender;
        student.province = province;
        student.city = city;
        student.area = area;
        student.hope_salary = hope_salary;
        student.salary = salary;
        student.classNumber = classNumber;
        await student.save();
        ctx.status = 200;
        ctx.body = {
            message: "修改学生成功",
            data: student,
        };
    } catch (error) {
        console.error("Error updating student:", error);
        ctx.status = 500;
        ctx.body = { message: "修改学生时发生错误" };
    }
};
const getDashboardData = async (ctx) => {
    try {
        // 聚合数据
        const overview = await Student.findOne({
            attributes: [
                [sequelize.fn("AVG", sequelize.col("salary")), "salary"],
                [sequelize.fn("COUNT", sequelize.col("id")), "student_count"],
                [sequelize.fn("AVG", sequelize.col("age")), "age"],
                [
                    sequelize.fn(
                        "COUNT",
                        sequelize.fn("DISTINCT", sequelize.col("classNumber"))
                    ),
                    "class_count",
                ],
            ],
        });

        const year = await Student.findAll({
            attributes: [
                [sequelize.fn("MONTH", sequelize.col("createdAt")), "month"],
                [sequelize.fn("SUM", sequelize.col("salary")), "salary"],
            ],
            group: [sequelize.fn("MONTH", sequelize.col("createdAt"))],
        });

        const salaryData = await Student.findAll({
            attributes: [
                [
                    sequelize.literal(`CASE
                    WHEN salary < 10000 THEN '1万以下'
                    WHEN salary BETWEEN 10000 AND 15000 THEN '1-1.5万'
                    WHEN salary BETWEEN 15000 AND 20000 THEN '1.5-2万'
                    ELSE '2万以上'
                END`),
                    "label",
                ],
                [
                    sequelize.fn(
                        "SUM",
                        sequelize.literal(
                            `CASE WHEN gender = 0 THEN 1 ELSE 0 END`
                        )
                    ),
                    "b_count",
                ],
                [
                    sequelize.fn(
                        "SUM",
                        sequelize.literal(
                            `CASE WHEN gender = 1 THEN 1 ELSE 0 END`
                        )
                    ),
                    "g_count",
                ],
            ],
            group: ["label"],
        });

        const groupData = await Student.findAll({
            attributes: ["classNumber", "name", "hope_salary", "salary"],
            order: [["classNumber", "ASC"]],
        });

        const provinceData = await Student.findAll({
            attributes: [
                "province",
                [sequelize.fn("COUNT", sequelize.col("id")), "value"],
            ],
            group: ["province"],
        });

        // 处理groupData
        const groupedData = groupData.reduce((acc, student) => {
            const { classNumber, name, hope_salary, salary } = student;
            if (!acc[classNumber]) {
                acc[classNumber] = [];
            }
            acc[classNumber].push({ name, hope_salary, salary });
            return acc;
        }, {});

        ctx.status = 200;
        ctx.body = {
            message: "获取面板数据成功",
            data: {
                overview,
                year,
                salaryData,
                groupData: groupedData,
                provinceData,
            },
        };
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        ctx.status = 500;
        ctx.body = { message: "获取面板数据时发生错误" };
    }
};
module.exports = {
    getAllStudents,
    deleteStudent,
    addStudent,
    getStudentDetails,
    updateStudent,
    getDashboardData,
};
