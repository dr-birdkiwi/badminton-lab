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

type TrainingModule = {
  phase: string;
  exercise: string;
  muscles: string;
  check: string;
};

type TrainingStage = {
  number: string;
  label: string;
  english: string;
  title: string;
  goal: string;
  modules: TrainingModule[];
};

const lessonSteps: LessonStep[] = [
  {
    number: '01',
    label: '准备',
    title: '先侧身，让击球点出现在身体前上方',
    action: '来球开始上升时，拍侧肩和髋转到侧面；拍臂回到可以释放的准备区，非持拍侧帮助你判断球和身体的距离。',
    cue: '身体与球之间有空间，击球点在身体前上方的可控范围内。',
    avoid: '正面对网等球，或为了“蓄力”把腰椎拧到失去平衡。',
    drill: '影子动作 5 次：侧身 → 抬肘 → 停住，先不挥拍。',
  },
  {
    number: '02',
    label: '到位',
    title: '先把身体停在能转、能制动的位置',
    action: '最后一步把身体送到球侧后方，脚下先吸收向后的惯性；骨盆组织方向，胸廓保留相对转动的空间。',
    cue: '到位后仍然能转身和调整，而不是被最后一步带着向后倒。',
    avoid: '只追球不管重心，或用腰椎硬扭来制造“转体”。',
    drill: '无球 5 次：到位 → 停稳 → 胸口转向击球区。',
  },
  {
    number: '03',
    label: '击球',
    title: '让肩、肘、前臂在窗口内连续释放',
    action: '胸廓完成主要方向变化后，肩、肘、前臂和握拍配合进入释放；拍头在触球前加速，拍面在碰撞瞬间保持可控。',
    cue: '拍头已经连续起来，而不是最后一下孤立甩腕；击球点在身体前上方。',
    avoid: '肩肘僵住、握拍全程绷紧，或用手腕补救前段缺失。',
    drill: '轻球三档：50% → 70% → 全速；上一档不稳定就不升级。',
  },
  {
    number: '04',
    label: '回位',
    title: '把速度收回来，为下一拍保留位置',
    action: '击球后让球拍和身体自然随挥，用落地和减速吸收角动量；回到中场后重新分腿，准备下一次移动。',
    cue: '击球后仍然平衡，下一拍可以继续向任意方向移动。',
    avoid: '突然刹死、向后倒，或落地过硬后失去下一拍。',
    drill: '影子或多球：杀球 → 停稳 → 回中分腿，3 组 × 5 次。',
  },
];

const claims = [
  { number: '01', title: '先有位置', text: '最后一步的任务不是把地面力量“推上去”，而是让身体停在可旋转、可制动的击球位置。' },
  { number: '02', title: '再有相对', text: '骨盆组织方向，胸廓保留相对运动；相对关系提供时序和空间，不等于追求极限扭转。' },
  { number: '03', title: '最后有速度', text: '肩、肘、前臂和拍头连续释放，身体的协调只有进入有效碰撞，才会变成出球速度。' },
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

const trainingStages: TrainingStage[] = [
  {
    number: '01', label: '承载与制动', english: 'BASE / BRAKE', title: '先让身体到位后仍然可控', goal: '这一阶段解决“脚下能不能把身体停在正确位置”。不要急着加大跳跃或负重，先建立单腿承载、重心管理和减速能力。',
    modules: [
      { phase: '脚下 · 支撑', exercise: '分腿垫步 → 侧向跨步 → 单脚停稳；从低幅度开始，落地后保留下一步方向。', muscles: '小腿三头肌、股四头肌、臀中肌与臀大肌；关注吸收力量和单腿稳定。', check: '到位后能改方向，不原地蹬死。' },
      { phase: '下肢 · 髋', exercise: '侧向台阶上步停稳，或跨步 → 转髋 → 停住；每次都保留旋转空间。', muscles: '臀肌、髋外展/内收与旋转肌群，配合腘绳肌和小腿管理重心。', check: '最后一步把重心带到球侧后方，但仍然能转身。' },
      { phase: '随挥 · 回位', exercise: '影子杀球 → 落地停稳 → 回中分腿；先练减速，再增加球速。', muscles: '臀肌、股四头肌、腘绳肌和小腿的离心控制，配合躯干抗侧屈。', check: '击球后能在下一拍继续移动。' },
    ],
  },
  {
    number: '02', label: '旋转组织', english: 'DIRECT / SEPARATE', title: '再把方向和相对旋转练出来', goal: '这一阶段解决“身体有没有空间完成转向”。骨盆负责组织方向，胸廓保留相对运动；追求可重复的时序，不追求极限扭转。',
    modules: [
      { phase: '骨盆 · 定向', exercise: '交错站姿抗旋转 → 小幅转向；也可用轻药球做低速 scoop toss。', muscles: '臀大肌、臀中肌、内收肌与腹斜肌；重点是稳定和转向之间的切换。', check: '骨盆能改变方向，腰椎不承担全部扭转。' },
      { phase: '胸廓 · 分离', exercise: '交错站姿胸廓旋转，或做轻阻力 lift / chop；骨盆只做必要配合。', muscles: '腹斜肌、前锯肌、胸椎伸肌与旋转肌群，肩胛控制是动作质量的一部分。', check: '胸口能先进入击球方向，身体不被拧成一块。' },
    ],
  },
  {
    number: '03', label: '释放与转化', english: 'RELEASE / IMPACT', title: '最后把能力变成拍头速度', goal: '这一阶段解决“身体的方向变化能不能进入碰撞窗口”。上肢练的是协同和末端控制，不是孤立甩腕或单纯追求更重。',
    modules: [
      { phase: '肩 · 肘 · 前臂', exercise: '轻药球推掷/过顶投掷，或弹力带半挥释放；低速稳定后再逐级加速。', muscles: '胸大肌、三角肌、肩袖、前锯肌/下斜方肌，以及肱三头肌和前臂旋前旋后肌群。', check: '肩、肘、前臂连续进入，拍头在触球前已经加速。' },
      { phase: '球拍 · 碰撞', exercise: '半挥 → 定点轻球 → 目标击球；先检查击球点和拍面，再增加力度。', muscles: '前臂旋前/旋后、握拍与手指屈伸协调，配合肩袖控制拍面和末端。', check: '击球点在前方，拍面稳定，出球方向可重复。' },
    ],
  },
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
  const [activeTraining, setActiveTraining] = useState(0);
  const step = lessonSteps[activeStep];
  const node = forceNodes[activeNode];
  const trainingStage = trainingStages[activeTraining];

  return (
    <main className="force-site">
      <header className="force-header">
        <button className="force-brand" onClick={() => jumpTo('top')} aria-label="返回顶部"><span className="force-mark">↗</span><span><strong>力场</strong><small>BADMINTON FORCE LAB</small></span></button>
        <nav aria-label="页面导航"><button onClick={() => jumpTo('principles')}>核心结论</button><button onClick={() => jumpTo('force-path')}>发力机制</button><button onClick={() => jumpTo('training')}>能力训练</button><button onClick={() => jumpTo('lesson')}>动作检查</button><button onClick={() => jumpTo('boundary')}>证据边界</button></nav>
        <span className="header-index">01 / SMASH</span>
      </header>

      <section id="top" className="force-hero force-section">
        <div className="hero-copy">
          <span className="eyebrow">ADVANCED FORCE TECHNIQUE</span>
          <h1>杀球速度，<br /><em>来自时序。</em></h1>
          <p>先让位置和方向可控，再让末端速度出现。杀球的重点不是把每一段都做大，而是让每一段在正确的时间完成自己的任务。</p>
          <div className="hero-question"><span>先问自己</span><strong>我的胸廓，是否先于手臂完成方向变化？</strong></div>
          <div className="hero-ramp"><span>阅读路径</span><strong>先看机制，再练能力，最后回到球上</strong><div><b>机制</b><i>→</i><b>训练</b><i>→</i><b>验证</b></div></div>
          <button className="dark-button" onClick={() => jumpTo('force-path')}>查看发力机制 <span>↓</span></button>
        </div>
        <MechanicsPlate />
      </section>

      <section id="principles" className="principles-section force-section">
        <div className="section-heading"><div><span className="section-label">THE SHORT VERSION</span><h2>先看清<br /><em>三层关系。</em></h2></div><span className="section-index">01 — 03</span></div>
        <div className="claim-grid">{claims.map((claim) => <article key={claim.number} className="claim-card"><span>{claim.number}</span><h3>{claim.title}</h3><p>{claim.text}</p></article>)}</div>
        <div className="principle-line"><span>判断顺序</span><strong>位置可控 → 方向清楚 → 拍头在触球前加速 → 击球后还能回位。</strong></div>
      </section>

      <section id="force-path" className="force-path-section force-section">
        <div className="section-heading"><div><span className="section-label">THE FORCE PATH</span><h2>每一段都在为下一段<br /><em>创造条件。</em></h2></div><span className="section-index">07 NODES</span></div>
        <div className="path-statement"><span>怎么读这条路径</span><strong>不要问“哪一块最有力”，而要问“这一段为下一段解决了什么问题”。脚下建立约束，躯干组织方向，上肢完成释放，碰撞决定出球。</strong></div>
        <div className="path-layout">
          <div className="path-visual" role="tablist" aria-label="杀球发力路径">
            <div className="path-meta"><span>FROM GROUND TO SHUTTLE</span><span>RELATION · NOT RATIO</span></div>
            <div className="path-track">
              {forceNodes.map((item, index) => <div className="path-track-item" key={item.number}><button id={`node-tab-${item.number}`} className={activeNode === index ? 'path-node active' : 'path-node'} onClick={() => setActiveNode(index)} role="tab" aria-selected={activeNode === index} aria-controls="node-panel"><b>{item.number}</b><strong>{item.label}</strong><small>{item.english}</small></button>{index < forceNodes.length - 1 && <span className="path-arrow" aria-hidden="true">→</span>}</div>)}
            </div>
            <p className="path-footnote">箭头代表动作关系，不代表固定顺序、能量百分比或所有球员都一样的轨迹。</p>
          </div>
          <div id="node-panel" className="path-reading" role="tabpanel" tabIndex={0} aria-labelledby={`node-tab-${node.number}`}>
            <span className="section-label">NODE / {node.number} · {node.english}</span>
            <h3>{node.title}</h3>
            <div className="path-reading-grid"><div><span>这一段发生什么</span><p>{node.action}</p></div><div><span>它解决什么问题</span><p>{node.principle}</p></div><div><span>场上怎么检查</span><p>{node.cue}</p></div></div>
          </div>
        </div>
      </section>

      <section id="training" className="training-section force-section">
        <div className="section-heading"><div><span className="section-label">TRAIN THE CAPACITY</span><h2>别重复整条路径，<br /><em>先补最弱的一段。</em></h2></div><span className="section-index">03 BLOCKS</span></div>
        <div className="training-statement"><span>训练观</span><strong>发力训练不是把某块肌肉练成“动力源”，而是让身体在承载、旋转、释放和制动这三类任务上更可靠。</strong></div>
        <div className="training-layout">
          <div className="training-visual" role="tablist" aria-label="杀球训练阶段">
            <div className="training-meta"><span>THREE TRAINING BLOCKS</span><span>CHOOSE ONE WEAK LINK</span></div>
            <div className="training-track">
              {trainingStages.map((item, index) => <div className="training-track-item" key={item.number}><button id={`training-tab-${item.number}`} className={activeTraining === index ? 'training-node active' : 'training-node'} onClick={() => setActiveTraining(index)} role="tab" aria-selected={activeTraining === index} aria-controls="training-panel"><b>{item.number}</b><strong>{item.label}</strong><small>{item.english}</small></button>{index < trainingStages.length - 1 && <span className="training-arrow" aria-hidden="true">→</span>}</div>)}
            </div>
            <div className="training-rules"><div><b>01</b><strong>功能先于孤立</strong><p>先在接近球场的任务里验证。</p></div><div><b>02</b><strong>速度先于负重</strong><p>动作一变形就停止。</p></div><div><b>03</b><strong>质量先于疲劳</strong><p>疲劳不是技术进步。</p></div></div>
          </div>
          <div id="training-panel" className="training-reading" role="tabpanel" tabIndex={0} aria-labelledby={`training-tab-${trainingStage.number}`}>
            <span className="section-label">BLOCK / {trainingStage.number} · {trainingStage.english}</span>
            <h3>{trainingStage.title}</h3>
            <div className="training-goal"><span>这一组要解决什么</span><p>{trainingStage.goal}</p></div>
            <div className="training-module-list">
              {trainingStage.modules.map((module) => <article className="training-module" key={module.phase}><div className="training-module-head"><strong>{module.phase}</strong><span>阶段映射</span></div><div><span>功能训练</span><p>{module.exercise}</p></div><div><span>肌肉支持</span><p>{module.muscles}</p></div><div><span>场上检查</span><p>{module.check}</p></div></article>)}
            </div>
          </div>
        </div>
        <p className="training-note">这是能力映射，不是固定处方：一次选择一个 block，优先补最影响你击球的薄弱环节；先以可控速度建立质量，再回到轻球和真实击球验证。出现疼痛、麻木或明显不稳时停止，并寻求专业评估。</p>
        <div className="training-sources"><span>训练证据</span><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12170632/" target="_blank" rel="noreferrer">2025 / 肩部肌肉协同 ↗</a><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12887704/" target="_blank" rel="noreferrer">2026 / 青少年爆发训练 ↗</a><a href="https://pubmed.ncbi.nlm.nih.gov/38533062/" target="_blank" rel="noreferrer">2024 / 羽毛球增强式训练综述 ↗</a></div>
      </section>

      <section id="lesson" className="lesson-section force-section">
        <div className="section-heading"><div><span className="section-label">COURT CHECK</span><h2>把机制压缩成<br /><em>四个检查点。</em></h2></div><span className="section-index">DO · LOOK · AVOID</span></div>
        <p className="lesson-intro">这里不再解释整条发力链，只给你上场时真正需要观察的四个节点：准备、到位、击球、回位。</p>
        <div className="phase-tabs" role="tablist" aria-label="可照着练的杀球发力步骤">
          {lessonSteps.map((item, index) => <button key={item.number} id={`step-tab-${item.number}`} className={activeStep === index ? 'phase-tab active' : 'phase-tab'} onClick={() => setActiveStep(index)} role="tab" aria-selected={activeStep === index} aria-controls="step-panel"><span>{item.number}</span><strong>{item.label}</strong></button>)}
        </div>
        <div id="step-panel" className="phase-reading" role="tabpanel" tabIndex={0} aria-labelledby={`step-tab-${step.number}`}>
          <div className="phase-main"><span className="section-label">STEP / {step.number}</span><h3>{step.title}</h3><div className="phase-action"><span>动作</span><p>{step.action}</p></div></div>
          <div className="phase-coach"><div className="coach-row"><span>看见</span><p>{step.cue}</p></div><div className="coach-row"><span>避免</span><p>{step.avoid}</p></div><div className="coach-row coach-drill"><span>练法</span><p>{step.drill}</p></div></div>
        </div>
        <div className="practice-protocol"><div className="protocol-heading"><span>ONE SIMPLE PROTOCOL</span><strong>只在动作稳定后升级。</strong></div><div className="protocol-grid"><div><b>01</b><strong>影子 × 5</strong><p>找位置与相对先后</p></div><div><b>02</b><strong>半挥 × 5</strong><p>保留胸廓与末端的间隔</p></div><div><b>03</b><strong>轻球 × 5</strong><p>检查碰撞与回位</p></div></div><p className="protocol-rule">升级条件：到位后能转、拍头触球前已加速、击球后还能移动。任何一点丢失，就回到上一层。</p></div>
        <p className="lesson-note">四个节点是场上检查工具，不要求每个人复制同一条固定轨迹。速度、角度、握拍和击球点要回到你的实际动作中验证。</p>
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
