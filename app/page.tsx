'use client';

import { useEffect, useState } from 'react';

/* eslint-disable @next/next/no-img-element */

type ReferenceKey = 'synergy' | 'xfactor' | 'shoulder' | 'jumpSmash' | 'impact' | 'lowerLimb' | 'plyometric' | 'upperSynergy' | 'racket' | 'bwf';

type Reference = {
  label: string;
  href: string;
  title: string;
  kind: '研究' | '综述' | '教练资料';
};

const references: Record<ReferenceKey, Reference> = {
  synergy: { label: '肌肉协同', kind: '研究', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12170632/', title: '2025 年精英羽毛球运动员上肢肌肉协同研究' },
  xfactor: { label: '躯干旋转', kind: '研究', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5260572/', title: '24 名受试者：躯干旋转与羽毛球正手杀球质量的关系' },
  shoulder: { label: '肩内旋力量', kind: '研究', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6016291/', title: '14 名大学生：肩内旋等长力量与杀球拍速的相关性' },
  jumpSmash: { label: '跳杀相关变量', kind: '研究', href: 'https://pubmed.ncbi.nlm.nih.gov/33663330/', title: '19 名精英男性：跳杀中接触时肩、肘位置与球速的相关性' },
  impact: { label: '触球位置', kind: '研究', href: 'https://doi.org/10.1080/02640414.2020.1792132', title: '65 名国际球员、2386 次杀球：拍—球碰撞位置与出球结果' },
  lowerLimb: { label: '下肢研究', kind: '研究', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9598458/', title: '起跳期下肢地面反作用力与髋、膝、踝关节力学研究' },
  plyometric: { label: '增强式训练', kind: '综述', href: 'https://pubmed.ncbi.nlm.nih.gov/38533062/', title: '11 项研究、445 名运动员：羽毛球增强式训练系统综述' },
  upperSynergy: { label: '上肢协同', kind: '研究', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6317092/', title: '精英与非精英选手：五块上肢肌肉的协同研究' },
  racket: { label: '球拍参数', kind: '研究', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10462755/', title: '球拍惯量对拍头速度、触球位置与出球速度的影响研究' },
  bwf: { label: 'BWF 教练资料', kind: '教练资料', href: 'https://sfbadminton.tenniscity.org/wp-content/uploads/sites/29/2020/03/bwf_coach_education_coaches_manual_l1-2nd-edition-midres.pdf', title: 'BWF 教练教育手册（第三方镜像）' },
};

function InlineReferences({ refs, className = '' }: { refs: ReferenceKey[]; className?: string }) {
  const uniqueRefs = [...new Set(refs)];
  return <span className={`inline-references ${className}`} aria-label="科学参考">{uniqueRefs.map((key) => <a key={key} href={references[key].href} target="_blank" rel="noreferrer" title={references[key].title}>{references[key].kind}·{references[key].label} ↗</a>)}</span>;
}

type LessonStep = {
  number: string;
  label: string;
  title: string;
  action: string;
  cue: string;
  avoid: string;
  drill: string;
  next: string;
  refs: ReferenceKey[];
};

type ForceNode = {
  number: string;
  label: string;
  group: string;
  title: string;
  action: string;
  focus: string;
  focusCue: string;
  principle: string;
  cue: string;
  image: string;
  imageAlt: string;
  refs: ReferenceKey[];
};

type TrainingModule = {
  phase: string;
  exercise: string;
  dose: string;
  muscles: string;
  check: string;
  refs: ReferenceKey[];
};

type TrainingStage = {
  number: string;
  label: string;
  title: string;
  goal: string;
  image: string;
  imageAlt: string;
  visualLabel: string;
  visualCue: string;
  refs: ReferenceKey[];
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
    title: '这球还允许在身前、上方处理吗？',
    action: '这是本站的场上观察线索，不是固定高度标准：看触球前，球是否仍处于持拍肩前方、上方的可用空间，身体能否在不明显后仰时完成向下击球。来球、步法和击球类型会改变窗口；窗口被压缩时，改用更可控的击球选择，而不是用更大力量补救位置。',
    cue: '在来球允许时，不明显后仰、不挤到球下方，也能在身前完成触球。',
    avoid: '为了“打重”追到球后面；起跳很高，却失去身前的触球空间。',
    drill: '随机喂两个后场点，触球前只报“完整 / 点杀 / 过渡”；记录哪一种选择能保住下一拍。',
    next: '回到训练：到位与再启动。',
    refs: ['bwf', 'jumpSmash'],
  },
  {
    number: '02',
    label: '拍速',
    title: '触球前，是否出现清晰的主要加速段？',
    action: '作为场上观察线索，检查拍头是否在触球前形成清晰加速，并把肩、肘、前臂与握拍/手部作为一个上肢系统观察。现有研究对不同关节和肌肉的测量并不等量，也没有证明所有球员必须使用完全相同的分段时序。',
    cue: '从视频回看时，拍头在触球前出现明显加速段；拍速提升没有明显牺牲触球质量。',
    avoid: '从引拍开始就握死；过早把速度用完；把拍速归因于孤立甩腕。',
    drill: '本站测试起点：同一点 10 球，先以约 70% 速度找中心触球，再逐档提速；速度上升但中心率下降，就退回上一档。',
    next: '回到训练：旋转与肩胛。',
    refs: ['shoulder', 'jumpSmash'],
  },
  {
    number: '03',
    label: '碰撞',
    title: '拍头速度，是否真正进入了羽毛球？',
    action: '验收碰撞结果：触球位置、拍面方向和来球条件要一起观察。研究显示，触球在拍面上的位置会影响出球速度和水平方向；因此，拍头更快不等于结果一定更好。',
    cue: '击球声音、出球方向和目标命中率在连续几球中都相近。',
    avoid: '只追求某一球的最快；偏心触球后仍继续加力；把手臂更紧当成碰撞更好。',
    drill: '连续 10 球同时记录目标命中和偏心触球；两项任一明显变差，就不要继续加速。',
    next: '回到训练：拍速与碰撞。',
    refs: ['impact', 'shoulder'],
  },
  {
    number: '04',
    label: '下一拍',
    title: '击球后，是否仍保留下一拍的选择？',
    action: '验收击球后的连续性：落地后能安全减速并重新组织重心，球拍回到便于准备的位置；随挥不必追求统一幅度，具体落地和衔接要随击球位置、来球与下一球调整。',
    cue: '在来球和战术允许时，对手触球前已回到可动的准备状态。',
    avoid: '落地后看球；每次都机械回到同一位置；为了急停而打断随挥。',
    drill: '杀球后随机接“挡网 / 挑后场”第二球，连续 3 组；以能否按时启动作为通过标准。',
    next: '回到训练：到位与再启动。',
    refs: ['lowerLimb', 'bwf'],
  },
];

type PrincipleSequenceStep = {
  number: string;
  label: string;
  title: string;
  text: string;
  alt: string;
  refs: ReferenceKey[];
};

const principleSequence: PrincipleSequenceStep[] = [
  { number: '01', label: '击球窗口', title: '来球允许时，先争取身前、上方位置', text: '先用步法调整身体与来球的相对位置，目标是在持拍肩前方、上方触球；能否做到取决于来球高度、落点和到位质量。', alt: '羽毛球后场击球前的移动与制动阶段', refs: ['lowerLimb', 'jumpSmash', 'bwf'] },
  { number: '02', label: '身体组织', title: '骨盆与胸廓调整方向', text: '到位后不必把身体锁死；躯干与骨盆的相对转动可能为上肢保留工作空间。这是基于生物力学研究的教学转译，不要求每球达到同一幅度或遵循固定先后。', alt: '羽毛球后场击球前的身体组织阶段', refs: ['xfactor', 'synergy'] },
  { number: '03', label: '上肢形成拍头速度', title: '把上肢作为协同系统观察', text: '肩、肘、前臂和握拍/手部是连续挥拍中需要一起观察的上肢系统；研究支持协调关系，但不同研究测量的关节和肌肉并不相同，不能由此推出每个人固定的分段时序。', alt: '羽毛球击球前拍头加速阶段', refs: ['shoulder', 'synergy', 'upperSynergy'] },
  { number: '04', label: '击球与衔接', title: '把拍头状态送进碰撞，再准备下一拍', text: '拍头状态、拍面取向和触球位置共同影响出球结果；击球后的回位属于比赛要求，但具体落地和衔接方式要随击球位置与下一球调整。', alt: '羽毛球拍面与羽毛球碰撞并准备衔接下一拍的阶段', refs: ['impact', 'bwf', 'lowerLimb'] },
];

const lessonMarkers: StudyMarker[] = [
  { number: '01', label: '中心触球', title: '减少碰撞偏差', text: '在相近来球条件下，触球位置更稳定，出球方向更容易复现。', position: 'marker-impact' },
  { number: '02', label: '拍面方向', title: '拍面与触球位置共同决定结果', text: '不能用更大的挥拍力量补偿失控的拍面或偏离的触球位置。', position: 'marker-face' },
  { number: '03', label: '下一拍', title: '击球后恢复可动状态', text: '落地后保留调整和移动的可能，才有机会处理下一球。', position: 'marker-follow' },
];

const forceNodes: ForceNode[] = [
  { number: '01', label: '脚下', group: '建立条件', title: '建立可移动的支撑', action: '脚与地面交换力，使身体能够加速、减速和改变朝向；在一项精英男子跳杀研究中，垂直地面反作用力本身未与更快球速呈显著相关。', focus: '下肢整体 · 踝膝髋协同', focusCue: '把注意力放在支撑、减速和改变方向，不把跳得高当成杀球速度的替代指标。', principle: '地面提供外部约束；“更大的垂直反作用力”不能单独作为更快杀球的判据。', cue: '最后一步之后仍能微调或调整方向，而不是蹬死在原地。', image: 'force-action-01.png', imageAlt: '羽毛球后场击球前双脚分开、重心可调的准备状态教学示意', refs: ['lowerLimb', 'jumpSmash'] },
  { number: '02', label: '下肢 · 髋', group: '建立条件', title: '把身体送进击球位置', action: '踝、膝、髋的协调影响到位、起跳和落地的力学条件；在本页把它作为建立击球空间与制动能力的训练关注，不把下肢测得的力直接解读为拍头速度。', focus: '下肢整体 · 重心与制动', focusCue: '感受身体进入可用的击球位置，同时保留落地和再启动的余量。', principle: '下肢首先影响你在哪里、朝哪里以及能否制动；它与上肢挥拍的关系不能简化成一条直接的速度传送带。', cue: '在不明显后仰的情况下争取身前触球，落地后仍能调整。', image: 'force-action-02.png', imageAlt: '羽毛球后场击球前最后制动步与踝膝髋支撑动作的教学示意', refs: ['lowerLimb', 'jumpSmash'] },
  { number: '03', label: '骨盆', group: '建立条件', title: '让身体朝向服务击球点', action: '骨盆相对下肢和胸廓调整朝向，用于组织躯干和击球臂的活动范围；具体调整取决于步法、来球和击球选择。', focus: '骨盆周围 · 躯干旋转协同', focusCue: '用身体朝向帮助定位，不为了“转体”把骨盆拧到最大。', principle: '在一项正手杀球研究中，技能组使用了更多躯干旋转；这支持“旋转与表现相关”的观察，但不支持每球统一的“先转骨盆”顺序。', cue: '身体朝向服务击球位置，而不是为了转体而转体。', image: 'force-action-03.png', imageAlt: '羽毛球后场击球准备姿势：身体呈侧后方关系，非持拍臂指向来球，球拍置于身后', refs: ['xfactor'] },
  { number: '04', label: '胸廓', group: '建立条件', title: '用相对运动检查上肢空间', action: '胸廓与骨盆共同改变朝向；两者的相对运动可作为观察上肢工作空间是否被保留的线索，但不要求复制同一幅姿势或达到最大幅度。', focus: '躯干 · 肩胛协同', focusCue: '让胸廓转向服务挥拍空间，保持可调，不把“拧得更多”当成更有力。', principle: 'X-factor 研究支持躯干旋转和活动范围与杀球质量的关系，但它没有证明相对旋转越大越好。', cue: '转体没有挤掉挥拍空间，身体与拍臂能在触球附近协调。', image: 'force-action-04.png', imageAlt: '羽毛球后场击球准备姿势：非持拍臂上举，击球臂屈曲置于头后，双脚与地面接触', refs: ['xfactor', 'synergy'] },
  { number: '05', label: '肩 · 肘 · 前臂', group: '组织拍速', title: '把上肢作为协同系统观察', action: '在连续过顶挥拍中，肩、肘、前臂与握拍/手部需要作为一个上肢系统一起观察。不同研究测量的关节和肌肉并不相同，不能由此推出每个人固定的分段时序。', focus: '肩带 · 肘部 · 前臂（训练关注区域）', focusCue: '感受上肢整体加速；不要把拍速简化成“只用手臂”或孤立甩腕。', principle: '一项 14 名大学生研究发现，特定角度的肩内旋等长力量与拍速相关；这不等于主动把肩拧得更多就会更快。', cue: '拍头在触球附近形成有效速度；不主动把肘锁死，上臂也不必过度耸高。', image: 'force-action-05.png', imageAlt: '羽毛球击球前肩、肘、前臂位置的教学示意，不代表固定时序', refs: ['synergy', 'shoulder', 'jumpSmash'] },
  { number: '06', label: '球拍 · 羽毛球', group: '组织拍速', title: '让拍头状态成为可控出球', action: '拍头速度、拍面取向和触球在拍面上的位置共同影响出球速度与方向；来球状态和触球瞬间的拍面运动方向也会改变出球结果。', focus: '拍面 · 前臂 · 握拍控制（训练关注区域）', focusCue: '不要把拍头速度理解成孤立甩腕；在完整挥拍中观察前臂、握拍与手部的协同，但具体动作会随球员和击球类型变化。', principle: '拍头速度与出球速度不是相等值；触球位置、拍面状态和球拍参数都会改变碰撞结果。', cue: '在相近来球条件下，连续击球的触球位置、出球方向和目标命中保持稳定，而不是只看最快一球。', image: 'force-action-06.png', imageAlt: '羽毛球拍面与羽毛球发生碰撞的教学示意', refs: ['upperSynergy', 'impact', 'racket'] },
  { number: '07', label: '落地 · 衔接', group: '回到下一拍', title: '让击球结果延续到下一拍', action: '击球后的随挥和落地需要处理身体动量；随后根据落点、对手回球和战术站位调整下一步，不存在所有人相同的落地模板。', focus: '落地控制 · 重心恢复 · 下一步准备', focusCue: '把目标放在可控落地和重新获得移动选择，而不是硬停在原地。', principle: '杀球的比赛价值不只由首球速度决定；迫使对手形成较弱回球并保持下一拍准备，是本站的比赛评价框架，不是单一生物力学指标。', cue: '在来球和战术允许时，对手触球前回到可动的准备状态，球拍也回到便于准备的位置。', image: 'force-action-07.png', imageAlt: '羽毛球击球后的落地、收拍与下一拍衔接动作的教学示意', refs: ['lowerLimb', 'bwf'] },
];

const trainingStages: TrainingStage[] = [
  {
    number: '01', label: '到位与再启动', title: '先把击球窗口做稳定', goal: '这一阶段训练的是：能否反复到达后场击球位置，在来球允许时争取身前、上方触球，并在击球后恢复准备。目标不是每次都完全静止，而是减速后仍保留调整能力。', image: 'training-footwork.png', imageAlt: '羽毛球运动员进行低重心侧向制动并准备再启动的教学示意', visualLabel: '脚下 · 制动 · 再启动', visualCue: '先把速度降下来，再保留下一步的方向。', refs: ['lowerLimb', 'jumpSmash'],
    modules: [
      { phase: '后场到位 · 再启动', exercise: '随机启动到两个后场点 → 以影子触球模拟身前接触 → 教练再指一个方向启动。', dose: '本站起始模板：3 组 × 4 次/侧；每次完整回位，组间休息 60–90 秒。', muscles: '训练关注：推进、减速、再启动所需的踝膝髋协同；不是在推断某一块肌肉单独主导。', check: '模拟触球位置没有持续向后漂，第二次启动方向仍然清楚。', refs: ['lowerLimb', 'plyometric'] },
      { phase: '单腿 · 侧向制动', exercise: '低幅度侧向跳或跨步落地，单腿承载后立即向相反方向小步启动。', dose: '本站起始模板：3 组 × 4 次/侧；落地声音和膝髋控制变差就停止。', muscles: '训练关注：单腿承载时的髋、膝、踝控制和减速能力。', check: '髋、膝、脚方向大致一致，身体没有明显塌向一侧。', refs: ['lowerLimb', 'plyometric'] },
      { phase: '杀球 · 第二拍', exercise: '影子杀球后，随机接“上网封球”或“再次后退”；训练落地后的第一反应。', dose: '本站起始模板：3 组 × 4 个两拍组合；每组保持可重复的移动质量。', muscles: '训练关注：落地减速后重新组织重心，并依据第二球改变启动方向。', check: '在来球和站位允许时，对手触球前已进入下一拍准备。', refs: ['lowerLimb', 'bwf'] },
    ],
  },
  {
    number: '02', label: '旋转与肩胛', title: '让躯干为拍臂保留空间', goal: '研究观察到躯干旋转、活动范围与杀球表现有关；另有研究在精英选手的肩部肌群中观察到协同活动。这一阶段不要求把躯干转到最大，而是练习转向后上肢仍能自由工作。', image: 'training-rotation.png', imageAlt: '羽毛球场上以宽站姿双手持药球进行躯干旋转准备的教学示意', visualLabel: '骨盆 · 胸廓 · 肩胛', visualCue: '不是把腰拧到最大，而是让转向不挤掉挥拍空间。', refs: ['xfactor', 'synergy'],
    modules: [
      { phase: '交错站姿 · 旋转投掷', exercise: '用轻药球做侧向旋转投掷，强调快速出手和稳定回收；左右侧都练。', dose: '本站起始模板：4 组 × 3 次/侧；每次追求速度，组间充分休息。', muscles: '训练关注：髋与躯干改变朝向的协调，以及旋转后的回收控制。', check: '球速快但脚下不乱，腰椎没有被迫拧到终点。', refs: ['xfactor', 'synergy'] },
      { phase: '胸廓 · 肩胛协同', exercise: '交错站姿轻阻力 lift / chop，随后做一次无阻力半挥拍；它是协调练习，不是杀球动作的唯一模板。', dose: '本站起始模板：3 组 × 5 次/侧；阻力只要能保持肩胛平顺移动。', muscles: '训练关注：肩胛与上肢在低负荷下的协调，不把某一块肌肉视为单独动力源。', check: '转向后手臂仍有空间，肩不耸，头部不被动作明显带走。', refs: ['xfactor', 'upperSynergy'] },
    ],
  },
  {
    number: '03', label: '拍速与碰撞', title: '把速度送进稳定碰撞', goal: '这一阶段训练的是：能否在相近来球条件下重复较快的拍头运动，并保持可控的触球位置和拍面。先保留准确率，再逐步提高速度；不要把疲劳中的失控当成爆发力。', image: 'training-speed.png', imageAlt: '羽毛球运动员进行持拍快速过顶空挥训练，展示拍头加速与控制的教学示意', visualLabel: '拍速 · 碰撞 · 准确率', visualCue: '先让速度可重复，再把速度送进稳定碰撞。', refs: ['shoulder', 'impact', 'plyometric'],
    modules: [
      { phase: '过顶投掷 · 持拍空挥', exercise: '轻药球过顶投掷与持拍快速空挥成对进行；这是本站的转移练习，不等于论文已经证明它能直接提高杀球速度。', dose: '本站起始模板：4 组 × 3 次；每次高质量，组间休息 60–90 秒。', muscles: '训练关注：肩带、肘部和前臂的整体协调，不以单块肌肉酸胀判断动作是否正确。', check: '速度提高时肩部没有明显耸紧，肘部没有主动提前锁死，动作仍可重复。', refs: ['shoulder', 'synergy', 'plyometric'] },
      { phase: '十球 · 碰撞测试', exercise: '同一喂球点连续 10 球，记录目标命中和明显偏心触球；再提高一档速度重复。', dose: '本站起始模板：2–3 轮 × 10 球；两项指标下降，就退回上一档速度。', muscles: '训练关注：前臂、握拍和腕部动作对拍面与触球位置的共同控制。', check: '更快一档仍能保持相近的目标命中和触球位置。', refs: ['impact', 'upperSynergy', 'racket'] },
    ],
  },
];

const navItems = [
  { id: 'principles', label: '击球决策' },
  { id: 'force-path', label: '发力任务' },
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
      <div className="study-plate-footer"><span>生成图 · 教学示意，不是实测数据</span><strong>{footer}</strong></div>
    </div>
  );
}

function SmashVisual() {
  return (
    <div className="mechanics-plate hero-visual">
      <img src="smash-hero.png" alt="右手羽毛球选手完成一次后场过顶击球的教学示意，标注击球窗口、身体定向、触球前加速与落地衔接四个观察任务" />
      <div className="hero-visual-shade" aria-hidden="true" />
      <div className="plate-meta"><span>教学示意 / 01</span><span>右手杀球</span></div>
      <div className="visual-label visual-label-base"><i aria-hidden="true" /><div><b>01 / 击球窗口</b><strong>争取在持拍肩前方、上方触球</strong><small>这是技术目标，不是固定坐标<br />是否做到取决于来球和到位质量</small></div></div>
      <div className="visual-label visual-label-rotation"><i aria-hidden="true" /><div><b>02 / 身体定向</b><strong>让身体朝向服务击球位置</strong><small>躯干与骨盆的相对运动可能保留上肢空间<br />不要求每球达到同一幅度</small></div></div>
      <div className="visual-label visual-label-release"><i aria-hidden="true" /><div><b>03 / 上肢加速</b><strong>观察肩、肘、前臂的协同加速</strong><small>研究支持多关节协同<br />不支持用孤立甩腕解释拍速</small></div></div>
      <div className="visual-label visual-label-recovery"><i aria-hidden="true" /><div><b>04 / 落地衔接</b><strong>恢复到便于处理下一球的位置</strong><small>落地方式随击球和站位变化<br />目标是保留调整与移动选择</small></div></div>
      <div className="plate-footer"><span>生成图 · 教学示意，不是实测数据</span><strong>位置 → 组织 → 加速 → 碰撞与回位</strong></div>
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
          <span className="hero-scope">适用范围：右手持拍 · 后场正手过顶击球 / 杀球</span>
          <h1>先争窗口<br /><em>再争拍速</em></h1>
          <p>先用步法和身体位置争取在持拍肩前方、上方触球；在可用的时间和空间内，躯干与上肢协同参与拍头运动。拍头状态、拍面取向和触球位置共同影响出球结果；杀球通常追求向下，但具体轨迹取决于来球、击球位置、拍面运动和球拍参数。<InlineReferences refs={['lowerLimb', 'xfactor', 'shoulder', 'synergy', 'impact', 'racket']} /></p>
          <div className="hero-question"><span>高手先问</span><strong>来球条件允许身前、上方触球吗？触球前还有可用空间吗？击球后还能准备下一拍吗？</strong></div>
          <div className="hero-ramp"><span>读图路径</span><strong>先争取位置，再组织挥拍，最后检查碰撞和回位</strong><div><b>位置</b><i>→</i><b>组织</b><i>→</i><b>加速</b><i>→</i><b>碰撞与回位</b></div></div>
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
                <img src="principles-sequence-board.png" alt="四帧羽毛球过顶击球教学示意，从移动制动、身体组织、触球前加速到击球衔接" />
                <figcaption>生成图 · 教学示意 · 四个观察时刻（非实测序列）</figcaption>
              </figure>
              <div className="sequence-step-grid">
                {principleSequence.map((item) => <article className="sequence-step" key={item.number}><div className="sequence-step-head"><b>{item.number}</b><span>{item.label}</span></div><h3>{item.title}</h3><p>{item.text}<InlineReferences refs={item.refs} /></p></article>)}
              </div>
            </div>
            <div className="visual-reading-note"><span>按任务看，不要背固定顺序</span><strong>这不是四张必须复制的姿势图，而是一拍动作中相互重叠的任务。</strong><p>移动、身体组织、上肢加速和碰撞可以分开观察，但真实动作存在时间重叠；来球、步法和击球类型都会改变它们的相对时序。<InlineReferences refs={['lowerLimb', 'xfactor', 'synergy', 'impact']} /></p><div><b>图像读法</b><span>位置条件 → 身体组织 → 上肢加速 → 碰撞与回位</span></div></div>
          </div>
          <div className="principle-line"><span>本站决策模型</span><strong>如果来球允许在身前、上方稳定触球，且击球后仍有回位条件，可考虑完整杀球；时间或位置被压缩时，可选择较短准备的下压球；如果触球窗口已丢失，则优先选择能恢复时间和位置的过渡球。</strong><InlineReferences refs={['bwf', 'impact']} /></div>
          <div className="shot-choice">
            <div className="shot-choice-head"><span>根据结果选择打法</span><strong>每次出手先服从来球条件，再追求拍速。</strong></div>
            <figure className="shot-choice-board">
              <div className="shot-choice-board-visual">
                <img src="shot-choice-board-v3.png" alt="三种后场击球条件的教学示意，不是动作标准图：完整杀球、时间空间受限时的点杀或半杀、以及击球窗口偏后时的过渡选择" />
                <div className="shot-choice-board-labels"><span><b>01</b><em>完整杀球<small>身前较远 · 完整加载</small></em></span><span><b>02</b><em>点杀 · 半杀<small>非完全侧身 · 短引拍</small></em></span><span><b>03</b><em>先过渡<small>击球窗口偏后 · 先恢复条件</small></em></span></div>
                <figcaption>生成图 · 条件示意：身前较远 → 身前较近 → 窗口偏后</figcaption>
              </div>
            </figure>
            <div className="shot-choice-grid">
              <article><b>01 / 完整杀球</b><h3>完整杀球</h3><p><span>窗口</span>来球条件允许在持拍肩前方、上方触球，身体无需明显后仰，击球后仍有机会回位。</p><p><span>目标</span>用拍头速度、方向或落点施压；是否直接得分取决于击球质量和对手位置。<InlineReferences refs={['bwf', 'impact']} /></p></article>
              <article><b>02 / 点杀 · 半杀</b><h3>点杀 · 半杀</h3><p><span>窗口</span>仍能在身前、上方触球，但时间或空间有限，身体组织和引拍不必完全展开；在本站的条件示意里，触球位置通常比完整杀球更近，但不是固定距离。</p><p><span>目标</span>在保留控制和回位可能的前提下完成下压或变速。这是本站的条件性教学分类，不是论文建立的标准分类。<InlineReferences refs={['bwf', 'impact']} /></p></article>
              <article><b>03 / 先过渡</b><h3>先过渡</h3><p><span>窗口</span>如果击球窗口已经明显偏到身体后方，继续追求完整杀球往往会牺牲控制；这表示当前条件通常不适合硬杀。</p><p><span>目标</span>优先考虑能让自己重新获得时间和站位的选择，例如高远或其他可控回球；具体出手取决于来球、对手位置和自己的拍面控制。此处为本站决策框架。<InlineReferences refs={['bwf']} /></p></article>
            </div>
          </div>
        </div>
      </section>

      <section id="force-path" className="force-path-section force-section">
        <div className="section-heading"><div><span className="section-label">发力任务</span><h2>这不是传送带，<br /><em>是一组相互约束。</em></h2></div><span className="section-index">07 个动作任务</span></div>
        <div className="path-statement"><span>先定义模型</span><strong>每个节点不是“把力传给下一个关节”，而是在当下解决一个问题：位置、方向、空间、拍速、碰撞，最后回到下一拍。</strong><p>研究观察到多关节协同，也有研究讨论近端—远端的协调与速度变化；但这些结果不等于一条适用于每个人、每一球的固定发力顺序。肌肉名称在这里仅用于注意力和训练设计，不代表一块肌肉单独“接管”一拍。<InlineReferences refs={['synergy', 'upperSynergy', 'xfactor']} /></p><small className="visual-disclaimer">图像只用于阅读空间关系、动作任务和结果方向；它们不是运动捕捉数据，也不是需要复制的唯一姿势。</small></div>
        <div className="path-layout">
          <div className="path-visual">
            <div className="path-meta"><span>按任务读，不按关节背</span><span>组间有关联 · 组内会重叠</span></div>
            <div className="path-action-group-row" aria-hidden="true"><span>01 · 建立条件<br /><small>位置 · 方向 · 空间</small></span><span>02 · 组织拍速<br /><small>加速 · 碰撞</small></span><span>03 · 回到下一拍<br /><small>落地 · 再组织</small></span></div>
            <div className="path-action-grid" role="tablist" aria-label="七项杀球动作任务">
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
            <div className="path-reading-focus"><div><span>训练关注 · 非单肌肉结论</span><strong>{node.focus}</strong></div><p>{node.focusCue}</p></div>
            <div className="path-reading-grid"><div><span>科学边界</span><p>{node.principle}</p></div><div><span>场上检查</span><p>{node.cue}</p></div></div>
            <div className="reference-row"><span>证据与参考</span><InlineReferences refs={node.refs} /></div>
          </div>
        </div>
      </section>

      <section id="training" className="training-section force-section">
        <div className="section-heading"><div><span className="section-label">训练瓶颈</span><h2>训练不追疲劳，<br /><em>只追可转化。</em></h2></div><span className="section-index">03 个训练阶段</span></div>
        <div className="training-statement"><span>本站训练原则</span><strong>先用球场结果定位瓶颈：到位不稳、旋转空间不足、拍速不够、碰撞不净或第二拍掉速。训练只补一个短板；肌肉名称只作功能聚焦，最后必须回到真实击球验收。这是本站的训练组织方法，不是某一篇论文给出的完整处方。训练剂量只作为本站可调整的起始模板，不是研究直接验证的固定处方。</strong><div className="reference-row"><span>关联研究</span><InlineReferences refs={['synergy', 'plyometric', 'impact']} /></div></div>
        <div className="training-layout">
          <div className="training-visual" role="tablist" aria-label="杀球训练阶段">
            <div className="training-meta"><span>三个训练阶段</span><span>点击阶段，查看对应训练画面</span></div>
            <div className="training-track">
              {trainingStages.map((item, index) => <div className="training-track-item" key={item.number}><button id={`training-tab-${item.number}`} className={activeTraining === index ? 'training-node active' : 'training-node'} onClick={() => setActiveTraining(index)} role="tab" aria-selected={activeTraining === index} aria-controls="training-panel"><b>{item.number}</b><strong>{item.label}</strong></button>{index < trainingStages.length - 1 && <span className="training-arrow" aria-hidden="true">→</span>}</div>)}
            </div>
            <div className="training-stage-photo">
              <div className="training-stage-photo-meta"><span>生成图 · 教学示意 · {trainingStage.number}</span><span>{trainingStage.visualLabel}</span></div>
              <img src={trainingStage.image} alt={trainingStage.imageAlt} />
              <div className="training-photo-shade" aria-hidden="true" />
              <div className="training-stage-photo-caption"><div><span>这一张看什么</span><strong>{trainingStage.label}</strong></div><p>{trainingStage.visualCue}</p></div>
            </div>
            <div className="training-rules"><div><b>01</b><strong>先有球场指标</strong><p>窗口 · 目标 · 第二拍。</p></div><div><b>02</b><strong>高质量再加量</strong><p>速度下降，就结束这一组。</p></div><div><b>03</b><strong>负荷不改动作</strong><p>离场训练，回场验收。</p></div></div>
          </div>
          <div id="training-panel" className="training-reading" role="tabpanel" tabIndex={0} aria-labelledby={`training-tab-${trainingStage.number}`}>
            <div className="training-reading-top"><span className="section-label">本站训练模板 · {trainingStage.number}</span><b>回场验收 · {trainingStage.label}</b></div>
            <h3>{trainingStage.title}</h3>
            <div className="training-goal"><span>本阶段目标</span><p>{trainingStage.goal}<InlineReferences refs={trainingStage.refs} /></p></div>
            <div className="training-module-list">
              {trainingStage.modules.map((module) => <article className="training-module" key={module.phase}><div className="training-module-head"><strong>{module.phase}</strong></div><div><span>训练任务</span><p>{module.exercise}</p></div><div><span>本站起始剂量</span><p>{module.dose}</p></div><div><span>训练关注</span><p>{module.muscles}</p></div><div><span>回场标准</span><p>{module.check}</p></div><div className="reference-row"><span>关联研究</span><InlineReferences refs={module.refs} /></div></article>)}
            </div>
          </div>
        </div>
        <p className="training-note">增强式训练在现有羽毛球研究中可能改善力量、敏捷、速度和平衡，但研究数量有限，证据确定性为低或极低；它不能被直接等同于杀球变快。本站把它作为补充，不用某块肌肉的酸胀判断技术正确；疼痛、麻木或明显不稳时停止，并寻求专业评估。<InlineReferences refs={['plyometric']} /></p>
        <div className="training-sources"><span>训练证据</span><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12170632/" target="_blank" rel="noreferrer">2025 / 肌肉协同 ↗</a><a href="https://pubmed.ncbi.nlm.nih.gov/38533062/" target="_blank" rel="noreferrer">2024 / 增强式训练综述 ↗</a><a href="https://pubmed.ncbi.nlm.nih.gov/33663330/" target="_blank" rel="noreferrer">2021 / 精英跳杀决定因素 ↗</a></div>
      </section>

      <section id="lesson" className="lesson-section force-section">
        <div className="section-heading"><div><span className="section-label">上场验收</span><h2>更快之后，<br /><em>结果不能塌。</em></h2></div><span className="section-index">4 个结果 · 1 组球</span></div>
        <div className="lesson-intro"><p>本站用一组真实回合作为验收，记录四个结果指标：击球窗口、拍头速度、触球位置与拍面控制、下一拍准备。关于拍头速度、触球位置和拍面状态的研究，只能帮助理解其中部分结果；下一拍准备是本站的场上验收指标。哪一项先丢，就回到对应训练，不用继续加力补救。<InlineReferences refs={['jumpSmash', 'impact']} /></p><strong>动作可以不同，结果必须可复现。</strong></div>
        <div className="lesson-visual-layout">
          <StudyPlate src="impact-study.png" alt="羽毛球拍面与羽毛球碰撞的教学示意，展示拍面、触球位置和击球后的衔接关系" meta="碰撞示意 / 05" side="碰撞与衔接" footer="中心触球 → 稳定出球 → 回到下一拍" markers={lessonMarkers} className="lesson-study-plate" />
          <div className="visual-reading-note lesson-result-note"><span>本章作用</span><strong>不评判姿势，只验收结果。</strong><p>触球位置与出球方向的关系有研究支持；下一拍准备则是本站的场上验收指标。动作可以因人而异，但这些结果应在连续回合中保持可观察、可重复。<InlineReferences refs={['impact']} /></p><div><b>验收顺序</b><span>击球窗口 → 拍头速度 → 中心碰撞 → 下一拍选择</span></div><div className="lesson-result-legend"><span><b>01</b>窗口</span><span><b>02</b>拍速</span><span><b>03</b>碰撞</span><span><b>04</b>下一拍</span></div></div>
        </div>
        <div className="lesson-check-label"><span>现场检查</span><strong>点击一项，只看这一项是否仍然成立。</strong></div>
        <div className="phase-tabs" role="tablist" aria-label="上场验收的四项结果">
          {lessonSteps.map((item, index) => <button key={item.number} id={`step-tab-${item.number}`} className={activeStep === index ? 'phase-tab active' : 'phase-tab'} onClick={() => setActiveStep(index)} role="tab" aria-selected={activeStep === index} aria-controls="step-panel"><span>{item.number}</span><strong>{item.label}</strong></button>)}
        </div>
        <div id="step-panel" className="phase-reading" role="tabpanel" tabIndex={0} aria-labelledby={`step-tab-${step.number}`}>
          <div className="phase-main"><div className="phase-status"><span>当前检查</span><strong>{step.label}</strong></div><span className="section-label">观察问题</span><h3>{step.title}</h3><div className="phase-action"><span>关键观察</span><p>{step.action}<InlineReferences refs={step.refs} /></p></div><div className="phase-next"><span>失效后回到</span><strong>{step.next}</strong></div></div>
          <div className="phase-coach"><div className="coach-row"><span>合格表现</span><p>{step.cue}</p></div><div className="coach-row"><span>失效信号</span><p>{step.avoid}</p></div><div className="coach-row coach-drill"><span>现场验证</span><p>{step.drill}</p></div></div>
        </div>
        <div className="lesson-close"><span>本站回修原则</span><strong>先修最先丢掉的结果，再追求拍速。</strong><p>这不是动作评分，也不是判断谁是高手；它是训练后的结果验收。用结果约束动作，而不是复制某位顶级球员的一帧姿势。这个验收框架属于本站教学设计。</p><div><span>窗口丢失 → 到位与再启动</span><span>拍速丢失 → 旋转与肩胛</span><span>碰撞或下一拍丢失 → 回到球场复测</span></div></div>
      </section>

      <section id="boundary" className="boundary-section force-section">
        <div className="section-heading"><div><span className="section-label">证据边界</span><h2>科学能支持的，<br /><em>说到这里。</em></h2></div><span className="section-index">如实阅读</span></div>
        <div className="boundary-visual-layout">
          <StudyPlate src="evidence-study.png" alt="羽毛球拍、羽毛球和场地测量网格组成的证据边界教学示意" meta="证据边界 / 06" side="测量与边界" footer="观察 → 测量 → 解释 → 保留边界" markers={[]} className="boundary-study-plate" />
          <div className="visual-reading-note"><span>不要把模型当定律</span><strong>先区分观察到的结果，再解释身体机制。</strong><p>研究可以帮助我们知道哪些变量更接近击球结果，但不能替每个球员规定唯一姿势。专业性也包括知道结论在哪里停止。<InlineReferences refs={['synergy', 'xfactor', 'jumpSmash']} /></p><div><b>阅读层级</b><span>研究发现 · 生物力学解释 · 教练经验 · 个体差异</span></div></div>
        </div>
        <div className="boundary-grid"><article><span>可以说</span><h3>不同任务，有不同功能聚焦</h3><p>研究观察到的是多肌群协同。本站用下肢、躯干、肩胛、肩肘前臂和握拍提示当前任务，但不把它们写成单肌肉开关。<InlineReferences refs={['synergy', 'upperSynergy']} /></p></article><article><span>不能说</span><h3>某块肌肉负责把力传到拍头</h3><p>“躯干是引擎、手臂只是鞭绳”可以作为纠正抡臂的比喻，却不能替代真实的肩、肘、前臂和手部协同，也不能据此下伤病结论。<InlineReferences refs={['shoulder', 'synergy']} /></p></article><article><span>本站验收框架</span><h3>用感觉引导，用结果验证</h3><p>主观聚焦帮助你组织动作；窗口、拍速、触球位置与拍面控制、下一拍准备，用来判断这次发力是否真的转化。这是本站的教学框架，不是论文直接建立的评分量表。</p></article></div>
        <p className="reference-disclaimer">页面内的链接只支持其相邻文字中标明的研究事实；动作口令、击球分类、训练任务和剂量是本站基于证据的教学转译或实践模板，不代表论文逐字验证了每一句话。训练模块后的链接只说明相关能力或结果，不等于该练法本身已经被直接验证。BWF 手册属于教练教育资料，不等同于同行评审研究。页面中的生成图均为教学示意，只承担空间、任务和结果方向提示，不承担动作角度、时序或肌肉激活的证据功能。</p>
        <div className="source-strip"><span>主要来源</span><a href="https://sfbadminton.tenniscity.org/wp-content/uploads/sites/29/2020/03/bwf_coach_education_coaches_manual_l1-2nd-edition-midres.pdf" target="_blank" rel="noreferrer">教练手册 · 杀球 ↗</a><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12170632/" target="_blank" rel="noreferrer">肌肉协同研究 ↗</a><a href="https://pubmed.ncbi.nlm.nih.gov/33663330/" target="_blank" rel="noreferrer">精英跳杀研究 ↗</a><a href="https://doi.org/10.1080/02640414.2020.1792132" target="_blank" rel="noreferrer">触球位置研究 ↗</a><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10462755/" target="_blank" rel="noreferrer">球拍参数研究 ↗</a></div>
      </section>

      <footer className="force-footer"><span>力场 / 羽毛球发力实验室</span><strong>高手表现复盘</strong><span>专家修订 · 2026.08</span></footer>
    </main>
  );
}
