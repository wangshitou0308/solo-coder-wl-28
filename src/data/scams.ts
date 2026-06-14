export type ScamCategoryId =
  | "impersonate"
  | "money-trap"
  | "phishing"
  | "elderly"
  | "acquaintance";

export type ScamQuestionType =
  | "identify"
  | "judge"
  | "scenario"
  | "review";

export interface ScamCategory {
  id: ScamCategoryId;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export interface ScamDialogue {
  speaker: "scammer" | "victim";
  text: string;
}

export interface ScamOption {
  id: string;
  text: string;
}

export interface ScamQuestion {
  id: string;
  categoryId: ScamCategoryId;
  type: ScamQuestionType;
  scenario: string;
  dialogues: ScamDialogue[];
  question: string;
  options: ScamOption[];
  correctAnswer: string;
  explanation: string;
  mnemonic: string;
  difficulty: "easy" | "medium" | "hard";
  redWords?: string[];
}

export interface RedWordExercise {
  id: string;
  word: string;
  dangerLevel: "high" | "medium" | "warn";
  description: string;
  example: string;
  correctResponse: string;
}

export const scamCategories: ScamCategory[] = [
  {
    id: "impersonate",
    name: "冒充身份诈骗",
    icon: "user-x",
    color: "bg-red-500",
    description: "骗子冒充公检法、客服、领导等身份进行诈骗",
  },
  {
    id: "money-trap",
    name: "金钱诱导诈骗",
    icon: "coins",
    color: "bg-orange-500",
    description: "以中奖、高收益、退款等金钱诱惑进行诈骗",
  },
  {
    id: "phishing",
    name: "链接钓鱼诈骗",
    icon: "link-2-off",
    color: "bg-yellow-500",
    description: "通过虚假链接、二维码窃取信息或钱财",
  },
  {
    id: "elderly",
    name: "养老骗局",
    icon: "heart-handshake",
    color: "bg-purple-500",
    description: "专门针对老年人的养老服务、保健品等骗局",
  },
  {
    id: "acquaintance",
    name: "熟人诈骗",
    icon: "users",
    color: "bg-blue-500",
    description: "冒充子女、亲友、熟人借钱或求助",
  },
];

export const questionTypeLabels: Record<ScamQuestionType, string> = {
  identify: "识别题",
  judge: "判断题",
  scenario: "情景题",
  review: "复盘题",
};

export const redWordExercises: RedWordExercise[] = [
  {
    id: "rw-1",
    word: "安全账户",
    dangerLevel: "high",
    description: "骗子谎称资金需要转入'安全账户'核查，实际是骗钱",
    example: "'您涉嫌洗钱，请把钱转到我们的安全账户核查'",
    correctResponse: "立刻挂断电话！公检法从来没有'安全账户'，这100%是诈骗。",
  },
  {
    id: "rw-2",
    word: "验证码",
    dangerLevel: "high",
    description: "任何索要验证码的都是骗子，验证码是银行卡和账户的最后一道防线",
    example: "'把您收到的短信验证码告诉我，帮您核验身份'",
    correctResponse: "验证码绝对不能告诉任何人！连银行客服都不会要验证码。",
  },
  {
    id: "rw-3",
    word: "保证金",
    dangerLevel: "high",
    description: "以各种名义要求先交保证金、押金、手续费，都是骗局",
    example: "'要领取奖金需要先交5000元保证金'",
    correctResponse: "凡是让先交钱的都是骗子，真中奖不会让您先掏钱。",
  },
  {
    id: "rw-4",
    word: "高收益",
    dangerLevel: "high",
    description: "承诺年化收益超过10%的理财基本都是诈骗，高收益一定伴随高风险",
    example: "'我们这款养老理财年化25%，保本保息零风险'",
    correctResponse: "收益超过10%就要打问号，保本保息高收益全是骗子洗脑。",
  },
  {
    id: "rw-5",
    word: "别告诉家人",
    dangerLevel: "high",
    description: "骗子让您不要告诉子女和家人，就是怕被识破",
    example: "'这是秘密调查，千万别告诉家人，否则会影响案件进度'",
    correctResponse: "遇到大事一定要告诉子女！骗子最怕您和家人商量。",
  },
  {
    id: "rw-6",
    word: "屏幕共享",
    dangerLevel: "high",
    description: "骗子诱导您打开屏幕共享，从而看到您的密码和银行卡信息",
    example: "'请打开屏幕共享功能，我指导您操作一下'",
    correctResponse: "绝对不能开屏幕共享！一开对方就能看到您所有操作和密码。",
  },
];

export const scamQuestions: ScamQuestion[] = [
  {
    id: "scam-imp-1",
    categoryId: "impersonate",
    type: "identify",
    scenario: "冒充公检法诈骗",
    difficulty: "hard",
    redWords: ["安全账户"],
    dialogues: [
      { speaker: "scammer", text: "您好，我是北京市公安局的王警官，您的身份证号是1101011950xxxxxxx对吗？" },
      { speaker: "victim", text: "对，是我。请问有什么事吗？" },
      { speaker: "scammer", text: "我们查到您涉嫌一起洗钱案件，涉案金额高达200万。您现在必须配合调查，否则就要被通缉！" },
      { speaker: "victim", text: "什么？洗钱？我没有啊，这怎么可能！" },
      { speaker: "scammer", text: "是不是有人盗用了您的身份？为了证明您的清白，您需要把所有存款转到我们的'安全账户'进行核查。核查没问题后就会退还给您。" },
    ],
    question: "骗子在对话中使用了哪个典型的诈骗关键词？",
    options: [
      { id: "a", text: "涉案金额" },
      { id: "b", text: "安全账户" },
      { id: "c", text: "配合调查" },
      { id: "d", text: "盗用身份" },
    ],
    correctAnswer: "b",
    explanation: "公检法机关不会通过电话办案，更没有所谓的'安全账户'。凡是在电话里提到'安全账户'要求转账的，100%是诈骗。遇到这种情况，一定要挂断电话，告诉家人或者直接打110报警。",
    mnemonic: "公检法打电话，十有八九是诈骗；安全账户不存在，核实清楚最关键！",
  },
  {
    id: "scam-imp-2",
    categoryId: "impersonate",
    type: "judge",
    scenario: "冒充客服诈骗",
    difficulty: "easy",
    redWords: ["验证码"],
    dialogues: [
      { speaker: "scammer", text: "您好，我是淘宝客服。您上周买的商品有质量问题，我们要给您双倍退款。" },
      { speaker: "victim", text: "那怎么退款啊？" },
      { speaker: "scammer", text: "请您提供一下手机收到的短信验证码，我帮您办理退款手续。" },
    ],
    question: "客服要验证码的做法对吗？",
    options: [
      { id: "a", text: "对，退款需要验证码" },
      { id: "b", text: "不对，正规客服绝不会索要验证码" },
      { id: "c", text: "不确定，先给了再说" },
      { id: "d", text: "只给前几位数字应该没事" },
    ],
    correctAnswer: "b",
    explanation: "任何正规平台的客服都不会索要您的验证码。验证码是您账户安全的最后一道防线，告诉别人验证码就等于把银行卡密码告诉了对方。",
    mnemonic: "验证码是保命符，打死也不能告诉人；谁要验证码谁是骗，立刻挂断别多言！",
  },
  {
    id: "scam-imp-3",
    categoryId: "impersonate",
    type: "scenario",
    scenario: "冒充领导诈骗",
    difficulty: "medium",
    redWords: ["别告诉家人"],
    dialogues: [
      { speaker: "scammer", text: "老李啊，我是单位的王主任。你在单位吧？" },
      { speaker: "victim", text: "王主任您好！我在家呢，您有什么吩咐？" },
      { speaker: "scammer", text: "我这边有个急事，需要给一个合作方打款走个账，用你个人卡转一下，明天还你。" },
      { speaker: "victim", text: "好的主任，多少钱？我让我儿子帮我转。" },
      { speaker: "scammer", text: "别告诉家人！这是单位的秘密，你自己转就行，别声张。" },
    ],
    question: "面对这种情况，您应该怎么做？",
    options: [
      { id: "a", text: "听领导的，自己偷偷转钱" },
      { id: "b", text: "先少转一点试探一下" },
      { id: "c", text: "挂断电话，打领导原来的号码核实或告诉子女" },
      { id: "d", text: "问对方领导的全名确认身份" },
    ],
    correctAnswer: "c",
    explanation: "这是典型的冒充领导诈骗。骗子让您'别告诉家人'，就是怕被识破。遇到任何让您转账又不让告诉家人的情况，一定要先停下来，和子女商量后再决定。",
    mnemonic: "让你转账别声张，十有八九是在装；赶紧告诉儿女们，骗子当场就现形！",
  },
  {
    id: "scam-imp-4",
    categoryId: "impersonate",
    type: "review",
    scenario: "冒充公检法复盘",
    difficulty: "easy",
    redWords: ["安全账户", "别告诉家人"],
    dialogues: [
      { speaker: "scammer", text: "我是检察院的，您涉嫌经济犯罪，现在必须保密配合调查。" },
    ],
    question: "回顾一下，接到这种电话后最正确的第一步是？",
    options: [
      { id: "a", text: "按照对方指示一步步做" },
      { id: "b", text: "立刻挂断，打110或告诉家人" },
      { id: "c", text: "先听听对方说什么再决定" },
      { id: "d", text: "问对方的证件号" },
    ],
    correctAnswer: "b",
    explanation: "接到冒充公检法的电话，最正确的做法就是立刻挂断，然后拨打110报警电话核实，或者直接告诉子女。不要和骗子多说话，说多了容易被洗脑。",
    mnemonic: "陌生电话说犯罪，先挂电话最可贵；110和儿女们，核实清楚最安心！",
  },

  {
    id: "scam-mon-1",
    categoryId: "money-trap",
    type: "identify",
    scenario: "中奖诈骗",
    difficulty: "easy",
    redWords: ["保证金"],
    dialogues: [
      { speaker: "scammer", text: "恭喜您！您的手机号码被抽中了《非常6+1》节目的二等奖，奖金88000元还有一台苹果笔记本电脑！" },
      { speaker: "victim", text: "真的吗？我怎么中奖的？" },
      { speaker: "scammer", text: "是我们节目组随机抽取的幸运观众！您运气太好了！不过奖金要先交2000元保证金和个人所得税，您把保证金打过来，半小时内奖金就到账了！" },
    ],
    question: "在这个骗局中，骗子用什么理由让您先交钱？",
    options: [
      { id: "a", text: "手续费和服务费" },
      { id: "b", text: "保证金和个人所得税" },
      { id: "c", text: "快递费和包装费" },
      { id: "d", text: "会员费和注册费" },
    ],
    correctAnswer: "b",
    explanation: "中奖诈骗中，骗子会以'保证金''手续费''个人所得税'等各种名义让您先交钱。记住：真中奖是不需要先交钱的，让先交钱的一定是骗局。",
    mnemonic: "天上不会掉馅饼，中奖信息别轻信；先让交钱是套路，捂紧钱包才靠谱！",
  },
  {
    id: "scam-mon-2",
    categoryId: "money-trap",
    type: "judge",
    scenario: "投资理财诈骗",
    difficulty: "hard",
    redWords: ["高收益"],
    dialogues: [
      { speaker: "scammer", text: "李阿姨，我是您的理财顾问小王。我们公司有一款'养老理财'产品，年化收益25%，比银行高10倍！保本保息，零风险！好多老客户都买了几十万呢！" },
    ],
    question: "这种'年化25%、保本保息零风险'的理财产品靠谱吗？",
    options: [
      { id: "a", text: "非常靠谱，赶紧把养老钱投进去" },
      { id: "b", text: "不靠谱，高收益必然伴随高风险，保本高收益是骗局" },
      { id: "c", text: "先少投一点试试看" },
      { id: "d", text: "介绍老哥们一起买还能拿提成" },
    ],
    correctAnswer: "b",
    explanation: "正规银行的理财产品年化收益也就3%-5%左右，25%的收益根本不可能。凡是承诺'保本保息、高收益、零风险'的，都是骗局。骗子一开始可能会给您一点甜头，等您投了大钱就跑路了。",
    mnemonic: "理财收益超百分之十，就要打个大问号；保本保息零风险，全是骗子在洗脑！",
  },
  {
    id: "scam-mon-3",
    categoryId: "money-trap",
    type: "scenario",
    scenario: "虚假退款诈骗",
    difficulty: "easy",
    redWords: ["保证金"],
    dialogues: [
      { speaker: "scammer", text: "张大爷，您在我们电视购物买的治疗仪效果怎么样？" },
      { speaker: "victim", text: "还行吧，就是有点贵。" },
      { speaker: "scammer", text: "告诉您好消息！现在厂家搞活动，可以给您全额退款！但是需要您先交20%的退款保证金，我们走个流程，退款到账后保证金一起退给您。" },
    ],
    question: "您应该怎么做？",
    options: [
      { id: "a", text: "能全额退款太好了，赶紧交保证金" },
      { id: "b", text: "跟对方讨价还价，少交点保证金" },
      { id: "c", text: "不相信，真退款不会先要钱" },
      { id: "d", text: "问对方能不能退到子女的银行卡上" },
    ],
    correctAnswer: "c",
    explanation: "这是退款诈骗！退款本来就是把钱退给您，怎么还会让您先交钱呢？凡是退款要先交保证金、手续费的，百分百是诈骗！",
    mnemonic: "退款还要先交钱，这是骗子在骗钱；真退直接打给你，绕来绕去有猫腻！",
  },
  {
    id: "scam-mon-4",
    categoryId: "money-trap",
    type: "review",
    scenario: "刷单返利复盘",
    difficulty: "medium",
    redWords: ["高收益"],
    dialogues: [
      { speaker: "scammer", text: "在家没事做吗？做我们的刷单兼职，刷一单返5元，一天能赚两三百！" },
    ],
    question: "关于刷单兼职，以下哪个认识是正确的？",
    options: [
      { id: "a", text: "刷单很容易赚钱，适合在家的老人" },
      { id: "b", text: "先刷小单赚点小钱应该没问题" },
      { id: "c", text: "刷单本身就是违法的，而且肯定是诈骗" },
      { id: "d", text: "只要不投大钱就安全" },
    ],
    correctAnswer: "c",
    explanation: "刷单本身就是违法违规的行为。骗子一开始可能会给您返几单小的，让您尝到甜头，等您开始刷大单了，就会以'任务没完成''卡单'等理由不给您返钱，还让您继续刷。您刷得越多，亏得越多。",
    mnemonic: "刷单赚钱是陷阱，小利后面是大坑；先让你尝点甜头，骗光你才肯收手！",
  },

  {
    id: "scam-phi-1",
    categoryId: "phishing",
    type: "identify",
    scenario: "钓鱼链接诈骗",
    difficulty: "medium",
    dialogues: [
      { speaker: "scammer", text: "【中国移动】尊敬的用户，您的积分已达到兑换标准，可兑换500元话费礼包！请点击链接领取：http://fake-10086.com/ljf" },
    ],
    question: "这条短信中，最危险的部分是什么？",
    options: [
      { id: "a", text: "短信里的'中国移动'字样" },
      { id: "b", text: "500元话费礼包的诱惑" },
      { id: "c", text: "那个可疑的链接地址" },
      { id: "d", text: "'尊敬的用户'的称呼" },
    ],
    correctAnswer: "c",
    explanation: "这是典型的钓鱼链接诈骗！点击链接后，会要求您输入银行卡号、密码等信息，或者在您的手机里植入病毒。运营商不会发链接让您兑奖品，有疑问直接打官方客服电话核实。",
    mnemonic: "陌生链接别乱点，点了钱包就危险；领奖中奖是诱饵，骗光存款才罢休！",
  },
  {
    id: "scam-phi-2",
    categoryId: "phishing",
    type: "judge",
    scenario: "扫码领红包",
    difficulty: "easy",
    dialogues: [
      { speaker: "scammer", text: "阿姨，扫这个二维码可以领200元超市购物券，免费的，我帮您扫！" },
    ],
    question: "陌生人让您扫二维码领红包，对吗？",
    options: [
      { id: "a", text: "对，免费的东西不要白不要" },
      { id: "b", text: "不对，陌生人的二维码绝对不能扫" },
      { id: "c", text: "看看别人扫了我再扫" },
      { id: "d", text: "让对方帮我操作应该没事" },
    ],
    correctAnswer: "b",
    explanation: "陌生人的二维码可能是钓鱼链接、支付码、病毒安装包。扫了之后可能钱就没了，或者手机被安装了监控软件。记住：不认识的人的二维码一律不扫。",
    mnemonic: "陌生二维码，扫了就后悔；不是扣你钱，就是偷信息！",
  },
  {
    id: "scam-phi-3",
    categoryId: "phishing",
    type: "scenario",
    scenario: "虚假补助金链接",
    difficulty: "hard",
    redWords: ["验证码"],
    dialogues: [
      { speaker: "scammer", text: "您好，我是社保局的工作人员。根据最新政策，您可以领取2800元的高龄补贴，请点击链接登记您的银行卡信息。" },
      { speaker: "victim", text: "我点了链接，现在显示要输入验证码。" },
      { speaker: "scammer", text: "对的，您把收到的短信验证码告诉我，我帮您激活补贴账户。" },
    ],
    question: "到这一步，您最应该做的是？",
    options: [
      { id: "a", text: "把验证码告诉对方，尽快领取补贴" },
      { id: "b", text: "先去社区或社保局当面核实情况" },
      { id: "c", text: "只告诉对方验证码的前三位" },
      { id: "d", text: "问对方详细操作步骤" },
    ],
    correctAnswer: "b",
    explanation: "这是冒充社保局的钓鱼诈骗！国家发补贴不会发短信让您点链接，更不会要您的验证码。真正的补贴都是通过社区、单位统一办理，或者直接打到社保卡里的。有疑问直接去社区居委会或社保局问。",
    mnemonic: "补贴电话要小心，先要卡号再要密；亲自上门去核实，骗子就没辙了！",
  },
  {
    id: "scam-phi-4",
    categoryId: "phishing",
    type: "review",
    scenario: "钓鱼链接复盘",
    difficulty: "medium",
    dialogues: [
      { speaker: "scammer", text: "【京东】您的订单异常，请点击链接重新验证支付信息：http://fake-jd.com" },
    ],
    question: "面对此类短信，最安全的做法是？",
    options: [
      { id: "a", text: "点链接看看是什么情况" },
      { id: "b", text: "不点击链接，打开官方APP或打官方电话核实" },
      { id: "c", text: "回复短信询问情况" },
      { id: "d", text: "转发给家人让他们看看" },
    ],
    correctAnswer: "b",
    explanation: "收到带有链接的短信，最安全的做法是：不要点击！直接打开对应的官方APP，或者拨打官方客服电话核实。转发给家人也要提醒他们别点链接。",
    mnemonic: "短信链接不要点，官方渠道最安全；APP电话去核实，骗子只能干着急！",
  },

  {
    id: "scam-eld-1",
    categoryId: "elderly",
    type: "identify",
    scenario: "保健品推销诈骗",
    difficulty: "easy",
    dialogues: [
      { speaker: "scammer", text: "张阿姨您好！我们公司新推出一款'神丹'，能治高血压、糖尿病、关节炎，什么病都能治！现在购买还有优惠，买三送一！" },
    ],
    question: "这段推销中，哪句话最能说明这是骗局？",
    options: [
      { id: "a", text: "'张阿姨您好'" },
      { id: "b", text: "'什么病都能治'" },
      { id: "c", text: "'现在购买还有优惠'" },
      { id: "d", text: "'买三送一'" },
    ],
    correctAnswer: "b",
    explanation: "声称'包治百病'的保健品都是骗局！世界上没有万能药。治病一定要去正规医院，听医生的话，不要相信陌生人的推销。保健品不能代替药品，乱吃还可能伤身体。",
    mnemonic: "包治百病保健品，全是骗子在演戏；有病就去大医院，别拿健康当儿戏！",
  },
  {
    id: "scam-eld-2",
    categoryId: "elderly",
    type: "judge",
    scenario: "养老床位预订诈骗",
    difficulty: "medium",
    dialogues: [
      { speaker: "scammer", text: "王阿姨您好！我们是'夕阳红'养老服务公司的。现在推出'养老床位预订'活动，预交10万预订金，以后入住养老院打5折，还能每月领利息！" },
    ],
    question: "预交10万预订养老床位还能拿利息，这件事靠谱吗？",
    options: [
      { id: "a", text: "靠谱，养老是刚需，提前准备好" },
      { id: "b", text: "不靠谱，高回报的养老项目都是骗局，要实地考察和家人商量" },
      { id: "c", text: "先交一点定金占个名额" },
      { id: "d", text: "跟老朋友们一起团购" },
    ],
    correctAnswer: "b",
    explanation: "这是养老诈骗！骗子专门盯着老年人的养老钱，用'高回报''享清福'当诱饵，让您预交床位费、服务费。您交了钱，他们要么跑路，要么服务根本没有说的那么好。选择养老机构一定要实地去看，跟家人商量，找正规的机构。",
    mnemonic: "养老项目高回报，小心是个大圈套；实地考察问清楚，子女商量别糊涂！",
  },
  {
    id: "scam-eld-3",
    categoryId: "elderly",
    type: "scenario",
    scenario: "免费体检骗局",
    difficulty: "medium",
    redWords: ["别告诉家人"],
    dialogues: [
      { speaker: "scammer", text: "李大爷，我们社区今天有免费体检活动，您过来检查一下吧，还有免费鸡蛋送！" },
      { speaker: "victim", text: "好啊好啊，那我过去。" },
      { speaker: "scammer", text: "大爷，检查结果出来了，您有严重的心血管问题，再不治就危险了！我们这里有美国进口的特效药，一个疗程只要3万块。" },
      { speaker: "victim", text: "这么贵啊？我得跟我儿子商量一下。" },
      { speaker: "scammer", text: "千万别告诉家人！他们年轻人不懂，还会耽误您治疗。今天下单还能减5000。" },
    ],
    question: "您应该怎么做？",
    options: [
      { id: "a", text: "听医生的，赶紧买药救命要紧" },
      { id: "b", text: "先少买一点试试" },
      { id: "c", text: "不买，免费体检是诱饵，这是骗局，赶紧走人并告诉家人" },
      { id: "d", text: "跟对方讨价还价" },
    ],
    correctAnswer: "c",
    explanation: "这是典型的'免费体检+卖假药'骗局！骗子先用小恩小惠（鸡蛋、米面）吸引老人去'体检'，然后故意说您有严重疾病，再推销天价假药。让您别告诉家人，就是怕被识破。身体不舒服一定要去正规医院检查。",
    mnemonic: "免费体检送鸡蛋，等你入坑就完蛋；没病说你有大病，骗光积蓄才罢休！",
  },
  {
    id: "scam-eld-4",
    categoryId: "elderly",
    type: "review",
    scenario: "养老骗局复盘",
    difficulty: "easy",
    dialogues: [
      { speaker: "scammer", text: "叔叔阿姨，今天来就送一斤鸡蛋！还能听专家健康讲座！" },
    ],
    question: "遇到这种'免费送礼+讲座'的活动，正确的态度是？",
    options: [
      { id: "a", text: "赶紧去领，不领白不领" },
      { id: "b", text: "提高警惕，不贪图小便宜，坚决不去" },
      { id: "c", text: "领了鸡蛋就走，不听讲座" },
      { id: "d", text: "叫上老伙伴一起去" },
    ],
    correctAnswer: "b",
    explanation: "骗子就是利用老年人'贪小便宜'的心理，先用免费鸡蛋、米面、油等小礼物吸引您去，然后一步步给您洗脑推销天价保健品、假药、养老项目。记住：天下没有免费的午餐，贪小便宜吃大亏！",
    mnemonic: "免费鸡蛋和米面，背后都是大陷阱；贪小便宜吃大亏，不如在家喝口水！",
  },

  {
    id: "scam-acq-1",
    categoryId: "acquaintance",
    type: "identify",
    scenario: "冒充子女诈骗",
    difficulty: "medium",
    dialogues: [
      { speaker: "scammer", text: "爸/妈，我是小明啊！我手机坏了，这是我同学的手机。" },
      { speaker: "victim", text: "小明啊，你怎么了？手机怎么坏了？" },
      { speaker: "scammer", text: "我出车祸了，在医院等着做手术，急需5万块手术费！您赶紧把钱打到我同学的银行卡上：622xxxxxxx，户名李强。千万别打电话，我在抢救呢！" },
    ],
    question: "骗子用了什么借口让您立刻打钱？",
    options: [
      { id: "a", text: "手机坏了要换手机" },
      { id: "b", text: "出车祸急需手术费" },
      { id: "c", text: "交学费和住宿费" },
      { id: "d", text: "投资生意急需周转" },
    ],
    correctAnswer: "b",
    explanation: "冒充子女诈骗最常用的套路就是说孩子出了车祸、打架被抓、生病住院等紧急情况，利用您焦急的心理让您来不及核实就打钱。遇到这种情况，千万不要慌，先冷静下来，拨打孩子原来的电话号码核实。",
    mnemonic: "儿女出事要打钱，先把电话挂一边；冷静核实再决定，骗子就得逞不了！",
  },
  {
    id: "scam-acq-2",
    categoryId: "acquaintance",
    type: "judge",
    scenario: "微信冒充亲友借钱",
    difficulty: "easy",
    dialogues: [
      { speaker: "scammer", text: "姑姑，我是您侄子小刚啊，我微信被盗刚找回来。我在外地出差钱包丢了，您先转2000块给我应急，回去就还您。" },
    ],
    question: "微信上'侄子'说自己钱包丢了要借钱，您应该？",
    options: [
      { id: "a", text: "侄子有困难，赶紧转钱过去" },
      { id: "b", text: "打个电话给侄子本人确认一下再决定" },
      { id: "c", text: "先转500块意思意思" },
      { id: "d", text: "问他在哪个城市出差" },
    ],
    correctAnswer: "b",
    explanation: "微信被盗号冒充亲友借钱是非常常见的诈骗手法！凡是微信上有人跟您借钱，不管是谁，一定要打电话给本人确认。如果电话打不通，就联系他的家人核实。千万不要在微信上直接转账！",
    mnemonic: "微信借钱要留神，十个有九个是骗人；打个电话问本人，核实清楚再转身！",
  },
  {
    id: "scam-acq-3",
    categoryId: "acquaintance",
    type: "scenario",
    scenario: "冒充老伴紧急求助",
    difficulty: "hard",
    redWords: ["别告诉家人", "屏幕共享"],
    dialogues: [
      { speaker: "scammer", text: "老头子，我是你老伴啊！我在外面买菜被车撞了，现在在医院，你快给我转3万块！" },
      { speaker: "victim", text: "啊！你用谁的手机打的？我怎么听声音不太像？" },
      { speaker: "scammer", text: "我嘴摔肿了说话不清楚，你别啰嗦了！这是护士的手机。你按我说的操作，打开手机的屏幕共享，护士教你转钱，别告诉儿女他们瞎担心！" },
    ],
    question: "这种情况下，最不应该做的是？",
    options: [
      { id: "a", text: "打开屏幕共享按对方说的做" },
      { id: "b", text: "立刻挂断电话打给子女" },
      { id: "c", text: "打老伴平时用的号码" },
      { id: "d", text: "联系老伴一起买菜的老姐妹核实" },
    ],
    correctAnswer: "a",
    explanation: "这道题有两个诈骗红线词：'屏幕共享'和'别告诉家人'。打开屏幕共享后，对方就能看到您所有的操作，包括输入密码，钱立刻就会被转走。遇到这种情况，最正确的做法是挂断电话，联系子女和其他家人核实。",
    mnemonic: "屏幕共享不能开，一开你的钱就拜拜；遇事就把儿女找，骗子气得直跳脚！",
  },
  {
    id: "scam-acq-4",
    categoryId: "acquaintance",
    type: "review",
    scenario: "熟人诈骗复盘",
    difficulty: "medium",
    dialogues: [
      { speaker: "scammer", text: "老同学，还记得我吗？我是你高中同桌老周啊！最近手头有点紧，借5000块周转一下，下个月就还。" },
    ],
    question: "多年不联系的'老同学'突然微信借钱，正确做法是？",
    options: [
      { id: "a", text: "老同学感情深，赶紧转钱" },
      { id: "b", text: "通过电话或视频确认本人身份后再决定" },
      { id: "c", text: "少借一点，1000块意思意思" },
      { id: "d", text: "问他一些往事确认身份" },
    ],
    correctAnswer: "b",
    explanation: "冒充老同学、老朋友借钱也是常见的诈骗。骗子盗号后会说一些模棱两可的话让您自己'对号入座'。微信上借钱，不管是谁，一定要通过电话或视频确认是本人后再做决定。这是铁律！",
    mnemonic: "多年不见来借钱，视频电话先见面；确认本人再帮忙，不然就是帮倒忙！",
  },

  {
    id: "scam-mon-5",
    categoryId: "money-trap",
    type: "identify",
    scenario: "虚假补助金诈骗",
    difficulty: "hard",
    redWords: ["验证码"],
    dialogues: [
      { speaker: "scammer", text: "您好，我是社保局的工作人员。根据最新政策，您可以领取2800元的'高龄补贴'，这是国家给老年人的福利！" },
      { speaker: "victim", text: "还有这好事？怎么领啊？" },
      { speaker: "scammer", text: "很简单！您把您的银行卡号和身份证号告诉我，我们登记一下，然后您按照我们的提示操作一下，钱就打到您卡上了。对了，您卡里最好有个几千块钱，这样才能激活补贴账户。" },
    ],
    question: "以下哪项不是这个骗局的特征？",
    options: [
      { id: "a", text: "要求提供银行卡号和身份证号" },
      { id: "b", text: "要求卡里有几千块钱'激活'" },
      { id: "c", text: "通过社区统一办理" },
      { id: "d", text: "电话通知办理" },
    ],
    correctAnswer: "c",
    explanation: "真正的国家补贴都是通过社区、单位统一办理，或者直接打到社保卡里的，不会打电话让您提供银行卡号、让您卡里存钱'激活'。A、B、D都是骗局的典型特征。",
    mnemonic: "补贴电话要小心，先要卡号再要密；亲自上门去核实，骗子就没辙了！",
  },

  {
    id: "scam-imp-5",
    categoryId: "impersonate",
    type: "scenario",
    scenario: "冒充银行客服诈骗",
    difficulty: "medium",
    redWords: ["屏幕共享", "验证码"],
    dialogues: [
      { speaker: "scammer", text: "您好，我是工商银行客服。检测到您的银行卡在上海有一笔大额异常消费，请问是您本人操作吗？" },
      { speaker: "victim", text: "没有啊！我没去过上海！" },
      { speaker: "scammer", text: "那您的银行卡信息可能被盗了，我帮您冻结账户。请您打开手机银行，点击屏幕共享功能，我指导您操作，另外请把收到的验证码告诉我核验身份。" },
    ],
    question: "面对这种情况，最安全的做法是？",
    options: [
      { id: "a", text: "打开屏幕共享配合客服操作" },
      { id: "b", text: "把验证码告诉客服" },
      { id: "c", text: "立刻挂断，拨打银行卡背面的官方客服电话核实" },
      { id: "d", text: "问对方客服的工号" },
    ],
    correctAnswer: "c",
    explanation: "这里同时出现了两个高危红线词：'屏幕共享'和'验证码'。银行绝对不会要求您打开屏幕共享，也不会索要验证码。遇到这种情况，立刻挂断电话，拨打银行卡背面印刷的官方客服电话核实。",
    mnemonic: "银行客服要密码，验证码和屏幕共享，三样全要全是假，挂电话打官方！",
  },
];

export const getCategoryById = (id: ScamCategoryId) =>
  scamCategories.find((c) => c.id === id);

export const getQuestionsByCategory = (categoryId: ScamCategoryId) =>
  scamQuestions.filter((q) => q.categoryId === categoryId);

export const getQuestionsByType = (categoryId: ScamCategoryId, type: ScamQuestionType) =>
  scamQuestions.filter((q) => q.categoryId === categoryId && q.type === type);

export const getRedWordsByLevel = (level: "high" | "medium" | "warn") =>
  redWordExercises.filter((r) => r.dangerLevel === level);
