import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Shield,
  Users,
  Phone,
  TrendingUp,
  Calendar,
  Award,
  Settings,
  Volume2,
  VolumeX,
  ChevronRight,
} from "lucide-react";
import { useAppStore } from "@/store/appStore";
import { tutorials, tutorialCategories } from "@/data/tutorials";
import { scamQuestions } from "@/data/scams";

export default function Home() {
  const navigate = useNavigate();
  const { progress, voiceEnabled, toggleVoice, fontSize, setFontSize } = useAppStore();

  const completedTutorialsCount = progress.completedTutorials.length;
  const totalTutorials = tutorials.length;
  const completedScamsCount = progress.completedScamLevels.length;
  const totalScams = scamQuestions.length;

  const quickActions = [
    {
      id: "tutorials",
      title: "学用手机",
      description: "微信、拍照、导航...",
      icon: BookOpen,
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      path: "/tutorials",
    },
    {
      id: "anti-fraud",
      title: "防骗训练",
      description: "10种真实骗局闯关",
      icon: Shield,
      color: "bg-red-500",
      hoverColor: "hover:bg-red-600",
      path: "/anti-fraud",
    },
    {
      id: "helpers",
      title: "亲友辅助",
      description: "家人帮您看进度",
      icon: Users,
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      path: "/helpers",
    },
  ];

  const handleQuickAction = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 pb-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">您好，老朋友！👋</h1>
            <p className="text-orange-100 text-lg">今天也要开心学习哦</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={toggleVoice}
              className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors"
              aria-label={voiceEnabled ? "关闭语音" : "开启语音"}
            >
              {voiceEnabled ? (
                <Volume2 className="w-6 h-6" />
              ) : (
                <VolumeX className="w-6 h-6" />
              )}
            </button>
            <button
              onClick={() => navigate("/settings")}
              className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors"
              aria-label="设置"
            >
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="bg-white/15 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5" />
            <span className="text-lg">
              已连续学习 <span className="font-bold text-yellow-300">{progress.streakDays}</span> 天
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <div className="text-3xl font-bold">{completedTutorialsCount}/{totalTutorials}</div>
              <div className="text-orange-100 text-base">已学教程</div>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <div className="text-3xl font-bold">{completedScamsCount}/{totalScams}</div>
              <div className="text-orange-100 text-base">反诈通关</div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-6">
        <div className="bg-white rounded-2xl shadow-lg p-5 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-yellow-100 p-2 rounded-xl">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">学习进度</h2>
              <p className="text-gray-500 text-base">累计学习 {progress.totalStudyMinutes} 分钟</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-base mb-1">
                <span className="text-gray-600">手机教程</span>
                <span className="font-semibold text-blue-600">
                  {completedTutorialsCount}/{totalTutorials} 个
                </span>
              </div>
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${totalTutorials > 0 ? (completedTutorialsCount / totalTutorials) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-base mb-1">
                <span className="text-gray-600">反诈训练</span>
                <span className="font-semibold text-red-600">
                  {completedScamsCount}/{totalScams} 关
                </span>
              </div>
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${totalScams > 0 ? (completedScamsCount / totalScams) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-4 px-1">学什么？</h2>
        <div className="grid gap-4 mb-6">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleQuickAction(action.path)}
              className={`${action.color} ${action.hoverColor} text-white rounded-2xl p-5 text-left transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg`}
            >
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-4 rounded-2xl">
                  <action.icon className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-1">{action.title}</h3>
                  <p className="text-white/80 text-lg">{action.description}</p>
                </div>
                <ChevronRight className="w-8 h-8 opacity-80" />
              </div>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-5 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-100 p-2 rounded-xl">
              <Award className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">今日推荐</h2>
          </div>
          <div className="space-y-3">
            {tutorialCategories.slice(0, 3).map((category) => {
              const catTutorials = tutorials.filter((t) => t.categoryId === category.id);
              const completedInCat = catTutorials.filter((t) =>
                progress.completedTutorials.includes(t.id)
              ).length;

              return (
                <button
                  key={category.id}
                  onClick={() => navigate(`/tutorials/${category.id}`)}
                  className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className={`${category.color} text-white p-3 rounded-xl`}>
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
                    <p className="text-gray-500 text-base">{category.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-700">
                      {completedInCat}/{catTutorials.length}
                    </div>
                    <div className="text-gray-400 text-sm">已完成</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl p-5 text-white shadow-lg mb-6">
          <div className="flex items-center gap-3 mb-3">
            <Phone className="w-6 h-6" />
            <h2 className="text-xl font-bold">紧急求助</h2>
          </div>
          <p className="text-green-100 text-lg mb-4">遇到困难一键联系家人</p>
          <button
            onClick={() => navigate("/helpers")}
            className="w-full bg-white text-green-600 font-bold text-xl py-4 rounded-xl hover:bg-green-50 transition-colors"
          >
            查看紧急联系人
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-5 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">字体大小</h2>
          <div className="flex gap-3">
            {[
              { value: "normal", label: "标准", size: "text-base" },
              { value: "large", label: "大字体", size: "text-lg" },
              { value: "xlarge", label: "特大号", size: "text-xl" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setFontSize(option.value as "normal" | "large" | "xlarge")}
                className={`flex-1 py-4 rounded-xl font-bold transition-all ${
                  fontSize === option.value
                    ? "bg-orange-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                } ${option.size}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
