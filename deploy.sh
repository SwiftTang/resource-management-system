#!/bin/bash

# 自动部署脚本
# 用法: ./deploy.sh

echo "🚀 开始自动部署流程..."

# 1. 检查 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "📦 安装 Vercel CLI..."
    npm i -g vercel
fi

# 2. 登录 (如果未登录)
echo "🔑 检查 Vercel 登录状态..."
vercel whoami &> /dev/null
if [ $? -ne 0 ]; then
    echo "⚠️ 请先登录 Vercel:"
    vercel login
fi

# 3. 链接项目
echo "🔗 链接 Vercel 项目..."
vercel link --yes

# 4. 拉取环境变量
echo "📥 拉取环境变量..."
vercel env pull .env.production.local --yes

# 5. 部署到生产环境
echo "🚀 正在部署到 Vercel..."
vercel deploy --prod
echo "🔗 正在绑定域名 ccbase.vercel.app..."
vercel alias ccbase.vercel.app

# 6. 数据库迁移 (可选，如果本地有生产环境的 DATABASE_URL)
# 注意：通常 vercel env pull 会拉取到 .env.production.local，Prisma 默认不读取该文件
# 我们需要手动提取 DATABASE_URL 或者让用户确认
echo "🗄️ 正在同步数据库结构..."
if [ -f .env.production.local ]; then
    # 尝试从 .env.production.local 提取 DATABASE_URL 并运行迁移
    export $(grep -v '^#' .env.production.local | xargs)
    if [ -n "$DATABASE_URL" ]; then
        npx prisma db push
        echo "✅ 数据库同步完成"
    else
        echo "⚠️ 未找到 DATABASE_URL，跳过数据库同步"
    fi
else
    echo "⚠️ 未找到环境变量文件，跳过数据库同步"
fi

echo "✅ 部署流程结束！"
