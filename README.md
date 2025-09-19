# vling-admin

一个基于 Vue 3 + TypeScript + Vite + Ant Design Vue 构建的现代化企业后台管理系统。

![Vue](https://img.shields.io/badge/Vue-3.4.15-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.0.11-purple)
![Ant Design](https://img.shields.io/badge/Ant%20Design-4.x-red)

🌐 **在线演示**: [https://jishuling.cn/vling-admin/](https://jishuling.cn/vling-admin/)

## ✨ 特性

- 🚀 **现代化技术栈**: 基于 Vue 3 Composition API + TypeScript + Vite
- 🎨 **优雅UI**: 采用 Ant Design Vue 组件库，界面美观统一
- 📱 **响应式设计**: 完美适配桌面端和移动端
- 🔐 **权限管理**: 完整的用户、角色、菜单权限控制系统
- 📊 **数据可视化**: 集成 ECharts，提供丰富的数据展示
- 🛠️ **开发友好**: 完整的 TypeScript 支持，开发体验优秀
- ⚡ **高效构建**: Vite 构建工具，极速的热更新和构建速度

## 🛠️ 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Vue | 3.4.15 | 渐进式 JavaScript 框架 |
| TypeScript | 5.3 | JavaScript 的超集 |
| Vite | 5.0.11 | 下一代前端构建工具 |
| Ant Design Vue | 4.x | 企业级 UI 设计语言 |
| Pinia | 2.1.7 | Vue 状态管理库 |
| Vue Router | 4.3.0 | Vue.js 官方路由 |
| ECharts | 5.5.x | 强大的数据可视化库 |
| Axios | 1.6.7 | HTTP 客户端库 |

## 📋 功能模块

### 🔐 权限管理 (ACL)
- 用户管理 - 系统用户账号管理
- 角色管理 - 角色权限配置
- 菜单管理 - 动态菜单权限控制

### 📊 数据大屏 (Screen)
- 实时数据监控大屏
- 多维度数据可视化展示

### 📦 示例表格 (Table)
- 查询表格
- 条件筛选

### 📊 仪表盘 (Dashboard)
- 数据概览
- 关键指标监控

### 📗 个人信息 (Personal) 
- 个人信息管理
- 修改密码

## 🗂️ 项目结构

```
vling-admin/
├── public/                 # 静态资源
├── src/                   # 源代码
│   ├── api/              # API 接口
│   ├── assets/           # 静态资源
│   ├── components/       # 公共组件
│   ├── layout/           # 布局组件
│   ├── router/           # 路由配置
│   ├── store/            # 状态管理
│   ├── utils/            # 工具函数
│   ├── views/            # 页面组件
│   ├── App.vue           # 根组件
│   └── main.ts           # 入口文件
├── mock/                 # Mock 数据
├── .env.*               # 环境变量配置
├── vite.config.ts       # Vite 配置
├── tsconfig.json        # TypeScript 配置
└── package.json         # 项目依赖
```

## 🚀 快速开始

### 环境要求

- Node.js >= 20.0.0
- npm >= 8.0.0 或 yarn >= 1.22.0

### 安装依赖

```bash
# 使用 npm
npm install

# 使用 yarn
yarn install

# 使用 pnpm
pnpm install
```

### 启动开发服务器

```bash
# 使用 npm
npm run dev

# 使用 yarn
yarn dev

# 使用 pnpm
pnpm dev
```

开发服务器将在 http://localhost:5177 启动

### 构建生产版本

```bash
# 使用 npm
npm run build

# 使用 yarn
yarn build

# 使用 pnpm
pnpm build
```

构建产物将输出到 `dist` 目录

### 类型检查

```bash
npm run type-check
```

## ⚙️ 环境配置

项目支持多环境配置，相关文件：

- `.env` - 基础环境变量
- `.env.development` - 开发环境
- `.env.production` - 生产环境

主要环境变量：

```env
# 基础配置
VITE_APP_BASE_URL=vlingadmin

# API 配置
VITE_APP_BASE_API=/api
VITE_SERVE=http://localhost:5000
```

## 📦 构建与部署

### 开发环境构建

```bash
npm run build
```

### 生产环境部署

1. 配置生产环境变量 `.env.production`
2. 执行构建命令
3. 将 `dist` 目录部署到 Web 服务器

### Docker 部署 (可选)

```dockerfile
FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🤝 贡献指南

我们欢迎任何形式的贡献！

### 开发流程

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 代码规范

- 使用 TypeScript 进行开发
- 遵循 ESLint 和 Prettier 代码风格
- 提交前请运行 `npm run type-check` 确保类型正确

## 📄 许可证

本项目基于 MIT 许可证开源，详见 [LICENSE.txt](LICENSE.txt) 文件。

## 🙏 致谢

感谢以下开源项目：

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Ant Design Vue](https://www.antdv.com/) - 企业级 UI 设计语言
- [Vite](https://vitejs.dev/) - 下一代前端工具链
- [ECharts](https://echarts.apache.org/) - 强大的可视化库

## 📞 联系与支持

如有问题或建议，请通过以下方式联系：

- 提交 [Issue](https://github.com/cao-qh/vling-admin/issues)
- 发送邮件至项目维护者

---

⭐ 如果这个项目对您有帮助，请给我们一个 Star！您的支持是我们持续更新的动力。
