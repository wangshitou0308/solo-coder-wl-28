import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  CheckCircle,
  Play,
  MessageCircle,
  Camera,
  MapPin,
  HeartPulse,
  Wallet,
  Music,
  Video,
  Share2,
  User,
  Map,
  Bus,
  CalendarClock,
  Receipt,
  Tv,
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
  "message-square": MessageCircle,
  video: Video,
  "share-2": Share2,
  user: User,
  map: Map,
  bus: Bus,
  "calendar-clock": CalendarClock,
  receipt: Receipt,
  tv: Tv,
};

export default function CategoryDetail() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { progress } = useAppStore();

  const category = tutorialCategories.find((c) => c.id === categoryId);
  const categoryTutorials = tutorials.filter((t) => t.categoryId === categoryId);

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-gray-500">分类不存在</p>
      </div>
    );
  }

  const completedCount = categoryTutorials.filter((t) =>
    progress.completedTutorials.includes(t.id)
  ).length;

  const Icon = iconMap[category.icon] || BookOpen;

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className={`${category.color} text-white p-4 sticky top-0 z-10`}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/tutorials")}
            className="p-2 -ml-2 hover:bg-white/20 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">{category.name}</h1>
            <p className="text-white/80 text-lg">{category.description}</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-2xl shadow-lg p-5 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className={`${category.color} text-white p-4 rounded-2xl`}>
              <Icon className="w-10 h-10" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800">
                {completedCount}/{categoryTutorials.length} 个教程
              </h2>
              <p className="text-gray-500 text-lg">
                已完成 {Math.round((completedCount / categoryTutorials.length) * 100)}%
              </p>
            </div>
          </div>
          <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${category.color} rounded-full transition-all duration-500`}
              style={{
                width: `${categoryTutorials.length > 0 ? (completedCount / categoryTutorials.length) * 100 : 0}%`,
              }}
            />
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-4 px-1">教程列表</h2>
        <div className="space-y-4">
          {categoryTutorials.map((tutorial, index) => {
            const isCompleted = progress.completedTutorials.includes(tutorial.id);
            const TutorialIcon = iconMap[tutorial.icon] || BookOpen;

            return (
              <button
                key={tutorial.id}
                onClick={() => navigate(`/tutorial/${tutorial.id}`)}
                className="w-full bg-white rounded-2xl p-5 text-left shadow-md hover:shadow-lg transition-all transform hover:scale-[1.01] active:scale-[0.99]"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div
                      className={`${
                        isCompleted ? "bg-green-500" : category.color
                      } text-white p-4 rounded-2xl`}
                    >
                      <TutorialIcon className="w-8 h-8" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow">
                      <span className="text-lg font-bold text-gray-600">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-gray-800">
                        {tutorial.title}
                      </h3>
                      {isCompleted && (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      )}
                    </div>
                    <p className="text-gray-500 text-lg mt-1">
                      {tutorial.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-gray-400">
                      <Clock className="w-5 h-5" />
                      <span className="text-base">约 {tutorial.estimatedMinutes} 分钟</span>
                      <span className="mx-2">·</span>
                      <span className="text-base">{tutorial.steps.length} 个步骤</span>
                    </div>
                  </div>
                  <div className={`${isCompleted ? "bg-green-500" : category.color} text-white p-3 rounded-full`}>
                    <Play className="w-6 h-6" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {completedCount === categoryTutorials.length && categoryTutorials.length > 0 && (
          <div className="mt-6 bg-green-50 rounded-2xl p-6 border-2 border-green-200 text-center">
            <div className="text-5xl mb-3">🎉</div>
            <h3 className="text-2xl font-bold text-green-700 mb-2">太棒了！</h3>
            <p className="text-green-600 text-lg">
              您已经学完了所有「{category.name}」的教程
            </p>
            <p className="text-green-500 text-base mt-2">
              可以去其他分类继续学习哦
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
