import React, { useState } from 'react';
import { AlertCircle, Award, Bell, ChevronLeft, ChevronRight, Clock, CreditCard, DollarSign, Edit, Gift, Lock, LogIn, Mail, PieChart, Settings, Share2, Sliders, Star, User, Users } from 'lucide-react';

export default function DeanExcellenceApp() {
  // Core state
  const [screen, setScreen] = useState('splash');
  const [savings, setSavings] = useState(2800);
  const [goal, setGoal] = useState(4000);
  const [months, setMonths] = useState(8);
  const [totalMonths, setTotalMonths] = useState(12);

  // UI state
  const [quickDepositAmount, setQuickDepositAmount] = useState(100);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showSimulatorModal, setShowSimulatorModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [monthlyAddition, setMonthlyAddition] = useState(100);
  const [showNotification, setShowNotification] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Settings form state
  const [tempGoal, setTempGoal] = useState(goal);
  const [tempTotalMonths, setTempTotalMonths] = useState(totalMonths);
  const [tempCurrentMonth, setTempCurrentMonth] = useState(months);

  const remaining = goal - savings;
  const progress = (savings / goal) * 100;
  const timeProgress = (months / totalMonths) * 100;
  
  const handleDeposit = (amount) => {
    setSavings(prev => prev + amount);
    setShowDepositModal(false);
    setShowNotification(true);
    setShowConfetti(true);
    setTimeout(() => setShowNotification(false), 3000);
    setTimeout(() => setShowConfetti(false), 5000);
  };
  
  const calculateFutureSavings = () => {
    const remainingMonths = totalMonths - months;
    return savings + (monthlyAddition * remainingMonths);
  };
  
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setLoginError('יש למלא את כל השדות');
      return;
    }
    
    // Simple validation - in a real app, this would be a backend call
    if (email.includes('@') && password.length >= 6) {
      setLoginError('');
      setScreen('dashboard');
    } else {
      setLoginError('שם משתמש או סיסמה לא תקינים');
    }
  };
  
  const saveSettings = () => {
    setGoal(tempGoal);
    setTotalMonths(tempTotalMonths);
    setMonths(tempCurrentMonth);
    setShowSettingsModal(false);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };
  
  if (screen === 'splash') {
    return (
      <div className="bg-gray-100 h-screen w-full flex flex-col items-center justify-center p-6 text-right" dir="rtl">
        {showConfetti && <div className="absolute inset-0 z-50">Confetti Animation</div>}
        <div className="flex flex-col items-center justify-center space-y-10 max-w-md w-full">
          <div className="text-center">
            <div className="bg-red-600 rounded-full p-3 mb-4 inline-block">
              <Award size={40} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">מצטייני בנקאי</h1>
            <p className="text-lg text-red-600 font-medium">חוסכים היום, זוכים למחר</p>
          </div>
          
          <button 
            onClick={() => setScreen('login')}
            className="bg-red-600 text-white rounded-lg py-4 px-6 w-full font-medium text-lg shadow-lg hover:bg-red-700 transition-colors"
          >
            התחל לעקוב אחרי החיסכון שלך
          </button>
        </div>
      </div>
    );
  }
  
  if (screen === 'login') {
    return (
      <div className="bg-gray-100 h-screen w-full flex flex-col items-center justify-center p-6 text-right" dir="rtl">
        <div className="flex flex-col items-center justify-center space-y-6 max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-2">
            <div className="bg-red-600 rounded-full p-2 mb-4 inline-block">
              <Award size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">התחברות למצטייני בנקאי</h1>
            <p className="text-sm text-gray-600">הזן את פרטי החשבון שלך</p>
          </div>
          
          <form onSubmit={handleLogin} className="w-full space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">דוא"ל</label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg"
                  placeholder="name@example.com"
                />
                <Mail size={18} className="absolute left-3 top-3.5 text-gray-400" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">סיסמה</label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg"
                  placeholder="••••••••"
                />
                <Lock size={18} className="absolute left-3 top-3.5 text-gray-400" />
              </div>
            </div>
            
            {loginError && (
              <div className="text-red-500 text-sm py-1 flex items-center">
                <AlertCircle size={16} className="ml-1" />
                {loginError}
              </div>
            )}
            
            <button 
              type="submit"
              className="bg-red-600 text-white rounded-lg py-3 px-6 w-full font-medium shadow-sm hover:bg-red-700 transition-colors flex items-center justify-center"
            >
              <LogIn size={18} className="ml-2" />
              התחברות
            </button>
          </form>
          
          <div className="text-center w-full pt-4 border-t border-gray-200 mt-2">
            <button
              onClick={() => setScreen('dashboard')} 
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              התחברות ללא רישום (דמו)
            </button>
          </div>
          
          <div className="flex justify-center w-full">
            <button 
              onClick={() => setScreen('splash')}
              className="flex items-center text-gray-500 hover:text-gray-700 text-sm"
            >
              <ChevronRight size={16} className="ml-1" />
              חזרה למסך הפתיחה
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-100 min-h-screen w-full flex flex-col" dir="rtl">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm">
        <div className="flex justify-between items-center max-w-lg mx-auto">
          <div className="flex items-center">
            <Award className="text-red-600 ml-2" size={24} />
            <h1 className="text-xl font-bold text-gray-800">מצטייני בנקאי</h1>
          </div>
          <div className="flex space-x-3">
            <div className="flex items-center">
              <User size={18} className="text-gray-600 ml-1" />
              <p className="text-sm">שלום, {email ? email.split("@")[0] : "משתמש"}!</p>
            </div>
            <Bell className="text-gray-600 mr-2" size={20} />
            <button onClick={() => setShowSettingsModal(true)}>
              <Settings className="text-gray-600" size={20} />
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Dashboard */}
      <main className="flex-1 max-w-lg w-full mx-auto p-4">
        {/* Status Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="mb-3">
            <div className="flex justify-between mb-1 items-center">
              <span className="text-sm text-gray-500">הסכום שחסכת</span>
              <div className="flex items-center">
                <span className="text-sm font-medium">{savings.toLocaleString()} ₪ מתוך {goal.toLocaleString()} ₪</span>
                <button 
                  onClick={() => setShowSettingsModal(true)}
                  className="ml-1 text-gray-400 hover:text-gray-600"
                >
                  <Edit size={14} />
                </button>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-red-600 h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${progress > 100 ? 100 : progress}%` }}
              ></div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-gray-800 font-medium">
              {remaining <= 0 
                ? <span className="text-green-600">השגת את היעד! כל הכבוד!</span> 
                : `נותרו לך: ${remaining.toLocaleString()} ₪ לחיסכון מלא`
              }
            </div>
            <button 
              onClick={() => setShowDepositModal(true)}
              className="bg-red-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-red-700"
            >
              הפקדה מהירה
            </button>
          </div>
        </div>
        
        {/* Time Progress */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Clock className="text-red-600 ml-2" size={20} />
              <h2 className="text-lg font-medium">התקדמות זמן</h2>
            </div>
            <button 
              onClick={() => setShowSettingsModal(true)}
              className="text-gray-400 hover:text-gray-600"
            >
              <Edit size={14} />
            </button>
          </div>
          <div className="mb-2">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-500">התקדמות בתוכנית</span>
              <span className="text-sm font-medium">{months} חודשים מתוך {totalMonths}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-gray-600 h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${timeProgress > 100 ? 100 : timeProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Simulator */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex items-center mb-3">
            <PieChart className="text-gray-700 ml-2" size={20} />
            <h2 className="text-lg font-medium">סימולטור רווח עתידי</h2>
          </div>
          <p className="text-gray-700 mb-2">
            אם תוסיף {monthlyAddition} ₪ בחודש, תוכל להגיע ל-{calculateFutureSavings().toLocaleString()} ₪ עד סיום התואר
          </p>
          <p className="text-gray-600 text-sm mb-3">
            סטודנטים כמוך חסכו בממוצע: 4,750 ₪
          </p>
          <button 
            onClick={() => setShowSimulatorModal(true)}
            className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm w-full hover:bg-gray-200"
          >
            הצג לי תחזית מותאמת אישית
          </button>
        </div>
        
        {/* Achievements */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex items-center mb-3">
            <Star className="text-red-500 ml-2" size={20} />
            <h2 className="text-lg font-medium">תגים והישגים</h2>
          </div>
          <div className="flex space-x-2 mb-2">
            {progress >= 50 && (
              <div className="bg-red-100 text-red-800 text-xs font-medium px-3 py-1.5 rounded-full">
                עברתי את החצי
              </div>
            )}
            {progress >= 75 && (
              <div className="bg-red-100 text-red-800 text-xs font-medium px-3 py-1.5 rounded-full">
                קרוב ליעד
              </div>
            )}
            {progress < 50 && (
              <div className="bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1.5 rounded-full">
                חסכן מתחיל
              </div>
            )}
            <div className="bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1.5 rounded-full">
              חסכן חודש מאי
            </div>
          </div>
        </div>
        
        {/* Community */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex items-center mb-3">
            <Users className="text-red-500 ml-2" size={20} />
            <h2 className="text-lg font-medium">קהילת מצטייני בנקאי</h2>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div>טיפים לחיסכון</div>
              <ChevronLeft size={16} className="text-gray-400" />
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div>מנטורים בוגרי התוכנית</div>
              <ChevronLeft size={16} className="text-gray-400" />
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div>קבוצת נטוורקינג</div>
              <ChevronLeft size={16} className="text-gray-400" />
            </div>
          </div>
        </div>
        
        {/* Share Button */}
        <button 
          onClick={() => setShowShareModal(true)}
          className="bg-red-600 text-white py-3 px-4 rounded-lg w-full flex items-center justify-center space-x-2 mb-12"
        >
          <Share2 size={18} className="ml-2" />
          <span>שיתוף ההישג שלי</span>
        </button>
      </main>
      
      {/* Quick Deposit Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-xl font-bold mb-4 text-center">הפקדה מהירה</h3>
            <div className="flex justify-center mb-6">
              <div className="bg-red-100 rounded-full p-3">
                <CreditCard size={32} className="text-red-600" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">סכום להפקדה</label>
              <div className="relative">
                <input
                  type="number"
                  value={quickDepositAmount}
                  onChange={(e) => setQuickDepositAmount(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg text-center text-xl font-bold"
                />
                <span className="absolute left-3 top-3 text-xl font-bold">₪</span>
              </div>
            </div>
            <div className="flex gap-2 mb-4">
              {[50, 100, 200, 500].map(amount => (
                <button
                  key={amount}
                  onClick={() => setQuickDepositAmount(amount)}
                  className={`flex-1 py-2 rounded-lg text-center ${
                    quickDepositAmount === amount 
                      ? 'bg-red-100 text-red-700 border-2 border-red-500' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {amount} ₪
                </button>
              ))}
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setShowDepositModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg"
              >
                ביטול
              </button>
              <button
                onClick={() => handleDeposit(quickDepositAmount)}
                className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg"
              >
                אישור הפקדה
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Simulator Modal */}
      {showSimulatorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-xl font-bold mb-4 text-center">תחזית חיסכון מותאמת אישית</h3>
            <div className="flex justify-center mb-6">
              <div className="bg-gray-100 rounded-full p-3">
                <DollarSign size={32} className="text-gray-600" />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">סכום חודשי להוספה</label>
              <div className="relative">
                <input
                  type="number"
                  value={monthlyAddition}
                  onChange={(e) => setMonthlyAddition(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg text-center text-xl font-bold"
                />
                <span className="absolute left-3 top-3 text-xl font-bold">₪</span>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="text-center">
                <div className="text-lg font-medium text-gray-700 mb-1">חיסכון צפוי</div>
                <div className="text-3xl font-bold text-red-700">{calculateFutureSavings().toLocaleString()} ₪</div>
                <div className="text-sm text-gray-500 mt-1">עד סיום התואר</div>
              </div>
            </div>
            <button
              onClick={() => setShowSimulatorModal(false)}
              className="w-full bg-red-600 text-white py-3 px-4 rounded-lg"
            >
              הבנתי
            </button>
          </div>
        </div>
      )}
      
      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-xl font-bold mb-4 text-center">הגדרות החיסכון שלי</h3>
            <div className="flex justify-center mb-6">
              <div className="bg-gray-100 rounded-full p-3">
                <Settings size={32} className="text-gray-600" />
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-700 mb-2">סכום יעד חיסכון</label>
                <div className="relative">
                  <input
                    type="number"
                    value={tempGoal}
                    onChange={(e) => setTempGoal(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg pr-3 pl-8"
                  />
                  <span className="absolute left-3 top-3 font-medium">₪</span>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">סך כל החודשים בתוכנית</label>
                <input
                  type="number"
                  value={tempTotalMonths}
                  onChange={(e) => setTempTotalMonths(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  min="1"
                  max="48"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">החודש הנוכחי</label>
                <input
                  type="number"
                  value={tempCurrentMonth}
                  onChange={(e) => setTempCurrentMonth(Math.min(Number(e.target.value), tempTotalMonths))}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  min="1"
                  max={tempTotalMonths}
                />
                <p className="text-xs text-gray-500 mt-1">חייב להיות פחות או שווה למספר החודשים הכולל ({tempTotalMonths})</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg"
              >
                ביטול
              </button>
              <button
                onClick={saveSettings}
                className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg"
              >
                שמור שינויים
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-xl font-bold mb-4 text-center">שיתוף הישג אישי</h3>
            <div className="flex justify-center mb-6">
              <div className="bg-red-100 rounded-full p-3">
                <Share2 size={32} className="text-red-600" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-red-500 to-gray-700 p-6 rounded-lg mb-6 text-white text-center">
              <div className="flex justify-center mb-3">
                <Award size={40} />
              </div>
              <div className="text-2xl font-bold mb-2">הגעתי ל-{Math.round(progress)}% מהיעד שלי</div>
              <div className="text-lg">אני בדרך למענק של {goal.toLocaleString()} ₪!</div>
              <div className="text-sm mt-3 opacity-80">מצטייני דיקאן</div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <button className="bg-red-100 text-red-600 p-3 rounded-lg flex flex-col items-center">
                <div className="mb-1">סטורי</div>
              </button>
              <button className="bg-gray-100 text-gray-600 p-3 rounded-lg flex flex-col items-center">
                <div className="mb-1">וואטסאפ</div>
              </button>
              <button className="bg-gray-200 text-gray-700 p-3 rounded-lg flex flex-col items-center">
                <div className="mb-1">העתק</div>
              </button>
            </div>
            <button
              onClick={() => setShowShareModal(false)}
              className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg"
            >
              סגור
            </button>
          </div>
        </div>
      )}
      
      {/* Notification */}
      {showNotification && (
        <div className="fixed bottom-20 left-0 right-0 flex justify-center pointer-events-none">
          <div className="bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center max-w-xs">
            <AlertCircle className="ml-2" size={20} />
            <span>הפעולה בוצעה בהצלחה!</span>
          </div>
        </div>
      )}
      
      {/* Notification Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3">
        <div className="flex items-center justify-center max-w-lg mx-auto">
          <div className="bg-red-100 rounded-full p-2 ml-3">
            <Gift className="text-red-700" size={20} />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">מבצע חיסכון מהיר – בונוס הפקדה לשבוע הקרוב</div>
          </div>
          <ChevronRight className="text-gray-400" size={20} />
        </div>
      </div>
    </div>
  );
}