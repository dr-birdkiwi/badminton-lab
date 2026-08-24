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
  next: string;
};

type ForceNode = {
  number: string;
  label: string;
  group: string;
  title: string;
  action: string;
  principle: string;
  cue: string;
  image: string;
  imageAlt: string;
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

type StudyMarker = {
  number: string;
  label: string;
  title: string;
  text: string;
  position: string;
};

const lessonSteps: LessonStep[] = [
  {
    number: '01',
    label: '窗口',
    title: '这球能在身前完成，而不是追到身后吗？',
    action: '验收击球前一刻：球是否在持拍肩前上方，身体是否仍能保持平衡并向下击球。窗口变窄时，主动降级打法，不用满力去补救位置。',
    cue: '不用后仰、不挤到球下方，也能在身前触球。',
    avoid: '为了“打重”追到球后面；起跳很高，却失去击球空间。',
    drill: '随机喂两个后场点，触球前只报“完整 / 点杀 / 过渡”；记录哪一种选择能保住下一拍。',
    next: '回到训练：到位与再启动。',
  },
  {
    number: '02',
    label: '拍速',
    title: '最快的一段，是否留在触球前？',
    action: '验收速度时序：前段保持足够松和有空间，最后的肩内旋、肘伸与前臂旋转在短窗口内合流。看拍头何时最快，而不是看动作幅度有多大。',
    cue: '触球前才出现明显加速，拍头快但身体没有提前僵住。',
    avoid: '从引拍开始就握死；过早把速度用完；把拍速归因于孤立甩腕。',
    drill: '同一点 10 球：先以约 70% 速度找中心触球，再逐档提速；速度上升但中心率下降，就退回上一档。',
    next: '回到训练：旋转与肩胛。',
  },
  {
    number: '03',
    label: '碰撞',
    title: '拍头速度，是否真正进入了羽毛球？',
    action: '验收碰撞结果：触球位置、拍面方向与来球条件要同时可控。速度只有在接近甜区、拍面稳定时，才会变成可重复的出球速度和落点。',
    cue: '击球声音、出球方向和目标命中率在连续几球中都相近。',
    avoid: '只追求某一球的最快；偏心触球后仍继续加力；把手臂更紧当成碰撞更好。',
    drill: '连续 10 球同时记录目标命中和偏心触球；两项任一明显变差，就不要继续加速。',
    next: '回到训练：拍速与碰撞。',
  },
  {
    number: '04',
    label: '下一拍',
    title: '杀完之后，仍然能接管回合吗？',
    action: '验收速度是否被吸收：随挥不被硬截，落地能重新组织重心，球拍回到身体前方，并根据落点和对手选择跟进位置。',
    cue: '对手触球前已经完成分腿，能接封网、扑球或再次后退。',
    avoid: '落地后看球；每次都机械回到中心；为了急停而打断随挥。',
    drill: '杀球后随机接“挡网 / 挑后场”第二球，连续 3 组；以能否按时启动作为通过标准。',
    next: '回到训练：到位与再启动。',
  },
];

const principleSequence = [
  { number: '01', label: '击球窗口', title: '移动与制动', text: '先到球的侧后方，再把速度吸收住；球点才能停在持拍肩前上方。', alt: '羽毛球后场击球前的移动与制动阶段' },
  { number: '02', label: '身体组织', title: '骨盆与胸廓组织方向', text: '脚下停住以后，身体不是僵住，而是为拍臂保留可用的加速空间。', alt: '羽毛球后场击球前的身体组织阶段' },
  { number: '03', label: '触球前加速', title: '把最快一段留到最后', text: '肩、肘、前臂在短窗口内共同加速，让拍头速度靠近触球时刻。', alt: '羽毛球击球前拍头加速阶段' },
  { number: '04', label: '击球与衔接', title: '速度进入碰撞，再回到下一拍', text: '稳定拍面完成中心触球，落地后仍然保留继续移动和选择的能力。', alt: '羽毛球拍面与羽毛球碰撞并准备衔接下一拍的阶段' },
];

const forceMarkers: StudyMarker[] = [
  { number: '01', label: '脚下', title: '建立可移动的支撑', text: '先解决位置、制动和改变方向。', position: 'marker-foot' },
  { number: '03', label: '骨盆', title: '让身体朝向服从击球点', text: '方向组织为拍臂留下空间。', position: 'marker-pelvis' },
  { number: '05', label: '肩 · 肘 · 前臂', title: '把最快一段留到触球前', text: '近端与远端共同完成拍头加速。', position: 'marker-arm' },
  { number: '07', label: '落地 · 衔接', title: '为第二拍完成这次杀球', text: '吸收速度，再重新获得移动能力。', position: 'marker-recover' },
];

const lessonMarkers: StudyMarker[] = [
  { number: '01', label: '中心触球', title: '速度先进入碰撞', text: '拍面稳定，出球方向才可控。', position: 'marker-impact' },
  { number: '02', label: '拍面方向', title: '不要用偏心触球补速度', text: '更快不等于更有效，先守住接触质量。', position: 'marker-face' },
  { number: '03', label: '下一拍', title: '落地后仍保留选择', text: '身体回到可动位置，回合才没有断。', position: 'marker-follow' },
];

const forceNodes: ForceNode[] = [
  { number: '01', label: '脚下', group: '建立条件', title: '建立可移动的支撑', action: '脚与地面建立支撑和制动，让身体能够加速、减速、改变朝向，而不是只把力量往上顶。', principle: '地面提供外部约束；更大的垂直反作用力并不自动等于更快的杀球。', cue: '最后一步之后还能微调，不是蹬死在原地。', image: '/force-action-01.png', imageAlt: '羽毛球后场击球前分腿进入与脚下支撑动作' },
  { number: '02', label: '下肢 · 髋', group: '建立条件', title: '把身体送进攻击窗口', action: '踝、膝、髋共同管理重心，把球留在拍侧肩前上方，同时保留落地和再启动的空间。', principle: '下肢首先决定你在哪里、朝哪里以及能否制动，而不是直接把速度“送到拍头”。', cue: '不用后仰就能触球，落地后还能启动。', image: '/force-action-02.png', imageAlt: '羽毛球后场击球前最后制动步与踝膝髋支撑动作' },
  { number: '03', label: '骨盆', group: '建立条件', title: '让身体朝向服从击球点', action: '骨盆随步法和来球条件调整朝向，为躯干和击球臂提供可用空间。', principle: '不同步法、起跳方式和击球选择会改变时序；不存在每球统一的“先转骨盆”。', cue: '身体朝向服务击球点，而不是为了转体而转体。', image: '/force-action-03.png', imageAlt: '羽毛球后场击球前骨盆开始转向并组织身体方向' },
  { number: '04', label: '胸廓', group: '建立条件', title: '用相对运动创造挥拍空间', action: '胸廓与骨盆共同改变朝向，并在需要时保留相对旋转，让拍臂有一条不被身体挤掉的加速通道。', principle: '骨盆—胸廓的相对运动可能帮助加速，但不是越大越好，也不是每种来球都要复制同一幅姿势。', cue: '转体没有挤掉挥拍空间，身体和拍臂能在触球前合流。', image: '/force-action-04.png', imageAlt: '羽毛球后场击球前胸廓与骨盆形成相对旋转并为拍臂留出空间' },
  { number: '05', label: '肩 · 肘 · 前臂', group: '组织拍速', title: '把最快的一段留到触球前', action: '肩内旋、肘伸与前臂旋转在短暂的加速窗口内协同，提高拍头速度。', principle: '研究支持多关节协同，不支持把拍速归功于单一关节或孤立“甩腕”。', cue: '拍头快但身体不僵；触球时肘不过度锁死，上臂不过度耸高。', image: '/force-action-05.png', imageAlt: '羽毛球击球前肩肘前臂协同加速动作' },
  { number: '06', label: '球拍 · 羽毛球', group: '组织拍速', title: '让拍速成为可控的出球', action: '拍头速度、拍面方向和实际触球位置共同决定出球速度、方向和下压角度。', principle: '拍头速度与出球速度高度相关，但并非一一相等；触球位置、拍面和器材特性都会改变碰撞效率。', cue: '连续 10 球的声音、方向和目标命中都稳定，而不是只看其中最快一球。', image: '/force-action-06.png', imageAlt: '羽毛球拍面与羽毛球在高点击球点发生碰撞' },
  { number: '07', label: '落地 · 衔接', group: '回到下一拍', title: '为第二拍完成这次杀球', action: '随挥与落地吸收速度，再根据落点和对手回球方向选择跟进位置。', principle: '杀球不是只看首球速度；能否迫使弱回球并接管下一拍，才是动作在比赛中的完整价值。', cue: '对手触球前完成分腿，球拍回到身体前方。', image: '/force-action-07.png', imageAlt: '羽毛球杀球后的剪式落地、收拍与下一拍衔接动作' },
];

const trainingStages: TrainingStage[] = [
  {
    number: '01', label: '到位与再启动', title: '先把击球窗口做稳定', goal: '这一阶段解决“能不能反复到球后、在前上方触球，并立刻接下一拍”。顶级脚下不是停得最死，而是到位后仍然保留调整能力。',
    modules: [
      { phase: '后场到位 · 再启动', exercise: '随机启动到两个后场点 → 定住击球窗口 → 影子触球 → 教练再指一个方向启动。', dose: '3 组 × 4 次/侧；每次完整回位，组间休息 60–90 秒。', muscles: '臀肌、股四头肌、腘绳肌与小腿共同完成推进、制动和再次启动。', check: '触球位置不向后漂，第二次启动方向仍然清楚。' },
      { phase: '单腿 · 侧向制动', exercise: '低幅度侧向跳或跨步落地，单腿承载后立即向相反方向小步启动。', dose: '3 组 × 4 次/侧；落地声音和膝髋控制变差就停止。', muscles: '臀中肌、臀大肌、股四头肌、腘绳肌和小腿的离心控制。', check: '髋、膝、脚方向一致，身体没有塌向一侧。' },
      { phase: '杀球 · 第二拍', exercise: '影子杀球后，随机接“上网封球”或“再次后退”；训练落地后的第一反应。', dose: '3 组 × 4 个两拍组合；每组保持同样的移动速度。', muscles: '下肢制动链配合躯干抗侧屈，帮助落地后重新组织重心。', check: '对手触球前完成分腿，不在原地看球。' },
    ],
  },
  {
    number: '02', label: '旋转与肩胛', title: '让躯干为拍臂留出空间', goal: '这一阶段解决“躯干改变朝向时，拍臂是否仍能自由加速”。负荷要轻到足以保持速度，不用大重量复制杀球轨迹。',
    modules: [
      { phase: '交错站姿 · 旋转投掷', exercise: '用轻药球做侧向旋转投掷，强调快速出手和稳定回收；左右侧都练。', dose: '4 组 × 3 次/侧；每次追求速度，组间充分休息。', muscles: '臀肌、内收肌、腹斜肌与背部肌群共同改变朝向。', check: '球速快但脚下不乱，腰椎没有被迫拧到终点。' },
      { phase: '胸廓 · 肩胛协同', exercise: '交错站姿轻阻力 lift / chop，随后立刻做一次无阻力半挥拍。', dose: '3 组 × 5 次/侧；阻力只要能保持肩胛平顺移动。', muscles: '腹斜肌、前锯肌、下斜方肌和肩袖共同维持胸廓与上臂的关系。', check: '转体后手臂仍有空间，肩不耸、头部不被动作带走。' },
    ],
  },
  {
    number: '03', label: '拍速与碰撞', title: '把速度送进稳定碰撞', goal: '这一阶段解决“能不能反复打出快拍头和干净碰撞”。先保留准确率，再缩短加速时间；不要用疲劳中的乱快冒充爆发力。',
    modules: [
      { phase: '过顶投掷 · 无球快挥', exercise: '轻药球过顶投掷与无球快速半挥成对进行；投掷训练整体出手，挥拍训练具体拍速。', dose: '4 组 × 3 次；每次高质量，组间休息 60–90 秒。', muscles: '胸大肌、背阔肌、三角肌、肩袖、肱三头肌与前臂旋转肌群协同工作。', check: '速度提高时肩仍然放松，肘没有提前锁死。' },
      { phase: '十球 · 碰撞测试', exercise: '同一喂球点连续 10 球，记录目标命中和明显偏心触球；再提高一档速度重复。', dose: '2–3 轮 × 10 球；两项指标下降，就退回上一档速度。', muscles: '前臂旋转、握拍与手指屈伸配合肩袖，控制拍面和触球位置。', check: '更快一档仍能保持相近的目标命中和中心触球。' },
    ],
  },
];

const navItems = [
  { id: 'principles', label: '击球决策' },
  { id: 'force-path', label: '表现链' },
  { id: 'training', label: '瓶颈训练' },
  { id: 'lesson', label: '上场验收' },
  { id: 'boundary', label: '证据边界' },
] as const;

function jumpTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ block: 'start' });
}

function StudyPlate({ src, alt, meta, side, footer, markers, className = '' }: { src: string; alt: string; meta: string; side: string; footer: string; markers: StudyMarker[]; className?: string }) {
  return (
    <div className={`study-plate ${className}`}>
      <img src={src} alt={alt} />
      <div className="study-plate-shade" aria-hidden="true" />
      <div className="study-plate-meta"><span>{meta}</span><span>{side}</span></div>
      {markers.map((marker) => <div className={`study-marker ${marker.position}`} key={marker.number}><i aria-hidden="true" /><div><b>{marker.number} / {marker.label}</b><strong>{marker.title}</strong><small>{marker.text}</small></div></div>)}
      <div className="study-plate-footer"><span>动作样本，不是唯一模板</span><strong>{footer}</strong></div>
    </div>
  );
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
          <div className="principles-sequence-layout">
            <div className="sequence-board-shell">
              <figure className="sequence-board-frame">
                <img src="/principles-sequence-board.png" alt="同一名羽毛球运动员从移动制动、身体组织、触球前加速到击球衔接的四帧连续动作研究图" />
                <figcaption>同一运动员 · 同一机位 · 四个连续时刻</figcaption>
              </figure>
              <div className="sequence-step-grid">
                {principleSequence.map((item) => <article className="sequence-step" key={item.number}><div className="sequence-step-head"><b>{item.number}</b><span>{item.label}</span></div><h3>{item.title}</h3><p>{item.text}</p></article>)}
              </div>
            </div>
            <div className="visual-reading-note"><span>按顺序看，不要跳步</span><strong>这不是四张姿势图，而是一拍动作的时间关系。</strong><p>身体先移动并制动，随后组织方向，再把速度集中到触球前；最后用碰撞和落地把这次击球接回下一拍。</p><div><b>图像读法</b><span>移动制动 → 身体组织 → 触球前加速 → 碰撞衔接</span></div></div>
          </div>
          <div className="principle-line"><span>判断路线</span><strong>窗口完整 + 有空间 + 碰撞可控 → 完整杀球；时间被压缩 → 点杀 / 半杀；窗口丢失或无法衔接 → 先过渡。</strong></div>
          <div className="shot-choice">
            <div className="shot-choice-head"><span>根据结果选择打法</span><strong>每次出手先服从来球条件，再追求拍速。</strong></div>
            <figure className="shot-choice-board">
              <div className="shot-choice-board-visual">
                <img src="/shot-choice-board-v3.png" alt="三种后场击球条件对照：完整杀球在身前远处完整加载，点杀或半杀用非完全侧身和短引拍在身前较近处击球，击球窗口丢失后球到了身后则先过渡" />
                <div className="shot-choice-board-labels"><span><b>01</b><em>完整杀球<small>身前较远 · 完整加载</small></em></span><span><b>02</b><em>点杀 · 半杀<small>非完全侧身 · 短引拍</small></em></span><span><b>03</b><em>先过渡<small>击球点在身后 · 放弃硬杀</small></em></span></div>
                <figcaption>击球点：身前远 → 身前近 → 身后</figcaption>
              </div>
            </figure>
            <div className="shot-choice-grid">
              <article><b>01 / 完整杀球</b><h3>完整杀球</h3><p><span>窗口</span>球在拍侧肩前上方，身体不用后仰，落地仍可控。</p><p><span>目标</span>用速度或落点直接得分，或制造确定的弱回球。</p></article>
              <article><b>02 / 点杀 · 半杀</b><h3>点杀 · 半杀</h3><p><span>窗口</span>仍能在身前较高点击球，但身体没有完全侧身，引拍也不必完整展开；击球点比完整杀球更接近身体。</p><p><span>目标</span>用短准备快速下压，击球后立刻回到可移动的支撑。</p></article>
              <article><b>03 / 先过渡</b><h3>先过渡</h3><p><span>窗口</span>球已经越过击球肩前方的最佳窗口，接触点落到身体后方；这是晚接触，不是理想杀球点。</p><p><span>目标</span>放弃硬杀，用高远或吊球换回时间，再重建站位。</p></article>
            </div>
          </div>
        </div>
      </section>

      <section id="force-path" className="force-path-section force-section">
        <div className="section-heading"><div><span className="section-label">表现链</span><h2>这不是传送带，<br /><em>是一组相互约束。</em></h2></div><span className="section-index">07 个动作任务</span></div>
        <div className="path-statement"><span>先定义模型</span><strong>每个节点不是“把力传给下一个关节”，而是在当下解决一个问题：位置、方向、空间、拍速、碰撞，最后回到下一拍。</strong><p>研究支持多关节协同和近端—远端的速度关系；不支持一套每球固定、单向、分毫不差的时序。</p></div>
        <div className="path-layout">
          <div className="path-visual">
            <div className="path-meta"><span>按任务读，不按关节背</span><span>组间有关联 · 组内会重叠</span></div>
            <div className="path-action-group-row" aria-hidden="true"><span>01 · 建立条件<br /><small>位置 · 方向 · 空间</small></span><span>02 · 组织拍速<br /><small>加速 · 碰撞</small></span><span>03 · 回到下一拍<br /><small>落地 · 再组织</small></span></div>
            <div className="path-action-grid" role="tablist" aria-label="七段杀球发力动作">
              {forceNodes.map((item, index) => <button id={`node-tab-${item.number}`} className={`path-action-card ${index < 4 ? 'path-action-card-condition' : index < 6 ? 'path-action-card-speed' : 'path-action-card-next'}${activeNode === index ? ' active' : ''}`} key={item.number} onClick={() => setActiveNode(index)} role="tab" aria-selected={activeNode === index} aria-controls="node-panel" aria-label={`${item.number} ${item.label} ${item.title}`}>
                <span className="path-action-card-index">{item.number}</span>
                <span className="path-action-card-image"><img src={item.image} alt={item.imageAlt} /></span>
                <span className="path-action-card-caption"><b>{item.label}</b><strong>{item.title}</strong></span>
              </button>)}
            </div>
          </div>
          <div id="node-panel" className="path-reading path-reading-inline" role="tabpanel" tabIndex={0} aria-labelledby={`node-tab-${node.number}`}>
            <div className="path-reading-top"><span className="section-label">当前任务 · {node.number} · {node.group}</span><b>{node.label}</b></div>
            <h3>{node.title}</h3>
            <div className="path-reading-lead"><span>动作任务</span><p>{node.action}</p></div>
            <div className="path-reading-grid"><div><span>科学边界</span><p>{node.principle}</p></div><div><span>场上检查</span><p>{node.cue}</p></div></div>
          </div>
        </div>
      </section>

      <section id="training" className="training-section force-section">
        <div className="section-heading"><div><span className="section-label">训练瓶颈</span><h2>训练不追疲劳，<br /><em>只追可转化。</em></h2></div><span className="section-index">03 个训练阶段</span></div>
        <div className="training-statement"><span>训练原则</span><strong>先用球场结果定位瓶颈：到位不稳、旋转空间不足、拍速不够、碰撞不净或第二拍掉速。训练只补一个短板，最后必须回到真实击球验收。</strong></div>
        <div className="training-layout">
          <div className="training-visual" role="tablist" aria-label="杀球训练阶段">
            <div className="training-meta"><span>三个训练阶段</span><span>只练一个短板</span></div>
            <div className="training-track">
              {trainingStages.map((item, index) => <div className="training-track-item" key={item.number}><button id={`training-tab-${item.number}`} className={activeTraining === index ? 'training-node active' : 'training-node'} onClick={() => setActiveTraining(index)} role="tab" aria-selected={activeTraining === index} aria-controls="training-panel"><b>{item.number}</b><strong>{item.label}</strong></button>{index < trainingStages.length - 1 && <span className="training-arrow" aria-hidden="true">→</span>}</div>)}
            </div>
            <div className="training-rules"><div><b>01</b><strong>先有球场指标</strong><p>窗口 · 目标 · 第二拍。</p></div><div><b>02</b><strong>高质量再加量</strong><p>速度下降，就结束这一组。</p></div><div><b>03</b><strong>负荷不改动作</strong><p>离场训练，回场验收。</p></div></div>
            <div className="training-photo"><img src="/training-study.png" alt="羽毛球运动员进行侧向跨步和单腿制动训练，展示脚、膝、髋的支撑关系" /><div className="training-photo-shade" aria-hidden="true" /><div className="training-photo-meta"><span>动作研究 / 04</span><span>制动 · 再启动</span></div><div className="training-photo-caption"><b>功能训练示例</b><strong>先能吸收速度，才有下一次启动。</strong></div></div>
          </div>
          <div id="training-panel" className="training-reading" role="tabpanel" tabIndex={0} aria-labelledby={`training-tab-${trainingStage.number}`}>
            <span className="section-label">训练任务 · {trainingStage.number} · {trainingStage.label}</span>
            <h3>{trainingStage.title}</h3>
            <div className="training-goal"><span>本阶段目标</span><p>{trainingStage.goal}</p></div>
            <div className="training-module-list">
              {trainingStage.modules.map((module) => <article className="training-module" key={module.phase}><div className="training-module-head"><strong>{module.phase}</strong></div><div><span>训练任务</span><p>{module.exercise}</p></div><div><span>建议剂量</span><p>{module.dose}</p></div><div><span>肌肉与功能</span><p>{module.muscles}</p></div><div><span>回场标准</span><p>{module.check}</p></div></article>)}
            </div>
          </div>
        </div>
        <p className="training-note">增强式训练可能改善力量表现、敏捷、速度和平衡，但现有羽毛球研究的证据确定性较低；本站把它作为补充，不把它直接等同于杀球变快。疼痛、麻木或明显不稳时停止，并寻求专业评估。</p>
        <div className="training-sources"><span>训练证据</span><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12170632/" target="_blank" rel="noreferrer">2025 / 肌肉协同 ↗</a><a href="https://pubmed.ncbi.nlm.nih.gov/38533062/" target="_blank" rel="noreferrer">2024 / 增强式训练综述 ↗</a><a href="https://pubmed.ncbi.nlm.nih.gov/33663330/" target="_blank" rel="noreferrer">2024 / 精英跳杀决定因素 ↗</a></div>
      </section>

      <section id="lesson" className="lesson-section force-section">
        <div className="section-heading"><div><span className="section-label">训练转化</span><h2>训练有没有变成<br /><em>比赛结果？</em></h2></div><span className="section-index">打一组 · 记录 · 回修</span></div>
        <div className="lesson-intro"><p>打一组球后，不再复盘脚、髋、肩、肘；只检查四个能在场上观察到的结果。哪一项先丢，就回到对应训练，不用继续加力补救。</p><strong>动作可以不同，结果必须可复现。</strong></div>
        <div className="lesson-visual-layout">
          <StudyPlate src="/impact-study.png" alt="羽毛球拍与羽毛球中心碰撞的高速动作研究图，展示拍面、触球位置和击球后的衔接关系" meta="动作研究 / 05" side="碰撞与衔接" footer="中心触球 → 稳定出球 → 回到下一拍" markers={lessonMarkers} className="lesson-study-plate" />
          <div className="visual-reading-note"><span>这一章只看结果</span><strong>更快之后，碰撞和衔接不能塌。</strong><p>动作可以因人而异，但触球质量、出球方向和下一拍准备必须在连续回合中保持可观察、可重复。</p><div><b>验收顺序</b><span>击球窗口 → 拍头速度 → 中心碰撞 → 下一拍选择</span></div></div>
        </div>
        <div className="phase-tabs" role="tablist" aria-label="训练转化的四项结果">
          {lessonSteps.map((item, index) => <button key={item.number} id={`step-tab-${item.number}`} className={activeStep === index ? 'phase-tab active' : 'phase-tab'} onClick={() => setActiveStep(index)} role="tab" aria-selected={activeStep === index} aria-controls="step-panel"><span>{item.number}</span><strong>{item.label}</strong></button>)}
        </div>
        <div id="step-panel" className="phase-reading" role="tabpanel" tabIndex={0} aria-labelledby={`step-tab-${step.number}`}>
          <div className="phase-main"><div className="phase-status"><span>当前检查</span><strong>{step.label}</strong></div><span className="section-label">看什么</span><h3>{step.title}</h3><div className="phase-action"><span>判断标准</span><p>{step.action}</p></div><div className="phase-next"><span>失效后</span><strong>{step.next}</strong></div></div>
          <div className="phase-coach"><div className="coach-row"><span>合格表现</span><p>{step.cue}</p></div><div className="coach-row"><span>失效信号</span><p>{step.avoid}</p></div><div className="coach-row coach-drill"><span>现场验证</span><p>{step.drill}</p></div></div>
        </div>
        <div className="lesson-verdict"><div className="verdict-head"><span>这一章的判定</span><strong>更快之后，结果不能塌。</strong></div><div className="verdict-grid"><div><b>01</b><strong>窗口不丢</strong><p>不用后仰，仍能在身前完成击球。</p></div><div><b>02</b><strong>碰撞不散</strong><p>中心触球与目标命中保持稳定。</p></div><div><b>03</b><strong>下一拍不断</strong><p>对手触球前已完成分腿和选择。</p></div></div><p className="verdict-rule">任何一项丢失，就先降速、换打法或回到对应训练。不要把“更用力”误判成“更有效”。</p></div>
        <p className="lesson-note">这不是动作评分，也不是判断谁是高手；它是训练后的结果验收。用结果约束动作，而不是复制某位顶级球员的一帧姿势。</p>
      </section>

      <section id="boundary" className="boundary-section force-section">
        <div className="section-heading"><div><span className="section-label">证据边界</span><h2>科学能支持的，<br /><em>说到这里。</em></h2></div><span className="section-index">如实阅读</span></div>
        <div className="boundary-visual-layout">
          <StudyPlate src="/evidence-study.png" alt="羽毛球拍、羽毛球和场地测量网格组成的运动科学证据研究图" meta="证据研究 / 06" side="测量与边界" footer="观察 → 测量 → 解释 → 保留边界" markers={[]} className="boundary-study-plate" />
          <div className="visual-reading-note"><span>不要把模型当定律</span><strong>先区分观察到的结果，再解释身体机制。</strong><p>研究可以帮助我们知道哪些变量更接近击球结果，但不能替每个球员规定唯一姿势。专业性也包括知道结论在哪里停止。</p><div><b>阅读层级</b><span>研究发现 · 生物力学解释 · 教练经验 · 个体差异</span></div></div>
        </div>
        <div className="boundary-grid"><article><span>可以说</span><h3>拍速、触球配置与碰撞效率最接近结果</h3><p>精英研究反复指出，拍头速度、触球时的上肢配置，以及拍床上的实际触球位置，都与球速和方向有关。</p></article><article><span>不能说</span><h3>蹬地越大，不等于球一定越快</h3><p>精英跳杀研究中，垂直地面反作用力与力发展率并未和球速相关；“脚到手的固定传力链”不能当成已证实定律。</p></article><article><span>本站原则</span><h3>先看比赛结果，再解释关节动作</h3><p>先判断窗口、拍速、碰撞和第二拍，再用生物力学寻找瓶颈；不同打法、步法和个体可以有不同解法。</p></article></div>
        <div className="source-strip"><span>主要来源</span><a href="https://sfbadminton.tenniscity.org/wp-content/uploads/sites/29/2020/03/bwf_coach_education_coaches_manual_l1-2nd-edition-midres.pdf" target="_blank" rel="noreferrer">教练手册 · 杀球 ↗</a><a href="https://pubmed.ncbi.nlm.nih.gov/33663330/" target="_blank" rel="noreferrer">精英跳杀研究 ↗</a><a href="https://oars.uos.ac.uk/1325/" target="_blank" rel="noreferrer">触球位置研究 ↗</a><a href="https://figshare.com/articles/journal_contribution/28759388" target="_blank" rel="noreferrer">击球稳定性研究 ↗</a></div>
      </section>

      <footer className="force-footer"><span>力场 / 羽毛球发力实验室</span><strong>高手表现复盘</strong><span>专家修订 · 2026.08</span></footer>
    </main>
  );
}
