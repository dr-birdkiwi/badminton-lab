'use client';

import { useEffect, useState } from 'react';

/* eslint-disable @next/next/no-img-element */

type ReferenceKey = 'synergy' | 'xfactor' | 'shoulder' | 'jumpSmash' | 'impact' | 'collision' | 'lowerLimb' | 'plyometric' | 'injuryReview' | 'upperSynergy' | 'racket' | 'bwf' | 'strokeMotion' | 'strokeEmgPilot' | 'backhandMotion' | 'backhandClear' | 'netMotion' | 'lungeReview' | 'lungeEmg' | 'emgLimits';

type Reference = {
  label: string;
  href: string;
  title: string;
  kind: '研究' | '综述' | '教练资料';
};

const references: Record<ReferenceKey, Reference> = {
  synergy: { label: '肌肉协同', kind: '研究', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12170632/', title: '20 名精英选手：羽毛球正手过顶杀球的肌肉协同分析' },
  xfactor: { label: '躯干旋转', kind: '研究', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5260572/', title: '24 名受试者、站立正手杀球：躯干旋转与击球质量' },
  shoulder: { label: '肩内旋力量', kind: '研究', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6016291/', title: '14 名大学生：肩外展外旋位肩内旋等长力矩与杀球拍速的相关性' },
  jumpSmash: { label: '跳杀相关变量', kind: '研究', href: 'https://pubmed.ncbi.nlm.nih.gov/33663330/', title: '19 名马来西亚精英男子：跳杀接触时关节运动与球速的相关性' },
  impact: { label: '触球位置', kind: '研究', href: 'https://doi.org/10.1080/02640414.2020.1792132', title: '65 名国际球员、2386 次杀球：拍—球碰撞位置与出球结果' },
  collision: { label: '碰撞时窗', kind: '研究', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC13038878/', title: '7 名运动员、1000 Hz 捕捉与有限元模型：正手杀球拍—球接触时窗约 3 ms' },
  lowerLimb: { label: '下肢研究', kind: '研究', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9598458/', title: '6 名高水平球员：正手过顶击球起跳期下肢力学先导研究' },
  plyometric: { label: '增强式训练', kind: '综述', href: 'https://pubmed.ncbi.nlm.nih.gov/38533062/', title: '11 项研究、445 名运动员：羽毛球增强式训练系统综述' },
  injuryReview: { label: '伤病风险', kind: '综述', href: 'https://pubmed.ncbi.nlm.nih.gov/42217216/', title: '11 项前瞻性研究：羽毛球弓步、落地与肩部的生物力学风险因素' },
  upperSynergy: { label: '上肢协同', kind: '研究', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6317092/', title: '精英与非精英选手：五块上肢肌肉的协同研究' },
  racket: { label: '球拍参数', kind: '研究', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10462755/', title: '球拍惯量、拍头速度与触球位置；群体出球速度未见显著差异' },
  bwf: { label: 'BWF 教练资料', kind: '教练资料', href: 'https://www.badminton.org.au/wp-content/uploads/2022/11/1.-BWF-ST-Teachers-Manual_Inclusivity_ENGLISH.pdf', title: 'BWF Schools 教练手册（澳大利亚羽协镜像）' },
  strokeMotion: { label: '正手三类过顶球', kind: '研究', href: 'https://doi.org/10.24776/jcoaching.30.2_193', title: '7 名日本高水平男子：杀球、高远球与吊球的上肢运动学差异' },
  strokeEmgPilot: { label: '多技术上肢肌电', kind: '研究', href: 'https://commons.nmu.edu/isbs/vol41/iss1/71/', title: '单人先导研究：正反手抽球、高远球、杀球与吊球的七组上肢肌电；只作探索性参考' },
  backhandMotion: { label: '反手三类过顶球', kind: '研究', href: 'https://ojs.ub.uni-konstanz.de/cpa/article/view/686', title: '反手杀球、高远球与吊球的三维运动学会议研究' },
  backhandClear: { label: '反手高远球肌电', kind: '研究', href: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002291742', title: '不同水平球员反手高远球的运动学与上肢肌电比较' },
  netMotion: { label: '正手网前运动学', kind: '研究', href: 'https://ojs.ub.uni-konstanz.de/cpa/article/view/5367', title: '8 名精英大学男子：三类正手网前球的上肢运动学比较' },
  lungeReview: { label: '弓步生物力学', kind: '综述', href: 'https://pubmed.ncbi.nlm.nih.gov/33194445/', title: '20 项研究的羽毛球弓步下肢生物力学范围综述' },
  lungeEmg: { label: '专项步法肌电', kind: '研究', href: 'https://doi.org/10.3390/app16021120', title: '12 名精英男子：网前、侧向防守与后场交叉步中的股四头肌、腘绳肌和臀肌相对贡献' },
  emgLimits: { label: '肌电解释边界', kind: '综述', href: 'https://pubmed.ncbi.nlm.nih.gov/39069427/', title: 'CEDE 共识：利用肌电估计肌力时的实验设计与解释边界' },
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
    title: '触球窗口是否仍在身体前上方？',
    action: '这是本站的场上观察线索，不是固定高度标准：看触球前，球是否仍有机会落在身体前上方、持拍肩前方的可用窗口；身体是否需要明显后仰或追到身后去补偿位置。来球、步法和击球类型会改变窗口；窗口被压缩时，改用更可控的击球选择，而不是用更大力量补救位置。',
    cue: '来球允许时，不靠明显后仰或追到身后，也能在身体前上方完成触球。',
    avoid: '为了“打重”追到球后面；起跳或加力后，反而失去身前的触球空间。',
    drill: '随机喂两个后场点，触球前只报“完整 / 点杀 / 过渡”；记录哪一种选择能保住下一拍。',
    next: '回到训练：到位与再启动。',
    refs: ['bwf', 'jumpSmash'],
  },
  {
    number: '02',
    label: '拍速',
    title: '触球前，拍头是否在触球附近形成有效速度？',
    action: '作为场上观察线索，检查拍头速度是否在触球前增至触球附近，并把肩、肘、前臂与握拍/手部作为一个上肢系统观察。现有研究对不同关节和肌肉的测量并不等量，也没有证明所有球员必须使用完全相同的分段时序。',
    cue: '从视频回看时，拍头速度在触球附近形成稳定变化；速度提升没有明显牺牲触球质量。',
    avoid: '从引拍开始就握死；过早把速度用完；把拍速归因于孤立甩腕。',
    drill: '本站测试起点：同一点 10 球，先以约 70% 速度寻找稳定触球位置，再逐档提速；速度上升但稳定触球率下降，就退回上一档。',
    next: '回到训练：躯干与肩带协同。',
    refs: ['shoulder', 'jumpSmash'],
  },
  {
    number: '03',
    label: '碰撞',
    title: '触球结果是否稳定？',
    action: '验收碰撞结果：在相近来球和挥拍条件下，触球位置、拍面取向与出球方向要一起观察。研究显示，触球在拍面上的位置会影响出球速度和水平方向；因此，拍头更快不等于结果一定更好。',
    cue: '触球位置、出球方向和目标命中率在连续几球中都相近。',
    avoid: '只追求某一球的最快；偏心触球后仍继续加力；把手臂更紧当成碰撞更好。',
    drill: '连续 10 球同时记录目标命中和偏心触球；两项任一明显变差，就不要继续加速。',
    next: '回到训练：拍速与碰撞。',
    refs: ['impact'],
  },
  {
    number: '04',
    label: '下一拍',
    title: '击球后，是否仍保留下一拍的选择？',
    action: '验收击球后的连续性：落地后能安全减速并重新组织重心，球拍回到便于准备的位置；随挥不必追求统一幅度，具体落地和衔接要随击球位置、来球与下一球调整。',
    cue: '在来球和战术允许时，击球后尽快回到可动的准备状态，仍保留下一步选择。',
    avoid: '落地后看球；每次都机械回到同一位置；为了急停而打断随挥。',
    drill: '杀球后随机接“挡网 / 挑后场”第二球，连续 3 组；以能否及时启动作为通过标准。',
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
  { number: '01', label: '击球窗口', title: '来球允许时，先争取身前、上方位置', text: '先用步法调整身体与来球的相对位置，目标是在身体前上方、持拍肩前方触球；能否做到取决于来球高度、落点和到位质量。', alt: '羽毛球后场击球前的移动与制动阶段', refs: ['lowerLimb', 'jumpSmash', 'bwf'] },
  { number: '02', label: '身体组织', title: '身体朝向与挥拍空间', text: '到位后不必把身体锁死；躯干不同部分的相对转动可能为上肢保留工作空间。这是基于生物力学研究的教学转译，不要求每球达到同一幅度或遵循固定先后，也不是“骨盆先转”的固定口令。', alt: '羽毛球后场击球前的身体组织阶段', refs: ['xfactor', 'synergy'] },
  { number: '03', label: '上肢协同与拍头速度', title: '把上肢作为协同系统观察', text: '肩、肘、前臂和握拍/手部是连续挥拍中需要一起观察的上肢系统；研究支持协调关系，但不同研究测量的关节和肌肉并不相同，不能由此推出每个人固定的分段时序。', alt: '羽毛球击球前拍头加速阶段', refs: ['shoulder', 'synergy', 'upperSynergy'] },
  { number: '04', label: '击球与衔接', title: '把拍头状态送进碰撞，再准备下一拍', text: '拍头状态、拍面取向和触球位置共同影响出球结果。拍—球接触极短，一项 7 人高速测量与有限元研究估计约 3 ms；因此本站只用碰撞前后关系辅助阅读，不把生成图当成真实触球帧。击球后的回位要随击球位置与下一球调整。', alt: '羽毛球拍面与羽毛球碰撞并准备衔接下一拍的阶段', refs: ['impact', 'collision', 'bwf', 'lowerLimb'] },
];

const lessonMarkers: StudyMarker[] = [
  { number: '01', label: '碰撞后分离', title: '羽毛球已经离开拍面', text: '画面只表示碰撞后的相对位置，不冒充高速测量中的触球瞬间。', position: 'marker-impact' },
  { number: '02', label: '拍面关系', title: '拍面与触球位置共同影响结果', text: '拍头更快不能补偿失控的拍面或明显偏离的触球位置。', position: 'marker-face' },
];

const forceNodes: ForceNode[] = [
  { number: '01', label: '脚下', group: '建立条件', title: '建立可移动的支撑', action: '脚与地面交换力，使身体能够加速、减速和改变朝向；在该项精英男子跳杀研究中，垂直地面反作用力本身未与更快球速呈显著相关。', focus: '下肢整体 · 踝膝髋协同', focusCue: '把注意力放在支撑、减速和改变方向，不把跳得高当成杀球速度的替代指标。', principle: '地面提供外部约束；“更大的垂直反作用力”不能单独作为更快杀球的判据。', cue: '最后一步之后仍能微调或调整方向，而不是蹬死在原地。', image: 'force-action-01-v2.png', imageAlt: '羽毛球后场击球前双脚分开、重心可调并准备制动改变方向的教学示意', refs: ['lowerLimb', 'jumpSmash'] },
  { number: '02', label: '下肢与髋部', group: '建立条件', title: '把身体送进击球位置', action: '踝、膝、髋的协调参与到位和起跳阶段的力学条件；在本页把它作为建立击球空间与制动能力的训练关注，不把下肢测得的力直接解读为拍头速度或固定的落地模板。', focus: '下肢整体 · 重心与制动', focusCue: '感受身体进入可用的击球位置，同时保留落地和再启动的余量。', principle: '下肢首先影响你在哪里、朝哪里以及能否制动；它与上肢挥拍的关系不能简化成一条直接的速度传送带。', cue: '在不明显后仰的情况下争取身前触球，落地后仍能调整。', image: 'force-action-02-v4.png', imageAlt: '羽毛球后场击球前的动态进入：右手持拍，髋部带动身体完成最后一步，双脚保留制动与再启动空间', refs: ['lowerLimb', 'jumpSmash'] },
  { number: '03', label: '身体朝向', group: '建立条件', title: '让身体朝向服务击球点', action: '本页把身体朝向和躯干相对运动，作为组织躯干与击球臂活动范围的观察线索；具体调整取决于步法、来球和击球选择。', focus: '身体朝向 · 躯干旋转协同', focusCue: '用身体朝向帮助定位，不为了“转体”把躯干拧到最大。', principle: '在一项不允许起跳的正手杀球研究中，技能组使用了更多躯干旋转；这支持“旋转与表现相关”的观察，但不支持每球统一的“先转骨盆”顺序。', cue: '身体朝向服务击球位置，而不是为了转体而转体。', image: 'force-action-03-v2.png', imageAlt: '右手持拍运动员从后侧观察来球，左臂协助定位，身体朝向为过顶击球保留空间的教学示意', refs: ['xfactor'] },
  { number: '04', label: '躯干空间', group: '建立条件', title: '用相对运动检查上肢空间', action: '躯干不同部分共同改变朝向；本页把相对运动作为观察上肢工作空间是否被保留的线索，但不要求复制同一幅姿势或达到最大幅度。', focus: '躯干 · 肩带协同', focusCue: '让躯干转向服务挥拍空间，保持可调，不把“拧得更多”当成更有力。', principle: 'X-factor 研究支持躯干旋转和活动范围与杀球质量的关系，但它没有证明相对旋转越大越好。', cue: '转体没有挤掉挥拍空间，身体与拍臂能在触球附近协调。', image: 'force-action-04.png', imageAlt: '羽毛球后场击球准备姿势：非持拍臂上举，击球臂屈曲置于头后，双脚与地面接触', refs: ['xfactor', 'synergy'] },
  { number: '05', label: '肩 · 肘 · 前臂', group: '组织拍速', title: '把上肢作为协同系统观察', action: '在连续过顶挥拍中，肩、肘、前臂与握拍/手部需要作为一个上肢系统一起观察。不同研究测量的关节和肌肉并不相同，不能由此推出每个人固定的分段时序。', focus: '肩带 · 肘部 · 前臂（训练关注区域）', focusCue: '感受上肢整体加速；不要把拍速简化成“只用手臂”或孤立甩腕。', principle: '一项 14 名大学生研究发现，肩外展并处于外旋位置时的肩内旋等长力矩与拍速相关；这不等于主动把肩拧得更多就会更快。', cue: '触球附近形成有效拍头速度；不要主动锁死肘部，也不要把“肩抬得更高”当成提速目标。', image: 'force-action-05.png', imageAlt: '羽毛球击球前肩、肘、前臂位置的教学示意，不代表固定时序', refs: ['synergy', 'shoulder', 'jumpSmash'] },
  { number: '06', label: '球拍 · 羽毛球', group: '组织拍速', title: '让拍头状态成为可控出球', action: '作为碰撞观察变量，拍头速度、拍面取向和触球在拍面上的位置共同影响出球速度与方向；来球状态和触球瞬间的拍面运动方向也会改变出球结果。', focus: '拍面 · 前臂 · 握拍控制（训练关注区域）', focusCue: '不要把拍头速度理解成孤立甩腕；在完整挥拍中观察前臂、握拍与手部的协同，但具体动作会随球员和击球类型变化。', principle: '拍头速度与出球速度不是相等值；触球位置、拍面状态和球拍参数会共同影响碰撞结果。拍—球接触只有毫秒量级，本站图片只表示碰撞后的分离状态。', cue: '在相近来球条件下，连续击球的触球位置、出球方向和目标命中保持稳定，而不是只看最快一球。', image: 'force-action-06-v2.png', imageAlt: '右手持拍运动员完成过顶击球后，羽毛球已与拍面分离并向前飞行的教学示意', refs: ['upperSynergy', 'impact', 'collision', 'racket'] },
  { number: '07', label: '落地 · 衔接', group: '回到下一拍', title: '让击球结果延续到下一拍', action: '击球后的随挥和落地需要处理身体动量；随后根据落点、对手回球和战术站位调整下一步，不存在所有人相同的落地模板。', focus: '落地控制 · 重心恢复 · 下一步准备', focusCue: '把目标放在可控落地和重新获得移动选择，而不是硬停在原地。', principle: '杀球的比赛价值不只由首球速度决定；迫使对手形成较弱回球并保持下一拍准备，是本站的比赛评价框架，不是单一生物力学指标。', cue: '在来球和战术允许时，击球后尽快回到可动的准备状态，球拍也回到便于准备的位置。', image: 'force-action-07-v2.png', imageAlt: '羽毛球过顶击球后重心回收、双脚重新获得移动选择并准备下一拍的教学示意', refs: ['lowerLimb', 'bwf'] },
];

const trainingStages: TrainingStage[] = [
  {
    number: '01', label: '到位与再启动', title: '先把击球窗口做稳定', goal: '这一阶段训练的是：能否反复到达后场击球位置，在来球允许时争取身前、上方触球，并在击球后恢复准备。目标不是每次都完全静止，而是减速后仍保留调整能力。', image: 'training-footwork.png', imageAlt: '羽毛球运动员进行低重心侧向制动并准备再启动的教学示意', visualLabel: '脚下 · 制动 · 再启动', visualCue: '先把速度降下来，再保留下一步的方向。', refs: ['lowerLimb', 'jumpSmash'],
    modules: [
      { phase: '后场到位 · 再启动', exercise: '随机启动到两个后场点 → 以影子触球模拟身前接触 → 教练再指一个方向启动。', dose: '本站起始模板：3 组 × 4 次/侧；每次完整回位，组间休息 60–90 秒。', muscles: '训练关注：推进、减速、再启动所需的踝膝髋协同；不是在推断某一块肌肉单独主导。', check: '模拟触球位置没有持续向后漂，第二次启动方向仍然清楚。', refs: ['lowerLimb', 'plyometric'] },
      { phase: '单腿 · 侧向制动', exercise: '低幅度侧向跳或跨步落地，单腿承载后立即向相反方向小步启动。', dose: '本站起始模板：3 组 × 4 次/侧；落地质量或膝髋控制变差就停止。', muscles: '训练关注：单腿承载时的髋、膝、踝控制和减速能力。', check: '髋、膝、脚方向大致一致，身体没有明显塌向一侧。', refs: ['lowerLimb', 'plyometric'] },
      { phase: '杀球 · 第二拍', exercise: '影子杀球后，随机接“上网封球”或“再次后退”；训练落地后的第一反应。', dose: '本站起始模板：3 组 × 4 个两拍组合；每组保持可重复的移动质量。', muscles: '训练关注：落地减速后重新组织重心，并依据第二球改变启动方向。', check: '在来球和站位允许时，对手触球前已进入下一拍准备。', refs: ['lowerLimb', 'bwf'] },
    ],
  },
  {
    number: '02', label: '躯干与肩带协同', title: '让躯干为拍臂保留空间', goal: '研究观察到躯干旋转、活动范围与杀球表现有关；另有研究在精英选手的上肢肌群中观察到协同活动。这一阶段不要求把躯干转到最大，而是练习转向后上肢仍能自由工作。', image: 'training-rotation.png', imageAlt: '羽毛球场上以宽站姿双手持药球进行躯干旋转准备的教学示意', visualLabel: '身体朝向 · 躯干 · 肩带', visualCue: '不是把腰拧到最大，而是让转向不挤掉挥拍空间。', refs: ['xfactor', 'synergy'],
    modules: [
      { phase: '交错站姿 · 旋转投掷', exercise: '用轻药球做侧向旋转投掷，强调快速出手和稳定回收；左右侧都练。', dose: '本站起始模板：4 组 × 3 次/侧；每次追求速度，组间充分休息。', muscles: '训练关注：髋与躯干改变朝向的协调，以及旋转后的回收控制。', check: '球速快但脚下不乱，腰椎没有被迫拧到终点。', refs: ['xfactor', 'synergy'] },
      { phase: '躯干 · 肩带协同', exercise: '交错站姿轻阻力 lift / chop，随后做一次无阻力半挥拍；它是协调练习，不是杀球动作的唯一模板。', dose: '本站起始模板：3 组 × 5 次/侧；阻力只要能保持肩带平顺移动。', muscles: '训练关注：躯干、肩带与上肢在低负荷下的协调，不把某一块肌肉视为单独动力源。', check: '转向后手臂仍有空间，肩不耸，头部不被动作明显带走。', refs: ['xfactor', 'upperSynergy'] },
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

type MuscleEvidenceLevel = 'direct' | 'partial' | 'inference';

type MuscleTechnique = {
  number: string;
  name: string;
  context: string;
  muscles: string;
  transfer: string;
  footwork: string;
  evidence: string;
  level: MuscleEvidenceLevel;
  refs: ReferenceKey[];
};

type MuscleFamily = {
  id: string;
  number: string;
  label: string;
  title: string;
  summary: string;
  route: string[];
  footwork: string;
  refs: ReferenceKey[];
  techniques: MuscleTechnique[];
};

const muscleFamilies: MuscleFamily[] = [
  {
    id: 'forehand',
    number: '01',
    label: '正手技术',
    title: '同一套过顶准备，按出球任务重新分配速度与制动。',
    summary: '正手杀球的上肢肌肉协同已有直接研究；高远球、吊球和抽球有部分运动学或小样本肌电资料。其余项目按相邻技术、关节任务与场上条件谨慎转译，不把肌肉名单写成固定启动顺序。',
    route: ['脚下定位与制动', '髋与躯干改变朝向', '肩胛稳定并允许肩运动', '肘与前臂调整拍速', '手指与握拍控制拍面'],
    footwork: '后场技术先用分腿垫步、并步/交叉步和最后一步争取窗口；平抽挡更依赖短距离侧向启动。股四头肌参与承载与伸膝，腘绳肌参与减速和膝部控制，臀肌参与髋部与骨盆控制；具体左右差异会随移动方向变化。',
    refs: ['synergy', 'strokeMotion', 'strokeEmgPilot', 'lungeEmg'],
    techniques: [
      { number: '01', name: '杀球', context: '较高拍头速度的过顶下压；准备、加速、碰撞后制动与落地都属于动作。', muscles: '肩胛与肩带：斜方肌、前锯肌、肩袖；肩与上臂：胸大肌、背阔肌、三角肌、肱三头肌，并由肱二头肌等参与控制；前臂旋前肌群与握拍/指屈肌群调节拍头和拍面。下肢与躯干肌群负责位置、朝向、支撑和落地，不应被解释成“把力直接送到手腕”。', transfer: '支撑改变身体状态，躯干与肩胛为上肢保留运动空间；肩、肘、前臂和握拍在时间上重叠加速，触球后由拮抗肌和肩胛稳定肌共同制动。', footwork: '到位后可站立、剪式或起跳击球；臀肌、股四头肌和小腿肌群参与起跳/支撑，腘绳肌与髋膝踝肌群共同处理落地和再启动。', evidence: '直接研究较多，但没有统一单肌肉排名', level: 'direct', refs: ['synergy', 'upperSynergy', 'shoulder', 'jumpSmash'] },
      { number: '02', name: '高远球', context: '用较高弧线和足够长度把球送至后场；动作外观可与杀球保持相似准备。', muscles: '沿用过顶击球的肩胛—肩—肘—前臂网络：斜方肌、前锯肌与肩袖稳定肩胛和肱骨；胸大肌、背阔肌、三角肌和肱三头肌参与挥拍；前臂旋前与握拍肌群完成末端控制。', transfer: '不是把每个环节都做到最大，而是在较完整窗口中让身体朝向、上肢加速和拍面控制连续发生；出球高度和长度来自整套动作与碰撞结果。', footwork: '后场到位和回位通常比“手上更用力”更先决定能否打到底线；最后一步要既能制动，也能让击球后恢复移动。', evidence: '动作学直接，肌肉分工主要为相邻任务推断', level: 'partial', refs: ['strokeMotion', 'strokeEmgPilot', 'bwf', 'lowerLimb'] },
      { number: '03', name: '吊球', context: '过顶准备下改变拍头状态、拍面与碰撞，使球短落；不是单纯“少用力”。', muscles: '仍需要肩胛稳定肌、肩袖、三角肌、肱二/三头肌及前臂屈伸和旋转肌群；与杀球相比，重点转向对拍头速度的及时调节、制动和拍面精细控制，而非追求最大加速。', transfer: '身体与上肢提供相似准备，末端肌群和拮抗肌共同限制多余速度；切吊时前臂旋转和握拍变化还会改变拍面运动方向。', footwork: '先争取与高远/杀球相近的到位条件，才容易保持出手隐蔽；击球后重心仍须可回收。', evidence: '运动学直接；肌肉制动属于功能性转译', level: 'partial', refs: ['strokeMotion', 'strokeEmgPilot', 'bwf'] },
      { number: '04', name: '抽球', context: '中前场或中场的平快球，准备短、时间压缩，通常不需要完整过顶链。', muscles: '臀中肌、臀大肌和股四头肌帮助侧向支撑；腹斜肌群与竖脊肌稳定躯干；胸大肌、三角肌、肱二/三头肌与前臂旋前/旋后肌群共同完成短幅加速和快速回收，手指屈肌调节握拍。', transfer: '脚下和躯干先稳定击球平台，上肢在较短距离内完成加速—碰撞—回收；不应用大幅摆臂牺牲下一拍。', footwork: '分腿垫步后用小范围侧向蹬跨；外侧臀肌控制骨盆，股四头肌承载，腘绳肌参与制动，击球后立即回到球拍在前的准备位。', evidence: '仅有小样本肌电；按平快任务谨慎转译', level: 'partial', refs: ['strokeEmgPilot', 'lungeEmg', 'bwf'] },
      { number: '05', name: '挡球', context: '借来球速度完成短幅阻挡或改向，核心是拍面稳定与及时回收。', muscles: '肩袖、斜方肌和前锯肌稳定肩带；肱二/三头肌共同控制肘位；前臂旋转肌、腕屈伸肌和手指肌群微调拍面。此时“共同收缩保持稳定”可能比某块肌肉主动加速更重要。', transfer: '脚下把身体送到可控距离，上肢提供稳定平台，拍面和握拍吸收或重新定向来球动量；幅度越小越需要时机而非僵硬。', footwork: '短侧移或小弓步后先减速，再回收；髋外展肌、股四头肌和腘绳肌共同控制侧向承载。', evidence: '缺少该动作的直接肌电，属于任务推断', level: 'inference', refs: ['lungeEmg', 'bwf', 'emgLimits'] },
      { number: '06', name: '被动回球', context: '“被动”不是单一技术；这里指来球挤压时间和空间、需要伸展或晚点击球的正手回球。', muscles: '下肢减速与跨步肌群承担快速到位；臀肌和躯干稳定肌限制失衡；肩胛稳定肌、肩袖、肘屈伸肌和前臂/握拍肌群在较差位置下维持拍面，不宜再追求最大幅度。', transfer: '先把身体带到仍能碰到球的位置，再以较短上肢动作完成可控出球；目标是恢复时间或站位，而不是证明“还能发全力”。', footwork: '常见为跨步、侧弓步或后场追球后的单脚承载；股四头肌承担较多膝伸展任务，腘绳肌与臀肌参与制动和骨盆控制。', evidence: '下肢证据较直接，上肢为情境推断', level: 'inference', refs: ['lungeReview', 'lungeEmg', 'bwf'] },
    ],
  },
  {
    id: 'backhand',
    number: '02',
    label: '反手技术',
    title: '反手不是正手镜像；肩胛、肘与前臂的任务会重新组合。',
    summary: '反手过顶杀、高远、吊已有少量运动学资料，反手高远也有小样本肌电研究；证据仍远少于正手杀球。这里重点描述肩胛稳定、肘伸与前臂旋后/握拍控制的协同，不把“拇指发力”写成单一动力来源。',
    route: ['脚下转向并争取身侧窗口', '躯干稳定或回转', '肩胛为上臂留空间', '肘伸与前臂旋后', '拇指与手指控制拍面'],
    footwork: '后场反手常需要转身、交叉步或并步进入；中场反手抽挡和被动防守多用交叉或侧向弓步。下肢仍承担定位、制动和再启动，但左右肌肉贡献会随反手侧方向和步法改变。',
    refs: ['backhandMotion', 'backhandClear', 'strokeEmgPilot', 'lungeEmg'],
    techniques: [
      { number: '01', name: '反手杀球', context: '后场反手过顶下压；可用窗口和可用活动范围通常比正手更受限制。', muscles: '斜方肌、前锯肌与肩袖稳定肩胛和肩关节；三角肌后束等帮助组织上臂；肱三头肌参与肘伸，旋后肌与肱二头肌参与前臂旋后，腕/指肌群控制握拍和拍面。躯干与髋部帮助转向和保持平衡。', transfer: '转身到位后，肩胛和上臂先建立可用空间，肘伸、前臂旋后与握拍在短时窗内重叠；随挥由肩袖和肘部拮抗肌控制。', footwork: '后场转身后必须保留回位路径；若击球点已过身后，优先选择恢复时间的回球，不应靠腰椎过伸和抡臂补偿。', evidence: '少量运动学；具体肌肉分工多为任务推断', level: 'partial', refs: ['backhandMotion', 'bwf', 'emgLimits'] },
      { number: '02', name: '反手高远球', context: '在反手过顶位置把球送深；完整性依赖到位、触球高度与末端拍速。', muscles: '现有小样本研究涉及斜方肌、三角肌、肱二/三头肌以及腕屈伸肌；教学上还应把肩袖和前锯肌视为肩胛/肩关节稳定系统。肘伸、前臂旋后和手指握拍共同影响拍头。', transfer: '身体转向提供空间，肩胛与上臂维持击球臂位置，肘伸—前臂旋后—握拍共同形成末端速度；这不是只靠拇指顶出去。', footwork: '尽早转身并让身体到球的侧后方；后场蹬跨和落地时由臀肌、股四头肌、腘绳肌与小腿肌群共同处理重心。', evidence: '有小样本运动学与肌电，仍不足以建立统一时序', level: 'direct', refs: ['backhandClear', 'backhandMotion', 'bwf'] },
      { number: '03', name: '反手吊球', context: '以反手过顶准备完成较短落点；重点是相似准备下的速度与拍面调节。', muscles: '肩胛稳定肌、肩袖、三角肌、肱二/三头肌和前臂旋后/腕指肌群都参与；相较高远与杀球，拮抗肌制动和握拍控制的重要性上升，不能理解成完全不发力。', transfer: '上臂与肘部维持相似准备，前臂和握拍在接触前改变速度与拍面；身体保持可回收，避免以大幅侧弯换取触球。', footwork: '尽量用与反手高远相近的到位与准备减少预判线索，击球后用交叉/并步回到可守位置。', evidence: '动作学少量，肌肉分工为功能性转译', level: 'partial', refs: ['backhandMotion', 'backhandClear', 'bwf'] },
      { number: '04', name: '反手抽球', context: '身体一侧的短幅平快回击，常在来球速度高、准备时间短时使用。', muscles: '臀中肌、股四头肌与躯干稳定肌建立侧向平台；肩胛稳定肌和三角肌控制上臂；肱三头肌、旋后肌/肱二头肌及拇指—手指握拍肌群共同完成短幅加速和拍面控制。', transfer: '侧向支撑减少身体漂移，上肢在身体前侧用短幅肘伸、前臂旋后和握拍完成碰撞；随后立即回收球拍。', footwork: '分腿垫步后以交叉或侧向一步到位；外侧髋稳定、膝踝制动，避免身体继续横向冲出击球窗口。', evidence: '仅有先导肌电与相邻技术证据', level: 'partial', refs: ['strokeEmgPilot', 'lungeEmg', 'bwf'] },
      { number: '05', name: '反手挡球', context: '用较小动作阻挡、卸力或改向；常见于平抽挡和防守。', muscles: '肩袖与肩胛稳定肌维持拍臂位置；肱二/三头肌共同控制肘；前臂旋后/旋前肌、腕屈伸肌和拇指—手指肌群对拍面做小幅调整。主要任务是稳定和定向，不是最大加速。', transfer: '脚下将身体带到球后，上肢形成稳定但不僵硬的拍面；来球动量由拍面方向、握拍顺应性与短促回送共同处理。', footwork: '小交叉步、侧弓步或原地防守都可能出现；下肢负责降低重心、制动并为下一球保留启动方向。', evidence: '直接研究不足，属于任务推断', level: 'inference', refs: ['lungeEmg', 'bwf', 'emgLimits'] },
      { number: '06', name: '反手被动回球', context: '来球进入身体侧后方或挤压时间时的救球；不是一种固定标准动作。', muscles: '股四头肌、臀肌、腘绳肌和小腿肌群处理跨步与急停；腹斜肌与竖脊肌控制躯干；肩胛稳定肌、肩袖、肘屈伸肌及前臂/握拍肌群在伸展位置维持拍面。', transfer: '优先让脚下和躯干把拍面送到球旁，再以有限的肘、前臂和手指动作完成高远、挡或过渡；不要把被动球强行做成完整反手杀。', footwork: '反手侧交叉弓步和后场转身可能造成较高的单侧承载；减速、足踝稳定和击球后第一步回收比“站定发力”更重要。', evidence: '步法研究较直接，上肢为情境推断', level: 'inference', refs: ['lungeReview', 'lungeEmg', 'injuryReview'] },
    ],
  },
  {
    id: 'net',
    number: '03',
    label: '网前技术',
    title: '网前不是只动手指；先用弓步稳定距离，再让拍面做小动作。',
    summary: '网前正手动作有精英运动学研究，前向弓步也有较多下肢力学和肌电资料。不同搓、切和挑球方向会改变前臂旋转与腕部运动，因此这里不规定一个适用于正反手和所有旋转方向的“固定搓法”。',
    route: ['分腿垫步与前向启动', '弓步制动并控制骨盆', '肩胛稳定伸拍距离', '前臂与腕改变拍面', '手指调节握拍并快速回收'],
    footwork: '网前弓步常呈现较高的股四头肌相对贡献；腘绳肌参与制动和膝稳定，臀肌参与髋与骨盆控制。前脚承载之后仍要能蹬离地面，而不是把膝盖停在最深位置。',
    refs: ['netMotion', 'lungeReview', 'lungeEmg', 'bwf'],
    techniques: [
      { number: '01', name: '搓球', context: '在网前以短小拍面运动制造翻滚或贴网落点；正反手和旋转方向并非同一动作。', muscles: '股四头肌、腘绳肌、臀肌和小腿肌群完成弓步承载与退出；斜方肌、前锯肌与肩袖稳定伸出的上肢；旋前/旋后肌、腕屈伸肌和手指肌群调节拍面。', transfer: '脚下先稳定身体与球的距离，肩胛和肘保持伸拍平台，前臂、腕与手指只做完成旋转所需的小幅动作；切向方向取决于持拍侧与目标旋转。', footwork: '分腿垫步后前向弓步，落地阶段股四头肌承载，腘绳肌与臀肌共同减速；触球后用前脚蹬离并回收后脚。', evidence: '网前运动学与弓步证据较直接，单肌肉推断有限', level: 'partial', refs: ['netMotion', 'lungeReview', 'lungeEmg'] },
      { number: '02', name: '切球', context: '这里指网前以切向拍面做直线或对角改向；不是后场切吊。', muscles: '下肢与躯干稳定肌先控制弓步；肩胛稳定肌和三角肌维持击球臂；前臂旋前/旋后肌、腕部尺桡偏肌群及手指肌群根据切向方向改变拍面。', transfer: '身体不能继续冲过触球点；稳定的伸拍距离让前臂和握拍完成小幅切向运动。研究显示不同网前球的肩内旋、前臂旋转和腕部角速度并不相同。', footwork: '对角切送可能需要更靠近身体中线的触球与更明显的躯干调整；仍应保持前膝和足部可控，并给蹬回留空间。', evidence: '正手网前运动学直接；肌肉归属为关节任务转译', level: 'partial', refs: ['netMotion', 'lungeReview', 'bwf'] },
      { number: '03', name: '挑球', context: '从网前把球送高、送深；正手挑与反手挑的前臂方向不同。', muscles: '弓步腿的股四头肌、臀肌、腘绳肌和小腿肌群支持承载与蹬回；肩胛稳定肌维持伸拍。正手挑更多使用前臂旋前与腕部伸直，反手挑更多使用肘伸、前臂旋后和拇指/手指握拍协同。', transfer: '先用脚下保持球在身体前侧，再由肩胛—肘—前臂—握拍完成短促向上的拍头运动；高度和长度来自触球位置、拍面与速度共同作用，不是只靠手腕。', footwork: '前向弓步后要能从前脚蹬回；弓步过长会增加膝踝负荷并压缩手上空间，不能把“跨得更远”当成更有力。', evidence: 'BWF 技术资料直接；下肢肌电与力学证据较直接', level: 'direct', refs: ['bwf', 'lungeReview', 'lungeEmg'] },
    ],
  },
];

const navItems = [
  { id: 'principles', label: '先判断' },
  { id: 'force-path', label: '动作任务' },
  { id: 'muscle-map', label: '肌肉协同' },
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
      <div className="study-plate-footer"><span>生成图 · 只提示空间关系，不作动作角度证据</span><strong>{footer}</strong></div>
    </div>
  );
}

function SmashVisual() {
  return (
    <div className="mechanics-plate hero-visual">
      <img src="smash-hero.png" alt="右手羽毛球运动员处于后场过顶击球过程中的身体位置教学示意，不代表固定击球时刻" />
      <div className="hero-visual-shade" aria-hidden="true" />
      <div className="plate-meta"><span>教学示意 / 01</span><span>右手杀球</span></div>
      <div className="visual-label visual-label-base"><i aria-hidden="true" /><div><b>01 / 击球窗口</b><strong>争取在身体前上方触球</strong><small>这是技术目标，不是固定坐标<br />是否做到取决于来球和到位质量</small></div></div>
      <div className="visual-label visual-label-rotation"><i aria-hidden="true" /><div><b>02 / 身体定向</b><strong>让身体朝向服务击球位置</strong><small>躯干不同部分的相对运动可能保留上肢空间<br />不要求每球达到同一幅度</small></div></div>
      <div className="visual-label visual-label-release"><i aria-hidden="true" /><div><b>03 / 上肢加速</b><strong>观察肩、肘、前臂的协同加速</strong><small>研究支持多关节协同<br />不支持用孤立甩腕解释拍速</small></div></div>
      <div className="visual-label visual-label-recovery"><i aria-hidden="true" /><div><b>04 / 落地衔接</b><strong>恢复到便于处理下一球的位置</strong><small>落地方式随击球和站位变化<br />目标是保留调整与移动选择</small></div></div>
      <div className="plate-footer"><span>生成图 · 教学示意，不是实测数据</span><strong>位置 → 组织 → 加速 → 碰撞与回位</strong></div>
    </div>
  );
}

function SequenceArrowOverlay() {
  return (
    <svg className="sequence-arrow-overlay" viewBox="0 0 1774 887" aria-hidden="true" focusable="false">
      <defs>
        <marker id="sequence-arrow-coral" markerWidth="13" markerHeight="13" viewBox="0 0 13 13" refX="10.5" refY="6.5" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M0,0 L13,6.5 L0,13 Z" />
        </marker>
        <marker id="sequence-arrow-mint" markerWidth="13" markerHeight="13" viewBox="0 0 13 13" refX="10.5" refY="6.5" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M0,0 L13,6.5 L0,13 Z" />
        </marker>
        <marker id="sequence-arrow-gold" markerWidth="13" markerHeight="13" viewBox="0 0 13 13" refX="10.5" refY="6.5" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M0,0 L13,6.5 L0,13 Z" />
        </marker>
      </defs>
      <path className="sequence-arrow sequence-arrow-brake" d="M 370 790 C 305 792 235 770 165 700" markerEnd="url(#sequence-arrow-coral)" />
      <path className="sequence-arrow sequence-arrow-organise" d="M 505 640 C 555 700 650 720 715 660" markerEnd="url(#sequence-arrow-mint)" />
      <path className="sequence-arrow sequence-arrow-accelerate" d="M 1035 505 C 1100 450 1170 345 1230 225" markerEnd="url(#sequence-arrow-coral)" />
      <path className="sequence-arrow sequence-arrow-recover" d="M 1690 225 C 1680 390 1610 610 1535 780" markerEnd="url(#sequence-arrow-gold)" />
    </svg>
  );
}

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeNode, setActiveNode] = useState(0);
  const [activeMuscleFamily, setActiveMuscleFamily] = useState(0);
  const [activeTraining, setActiveTraining] = useState(0);
  const [activeSection, setActiveSection] = useState('top');
  const step = lessonSteps[activeStep];
  const node = forceNodes[activeNode];
  const muscleFamily = muscleFamilies[activeMuscleFamily];
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
        <span className="header-index">15 / 技术</span>
      </header>

      <section id="top" className="force-hero force-section">
        <div className="hero-copy">
          <span className="eyebrow">进阶发力技术</span>
          <span className="hero-scope">适用范围：右手持拍 · 后场正手过顶击球 / 杀球</span>
          <h1>先争窗口<br /><em>再争拍速</em></h1>
          <p>先用步法和身体位置争取在身体前上方、持拍肩前方触球。<InlineReferences refs={['lowerLimb', 'jumpSmash', 'bwf']} /> 在可用的时间和空间内，躯干与上肢协同参与拍头运动。<InlineReferences refs={['xfactor', 'synergy', 'shoulder']} /> 拍头状态、拍面取向和触球位置共同影响出球结果；杀球通常追求向下，但具体轨迹取决于来球、击球位置、拍面运动和球拍参数。<InlineReferences refs={['impact', 'racket']} /></p>
          <div className="hero-question"><span>高水平决策先问</span><strong>来球条件允许身前、上方触球吗？触球前还有可用空间吗？击球后还能准备下一拍吗？</strong></div>
          <div className="hero-ramp"><span>读图路径</span><strong>先争取位置，再组织挥拍，最后检查碰撞和回位</strong><div><b>位置</b><i>→</i><b>组织</b><i>→</i><b>加速</b><i>→</i><b>碰撞与回位</b></div></div>
          <div className="evidence-key" aria-label="页面结论类型"><span><b>研究发现</b>论文直接观察</span><span><b>教学转译</b>把研究变成观察线索</span><span><b>本站模板</b>可调整的训练起点</span></div>
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
                <img src="principles-sequence-board-v4.png" alt="同一右手持拍运动员四个观察任务的羽毛球过顶击球教学示意：移动制动、身体组织、触球前加速、碰撞与恢复" />
                <SequenceArrowOverlay />
                <figcaption>生成图 · 教学示意 · 同一视角的四个观察任务（非实测序列）</figcaption>
              </figure>
              <div className="sequence-step-grid">
                {principleSequence.map((item) => <article className="sequence-step" key={item.number}><div className="sequence-step-head"><b>{item.number}</b><span>{item.label}</span></div><h3>{item.title}</h3><p>{item.text}<InlineReferences refs={item.refs} /></p></article>)}
              </div>
            </div>
            <div className="visual-reading-note"><span>按任务看，不要背固定顺序</span><strong>这不是四张必须复制的姿势图，而是一拍动作中相互重叠的任务。</strong><p>移动、身体组织、上肢加速和碰撞可以分开观察，但真实动作存在时间重叠；来球、步法和击球类型都会改变它们的相对时序。<InlineReferences refs={['lowerLimb', 'xfactor', 'synergy', 'impact']} /></p><div><b>图像读法</b><span>位置条件 → 身体组织 → 上肢加速 → 碰撞与回位</span></div></div>
          </div>
          <div className="principle-line"><span>本站决策模型</span><strong>如果来球允许在身前、上方稳定触球，且击球后仍有回位条件，可考虑完整杀球；时间或位置被压缩时，可选择较短准备的下压球；如果触球窗口已丢失，则优先选择能恢复时间和位置的过渡球。</strong><InlineReferences refs={['bwf', 'impact']} /></div>
          <div className="shot-choice">
            <div className="shot-choice-head"><span>本站分类 · 非统一科研术语</span><strong>每次出手先服从来球条件，再追求拍速。</strong></div>
            <div className="shot-choice-grid">
              <article><figure className="shot-choice-figure"><img src="shot-full-smash-v2.png" alt="右手持拍运动员在完整正手过顶杀球前的准备：身体自然侧向、右肘抬起、左臂协助定位，球在持拍肩前上方" /><div><b>01</b><span>完整窗口</span></div><figcaption>准备较完整 · 身前上方</figcaption></figure><h3>完整杀球</h3><p><span>窗口</span>来球条件允许在持拍肩前方、上方触球，不需要明显后仰去补偿位置，击球后仍有机会回位。</p><p><span>目标</span>用拍头速度、方向或落点施压；是否直接得分取决于击球质量和对手位置。<InlineReferences refs={['bwf', 'impact']} /></p></article>
              <article><figure className="shot-choice-figure"><img src="shot-half-smash-v2.png" alt="右手持拍运动员以较正对球场的身体朝向和较短的过顶引拍准备点杀或半杀，双脚保持落地平衡" /><div><b>02</b><span>窗口压缩</span></div><figcaption>非完全侧身 · 较短准备</figcaption></figure><h3>点杀 · 半杀</h3><p><span>窗口</span>仍能在身前、上方触球，但时间或空间有限，身体不必完全侧身，引拍也不必完全展开；触球点可以仍在身前，但通常不会像完整杀球那样追求更靠前，不以固定距离定义。</p><p><span>目标</span>在保留控制和回位可能的前提下完成下压或变速。这是本站的条件性教学分类，不是论文建立的标准分类。<InlineReferences refs={['bwf', 'impact']} /></p></article>
              <article><figure className="shot-choice-figure"><img src="shot-transition-v2.png" alt="右手持拍运动员在来球已经越过理想击球窗口时向身体后上方伸拍，准备以开放拍面完成可控过渡回球" /><div><b>03</b><span>窗口偏后</span></div><figcaption>不硬杀 · 先恢复时间</figcaption></figure><h3>先过渡</h3><p><span>窗口</span>如果击球窗口已经明显偏到身体后方，继续追求完整杀球往往会牺牲控制；这表示当前条件通常不适合硬杀。</p><p><span>目标</span>优先考虑能让自己重新获得时间和站位的选择，例如高远或其他可控回球；具体出手取决于来球、对手位置和自己的拍面控制。此处为本站决策框架。<InlineReferences refs={['bwf']} /></p></article>
            </div>
            <p className="shot-choice-disclaimer">三张生成图只比较“窗口与准备条件”，不是标准动作照片，也不用于规定固定关节角度。完整杀球、点杀/半杀和过渡球是本站的条件性教学分类。</p>
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

      <section id="muscle-map" className="muscle-map-section force-section">
        <div className="section-heading"><div><span className="section-label">技术 × 肌肉协同</span><h2>不是找一块主力肌，<br /><em>而是看任务如何重排。</em></h2></div><span className="section-index">15 项技术 · 不配姿势图</span></div>
        <div className="muscle-method">
          <div className="muscle-method-lead"><span>先校正“主动用力”</span><strong>肌肉不只负责加速，也负责稳定、制动与重新获得下一步。</strong><p>表面肌电记录的是电活动，不能在动态动作中直接换算成肌肉拉力；没有被电极测到的深层肌，也不能因此被视为没有工作。所以下面的“重点肌群”用于理解任务和安排训练，不是用酸胀感判断动作对错。<InlineReferences refs={['emgLimits', 'synergy']} /></p></div>
          <div className="muscle-role-grid" aria-label="肌肉在技术中的三类任务"><article><b>01 / 驱动</b><strong>改变速度</strong><p>让身体段或球拍产生角速度与线速度。</p></article><article><b>02 / 稳定</b><strong>保留路径</strong><p>让关节和拍面在高速中维持可控方向。</p></article><article><b>03 / 制动</b><strong>结束并衔接</strong><p>吸收动量、回收球拍，并为下一步重新组织。</p></article></div>
        </div>

        <div className="muscle-family-tabs" role="tablist" aria-label="选择技术类别">
          {muscleFamilies.map((family, index) => <button id={`muscle-tab-${family.id}`} key={family.id} className={activeMuscleFamily === index ? 'active' : ''} onClick={() => setActiveMuscleFamily(index)} role="tab" aria-selected={activeMuscleFamily === index} aria-controls="muscle-family-panel"><b>{family.number}</b><strong>{family.label}</strong><span>{family.techniques.length.toString().padStart(2, '0')} 项技术</span></button>)}
        </div>

        <div id="muscle-family-panel" className="muscle-family-panel" role="tabpanel" tabIndex={0} aria-labelledby={`muscle-tab-${muscleFamily.id}`}>
          <div className="muscle-family-summary"><div><span>当前类别 · {muscleFamily.number}</span><h3>{muscleFamily.title}</h3><p>{muscleFamily.summary}<InlineReferences refs={muscleFamily.refs} /></p></div><aside><span>步伐底座</span><p>{muscleFamily.footwork}</p></aside></div>
          <div className="muscle-route" aria-label={`${muscleFamily.label}的任务路径`}><span>任务路径</span><div>{muscleFamily.route.map((item, index) => <span key={item}><b>{(index + 1).toString().padStart(2, '0')}</b>{item}{index < muscleFamily.route.length - 1 && <i aria-hidden="true">→</i>}</span>)}</div></div>
          <div className="muscle-technique-grid">
            {muscleFamily.techniques.map((technique) => <article className="muscle-technique-card" key={technique.number}>
              <div className="muscle-technique-head"><span>{muscleFamily.number}.{technique.number}</span><b className={`evidence-level evidence-${technique.level}`}>{technique.evidence}</b></div>
              <h3>{technique.name}</h3>
              <p className="muscle-technique-context">{technique.context}</p>
              <div className="muscle-technique-body"><div><span>重点肌群 · 驱动与稳定</span><p>{technique.muscles}</p></div><div><span>力如何贯穿</span><p>{technique.transfer}</p></div><div><span>步伐如何配合</span><p>{technique.footwork}</p></div></div>
              <div className="reference-row"><span>证据与边界</span><InlineReferences refs={technique.refs} /></div>
            </article>)}
          </div>
        </div>
        <p className="muscle-boundary-note"><b>阅读边界</b> “杀、高远、吊、抽、挡、被动”是教学与比赛语境中的任务分类；不同持拍法、击球点、步法和战术会改变肌肉活动。带有“任务推断”的卡片明确表示目前没有足够的该技术直接肌电证据，不能用来诊断个人动作或开具单肌肉训练处方。</p>
      </section>

      <section id="training" className="training-section force-section">
        <div className="section-heading"><div><span className="section-label">训练瓶颈</span><h2>训练不追疲劳，<br /><em>只追可转化。</em></h2></div><span className="section-index">03 个训练阶段</span></div>
        <div className="training-statement"><span>本站训练原则</span><strong>先用球场结果定位瓶颈：到位不稳、旋转空间不足、拍速不够、碰撞不净或第二拍掉速。训练只补一个短板；肌肉名称只作功能聚焦，最后必须回到真实击球验收。这是本站的训练组织方法，不是某一篇论文给出的完整处方。训练剂量只作为本站可调整的起始模板，不是研究直接验证的固定处方。</strong><div className="reference-row"><span>相关证据</span><InlineReferences refs={['synergy', 'plyometric', 'impact']} /></div></div>
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
            <div className="training-rules"><div><b>01</b><strong>先有球场指标</strong><p>窗口 · 目标 · 第二拍。</p></div><div><b>02</b><strong>高质量再加量</strong><p>动作质量下降，就结束这一组。</p></div><div><b>03</b><strong>负荷不改动作</strong><p>离场训练，回场验收。</p></div></div>
          </div>
          <div id="training-panel" className="training-reading" role="tabpanel" tabIndex={0} aria-labelledby={`training-tab-${trainingStage.number}`}>
            <div className="training-reading-top"><span className="section-label">本站训练模板 · {trainingStage.number}</span><b>回场验收 · {trainingStage.label}</b></div>
            <h3>{trainingStage.title}</h3>
            <div className="training-goal"><span>本阶段目标</span><p>{trainingStage.goal}<InlineReferences refs={trainingStage.refs} /></p></div>
            <div className="training-module-list">
              {trainingStage.modules.map((module) => <article className="training-module" key={module.phase}><div className="training-module-head"><strong>{module.phase}</strong></div><div><span>训练任务</span><p>{module.exercise}</p></div><div><span>本站起始剂量</span><p>{module.dose}</p></div><div><span>训练关注</span><p>{module.muscles}</p></div><div><span>回场标准</span><p>{module.check}</p></div><div className="reference-row"><span>相关能力与结果</span><InlineReferences refs={module.refs} /></div></article>)}
            </div>
          </div>
        </div>
        <p className="training-note">增强式训练在现有羽毛球研究中可能改善爆发力、敏捷、速度和平衡，但研究数量有限，证据确定性为低或极低；它不能被直接等同于杀球变快。2026 年一项系统综述纳入 11 项前瞻性研究，提示弓步、落地与肩部部分指标与伤病风险相关；这支持个体化筛查和控制训练，却不能让网页图片承担诊断功能。本站不用某块肌肉的酸胀判断技术正确；疼痛、麻木或明显不稳时停止，并寻求专业评估。<InlineReferences refs={['plyometric', 'injuryReview']} /></p>
        <div className="training-sources"><span>训练证据</span><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12170632/" target="_blank" rel="noreferrer">2025 / 肌肉协同 ↗</a><a href="https://pubmed.ncbi.nlm.nih.gov/38533062/" target="_blank" rel="noreferrer">2024 / 增强式训练综述 ↗</a><a href="https://pubmed.ncbi.nlm.nih.gov/33663330/" target="_blank" rel="noreferrer">2021 / 精英跳杀决定因素 ↗</a></div>
      </section>

      <section id="lesson" className="lesson-section force-section">
        <div className="section-heading"><div><span className="section-label">上场验收</span><h2>更快之后，<br /><em>结果不能塌。</em></h2></div><span className="section-index">4 个结果 · 1 组球</span></div>
        <div className="lesson-intro"><p>本站在尽量统一喂球条件下，用一组真实回合观察四项结果：击球窗口、拍头速度变化线索、触球位置与出球方向、下一拍准备。拍头速度只有在具备测速或高帧率视频时才作为正式测量；肉眼只能判断变化趋势。一项 7 人、1000 Hz 捕捉与有限元研究估计拍—球接触约 3 ms，因此下方生成图刻意展示“碰撞后已经分离”的关系，不冒充真实触球帧。关于拍头速度和触球位置的研究只能帮助理解其中部分结果；下一拍准备是本站的场上验收指标。<InlineReferences refs={['jumpSmash', 'impact', 'collision']} /></p><strong>动作可以不同，关键结果应在相近条件下可观察、可比较、可重复。</strong></div>
        <div className="lesson-visual-layout">
          <StudyPlate src="impact-study-v2.png" alt="羽毛球完成碰撞后已经与拍面分离的教学示意；球托朝出球方向，画面不代表真实触球瞬间" meta="碰撞后关系 / 05" side="球已离开拍面" footer="稳定触球 → 可控出球 → 回到下一拍" markers={lessonMarkers} className="lesson-study-plate" />
          <div className="visual-reading-note lesson-result-note"><span>本章作用</span><strong>不评判姿势，只验收结果。</strong><p>触球位置与出球方向的关系有研究支持；下一拍准备则是本站的场上验收指标。动作可以因人而异，但关键结果应在相近条件下保持可观察、可比较、可重复。<InlineReferences refs={['impact']} /></p><div><b>验收顺序</b><span>击球窗口 → 拍速线索 → 稳定碰撞 → 下一拍选择</span></div><div className="lesson-result-legend"><span><b>01</b>窗口</span><span><b>02</b>拍速</span><span><b>03</b>碰撞</span><span><b>04</b>下一拍</span></div></div>
        </div>
        <div className="lesson-check-label"><span>现场检查</span><strong>点击一项，只看这一项是否仍然成立。</strong></div>
        <div className="phase-tabs" role="tablist" aria-label="上场验收的四项结果">
          {lessonSteps.map((item, index) => <button key={item.number} id={`step-tab-${item.number}`} className={activeStep === index ? 'phase-tab active' : 'phase-tab'} onClick={() => setActiveStep(index)} role="tab" aria-selected={activeStep === index} aria-controls="step-panel"><span>{item.number}</span><strong>{item.label}</strong></button>)}
        </div>
        <div id="step-panel" className="phase-reading" role="tabpanel" tabIndex={0} aria-labelledby={`step-tab-${step.number}`}>
          <div className="phase-main"><div className="phase-status"><span>当前检查</span><strong>{step.label}</strong></div><span className="section-label">观察问题</span><h3>{step.title}</h3><div className="phase-action"><span>关键观察</span><p>{step.action}<InlineReferences refs={step.refs} /></p></div><div className="phase-next"><span>失效后回到</span><strong>{step.next}</strong></div></div>
          <div className="phase-coach"><div className="coach-row"><span>合格表现</span><p>{step.cue}</p></div><div className="coach-row"><span>失效信号</span><p>{step.avoid}</p></div><div className="coach-row coach-drill"><span>现场验证</span><p>{step.drill}</p></div></div>
        </div>
        <div className="lesson-close"><span>本站回修原则</span><strong>先修最先丢掉的结果，再追求拍速。</strong><p>这不是动作评分，也不是判断谁是高手；它是训练后的结果验收。用结果约束动作，而不是复制某位顶级球员的一帧姿势。这个验收框架属于本站教学设计。</p><div><span>窗口丢失 → 到位与再启动</span><span>拍速线索不足 → 躯干与肩带协同后复测</span><span>碰撞控制丢失 → 拍速与碰撞阶段复测</span><span>下一拍丢失 → 到位与再启动</span></div></div>
      </section>

      <section id="boundary" className="boundary-section force-section">
        <div className="section-heading"><div><span className="section-label">证据边界</span><h2>科学能支持的，<br /><em>说到这里。</em></h2></div><span className="section-index">如实阅读</span></div>
        <div className="boundary-visual-layout">
          <StudyPlate src="evidence-study.png" alt="羽毛球拍、羽毛球和场地测量网格组成的证据边界教学示意" meta="证据边界 / 06" side="测量与边界" footer="观察 → 测量 → 解释 → 保留边界" markers={[]} className="boundary-study-plate" />
          <div className="visual-reading-note"><span>不要把模型当定律</span><strong>先区分观察到的结果，再解释身体机制。</strong><p>研究可以帮助我们知道哪些变量更接近击球结果，但不能替每个球员规定唯一姿势。专业性也包括知道结论在哪里停止。<InlineReferences refs={['synergy', 'xfactor', 'jumpSmash']} /></p><div><b>阅读层级</b><span>研究发现 · 生物力学解释 · 教练经验 · 个体差异</span></div></div>
        </div>
        <div className="boundary-grid"><article><span>可以说</span><h3>不同任务，有不同功能聚焦</h3><p>研究观察到的是多肌群协同。本站用下肢、躯干、肩带、肩肘前臂和握拍提示当前任务，但不把它们写成单肌肉开关。<InlineReferences refs={['synergy', 'upperSynergy']} /></p></article><article><span>不能说</span><h3>某块肌肉负责把力传到拍头</h3><p>“躯干是引擎、手臂只是鞭绳”可以作为纠正抡臂的比喻，却不能替代真实的肩、肘、前臂和手部协同，也不能据此下伤病结论。<InlineReferences refs={['shoulder', 'synergy']} /></p></article><article><span>本站验收框架</span><h3>用感觉引导，用结果验证</h3><p>主观聚焦帮助你组织动作；窗口、拍速线索、触球位置与出球方向、下一拍准备，用来判断这次发力是否真的转化。这是本站的教学框架，不是论文直接建立的评分量表。</p></article></div>
        <p className="reference-disclaimer">页面内的链接只支持其相邻文字中标明的研究事实；动作口令、击球分类、训练任务和剂量是本站基于证据的教学转译或实践模板，不代表论文逐字验证了每一句话。训练模块后的链接只说明相关能力或结果，不等于该练法本身已经被直接验证。BWF 手册属于教练教育资料，不等同于同行评审研究。页面中的生成图均为教学示意，只承担空间、任务和结果方向提示，不承担动作角度、时序或肌肉激活的证据功能。</p>
        <div className="source-strip"><span>主要来源</span><a href="https://www.badminton.org.au/wp-content/uploads/2022/11/1.-BWF-ST-Teachers-Manual_Inclusivity_ENGLISH.pdf" target="_blank" rel="noreferrer">教练手册 · 杀球 ↗</a><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12170632/" target="_blank" rel="noreferrer">肌肉协同研究 ↗</a><a href="https://pubmed.ncbi.nlm.nih.gov/33663330/" target="_blank" rel="noreferrer">精英跳杀研究 ↗</a><a href="https://doi.org/10.1080/02640414.2020.1792132" target="_blank" rel="noreferrer">触球位置研究 ↗</a><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC13038878/" target="_blank" rel="noreferrer">2026 · 碰撞时窗研究 ↗</a><a href="https://pubmed.ncbi.nlm.nih.gov/42217216/" target="_blank" rel="noreferrer">2026 · 伤病风险综述 ↗</a></div>
      </section>

      <footer className="force-footer"><span>力场 / 羽毛球发力实验室</span><strong>动作任务 · 结果验收</strong><span>证据复核 · 2026.08</span></footer>
    </main>
  );
}
