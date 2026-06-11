import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  MessageCircle,
  Camera,
  MapPin,
  HeartPulse,
  Wallet,
  Music,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import { tutorialCategories, tutorials } from "@/data/tutorials";
import { useAppStore } from "@/store/appStore";

const iconMap: Record<string, typeof BookOpen> = {
  "message-circle": MessageCircle,
  camera: Camera,
  "map-pin": MapPin,
  "heart-pulse": HeartPulse,
  wallet: Wallet,
  music: Music,
};

export default function Tutorials() {
  const navigate = useNavigate();
  const { progress } = useAppStore();

  const getCategoryProgress = (categoryId: string) => {
    const catTutorials = tutorials.filter((t) => t.categoryId === categoryId);
    const completed = catTutorials.filter((t) =>
      progress.completedTutorials.includes(t.id)
    ).length;
    return { completed, total: catTutorials.length };
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="bg-blue-500 text-white p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="p-2 -ml-2 hover:bg-white/20 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
          <h1 className="text-2xl font-bold">手机使用教程</h1>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-2xl shadow-lg p-5 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-100 p-2 rounded-xl">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">全部课程</h2>
              <p className="text-gray-500 text-lg">
                已学 {progress.completedTutorials.length}/{tutorials.length} 个
              </p>
            </div>
          </div>
          <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{
                width: `${tutorials.length > 0 ? (progress.completedTutorials.length / tutorials.length) * 100 : 0}%`,
              }}
            />
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-4 px-1">选择分类</h2>
        <div className="grid gap-4">
          {tutorialCategories.map((category) => {
            const { completed, total } = getCategoryProgress(category.id);
            const Icon = iconMap[category.icon] || BookOpen;
            const allCompleted = completed === total && total > 0;

            return (
              <button
                key={category.id}
                onClick={() => navigate(`/tutorials/${category.id}`)}
                className="bg-white rounded-2xl p-5 text-left shadow-md hover:shadow-lg transition-all transform hover:scale-[1.01] active:scale-[0.99]"
              >
                <div className="flex items-center gap-4">
                  <div className={`${category.color} text-white p-4 rounded-2xl`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-bold text-gray-800">
                        {category.name}
                      </h3>
                      {allCompleted && (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      )}
                    </div>
                    <p className="text-gray-500 text-lg mt-1">
                      {category.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-lg font-semibold text-gray-600">
                        {completed}/{total} 个教程
                      </span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${category.color} rounded-full transition-all`}
                          style={{
                            width: `${total > 0 ? (completed / total) * 100 : 0}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-7 h-7 text-gray-400" />
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 bg-blue-50 rounded-2xl p-5 border border-blue-100">
          <h3 className="text-lg font-bold text-blue-800 mb-2">💡 学习小提示</h3>
          <ul className="text-blue-700 text-lg space-y-2">
            <li>• 每天学一个教程，循序渐进</li>
            <li>• 学完可以让儿女检查您的成果</li>
            <li>• 忘记了可以随时回来再看</li>
            <li>• 有问题点击右上角语音按钮听讲解</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
