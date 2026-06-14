import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  ChevronRight,
  AlertTriangle,
  Shield,
  UserX,
  Coins,
  Link2Off,
  HeartHandshake,
  Users,
  Flame,
} from "lucide-react";
import { scamQuestions, scamCategories, redWordExercises } from "@/data/scams";
import { useAppStore } from "@/store/appStore";

const iconMap: Record<string, React.ElementType> = {
  "user-x": UserX,
  coins: Coins,
  "link-2-off": Link2Off,
  "heart-handshake": HeartHandshake,
  users: Users,
};

const dangerLevelConfig = {
  high: { label: "高危", color: "bg-red-500", textColor: "text-red-600", bgColor: "bg-red-50", borderColor: "border-red-200" },
  medium: { label: "中危", color: "bg-orange-500", textColor: "text-orange-600", bgColor: "bg-orange-50", borderColor: "border-orange-200" },
  warn: { label: "警告", color: "bg-yellow-500", textColor: "text-yellow-600", bgColor: "bg-yellow-50", borderColor: "border-yellow-200" },
};

export default function AntiFraud() {
  const navigate = useNavigate();
  const { progress } = useAppStore();

  const completedCount = progress.completedScamLevels.length;
  const totalCount = scamQuestions.length;
  const totalScore = Object.values(progress.scamScores).reduce((sum, score) => sum + score, 0);
  const completionPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate("/")}
            className="p-2 -ml-2 hover:bg-white/20 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">反诈训练</h1>
            <p className="text-red-100 text-lg">守住养老钱，幸福享晚年</p>
          </div>
        </div>

        <div className="bg-white/15 rounded-2xl p-4 backdrop-blur-sm">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold">{completedCount}/{totalCount}</div>
              <div className="text-red-100 text-base">已通关</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{totalScore}</div>
              <div className="text-red-100 text-base">总积分</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{completionPct}%</div>
              <div className="text-red-100 text-base">完成度</div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-6">
        <div className="bg-white rounded-2xl shadow-lg p-5 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-100 p-2 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">防骗口诀</h2>
              <p className="text-gray-500 text-base">记住这几点，骗子拿你没辙</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="bg-red-50 rounded-xl p-4 border border-red-100">
              <p className="text-red-700 text-lg font-semibold">
                🔔 不听、不信、不转账
              </p>
              <p className="text-red-600 text-base mt-1">
                陌生电话不听信，中奖信息不理睬
              </p>
            </div>
            <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
              <p className="text-orange-700 text-lg font-semibold">
                💰 要钱不给，给钱不要
              </p>
              <p className="text-orange-600 text-base mt-1">
                不转钱，不贪小便宜
              </p>
            </div>
            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
              <p className="text-yellow-700 text-lg font-semibold">
                📞 遇到疑问找家人
              </p>
              <p className="text-yellow-600 text-base mt-1">
                拿不准就问子女，千万别自作主张
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4 px-1">
          骗局分类训练
        </h2>
        <div className="space-y-4">
          {scamCategories.map((category) => {
            const categoryQuestions = scamQuestions.filter((q) => q.categoryId === category.id);
            const completedInCategory = categoryQuestions.filter((q) =>
              progress.completedScamLevels.includes(q.id)
            ).length;
            const totalInCategory = categoryQuestions.length;
            const IconComponent = iconMap[category.icon] || Shield;

            return (
              <button
                key={category.id}
                onClick={() => navigate(`/anti-fraud/${category.id}`)}
                className="w-full bg-white rounded-2xl p-5 text-left shadow-md hover:shadow-lg transform hover:scale-[1.01] active:scale-[0.99] transition-all min-h-[60px]"
              >
                <div className="flex items-center gap-4">
                  <div className={`${category.color} text-white p-4 rounded-2xl`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-gray-800">{category.name}</h3>
                      <span className={`${category.color} text-white text-sm font-semibold px-3 py-1 rounded-full`}>
                        {completedInCategory}/{totalInCategory}
                      </span>
                    </div>
                    <p className="text-gray-500 text-base">{category.description}</p>
                    {totalInCategory > 0 && (
                      <div className="mt-2 w-full bg-gray-100 rounded-full h-2">
                        <div
                          className={`${category.color} h-2 rounded-full transition-all`}
                          style={{ width: `${(completedInCategory / totalInCategory) * 100}%` }}
                        />
                      </div>
                    )}
                  </div>
                  <ChevronRight className="w-7 h-7 text-gray-400 flex-shrink-0" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-4 mt-6">
        <div className="flex items-center gap-2 mb-4 px-1">
          <Flame className="w-6 h-6 text-red-500" />
          <h2 className="text-xl font-bold text-gray-800">反诈红线词专项练习</h2>
        </div>
        <div className="space-y-4">
          {redWordExercises.map((rw) => {
            const isCompleted = progress.completedRedWords.includes(rw.id);
            const danger = dangerLevelConfig[rw.dangerLevel];

            return (
              <button
                key={rw.id}
                onClick={() => navigate(`/anti-fraud/${rw.id}`)}
                className="w-full bg-white rounded-2xl p-5 text-left shadow-md hover:shadow-lg transform hover:scale-[1.01] active:scale-[0.99] transition-all min-h-[60px]"
              >
                <div className="flex items-center gap-4">
                  <div className={`${danger.color} text-white p-3 rounded-2xl`}>
                    <AlertTriangle className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-gray-800">{rw.word}</h3>
                      <span className={`${danger.bgColor} ${danger.textColor} text-sm font-semibold px-3 py-1 rounded-full ${danger.borderColor} border`}>
                        {danger.label}
                      </span>
                      {isCompleted && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                    <p className="text-gray-500 text-base">{rw.description}</p>
                  </div>
                  <ChevronRight className="w-7 h-7 text-gray-400 flex-shrink-0" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {completedCount === totalCount && (
        <div className="px-4 mt-6">
          <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl p-6 text-white text-center shadow-lg">
            <div className="text-5xl mb-3">🏆</div>
            <h3 className="text-2xl font-bold mb-2">反诈达人！</h3>
            <p className="text-green-100 text-lg">
              您已经通关全部 {totalCount} 个骗局训练
            </p>
            <p className="text-green-100 text-base mt-2">
              总积分：{totalScore} 分
            </p>
          </div>
        </div>
      )}

      <div className="px-4 mt-6">
        <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-bold text-blue-800">温馨提示</h3>
          </div>
          <ul className="text-blue-700 text-lg space-y-2">
            <li>• 凡是让您转账汇款的，都是骗子</li>
            <li>• 凡是说您安全账户的，都是骗子</li>
            <li>• 凡是说您涉嫌犯罪的，都是骗子</li>
            <li>• 凡是说您中奖要先交税的，都是骗子</li>
            <li>• 有疑问打 110 报警电话</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
