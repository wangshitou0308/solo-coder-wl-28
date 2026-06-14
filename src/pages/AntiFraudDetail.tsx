import { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  X,
  AlertTriangle,
  Lightbulb,
  Volume2,
  VolumeX,
  RefreshCw,
  Trophy,
  ChevronRight,
  User,
  Bot,
  Shield,
  UserX,
  Coins,
  Link2Off,
  HeartHandshake,
  Users,
  Repeat,
  CheckCircle,
} from "lucide-react";
import {
  scamQuestions,
  scamCategories,
  redWordExercises,
  getQuestionsByCategory,
  getCategoryById,
  type ScamCategoryId,
  type ScamQuestionType,
  questionTypeLabels,
} from "@/data/scams";
import { useAppStore } from "@/store/appStore";
import { useVoice } from "@/hooks/useVoice";

const iconMap: Record<string, React.ElementType> = {
  "user-x": UserX,
  coins: Coins,
  "link-2-off": Link2Off,
  "heart-handshake": HeartHandshake,
  users: Users,
};

const dangerLevelConfig = {
  high: { label: "高危", color: "bg-red-500", textColor: "text-red-600", bgColor: "bg-red-50" },
  medium: { label: "中危", color: "bg-orange-500", textColor: "text-orange-600", bgColor: "bg-orange-50" },
  warn: { label: "警告", color: "bg-yellow-500", textColor: "text-yellow-600", bgColor: "bg-yellow-50" },
};

const difficultyConfig = {
  easy: { label: "简单", color: "bg-green-100 text-green-700" },
  medium: { label: "中等", color: "bg-yellow-100 text-yellow-700" },
  hard: { label: "困难", color: "bg-red-100 text-red-700" },
};

const typeOrder: ScamQuestionType[] = ["identify", "judge", "scenario", "review"];

export default function AntiFraudDetail() {
  const { scamId } = useParams<{ scamId: string }>();
  const navigate = useNavigate();
  const {
    completeScamLevel,
    completeRedWord,
    voiceEnabled,
    voiceSpeed,
    setVoiceSpeed,
    voiceRepeat,
    setVoiceRepeat,
    progress,
    fontSize,
  } = useAppStore();
  const voice = useVoice();

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showAllDialogues, setShowAllDialogues] = useState(false);
  const [repeatOn, setRepeatOn] = useState(voiceRepeat);
  const dialogueContainerRef = useRef<HTMLDivElement>(null);

  const isCategory = scamCategories.some((c) => c.id === scamId);
  const isRedWord = scamId?.startsWith("rw-");
  const scam = !isCategory && !isRedWord ? scamQuestions.find((s) => s.id === scamId) : null;

  const category = isCategory ? getCategoryById(scamId as ScamCategoryId) : null;
  const redWord = isRedWord ? redWordExercises.find((r) => r.id === scamId) : null;

  useEffect(() => {
    setSelectedAnswer(null);
    setShowResult(false);
    setShowExplanation(false);
    setIsCorrect(false);
    setDialogueIndex(0);
    setShowAllDialogues(false);
    voice.stop();
  }, [scamId]);

  useEffect(() => {
    if (showAllDialogues && dialogueContainerRef.current) {
      dialogueContainerRef.current.scrollTop = dialogueContainerRef.current.scrollHeight;
    }
  }, [showAllDialogues, dialogueIndex]);

  const categoryQuestions = useMemo(() => {
    if (!isCategory || !scamId) return [];
    return getQuestionsByCategory(scamId as ScamCategoryId);
  }, [isCategory, scamId]);

  const groupedQuestions = useMemo(() => {
    const groups: Partial<Record<ScamQuestionType, typeof categoryQuestions>> = {};
    typeOrder.forEach((type) => {
      const qs = categoryQuestions.filter((q) => q.type === type);
      if (qs.length > 0) groups[type] = qs;
    });
    return groups;
  }, [categoryQuestions]);

  const questionSegments = useMemo(() => {
    if (!scam) return [];
    const segments: string[] = [scam.scenario];
    scam.dialogues.forEach((d) => {
      segments.push(d.speaker === "scammer" ? `骗子说：${d.text}` : `您说：${d.text}`);
    });
    segments.push(`请问：${scam.question}。${scam.options.map((o) => `${o.id}、${o.text}`).join("，")}`);
    return segments;
  }, [scam]);

  const explanationSegments = useMemo(() => {
    if (!scam) return [];
    return [scam.mnemonic, scam.explanation];
  }, [scam]);

  const handlePlayVoice = () => {
    if (voice.isSpeaking) {
      voice.stop();
    } else {
      voice.speakSegments(questionSegments);
    }
  };

  const handleShowNextDialogue = () => {
    if (!scam) return;
    if (dialogueIndex < scam.dialogues.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    } else {
      setShowAllDialogues(true);
    }
  };

  const handleSelectAnswer = (optionId: string) => {
    if (showResult) return;
    setSelectedAnswer(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || !scam) return;
    const correct = selectedAnswer === scam.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    voice.stop();
  };

  const handleShowExplanation = () => {
    setShowExplanation(true);
    if (voiceEnabled) {
      voice.speakSegments(explanationSegments);
    }
  };

  const handleComplete = () => {
    if (!scam) return;
    const score = isCorrect ? 100 : 50;
    completeScamLevel(scam.id, score);
    navigate("/anti-fraud");
  };

  const handleRetry = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setShowExplanation(false);
    setIsCorrect(false);
    voice.stop();
  };

  const handleMasterRedWord = () => {
    if (!redWord) return;
    completeRedWord(redWord.id);
    navigate("/anti-fraud");
  };

  const handleToggleRepeat = () => {
    const newVal = voice.toggleRepeat();
    setRepeatOn(newVal);
    setVoiceRepeat(newVal);
  };

  const textSizeClass = fontSize === "xlarge" ? "text-xl" : fontSize === "large" ? "text-lg" : "text-base";
  const titleSizeClass = fontSize === "xlarge" ? "text-3xl" : fontSize === "large" ? "text-2xl" : "text-xl";

  if (!isCategory && !isRedWord && !scam) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-gray-500">题目不存在</p>
      </div>
    );
  }

  if (isCategory && category) {
    const IconComponent = iconMap[category.icon] || Shield;
    return (
      <div className="min-h-screen bg-gray-50 pb-10">
        <div className={`${category.color} text-white p-4 sticky top-0 z-10`}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/anti-fraud")}
              className="p-2 -ml-2 hover:bg-white/20 rounded-xl transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
            >
              <ArrowLeft className="w-7 h-7" />
            </button>
            <div className="flex-1">
              <h1 className={`${titleSizeClass} font-bold`}>{category.name}</h1>
              <p className="text-white/80 text-base">{category.description}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-2xl">
              <IconComponent className="w-8 h-8" />
            </div>
          </div>
        </div>

        <div className="p-4">
          {typeOrder.map((type) => {
            const questions = groupedQuestions[type];
            if (!questions) return null;
            return (
              <div key={type} className="mb-6">
                <h2 className="text-lg font-bold text-gray-700 mb-3 px-1">
                  {questionTypeLabels[type]}
                </h2>
                <div className="space-y-3">
                  {questions.map((q) => {
                    const isCompleted = progress.completedScamLevels.includes(q.id);
                    const diff = difficultyConfig[q.difficulty];
                    return (
                      <button
                        key={q.id}
                        onClick={() => navigate(`/anti-fraud/${q.id}`)}
                        className="w-full bg-white rounded-2xl p-4 text-left shadow-md hover:shadow-lg transition-all active:scale-[0.99] min-h-[56px]"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className={`${textSizeClass} font-bold text-gray-800`}>
                                {q.scenario}
                              </h3>
                              <span className={`${diff.color} text-xs font-semibold px-2 py-0.5 rounded-full`}>
                                {diff.label}
                              </span>
                              <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                                {questionTypeLabels[q.type]}
                              </span>
                              {isCompleted && (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              )}
                            </div>
                          </div>
                          <ChevronRight className="w-6 h-6 text-gray-400 flex-shrink-0" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (isRedWord && redWord) {
    const danger = dangerLevelConfig[redWord.dangerLevel];
    const isMastered = progress.completedRedWords.includes(redWord.id);
    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        <div className="bg-gradient-to-r from-red-600 to-red-500 text-white p-4 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/anti-fraud")}
              className="p-2 -ml-2 hover:bg-white/20 rounded-xl transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
            >
              <ArrowLeft className="w-7 h-7" />
            </button>
            <h1 className={`${titleSizeClass} font-bold`}>反诈红线词</h1>
          </div>
        </div>

        <div className="p-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 text-center">
            <div className={`${danger.bgColor} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4`}>
              <AlertTriangle className={`w-10 h-10 ${danger.textColor}`} />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">{redWord.word}</h2>
            <span className={`${danger.color} text-white text-base font-semibold px-4 py-1.5 rounded-full`}>
              {danger.label}
            </span>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-5 mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">什么是"{redWord.word}"？</h3>
            <p className={`${textSizeClass} text-gray-700 leading-relaxed`}>{redWord.description}</p>
          </div>

          <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-5 mb-6">
            <h3 className="text-lg font-bold text-orange-800 mb-3">骗子怎么说？</h3>
            <p className={`${textSizeClass} text-orange-700 leading-relaxed italic`}>
              {redWord.example}
            </p>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-5 mb-6">
            <h3 className="text-lg font-bold text-green-800 mb-3">正确应对</h3>
            <p className={`${textSizeClass} text-green-700 leading-relaxed font-semibold`}>
              {redWord.correctResponse}
            </p>
          </div>

          <button
            onClick={handleMasterRedWord}
            disabled={isMastered}
            className={`w-full py-4 rounded-xl font-bold text-xl transition-all min-h-[56px] ${
              isMastered
                ? "bg-gray-200 text-gray-500 cursor-default"
                : "bg-green-500 hover:bg-green-600 text-white active:scale-95"
            }`}
          >
            {isMastered ? "✓ 已掌握" : "已掌握"}
          </button>
        </div>
      </div>
    );
  }

  const currentIndex = showAllDialogues ? scam!.dialogues.length - 1 : dialogueIndex;

  return (
    <div className="min-h-screen bg-gray-50 pb-40">
      <div className="bg-red-500 text-white p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/anti-fraud")}
            className="p-2 -ml-2 hover:bg-white/20 rounded-xl transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
          <div className="flex-1">
            <h1 className={`${titleSizeClass} font-bold`}>{scam!.scenario}</h1>
            <p className="text-red-100 text-lg">第 {scamQuestions.findIndex((s) => s.id === scamId) + 1} 关</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-gray-100 to-gray-50 px-5 py-4 border-b">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-orange-500" />
              <h2 className="text-xl font-bold text-gray-800">情景对话</h2>
            </div>
            <p className="text-gray-500 text-base mt-1">
              仔细看看下面的对话，您能识破骗局吗？
            </p>
          </div>

          <div
            ref={dialogueContainerRef}
            className="p-5 space-y-4 max-h-96 overflow-y-auto"
          >
            {scam!.dialogues.slice(0, currentIndex + 1).map((dialogue, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  dialogue.speaker === "scammer" ? "justify-start" : "justify-end"
                }`}
                style={{ animation: "fadeIn 0.3s ease-in" }}
              >
                {dialogue.speaker === "scammer" && (
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-7 h-7 text-orange-600" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] p-4 rounded-2xl ${
                    dialogue.speaker === "scammer"
                      ? "bg-gray-100 text-gray-800 rounded-tl-none"
                      : "bg-blue-500 text-white rounded-tr-none"
                  }`}
                >
                  <p className={`${textSizeClass} leading-relaxed`}>
                    {dialogue.text}
                  </p>
                </div>
                {dialogue.speaker === "victim" && (
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <User className="w-7 h-7 text-blue-600" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {!showAllDialogues && (
            <div className="px-5 pb-5">
              <button
                onClick={handleShowNextDialogue}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-xl transition-all active:scale-95 flex items-center justify-center gap-2 min-h-[56px]"
              >
                {dialogueIndex < scam!.dialogues.length - 1 ? (
                  <>
                    下一句
                    <ChevronRight className="w-6 h-6" />
                  </>
                ) : (
                  "看完对话，开始答题"
                )}
              </button>
            </div>
          )}
        </div>

        {showAllDialogues && (
          <>
            <div className="bg-white rounded-2xl shadow-lg p-5 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-blue-100 p-2 rounded-xl">
                  <AlertTriangle className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  {scam!.question}
                </h2>
              </div>

              <div className="space-y-3">
                {scam!.options.map((option) => {
                  const isSelected = selectedAnswer === option.id;
                  const isCorrectAnswer = option.id === scam!.correctAnswer;
                  const showCorrectWrong = showResult;

                  let optionStyle = "bg-gray-50 border-gray-200 hover:bg-gray-100";
                  if (showCorrectWrong) {
                    if (isCorrectAnswer) {
                      optionStyle = "bg-green-50 border-green-500 text-green-700";
                    } else if (isSelected && !isCorrectAnswer) {
                      optionStyle = "bg-red-50 border-red-500 text-red-700";
                    } else {
                      optionStyle = "bg-gray-50 border-gray-200 opacity-60";
                    }
                  } else if (isSelected) {
                    optionStyle = "bg-blue-50 border-blue-500 text-blue-700";
                  }

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelectAnswer(option.id)}
                      disabled={showResult}
                      className={`w-full flex items-center gap-4 p-5 rounded-xl border-2 text-left transition-all min-h-[56px] ${
                        showResult ? "cursor-default" : "active:scale-98"
                      } ${optionStyle}`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 ${
                          showCorrectWrong
                            ? isCorrectAnswer
                              ? "bg-green-500 text-white"
                              : isSelected
                              ? "bg-red-500 text-white"
                              : "bg-gray-200 text-gray-500"
                            : isSelected
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {showCorrectWrong ? (
                          isCorrectAnswer ? (
                            <Check className="w-6 h-6" />
                          ) : isSelected ? (
                            <X className="w-6 h-6" />
                          ) : (
                            option.id.toUpperCase()
                          )
                        ) : (
                          option.id.toUpperCase()
                        )}
                      </div>
                      <p className={`${textSizeClass} flex-1 font-medium`}>
                        {option.text}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {showResult && (
              <div
                className={`rounded-2xl shadow-lg p-6 mb-6 ${
                  isCorrect
                    ? "bg-gradient-to-r from-green-500 to-teal-500"
                    : "bg-gradient-to-r from-red-500 to-orange-500"
                } text-white`}
              >
                <div className="text-center">
                  {isCorrect ? (
                    <>
                      <Trophy className="w-16 h-16 mx-auto mb-3" />
                      <h3 className="text-3xl font-bold mb-2">答对了！太棒了！</h3>
                      <p className="text-green-100 text-xl mb-2">+100 积分</p>
                      <p className="text-green-100 text-lg">
                        您的防骗意识真强！
                      </p>
                    </>
                  ) : (
                    <>
                      <X className="w-16 h-16 mx-auto mb-3" />
                      <h3 className="text-3xl font-bold mb-2">哎呀，答错了</h3>
                      <p className="text-red-100 text-xl mb-2">+50 积分（参与奖）</p>
                      <p className="text-red-100 text-lg">
                        没关系，多练习就不会上当了！
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}

            {showResult && !showExplanation && (
              <button
                onClick={handleShowExplanation}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-4 rounded-xl font-bold text-xl mb-4 transition-all active:scale-95 flex items-center justify-center gap-2 min-h-[56px]"
              >
                <Lightbulb className="w-7 h-7" />
                查看防骗口诀和解析
              </button>
            )}

            {showExplanation && (
              <div className="bg-white rounded-2xl shadow-lg p-5 mb-6">
                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-5 mb-5">
                  <div className="flex items-center gap-3 mb-3">
                    <Lightbulb className="w-8 h-8 text-yellow-600" />
                    <h3 className="text-2xl font-bold text-yellow-800">
                      防骗口诀
                    </h3>
                  </div>
                  <p className="text-yellow-700 text-xl font-semibold leading-relaxed">
                    {scam!.mnemonic}
                  </p>
                </div>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5">
                  <h3 className="text-xl font-bold text-blue-800 mb-3">
                    📖 详细解析
                  </h3>
                  <p className={`${textSizeClass} text-blue-700 leading-relaxed`}>
                    {scam!.explanation}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {showAllDialogues && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-100 shadow-lg">
          {voiceEnabled && (
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
              <button
                onClick={handlePlayVoice}
                className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
              >
                {voice.isSpeaking ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </button>
              <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                {(["slow", "normal", "fast"] as const).map((speed) => (
                  <button
                    key={speed}
                    onClick={() => setVoiceSpeed(speed)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors min-h-[40px] ${
                      voiceSpeed === speed
                        ? "bg-white text-red-600 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {speed === "slow" ? "慢" : speed === "normal" ? "正常" : "快"}
                  </button>
                ))}
              </div>
              <button
                onClick={handleToggleRepeat}
                className={`p-2 rounded-xl transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center ${
                  repeatOn
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-500 hover:text-gray-700"
                }`}
              >
                <Repeat className="w-6 h-6" />
              </button>
            </div>
          )}

          <div className="p-4">
            {!showResult ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer}
                className={`w-full py-4 rounded-xl font-bold text-xl text-white transition-all min-h-[56px] ${
                  selectedAnswer
                    ? "bg-red-500 hover:bg-red-600 active:scale-95"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                确认答案
              </button>
            ) : showExplanation ? (
              <div className="flex gap-3">
                <button
                  onClick={handleRetry}
                  className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all active:scale-95 min-h-[48px]"
                >
                  <RefreshCw className="w-5 h-5" />
                  再练一次
                </button>
                <button
                  onClick={handleComplete}
                  className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg bg-green-500 text-white hover:bg-green-600 transition-all active:scale-95 min-h-[48px]"
                >
                  <Check className="w-5 h-5" />
                  完成闯关
                </button>
              </div>
            ) : null}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
