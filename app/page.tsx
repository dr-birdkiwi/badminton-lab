'use client';

import { useState } from 'react';

type LessonStep = {
  number: string;
  label: string;
  title: string;
  action: string;
  cue: string;
  avoid: string;
  drill: string;
};

type ForceNode = {
  number: string;
  label: string;
  english: string;
  title: string;
  action: string;
  principle: string;
  cue: string;
};

const lessonSteps: LessonStep[] = [
  {
    number: '01',
    label: '站位',
    title: '先侧身，再给身体留出旋转空间',
    action: '让侧身、支撑和球的位置先可控，拍侧手臂回到可以移动的准备区。不要正面对网等球，也不要为了“蓄力”把身体拧到失去平衡。',
    cue: '肩线、骨盆和击球点之间，仍然留有向前转的空间。',
    avoid: '为了动作幅度而失去平衡。',
    drill: '无球：侧身 → 停稳 → 回中，做 5 次。',
  },
  {
    number: '02',
    label: '分离',
    title: '让骨盆与胸廓出现相对关系',
    action: '把骨盆方向和胸口方向分开观察。允许出现相对转动，但不主动用腰椎拧出极端角度；这里是时序条件，不是越大越好。',
    cue: '胸口能否在骨盆方向尚未完全改变时，开始朝击球区转？',
    avoid: '用腰椎承担全部旋转，或把身体锁死。',
    drill: '无球：一手放胸骨、一手放髋骨，慢速做 5 次相对转动。',
  },
  {
    number: '03',
    label: '旋转',
    title: '先让胸廓完成主要的方向变化',
    action: '启动时先让胸廓进入前向旋转，拍臂暂时保持准备。重点是相对先后，不是把转体幅度做大。',
    cue: '胸口是否先于前臂进入击球方向？',
    avoid: '拍臂抢先，变成只甩手臂。',
    drill: '半挥：不击球，只做到胸口转向前方，做 5 次。',
  },
  {
    number: '04',
    label: '释放',
    title: '让肩、肘、前臂连续通过',
    action: '胸廓转起来后，肩部、肘部和前臂连续进入释放区。握拍不必从准备到击球全程握死，给拍头留下加速空间。',
    cue: '拍头是在触球前连续加速，而不是靠最后一下孤立甩腕？',
    avoid: '肩肘僵住，用手腕补救所有前段缺失。',
    drill: '轻球：用约五成力度做 5 球，只追求连续，不追求最大声。',
  },
  {
    number: '05',
    label: '触球',
    title: '在前方的击球窗口完成释放',
    action: '把触球看成一个很短的窗口：身体转向、拍头加速和拍面控制同时出现。不要为了够高而把身体拉散。',
    cue: '触球后，拍面和身体是否仍然在你的控制范围内？',
    avoid: '击球点太后，或触球时身体已经失去支撑。',
    drill: '轻球：只记录“触球前拍头是否起来”，先不追求全力。',
  },
  {
    number: '06',
    label: '制动',
    title: '击球后收回，准备下一拍',
    action: '释放后让身体自然随挥，并回到可以移动的状态。好的发力不只看触球瞬间，也看能不能把动作收回来。',
    cue: '随挥或落地后，你是否还能保持平衡并继续移动？',
    avoid: '击球后突然刹死、向后倒，或整个身体散掉。',
    drill: '完整动作：3 组 × 5 球，每组只检查一个线索。',
  },
];

const claims = [
  { number: '01', title: '躯干旋转相关', text: '高手的躯干旋转特征更明显，并与击球质量相关；不能因此推导出固定力量比例。' },
  { number: '02', title: '近端到远端', text: '躯干、肩部、肘部和前臂的连续变化，是理解拍头速度的有用模型；不是每个人完全相同的机械顺序。' },
  { number: '03', title: '稳定的协同', text: '高手往往少一些无效摆动，肩部肌肉也表现出协同工作；“更用力”不是唯一答案。' },
];

const forceNodes: ForceNode[] = [
  { number: '01', label: '脚下', english: 'SUPPORT', title: '建立支撑，不是蹬出速度', action: '脚与地面建立反作用，身体获得可控的加速、减速和转向条件。', principle: '地面是外部约束；主动能量来自肌肉和关节力矩。', cue: '脚下能改方向，不是原地蹬死。' },
  { number: '02', label: '下肢 · 髋', english: 'ORIENT', title: '把身体送到可击球位置', action: '踝、膝、髋共同管理重心和最后调整，让身体停在可以旋转的位置。', principle: '最后一步把向后惯性变成支撑和旋转底座。', cue: '到位后仍然能转，不向后倒。' },
  { number: '03', label: '骨盆', english: 'DIRECT', title: '给身体一个旋转方向', action: '骨盆先组织身体朝向，为胸廓保留相对运动的空间。', principle: '骨盆是方向组织器，不是把力量向上传送的传送带。', cue: '骨盆和胸口不要从一开始就像一块板。' },
  { number: '04', label: '胸廓', english: 'SEPARATE', title: '形成可用的相对旋转', action: '胸廓在骨盆提供的条件上完成主要方向变化，躯干从“整体”变成有相对关系的两段。', principle: '相对旋转提供时序和活动空间，但不等于把腰椎拧到极限。', cue: '胸口能否先进入击球方向？' },
  { number: '05', label: '肩 · 肘 · 前臂', english: 'RELEASE', title: '在窗口内共同加速', action: '肩部、肘部和前臂在胸廓旋转后进入释放区，拍头在触球前连续获得速度。', principle: '近端创造条件，远端在合适时间接管；不是孤立甩腕。', cue: '拍头触球前已经起来，而不是最后一下才补。' },
  { number: '06', label: '球拍 · 羽毛球', english: 'IMPACT', title: '把身体协调变成出球', action: '拍头速度、拍面方向、击球位置和球拍特性在极短碰撞窗口内共同决定出球。', principle: '身体发力只有转化成有效碰撞，才真正变成羽毛球速度。', cue: '击球点在前方，拍面和身体仍然可控。' },
  { number: '07', label: '随挥 · 回位', english: 'BRAKE', title: '收住，准备下一拍', action: '击球后让身体和球拍自然随挥，再逐步降低速度，回到可以移动的状态。', principle: '制动不是浪费力量，而是控制角动量和下一拍的位置。', cue: '击球后仍能平衡、落地和继续移动。' },
];

function jumpTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ block: 'start' });
}

function MechanicsPlate() {
  return (
    <div className="mechanics-plate" role="img" aria-label="杀球发力的静态机制示意">
      <div className="plate-meta"><span>FORCE MAP / 001</span><span>FOREHAND SMASH</span></div>
      <div className="plate-grid-line plate-grid-vertical" /><div className="plate-grid-line plate-grid-horizontal" />
      <div className="plate-node plate-base"><small>BASE</small><strong>骨盆</strong><span>方向参照</span></div>
      <div className="plate-node plate-trunk"><small>ROTATION</small><strong>胸廓</strong><span>方向变化</span></div>
      <div className="plate-node plate-arm"><small>RELEASE</small><strong>肩 · 肘 · 前臂</strong><span>末端速度</span></div>
      <div className="plate-callout callout-base">先稳定条件</div><div className="plate-callout callout-trunk">再发生旋转</div><div className="plate-callout callout-arm">最后释放拍头</div>
      <div className="plate-footer"><span>教学模型</span><strong>不是力量比例</strong></div>
    </div>
  );
}

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeNode, setActiveNode] = useState(0);
  const step = lessonSteps[activeStep];
  const node = forceNodes[activeNode];

  return (
    <main className="force-site">
      <header className="force-header">
        <button className="force-brand" onClick={() => jumpTo('top')} aria-label="返回顶部"><span className="force-mark">↗</span><span><strong>力场</strong><small>BADMINTON FORCE LAB</small></span></button>
        <nav aria-label="页面导航"><button onClick={() => jumpTo('principles')}>核心结论</button><button onClick={() => jumpTo('force-path')}>力的路径</button><button onClick={() => jumpTo('lesson')}>照着练</button><button onClick={() => jumpTo('boundary')}>证据边界</button></nav>
        <span className="header-index">01 / SMASH</span>
      </header>

      <section id="top" className="force-hero force-section">
        <div className="hero-copy">
          <span className="eyebrow">ADVANCED FORCE TECHNIQUE</span>
          <h1>杀球速度，<br /><em>来自时序。</em></h1>
          <p>不要先追求“更用力”。先把身体放到可以旋转的位置，再让胸廓、肩、肘和前臂在一次连续动作里完成释放。</p>
          <div className="hero-question"><span>先问自己</span><strong>我的胸廓，是否先于手臂完成方向变化？</strong></div>
          <div className="hero-ramp"><span>练习路径</span><strong>同一条线索，逐级加速</strong><div><b>无球</b><i>→</i><b>半挥</b><i>→</i><b>轻球</b></div></div>
          <button className="dark-button" onClick={() => jumpTo('lesson')}>从第一步开始 <span>↓</span></button>
        </div>
        <MechanicsPlate />
      </section>

      <section id="principles" className="principles-section force-section">
        <div className="section-heading"><div><span className="section-label">THE SHORT VERSION</span><h2>只记住<br /><em>三件事。</em></h2></div><span className="section-index">01 — 03</span></div>
        <div className="claim-grid">{claims.map((claim) => <article key={claim.number} className="claim-card"><span>{claim.number}</span><h3>{claim.title}</h3><p>{claim.text}</p></article>)}</div>
        <div className="principle-line"><span>核心句</span><strong>先让身体产生可用的旋转，再让上肢把它连续地释放到拍头。</strong></div>
      </section>

      <section id="force-path" className="force-path-section force-section">
        <div className="section-heading"><div><span className="section-label">THE FORCE PATH</span><h2>力不是向上“传”，<br /><em>而是逐段组织。</em></h2></div><span className="section-index">CLICK A NODE</span></div>
        <div className="path-statement"><span>先纠正一个误解</span><strong>脚下不直接把力量送到拍头。脚下先建立条件，身体再把条件组织成旋转，最后通过碰撞输出。</strong></div>
        <div className="path-layout">
          <div className="path-visual" role="tablist" aria-label="杀球发力路径">
            <div className="path-meta"><span>FROM GROUND TO SHUTTLE</span><span>NOT A FIXED RATIO</span></div>
            <div className="path-track">
              {forceNodes.map((item, index) => <div className="path-track-item" key={item.number}><button id={`node-tab-${item.number}`} className={activeNode === index ? 'path-node active' : 'path-node'} onClick={() => setActiveNode(index)} role="tab" aria-selected={activeNode === index} aria-controls="node-panel"><b>{item.number}</b><strong>{item.label}</strong><small>{item.english}</small></button>{index < forceNodes.length - 1 && <span className="path-arrow" aria-hidden="true">→</span>}</div>)}
            </div>
            <p className="path-footnote">箭头代表动作关系，不代表固定顺序、能量百分比或所有球员都一样的轨迹。</p>
          </div>
          <div id="node-panel" className="path-reading" role="tabpanel" tabIndex={0} aria-labelledby={`node-tab-${node.number}`}>
            <span className="section-label">NODE / {node.number} · {node.english}</span>
            <h3>{node.title}</h3>
            <div className="path-reading-grid"><div><span>发生了什么</span><p>{node.action}</p></div><div><span>发力原理</span><p>{node.principle}</p></div><div><span>检查线索</span><p>{node.cue}</p></div></div>
          </div>
        </div>
      </section>

      <section id="lesson" className="lesson-section force-section">
        <div className="section-heading"><div><span className="section-label">FOLLOW ALONG</span><h2>一套动作，<br /><em>六个检查点。</em></h2></div><span className="section-index">DO · LOOK · AVOID</span></div>
        <p className="lesson-intro">不要一次记住所有理论。选择一个阶段，先完成动作，再用外部线索检查，最后才升级速度。</p>
        <div className="phase-tabs" role="tablist" aria-label="可照着练的杀球发力步骤">
          {lessonSteps.map((item, index) => <button key={item.number} id={`step-tab-${item.number}`} className={activeStep === index ? 'phase-tab active' : 'phase-tab'} onClick={() => setActiveStep(index)} role="tab" aria-selected={activeStep === index} aria-controls="step-panel"><span>{item.number}</span><strong>{item.label}</strong></button>)}
        </div>
        <div id="step-panel" className="phase-reading" role="tabpanel" tabIndex={0} aria-labelledby={`step-tab-${step.number}`}>
          <div className="phase-main"><span className="section-label">STEP / {step.number}</span><h3>{step.title}</h3><div className="phase-action"><span>动作</span><p>{step.action}</p></div></div>
          <div className="phase-coach"><div className="coach-row"><span>看见</span><p>{step.cue}</p></div><div className="coach-row"><span>避免</span><p>{step.avoid}</p></div><div className="coach-row coach-drill"><span>练法</span><p>{step.drill}</p></div></div>
        </div>
        <div className="practice-protocol"><div className="protocol-heading"><span>ONE SIMPLE PROTOCOL</span><strong>只在动作稳定后升级。</strong></div><div className="protocol-grid"><div><b>01</b><strong>无球 × 5</strong><p>找相对先后</p></div><div><b>02</b><strong>半挥 × 5</strong><p>保留胸廓旋转</p></div><div><b>03</b><strong>轻球 × 5</strong><p>保持连续释放</p></div></div><p className="protocol-rule">升级条件：胸廓先转、拍头不抢、击球后还能保持平衡。三点中有一点丢失，就回到上一层。</p></div>
        <p className="lesson-note">这是一套动作观察与练习顺序，不是要求所有球员复制同一条固定轨迹。速度、角度和握拍细节要回到你的实际击球中验证。</p>
      </section>

      <section id="boundary" className="boundary-section force-section">
        <div className="section-heading"><div><span className="section-label">EVIDENCE BOUNDARY</span><h2>科学能支持的，<br /><em>说到这里。</em></h2></div><span className="section-index">READ HONESTLY</span></div>
        <div className="boundary-grid"><article><span>可以说</span><h3>旋转与协同是重要线索</h3><p>研究观察到高手与新手在躯干旋转、肩部旋转、肘/腕活动和整体动作稳定性上存在差异。</p></article><article><span>不能说</span><h3>不存在万能比例</h3><p>不能把“70%来自躯干”或“腰椎必须锁死”写成普遍定律；研究样本、动作任务和测量方法都有限。</p></article><article><span>本站原则</span><h3>先用模型观察，再回到场上验证</h3><p>页面只提供可观察的技术线索，不替代教练现场判断，也不把单块肌肉或单个角度当成答案。</p></article></div>
        <div className="source-strip"><span>PRIMARY SOURCES</span><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5260572/" target="_blank" rel="noreferrer">Zhang et al. / full-body smash model ↗</a><a href="https://www.frontiersin.org/journals/sports-and-active-living/articles/10.3389/fspor.2025.1596670/full" target="_blank" rel="noreferrer">Tajik et al. 2025 / shoulder synergies ↗</a><a href="https://bmcsportsscimedrehabil.biomedcentral.com/articles/10.1186/s13102-025-01163-w" target="_blank" rel="noreferrer">Huang et al. 2025 / clear stroke ↗</a></div>
      </section>

      <footer className="force-footer"><span>力场 / BADMINTON FORCE LAB</span><strong>ADVANCED FORCE TECHNIQUE</strong><span>研究版 · 2026.08</span></footer>
    </main>
  );
}
