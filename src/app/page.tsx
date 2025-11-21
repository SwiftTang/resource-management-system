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

        <Link href="/resources/knowledge" className="card" style={{ textDecoration: 'none', color: 'inherit', transition: 'transform 0.2s' }}>
          <h2 style={{ marginBottom: '0.5rem' }}>知识库 (Knowledge)</h2>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>管理文档、Wiki 和知识点。</p>
        </Link>

        <Link href="/resources/tasks" className="card" style={{ textDecoration: 'none', color: 'inherit', transition: 'transform 0.2s' }}>
          <h2 style={{ marginBottom: '0.5rem' }}>任务管理 (Tasks)</h2>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>追踪任务状态和截止日期。</p>
        </Link>

        <Link href="/resources/outcomes" className="card" style={{ textDecoration: 'none', color: 'inherit', transition: 'transform 0.2s' }}>
          <h2 style={{ marginBottom: '0.5rem' }}>成果管理 (Outcomes)</h2>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>记录项目产出和交付物。</p>
        </Link>

        <Link href="/resources/algorithms" className="card" style={{ textDecoration: 'none', color: 'inherit', transition: 'transform 0.2s' }}>
          <h2 style={{ marginBottom: '0.5rem' }}>算法库 (Algorithms)</h2>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>管理核心算法和代码片段。</p>
        </Link>

        <Link href="/resources/customers" className="card" style={{ textDecoration: 'none', color: 'inherit', transition: 'transform 0.2s' }}>
          <h2 style={{ marginBottom: '0.5rem' }}>客户管理 (Customers)</h2>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>维护客户信息和联系方式。</p>
        </Link>

        <Link href="/resources/requirements" className="card" style={{ textDecoration: 'none', color: 'inherit', transition: 'transform 0.2s' }}>
          <h2 style={{ marginBottom: '0.5rem' }}>需求管理 (Requirements)</h2>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>追踪产品需求和优先级。</p>
        </Link>

        <Link href="/resources/ideas" className="card" style={{ textDecoration: 'none', color: 'inherit', transition: 'transform 0.2s' }}>
          <h2 style={{ marginBottom: '0.5rem' }}>创意管理 (Ideas)</h2>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>记录创意想法和创新点子。</p>
        </Link>
      </div>
    </div>
  );
}
