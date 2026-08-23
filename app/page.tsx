'use client';

import { useState } from 'react';

const phases = [
  { number: '01', label: '准备', title: '先建立可释放的姿态', read: '侧身、支撑和球的位置已经可控，身体有余地进入下一段。', cue: '不要先把动作拉到最大。', avoid: '为了“大”而失去平衡。' },
  { number: '02', label: '分离', title: '让骨盆与胸廓出现相对关系', read: '把骨盆方向和胸口方向分开观察，用 X-factor 描述相对转动。', cue: '这是观察模型，不是固定角度。', avoid: '把腰椎拧成主要动力来源。' },
  { number: '03', label: '旋转', title: '胸廓完成主要的方向变化', read: '躯干旋转为上肢进入加速区创造条件，重点是时机而不是单纯幅度。', cue: '胸口先完成方向变化。', avoid: '胸口还没转，手臂已经抢先。' },
  { number: '04', label: '释放', title: '肩、肘、前臂连续完成末端动作', read: '肩部旋转、肘部动作和前臂旋转共同参与拍头速度形成。', cue: '拍头速度不是孤立甩腕。', avoid: '从准备到击球一直握死。' },
  { number: '05', label: '制动', title: '击球后仍然要控制住身体', read: '触球窗口很短，随挥和减速决定你能否把动作收回来。', cue: '有效力量包括可控的结束。', avoid: '击球后突然刹死或散掉。' },
];

const claims = [
  { number: '01', title: '躯干旋转相关', text: '高手的躯干旋转特征更明显，并与击球质量相关；不能因此推导出固定力量比例。' },
  { number: '02', title: '近端到远端', text: '躯干、肩部、肘部和前臂的连续变化，是理解拍头速度的有用模型；不是每个人完全相同的机械顺序。' },
  { number: '03', title: '稳定的协同', text: '高手往往少一些无效摆动，肩部肌肉也表现出协同工作；“更用力”不是唯一答案。' },
];

function jumpTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ block: 'start' });
}

function MechanicsPlate() {
  return <div className="mechanics-plate" role="img" aria-label="杀球发力的静态机制示意">
    <div className="plate-meta"><span>FORCE MAP / 001</span><span>FOREHAND SMASH</span></div>
    <div className="plate-grid-line plate-grid-vertical" /><div className="plate-grid-line plate-grid-horizontal" />
    <div className="plate-node plate-base"><small>BASE</small><strong>骨盆</strong><span>方向参照</span></div>
    <div className="plate-node plate-trunk"><small>ROTATION</small><strong>胸廓</strong><span>方向变化</span></div>
    <div className="plate-node plate-arm"><small>RELEASE</small><strong>肩 · 肘 · 前臂</strong><span>末端速度</span></div>
    <div className="plate-callout callout-base">先稳定条件</div><div className="plate-callout callout-trunk">再发生旋转</div><div className="plate-callout callout-arm">最后释放拍头</div>
    <div className="plate-footer"><span>教学模型</span><strong>不是力量比例</strong></div>
  </div>;
}

export default function Home() {
  const [activePhase, setActivePhase] = useState(1);
  const phase = phases[activePhase];

  return <main className="force-site">
    <header className="force-header"><button className="force-brand" onClick={() => jumpTo('top')} aria-label="返回顶部"><span className="force-mark">↗</span><span><strong>力场</strong><small>BADMINTON FORCE LAB</small></span></button><nav aria-label="页面导航"><button onClick={() => jumpTo('principles')}>核心结论</button><button onClick={() => jumpTo('sequence')}>动作时序</button><button onClick={() => jumpTo('boundary')}>证据边界</button></nav><span className="header-index">01 / SMASH</span></header>

    <section id="top" className="force-hero force-section"><div className="hero-copy"><span className="eyebrow">ADVANCED FORCE TECHNIQUE</span><h1>杀球速度，<br /><em>来自时序。</em></h1><p>目前更稳妥的结论不是“哪一块肌肉最重要”，而是：躯干旋转、肩部旋转和肘/前臂的末端动作，需要在一次连续动作里协同发生。</p><div className="hero-question"><span>先问自己</span><strong>我的胸廓是否先于手臂完成方向变化？</strong></div><button className="dark-button" onClick={() => jumpTo('principles')}>看三条结论 <span>↓</span></button></div><MechanicsPlate /></section>

    <section id="principles" className="principles-section force-section"><div className="section-heading"><div><span className="section-label">THE SHORT VERSION</span><h2>只记住<br /><em>三件事。</em></h2></div><span className="section-index">01 — 03</span></div><div className="claim-grid">{claims.map((claim) => <article key={claim.number} className="claim-card"><span>{claim.number}</span><h3>{claim.title}</h3><p>{claim.text}</p></article>)}</div><div className="principle-line"><span>核心句</span><strong>先让身体产生可用的旋转，再让上肢把它连续地释放到拍头。</strong></div></section>

    <section id="sequence" className="sequence-section force-section"><div className="section-heading"><div><span className="section-label">THE SEQUENCE</span><h2>五个阶段，<br /><em>只看一个关键。</em></h2></div><span className="section-index">SELECT A PHASE</span></div><div className="phase-tabs" role="tablist" aria-label="杀球动作时序">{phases.map((item, index) => <button key={item.number} className={activePhase === index ? 'phase-tab active' : 'phase-tab'} onClick={() => setActivePhase(index)} role="tab" aria-selected={activePhase === index}><span>{item.number}</span><strong>{item.label}</strong></button>)}</div><div className="phase-reading"><div className="phase-main"><span className="section-label">PHASE / {phase.number}</span><h3>{phase.title}</h3><p>{phase.read}</p><div className="phase-flag"><span>外部线索</span><strong>{phase.cue}</strong></div></div><div className="phase-side"><div><span>看哪里</span><p>{phase.number === '02' ? '骨盆方向与胸口方向的相对变化。' : phase.number === '03' ? '胸廓是否先完成方向变化。' : phase.number === '04' ? '肩、肘、前臂是否连续进入释放。' : phase.number === '05' ? '触球后能否控制住身体。' : '身体是否处于可以启动和释放的状态。'}</p></div><div><span>避免</span><p>{phase.avoid}</p></div></div></div><div className="phase-rail">{phases.map((item, index) => <button key={item.number} className={activePhase === index ? 'rail-item active' : 'rail-item'} onClick={() => setActivePhase(index)}><i /><span>{item.number}</span><small>{item.label}</small></button>)}</div><p className="sequence-note">“近端到远端”是帮助观察动作的工作模型，不是要求所有球员复制同一条固定轨迹。</p></section>

    <section id="boundary" className="boundary-section force-section"><div className="section-heading"><div><span className="section-label">EVIDENCE BOUNDARY</span><h2>科学能支持的，<br /><em>说到这里。</em></h2></div><span className="section-index">READ HONESTLY</span></div><div className="boundary-grid"><article><span>可以说</span><h3>旋转与协同是重要线索</h3><p>研究观察到高手与新手在躯干旋转、肩部旋转、肘/腕活动和整体动作稳定性上存在差异。</p></article><article><span>不能说</span><h3>不存在万能比例</h3><p>不能把“70%来自躯干”或“腰椎必须锁死”写成普遍定律；研究样本、动作任务和测量方法都有限。</p></article><article><span>本站原则</span><h3>先用模型观察，再回到场上验证</h3><p>页面只提供可观察的技术线索，不替代教练现场判断，也不把单块肌肉或单个角度当成答案。</p></article></div><div className="source-strip"><span>PRIMARY SOURCES</span><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5260572/" target="_blank" rel="noreferrer">Zhang et al. / full-body smash model ↗</a><a href="https://www.frontiersin.org/journals/sports-and-active-living/articles/10.3389/fspor.2025.1596670/full" target="_blank" rel="noreferrer">Tajik et al. 2025 / shoulder synergies ↗</a><a href="https://bmcsportsscimedrehabil.biomedcentral.com/articles/10.1186/s13102-025-01163-w" target="_blank" rel="noreferrer">Huang et al. 2025 / clear stroke ↗</a></div></section>

    <footer className="force-footer"><span>力场 / BADMINTON FORCE LAB</span><strong>ADVANCED FORCE TECHNIQUE</strong><span>研究版 · 2026.08</span></footer>
  </main>;
}
