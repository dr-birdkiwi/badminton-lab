'use client';

import { useState } from 'react';

type SectionKey = 'overview' | 'separation' | 'sequence' | 'release' | 'diagnostics';

const navItems: { key: SectionKey; label: string; en: string }[] = [
  { key: 'overview', label: '总览', en: 'Overview' },
  { key: 'separation', label: '躯干分离', en: 'Separation' },
  { key: 'sequence', label: '旋转时序', en: 'Sequence' },
  { key: 'release', label: '末端加速', en: 'Release' },
  { key: 'diagnostics', label: '动作诊断', en: 'Diagnostics' },
];

const phaseData = [
  {
    number: '01', label: '加载', title: '先把身体放在可以旋转的位置', cue: '不要先追求大幅度。先让侧身、支撑和球的位置可控。',
    body: '下肢和躯干提供方向，拍侧完成预备。此时的任务是建立之后能够释放的条件。',
    focus: '站位与反向动作', avoid: '把胸口和骨盆一起拧到极限', segments: ['脚下 / 支撑', '骨盆 / 定向', '胸椎 / 预备'],
  },
  {
    number: '02', label: '分离', title: '核心段稳住方向，胸椎保留旋转空间', cue: '腰椎不是被锁死，而是避免在旋转中失去方向。',
    body: '把“骨盆朝向”和“胸口朝向”分开观察。相邻关节假说可以帮助理解，但不应当被当作固定角度。',
    focus: '骨盆—胸廓的相对关系', avoid: '用腰部过度扭转代替胸椎活动', segments: ['腰椎 / 稳定', '胸椎 / 灵活', '肩胛 / 组织'],
  },
  {
    number: '03', label: '旋转', title: '胸椎先完成方向变化，再把身体带向击球', cue: '先让胸口转向，再让拍头进入加速区。',
    body: '这是杀球爆发感最容易被误解的部分：不是把所有力一次性挤出来，而是让躯干旋转在正确的时间发生。',
    focus: '胸廓旋转速度与幅度', avoid: '只用手臂向下砍球', segments: ['骨盆 / 稳定基座', '胸椎 / 主要旋转', '肩部 / 传递'],
  },
  {
    number: '04', label: '释放', title: '肩、肘、前臂在短时间内连续加速', cue: '拍头速度来自一段连续动作，不是孤立甩腕。',
    body: '肩关节内旋、肘伸展与前臂旋转共同影响拍头速度。具体幅度会因技术、来球和球员差异而改变。',
    focus: '近端到远端的连续释放', avoid: '全程握死或把手腕当发动机', segments: ['肩 / 内旋', '肘 / 伸展', '前臂 / 旋转'],
  },
  {
    number: '05', label: '制动', title: '击球之后，身体仍然要完成动作', cue: '能否控制住、落地并继续下一拍，是力量是否有效的一部分。',
    body: '随挥、落地和身体回收不是“打完以后再说”。它们决定下一拍能否继续保持可用的身体状态。',
    focus: '减速与下一拍准备', avoid: '击球后突然刹死或失去平衡', segments: ['拍头 / 减速', '躯干 / 回收', '下肢 / 再定位'],
  },
];

const diagnosticData = [
  { number: '01', title: '动作很大，球速不高', signal: '无效摆动多，击球点和释放时机不稳定。', check: '看胸口是否先转，拍头是否真正通过击球点。', next: '把动作缩小到可重复的连续释放。' },
  { number: '02', title: '总感觉在甩手腕', signal: '上肢提前用力，躯干没有给末端创造条件。', check: '看肩、肘、前臂是否在同一段动作里连续变化。', next: '先练躯干分离，再练低速末端加速。' },
  { number: '03', title: '腰部拧得很痛苦', signal: '把腰椎当作主要旋转段，胸椎和髋部没有分工。', check: '看骨盆是否失去方向，胸口是否没有独立转动。', next: '降低幅度，重新建立稳定与灵活的分工。' },
  { number: '04', title: '击球后完全散掉', signal: '只练爆发，不练减速和落地控制。', check: '看身体能否在击球后保持可回收状态。', next: '把制动纳入每一次高质量重复。' },
];

function jumpTo(section: SectionKey) {
  document.getElementById(section)?.scrollIntoView({ block: 'start' });
}

function MechanicsPlate() {
  return <div className="mechanics-plate" role="img" aria-label="核心段稳定、胸椎旋转与末端加速的静态教学示意">
    <div className="plate-topline"><span>FORCE MAP / 001</span><span>SMASH · RIGHT-HANDED</span></div>
    <div className="plate-court-line line-vertical" /><div className="plate-court-line line-horizontal" />
    <div className="plate-axis-label axis-pelvis">骨盆 / 腰椎<br /><b>方向稳定</b></div>
    <div className="plate-axis-label axis-thorax">胸椎 / 胸口<br /><b>旋转释放</b></div>
    <div className="plate-axis-label axis-distal">肩 → 肘 → 前臂<br /><b>末端加速</b></div>
    <div className="plate-core core-pelvis"><span>腰椎</span><b>STABLE</b></div>
    <div className="plate-core core-thorax"><span>胸椎</span><b>ROTATE</b></div>
    <div className="plate-core core-shoulder"><span>上肢</span><b>RELEASE</b></div>
    <div className="plate-arrow arrow-one">保持方向</div><div className="plate-arrow arrow-two">先转胸口</div><div className="plate-arrow arrow-three">最后给拍头</div>
    <div className="plate-footer"><span>不是力量比例</span><strong>是时序与协同</strong></div>
  </div>;
}

function ForceStack() {
  return <div className="force-stack" aria-label="进阶杀球发力层级">
    <div className="stack-line" />
    <article className="stack-layer layer-ground"><span>01 / BASE</span><strong>支撑与定向</strong><p>脚下、髋部和骨盆先给身体一个可控的方向。</p></article>
    <article className="stack-layer layer-core"><span>02 / CORE</span><strong>核心段稳定</strong><p>腰椎不承担所有旋转，先保持身体组织。</p></article>
    <article className="stack-layer layer-thorax"><span>03 / THORAX</span><strong>胸椎旋转</strong><p>胸廓完成主要方向变化，形成可释放的空间。</p></article>
    <article className="stack-layer layer-arm"><span>04 / DISTAL</span><strong>肩肘前臂</strong><p>近端到远端连续加速，拍头才有速度。</p></article>
  </div>;
}

export default function Home() {
  const [activePhase, setActivePhase] = useState(1);
  const [activeDiagnostic, setActiveDiagnostic] = useState(0);
  const currentPhase = phaseData[activePhase];
  const currentDiagnostic = diagnosticData[activeDiagnostic];

  return <main className="force-site">
    <header className="force-header"><button className="force-brand" onClick={() => jumpTo('overview')} aria-label="返回总览"><span className="force-mark">↗</span><span><strong>力场</strong><small>BADMINTON FORCE LAB</small></span></button><nav aria-label="进阶发力导航">{navItems.map((item) => <button key={item.key} onClick={() => jumpTo(item.key)}><span>{item.label}</span><small>{item.en}</small></button>)}</nav><div className="force-header-meta"><span>ADVANCED / 01</span><button className="force-mobile-menu" aria-label="菜单">+</button></div></header>

    <section id="overview" className="force-hero force-section"><div className="hero-copy"><span className="eyebrow">ADVANCED FORCE TECHNIQUE / 001</span><h1>杀球不是<br /><em>更用力。</em></h1><p className="hero-lede">是让核心段、胸椎和上肢，在正确的时序里完成一次协同。先分离，再旋转，最后把速度释放到拍头。</p><div className="hero-claim"><span>核心问题</span><strong>你的胸口，是否先于手臂完成方向变化？</strong></div><div className="hero-actions"><button className="dark-button" onClick={() => jumpTo('separation')}>进入发力框架 <span>↘</span></button><button className="quiet-button" onClick={() => jumpTo('sequence')}>查看完整时序 <span>→</span></button></div></div><MechanicsPlate /></section>

    <section className="force-intro force-section"><div className="section-label">THE WORKING MODEL</div><div className="intro-grid"><h2>把“力气小”拆开，<br /><em>你会看到三个不同问题。</em></h2><div><p>有些人缺的是身体分离，有些人缺的是旋转时序，有些人已经转了身体，却没有把速度连续释放到拍头。</p><p className="muted-copy">这个页面只讨论进阶发力技术。它不是固定角度、固定比例或个人诊断。</p></div></div><div className="force-stack-wrap"><ForceStack /></div></section>

    <section id="separation" className="separation-section force-section"><div className="section-heading"><div><span className="section-label">01 / TORSO SEPARATION</span><h2>核心段稳住方向，<br /><em>胸椎保留旋转。</em></h2></div><span className="section-index">THE FIRST SPLIT</span></div><div className="split-grid"><article className="split-card split-good"><div className="split-card-top"><span>USEFUL MODEL</span><b>可用模型</b></div><div className="split-direction"><div><small>骨盆 / 腰椎</small><strong>朝向保持</strong><span>稳定条件</span></div><div className="split-symbol">＋</div><div><small>胸椎 / 胸口</small><strong>方向变化</strong><span>旋转来源</span></div></div><p>当骨盆和胸口不再被当作一个整体，身体才有机会在保持方向的同时产生旋转。</p></article><article className="split-card split-risk"><div className="split-card-top"><span>COMMON COLLAPSE</span><b>常见塌陷</b></div><div className="collapse-lines"><span>骨盆 ↗</span><span>胸口 ↗</span><strong>一起转<br />没有相对关系</strong></div><p>这不是要求把腰“锁死”，而是避免把腰椎代替胸椎完成所有旋转。</p></article></div><div className="reading-row"><div><span className="reading-key">看哪里</span><strong>肚脐与胸骨是否指向同一个方向？</strong></div><div><span className="reading-key">不要追求</span><strong>人为拧出极端的反向角度。</strong></div><div><span className="reading-key">下一步</span><strong>在分离后练习胸口向前的旋转。</strong></div></div></section>

    <section id="sequence" className="sequence-section force-section"><div className="section-heading"><div><span className="section-label">02 / ROTATION SEQUENCE</span><h2>不是一条箭头，<br /><em>是一段时序。</em></h2></div><span className="section-index">SELECT A PHASE</span></div><div className="phase-selector" role="tablist" aria-label="杀球发力阶段">{phaseData.map((phase, index) => <button key={phase.number} className={activePhase === index ? 'phase-selector-item active' : 'phase-selector-item'} onClick={() => setActivePhase(index)} role="tab" aria-selected={activePhase === index}><span>{phase.number}</span><strong>{phase.label}</strong></button>)}</div><div className="sequence-board"><div className="sequence-reading"><span className="section-label">CURRENT PHASE / {currentPhase.number}</span><h3>{currentPhase.title}</h3><p>{currentPhase.body}</p><div className="cue-block"><span>外部线索</span><strong>{currentPhase.cue}</strong></div><div className="phase-meta"><div><span>此阶段看</span><b>{currentPhase.focus}</b></div><div><span>避免</span><b>{currentPhase.avoid}</b></div></div></div><div className="timing-board"><div className="timing-heading"><span>BODY SEGMENTS</span><span>TIME →</span></div>{currentPhase.segments.map((segment, index) => <div className="timing-row" key={segment}><span>{segment}</span><div className={`timing-bar timing-${activePhase}-${index}`}><i /><b /></div><small>{index === 0 ? '条件' : index === 1 ? '主任务' : '连接'}</small></div>)}<div className="timing-legend"><span><i className="legend-dot solid" />主要参与</span><span><i className="legend-dot hollow" />保持条件</span><span><i className="legend-dot line" />连接下一段</span></div></div></div><div className="sequence-footnote"><span>教学边界</span><p>身体段落不是固定齿轮，也不存在一套适合所有人的精确时间表。这里使用“相对先后”和“可观察结果”帮助你读懂动作。</p></div></section>

    <section id="release" className="release-section force-section"><div className="section-heading"><div><span className="section-label">03 / DISTAL RELEASE</span><h2>最后的速度，<br /><em>不是来自孤立甩腕。</em></h2></div><span className="section-index">SHOULDER → ELBOW → FOREARM</span></div><div className="release-grid"><article className="release-card"><span>01 / SHOULDER</span><h3>肩部提供旋转条件</h3><p>肩胛与肩关节要能组织上肢，不是越松越好，也不是越紧越好。</p><div className="release-line"><b>观察</b><span>肩部是否在胸椎旋转之后进入释放区？</span></div></article><article className="release-card release-card-dark"><span>02 / ELBOW</span><h3>肘部连接近端与末端</h3><p>肘伸展参与拍头速度形成，但不代表手臂越直、击球越有力。</p><div className="release-line"><b>观察</b><span>肘部是否在拍头通过击球点前完成连续变化？</span></div></article><article className="release-card"><span>03 / FOREARM</span><h3>前臂完成末端旋转</h3><p>前臂旋转是末端动作的一部分。手腕可以调整拍面，但不是整条动力链的发动机。</p><div className="release-line"><b>观察</b><span>握拍是否允许拍头加速，而不是从头到尾握死？</span></div></article></div><div className="release-principle"><span>一句话</span><strong>先让身体产生可用的旋转，再让上肢把它连续地释放出去。</strong></div></section>

    <section id="diagnostics" className="diagnostics-section force-section"><div className="section-heading"><div><span className="section-label">04 / TECHNICAL DIAGNOSTICS</span><h2>把“没力”翻译成<br /><em>可以观察的问题。</em></h2></div><span className="section-index">NO SHORTCUTS</span></div><div className="diagnostic-board"><div className="diagnostic-nav">{diagnosticData.map((item, index) => <button key={item.number} className={activeDiagnostic === index ? 'diagnostic-tab active' : 'diagnostic-tab'} onClick={() => setActiveDiagnostic(index)}><span>{item.number}</span><strong>{item.title}</strong></button>)}</div><div className="diagnostic-detail"><span className="section-label">FIELD READ / {currentDiagnostic.number}</span><h3>{currentDiagnostic.title}</h3><div className="diagnostic-columns"><div><span>可能发生了什么</span><p>{currentDiagnostic.signal}</p></div><div><span>先观察</span><p>{currentDiagnostic.check}</p></div><div><span>下一步</span><p>{currentDiagnostic.next}</p></div></div></div></div></section>

    <section className="evidence-section force-section"><div className="section-heading"><div><span className="section-label">EVIDENCE / BOUNDARY</span><h2>让模型有用，<br /><em>也让它保持诚实。</em></h2></div><span className="section-index">READ BEFORE TRAINING</span></div><div className="evidence-grid"><article><span>USER MATERIAL</span><h3>你提供的知乎材料</h3><p>最有价值的教学线索是“核心段稳定、胸椎段旋转、肩关节保持稳定条件”。其中的力量百分比和个别球员照片不作为本站的确定结论。</p></article><article><span>RESEARCH GUARDRAIL</span><h3>研究支持什么</h3><p>羽毛球击球可以从近端到远端观察身体段落的连续变化；精英动作不等于所有人的复制模板，页面只保留时序、协同和可观察线索。</p></article><article><span>EDITORIAL RULE</span><h3>本站不承诺什么</h3><p>不承诺某个固定角度、力量比例或单一训练动作能解决所有“杀球没力”。如出现疼痛、麻木或明显失控，应停止练习并寻求合资格人士评估。</p></article></div><div className="source-strip"><span>内容来源</span><a href="https://www.jstage.jst.go.jp/article/biomechanisms/12/0/12_KJ00004275299/_article/-char/en" target="_blank" rel="noreferrer">上肢动作链研究 ↗</a><a href="https://doi.org/10.1186/s13102-025-01163-w" target="_blank" rel="noreferrer">高远球段落加速度研究 ↗</a><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6348812/" target="_blank" rel="noreferrer">后场击球下肢研究 ↗</a></div></section>

    <footer className="force-footer"><span>力场 / BADMINTON FORCE LAB</span><strong>ADVANCED FORCE TECHNIQUE</strong><span>研究版 · 2026.08</span></footer>
  </main>;
}
