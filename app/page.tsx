'use client';

import { useState } from 'react';

type ViewKey = 'overview' | 'technique' | 'footwork' | 'chain' | 'training';

const navItems: { key: ViewKey; label: string; en: string }[] = [
  { key: 'overview', label: '总览', en: 'Overview' },
  { key: 'technique', label: '技术', en: 'Technique' },
  { key: 'footwork', label: '步伐', en: 'Footwork' },
  { key: 'chain', label: '发力链', en: 'Kinetic chain' },
  { key: 'training', label: '功能训练', en: 'Training' },
];

const phaseData = [
  { number: '01', label: '准备', title: '先让身体可以启动', detail: '球拍进入头顶准备区，分腿垫步把身体放在“下一步可以发生”的状态。', cue: '可启动 · 不锁死' },
  { number: '02', label: '到位', title: '移动到球的侧后方', detail: '不是等球落到身后再挥拍，而是用脚步创造击球空间。', cue: '先到位 · 再发力' },
  { number: '03', label: '击球', title: '在有空间的位置加速', detail: '肩、肘、前臂和拍头连续组织，击球点在持拍肩上方或略前方。', cue: '空间 · 时机 · 速度' },
  { number: '04', label: '回位', title: '击球后仍然准备下一拍', detail: '随挥、落地、减速和回到准备区，是高远球动作的后半段。', cue: '落地 · 制动 · 回位' },
];

const techniques = [
  { tag: '后场 / 基础', title: '正手高远球', description: '让对方后退，也给自己争取恢复时间。', tone: 'featured' },
  { tag: '后场 / 变化', title: '正手吊球', description: '共享准备动作，改变球的速度与落点。', tone: 'sand' },
  { tag: '前场 / 控制', title: '网前搓球', description: '让拍面和身体一起靠近球，而不是只伸手。', tone: 'blue' },
  { tag: '中场 / 防守', title: '接杀挡网', description: '短促、稳定，把下一拍留在可处理的位置。', tone: 'ink' },
];

const trainingCards = [
  { index: '01', title: '单腿支撑', metric: '到位与制动', description: '让最后一步不只是伸出去，更能把身体收回来。' },
  { index: '02', title: '躯干抗旋转', metric: '稳定击球空间', description: '在脚步变化后保持身体组织，减少无效摆动。' },
  { index: '03', title: '肩部耐力', metric: '连续挥拍', description: '支撑肩胛、肩关节和前臂在重复击球中的控制。' },
];

function ChainDiagram() {
  const chain = [
    { number: '01', label: '支撑', sub: '脚 / 地面' },
    { number: '02', label: '移动', sub: '踝膝髋' },
    { number: '03', label: '组织', sub: '骨盆 / 躯干' },
    { number: '04', label: '加速', sub: '肩 / 肘 / 前臂' },
    { number: '05', label: '恢复', sub: '落地 / 回位' },
  ];
  return (
    <div className="chain-diagram" aria-label="后场高远球身体协同示意图">
      {chain.map((item, index) => (
        <div className="chain-node-wrap" key={item.number}>
          <div className={`chain-node node-${index + 1}`}><span>{item.number}</span><strong>{item.label}</strong><small>{item.sub}</small></div>
          {index < chain.length - 1 && <div className="chain-arrow" aria-hidden="true">→</div>}
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [activeView, setActiveView] = useState<ViewKey>('overview');
  const [activePhase, setActivePhase] = useState(1);
  const [showChain, setShowChain] = useState(true);
  const currentPhase = phaseData[activePhase];

  return (
    <main className="site-shell">
      <header className="site-header">
        <button className="brand" onClick={() => setActiveView('overview')} aria-label="返回总览"><span className="brand-mark"><span>↗</span></span><span className="brand-copy"><strong>落点</strong><small>BADMINTON LAB</small></span></button>
        <nav className="main-nav" aria-label="主要导航">{navItems.map((item) => <button className={activeView === item.key ? 'nav-item active' : 'nav-item'} key={item.key} onClick={() => setActiveView(item.key)}><span>{item.label}</span><small>{item.en}</small></button>)}</nav>
        <div className="header-actions"><span className="version-pill">MVP / 01</span><button className="menu-button" aria-label="打开菜单">☰</button></div>
      </header>

      <section className="hero-section">
        <div className="hero-copy"><div className="eyebrow"><span className="pulse-dot" />第一专题 / 后场正手高远球</div><h1>不是把球打远。<br /><em>是让下一拍变得更容易。</em></h1><p className="hero-lede">从来球判断和后场移动开始，建立击球空间；再用身体协同完成击球，并在击球后回到可以启动的位置。</p><div className="hero-actions"><button className="primary-button" onClick={() => { setActiveView('technique'); setActivePhase(1); }}>进入动作拆解 <span>↗</span></button><button className="text-button" onClick={() => setActiveView('training')}>看功能训练 <span>→</span></button></div><div className="hero-note"><span>●</span> 示意图用于理解动作关系，不是唯一标准姿势。</div></div>
        <div className="hero-visual"><div className="visual-topline"><span>VISUAL STUDY / 001</span><span>右手 · 单打</span></div><div className="visual-stage"><div className="stage-label">{currentPhase.number} / {currentPhase.label}</div><div className="player-figure" aria-hidden="true"><div className="figure-head" /><div className="figure-torso" /><div className="figure-arm arm-back" /><div className="figure-arm arm-front" /><div className="figure-leg leg-back" /><div className="figure-leg leg-front" /><div className="figure-racket" /></div><div className="visual-shuttle">●</div><div className="visual-line line-one" /><div className="visual-line line-two" /><div className="visual-axis axis-one"><span>击球空间</span></div><div className="visual-axis axis-two"><span>身体转向</span></div><div className="visual-stamp">到位<br /><strong>再发力</strong></div></div><div className="visual-footer"><span>暂停 / 逐帧查看</span><button onClick={() => setShowChain(!showChain)}>{showChain ? '隐藏发力链' : '显示发力链'} <span>◉</span></button></div></div>
      </section>

      <section className="signal-row" aria-label="首个专题摘要"><div className="signal-item"><strong>04</strong><span>动作阶段<br /><small>准备 / 到位 / 击球 / 回位</small></span></div><div className="signal-item"><strong>03</strong><span>核心检查<br /><small>空间 / 时机 / 下一拍</small></span></div><div className="signal-item"><strong>01</strong><span>完整专题<br /><small>技术 × 步伐 × 训练</small></span></div><div className="signal-quote">「击球完成，不等于动作完成。」</div></section>

      <section className="module-section"><div className="section-heading"><div><span className="section-kicker">EXPLORE THE SYSTEM</span><h2>从一拍球，看到整个系统。</h2></div><span className="section-index">01 — 04</span></div><div className="module-grid">
        <button className={activeView === 'technique' ? 'module-card module-card-active' : 'module-card'} onClick={() => setActiveView('technique')}><span className="card-number">01</span><span className="card-arrow">↗</span><div className="module-graphic graphic-racket"><i /><b /></div><span className="module-label">TECHNIQUE</span><h3>技术</h3><p>场景、动作阶段与击球目的。</p></button>
        <button className={activeView === 'footwork' ? 'module-card module-card-active' : 'module-card'} onClick={() => setActiveView('footwork')}><span className="card-number">02</span><span className="card-arrow">↗</span><div className="module-graphic graphic-court"><i /><i /><i /></div><span className="module-label">FOOTWORK</span><h3>步伐</h3><p>启动、到位、制动与回位。</p></button>
        <button className={activeView === 'chain' ? 'module-card module-card-active' : 'module-card'} onClick={() => setActiveView('chain')}><span className="card-number">03</span><span className="card-arrow">↗</span><div className="module-graphic graphic-chain"><i /><i /><i /><i /></div><span className="module-label">KINETIC CHAIN</span><h3>发力链</h3><p>脚下支撑到拍头速度的协同。</p></button>
        <button className={activeView === 'training' ? 'module-card module-card-active' : 'module-card'} onClick={() => setActiveView('training')}><span className="card-number">04</span><span className="card-arrow">↗</span><div className="module-graphic graphic-training"><i /><b /><i /></div><span className="module-label">CAPACITY</span><h3>功能训练</h3><p>让身体能力服务于技术。</p></button>
      </div></section>

      <section className="study-section"><div className="study-intro"><span className="section-kicker">THE MOVEMENT STUDY</span><h2>高远球的四个<br /><em>关键瞬间</em></h2><p>每一个阶段都不是孤立的动作。点击时间线，看看身体在这一刻正在解决什么问题。</p><div className="study-meta"><span>001 / 004</span><span>动作观察卡</span></div></div><div className="phase-panel"><div className="phase-tabs" role="tablist" aria-label="动作阶段">{phaseData.map((phase, index) => <button key={phase.number} className={index === activePhase ? 'phase-tab active' : 'phase-tab'} onClick={() => setActivePhase(index)} role="tab" aria-selected={index === activePhase}><span>{phase.number}</span>{phase.label}</button>)}</div><div className="phase-content"><div className="phase-visual"><div className={`phase-orbit orbit-${activePhase + 1}`}><span>{currentPhase.number}</span></div><div className="phase-scanline" /><div className="phase-coordinate">x 03 / y 07<br /><span>{currentPhase.cue}</span></div></div><div className="phase-copy"><span className="phase-kicker">PHASE {currentPhase.number}</span><h3>{currentPhase.title}</h3><p>{currentPhase.detail}</p><div className="phase-tags"><span>观察点</span><span>可重复</span><span>不追求最大力</span></div></div></div></div></section>

      {showChain && <section className="chain-section"><div className="section-heading"><div><span className="section-kicker">BODY / TIMING / CONTROL</span><h2>发力不是一条直线，<br /><em>是一次协同。</em></h2></div><button className="outline-button" onClick={() => setActiveView('chain')}>打开完整发力链 <span>↗</span></button></div><ChainDiagram /><div className="chain-foot"><span>示意 / 非精确力学测量</span><span>支撑 → 移动 → 组织 → 加速 → 恢复</span></div></section>}

      <section className="content-section"><div className="section-heading"><div><span className="section-kicker">THE LIBRARY</span><h2>一拍之外，还有这些连接。</h2></div><button className="text-button" onClick={() => setActiveView('technique')}>查看全部 <span>→</span></button></div><div className="content-grid">{techniques.map((item, index) => <button key={item.title} className={`content-card ${item.tone}`} onClick={() => setActiveView('technique')}><div className="content-card-top"><span>0{index + 1}</span><span>↗</span></div><div className={`mini-motion mini-motion-${item.tone}`} /><span className="content-tag">{item.tag}</span><h3>{item.title}</h3><p>{item.description}</p></button>)}</div></section>

      <section className="training-section"><div className="training-copy"><span className="section-kicker">TRAIN THE DEMAND</span><h2>不是练更多。<br /><em>是练对下一拍。</em></h2><p>功能训练从羽毛球的真实任务出发：快速到位、稳住身体、完成击球，再把自己带回可以启动的位置。</p><button className="primary-button" onClick={() => setActiveView('training')}>进入训练库 <span>↗</span></button></div><div className="training-list">{trainingCards.map((item) => <button className="training-item" key={item.index} onClick={() => setActiveView('training')}><span className="training-index">{item.index}</span><span className="training-title"><strong>{item.title}</strong><small>{item.metric}</small></span><p>{item.description}</p><span className="training-arrow">↗</span></button>)}</div></section>

      <section className="footer-note"><div><span className="section-kicker">FIELD NOTE / 001</span><h2>把动作看懂，<br />再把它带上场。</h2></div><div className="footer-note-copy"><p>这是一个正在生长的羽毛球教学知识库。首个专题从后场正手高远球开始，后续会继续展开前场、发接发、中场防守、双打轮转与身体能力。</p><span>研究版 · 2026.08</span></div></section>
      <footer className="site-footer"><span>落点 / BADMINTON LAB</span><span>TECHNIQUE · FOOTWORK · CAPACITY</span><span>© 2026</span></footer>
    </main>
  );
}
