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
} from "lucide-react";
import { tutorials, tutorialCategories } from "@/data/tutorials";
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

export default function TutorialDetail() {
  const { tutorialId } = useParams<{ tutorialId: string }>();
  const navigate = useNavigate();
  const { progress, completeTutorial, voiceEnabled, setCurrentTutorial, addStudyMinutes, fontSize } = useAppStore();

  const tutorial = tutorials.find((t) => t.id === tutorialId);
  const category = tutorial ? tutorialCategories.find((c) => c.id === tutorial.categoryId) : null;

  const [currentStep, setCurrentStep] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
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
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    if (voiceEnabled && hasStarted && tutorial) {
      const step = tutorial.steps[currentStep];
      if (step) {
        const text = `${step.title}。${step.description}${step.tip ? `小贴士：${step.tip}` : ""}`;
        speak(text);
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

  const speak = (text: string) => {
    if (!voiceEnabled || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  };

  const handleNext = () => {
    stopSpeaking();
    
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
    stopSpeaking();
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    stopSpeaking();
    completeTutorial(tutorial.id);
    addStudyMinutes(tutorial.estimatedMinutes);
  };

  const handleStepClick = (index: number) => {
    stopSpeaking();
    setCurrentStep(index);
    if (!hasStarted) setHasStarted(true);
  };

  const handlePlayVoice = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const text = `${step.title}。${step.description}${step.tip ? `小贴士：${step.tip}` : ""}`;
      speak(text);
    }
  };

  const textSizeClass = fontSize === "xlarge" ? "text-xl" : fontSize === "large" ? "text-lg" : "text-base";
  const titleSizeClass = fontSize === "xlarge" ? "text-3xl" : fontSize === "large" ? "text-2xl" : "text-xl";

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
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
          <button
            onClick={handlePlayVoice}
            className={`p-3 rounded-xl transition-colors ${
              isSpeaking ? "bg-white/30" : "bg-white/20 hover:bg-white/30"
            }`}
          >
            {isSpeaking ? (
              <VolumeX className="w-7 h-7" />
            ) : (
              <Volume2 className="w-7 h-7" />
            )}
          </button>
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
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
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

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-100 p-4 shadow-lg">
        <div className="flex gap-3">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-lg transition-all ${
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
            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-xl text-white transition-all active:scale-95 ${
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
  );
}
