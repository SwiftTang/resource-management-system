import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>欢迎使用资源管理系统</h1>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        请选择要管理的资源类型：
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        <Link href="/resources/people" className="card" style={{ textDecoration: 'none', color: 'inherit', transition: 'transform 0.2s' }}>
          <h2 style={{ marginBottom: '0.5rem' }}>人员管理 (People)</h2>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>管理团队成员、员工信息。</p>
        </Link>

        <Link href="/resources/projects" className="card" style={{ textDecoration: 'none', color: 'inherit', transition: 'transform 0.2s' }}>
          <h2 style={{ marginBottom: '0.5rem' }}>项目管理 (Projects)</h2>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>追踪项目进度、状态和详情。</p>
        </Link>

        <Link href="/resources/funds" className="card" style={{ textDecoration: 'none', color: 'inherit', transition: 'transform 0.2s' }}>
          <h2 style={{ marginBottom: '0.5rem' }}>资金管理 (Funds)</h2>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>记录资金流向、预算和支出。</p>
        </Link>
      </div>
    </div>
  );
}
