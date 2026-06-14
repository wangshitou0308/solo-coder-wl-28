import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Settings as SettingsIcon,
  Volume2,
  Type,
  Info,
  Trash2,
  ChevronRight,
  Repeat,
  ListChecks,
  BookOpen,
} from "lucide-react";
import { useAppStore } from "@/store/appStore";

export default function Settings() {
  const navigate = useNavigate();
  const {
    fontSize,
    setFontSize,
    voiceEnabled,
    toggleVoice,
    voiceSpeed,
    setVoiceSpeed,
    voiceRepeat,
    setVoiceRepeat,
    voiceReadStepOnly,
    setVoiceReadStepOnly,
    setOnboardingSeen,
  } = useAppStore();

  const handleClearData = () => {
    if (confirm("确定要清除所有学习数据吗？此操作不可撤销。")) {
      localStorage.removeItem("elderly-learning-app");
      window.location.reload();
    }
  };

  const handleReViewOnboarding = () => {
    setOnboardingSeen(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="bg-gray-700 text-white p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="p-2 -ml-2 hover:bg-white/20 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
          <div className="flex items-center gap-3">
            <SettingsIcon className="w-7 h-7" />
            <h1 className="text-2xl font-bold">设置</h1>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">显示设置</h2>
          </div>

          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-xl">
                  <Type className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">字体大小</h3>
                  <p className="text-gray-500 text-base">调整文字大小，看得更清楚</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              {[
                { value: "normal", label: "标准" },
                { value: "large", label: "大字体" },
                { value: "xlarge", label: "特大号" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFontSize(option.value as "normal" | "large" | "xlarge")}
                  className={`flex-1 py-3 min-h-[48px] rounded-xl font-bold text-lg transition-all ${
                    fontSize === option.value
                      ? "bg-blue-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">语音设置</h2>
          </div>

          <button
            onClick={toggleVoice}
            className="w-full p-5 min-h-[56px] flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-xl">
                <Volume2 className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-800">语音朗读</h3>
                <p className="text-gray-500 text-base">学习时自动朗读内容</p>
              </div>
            </div>
            <div className={`w-14 h-8 rounded-full relative transition-colors ${
              voiceEnabled ? "bg-green-500" : "bg-gray-300"
            }`}>
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all ${
                voiceEnabled ? "left-7" : "left-1"
              }`} />
            </div>
          </button>

          <div className="border-t border-gray-100" />

          <div className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-100 p-2 rounded-xl">
                <Volume2 className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">朗读速度</h3>
                <p className="text-gray-500 text-base">选择适合的语速</p>
              </div>
            </div>
            <div className="flex gap-3">
              {[
                { value: "slow" as const, label: "慢速" },
                { value: "normal" as const, label: "正常" },
                { value: "fast" as const, label: "快速" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setVoiceSpeed(option.value)}
                  className={`flex-1 py-3 min-h-[48px] rounded-xl font-bold text-lg transition-all ${
                    voiceSpeed === option.value
                      ? "bg-amber-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-100" />

          <button
            onClick={() => setVoiceRepeat(!voiceRepeat)}
            className="w-full p-5 min-h-[56px] flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded-xl">
                <Repeat className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-800">重复朗读</h3>
                <p className="text-gray-500 text-base">自动重复朗读内容</p>
              </div>
            </div>
            <div className={`w-14 h-8 rounded-full relative transition-colors ${
              voiceRepeat ? "bg-indigo-500" : "bg-gray-300"
            }`}>
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all ${
                voiceRepeat ? "left-7" : "left-1"
              }`} />
            </div>
          </button>

          <div className="border-t border-gray-100" />

          <button
            onClick={() => setVoiceReadStepOnly(!voiceReadStepOnly)}
            className="w-full p-5 min-h-[56px] flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="bg-teal-100 p-2 rounded-xl">
                <ListChecks className="w-6 h-6 text-teal-600" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-800">只读本步骤</h3>
                <p className="text-gray-500 text-base">仅朗读当前步骤内容</p>
              </div>
            </div>
            <div className={`w-14 h-8 rounded-full relative transition-colors ${
              voiceReadStepOnly ? "bg-teal-500" : "bg-gray-300"
            }`}>
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all ${
                voiceReadStepOnly ? "left-7" : "left-1"
              }`} />
            </div>
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">关于</h2>
          </div>

          <div className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-100 p-3 rounded-2xl">
                <Info className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">银龄学堂</h3>
                <p className="text-gray-500 text-base">版本 1.0.0</p>
              </div>
            </div>
            <p className="text-gray-600 text-base leading-relaxed">
              专为老年人打造的智能手机学习平台，帮助您轻松跨越数字鸿沟，守住养老钱。
            </p>
          </div>

          <div className="border-t border-gray-100" />

          <button
            onClick={handleReViewOnboarding}
            className="w-full p-5 min-h-[56px] flex items-center gap-3 hover:bg-gray-50 transition-colors"
          >
            <div className="bg-purple-100 p-2 rounded-xl">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-left flex-1">
              <h3 className="text-lg font-semibold text-gray-800">查看新手引导</h3>
              <p className="text-gray-500 text-base">重新查看应用使用指引</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300" />
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <button
            onClick={handleClearData}
            className="w-full p-5 min-h-[56px] flex items-center gap-3 text-red-500 hover:bg-red-50 transition-colors"
          >
            <div className="bg-red-100 p-2 rounded-xl">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <div className="text-left flex-1">
              <h3 className="text-lg font-semibold">清除学习数据</h3>
              <p className="text-red-400 text-base">重置所有学习进度和设置</p>
            </div>
            <ChevronRight className="w-5 h-5 text-red-300" />
          </button>
        </div>

        <div className="text-center text-gray-400 text-base py-4">
          <p>用心关爱每一位老人 ❤️</p>
        </div>
      </div>
    </div>
  );
}
