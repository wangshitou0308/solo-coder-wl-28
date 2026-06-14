import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Phone,
  Users,
  Plus,
  Trash2,
  User,
  BookOpen,
  Shield,
  Clock,
  Calendar,
  TrendingUp,
  Upload,
  FileText,
  AlertCircle,
  Volume2,
  Play,
  Square,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import { useAppStore } from "@/store/appStore";
import { tutorials, tutorialCategories } from "@/data/tutorials";
import { scamQuestions } from "@/data/scams";
import { useVoice } from "@/hooks/useVoice";

interface StepForm {
  id: string;
  title: string;
  description: string;
  image: string;
  whatIfStuck: string;
  whatIfWrong: string;
  howToConfirm: string;
}

const createEmptyStep = (): StepForm => ({
  id: `step-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  title: "",
  description: "",
  image: "",
  whatIfStuck: "",
  whatIfWrong: "",
  howToConfirm: "",
});

export default function Helpers() {
  const navigate = useNavigate();
  const {
    emergencyContacts,
    helpers,
    progress,
    customTutorials,
    addEmergencyContact,
    removeEmergencyContact,
    addHelper,
    removeHelper,
    addCustomTutorial,
    removeCustomTutorial,
    fontSize,
  } = useAppStore();

  const { isSpeaking, speakSegments, stop } = useVoice();

  const [showAddContact, setShowAddContact] = useState(false);
  const [showAddHelper, setShowAddHelper] = useState(false);
  const [showAddTutorial, setShowAddTutorial] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", phone: "", relationship: "" });
  const [newHelper, setNewHelper] = useState({ name: "", phone: "", relationship: "" });
  const [newTutorial, setNewTutorial] = useState({
    title: "",
    description: "",
    categoryId: "",
    steps: [createEmptyStep()] as StepForm[],
  });
  const [activeTab, setActiveTab] = useState<"contacts" | "progress" | "custom">("contacts");
  const [expandedTutorialId, setExpandedTutorialId] = useState<string | null>(null);
  const [speakingTutorialId, setSpeakingTutorialId] = useState<string | null>(null);

  const completedTutorialsCount = progress.completedTutorials.length;
  const totalTutorials = tutorials.length;
  const completedScamsCount = progress.completedScamLevels.length;
  const totalScams = scamQuestions.length;
  const totalScore = Object.values(progress.scamScores).reduce((sum, score) => sum + score, 0);

  useEffect(() => {
    if (!isSpeaking && speakingTutorialId) {
      setSpeakingTutorialId(null);
    }
  }, [isSpeaking, speakingTutorialId]);

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      addEmergencyContact(newContact);
      setNewContact({ name: "", phone: "", relationship: "" });
      setShowAddContact(false);
    }
  };

  const handleAddHelper = () => {
    if (newHelper.name && newHelper.phone) {
      addHelper(newHelper);
      setNewHelper({ name: "", phone: "", relationship: "" });
      setShowAddHelper(false);
    }
  };

  const updateStep = (stepId: string, field: keyof StepForm, value: string) => {
    setNewTutorial((prev) => ({
      ...prev,
      steps: prev.steps.map((s) => (s.id === stepId ? { ...s, [field]: value } : s)),
    }));
  };

  const addStep = () => {
    setNewTutorial((prev) => ({
      ...prev,
      steps: [...prev.steps, createEmptyStep()],
    }));
  };

  const removeStep = (stepId: string) => {
    setNewTutorial((prev) => ({
      ...prev,
      steps: prev.steps.length > 1 ? prev.steps.filter((s) => s.id !== stepId) : prev.steps,
    }));
  };

  const handleAddTutorial = () => {
    if (newTutorial.title) {
      const steps = newTutorial.steps
        .filter((s) => s.title.trim() || s.description.trim())
        .map((s) => ({
          id: s.id,
          title: s.title,
          description: s.description,
          ...(s.image.trim() ? { image: s.image.trim() } : {}),
          ...(s.whatIfStuck.trim() ? { whatIfStuck: s.whatIfStuck.trim() } : {}),
          ...(s.whatIfWrong.trim() ? { whatIfWrong: s.whatIfWrong.trim() } : {}),
          ...(s.howToConfirm.trim() ? { howToConfirm: s.howToConfirm.trim() } : {}),
        }));
      addCustomTutorial({
        title: newTutorial.title,
        description: newTutorial.description,
        categoryId: newTutorial.categoryId || "custom",
        steps,
      });
      setNewTutorial({
        title: "",
        description: "",
        categoryId: "",
        steps: [createEmptyStep()],
      });
      setShowAddTutorial(false);
    }
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleReadAloud = (tutorial: (typeof customTutorials)[number]) => {
    if (isSpeaking && speakingTutorialId === tutorial.id) {
      stop();
      setSpeakingTutorialId(null);
    } else {
      const segments = [
        `${tutorial.title}. ${tutorial.description}`,
        ...tutorial.steps.map((step, i) => {
          let text = `第${i + 1}步: ${step.title}. ${step.description}`;
          if (step.whatIfStuck) text += `. 如果卡住了: ${step.whatIfStuck}`;
          if (step.whatIfWrong) text += `. 如果出错了: ${step.whatIfWrong}`;
          if (step.howToConfirm) text += `. 确认方法: ${step.howToConfirm}`;
          return text;
        }),
      ];
      speakSegments(segments);
      setSpeakingTutorialId(tutorial.id);
    }
  };

  const textSizeClass = fontSize === "xlarge" ? "text-xl" : fontSize === "large" ? "text-lg" : "text-base";

  const tabs = [
    { id: "contacts", label: "紧急联系人", icon: Phone },
    { id: "progress", label: "学习进度", icon: TrendingUp },
    { id: "custom", label: "自定义教程", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="bg-green-500 text-white p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="p-2 -ml-2 hover:bg-white/20 rounded-xl transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">亲友辅助</h1>
            <p className="text-green-100 text-lg">家人陪伴，学习更安心</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm sticky top-16 z-10">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 font-bold text-lg transition-all min-h-[48px] ${
                activeTab === tab.id
                  ? "text-green-600 border-b-4 border-green-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {activeTab === "contacts" && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">紧急呼叫</h2>
                  <p className="text-red-100 text-lg">遇到问题一键联系</p>
                </div>
              </div>
              <button
                onClick={() => {
                  if (emergencyContacts.length > 0) {
                    handleCall(emergencyContacts[0].phone);
                  } else {
                    setShowAddContact(true);
                  }
                }}
                className="w-full bg-white text-red-600 font-bold text-2xl py-5 rounded-xl hover:bg-red-50 transition-all active:scale-95 flex items-center justify-center gap-3 min-h-[56px]"
              >
                <Phone className="w-8 h-8" />
                {emergencyContacts.length > 0
                  ? `呼叫 ${emergencyContacts[0].name}`
                  : "添加紧急联系人"}
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-xl">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">
                    紧急联系人 ({emergencyContacts.length})
                  </h2>
                </div>
                <button
                  onClick={() => setShowAddContact(true)}
                  className="bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
                >
                  <Plus className="w-6 h-6" />
                </button>
              </div>

              {emergencyContacts.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <Users className="w-16 h-16 mx-auto mb-3 opacity-50" />
                  <p className="text-lg">还没有添加紧急联系人</p>
                  <p className="text-base">点击右上角加号添加</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {emergencyContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white">
                        <User className="w-8 h-8" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800">
                          {contact.name}
                        </h3>
                        <p className="text-gray-500 text-lg">{contact.relationship}</p>
                        <p className="text-blue-600 text-lg font-semibold">
                          {contact.phone}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleCall(contact.phone)}
                          className="bg-green-500 text-white p-3 rounded-xl hover:bg-green-600 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
                        >
                          <Phone className="w-6 h-6" />
                        </button>
                        <button
                          onClick={() => removeEmergencyContact(contact.id)}
                          className="bg-red-100 text-red-500 p-3 rounded-xl hover:bg-red-200 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
                        >
                          <Trash2 className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-xl">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">
                    辅助者 ({helpers.length})
                  </h2>
                </div>
                <button
                  onClick={() => setShowAddHelper(true)}
                  className="bg-purple-500 text-white p-3 rounded-xl hover:bg-purple-600 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
                >
                  <Plus className="w-6 h-6" />
                </button>
              </div>
              <p className="text-gray-500 text-lg mb-4">
                子女或志愿者可以查看学习进度、上传自定义教程
              </p>

              {helpers.length === 0 ? (
                <div className="text-center py-6 text-gray-400">
                  <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-base">还没有添加辅助者</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {helpers.map((helper) => (
                    <div
                      key={helper.id}
                      className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white">
                        <User className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800">
                          {helper.name}
                        </h3>
                        <p className="text-gray-500 text-base">{helper.relationship}</p>
                      </div>
                      <button
                        onClick={() => removeHelper(helper.id)}
                        className="text-red-400 hover:text-red-600 p-3 min-h-[48px] min-w-[48px] flex items-center justify-center"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "progress" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-yellow-100 p-2 rounded-xl">
                  <Calendar className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">学习概况</h2>
                  <p className="text-gray-500 text-base">坚持学习，天天进步</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl p-4 text-white text-center">
                  <div className="text-4xl font-bold mb-1">{progress.streakDays}</div>
                  <div className="text-orange-100 text-base">连续学习天数</div>
                </div>
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-4 text-white text-center">
                  <div className="text-4xl font-bold mb-1">{progress.totalStudyMinutes}</div>
                  <div className="text-blue-100 text-base">累计学习分钟</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 p-2 rounded-xl">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">手机教程进度</h2>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-lg mb-2">
                  <span className="text-gray-600">总体进度</span>
                  <span className="font-bold text-blue-600">
                    {completedTutorialsCount}/{totalTutorials} 个
                  </span>
                </div>
                <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{
                      width: `${totalTutorials > 0 ? (completedTutorialsCount / totalTutorials) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                {tutorialCategories.map((category) => {
                  const catTutorials = tutorials.filter((t) => t.categoryId === category.id);
                  const completed = catTutorials.filter((t) =>
                    progress.completedTutorials.includes(t.id)
                  ).length;

                  return (
                    <div
                      key={category.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                    >
                      <div className={`${category.color} text-white p-2 rounded-lg`}>
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="font-semibold text-gray-700 text-base">
                            {category.name}
                          </span>
                          <span className="text-sm text-gray-500">
                            {completed}/{catTutorials.length}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${category.color} rounded-full`}
                            style={{
                              width: `${catTutorials.length > 0 ? (completed / catTutorials.length) * 100 : 0}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-100 p-2 rounded-xl">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">反诈训练进度</h2>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-red-50 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-red-600">
                    {completedScamsCount}/{totalScams}
                  </div>
                  <div className="text-red-500 text-base">已通关</div>
                </div>
                <div className="bg-yellow-50 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-yellow-600">
                    {totalScore}
                  </div>
                  <div className="text-yellow-500 text-base">总积分</div>
                </div>
              </div>

              <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                  style={{
                    width: `${totalScams > 0 ? (completedScamsCount / totalScams) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 p-2 rounded-xl">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">最近学习</h2>
              </div>

              {progress.completedTutorials.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-base">还没有学习记录</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {progress.completedTutorials.slice(-5).reverse().map((tutorialId) => {
                    const tutorial = tutorials.find((t) => t.id === tutorialId);
                    if (!tutorial) return null;
                    const category = tutorialCategories.find(
                      (c) => c.id === tutorial.categoryId
                    );

                    return (
                      <div
                        key={tutorialId}
                        className="flex items-center gap-3 p-3 bg-green-50 rounded-xl"
                      >
                        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 text-base">
                            {tutorial.title}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {category?.name || "未分类"}
                          </p>
                        </div>
                        <div className="text-green-500">
                          <Clock className="w-5 h-5" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "custom" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-teal-100 p-2 rounded-xl">
                    <FileText className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">自定义教程</h2>
                    <p className="text-gray-500 text-base">
                      亲友上传的家电说明书等
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddTutorial(true)}
                  className="bg-teal-500 text-white p-3 rounded-xl hover:bg-teal-600 transition-colors flex items-center gap-2 min-h-[48px]"
                >
                  <Upload className="w-5 h-5" />
                  <span className="font-semibold">上传</span>
                </button>
              </div>

              {customTutorials.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                  <FileText className="w-16 h-16 mx-auto mb-3 opacity-50" />
                  <p className="text-lg">还没有自定义教程</p>
                  <p className="text-base">
                    让子女帮您上传家电说明书等教程
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {customTutorials.map((tutorial) => {
                    const isExpanded = expandedTutorialId === tutorial.id;
                    const isSpeakingThis = isSpeaking && speakingTutorialId === tutorial.id;
                    const category = tutorialCategories.find((c) => c.id === tutorial.categoryId);

                    return (
                      <div
                        key={tutorial.id}
                        className="rounded-xl border border-teal-100 overflow-hidden bg-teal-50"
                      >
                        <div
                          className="p-4 cursor-pointer"
                          onClick={() => setExpandedTutorialId(isExpanded ? null : tutorial.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <h3 className="text-lg font-bold text-gray-800">
                                  {tutorial.title}
                                </h3>
                                {category && (
                                  <span className={`${category.color} text-white text-xs px-2 py-0.5 rounded-full`}>
                                    {category.name}
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-500 text-base">
                                {tutorial.description}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleReadAloud(tutorial);
                                }}
                                className={`flex items-center justify-center gap-1 px-3 py-2 rounded-xl font-bold text-base min-h-[48px] transition-all ${
                                  isSpeakingThis
                                    ? "bg-red-100 text-red-600 hover:bg-red-200"
                                    : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                                }`}
                              >
                                {isSpeakingThis ? (
                                  <Square className="w-5 h-5" />
                                ) : (
                                  <Volume2 className="w-5 h-5" />
                                )}
                                {isSpeakingThis ? "停止" : "朗读"}
                              </button>
                              <div className="text-gray-400">
                                {isExpanded ? (
                                  <ChevronUp className="w-6 h-6" />
                                ) : (
                                  <ChevronDown className="w-6 h-6" />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="px-4 pb-4 space-y-3">
                            {tutorial.steps.length > 0 ? (
                              tutorial.steps.map((step, index) => (
                                <div
                                  key={step.id}
                                  className="bg-white rounded-xl p-4 border border-gray-100"
                                >
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                                      {index + 1}
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-800">
                                      {step.title}
                                    </h4>
                                  </div>
                                  <p className={`${textSizeClass} text-gray-700 mb-2`}>
                                    {step.description}
                                  </p>
                                  {step.image && (
                                    <img
                                      src={step.image}
                                      alt={step.title}
                                      className="w-full rounded-lg border border-gray-200 mb-2 max-h-48 object-cover"
                                    />
                                  )}
                                  {(step.whatIfStuck || step.whatIfWrong || step.howToConfirm) && (
                                    <div className="space-y-2 mt-3">
                                      {step.whatIfStuck && (
                                        <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-100">
                                          <p className="text-sm font-semibold text-yellow-800 mb-0.5">卡住了怎么办</p>
                                          <p className="text-sm text-yellow-700">{step.whatIfStuck}</p>
                                        </div>
                                      )}
                                      {step.whatIfWrong && (
                                        <div className="bg-red-50 rounded-lg p-3 border border-red-100">
                                          <p className="text-sm font-semibold text-red-800 mb-0.5">出错了怎么办</p>
                                          <p className="text-sm text-red-700">{step.whatIfWrong}</p>
                                        </div>
                                      )}
                                      {step.howToConfirm && (
                                        <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                                          <p className="text-sm font-semibold text-green-800 mb-0.5">如何确认完成</p>
                                          <p className="text-sm text-green-700">{step.howToConfirm}</p>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              ))
                            ) : (
                              <p className="text-gray-400 text-center py-4">暂无步骤</p>
                            )}
                            <div className="flex justify-end pt-2">
                              <button
                                onClick={() => removeCustomTutorial(tutorial.id)}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors min-h-[48px] font-semibold"
                              >
                                <Trash2 className="w-5 h-5" />
                                删除教程
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
              <h3 className="text-lg font-bold text-blue-800 mb-3">💡 提示</h3>
              <ul className="text-blue-700 text-lg space-y-2">
                <li>• 可以让子女帮您上传家电使用说明</li>
                <li>• 可以添加常用APP的操作步骤</li>
                <li>• 有了自定义教程，忘记了随时看</li>
                <li>• 点击朗读按钮可以听教程步骤</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {showAddContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">添加紧急联系人</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  姓名
                </label>
                <input
                  type="text"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  placeholder="如：儿子"
                  className="w-full p-5 text-xl border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none min-h-[48px]"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  电话
                </label>
                <input
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  placeholder="请输入手机号"
                  className="w-full p-5 text-xl border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none min-h-[48px]"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  关系
                </label>
                <input
                  type="text"
                  value={newContact.relationship}
                  onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                  placeholder="如：儿子、女儿、老伴"
                  className="w-full p-5 text-xl border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none min-h-[48px]"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddContact(false)}
                className="flex-1 py-4 rounded-xl font-bold text-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors min-h-[56px]"
              >
                取消
              </button>
              <button
                onClick={handleAddContact}
                className="flex-1 py-4 rounded-xl font-bold text-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors min-h-[56px]"
              >
                添加
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddHelper && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">添加辅助者</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  姓名
                </label>
                <input
                  type="text"
                  value={newHelper.name}
                  onChange={(e) => setNewHelper({ ...newHelper, name: e.target.value })}
                  placeholder="如：小明"
                  className="w-full p-5 text-xl border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none min-h-[48px]"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  电话
                </label>
                <input
                  type="tel"
                  value={newHelper.phone}
                  onChange={(e) => setNewHelper({ ...newHelper, phone: e.target.value })}
                  placeholder="请输入手机号"
                  className="w-full p-5 text-xl border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none min-h-[48px]"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  关系
                </label>
                <input
                  type="text"
                  value={newHelper.relationship}
                  onChange={(e) => setNewHelper({ ...newHelper, relationship: e.target.value })}
                  placeholder="如：儿子、女儿、志愿者"
                  className="w-full p-5 text-xl border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none min-h-[48px]"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddHelper(false)}
                className="flex-1 py-4 rounded-xl font-bold text-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors min-h-[56px]"
              >
                取消
              </button>
              <button
                onClick={handleAddHelper}
                className="flex-1 py-4 rounded-xl font-bold text-xl bg-purple-500 text-white hover:bg-purple-600 transition-colors min-h-[56px]"
              >
                添加
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddTutorial && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">上传自定义教程</h2>
              <button
                onClick={() => setShowAddTutorial(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  教程标题 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newTutorial.title}
                  onChange={(e) => setNewTutorial({ ...newTutorial, title: e.target.value })}
                  placeholder="如：电饭煲使用说明"
                  className="w-full p-5 text-xl border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none min-h-[48px]"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  简介
                </label>
                <input
                  type="text"
                  value={newTutorial.description}
                  onChange={(e) => setNewTutorial({ ...newTutorial, description: e.target.value })}
                  placeholder="简短描述一下"
                  className="w-full p-5 text-xl border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none min-h-[48px]"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  分类
                </label>
                <select
                  value={newTutorial.categoryId}
                  onChange={(e) => setNewTutorial({ ...newTutorial, categoryId: e.target.value })}
                  className="w-full p-5 text-xl border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none min-h-[48px] bg-white"
                >
                  <option value="">请选择分类</option>
                  {tutorialCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                  <option value="custom">自定义</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-lg font-semibold text-gray-700">
                    教程步骤
                  </label>
                  <button
                    onClick={addStep}
                    className="flex items-center gap-1 px-3 py-2 bg-teal-100 text-teal-700 rounded-xl hover:bg-teal-200 transition-colors font-semibold min-h-[48px]"
                  >
                    <Plus className="w-5 h-5" />
                    添加步骤
                  </button>
                </div>

                <div className="space-y-4">
                  {newTutorial.steps.map((step, stepIndex) => (
                    <div
                      key={step.id}
                      className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-bold text-gray-700 text-lg">
                          第 {stepIndex + 1} 步
                        </span>
                        {newTutorial.steps.length > 1 && (
                          <button
                            onClick={() => removeStep(step.id)}
                            className="flex items-center gap-1 px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors min-h-[48px] font-semibold"
                          >
                            <Trash2 className="w-4 h-4" />
                            删除
                          </button>
                        )}
                      </div>

                      <div className="space-y-3">
                        <input
                          type="text"
                          value={step.title}
                          onChange={(e) => updateStep(step.id, "title", e.target.value)}
                          placeholder="步骤标题"
                          className="w-full p-5 text-xl border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none min-h-[48px]"
                        />
                        <textarea
                          value={step.description}
                          onChange={(e) => updateStep(step.id, "description", e.target.value)}
                          placeholder="步骤描述"
                          rows={3}
                          className="w-full p-5 text-xl border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none resize-none min-h-[48px]"
                        />
                        <input
                          type="text"
                          value={step.image}
                          onChange={(e) => updateStep(step.id, "image", e.target.value)}
                          placeholder="图片URL（可选，粘贴图片链接）"
                          className="w-full p-5 text-xl border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none min-h-[48px]"
                        />

                        <div className="space-y-2 pt-2 border-t border-gray-200">
                          <p className="text-sm font-semibold text-gray-500">可选帮助信息</p>
                          <input
                            type="text"
                            value={step.whatIfStuck}
                            onChange={(e) => updateStep(step.id, "whatIfStuck", e.target.value)}
                            placeholder="卡住了怎么办（可选）"
                            className="w-full p-5 text-xl border-2 border-yellow-200 rounded-xl focus:border-yellow-400 focus:outline-none min-h-[48px]"
                          />
                          <input
                            type="text"
                            value={step.whatIfWrong}
                            onChange={(e) => updateStep(step.id, "whatIfWrong", e.target.value)}
                            placeholder="出错了怎么办（可选）"
                            className="w-full p-5 text-xl border-2 border-red-200 rounded-xl focus:border-red-400 focus:outline-none min-h-[48px]"
                          />
                          <input
                            type="text"
                            value={step.howToConfirm}
                            onChange={(e) => updateStep(step.id, "howToConfirm", e.target.value)}
                            placeholder="如何确认完成（可选）"
                            className="w-full p-5 text-xl border-2 border-green-200 rounded-xl focus:border-green-400 focus:outline-none min-h-[48px]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddTutorial(false)}
                className="flex-1 py-4 rounded-xl font-bold text-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors min-h-[56px]"
              >
                取消
              </button>
              <button
                onClick={handleAddTutorial}
                className="flex-1 py-4 rounded-xl font-bold text-xl bg-teal-500 text-white hover:bg-teal-600 transition-colors min-h-[56px]"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
