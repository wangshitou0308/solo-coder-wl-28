import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Phone,
  Users,
  Plus,
  Trash2,
  User,
  BookOpen,
  Shield,
  Clock,
  Calendar,
  TrendingUp,
  Upload,
  FileText,
  AlertCircle,
} from "lucide-react";
import { useAppStore } from "@/store/appStore";
import { tutorials, tutorialCategories } from "@/data/tutorials";
import { scamQuestions } from "@/data/scams";

export default function Helpers() {
  const navigate = useNavigate();
  const {
    emergencyContacts,
    helpers,
    progress,
    customTutorials,
    addEmergencyContact,
    removeEmergencyContact,
    addHelper,
    removeHelper,
    addCustomTutorial,
    fontSize,
  } = useAppStore();

  const [showAddContact, setShowAddContact] = useState(false);
  const [showAddHelper, setShowAddHelper] = useState(false);
  const [showAddTutorial, setShowAddTutorial] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", phone: "", relationship: "" });
  const [newHelper, setNewHelper] = useState({ name: "", phone: "", relationship: "" });
  const [newTutorial, setNewTutorial] = useState({ title: "", description: "", content: "" });
  const [activeTab, setActiveTab] = useState<"contacts" | "progress" | "custom">("contacts");

  const completedTutorialsCount = progress.completedTutorials.length;
  const totalTutorials = tutorials.length;
  const completedScamsCount = progress.completedScamLevels.length;
  const totalScams = scamQuestions.length;
  const totalScore = Object.values(progress.scamScores).reduce((sum, score) => sum + score, 0);

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      addEmergencyContact(newContact);
      setNewContact({ name: "", phone: "", relationship: "" });
      setShowAddContact(false);
    }
  };

  const handleAddHelper = () => {
    if (newHelper.name && newHelper.phone) {
      addHelper(newHelper);
      setNewHelper({ name: "", phone: "", relationship: "" });
      setShowAddHelper(false);
    }
  };

  const handleAddTutorial = () => {
    if (newTutorial.title && newTutorial.content) {
      addCustomTutorial(newTutorial);
      setNewTutorial({ title: "", description: "", content: "" });
      setShowAddTutorial(false);
    }
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const textSizeClass = fontSize === "xlarge" ? "text-xl" : fontSize === "large" ? "text-lg" : "text-base";

  const tabs = [
    { id: "contacts", label: "紧急联系人", icon: Phone },
    { id: "progress", label: "学习进度", icon: TrendingUp },
    { id: "custom", label: "自定义教程", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="bg-green-500 text-white p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="p-2 -ml-2 hover:bg-white/20 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">亲友辅助</h1>
            <p className="text-green-100 text-lg">家人陪伴，学习更安心</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm sticky top-16 z-10">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 font-bold text-lg transition-all ${
                activeTab === tab.id
                  ? "text-green-600 border-b-4 border-green-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {activeTab === "contacts" && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">紧急呼叫</h2>
                  <p className="text-red-100 text-lg">遇到问题一键联系</p>
                </div>
              </div>
              <button
                onClick={() => {
                  if (emergencyContacts.length > 0) {
                    handleCall(emergencyContacts[0].phone);
                  } else {
                    setShowAddContact(true);
                  }
                }}
                className="w-full bg-white text-red-600 font-bold text-2xl py-5 rounded-xl hover:bg-red-50 transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                <Phone className="w-8 h-8" />
                {emergencyContacts.length > 0 
                  ? `呼叫 ${emergencyContacts[0].name}` 
                  : "添加紧急联系人"}
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-xl">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">
                    紧急联系人 ({emergencyContacts.length})
                  </h2>
                </div>
                <button
                  onClick={() => setShowAddContact(true)}
                  className="bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600 transition-colors"
                >
                  <Plus className="w-6 h-6" />
                </button>
              </div>

              {emergencyContacts.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <Users className="w-16 h-16 mx-auto mb-3 opacity-50" />
                  <p className="text-lg">还没有添加紧急联系人</p>
                  <p className="text-base">点击右上角加号添加</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {emergencyContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white">
                        <User className="w-8 h-8" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800">
                          {contact.name}
                        </h3>
                        <p className="text-gray-500 text-lg">{contact.relationship}</p>
                        <p className="text-blue-600 text-lg font-semibold">
                          {contact.phone}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleCall(contact.phone)}
                          className="bg-green-500 text-white p-3 rounded-xl hover:bg-green-600 transition-colors"
                        >
                          <Phone className="w-6 h-6" />
                        </button>
                        <button
                          onClick={() => removeEmergencyContact(contact.id)}
                          className="bg-red-100 text-red-500 p-3 rounded-xl hover:bg-red-200 transition-colors"
                        >
                          <Trash2 className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-xl">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">
                    辅助者 ({helpers.length})
                  </h2>
                </div>
                <button
                  onClick={() => setShowAddHelper(true)}
                  className="bg-purple-500 text-white p-3 rounded-xl hover:bg-purple-600 transition-colors"
                >
                  <Plus className="w-6 h-6" />
                </button>
              </div>
              <p className="text-gray-500 text-lg mb-4">
                子女或志愿者可以查看学习进度、上传自定义教程
              </p>

              {helpers.length === 0 ? (
                <div className="text-center py-6 text-gray-400">
                  <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-base">还没有添加辅助者</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {helpers.map((helper) => (
                    <div
                      key={helper.id}
                      className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white">
                        <User className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800">
                          {helper.name}
                        </h3>
                        <p className="text-gray-500 text-base">{helper.relationship}</p>
                      </div>
                      <button
                        onClick={() => removeHelper(helper.id)}
                        className="text-red-400 hover:text-red-600 p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "progress" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-yellow-100 p-2 rounded-xl">
                  <Calendar className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">学习概况</h2>
                  <p className="text-gray-500 text-base">坚持学习，天天进步</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl p-4 text-white text-center">
                  <div className="text-4xl font-bold mb-1">{progress.streakDays}</div>
                  <div className="text-orange-100 text-base">连续学习天数</div>
                </div>
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-4 text-white text-center">
                  <div className="text-4xl font-bold mb-1">{progress.totalStudyMinutes}</div>
                  <div className="text-blue-100 text-base">累计学习分钟</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 p-2 rounded-xl">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">手机教程进度</h2>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-lg mb-2">
                  <span className="text-gray-600">总体进度</span>
                  <span className="font-bold text-blue-600">
                    {completedTutorialsCount}/{totalTutorials} 个
                  </span>
                </div>
                <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{
                      width: `${totalTutorials > 0 ? (completedTutorialsCount / totalTutorials) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                {tutorialCategories.map((category) => {
                  const catTutorials = tutorials.filter((t) => t.categoryId === category.id);
                  const completed = catTutorials.filter((t) =>
                    progress.completedTutorials.includes(t.id)
                  ).length;

                  return (
                    <div
                      key={category.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                    >
                      <div className={`${category.color} text-white p-2 rounded-lg`}>
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="font-semibold text-gray-700 text-base">
                            {category.name}
                          </span>
                          <span className="text-sm text-gray-500">
                            {completed}/{catTutorials.length}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${category.color} rounded-full`}
                            style={{
                              width: `${catTutorials.length > 0 ? (completed / catTutorials.length) * 100 : 0}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-100 p-2 rounded-xl">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">反诈训练进度</h2>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-red-50 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-red-600">
                    {completedScamsCount}/{totalScams}
                  </div>
                  <div className="text-red-500 text-base">已通关</div>
                </div>
                <div className="bg-yellow-50 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-yellow-600">
                    {totalScore}
                  </div>
                  <div className="text-yellow-500 text-base">总积分</div>
                </div>
              </div>

              <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                  style={{
                    width: `${totalScams > 0 ? (completedScamsCount / totalScams) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 p-2 rounded-xl">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">最近学习</h2>
              </div>

              {progress.completedTutorials.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-base">还没有学习记录</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {progress.completedTutorials.slice(-5).reverse().map((tutorialId) => {
                    const tutorial = tutorials.find((t) => t.id === tutorialId);
                    if (!tutorial) return null;
                    const category = tutorialCategories.find(
                      (c) => c.id === tutorial.categoryId
                    );

                    return (
                      <div
                        key={tutorialId}
                        className="flex items-center gap-3 p-3 bg-green-50 rounded-xl"
                      >
                        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 text-base">
                            {tutorial.title}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {category?.name || "未分类"}
                          </p>
                        </div>
                        <div className="text-green-500">
                          <Clock className="w-5 h-5" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "custom" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-teal-100 p-2 rounded-xl">
                    <FileText className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">自定义教程</h2>
                    <p className="text-gray-500 text-base">
                      亲友上传的家电说明书等
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddTutorial(true)}
                  className="bg-teal-500 text-white p-3 rounded-xl hover:bg-teal-600 transition-colors flex items-center gap-2"
                >
                  <Upload className="w-5 h-5" />
                  <span className="font-semibold">上传</span>
                </button>
              </div>

              {customTutorials.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                  <FileText className="w-16 h-16 mx-auto mb-3 opacity-50" />
                  <p className="text-lg">还没有自定义教程</p>
                  <p className="text-base">
                    让子女帮您上传家电说明书等教程
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {customTutorials.map((tutorial) => (
                    <div
                      key={tutorial.id}
                      className="p-4 bg-teal-50 rounded-xl border border-teal-100"
                    >
                      <h3 className="text-lg font-bold text-gray-800 mb-1">
                        {tutorial.title}
                      </h3>
                      <p className="text-gray-500 text-base mb-3">
                        {tutorial.description}
                      </p>
                      <p className={`${textSizeClass} text-gray-700 whitespace-pre-wrap`}>
                        {tutorial.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
              <h3 className="text-lg font-bold text-blue-800 mb-3">💡 提示</h3>
              <ul className="text-blue-700 text-lg space-y-2">
                <li>• 可以让子女帮您上传家电使用说明</li>
                <li>• 可以添加常用APP的操作步骤</li>
                <li>• 有了自定义教程，忘记了随时看</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {showAddContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">添加紧急联系人</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  姓名
                </label>
                <input
                  type="text"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  placeholder="如：儿子"
                  className="w-full p-4 text-xl border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  电话
                </label>
                <input
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  placeholder="请输入手机号"
                  className="w-full p-4 text-xl border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  关系
                </label>
                <input
                  type="text"
                  value={newContact.relationship}
                  onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                  placeholder="如：儿子、女儿、老伴"
                  className="w-full p-4 text-xl border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddContact(false)}
                className="flex-1 py-4 rounded-xl font-bold text-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleAddContact}
                className="flex-1 py-4 rounded-xl font-bold text-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                添加
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddHelper && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">添加辅助者</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  姓名
                </label>
                <input
                  type="text"
                  value={newHelper.name}
                  onChange={(e) => setNewHelper({ ...newHelper, name: e.target.value })}
                  placeholder="如：小明"
                  className="w-full p-4 text-xl border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  电话
                </label>
                <input
                  type="tel"
                  value={newHelper.phone}
                  onChange={(e) => setNewHelper({ ...newHelper, phone: e.target.value })}
                  placeholder="请输入手机号"
                  className="w-full p-4 text-xl border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  关系
                </label>
                <input
                  type="text"
                  value={newHelper.relationship}
                  onChange={(e) => setNewHelper({ ...newHelper, relationship: e.target.value })}
                  placeholder="如：儿子、女儿、志愿者"
                  className="w-full p-4 text-xl border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddHelper(false)}
                className="flex-1 py-4 rounded-xl font-bold text-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleAddHelper}
                className="flex-1 py-4 rounded-xl font-bold text-xl bg-purple-500 text-white hover:bg-purple-600 transition-colors"
              >
                添加
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddTutorial && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">上传自定义教程</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  教程标题
                </label>
                <input
                  type="text"
                  value={newTutorial.title}
                  onChange={(e) => setNewTutorial({ ...newTutorial, title: e.target.value })}
                  placeholder="如：电饭煲使用说明"
                  className="w-full p-4 text-xl border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  简介
                </label>
                <input
                  type="text"
                  value={newTutorial.description}
                  onChange={(e) => setNewTutorial({ ...newTutorial, description: e.target.value })}
                  placeholder="简短描述一下"
                  className="w-full p-4 text-xl border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  内容
                </label>
                <textarea
                  value={newTutorial.content}
                  onChange={(e) => setNewTutorial({ ...newTutorial, content: e.target.value })}
                  placeholder="详细的使用步骤..."
                  rows={6}
                  className="w-full p-4 text-xl border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none resize-none"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddTutorial(false)}
                className="flex-1 py-4 rounded-xl font-bold text-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleAddTutorial}
                className="flex-1 py-4 rounded-xl font-bold text-xl bg-teal-500 text-white hover:bg-teal-600 transition-colors"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
