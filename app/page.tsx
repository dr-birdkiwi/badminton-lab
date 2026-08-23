'use client';

import { useRef, useState } from 'react';

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
  { tag: '后场 / 基础', title: '正手高远球', description: '让对方后退，也给自己争取恢复时间。', tone: 'featured', view: 'technique' as ViewKey },
  { tag: '后场 / 变化', title: '正手吊球', description: '共享准备动作，改变球的速度与落点。', tone: 'sand', view: 'technique' as ViewKey },
  { tag: '前场 / 控制', title: '网前搓球', description: '让拍面和身体一起靠近球，而不是只伸手。', tone: 'blue', view: 'footwork' as ViewKey },
  { tag: '中场 / 防守', title: '接杀挡网', description: '短促、稳定，把下一拍留在可处理的位置。', tone: 'ink', view: 'technique' as ViewKey },
];

const trainingCards = [
  { index: '01', title: '单腿支撑', metric: '到位与制动', description: '让最后一步不只是伸出去，更能把身体收回来。' },
  { index: '02', title: '躯干抗旋转', metric: '稳定击球空间', description: '在脚步变化后保持身体组织，减少无效摆动。' },
  { index: '03', title: '肩部耐力', metric: '连续挥拍', description: '支撑肩胛、肩关节和前臂在重复击球中的控制。' },
];

const chainData = [
  { number: '01', label: '支撑', sub: '脚 / 地面', text: '脚下提供可以启动、刹车和改变方向的支撑。' },
  { number: '02', label: '移动', sub: '踝 / 膝 / 髋', text: '下肢把身体送到球的侧后方，创造击球空间。' },
  { number: '03', label: '组织', sub: '骨盆 / 躯干', text: '躯干把下肢位置和上肢击球连接起来。' },
  { number: '04', label: '加速', sub: '肩 / 肘 / 前臂', text: '上肢连续完成拍头速度，而不是单独甩腕。' },
  { number: '05', label: '恢复', sub: '落地 / 回位', text: '动作在回到下一拍准备位置时才真正结束。' },
];

function MotionFigure({ phase }: { phase: number }) {
  return <div className={`motion-figure motion-phase-${phase}`} aria-hidden="true"><div className="figure-head" /><div className="figure-torso" /><div className="figure-arm arm-back" /><div className="figure-arm arm-front" /><div className="figure-leg leg-back" /><div className="figure-leg leg-front" /><div className="figure-racket" /></div>;
}

function ChainDiagram({ activeChain, setActiveChain }: { activeChain: number; setActiveChain: (value: number) => void }) {
  return <div className="chain-diagram" aria-label="后场高远球身体协同示意图">{chainData.map((item, index) => <div className="chain-node-wrap" key={item.number}><button className={`chain-node node-${index + 1} ${activeChain === index ? 'selected' : ''}`} onClick={() => setActiveChain(index)}><span>{item.number}</span><strong>{item.label}</strong><small>{item.sub}</small></button>{index < chainData.length - 1 && <div className="chain-arrow" aria-hidden="true">→</div>}</div>)}</div>;
}

function CourtMap({ mode }: { mode: 'rear' | 'front' | 'recovery' }) {
  return <div className={`court-map court-mode-${mode}`} aria-label={`${mode}移动路线示意图`}><div className="court-half court-far"><span className="court-label">对方后场</span></div><div className="court-net"><span>NET</span></div><div className="court-half court-near"><span className="court-label">你的准备区</span></div><div className="court-route route-a"><span>1</span></div><div className="court-route route-b"><span>2</span></div><div className="court-route route-c"><span>3</span></div><div className="court-player">P</div><div className="court-shuttle">●</div><div className="court-caption"><span className="legend-dot orange" />移动路线 <span className="legend-dot white" />击球点</div></div>;
}

function Workspace({ activeView, activePhase, setActivePhase, activeChain, setActiveChain, openView }: { activeView: ViewKey; activePhase: number; setActivePhase: (value: number) => void; activeChain: number; setActiveChain: (value: number) => void; openView: (view: ViewKey) => void }) {
  const [footworkMode, setFootworkMode] = useState<'rear' | 'front' | 'recovery'>('rear');
  const [exercise, setExercise] = useState(0);
  const currentPhase = phaseData[activePhase];
  const currentChain = chainData[activeChain];

  if (activeView === 'footwork') return <section className="workspace-section" id="workspace"><div className="workspace-heading"><span className="section-kicker">FOOTWORK LAB / 002</span><h2>脚步不是路线图。<br /><em>是到位后的选择。</em></h2><p>同一个球场区域，可以用不同的步数和节奏到达。先看任务，再看脚步。</p></div><div className="footwork-lab"><div className="lab-visual"><div className="lab-toolbar">{(['rear', 'front', 'recovery'] as const).map((mode) => <button key={mode} className={footworkMode === mode ? 'toolbar-button active' : 'toolbar-button'} onClick={() => setFootworkMode(mode)}>{mode === 'rear' ? '后场到位' : mode === 'front' ? '前场弓步' : '击球回位'}</button>)}</div><CourtMap mode={footworkMode} /></div><div className="lab-copy"><span className="workspace-label">MOVEMENT TASK</span><h3>{footworkMode === 'rear' ? '先到侧后方，再找击球点' : footworkMode === 'front' ? '伸出去，也要能收回来' : '回位是下一拍的准备动作'}</h3><p>{footworkMode === 'rear' ? '后场移动的重点不是跑得快，而是让最后一步之后仍有空间完成击球和落地。' : footworkMode === 'front' ? '前场弓步需要把身体送到球旁边，同时维持膝踝、躯干和握拍的可控。' : '击球后观察下一拍方向，利用落地、制动和小步调整回到可以启动的位置。'}</p><div className="check-list"><span><b>01</b> 分腿垫步后再启动</span><span><b>02</b> 最后一步创造空间</span><span><b>03</b> 击球后完成回位</span></div><button className="outline-button" onClick={() => openView('technique')}>连接到技术页面 <span>↗</span></button></div></div></section>;

  if (activeView === 'chain') return <section className="workspace-section chain-workspace" id="workspace"><div className="workspace-heading"><span className="section-kicker">KINETIC CHAIN / 003</span><h2>发力不是一条直线，<br /><em>是一次协同。</em></h2><p>点击每一层，看它在高远球的哪个阶段参与，以及可以用什么外部线索观察。</p></div><ChainDiagram activeChain={activeChain} setActiveChain={setActiveChain} /><div className="chain-detail"><div><span className="workspace-label">CURRENT LAYER / {currentChain.number}</span><h3>{currentChain.label}<small>{currentChain.sub}</small></h3></div><p>{currentChain.text}</p><div className="phase-tags"><span>教学示意</span><span>不代表精确力学测量</span><span>需要结合整条动作</span></div></div><div className="chain-principles"><div><span>不要只问</span><strong>哪一块肌肉在发力？</strong></div><div><span>要问的是</span><strong>身体如何在时机上协同？</strong></div></div></section>;

  if (activeView === 'training') return <section className="workspace-section training-workspace" id="workspace"><div className="workspace-heading"><span className="section-kicker">CAPACITY LAB / 004</span><h2>训练身体的任务，<br /><em>不是训练孤立的肌肉。</em></h2><p>功能训练从场上的真实需求出发。下面是高远球专题的三个支持方向。</p></div><div className="exercise-lab"><div className="exercise-nav">{trainingCards.map((item, index) => <button key={item.index} className={exercise === index ? 'exercise-tab active' : 'exercise-tab'} onClick={() => setExercise(index)}><span>{item.index}</span><strong>{item.title}</strong><small>{item.metric}</small></button>)}</div><div className="exercise-detail"><div className={`exercise-figure exercise-${exercise}`} aria-hidden="true"><span className="exercise-ground" /><span className="exercise-body" /><span className="exercise-limb limb-a" /><span className="exercise-limb limb-b" /><span className="exercise-limb limb-c" /></div><div className="exercise-copy"><span className="workspace-label">TRAINING SUPPORT</span><h3>{trainingCards[exercise].title}</h3><p>{trainingCards[exercise].description}</p><div className="exercise-spec"><span><b>目标</b>{exercise === 0 ? '最后一步与回位' : exercise === 1 ? '保持击球空间' : '连续挥拍控制'}</span><span><b>先做</b>低速、低量、动作质量</span><span><b>再进阶</b>增加距离、速度或随机性</span></div><button className="outline-button" onClick={() => openView('technique')}>回到技术场景 <span>↗</span></button></div></div></div><div className="training-safety"><span>训练边界</span><p>网站提供一般训练教育，不替代个人评估。出现疼痛、麻木、明显无力或动作失控时，应停止并寻求合资格专业人士意见。</p></div></section>;

  return <section className="workspace-section technique-workspace" id="workspace"><div className="workspace-heading"><span className="section-kicker">TECHNIQUE LAB / 001</span><h2>后场正手高远球：<br /><em>到位、击球与回位。</em></h2><p>一页看懂这项基础技术：先解决身体和球的空间关系，再谈拍头速度。</p></div><div className="technique-lab"><div className="sequence-board">{phaseData.map((phase, index) => <button key={phase.number} className={activePhase === index ? 'sequence-frame active' : 'sequence-frame'} onClick={() => setActivePhase(index)}><div className="frame-top"><span>{phase.number}</span><span>{phase.label}</span></div><div className="frame-art"><MotionFigure phase={index + 1} /><i className="frame-shuttle">●</i></div><strong>{phase.title}</strong><small>{phase.cue}</small></button>)}</div><div className="coach-panel"><span className="workspace-label">COACHING CARD / {currentPhase.number}</span><h3>{currentPhase.title}</h3><p>{currentPhase.detail}</p><div className="cue-card"><span>现在看哪里</span><strong>{activePhase === 0 ? '双脚是否处于可启动状态' : activePhase === 1 ? '身体是否到了球的侧后方' : activePhase === 2 ? '击球点是否给身体留出空间' : '落地后能否回到准备区'}</strong></div><div className="mistake-list"><span>常见偏差</span><p>{activePhase === 0 ? '站死、握拍过紧、启动方向暴露过早。' : activePhase === 1 ? '等球落到身后，最后一步没有调整空间。' : activePhase === 2 ? '只用手臂抡拍，或在身体后面勉强触球。' : '只练击球不练回位，落地后无法继续移动。'}</p></div><div className="phase-tags"><span>观察点</span><span>可重复</span><span>不追求最大力</span></div></div></div><div className="practice-rail"><div><span className="workspace-label">PRACTICE LADDER</span><h3>从无球到实战，逐层增加难度。</h3></div><div className="practice-steps"><span><b>01</b>无球动作</span><span><b>02</b>固定位置</span><span><b>03</b>移动击球</span><span><b>04</b>连续回合</span><span><b>05</b>限制实战</span></div></div></section>;
}

export default function Home() {
  const workspaceRef = useRef<HTMLElement>(null);
  const [activeView, setActiveView] = useState<ViewKey>('technique');
  const [activePhase, setActivePhase] = useState(1);
  const [activeChain, setActiveChain] = useState(2);
  const [showChain, setShowChain] = useState(true);
  const openView = (view: ViewKey) => { setActiveView(view); window.setTimeout(() => workspaceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0); };
  const currentPhase = phaseData[activePhase];

  return <main className="site-shell">
    <header className="site-header"><button className="brand" onClick={() => openView('overview')} aria-label="返回总览"><span className="brand-mark"><span>↗</span></span><span className="brand-copy"><strong>落点</strong><small>BADMINTON LAB</small></span></button><nav className="main-nav" aria-label="主要导航">{navItems.map((item) => <button className={activeView === item.key ? 'nav-item active' : 'nav-item'} key={item.key} onClick={() => openView(item.key)}><span>{item.label}</span><small>{item.en}</small></button>)}</nav><div className="header-actions"><span className="version-pill">MVP / 02</span><button className="menu-button" aria-label="打开菜单">☰</button></div></header>

    <section className="hero-section"><div className="hero-copy"><div className="eyebrow"><span className="pulse-dot" />第一专题 / 后场正手高远球</div><h1>不是把球打远。<br /><em>是让下一拍变得更容易。</em></h1><p className="hero-lede">从来球判断和后场移动开始，建立击球空间；再用身体协同完成击球，并在击球后回到可以启动的位置。</p><div className="hero-actions"><button className="primary-button" onClick={() => openView('technique')}>进入动作拆解 <span>↗</span></button><button className="text-button" onClick={() => openView('training')}>看功能训练 <span>→</span></button></div><div className="hero-note"><span>●</span> 示意图用于理解动作关系，不是唯一标准姿势。</div></div><div className="hero-visual"><div className="visual-topline"><span>VISUAL STUDY / 001</span><span>右手 · 单打</span></div><div className="visual-stage"><div className="stage-label">{currentPhase.number} / {currentPhase.label}</div><MotionFigure phase={activePhase + 1} /><div className="visual-shuttle">●</div><div className="visual-line line-one" /><div className="visual-line line-two" /><div className="visual-axis axis-one"><span>击球空间</span></div><div className="visual-axis axis-two"><span>身体转向</span></div><div className="visual-stamp">到位<br /><strong>再发力</strong></div></div><div className="visual-footer"><span>点击下方时间线逐帧查看</span><button onClick={() => setShowChain(!showChain)}>{showChain ? '隐藏发力链' : '显示发力链'} <span>◉</span></button></div></div></section>

    <section className="signal-row" aria-label="首个专题摘要"><div className="signal-item"><strong>04</strong><span>动作阶段<br /><small>准备 / 到位 / 击球 / 回位</small></span></div><div className="signal-item"><strong>03</strong><span>核心检查<br /><small>空间 / 时机 / 下一拍</small></span></div><div className="signal-item"><strong>01</strong><span>完整专题<br /><small>技术 × 步伐 × 训练</small></span></div><div className="signal-quote">「击球完成，不等于动作完成。」</div></section>

    <section className="module-section"><div className="section-heading"><div><span className="section-kicker">EXPLORE THE SYSTEM</span><h2>从一拍球，看到整个系统。</h2></div><span className="section-index">01 — 04</span></div><div className="module-grid"><button className={activeView === 'technique' ? 'module-card module-card-active' : 'module-card'} onClick={() => openView('technique')}><span className="card-number">01</span><span className="card-arrow">↗</span><div className="module-graphic graphic-racket"><i /><b /></div><span className="module-label">TECHNIQUE</span><h3>技术</h3><p>场景、动作阶段与击球目的。</p></button><button className={activeView === 'footwork' ? 'module-card module-card-active' : 'module-card'} onClick={() => openView('footwork')}><span className="card-number">02</span><span className="card-arrow">↗</span><div className="module-graphic graphic-court"><i /><i /><i /></div><span className="module-label">FOOTWORK</span><h3>步伐</h3><p>启动、到位、制动与回位。</p></button><button className={activeView === 'chain' ? 'module-card module-card-active' : 'module-card'} onClick={() => openView('chain')}><span className="card-number">03</span><span className="card-arrow">↗</span><div className="module-graphic graphic-chain"><i /><i /><i /><i /></div><span className="module-label">KINETIC CHAIN</span><h3>发力链</h3><p>脚下支撑到拍头速度的协同。</p></button><button className={activeView === 'training' ? 'module-card module-card-active' : 'module-card'} onClick={() => openView('training')}><span className="card-number">04</span><span className="card-arrow">↗</span><div className="module-graphic graphic-training"><i /><b /><i /></div><span className="module-label">CAPACITY</span><h3>功能训练</h3><p>让身体能力服务于技术。</p></button></div></section>

    <div ref={workspaceRef}><Workspace activeView={activeView} activePhase={activePhase} setActivePhase={setActivePhase} activeChain={activeChain} setActiveChain={setActiveChain} openView={openView} /></div>

    <section className="study-section"><div className="study-intro"><span className="section-kicker">THE MOVEMENT STUDY</span><h2>高远球的四个<br /><em>关键瞬间</em></h2><p>每一个阶段都不是孤立的动作。点击时间线，看看身体在这一刻正在解决什么问题。</p><div className="study-meta"><span>001 / 004</span><span>动作观察卡</span></div></div><div className="phase-panel"><div className="phase-tabs" role="tablist" aria-label="动作阶段">{phaseData.map((phase, index) => <button key={phase.number} className={index === activePhase ? 'phase-tab active' : 'phase-tab'} onClick={() => { setActivePhase(index); openView('technique'); }} role="tab" aria-selected={index === activePhase}><span>{phase.number}</span>{phase.label}</button>)}</div><div className="phase-content"><div className="phase-visual"><div className={`phase-orbit orbit-${activePhase + 1}`}><span>{currentPhase.number}</span></div><div className="phase-scanline" /><div className="phase-coordinate">x 03 / y 07<br /><span>{currentPhase.cue}</span></div></div><div className="phase-copy"><span className="phase-kicker">PHASE {currentPhase.number}</span><h3>{currentPhase.title}</h3><p>{currentPhase.detail}</p><div className="phase-tags"><span>观察点</span><span>可重复</span><span>不追求最大力</span></div></div></div></div></section>

    {showChain && <section className="chain-section"><div className="section-heading"><div><span className="section-kicker">BODY / TIMING / CONTROL</span><h2>发力不是一条直线，<br /><em>是一次协同。</em></h2></div><button className="outline-button" onClick={() => openView('chain')}>打开完整发力链 <span>↗</span></button></div><ChainDiagram activeChain={activeChain} setActiveChain={setActiveChain} /><div className="chain-foot"><span>示意 / 非精确力学测量</span><span>支撑 → 移动 → 组织 → 加速 → 恢复</span></div></section>}

    <section className="content-section"><div className="section-heading"><div><span className="section-kicker">THE LIBRARY</span><h2>一拍之外，还有这些连接。</h2></div><button className="text-button" onClick={() => openView('technique')}>查看全部 <span>→</span></button></div><div className="content-grid">{techniques.map((item, index) => <button key={item.title} className={`content-card ${item.tone}`} onClick={() => openView(item.view)}><div className="content-card-top"><span>0{index + 1}</span><span>↗</span></div><div className={`mini-motion mini-motion-${item.tone}`} /><span className="content-tag">{item.tag}</span><h3>{item.title}</h3><p>{item.description}</p></button>)}</div></section>

    <section className="training-section"><div className="training-copy"><span className="section-kicker">TRAIN THE DEMAND</span><h2>不是练更多。<br /><em>是练对下一拍。</em></h2><p>功能训练从羽毛球的真实任务出发：快速到位、稳住身体、完成击球，再把自己带回可以启动的位置。</p><button className="primary-button" onClick={() => openView('training')}>进入训练库 <span>↗</span></button></div><div className="training-list">{trainingCards.map((item) => <button className="training-item" key={item.index} onClick={() => openView('training')}><span className="training-index">{item.index}</span><span className="training-title"><strong>{item.title}</strong><small>{item.metric}</small></span><p>{item.description}</p><span className="training-arrow">↗</span></button>)}</div></section>

    <section className="footer-note"><div><span className="section-kicker">FIELD NOTE / 001</span><h2>把动作看懂，<br />再把它带上场。</h2></div><div className="footer-note-copy"><p>这是一个正在生长的羽毛球教学知识库。首个专题从后场正手高远球开始，后续会继续展开前场、发接发、中场防守、双打轮转与身体能力。</p><span>研究版 · 2026.08</span></div></section><footer className="site-footer"><span>落点 / BADMINTON LAB</span><span>TECHNIQUE · FOOTWORK · CAPACITY</span><span>© 2026</span></footer>
  </main>;
}
