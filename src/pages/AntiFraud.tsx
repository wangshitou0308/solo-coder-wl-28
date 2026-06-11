import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Shield,
  CheckCircle,
  Star,
  Lock,
  ChevronRight,
  AlertTriangle,
  Award,
} from "lucide-react";
import { scamQuestions } from "@/data/scams";
import { useAppStore } from "@/store/appStore";

const difficultyConfig = {
  easy: { label: "简单", color: "bg-green-500", textColor: "text-green-600", bgColor: "bg-green-50", borderColor: "border-green-200" },
  medium: { label: "中等", color: "bg-yellow-500", textColor: "text-yellow-600", bgColor: "bg-yellow-50", borderColor: "border-yellow-200" },
  hard: { label: "困难", color: "bg-red-500", textColor: "text-red-600", bgColor: "bg-red-50", borderColor: "border-red-200" },
};

export default function AntiFraud() {
  const navigate = useNavigate();
  const { progress } = useAppStore();

  const completedCount = progress.completedScamLevels.length;
  const totalCount = scamQuestions.length;
  const totalScore = Object.values(progress.scamScores).reduce((sum, score) => sum + score, 0);

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
              <div className="text-3xl font-bold">
                {totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%
              </div>
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
          骗局闯关 ({totalCount} 关)
        </h2>
        <div className="space-y-4">
          {scamQuestions.map((scam, index) => {
            const isCompleted = progress.completedScamLevels.includes(scam.id);
            const score = progress.scamScores[scam.id] || 0;
            const difficulty = difficultyConfig[scam.difficulty];
            const isLocked = index > 0 && !progress.completedScamLevels.includes(scamQuestions[index - 1].id);

            return (
              <button
                key={scam.id}
                onClick={() => !isLocked && navigate(`/anti-fraud/${scam.id}`)}
                disabled={isLocked}
                className={`w-full bg-white rounded-2xl p-5 text-left shadow-md transition-all ${
                  isLocked
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:shadow-lg transform hover:scale-[1.01] active:scale-[0.99]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`relative ${
                    isCompleted ? "bg-green-500" : isLocked ? "bg-gray-300" : difficulty.color
                  } text-white p-4 rounded-2xl`}>
                    {isLocked ? (
                      <Lock className="w-8 h-8" />
                    ) : isCompleted ? (
                      <CheckCircle className="w-8 h-8" />
                    ) : (
                      <Shield className="w-8 h-8" />
                    )}
                    <div className="absolute -top-2 -right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                      <span className="text-sm font-bold text-gray-600">{index + 1}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-gray-800">
                        {scam.scenario}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-semibold px-3 py-1 rounded-full ${difficulty.bgColor} ${difficulty.textColor}`}>
                        {difficulty.label}
                      </span>
                      {isCompleted && (
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star className="w-5 h-5 fill-current" />
                          <span className="font-bold text-base">{score}分</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {!isLocked && <ChevronRight className="w-7 h-7 text-gray-400" />}
                </div>
              </button>
            );
          })}
        </div>

        {completedCount === totalCount && (
          <div className="mt-6 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl p-6 text-white text-center shadow-lg">
            <div className="text-5xl mb-3">🏆</div>
            <h3 className="text-2xl font-bold mb-2">反诈达人！</h3>
            <p className="text-green-100 text-lg">
              您已经通关全部 {totalCount} 个骗局训练
            </p>
            <p className="text-green-100 text-base mt-2">
              总积分：{totalScore} 分
            </p>
          </div>
        )}

        <div className="mt-6 bg-blue-50 rounded-2xl p-5 border border-blue-100">
          <div className="flex items-center gap-3 mb-3">
            <Award className="w-6 h-6 text-blue-600" />
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
