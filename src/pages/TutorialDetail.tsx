import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Check,
  Volume2,
  VolumeX,
  Lightbulb,
  BookOpen,
  Clock,
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
  AlertTriangle,
  Undo2,
  CheckCircle2,
  Play,
  Square,
  Repeat,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { tutorials, tutorialCategories } from "@/data/tutorials";
import { useAppStore } from "@/store/appStore";
import { useVoice } from "@/hooks/useVoice";

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

function SafetyCard({
  icon: Icon,
  label,
  text,
  colorClass,
  bgClass,
  borderClass,
}: {
  icon: typeof AlertTriangle;
  label: string;
  text: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${bgClass} border-2 ${borderClass} rounded-xl overflow-hidden`}>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center gap-3 p-3 min-h-[48px]`}
      >
        <Icon className={`w-6 h-6 ${colorClass} flex-shrink-0`} />
        <span className={`font-bold text-base ${colorClass} flex-1 text-left`}>{label}</span>
        {open ? (
          <ChevronUp className={`w-5 h-5 ${colorClass}`} />
        ) : (
          <ChevronDown className={`w-5 h-5 ${colorClass}`} />
        )}
      </button>
      {open && (
        <div className={`px-3 pb-3 pt-0`}>
          <p className={`text-base ${colorClass} leading-relaxed`}>{text}</p>
        </div>
      )}
    </div>
  );
}

export default function TutorialDetail() {
  const { tutorialId } = useParams<{ tutorialId: string }>();
  const navigate = useNavigate();
  const {
    progress,
    completeTutorial,
    voiceEnabled,
    voiceSpeed,
    setVoiceSpeed,
    voiceRepeat,
    setVoiceRepeat,
    voiceReadStepOnly,
    setVoiceReadStepOnly,
    setCurrentTutorial,
    addStudyMinutes,
    fontSize,
  } = useAppStore();

  const { isSpeaking, speak, stop, toggleRepeat } = useVoice();

  const tutorial = tutorials.find((t) => t.id === tutorialId);
  const category = tutorial ? tutorialCategories.find((c) => c.id === tutorial.categoryId) : null;

  const [currentStep, setCurrentStep] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (tutorial && progress.currentTutorial === tutorialId) {
      setCurrentStep(progress.currentStep);
    }
  }, [tutorialId, progress.currentTutorial, progress.currentStep, tutorial]);

  useEffect(() => {
    if (tutorial && hasStarted) {
      setCurrentTutorial(tutorialId!, currentStep);
    }
  }, [currentStep, tutorialId, tutorial, setCurrentTutorial, hasStarted]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (voiceEnabled && hasStarted && tutorial) {
      const step = tutorial.steps[currentStep];
      if (step) {
        speakStep(step);
      }
    }
  }, [currentStep]);

  if (!tutorial || !category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-gray-500">教程不存在</p>
      </div>
    );
  }

  const step = tutorial.steps[currentStep];
  const isLastStep = currentStep === tutorial.steps.length - 1;
  const isCompleted = progress.completedTutorials.includes(tutorial.id);
  const Icon = iconMap[tutorial.icon] || BookOpen;

  const buildStepText = (s: typeof step, stepOnly: boolean) => {
    let text = `${s.title}。${s.description}`;
    if (!stepOnly) {
      if (s.tip) text += `小贴士：${s.tip}`;
      if (s.whatIfStuck) text += `不会怎么办：${s.whatIfStuck}`;
      if (s.whatIfWrong) text += `点错怎么退回：${s.whatIfWrong}`;
      if (s.howToConfirm) text += `如何确认成功：${s.howToConfirm}`;
    }
    return text;
  };

  const speakStep = (s: typeof step) => {
    const text = buildStepText(s, voiceReadStepOnly);
    speak(text);
  };

  const handleNext = () => {
    stop();

    if (isLastStep) {
      if (isCompleted) {
        setCurrentStep(0);
        setHasStarted(true);
        return;
      }
      handleComplete();
    } else {
      if (!hasStarted) setHasStarted(true);
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    stop();
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    stop();
    completeTutorial(tutorial.id);
    addStudyMinutes(tutorial.estimatedMinutes);
  };

  const handleStepClick = (index: number) => {
    stop();
    setCurrentStep(index);
    if (!hasStarted) setHasStarted(true);
  };

  const handlePlayVoice = () => {
    if (isSpeaking) {
      stop();
    } else {
      speakStep(step);
    }
  };

  const textSizeClass = fontSize === "xlarge" ? "text-xl" : fontSize === "large" ? "text-lg" : "text-base";
  const titleSizeClass = fontSize === "xlarge" ? "text-3xl" : fontSize === "large" ? "text-2xl" : "text-xl";

  const speedOptions: { key: typeof voiceSpeed; label: string }[] = [
    { key: "slow", label: "慢" },
    { key: "normal", label: "正常" },
    { key: "fast", label: "快" },
  ];

  const hasSafetyGuidance = step.whatIfStuck || step.whatIfWrong || step.howToConfirm;

  return (
    <div className="min-h-screen bg-gray-50 pb-44">
      <div className={`${category.color} text-white p-4 sticky top-0 z-10`}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/tutorials/${category.id}`)}
            className="p-2 -ml-2 hover:bg-white/20 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
          <div className="flex-1">
            <h1 className={`${titleSizeClass} font-bold`}>{tutorial.title}</h1>
            <p className="text-white/80 text-lg">
              第 {currentStep + 1} / {tutorial.steps.length} 步
            </p>
          </div>
        </div>

        <div className="flex gap-2 mt-3">
          {tutorial.steps.map((_, index) => (
            <button
              key={index}
              onClick={() => handleStepClick(index)}
              className={`flex-1 h-3 rounded-full transition-all ${
                index <= currentStep ? "bg-white" : "bg-white/30"
              }`}
              aria-label={`第 ${index + 1} 步`}
            />
          ))}
        </div>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="relative">
            <img
              src={step.image}
              alt={step.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-lg font-bold text-gray-700">
                第 {currentStep + 1} 步
              </span>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`${category.color} text-white p-3 rounded-xl`}>
                <Icon className="w-7 h-7" />
              </div>
              <h2 className={`${titleSizeClass} font-bold text-gray-800`}>
                {step.title}
              </h2>
            </div>

            <p className={`${textSizeClass} text-gray-600 leading-relaxed mb-6`}>
              {step.description}
            </p>

            {step.tip && (
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-4">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-7 h-7 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-bold text-yellow-800 mb-1">
                      小贴士
                    </h3>
                    <p className={`${textSizeClass} text-yellow-700`}>
                      {step.tip}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {hasSafetyGuidance && (
              <div className="space-y-3">
                {step.whatIfStuck && (
                  <SafetyCard
                    icon={AlertTriangle}
                    label="不会怎么办"
                    text={step.whatIfStuck}
                    colorClass="text-orange-700"
                    bgClass="bg-orange-50"
                    borderClass="border-orange-200"
                  />
                )}
                {step.whatIfWrong && (
                  <SafetyCard
                    icon={Undo2}
                    label="点错怎么退回"
                    text={step.whatIfWrong}
                    colorClass="text-blue-700"
                    bgClass="bg-blue-50"
                    borderClass="border-blue-200"
                  />
                )}
                {step.howToConfirm && (
                  <SafetyCard
                    icon={CheckCircle2}
                    label="如何确认成功"
                    text={step.howToConfirm}
                    colorClass="text-green-700"
                    bgClass="bg-green-50"
                    borderClass="border-green-200"
                  />
                )}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-5 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">全部步骤</h3>
          <div className="space-y-3">
            {tutorial.steps.map((s, index) => (
              <button
                key={s.id}
                onClick={() => handleStepClick(index)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                  index === currentStep
                    ? `${category.color} text-white shadow-md`
                    : index < currentStep
                    ? "bg-green-50 text-green-700"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                    index === currentStep
                      ? "bg-white/20 text-white"
                      : index < currentStep
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {index < currentStep ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="flex-1 text-left">
                  <p className="text-lg font-semibold">{s.title}</p>
                </div>
                {index === currentStep && (
                  <ChevronRight className="w-6 h-6" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 text-gray-500 mb-6">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span className="text-base">约 {tutorial.estimatedMinutes} 分钟</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            <span className="text-base">{tutorial.steps.length} 个步骤</span>
          </div>
          {isCompleted && (
            <div className="flex items-center gap-2 text-green-600">
              <Check className="w-5 h-5" />
              <span className="text-base font-semibold">已完成</span>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-100 shadow-lg z-20">
        <div className="px-4 pt-3 pb-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePlayVoice}
              className={`flex items-center justify-center gap-1 px-4 py-2 rounded-xl font-bold text-base min-h-[48px] transition-all ${
                isSpeaking
                  ? "bg-red-100 text-red-600 hover:bg-red-200"
                  : "bg-blue-100 text-blue-600 hover:bg-blue-200"
              }`}
            >
              {isSpeaking ? (
                <Square className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
              {isSpeaking ? "停止" : "播放"}
            </button>

            <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden">
              {speedOptions.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setVoiceSpeed(opt.key)}
                  className={`px-3 py-2 text-sm font-bold min-h-[48px] transition-all ${
                    voiceSpeed === opt.key
                      ? "bg-blue-500 text-white"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                const newVal = toggleRepeat();
                setVoiceRepeat(newVal);
              }}
              className={`flex items-center justify-center p-2 rounded-xl min-h-[48px] min-w-[48px] transition-all ${
                voiceRepeat
                  ? "bg-purple-100 text-purple-600"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              <Repeat className="w-5 h-5" />
            </button>

            <button
              onClick={() => setVoiceReadStepOnly(!voiceReadStepOnly)}
              className={`flex items-center justify-center gap-1 px-3 py-2 rounded-xl font-bold text-sm min-h-[48px] transition-all ${
                voiceReadStepOnly
                  ? "bg-teal-100 text-teal-600"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              只读本步
            </button>
          </div>
        </div>

        <div className="px-4 pb-4 pt-1">
          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-lg transition-all min-h-[48px] ${
                currentStep === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-95"
              }`}
            >
              <ChevronLeft className="w-6 h-6" />
              上一步
            </button>
            <button
              onClick={handleNext}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-xl text-white transition-all active:scale-95 min-h-[48px] ${
                isLastStep
                  ? isCompleted
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-green-500 hover:bg-green-600"
                  : `${category.color} hover:opacity-90`
              }`}
            >
              {isLastStep ? (
                isCompleted ? (
                  <>
                    <BookOpen className="w-7 h-7" />
                    重新学习
                  </>
                ) : (
                  <>
                    <Check className="w-7 h-7" />
                    完成学习
                  </>
                )
              ) : (
                <>
                  下一步
                  <ChevronRight className="w-7 h-7" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
