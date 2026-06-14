import { useState } from "react";
import { BookOpen, Shield, Users, ChevronRight, X } from "lucide-react";
import { useAppStore } from "@/store/appStore";

interface OnboardingProps {
  onClose: () => void;
}

const slides = [
  {
    id: 1,
    icon: BookOpen,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    iconBg: "bg-blue-500",
    title: "这里学手机",
    description: "微信、拍照、导航、挂号...\n一步步教您用智能手机",
    tip: "大字体、语音读，老人也能轻松学",
  },
  {
    id: 2,
    icon: Shield,
    color: "from-red-500 to-orange-500",
    bgColor: "bg-red-50",
    iconBg: "bg-red-500",
    title: "这里练防骗",
    description: "冒充公检法、中奖诈骗、养老骗局...\n真实案例闯关练防骗",
    tip: "守住养老钱，幸福享晚年",
  },
  {
    id: 3,
    icon: Users,
    color: "from-green-500 to-teal-500",
    bgColor: "bg-green-50",
    iconBg: "bg-green-500",
    title: "这里找家人",
    description: "紧急联系人、学习进度、自定义教程\n儿女帮您一起学",
    tip: "有问题一键呼叫家人",
  },
];

export default function Onboarding({ onClose }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { setOnboardingSeen, fontSize } = useAppStore();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      handleSkip();
    }
  };

  const handleSkip = () => {
    setOnboardingSeen(true);
    onClose();
  };

  const titleSize = fontSize === "xlarge" ? "text-4xl" : fontSize === "large" ? "text-3xl" : "text-2xl";
  const descSize = fontSize === "xlarge" ? "text-2xl" : fontSize === "large" ? "text-xl" : "text-lg";

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      <div className="flex justify-end p-4">
        <button
          onClick={handleSkip}
          className="text-gray-400 hover:text-gray-600 text-lg font-medium px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
          aria-label="跳过引导"
        >
          <X className="w-8 h-8" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div
          className={`w-40 h-40 rounded-full ${slides[currentSlide].iconBg} text-white flex items-center justify-center mb-10 shadow-2xl`}
          style={{ animation: "bounceIn 0.5s ease-out" }}
        >
          {(() => {
            const SlideIcon = slides[currentSlide].icon;
            return <SlideIcon className="w-20 h-20" />;
          })()}
        </div>

        <h1
          className={`${titleSize} font-bold text-gray-800 text-center mb-4`}
          key={currentSlide}
          style={{ animation: "fadeInUp 0.4s ease-out" }}
        >
          {slides[currentSlide].title}
        </h1>

        <p
          className={`${descSize} text-gray-600 text-center mb-8 whitespace-pre-line leading-relaxed`}
          key={`desc-${currentSlide}`}
          style={{ animation: "fadeInUp 0.5s ease-out" }}
        >
          {slides[currentSlide].description}
        </p>

        <div
          className={`${slides[currentSlide].bgColor} rounded-2xl px-6 py-4 border-2 max-w-sm w-full`}
          style={{ animation: "fadeInUp 0.6s ease-out" }}
        >
          <p className="text-center text-gray-700 text-lg">
            💡 {slides[currentSlide].tip}
          </p>
        </div>
      </div>

      <div className="px-8 pb-10">
        <div className="flex justify-center gap-3 mb-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? `${slides[currentSlide].iconBg} w-8`
                  : "bg-gray-300"
              }`}
              aria-label={`第 ${index + 1} 页`}
            />
          ))}
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleSkip}
            className="flex-1 py-5 rounded-2xl font-bold text-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all active:scale-95 min-h-[60px]"
          >
            跳过
          </button>
          <button
            onClick={handleNext}
            className={`flex-1 py-5 rounded-2xl font-bold text-xl text-white transition-all active:scale-95 bg-gradient-to-r ${slides[currentSlide].color} flex items-center justify-center gap-2 min-h-[60px]`}
          >
            {currentSlide === slides.length - 1 ? "开始使用" : "下一步"}
            {currentSlide < slides.length - 1 && (
              <ChevronRight className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
