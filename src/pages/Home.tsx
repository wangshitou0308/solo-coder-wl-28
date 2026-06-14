import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Shield,
  Users,
  Settings,
  Volume2,
  VolumeX,
  ChevronRight,
  ChevronDown,
  Calendar,
  PlayCircle,
} from "lucide-react";
import { useAppStore } from "@/store/appStore";
import { tutorials, tutorialCategories } from "@/data/tutorials";
import { scamQuestions } from "@/data/scams";
import { useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const { progress, voiceEnabled, toggleVoice } = useAppStore();
  const [showProgress, setShowProgress] = useState(false);

  const completedTutorialsCount = progress.completedTutorials.length;
  const totalTutorials = tutorials.length;
  const completedScamsCount = progress.completedScamLevels.length;
  const totalScams = scamQuestions.length;

  const currentTutorial = progress.currentTutorial
    ? tutorials.find((t) => t.id === progress.currentTutorial)
    : null;

  const mainButtons = [
    {
      id: "learn-phone",
      title: "学手机",
      description: "微信聊天、拍照修图、出行导航…",
      icon: BookOpen,
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      path: "/tutorials",
    },
    {
      id: "anti-fraud",
      title: "防诈骗",
      description: "识别骗局、反诈闯关训练",
      icon: Shield,
      color: "bg-red-500",
      hoverColor: "hover:bg-red-600",
      path: "/anti-fraud",
    },
    {
      id: "find-family",
      title: "找家人",
      description: "联系亲友、紧急求助",
      icon: Users,
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      path: "/helpers",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 pb-8">
        <div className="flex justify-between items-center">
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
      </div>

      <div className="px-4 -mt-4 space-y-4">
        {currentTutorial && (
          <button
            onClick={() => navigate(`/tutorial/${progress.currentTutorial}`)}
            className="w-full bg-white rounded-2xl shadow-lg p-5 flex items-center gap-4 text-left hover:shadow-xl transition-shadow active:scale-[0.98]"
          >
            <div className="bg-orange-100 p-3 rounded-2xl">
              <PlayCircle className="w-8 h-8 text-orange-500" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-gray-800">继续上次学习</h2>
              <p className="text-gray-500 text-base truncate">
                {currentTutorial.title}
              </p>
            </div>
            <ChevronRight className="w-7 h-7 text-gray-400 flex-shrink-0" />
          </button>
        )}

        <div className="space-y-4">
          {mainButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => navigate(btn.path)}
              className={`w-full ${btn.color} ${btn.hoverColor} text-white rounded-2xl p-6 text-left transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg min-h-[60px]`}
            >
              <div className="flex items-center gap-5">
                <div className="bg-white/20 p-5 rounded-2xl">
                  <btn.icon className="w-10 h-10" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-1">{btn.title}</h3>
                  <p className="text-white/80 text-lg">{btn.description}</p>
                </div>
                <ChevronRight className="w-8 h-8 opacity-80" />
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowProgress(!showProgress)}
          className="w-full flex items-center justify-center gap-2 py-3 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <span className="text-base">
            已连续学习 <span className="font-bold text-orange-500">{progress.streakDays}</span> 天
          </span>
          {showProgress ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>

        {showProgress && (
          <div className="bg-white rounded-2xl shadow-lg p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-500" />
              <span className="text-base text-gray-600">
                累计学习 {progress.totalStudyMinutes} 分钟
              </span>
            </div>
            <div>
              <div className="flex justify-between text-base mb-1">
                <span className="text-gray-600">手机教程</span>
                <span className="font-semibold text-blue-600">
                  {completedTutorialsCount}/{totalTutorials} 个
                </span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
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
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${totalScams > 0 ? (completedScamsCount / totalScams) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
