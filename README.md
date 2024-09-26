# 鸿蒙应用开发学院就业数据

## 简介

这是一个前后端交互的项目，旨在为专业五阶段的学生提供一套较为完整的后端接口平台，实现就业数据的录入，统计，分析工作。

## 功能

-   功能 1：登陆注册
-   功能 2：个人中心
-   功能 3：就业生学生管理
-   功能 4：就业生数据分析
-   功能 5：面试题汇总

## 安装

请按照以下步骤安装和运行此项目：

1. 克隆仓库：
    ```bash
    git clone https://github.com/whitsats/Employment_Data_Platform.git
    ```
2. 进入项后端项目目录：
    ```bash
    cd Employment_Data_Platform/backend
    ```
3. 安装依赖：
    ```bash
    npm install
    ```
4. 运行种子脚本
    ```bash
    npm run seed:create
    ```
5. 运行 koa2
    ```bash
    nodemon
    ```

## 使用方法

启动服务器后，可以通过以下方式访问 API：

-   访问`http://localhost:3000/swagger`

## 贡献

欢迎贡献！请遵循以下步骤：

1. Fork 仓库
2. 创建一个新的分支 (`git checkout -b feature-branch`)
3. 提交你的更改 (`git commit -am 'Add some feature'`)
4. 推送到分支 (`git push origin feature-branch`)
5. 创建一个新的 Pull Request

## 许可证

此项目使用 [MIT 许可证](LICENSE)。
