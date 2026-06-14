import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "@/pages/Home";
import Tutorials from "@/pages/Tutorials";
import CategoryDetail from "@/pages/CategoryDetail";
import TutorialDetail from "@/pages/TutorialDetail";
import AntiFraud from "@/pages/AntiFraud";
import AntiFraudDetail from "@/pages/AntiFraudDetail";
import Helpers from "@/pages/Helpers";
import Settings from "@/pages/Settings";
import Onboarding from "@/components/Onboarding";
import { useAppStore } from "@/store/appStore";

export default function App() {
  const { onboardingSeen } = useAppStore();
  const [showOnboarding, setShowOnboarding] = useState(!onboardingSeen);

  useEffect(() => {
    if (!onboardingSeen) {
      setShowOnboarding(true);
    }
  }, [onboardingSeen]);

  return (
    <Router>
      {showOnboarding && (
        <Onboarding onClose={() => setShowOnboarding(false)} />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tutorials" element={<Tutorials />} />
        <Route path="/tutorials/:categoryId" element={<CategoryDetail />} />
        <Route path="/tutorial/:tutorialId" element={<TutorialDetail />} />
        <Route path="/anti-fraud" element={<AntiFraud />} />
        <Route path="/anti-fraud/:scamId" element={<AntiFraudDetail />} />
        <Route path="/helpers" element={<Helpers />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}
