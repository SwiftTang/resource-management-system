import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { getCurrentRole } from "@/lib/auth";
import { RoleSwitcher } from "@/components/RoleSwitcher";

export const metadata: Metadata = {
  title: "资源管理系统",
  description: "Resource Management System",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const role = await getCurrentRole();

  return (
    <html lang="zh">
      <body>
        <nav style={{ borderBottom: '1px solid var(--border)', padding: '1rem 0' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <Link href="/" style={{ fontWeight: 'bold', fontSize: '1.2rem', marginRight: '1rem' }}>RMS</Link>
              <Link href="/resources/people">人员</Link>
              <Link href="/resources/projects">项目</Link>
              <Link href="/resources/funds">资金</Link>
              <Link href="/resources/knowledge">知识</Link>
              <Link href="/resources/tasks">任务</Link>
              <Link href="/resources/outcomes">成果</Link>
              <Link href="/resources/algorithms">算法</Link>
              <Link href="/resources/customers">客户</Link>
              <Link href="/resources/requirements">需求</Link>
              <Link href="/resources/ideas">创意</Link>
              {role === 'ADMIN' && (
                <Link href="/approval" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>审批管理</Link>
              )}
            </div>
            <RoleSwitcher currentRole={role} />
          </div>
        </nav>
        <main className="container" style={{ padding: '2rem 1rem' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
