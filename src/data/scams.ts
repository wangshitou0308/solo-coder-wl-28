export interface ScamQuestion {
  id: string;
  scenario: string;
  dialogues: ScamDialogue[];
  question: string;
  options: ScamOption[];
  correctAnswer: string;
  explanation: string;
  mnemonic: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface ScamDialogue {
  speaker: "scammer" | "victim";
  text: string;
}

export interface ScamOption {
  id: string;
  text: string;
}

export const scamQuestions: ScamQuestion[] = [
  {
    id: "scam1",
    scenario: "冒充公检法诈骗",
    difficulty: "hard",
    dialogues: [
      { speaker: "scammer", text: "您好，我是北京市公安局的王警官，您的身份证号是1101011950xxxxxxx对吗？" },
      { speaker: "victim", text: "对，是我。请问有什么事吗？" },
      { speaker: "scammer", text: "我们查到您涉嫌一起洗钱案件，涉案金额高达200万。您现在必须配合调查，否则就要被通缉！" },
      { speaker: "victim", text: "什么？洗钱？我没有啊，这怎么可能！" },
      { speaker: "scammer", text: "是不是有人盗用了您的身份？为了证明您的清白，您需要把所有存款转到我们的'安全账户'进行核查。核查没问题后就会退还给您。" },
    ],
    question: "面对这种情况，您应该怎么做？",
    options: [
      { id: "a", text: "赶紧把钱转到安全账户，证明自己清白" },
      { id: "b", text: "挂断电话，打110核实情况或告诉家人" },
      { id: "c", text: "跟对方解释自己没有犯罪" },
      { id: "d", text: "问对方的警号是多少" },
    ],
    correctAnswer: "b",
    explanation: "公检法机关不会通过电话办案，也没有所谓的'安全账户'。凡是打电话说您犯罪了、让您转钱的，都是骗子！遇到这种情况，一定要挂断电话，告诉家人或者直接打110报警。",
    mnemonic: "公检法打电话，十有八九是诈骗；安全账户不存在，核实清楚最关键！",
  },
  {
    id: "scam2",
    scenario: "保健品推销诈骗",
    difficulty: "easy",
    dialogues: [
      { speaker: "scammer", text: "张阿姨您好！我们公司新推出一款'神丹'，能治高血压、糖尿病、关节炎，什么病都能治！现在购买还有优惠，买三送一！" },
      { speaker: "victim", text: "真的这么神奇吗？多少钱啊？" },
      { speaker: "scammer", text: "原价9999一盒，现在活动价只要2999！今天下单还送您价值5000元的理疗仪！您把地址告诉我，我们马上给您寄过去，货到付款就行！" },
    ],
    question: "遇到这样的保健品推销，您应该怎么做？",
    options: [
      { id: "a", text: "这么好的东西，赶紧买几盒" },
      { id: "b", text: "先买一盒试试效果再说" },
      { id: "c", text: "不相信，有病去正规医院看医生" },
      { id: "d", text: "问问邻居要不要一起买" },
    ],
    correctAnswer: "c",
    explanation: "声称'包治百病'的保健品都是骗局！世界上没有万能药。治病一定要去正规医院，听医生的话，不要相信陌生人的推销。保健品不能代替药品，乱吃还可能伤身体。",
    mnemonic: "包治百病保健品，全是骗子在演戏；有病就去大医院，别拿健康当儿戏！",
  },
  {
    id: "scam3",
    scenario: "钓鱼链接诈骗",
    difficulty: "medium",
    dialogues: [
      { speaker: "scammer", text: "【中国移动】尊敬的用户，您的积分已达到兑换标准，可兑换500元话费礼包！请点击链接领取：http://fake-10086.com/ljf" },
    ],
    question: "收到这样的短信，您应该怎么做？",
    options: [
      { id: "a", text: "点击链接，看看怎么领话费" },
      { id: "b", text: "把链接转发给亲戚朋友" },
      { id: "c", text: "不点击链接，直接删除短信" },
      { id: "d", text: "回复短信问问怎么领" },
    ],
    correctAnswer: "c",
    explanation: "这是典型的钓鱼链接诈骗！点击链接后，会要求您输入银行卡号、密码等信息，或者在您的手机里植入病毒。运营商不会发链接让您兑奖品，有疑问直接打官方客服电话核实。",
    mnemonic: "陌生链接别乱点，点了钱包就危险；领奖中奖是诱饵，骗光存款才罢休！",
  },
  {
    id: "scam4",
    scenario: "中奖诈骗",
    difficulty: "easy",
    dialogues: [
      { speaker: "scammer", text: "恭喜您！您的手机号码被抽中了《非常6+1》节目的二等奖，奖金88000元还有一台苹果笔记本电脑！请先交2000元手续费和个人所得税，我们马上给您打款！" },
      { speaker: "victim", text: "真的吗？我怎么中奖的？" },
      { speaker: "scammer", text: "是我们节目组随机抽取的幸运观众！您运气太好了！不过奖金要先交税，您把税钱打过来，半小时内奖金就到账了！" },
    ],
    question: "面对这种中奖信息，您应该怎么做？",
    options: [
      { id: "a", text: "运气太好了！赶紧交手续费领奖金" },
      { id: "b", text: "跟对方商量能不能少交一点手续费" },
      { id: "c", text: "不相信，天上不会掉馅饼" },
      { id: "d", text: "让对方先打一部分奖金过来" },
    ],
    correctAnswer: "c",
    explanation: "这是典型的中奖诈骗！您没参加过的抽奖怎么会中奖呢？骗子就是利用大家想发财的心理，让您先交手续费、税费、保证金……您交了一笔又一笔，最后一分钱奖金也拿不到。记住：真中奖是不需要先交钱的！",
    mnemonic: "天上不会掉馅饼，中奖信息别轻信；先让交钱是套路，捂紧钱包才靠谱！",
  },
  {
    id: "scam5",
    scenario: "冒充熟人诈骗",
    difficulty: "medium",
    dialogues: [
      { speaker: "scammer", text: "爸/妈，我是小明啊！我手机坏了，这是我同学的手机。" },
      { speaker: "victim", text: "小明啊，你怎么了？手机怎么坏了？" },
      { speaker: "scammer", text: "我出车祸了，在医院等着做手术，急需5万块手术费！您赶紧把钱打到我同学的银行卡上：622xxxxxxx，户名李强。千万别打电话，我在抢救呢！" },
    ],
    question: "接到这样的电话，您应该怎么做？",
    options: [
      { id: "a", text: "孩子出事了，赶紧打钱过去救人" },
      { id: "b", text: "先打一部分，剩下的再说" },
      { id: "c", text: "挂掉电话，打孩子原来的号码核实" },
      { id: "d", text: "问问孩子伤得重不重" },
    ],
    correctAnswer: "c",
    explanation: "这是冒充子女诈骗！骗子会先搞清楚您孩子的名字，然后装成孩子出事了，利用您焦急的心理骗钱。遇到这种情况，千万不要慌，先冷静下来，拨打孩子原来的电话号码核实。联系不上就找孩子的老师、同学问问，或者直接报警。",
    mnemonic: "儿女出事要打钱，先把电话挂一边；冷静核实再决定，骗子就得逞不了！",
  },
  {
    id: "scam6",
    scenario: "投资理财诈骗",
    difficulty: "hard",
    dialogues: [
      { speaker: "scammer", text: "李阿姨，我是您的理财顾问小王。我们公司有一款'养老理财'产品，年化收益25%，比银行高10倍！保本保息，零风险！好多老客户都买了几十万呢！" },
      { speaker: "victim", text: "这么高的收益？靠谱吗？" },
      { speaker: "scammer", text: "绝对靠谱！我们是国家批准的正规公司，有政府背景。您看这是我们的营业执照和获奖证书（发来几张图片）。现在还有'老带新'活动，介绍朋友买还能拿提成！" },
    ],
    question: "面对这样的高收益理财产品，您应该怎么做？",
    options: [
      { id: "a", text: "收益这么高，把养老钱都投进去" },
      { id: "b", text: "先少投一点试试水" },
      { id: "c", text: "不相信，高收益一定有高风险" },
      { id: "d", text: "介绍老哥们一起买，还能拿提成" },
    ],
    correctAnswer: "c",
    explanation: "这是典型的投资理财诈骗！凡是说'保本保息、高收益、零风险'的，都是骗子。正规银行的理财产品收益也就在3%-5%左右，25%的收益根本不可能。骗子一开始可能会给您一点甜头，等您投了大钱就跑路了。",
    mnemonic: "理财收益超百分之十，就要打个大问号；保本保息零风险，全是骗子在洗脑！",
  },
  {
    id: "scam7",
    scenario: "虚假购物诈骗",
    difficulty: "easy",
    dialogues: [
      { speaker: "scammer", text: "张大爷，您在我们电视购物买的治疗仪效果怎么样？" },
      { speaker: "victim", text: "还行吧，就是有点贵。" },
      { speaker: "scammer", text: "告诉您好消息！现在厂家搞活动，可以给您全额退款！但是需要您先交20%的退款保证金，我们走个流程，退款到账后保证金一起退给您。" },
    ],
    question: "遇到这样的'退款'电话，您应该怎么做？",
    options: [
      { id: "a", text: "能全额退款太好了，赶紧交保证金" },
      { id: "b", text: "跟对方讨价还价，少交点保证金" },
      { id: "c", text: "不相信，真退款不会先要钱" },
      { id: "d", text: "问对方能不能退到子女的银行卡上" },
    ],
    correctAnswer: "c",
    explanation: "这是退款诈骗！骗子知道您买过东西，就冒充客服说可以退款，让您先交保证金、手续费。退款本来就是把钱退给您，怎么还会让您先交钱呢？凡是退款要先交钱的，百分百是诈骗！",
    mnemonic: "退款还要先交钱，这是骗子在骗钱；真退直接打给你，绕来绕去有猫腻！",
  },
  {
    id: "scam8",
    scenario: "虚假养老服务诈骗",
    difficulty: "medium",
    dialogues: [
      { speaker: "scammer", text: "王阿姨您好！我们是'夕阳红'养老服务公司的。现在推出'养老床位预订'活动，预交10万预订金，以后入住养老院打5折，还能每月领利息！现在报名还送价值2000元的体检大礼包！" },
      { speaker: "victim", text: "养老院条件怎么样啊？" },
      { speaker: "scammer", text: "条件可好了！有医生24小时值班，还有棋牌室、健身房。我们在全国有30多家分院，您可以随时去住。好多叔叔阿姨都预交了，名额快没了！" },
    ],
    question: "面对这样的养老服务推销，您应该怎么做？",
    options: [
      { id: "a", text: "为了养老有保障，赶紧交钱预订" },
      { id: "b", text: "跟老朋友们一起团购" },
      { id: "c", text: "实地考察，跟家人商量后再决定" },
      { id: "d", text: "先交一点定金占个名额" },
    ],
    correctAnswer: "c",
    explanation: "这是养老诈骗！骗子专门盯着老年人的养老钱，用'高回报''享清福'当诱饵，让您预交床位费、服务费。您交了钱，他们要么跑路，要么服务根本没有说的那么好。选择养老机构一定要实地去看，跟家人商量，找正规的机构。",
    mnemonic: "养老项目高回报，小心是个大圈套；实地考察问清楚，子女商量别糊涂！",
  },
  {
    id: "scam9",
    scenario: "刷单返利诈骗",
    difficulty: "medium",
    dialogues: [
      { speaker: "scammer", text: "亲，在家没事做吗？可以做我们的'刷单兼职'哦，动动手指就能赚钱！刷一单返5元，一天能赚两三百，时间自由，多劳多得！" },
      { speaker: "victim", text: "这么简单？怎么做啊？" },
      { speaker: "scammer", text: "很简单的！您先扫这个二维码下载APP，然后在里面接任务，先垫付一下货款，任务完成后本金和佣金一起返给您。第一单刷100返105，试试就知道了！" },
    ],
    question: "面对这样的刷单兼职，您应该怎么做？",
    options: [
      { id: "a", text: "这么容易赚钱，赶紧试试" },
      { id: "b", text: "先刷小单试试，赚点零花钱" },
      { id: "c", text: "不做，刷单本身就是违法的，而且肯定是诈骗" },
      { id: "d", text: "介绍给老姐妹一起做" },
    ],
    correctAnswer: "c",
    explanation: "这是刷单诈骗！刷单本身就是违法违规的行为。骗子一开始可能会给您返几单小的，让您尝到甜头，等您开始刷大单了，就会以'任务没完成''卡单'等理由不给您返钱，还让您继续刷。您刷得越多，亏得越多。",
    mnemonic: "刷单赚钱是陷阱，小利后面是大坑；先让你尝点甜头，骗光你才肯收手！",
  },
  {
    id: "scam10",
    scenario: "虚假补助金诈骗",
    difficulty: "hard",
    dialogues: [
      { speaker: "scammer", text: "您好，我是社保局的工作人员。根据最新政策，您可以领取2800元的'高龄补贴'，这是国家给老年人的福利！" },
      { speaker: "victim", text: "还有这好事？怎么领啊？" },
      { speaker: "scammer", text: "很简单的！您把您的银行卡号和身份证号告诉我，我们登记一下，然后您按照我们的提示操作一下，钱就打到您卡上了。对了，您卡里最好有个几千块钱，这样才能激活补贴账户。" },
    ],
    question: "接到这样的'补贴'电话，您应该怎么做？",
    options: [
      { id: "a", text: "国家给的福利，赶紧配合领取" },
      { id: "b", text: "把银行卡号告诉对方，但不告诉密码" },
      { id: "c", text: "挂断电话，到社区或社保局当面核实" },
      { id: "d", text: "问对方需要怎么操作" },
    ],
    correctAnswer: "c",
    explanation: "这是冒充社保局的诈骗！国家发补贴不会打电话让您提供银行卡号和密码，更不会要求您卡里有多少钱。真正的补贴都是通过社区、单位统一办理，或者直接打到社保卡里的。有疑问直接去社区居委会或社保局问，别在电话里操作。",
    mnemonic: "补贴电话要小心，先要卡号再要密；亲自上门去核实，骗子就没辙了！",
  },
];
