export interface TutorialStep {
  id: string;
  title: string;
  description: string;
  image: string;
  tip?: string;
}

export interface Tutorial {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  icon: string;
  steps: TutorialStep[];
  estimatedMinutes: number;
}

export interface TutorialCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export const tutorialCategories: TutorialCategory[] = [
  {
    id: "wechat",
    name: "微信基础",
    icon: "message-circle",
    color: "bg-green-500",
    description: "学习微信聊天、发朋友圈、视频通话",
  },
  {
    id: "photo",
    name: "拍照修图",
    icon: "camera",
    color: "bg-purple-500",
    description: "拍照、录像、美化照片",
  },
  {
    id: "travel",
    name: "出行导航",
    icon: "map-pin",
    color: "bg-blue-500",
    description: "地图导航、打车、坐公交地铁",
  },
  {
    id: "medical",
    name: "就医挂号",
    icon: "heart-pulse",
    color: "bg-red-500",
    description: "网上挂号、查报告、线上问诊",
  },
  {
    id: "payment",
    name: "生活缴费",
    icon: "wallet",
    color: "bg-orange-500",
    description: "交电费、水费、话费",
  },
  {
    id: "entertainment",
    name: "休闲娱乐",
    icon: "music",
    color: "bg-pink-500",
    description: "看视频、听戏曲、玩小游戏",
  },
];

export const tutorials: Tutorial[] = [
  {
    id: "wechat-chat",
    categoryId: "wechat",
    title: "微信发消息",
    description: "学会用微信给家人朋友发文字和语音消息",
    icon: "message-square",
    estimatedMinutes: 5,
    steps: [
      {
        id: "step1",
        title: "打开微信",
        description: "在手机桌面上找到绿色的微信图标，用手指轻轻点一下打开它。",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=smartphone%20home%20screen%20with%20wechat%20app%20icon%20highlighted%20in%20green%20simple%20illustration&image_size=landscape_4_3",
        tip: "微信图标是绿色的，上面有两个白色的小气泡。",
      },
      {
        id: "step2",
        title: "找到要聊天的人",
        description: "在微信首页的聊天列表里，找到您想聊天的家人或朋友，点击他们的名字。",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wechat%20chat%20list%20interface%20with%20contacts%20simple%20clean%20design%20elderly%20friendly&image_size=landscape_4_3",
        tip: "如果找不到，可以点顶部的放大镜图标搜索名字。",
      },
      {
        id: "step3",
        title: "发送文字消息",
        description: "点击底部的输入框，用键盘输入您想说的话，然后点击右边的绿色发送按钮。",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wechat%20chat%20interface%20with%20text%20input%20box%20and%20send%20button%20highlighted%20simple%20illustration&image_size=landscape_4_3",
        tip: "输入错了可以按键盘上的删除键修改。",
      },
      {
        id: "step4",
        title: "发送语音消息",
        description: "按住底部的'按住说话'按钮，对着手机说话，说完松开手，语音就发出去了。",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wechat%20voice%20message%20interface%20hold%20to%20talk%20button%20highlighted%20simple%20illustration&image_size=landscape_4_3",
        tip: "说话时手机离嘴巴大约一拳远就可以了。",
      },
    ],
  },
  {
    id: "wechat-video",
    categoryId: "wechat",
    title: "微信视频通话",
    description: "和远方的亲人面对面聊天，看到对方的样子",
    icon: "video",
    estimatedMinutes: 4,
    steps: [
      {
        id: "step1",
        title: "打开聊天窗口",
        description: "找到您想视频通话的亲人，打开和他/她的聊天界面。",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wechat%20chat%20window%20interface%20simple%20clean%20elderly%20friendly%20design&image_size=landscape_4_3",
      },
      {
        id: "step2",
        title: "点击视频通话",
        description: "点击右下角的加号按钮，然后选择'视频通话'选项。",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wechat%20plus%20menu%20with%20video%20call%20option%20highlighted%20simple%20illustration&image_size=landscape_4_3",
        tip: "视频通话需要连接WiFi，不然会消耗很多流量。",
      },
      {
        id: "step3",
        title: "等待对方接听",
        description: "点击后会响起铃声，等待对方接听。看到对方的画面就说明接通了。",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wechat%20video%20call%20ringing%20interface%20waiting%20to%20answer%20simple%20illustration&image_size=landscape_4_3",
      },
      {
        id: "step4",
        title: "结束通话",
        description: "聊天结束后，点击屏幕下方中间的红色挂断按钮，就可以结束通话了。",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wechat%20video%20call%20in%20progress%20with%20end%20call%20button%20highlighted%20simple%20illustration&image_size=landscape_4_3",
        tip: "找不到挂断按钮时，轻点一下屏幕就会显示出来。",
      },
    ],
  },
  {
    id: "wechat-moments",
    categoryId: "wechat",
    title: "发朋友圈",
    description: "分享生活照片和心情，让朋友们看到您的近况",
    icon: "share-2",
    estimatedMinutes: 6,
    steps: [
      {
        id: "step1",
        title: "进入发现页",
        description: "点击微信底部的'发现'按钮，然后选择'朋友圈'。",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wechat%20bottom%20navigation%20bar%20with%20discover%20tab%20highlighted%20simple%20illustration&image_size=landscape_4_3",
      },
      {
        id: "step2",
        title: "点击相机图标",
        description: "点击右上角的相机图标，选择您要分享的照片。",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wechat%20moments%20page%20with%20camera%20icon%20highlighted%20simple%20illustration&image_size=landscape_4_3",
        tip: "长按相机图标可以只发文字，不发图片。",
      },
      {
        id: "step3",
        title: "选择照片",
        description: "从相册里选择您想分享的照片，可以选一张或多张。",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=phone%20photo%20gallery%20selecting%20images%20simple%20clean%20interface&image_size=landscape_4_3",
      },
      {
        id: "step4",
        title: "写下想说的话",
        description: "在输入框里写下您的心情或想说的话，然后点击'发表'。",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wechat%20moments%20post%20editor%20with%20text%20input%20and%20publish%20button%20simple&image_size=landscape_4_3",
        tip: "不想让某些人看，可以设置'谁可以看'。",
      },
    ],
  },
  {
    id: "photo-basic",
    categoryId: "photo",
    title: "手机拍照",
    description: "用手机相机记录美好瞬间，拍风景拍家人",
    icon: "camera",
    estimatedMinutes: 5,
    steps: [
      {
        id: "step1",
        title: "打开相机",
        description: "在手机桌面上找到相机图标，点击打开相机应用。",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=smartphone%20home%20screen%20with%20camera%20app%20icon%20highlighted%20simple%20illustration&image_size=landscape_4_3",
        tip: "相机图标一般是黑色的，像一个照相机。",
      },
      {
        id: "step2",
        title: "对准拍摄对象",
        description: "把手机镜头对准您想拍的人或景物，屏幕上会显示画面。",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=smartphone%20camera%20viewfinder%20interface%20pointing%20at%20flowers%20simple%20illustration&image_size=landscape_4_3",
        tip: "双手握住手机，这样拍出来更清楚。",
      },
      {
        id: "step3",
        title: "点击拍照",
        description: "点击屏幕底部中间的圆形拍照按钮，'咔嚓'一声就拍好了。",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=smartphone%20camera%20interface%20with%20shutter%20button%20highlighted%20simple%20illustration&image_size=landscape_4_3",
        tip: "拍照时手不要动，等照片存好再放下手机。",
      },
      {
        id: "step4",
        title: "查看照片",
        description: "点击左下角的小图片，就可以看到您刚拍的照片了。",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=smartphone%20camera%20gallery%20thumbnail%20highlighted%20simple%20illustration&image_size=landscape_4_3",
        tip: "拍得不好可以删除重拍，多练习就会越来越好。",
      },
    ],
  },
  {
    id: "photo-selfie",
    categoryId: "photo",
    title: "自拍技巧",
    description: "用前置摄像头拍出美美的自拍照",
    icon: "user",
    estimatedMinutes: 4,
    steps: [
      {
        id: "step1",
        title: "切换前置摄像头",
        description: "打开相机后，点击屏幕上的旋转箭头图标，切换到前置摄像头。",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=smartphone%20camera%20switch%20camera%20icon%20highlighted%20selfie%20mode%20simple&image_size=landscape_4_3",
      },
      {
        id: "step2",
        title: "调整角度",
        description: "手机举到斜上方45度，这样拍出来脸会显得小一些。",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=person%20taking%20selfie%20with%20smartphone%2045%20degree%20angle%20simple%20illustration&image_size=landscape_4_3",
        tip: "微笑会让照片看起来更亲切。",
      },
      {
        id: "step3",
        title: "找好光线",
        description: "面对窗户或灯光，让光线照在脸上，照片会更明亮清晰。",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=person%20taking%20selfie%20near%20window%20natural%20light%20simple%20illustration&image_size=landscape_4_3",
        tip: "不要背对着窗户，不然脸会黑黑的。",
      },
      {
        id: "step4",
        title: "使用美颜",
        description: "点击美颜按钮，可以让皮肤看起来更光滑细腻。",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=smartphone%20camera%20beauty%20mode%20icon%20highlighted%20simple%20illustration&image_size=landscape_4_3",
        tip: "美颜不要开太大，自然一点最好看。",
      },
    ],
  },
  {
    id: "travel-map",
    categoryId: "travel",
    title: "地图导航",
    description: "用手机地图查路线，再也不怕迷路",
    icon: "map",
    estimatedMinutes: 7,
    steps: [
      {
        id: "step1",
        title: "打开地图应用",
        description: "在手机上找到'高德地图'或'百度地图'，点击打开。",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=smartphone%20home%20screen%20with%20map%20app%20icon%20highlighted%20simple%20illustration&image_size=landscape_4_3",
      },
      {
        id: "step2",
        title: "搜索目的地",
        description: "在顶部的搜索框里输入您想去的地方，比如'人民公园'。",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=map%20app%20search%20bar%20with%20destination%20input%20simple%20illustration&image_size=landscape_4_3",
      },
      {
        id: "step3",
        title: "选择路线",
        description: "点击'路线'按钮，选择您的出行方式：步行、公交或驾车。",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=map%20app%20route%20options%20walk%20bus%20car%20simple%20illustration&image_size=landscape_4_3",
        tip: "出门前查好路线，心里更踏实。",
      },
      {
        id: "step4",
        title: "开始导航",
        description: "点击'开始导航'，跟着语音提示走就可以了。",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=map%20app%20navigation%20in%20progress%20voice%20guidance%20simple%20illustration&image_size=landscape_4_3",
        tip: "导航时注意看路，不要一直盯着手机。",
      },
    ],
  },
  {
    id: "travel-bus",
    categoryId: "travel",
    title: "坐公交地铁",
    description: "用手机刷码乘车，不用带零钱",
    icon: "bus",
    estimatedMinutes: 5,
    steps: [
      {
        id: "step1",
        title: "打开乘车码",
        description: "打开微信或支付宝，找到'乘车码'功能。",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=smartphone%20bus%20QR%20code%20ride%20code%20interface%20simple%20illustration&image_size=landscape_4_3",
      },
      {
        id: "step2",
        title: "领取乘车码",
        description: "第一次使用需要领取您所在城市的乘车码，按提示操作就可以。",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bus%20ride%20code%20activation%20page%20city%20selection%20simple%20illustration&image_size=landscape_4_3",
      },
      {
        id: "step3",
        title: "扫码上车",
        description: "上车时把手机屏幕对准扫码器，听到'嘀'的一声就可以了。",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=person%20scanning%20QR%20code%20on%20bus%20reader%20simple%20illustration&image_size=landscape_4_3",
        tip: "屏幕亮度调亮一些，扫码更容易成功。",
      },
      {
        id: "step4",
        title: "查询公交线路",
        description: "可以用地图APP查公交路线和到站时间，安排出行更方便。",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bus%20route%20app%20showing%20arrival%20times%20simple%20illustration&image_size=landscape_4_3",
      },
    ],
  },
  {
    id: "medical-register",
    categoryId: "medical",
    title: "网上挂号",
    description: "在家就能挂号，不用早早去医院排队",
    icon: "calendar-clock",
    estimatedMinutes: 6,
    steps: [
      {
        id: "step1",
        title: "打开挂号平台",
        description: "可以用微信'医疗健康'或医院的官方APP挂号。",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hospital%20registration%20app%20interface%20simple%20clean%20elderly%20friendly&image_size=landscape_4_3",
      },
      {
        id: "step2",
        title: "选择医院和科室",
        description: "选择您想去的医院，然后选择要看的科室，比如内科、外科。",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hospital%20department%20selection%20list%20simple%20illustration&image_size=landscape_4_3",
      },
      {
        id: "step3",
        title: "选择医生和时间",
        description: "看看哪位医生有号，选择您方便的日期和时间段。",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=doctor%20appointment%20schedule%20calendar%20time%20slots%20simple&image_size=landscape_4_3",
        tip: "专家号比较难挂，可以提前几天预约。",
      },
      {
        id: "step4",
        title: "确认挂号",
        description: "核对信息无误后，点击确认并支付挂号费。",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hospital%20registration%20confirmation%20page%20payment%20simple&image_size=landscape_4_3",
        tip: "挂号成功会有短信提醒，别忘了按时去医院。",
      },
    ],
  },
  {
    id: "payment-utility",
    categoryId: "payment",
    title: "生活缴费",
    description: "在家交水电费、话费，不用跑营业厅",
    icon: "receipt",
    estimatedMinutes: 5,
    steps: [
      {
        id: "step1",
        title: "打开生活缴费",
        description: "打开微信或支付宝，找到'生活缴费'功能。",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=utility%20payment%20app%20interface%20electricity%20water%20gas%20simple&image_size=landscape_4_3",
      },
      {
        id: "step2",
        title: "选择缴费类型",
        description: "选择您要交的费用：电费、水费、燃气费或话费。",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=utility%20bill%20type%20selection%20icons%20simple%20illustration&image_size=landscape_4_3",
      },
      {
        id: "step3",
        title: "输入户号",
        description: "输入您的户号或手机号，确认信息无误。",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=utility%20account%20number%20input%20form%20simple%20illustration&image_size=landscape_4_3",
        tip: "户号可以在账单上找到，输错了就交到别人家了。",
      },
      {
        id: "step4",
        title: "确认缴费",
        description: "核对缴费金额，输入支付密码，完成缴费。",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=utility%20payment%20confirmation%20page%20success%20simple&image_size=landscape_4_3",
        tip: "缴完费可以截图保存，作为缴费凭证。",
      },
    ],
  },
  {
    id: "entertainment-video",
    categoryId: "entertainment",
    title: "看视频听戏曲",
    description: "在线看电视剧、听戏曲，丰富退休生活",
    icon: "tv",
    estimatedMinutes: 4,
    steps: [
      {
        id: "step1",
        title: "打开视频APP",
        description: "打开'抖音'、'快手'或'爱奇艺'等视频应用。",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=video%20streaming%20app%20interface%20entertainment%20content%20simple&image_size=landscape_4_3",
      },
      {
        id: "step2",
        title: "搜索想看的内容",
        description: "点击搜索图标，输入您想看的内容，比如'京剧'或'养生知识'。",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=video%20app%20search%20bar%20with%20beijing%20opera%20search%20simple&image_size=landscape_4_3",
      },
      {
        id: "step3",
        title: "播放视频",
        description: "点击您想看的视频，就可以开始播放了。",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=video%20player%20interface%20playing%20opera%20simple%20illustration&image_size=landscape_4_3",
        tip: "横屏播放画面更大，点击全屏按钮就可以。",
      },
      {
        id: "step4",
        title: "调节音量和进度",
        description: "点击屏幕可以暂停，拖动进度条可以快进快退。",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=video%20player%20controls%20volume%20progress%20bar%20simple%20illustration&image_size=landscape_4_3",
        tip: "看视频注意休息，不要长时间盯着屏幕。",
      },
    ],
  },
];
