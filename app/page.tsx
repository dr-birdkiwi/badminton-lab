'use client';

import { useEffect, useState } from 'react';

/* eslint-disable @next/next/no-img-element */

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
  title: string;
  action: string;
  principle: string;
  cue: string;
};

type TrainingModule = {
  phase: string;
  exercise: string;
  dose: string;
  muscles: string;
  check: string;
};

type TrainingStage = {
  number: string;
  label: string;
  title: string;
  goal: string;
  modules: TrainingModule[];
};

const lessonSteps: LessonStep[] = [
  {
    number: '01',
    label: '判断',
    title: '先判断：这球值得满力杀吗？',
    action: '先看来球高度、自己是否在球后、对手站位和下一拍。球在拍侧肩前上方、身体不用后仰时，才进入完整杀球；窗口缩小时改点杀或劈杀，窗口丢失就先过渡。',
    cue: '挥拍前已经知道这一球要争速度、落点，还是争下一拍。',
    avoid: '见到高球就满力；来球已经在身后，仍用大动作硬压。',
    drill: '随机长短喂球 8 次，触球前报出“杀 / 点 / 过渡”。',
  },
  {
    number: '02',
    label: '到位',
    title: '用最后两步，把击球点留在身体前方',
    action: '提前转身和移动，最后一步只做微调与制动；让头部、躯干与球保持可挥拍的距离，非持拍侧帮助定位，而不是等到起跳后再找球。',
    cue: '不后仰也能触到球；落地后仍能朝下一拍移动。',
    avoid: '追到球正下方，或只追求跳得高，却丢掉球在身体前方的空间。',
    drill: '后场移动 → 定住击球窗口 → 落地再启动，左右各 5 次。',
  },
  {
    number: '03',
    label: '加速',
    title: '把最快的一段，留到触球前',
    action: '握拍和肩带先保持相对放松，在较短加速窗口内由肩内旋、肘伸和前臂旋转共同提高拍头速度；触球时不把肘顶死，也不把上臂耸到耳边。',
    cue: '拍头快但身体不僵；中心触球和出球方向可以重复。',
    avoid: '全程握死、过早用完速度，或把“发力”理解成孤立甩腕。',
    drill: '定点 10 球：先用约 70% 速度，记录中心触球与目标命中；两项不下降再加速。',
  },
  {
    number: '04',
    label: '衔接',
    title: '杀球结束在对手的下一次触球',
    action: '随挥和落地吸收速度，球拍回到身体前方；根据直线或斜线落点选择跟进位置，并在对手触球前完成下一次分腿。',
    cue: '不看自己的杀球，能立刻接封网、扑球或下一次后场。',
    avoid: '落地后欣赏球、机械回到几何中心，或突然急刹把随挥截断。',
    drill: '杀球后随机接“挡网 / 挑后场”第二球，3 组 × 4 次。',
  },
];

const claims = [
  { number: '01', title: '击球窗口', text: '身体在球的侧后方，理想击球点位于持拍肩前上方；不用后仰，也能向下击球。' },
  { number: '02', title: '身体组织', text: '躯干先转开，为拍臂留出通道；非持拍侧帮助定位来球，不让身体挤掉挥拍空间。' },
  { number: '03', title: '触球前加速', text: '把最快的一段留在触球前；肩、肘、前臂共同加速，不是全程握死或只甩手腕。' },
  { number: '04', title: '碰撞与衔接', text: '中心触球、拍面稳定，速度才会变成落点；落地后拍回身前，仍能接管下一拍。' },
];

const forceNodes: ForceNode[] = [
  { number: '01', label: '脚下', title: '建立可移动的支撑', action: '脚与地面建立反作用，让身体能够加速、减速和改变朝向。', principle: '地面提供外部约束，但更大的垂直反作用力并不自动等于更快的杀球。', cue: '最后一步之后仍能微调，不是蹬死在原地。' },
  { number: '02', label: '下肢 · 髋', title: '把身体送进攻击窗口', action: '踝、膝、髋共同管理重心，把球留在拍侧肩前上方，同时保留落地空间。', principle: '下肢首先决定你在哪里、朝哪里以及能否制动，而不是直接把速度“送到拍头”。', cue: '不用后仰就能触球，落地后还能启动。' },
  { number: '03', label: '骨盆', title: '组织朝向，不抢动作', action: '骨盆随步法和来球条件调整朝向，为躯干和击球臂提供可用空间。', principle: '不同步法、起跳方式和击球选择会改变骨盆时序；不存在每球统一的“先转骨盆”。', cue: '身体朝向服务击球点，而不是为了转体而转体。' },
  { number: '04', label: '胸廓', title: '用相对运动创造空间', action: '胸廓与骨盆共同改变朝向，并在需要时保留相对旋转；幅度与先后随来球和打法变化。', principle: '相对旋转可能帮助加速路径，但不是越大越好，也不是顶级动作的唯一模板。', cue: '转体没有挤掉挥拍空间，身体和拍臂能在触球前合流。' },
  { number: '05', label: '肩 · 肘 · 前臂', title: '把速度留到触球前', action: '肩内旋、肘伸和前臂旋转相互耦合，在较短的加速窗口内提高拍头速度。', principle: '研究支持多关节协同，但不支持把拍速归功于单一关节或孤立“甩腕”。', cue: '触球时肘不过度锁死，上臂不过度耸高，握拍也不是全程僵紧。' },
  { number: '06', label: '球拍 · 羽毛球', title: '用甜区把拍速变成球速', action: '拍头速度、拍面方向和拍床上的实际触球位置，共同决定出球速度与方向。', principle: '精英球员之间，同一人的快慢球差异常常首先出现在拍头速度、触球位置和碰撞效率。', cue: '连续 10 球的声音、方向和目标命中是否稳定，而不是只看其中最快一球。' },
  { number: '07', label: '落地 · 衔接', title: '为第二拍完成这次杀球', action: '随挥与落地吸收速度，根据落点和对手回球方向选择跟进位置。', principle: '顶级杀球的价值不只在首球速度，还在能否迫使弱回球并接管下一拍。', cue: '对手触球前完成分腿，球拍回到身体前方。' },
];

const trainingStages: TrainingStage[] = [
  {
    number: '01', label: '窗口与制动', title: '先把高质量击球窗口做得可重复', goal: '这一阶段解决“能不能反复到球后、在前上方触球，并立刻接下一拍”。顶级脚下不是停得最死，而是到位后仍然可调整。',
    modules: [
      { phase: '后场到位 · 再启动', exercise: '随机启动到两个后场点 → 定住击球窗口 → 影子触球 → 教练再指一个方向启动。', dose: '3 组 × 4 次/侧；每次完整回位，组间休息 60–90 秒。', muscles: '臀肌、股四头肌、腘绳肌与小腿共同完成推进、制动和再次启动。', check: '触球位置不向后漂，第二次启动方向仍然清楚。' },
      { phase: '单腿 · 侧向制动', exercise: '低幅度侧向跳或跨步落地，单腿承载后立即向相反方向小步启动。', dose: '3 组 × 4 次/侧；落地声音和膝髋控制变差就停止。', muscles: '臀中肌、臀大肌、股四头肌、腘绳肌和小腿的离心控制。', check: '髋、膝、脚方向一致，身体没有塌向一侧。' },
      { phase: '杀球 · 第二拍', exercise: '影子杀球后，随机接“上网封球”或“再次后退”；训练落地后的第一反应。', dose: '3 组 × 4 个两拍组合；每组保持同样的移动速度。', muscles: '下肢制动链配合躯干抗侧屈，帮助落地后重新组织重心。', check: '对手触球前完成分腿，不在原地看球。' },
    ],
  },
  {
    number: '02', label: '旋转与肩胛', title: '让转体服务拍臂，而不是抢走空间', goal: '这一阶段解决“躯干改变朝向时，拍臂是否仍能自由加速”。负荷要轻到足以保持速度，不用大重量复制杀球轨迹。',
    modules: [
      { phase: '交错站姿 · 旋转投掷', exercise: '用轻药球做侧向旋转投掷，强调快速出手和稳定回收；左右侧都练。', dose: '4 组 × 3 次/侧；每次追求速度，组间充分休息。', muscles: '臀肌、内收肌、腹斜肌与背部肌群共同改变朝向。', check: '球速快但脚下不乱，腰椎没有被迫拧到终点。' },
      { phase: '胸廓 · 肩胛协同', exercise: '交错站姿轻阻力 lift / chop，随后立刻做一次无阻力半挥拍。', dose: '3 组 × 5 次/侧；阻力只要能保持肩胛平顺移动。', muscles: '腹斜肌、前锯肌、下斜方肌和肩袖共同维持胸廓与上臂的关系。', check: '转体后手臂仍有空间，肩不耸、头部不被动作带走。' },
    ],
  },
  {
    number: '03', label: '拍速与碰撞', title: '最后把速度稳定地送进甜区', goal: '这一阶段解决“能不能反复打出快拍头和干净碰撞”。先保留准确率，再缩短加速时间；不要用疲劳中的乱快冒充爆发力。',
    modules: [
      { phase: '过顶投掷 · 无球快挥', exercise: '轻药球过顶投掷与无球快速半挥成对进行；投掷训练整体出手，挥拍训练具体拍速。', dose: '4 组 × 3 次；每次高质量，组间休息 60–90 秒。', muscles: '胸大肌、背阔肌、三角肌、肩袖、肱三头肌与前臂旋转肌群协同工作。', check: '速度提高时肩仍然放松，肘没有提前锁死。' },
      { phase: '十球 · 碰撞测试', exercise: '同一喂球点连续 10 球，记录目标命中和明显偏心触球；再提高一档速度重复。', dose: '2–3 轮 × 10 球；两项指标下降，就退回上一档速度。', muscles: '前臂旋转、握拍与手指屈伸配合肩袖，控制拍面和触球位置。', check: '更快一档仍能保持相近的目标命中和中心触球。' },
    ],
  },
];

const navItems = [
  { id: 'principles', label: '高手判断' },
  { id: 'force-path', label: '表现链' },
  { id: 'training', label: '瓶颈训练' },
  { id: 'lesson', label: '场上检查' },
  { id: 'boundary', label: '证据边界' },
] as const;

function jumpTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ block: 'start' });
}

function SmashVisual() {
  return (
    <div className="mechanics-plate hero-visual">
      <img src="/smash-hero.png" alt="右手羽毛球选手从后场起跳完成杀球，图中标注击球窗口、身体定向、触球前加速与落地衔接四个关键阶段" />
      <div className="hero-visual-shade" aria-hidden="true" />
      <div className="plate-meta"><span>动作研究 / 01</span><span>右手杀球</span></div>
      <div className="visual-label visual-label-base"><i aria-hidden="true" /><div><b>01 / 击球窗口</b><strong>先站到球的侧后方</strong><small>理想击球点在持拍肩前上方<br />身体不后仰，也能向下击球</small></div></div>
      <div className="visual-label visual-label-rotation"><i aria-hidden="true" /><div><b>02 / 身体定向</b><strong>胸口先对准击球方向</strong><small>非持拍侧帮助定位<br />躯干转开，为拍臂留出加速空间</small></div></div>
      <div className="visual-label visual-label-release"><i aria-hidden="true" /><div><b>03 / 拍头加速</b><strong>让最快一段发生在触球前</strong><small>躯干、肩、肘与前臂协同加速<br />握拍在触球瞬间变紧，不是只甩腕</small></div></div>
      <div className="visual-label visual-label-recovery"><i aria-hidden="true" /><div><b>04 / 落地衔接</b><strong>落地马上回到可动位置</strong><small>脚和髋吸收起跳速度<br />拍回身前，下一步还能启动</small></div></div>
      <div className="plate-footer"><span>动作样本，不是唯一模板</span><strong>窗口 → 定向 → 加速 → 衔接</strong></div>
    </div>
  );
}

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeNode, setActiveNode] = useState(0);
  const [activeTraining, setActiveTraining] = useState(0);
  const [activeSection, setActiveSection] = useState('top');
  const step = lessonSteps[activeStep];
  const node = forceNodes[activeNode];
  const trainingStage = trainingStages[activeTraining];

  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>('section[id]')];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target instanceof HTMLElement) setActiveSection(visible.target.id);
    }, { rootMargin: '-18% 0px -62% 0px', threshold: [0, .2, .5, .8] });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navigateTo = (id: string) => {
    setActiveSection(id);
    jumpTo(id);
  };

  return (
    <main className="force-site">
      <header className="force-header">
        <button className="force-brand" onClick={() => navigateTo('top')} aria-label="返回顶部"><span className="force-mark">↗</span><span><strong>力场</strong><small>羽毛球发力教学</small></span></button>
        <nav aria-label="页面导航">{navItems.map((item) => <button key={item.id} className={activeSection === item.id ? 'active' : ''} onClick={() => navigateTo(item.id)} aria-current={activeSection === item.id ? 'location' : undefined}>{item.label}</button>)}</nav>
        <span className="header-index">01 / 杀球</span>
      </header>

      <section id="top" className="force-hero force-section">
        <div className="hero-copy">
          <span className="eyebrow">进阶发力技术</span>
          <h1>先争窗口<br /><em>再争拍速</em></h1>
          <p>先移动到球的侧后方，让击球点落在持拍肩前上方；再让躯干为拍臂留出空间，把最快的拍头加速留到触球前。中心触球与稳定拍面，才会把速度变成向下落点。</p>
          <div className="hero-question"><span>高手先问</span><strong>身体在球的侧后方吗？击球点在身前上方吗？落地后还能移动吗？</strong></div>
          <div className="hero-ramp"><span>读图路径</span><strong>先定位身体，再把速度留到触球前</strong><div><b>窗口</b><i>→</i><b>定向</b><i>→</i><b>加速</b><i>→</i><b>衔接</b></div></div>
        </div>
        <SmashVisual />
      </section>

      <section id="principles" className="principles-section force-section">
        <div className="section-heading"><div><span className="section-label">击球决策</span><h2>这球该怎么打？<br /><em>先看条件，再选出手。</em></h2></div><span className="section-index">检查 · 选择 · 衔接</span></div>
        <div className="decision-board">
          <div className="decision-board-head"><div><span>现场问题</span><strong>这球现在具不具备完整发力条件？</strong></div><div className="decision-board-purpose"><span>本章作用</span><strong>检查这一拍，不给球员定级。</strong></div></div>
          <div className="claim-grid">{claims.map((claim) => <article key={claim.number} className="claim-card"><span>{claim.number}</span><h3>{claim.title}</h3><p>{claim.text}</p></article>)}</div>
          <div className="principle-line"><span>判断路线</span><strong>窗口完整 + 有空间 + 碰撞可控 → 完整杀球；时间被压缩 → 点杀 / 半杀；窗口丢失或无法衔接 → 先过渡。</strong></div>
          <div className="shot-choice">
            <div className="shot-choice-head"><span>根据结果选择打法</span><strong>每次出手先服从来球条件，再追求拍速。</strong></div>
            <div className="shot-choice-grid">
              <article><b>01 / 完整杀球</b><h3>完整杀球</h3><p><span>窗口</span>球在拍侧肩前上方，身体不用后仰，落地仍可控。</p><p><span>目标</span>用速度或落点直接得分，或制造确定的弱回球。</p></article>
              <article><b>02 / 点杀 · 半杀</b><h3>点杀 · 半杀</h3><p><span>窗口</span>时间或空间被压缩，但仍能在较高点向下触球。</p><p><span>目标</span>缩短准备，优先抢节奏、空档和下一拍。</p></article>
              <article><b>03 / 先过渡</b><h3>先过渡</h3><p><span>窗口</span>球已在身后、身体后仰，或落地后无法继续移动。</p><p><span>目标</span>用高远、吊球或安全落点重建位置，不勉强硬杀。</p></article>
            </div>
          </div>
        </div>
      </section>

      <section id="force-path" className="force-path-section force-section">
        <div className="section-heading"><div><span className="section-label">表现链</span><h2>这不是传送带，<br /><em>是一组相互约束。</em></h2></div><span className="section-index">07 个关键任务</span></div>
        <div className="path-statement"><span>专家修正</span><strong>不要寻找唯一的“起力点”。脚下决定位置和约束，躯干与上肢共同组织拍速，碰撞决定有多少拍速真正进入羽毛球；不同步法和杀球类型会改变各段时序。</strong></div>
        <div className="path-layout">
          <div className="path-visual" role="tablist" aria-label="杀球发力路径">
            <div className="path-meta"><span>从约束到碰撞</span><span>任务 · 不代表固定顺序</span></div>
            <div className="path-track">
              {forceNodes.map((item, index) => <div className="path-track-item" key={item.number}><button id={`node-tab-${item.number}`} className={activeNode === index ? 'path-node active' : 'path-node'} onClick={() => setActiveNode(index)} role="tab" aria-selected={activeNode === index} aria-controls="node-panel"><b>{item.number}</b><strong>{item.label}</strong></button>{index < forceNodes.length - 1 && <span className="path-arrow" aria-hidden="true">→</span>}</div>)}
            </div>
            <div className="path-legend" aria-label="发力路径四类任务"><span><i className="legend-support" />支撑条件</span><span><i className="legend-orient" />方向与空间</span><span><i className="legend-release" />末端释放</span><span><i className="legend-brake" />制动回位</span></div>
            <p className="path-footnote">箭头只是阅读顺序：真实动作会重叠发生，也会随完整杀球、点杀、起跳方式和来球位置改变。</p>
            <div className="path-progress" aria-live="polite"><div><span>当前观察</span><strong>{node.number} / {node.label}</strong></div><div className="progress-meter" aria-hidden="true"><i style={{ width: `${((activeNode + 1) / forceNodes.length) * 100}%` }} /></div><small>点击节点，右侧切换这一段的动作逻辑。</small></div>
          </div>
          <div id="node-panel" className="path-reading" role="tabpanel" tabIndex={0} aria-labelledby={`node-tab-${node.number}`}>
            <span className="section-label">当前环节 · {node.number} · {node.label}</span>
            <h3>{node.title}</h3>
            <div className="path-reading-grid"><div><span>这一段发生什么</span><p>{node.action}</p></div><div><span>它解决什么问题</span><p>{node.principle}</p></div><div><span>场上怎么检查</span><p>{node.cue}</p></div></div>
          </div>
        </div>
      </section>

      <section id="training" className="training-section force-section">
        <div className="section-heading"><div><span className="section-label">训练瓶颈</span><h2>力量只是底座，<br /><em>转化才是成绩。</em></h2></div><span className="section-index">03 个训练阶段</span></div>
        <div className="training-statement"><span>顶级训练逻辑</span><strong>先用球场结果找到瓶颈：窗口不稳、拍速不足、碰撞不净或第二拍掉速。再选择力量、爆发或技术任务，最后必须回到真实击球验证。</strong></div>
        <div className="training-layout">
          <div className="training-visual" role="tablist" aria-label="杀球训练阶段">
            <div className="training-meta"><span>三个训练阶段</span><span>只练一个短板</span></div>
            <div className="training-track">
              {trainingStages.map((item, index) => <div className="training-track-item" key={item.number}><button id={`training-tab-${item.number}`} className={activeTraining === index ? 'training-node active' : 'training-node'} onClick={() => setActiveTraining(index)} role="tab" aria-selected={activeTraining === index} aria-controls="training-panel"><b>{item.number}</b><strong>{item.label}</strong></button>{index < trainingStages.length - 1 && <span className="training-arrow" aria-hidden="true">→</span>}</div>)}
            </div>
            <div className="training-rules"><div><b>01</b><strong>先有球场指标</strong><p>记录窗口、目标和第二拍。</p></div><div><b>02</b><strong>高速动作要休息</strong><p>速度下降就结束这一组。</p></div><div><b>03</b><strong>负荷不能改动作</strong><p>力量离场练，拍速回场验。</p></div></div>
            <div className="training-progress" aria-live="polite"><div><span>当前训练阶段</span><strong>{trainingStage.number} / {trainingStage.label}</strong></div><div className="progress-meter" aria-hidden="true"><i style={{ width: `${((activeTraining + 1) / trainingStages.length) * 100}%` }} /></div><small>{trainingStage.modules.length} 个任务 · 最后回到球场验证。</small></div>
            <div className="training-photo"><img src="/training-footwork.png" alt="羽毛球运动员进行低位分腿与减速控制训练" /><div className="training-photo-shade" aria-hidden="true" /><div className="training-photo-meta"><span>训练示例 / 支撑与制动</span><span>低位 · 可控 · 可重复</span></div><div className="training-photo-caption"><b>承载动作示例</b><strong>到位后能停住，才有下一次启动。</strong></div></div>
          </div>
          <div id="training-panel" className="training-reading" role="tabpanel" tabIndex={0} aria-labelledby={`training-tab-${trainingStage.number}`}>
            <span className="section-label">训练阶段 · {trainingStage.number} · {trainingStage.label}</span>
            <h3>{trainingStage.title}</h3>
            <div className="training-goal"><span>这一组要解决什么</span><p>{trainingStage.goal}</p></div>
            <div className="training-module-list">
              {trainingStage.modules.map((module) => <article className="training-module" key={module.phase}><div className="training-module-head"><strong>{module.phase}</strong><span>瓶颈训练</span></div><div><span>训练任务</span><p>{module.exercise}</p></div><div><span>建议剂量</span><p>{module.dose}</p></div><div><span>肌肉支持</span><p>{module.muscles}</p></div><div><span>回场标准</span><p>{module.check}</p></div></article>)}
            </div>
          </div>
        </div>
        <p className="training-note">剂量是保守起点，不是统一处方。增强式训练可能改善爆发、敏捷、速度和平衡，但目前证据确定性偏低；训练效果必须由你的目标命中、中心触球与第二拍能力来判断。出现疼痛、麻木或明显不稳时停止，并寻求专业评估。</p>
        <div className="training-sources"><span>训练证据</span><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12170632/" target="_blank" rel="noreferrer">2025 / 肩部肌肉协同 ↗</a><a href="https://pubmed.ncbi.nlm.nih.gov/38533062/" target="_blank" rel="noreferrer">2024 / 增强式训练综述 ↗</a><a href="https://pubmed.ncbi.nlm.nih.gov/33663330/" target="_blank" rel="noreferrer">2024 / 精英跳杀决定因素 ↗</a></div>
      </section>

      <section id="lesson" className="lesson-section force-section">
        <div className="section-heading"><div><span className="section-label">场上检查</span><h2>把高手标准压缩成<br /><em>四个问题。</em></h2></div><span className="section-index">判断 · 到位 · 击球 · 衔接</span></div>
        <p className="lesson-intro">上场时不要逐个控制关节。只问四个结果问题：这球该不该杀、窗口有没有赢、碰撞是否干净、第二拍能不能接上。</p>
        <div className="phase-tabs" role="tablist" aria-label="可照着练的杀球发力步骤">
          {lessonSteps.map((item, index) => <button key={item.number} id={`step-tab-${item.number}`} className={activeStep === index ? 'phase-tab active' : 'phase-tab'} onClick={() => setActiveStep(index)} role="tab" aria-selected={activeStep === index} aria-controls="step-panel"><span>{item.number}</span><strong>{item.label}</strong></button>)}
        </div>
        <div id="step-panel" className="phase-reading" role="tabpanel" tabIndex={0} aria-labelledby={`step-tab-${step.number}`}>
          <div className="phase-main"><div className="phase-status"><span>当前检查</span><strong>{step.number} / {step.label}</strong><small>第 {activeStep + 1} / 04 步</small></div><span className="section-label">步骤 / {step.number}</span><h3>{step.title}</h3><div className="phase-action"><span>动作</span><p>{step.action}</p></div></div>
          <div className="phase-coach"><div className="coach-row"><span>看见</span><p>{step.cue}</p></div><div className="coach-row"><span>避免</span><p>{step.avoid}</p></div><div className="coach-row coach-drill"><span>练法</span><p>{step.drill}</p></div></div>
        </div>
        <div className="practice-protocol"><div className="protocol-heading"><span>一套高手训练流程</span><strong>同时训练选择、碰撞和第二拍。</strong></div><div className="protocol-grid"><div><b>01</b><strong>随机判断 × 8</strong><p>触球前选择完整杀、点杀或过渡</p></div><div><b>02</b><strong>十球测试 × 2</strong><p>同时记录目标命中与偏心触球</p></div><div><b>03</b><strong>杀后两拍 × 6</strong><p>随机接封网或再次后退</p></div></div><p className="protocol-rule">升级条件：提高一档速度后，目标命中不明显下降、偏心触球不增加、第二拍仍能按时分腿。只要一项丢失，就不是有效的“更快”。</p></div>
        <div className="elite-scorecard"><div><span>01 / 窗口</span><strong>球在拍侧肩前上方</strong></div><div><span>02 / 拍速</span><strong>最快加速出现在触球前</strong></div><div><span>03 / 碰撞</span><strong>甜区与目标同时稳定</strong></div><div><span>04 / 下一拍</span><strong>对手触球前完成分腿</strong></div></div>
        <p className="lesson-note">同一个选手在不同来球、不同战术和不同杀球类型中，本来就会出现动作变化。用结果约束动作，而不是复制某位顶级球员的一帧姿势。</p>
      </section>

      <section id="boundary" className="boundary-section force-section">
        <div className="section-heading"><div><span className="section-label">证据边界</span><h2>科学能支持的，<br /><em>说到这里。</em></h2></div><span className="section-index">如实阅读</span></div>
        <div className="boundary-grid"><article><span>可以说</span><h3>拍速、触球配置与碰撞效率最接近结果</h3><p>精英研究反复指出，拍头速度、触球时的上肢配置，以及拍床上的实际触球位置，都与球速和方向有关。</p></article><article><span>不能说</span><h3>蹬地越大，不等于球一定越快</h3><p>精英跳杀研究中，垂直地面反作用力与力发展率并未和球速相关；“脚到手的固定传力链”不能当成已证实定律。</p></article><article><span>本站原则</span><h3>先看比赛结果，再解释关节动作</h3><p>先判断窗口、拍速、碰撞和第二拍，再用生物力学寻找瓶颈；不同打法、步法和个体可以有不同解法。</p></article></div>
        <div className="source-strip"><span>主要来源</span><a href="https://sfbadminton.tenniscity.org/wp-content/uploads/sites/29/2020/03/bwf_coach_education_coaches_manual_l1-2nd-edition-midres.pdf" target="_blank" rel="noreferrer">教练手册 · 杀球 ↗</a><a href="https://pubmed.ncbi.nlm.nih.gov/33663330/" target="_blank" rel="noreferrer">精英跳杀研究 ↗</a><a href="https://oars.uos.ac.uk/1325/" target="_blank" rel="noreferrer">触球位置研究 ↗</a><a href="https://figshare.com/articles/journal_contribution/28759388" target="_blank" rel="noreferrer">击球稳定性研究 ↗</a></div>
      </section>

      <footer className="force-footer"><span>力场 / 羽毛球发力实验室</span><strong>高手表现复盘</strong><span>专家修订 · 2026.08</span></footer>
    </main>
  );
}
