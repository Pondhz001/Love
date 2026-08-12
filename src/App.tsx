import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Heart, Sparkles, Gift, Crown, Activity, 
  HeartHandshake, ThumbsUp, Smile, UserPlus, 
  MessageCircleHeart, Star, Settings, Trash2, 
  ArrowLeft, CheckCircle, Cake, Users,
  Coffee, Droplet, ShoppingBag, Car, Home, X, Clock
} from 'lucide-react';

import { Card, GameState, UserType } from './types';
import { GACHA_POOL_AOEY, GACHA_POOL_POND, EARN_TASKS, pullRandomCard, getRarityColor } from './data';
import { gameStateRef } from './firebase';
import { onSnapshot, setDoc } from 'firebase/firestore';

const iconMap: Record<string, React.ElementType> = {
  Heart, Sparkles, Gift, Crown, Activity,
  HeartHandshake, ThumbsUp, Smile, UserPlus,
  MessageCircleHeart, Star, Cake, Users,
  Coffee, Droplet, ShoppingBag, Car, Home, Trash2
};

const INITIAL_STATE: GameState = {
  points: { pond: 20, aoey: 20 },
  inventory: { pond: [], aoey: [] },
  pulledIds: { pond: [], aoey: [] },
  redeemedCount: { pond: 0, aoey: 0 },
  redemptionHistory: { pond: [], aoey: [] },
  usedCardsHistory: { pond: [], aoey: [] },
  deductions: [],
  taskHistory: { pond: [], aoey: [] }
};

type ScreenType = 'select_user' | 'home' | 'gacha' | 'inventory' | 'tasks';

function App() {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('select_user');
  const [taskTab, setTaskTab] = useState<'daily' | 'weekly'>('daily');
  
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(gameStateRef, (doc) => {
      if (doc.exists()) {
        setGameState(doc.data() as GameState);
      } else {
        setDoc(gameStateRef, INITIAL_STATE).catch(console.error);
      }
      setIsLoaded(true);
    });
    return unsub;
  }, []);

  const updateGameState = (updater: (prev: GameState) => GameState) => {
    setGameState(prev => {
      const nextState = updater(prev);
      setDoc(gameStateRef, nextState).catch(console.error);
      return nextState;
    });
  };

  // Admin states
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState(false);

  // Deduct states
  const [showDeductModal, setShowDeductModal] = useState(false);
  const [deductReason, setDeductReason] = useState('');

  // Gacha states
  const [boxClicks, setBoxClicks] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [pulledCard, setPulledCard] = useState<Card | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const boxRef = useRef<HTMLDivElement>(null);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword.toLowerCase() === 'pond33' || adminPassword.toLowerCase() === 'aoey36') {
      if (currentUser) {
        updateGameState(prev => ({
          ...prev,
          points: {
            ...prev.points,
            [currentUser]: prev.points[currentUser] + 5
          }
        }));
      }
      setShowAdminPanel(false);
      setAdminPassword('');
      setAdminError(false);
      setErrorMsg('');
      confetti({ particleCount: 50, spread: 60 });
    } else {
      setAdminError(true);
    }
  };

  const handleBoxClick = () => {
    if (!currentUser) return;
    if (isAnimating) return;
    
    if (gameState.points[currentUser] < 10) {
      setErrorMsg('แต้มสุ่มไม่พอน้า (ต้องใช้ 10 แต้ม) ไปทำภารกิจสะสมแต้มให้กันนะ! 🥲');
      return;
    }
    
    setErrorMsg('');
    const newClicks = boxClicks + 1;
    setBoxClicks(newClicks);

    // Box animation
    if (boxRef.current) {
      boxRef.current.style.transform = `scale(0.9) rotate(${(Math.random() - 0.5) * 10}deg)`;
      setTimeout(() => {
        if (boxRef.current) boxRef.current.style.transform = 'scale(1) rotate(0deg)';
      }, 100);
    }

    if (newClicks >= 3) {
      setIsAnimating(true);
      setBoxClicks(0);

      setTimeout(() => {
        const result = pullRandomCard(gameState.pulledIds[currentUser], currentUser);
        
        if (result) {
          updateGameState(prev => ({
            ...prev,
            points: { ...prev.points, [currentUser]: prev.points[currentUser] - 10 },
            inventory: { ...prev.inventory, [currentUser]: [result, ...prev.inventory[currentUser]] },
            pulledIds: { ...prev.pulledIds, [currentUser]: [...prev.pulledIds[currentUser], result.id] }
          }));
          setPulledCard(result);
          
          confetti({
            particleCount: result.rarity === 'SSR' ? 150 : result.rarity === 'SR' ? 80 : 40,
            spread: 70,
            origin: { y: 0.6 },
            colors: result.rarity === 'SSR' ? ['#FCD34D', '#F59E0B'] : undefined
          });
        } else {
          setErrorMsg('คูปองในตู้หมดแล้วจ้า! 💖');
        }
        setIsAnimating(false);
      }, 600);
    }
  };

  const getMonthlyRedeemedCount = (user: UserType) => {
    const legacyHistory = gameState.redemptionHistory?.[user] || [];
    const newHistory = gameState.usedCardsHistory?.[user] || [];
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    
    const legacyCount = legacyHistory.filter(ts => ts >= startOfMonth).length;
    const newCount = newHistory.filter(r => r.timestamp >= startOfMonth).length;
    
    return legacyCount + newCount;
  };

  const handleUseCard = (card: Card) => {
    if (!currentUser) return;
    const currentRedeemed = getMonthlyRedeemedCount(currentUser);
    if (currentRedeemed >= 10) return;

    updateGameState(prev => ({
      ...prev,
      inventory: {
        ...prev.inventory,
        [currentUser]: prev.inventory[currentUser].filter(c => c.id !== card.id)
      },
      usedCardsHistory: {
        ...prev.usedCardsHistory,
        [currentUser]: [
          { card, timestamp: Date.now() },
          ...(prev.usedCardsHistory?.[currentUser] || [])
        ]
      },
      redeemedCount: {
        ...prev.redeemedCount,
        [currentUser]: (prev.redeemedCount?.[currentUser] || 0) + 1
      }
    }));
    
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.3 } });
    const targetName = currentUser === 'pond' ? 'พี่เอ๋ย' : 'ปังปอนด์';
    alert(`🎉 ใช้คูปอง: ${card.title} สำเร็จ! แคปหน้านี้ส่งไปทวงสัญญาจาก ${targetName} ได้เลย! (เหลือโควต้าเดือนนี้อีก ${9 - currentRedeemed} ใบ)`);
  };

  const handleDiscardCard = (card: Card) => {
    if (!currentUser) return;
    if (confirm(`ทิ้งคูปอง "${card.title}" ใช่ไหม? (ทิ้งแล้วทิ้งเลยนะ!)`)) {
      updateGameState(prev => ({
        ...prev,
        inventory: {
          ...prev.inventory,
          [currentUser]: prev.inventory[currentUser].filter(c => c.id !== card.id)
        }
      }));
    }
  };

  const handleCompleteTask = (taskId: string, points: number, title: string) => {
    if (!currentUser) return;
    const partner = currentUser === 'pond' ? 'aoey' : 'pond';
    const partnerName = partner === 'pond' ? 'ปังปอนด์' : 'เอ๋ย';
    
    updateGameState(prev => ({
      ...prev,
      points: {
        ...prev.points,
        [partner]: prev.points[partner] + points
      },
      taskHistory: {
        ...prev.taskHistory,
        [partner]: [...(prev.taskHistory?.[partner] || []), { taskId, timestamp: Date.now() }]
      }
    }));
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 } });
    alert(`ให้รางวัล ${partnerName} เพิ่ม ${points} แต้มเรียบร้อย! 🎉`);
  };

  const handleDeductPoints = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !deductReason.trim()) return;
    
    const partner = currentUser === 'pond' ? 'aoey' : 'pond';
    const partnerName = partner === 'pond' ? 'ปังปอนด์' : 'เอ๋ย';
    
    const newDeduction = {
      id: Math.random().toString(36).substring(7),
      reason: deductReason,
      amount: 10,
      timestamp: Date.now(),
      deductedBy: currentUser,
      target: partner
    };

    updateGameState(prev => ({
      ...prev,
      points: {
        ...prev.points,
        [partner]: prev.points[partner] - 10
      },
      deductions: [newDeduction, ...(prev.deductions || [])]
    }));
    
    setShowDeductModal(false);
    setDeductReason('');
    alert(`หักแต้ม ${partnerName} ไป 10 แต้ม (1 สุ่ม) เรียบร้อย!\nเหตุผล: ${newDeduction.reason} 💔`);
  };

  // ---------------- Render Helpers ----------------

  const renderSelectUser = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen p-6 relative z-10"
    >
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl w-full max-w-sm text-center">
        <Heart className="w-16 h-16 text-rose-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Love Gacha 💖</h1>
        <p className="text-gray-500 mb-8">ใครเอ่ยกำลังจะเข้ามาเล่น?</p>

        <div className="space-y-4">
          <button 
            onClick={() => { setCurrentUser('pond'); setCurrentScreen('home'); }}
            className="w-full py-4 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-2xl font-semibold text-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
          >
            <Users className="w-5 h-5" />
            เข้าสู่ระบบ ปังปอนด์ (33)
          </button>
          
          <button 
            onClick={() => { setCurrentUser('aoey'); setCurrentScreen('home'); }}
            className="w-full py-4 bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-2xl font-semibold text-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
          >
            <Users className="w-5 h-5" />
            เข้าสู่ระบบ เอ๋ย (36)
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderHome = () => {
    if (!currentUser) return null;
    const isPond = currentUser === 'pond';
    const points = gameState.points[currentUser];

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 pb-20 w-full max-w-md mx-auto relative z-10">
        <div className="flex justify-between items-center mb-8 bg-white/60 p-4 rounded-3xl shadow-sm backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-md ${isPond ? 'bg-blue-500' : 'bg-rose-500'}`}>
              {isPond ? 'P' : 'A'}
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">ยินดีต้อนรับ</p>
              <h2 className="text-xl font-bold text-gray-800">{isPond ? 'ปังปอนด์ (33)' : 'เอ๋ย (36)'}</h2>
            </div>
          </div>
          <button onClick={() => { setCurrentUser(null); setCurrentScreen('select_user'); }} className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-50 transition-colors">
            สลับบัญชี
          </button>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-pink-100/50 mb-6 text-center">
          <p className="text-gray-500 font-medium mb-1">แต้มความรักที่มีตอนนี้</p>
          <div className="text-5xl font-black text-rose-500 mb-2 flex items-center justify-center gap-2">
            {points} <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
          </div>
          <p className="text-sm text-gray-400">ใช้สะสมไปสุ่มกาชานะ!</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => setCurrentScreen('gacha')} className="bg-gradient-to-br from-pink-400 to-rose-500 text-white p-6 rounded-3xl shadow-md hover:shadow-lg transition-all flex flex-col items-center justify-center gap-3 active:scale-95">
            <Gift className="w-8 h-8" />
            <span className="font-semibold text-lg">สุ่มคูปอง</span>
          </button>
          
          <button onClick={() => setCurrentScreen('tasks')} className="bg-gradient-to-br from-amber-400 to-orange-500 text-white p-6 rounded-3xl shadow-md hover:shadow-lg transition-all flex flex-col items-center justify-center gap-3 active:scale-95">
            <HeartHandshake className="w-8 h-8" />
            <span className="font-semibold text-lg">ภารกิจสะสมแต้ม</span>
          </button>

          <button onClick={() => setCurrentScreen('inventory')} className="col-span-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 rounded-3xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-4 active:scale-95">
            <div className="bg-white/20 p-3 rounded-full">
              <Star className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-lg">กระเป๋าคูปองของคุณ</div>
              <div className="text-sm opacity-90">มีคูปองสะสม {gameState.inventory[currentUser].length} ใบ</div>
            </div>
          </button>
        </div>
      </motion.div>
    );
  };

  const renderTasks = () => {
    const partner = currentUser === 'pond' ? 'aoey' : 'pond';
    const partnerName = currentUser === 'pond' ? 'เอ๋ย' : 'ปังปอนด์';
    
    const isSameDay = (d1: number, d2: number) => {
       const date1 = new Date(d1);
       const date2 = new Date(d2);
       return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
    };

    const isSameWeek = (d1: number, d2: number) => {
       const getStartOfWeek = (d: number) => {
           const date = new Date(d);
           const day = date.getDay();
           const diff = date.getDate() - day + (day === 0 ? -6 : 1);
           return new Date(date.setDate(diff)).setHours(0,0,0,0);
       };
       return getStartOfWeek(d1) === getStartOfWeek(d2);
    };

    const getTaskCount = (taskId: string, period: 'daily' | 'weekly') => {
       const today = Date.now();
       const history = gameState.taskHistory?.[partner] || [];
       return history.filter(record => {
           if (record.taskId !== taskId) return false;
           if (period === 'daily') return isSameDay(record.timestamp, today);
           return isSameWeek(record.timestamp, today);
       }).length;
    };
    
    return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-6 w-full max-w-md mx-auto relative z-10 min-h-screen pb-20">
      <div className="flex justify-between items-center mb-6 bg-white/80 p-4 rounded-3xl shadow-sm backdrop-blur-sm">
        <button onClick={() => setCurrentScreen('home')} className="p-2 bg-white rounded-full hover:bg-gray-50 shadow-sm"><ArrowLeft className="w-5 h-5 text-gray-700" /></button>
        <h2 className="text-xl font-bold text-gray-800">ภารกิจความรัก 📝</h2>
        <div className="w-9"></div> {/* spacer for centering */}
      </div>

      <div className="bg-white/80 rounded-3xl p-6 shadow-sm mb-6 text-center backdrop-blur-sm">
        <p className="text-gray-600 mb-2 font-medium">กดปุ่มให้แต้ม เมื่อแฟนทำตัวน่ารัก! 💖</p>
        <div className="text-sm text-gray-500">(เป็นการให้แต้ม {partnerName} สำหรับความดีในวันนี้นะ)</div>
      </div>

      <div className="flex bg-white/60 p-1.5 rounded-2xl mb-6 shadow-sm">
        <button
          onClick={() => setTaskTab('daily')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${taskTab === 'daily' ? 'bg-white text-rose-500 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
        >
          ภารกิจรายวัน
        </button>
        <button
          onClick={() => setTaskTab('weekly')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${taskTab === 'weekly' ? 'bg-white text-rose-500 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
        >
          ภารกิจรายสัปดาห์
        </button>
      </div>

      <div className="space-y-3">
        {EARN_TASKS.filter(t => t.period === taskTab).map(task => {
          const Icon = iconMap[task.iconName] || Heart;
          const displayTitle = task.title.replace('{partner}', partnerName);
          const currentCount = getTaskCount(task.id, task.period);
          const isMaxedOut = currentCount >= task.maxLimit;
          
          return (
            <div key={task.id} className={`p-4 rounded-2xl shadow-sm border flex flex-col gap-3 transition-colors ${isMaxedOut ? 'bg-gray-50 border-gray-100 opacity-70' : 'bg-white/90 border-gray-100'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${isMaxedOut ? 'bg-gray-200 text-gray-500' : task.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="font-medium text-gray-700 pr-2">{displayTitle}</div>
                </div>
                <button 
                  disabled={isMaxedOut}
                  onClick={() => handleCompleteTask(task.id, task.points, displayTitle)}
                  className={`flex items-center gap-1 px-3 py-2 rounded-xl font-bold text-sm shrink-0 shadow-sm transition-all ${isMaxedOut ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-rose-100 text-rose-600 hover:bg-rose-200 active:scale-95'}`}
                >
                  {isMaxedOut ? 'เต็มแล้ว' : `+${task.points}`} {!isMaxedOut && <Star className="w-3 h-3 fill-rose-600" />}
                </button>
              </div>
              <div className="flex items-center justify-between text-xs font-medium text-gray-400 px-1">
                <span>{taskTab === 'daily' ? 'รายวัน' : 'รายสัปดาห์'}</span>
                <span>({currentCount}/{task.maxLimit} ครั้ง)</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-6 border-t border-rose-100/50">
        <button 
          onClick={() => setShowDeductModal(true)}
          className="w-full bg-red-100 text-red-600 hover:bg-red-200 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
        >
          <Trash2 className="w-5 h-5" />
          หักคะแนน {partnerName} (ยึด 10 แต้ม)
        </button>
      </div>

      {showDeductModal && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-6 -mx-6">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="text-lg font-bold text-red-600 mb-4 flex items-center gap-2">
              <Trash2 className="w-5 h-5" /> หักคะแนน {partnerName} (10 แต้ม)
            </h3>
            <form onSubmit={handleDeductPoints}>
              <textarea
                value={deductReason}
                onChange={(e) => setDeductReason(e.target.value)}
                placeholder="เขียนสาเหตุที่หักแต้ม (เช่น ดื้อ, แอบหนีไปเล่นเกม...)"
                className="w-full px-4 py-3 rounded-xl bg-red-50 border border-red-200 focus:outline-none focus:ring-2 focus:ring-red-400 mb-4 h-24 resize-none"
                required
              />
              <div className="flex gap-2">
                <button type="button" onClick={() => setShowDeductModal(false)} className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200">ยกเลิก</button>
                <button type="submit" className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 shadow-sm">หักแต้มเลย!</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  )};

  const renderGacha = () => {
    if (!currentUser) return null;
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="p-6 min-h-screen flex flex-col max-w-md mx-auto relative z-10">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => { setCurrentScreen('home'); setPulledCard(null); }} className="p-2 bg-white/80 rounded-full hover:bg-white shadow-sm backdrop-blur-sm"><ArrowLeft className="w-5 h-5 text-gray-700" /></button>
          
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm font-bold text-rose-500">
            แต้ม: {gameState.points[currentUser]} <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>

          <button onClick={() => setShowAdminPanel(true)} className="p-2 bg-white/80 text-gray-400 hover:text-gray-600 rounded-full shadow-sm transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {!pulledCard ? (
              <motion.div key="box" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="flex flex-col items-center">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-600 mb-2">
                    {currentUser === 'aoey' ? 'คูปองจากปังปอนด์ 🎁' : 'คูปองจากพี่เอ๋ย 🎁'}
                  </h2>
                  <p className="text-gray-600 font-medium">แตะที่กล่อง 3 ครั้งเพื่อสุ่ม (ใช้ 10 แต้ม)</p>
                  {errorMsg && <p className="text-rose-500 text-sm mt-4 font-bold bg-rose-50 px-4 py-2 rounded-xl shadow-sm">{errorMsg}</p>}
                </div>
                
                <div ref={boxRef} onClick={handleBoxClick} className="w-56 h-56 bg-gradient-to-br from-rose-400 to-pink-500 rounded-[2.5rem] shadow-2xl flex items-center justify-center cursor-pointer hover:shadow-pink-300/50 transition-all active:scale-95 mb-6 relative overflow-hidden">
                  <div className="absolute top-0 w-full h-1/3 bg-gradient-to-b from-white/30 to-transparent"></div>
                  <Gift className="w-28 h-28 text-white drop-shadow-lg" />
                  <div className="absolute bottom-6 flex gap-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`w-3 h-3 rounded-full transition-all duration-300 ${boxClicks >= i ? 'bg-white scale-125 shadow-md' : 'bg-white/30'}`} />
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.5, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="w-full">
                {(() => {
                  const Icon = iconMap[pulledCard.iconName] || Heart;
                  const rarityStyle = getRarityColor(pulledCard.rarity);
                  return (
                    <div className={`w-full bg-gradient-to-br ${pulledCard.bgGradient} rounded-3xl p-8 shadow-2xl border-4 ${pulledCard.themeColor} relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-bl-full -z-0"></div>
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                          <span className={`px-4 py-1.5 rounded-full text-sm font-black tracking-wider shadow-sm ring-2 ${rarityStyle}`}>
                            {pulledCard.rarity}
                          </span>
                          <div className={`p-3 bg-white/50 rounded-2xl backdrop-blur-sm ${pulledCard.textColor}`}>
                            <Icon className="w-8 h-8" />
                          </div>
                        </div>
                        <h3 className={`text-2xl font-bold mb-3 ${pulledCard.textColor} leading-tight`}>{pulledCard.title}</h3>
                        <p className="text-gray-700/90 font-medium leading-relaxed mb-8">{pulledCard.message}</p>
                        <button onClick={() => setPulledCard(null)} className={`w-full py-4 bg-white/90 hover:bg-white rounded-xl font-bold shadow-sm transition-colors ${pulledCard.textColor}`}>
                          เก็บเข้ากระเป๋า
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {showAdminPanel && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-6 -mx-6">
            <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-gray-500" /> เติมแต้ม (แอดมิน)
              </h3>
              <form onSubmit={handleAdminLogin}>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="รหัสผ่าน..."
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-400 mb-2"
                />
                {adminError && <p className="text-rose-500 text-sm mb-4 font-medium">รหัสผ่านผิดจ้า!</p>}
                <div className="flex gap-2 mt-4">
                  <button type="button" onClick={() => setShowAdminPanel(false)} className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200">ยกเลิก</button>
                  <button type="submit" className="flex-1 py-3 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-900">ยืนยัน (+5 แต้ม)</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  const renderInventory = () => {
    if (!currentUser) return null;
    const inventory = gameState.inventory[currentUser];
    const redeemedCount = getMonthlyRedeemedCount(currentUser);

    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-6 pb-20 w-full max-w-md mx-auto min-h-screen relative z-10">
        <div className="flex items-center gap-4 mb-6 bg-white/80 p-4 rounded-3xl shadow-sm backdrop-blur-sm">
          <button onClick={() => setCurrentScreen('home')} className="p-2 bg-white rounded-full hover:bg-gray-50 shadow-sm"><ArrowLeft className="w-5 h-5 text-gray-700" /></button>
          <h2 className="text-xl font-bold text-gray-800 flex-1">กระเป๋าคูปอง 🎒</h2>
        </div>

        <div className="bg-rose-50 border border-rose-100 p-5 rounded-3xl mb-6 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">สิทธิ์การใช้คูปองในเดือนนี้</p>
            <p className="text-gray-800 font-bold">ใช้ไปแล้ว <span className="text-rose-500 text-lg">{redeemedCount} / 10</span> ใบ</p>
          </div>
          <div 
            onClick={() => setShowHistoryModal(true)}
            className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm cursor-pointer hover:bg-rose-100 transition-colors"
          >
            <Gift className="w-7 h-7 text-rose-400" />
          </div>
        </div>

        {inventory.length === 0 ? (
          <div className="text-center text-gray-400 py-16 bg-white/50 rounded-3xl border-2 border-dashed border-gray-200 backdrop-blur-sm">
            <Gift className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="font-medium text-lg text-gray-500">ยังไม่มีคูปองเลย<br/>รีบไปทำภารกิจและกดสุ่มกัน!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {inventory.map((card, idx) => {
              const Icon = iconMap[card.iconName] || Heart;
              const isMaxRedeemed = redeemedCount >= 10;
              
              return (
                <div key={`${card.id}-${idx}`} className={`bg-gradient-to-r ${card.bgGradient} p-6 rounded-3xl border-l-8 ${card.themeColor} shadow-md relative`}>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full bg-white/90 shadow-sm ${card.textColor}`}>{card.rarity}</span>
                      <h3 className={`font-bold text-lg ${card.textColor}`}>{card.title}</h3>
                    </div>
                    <Icon className={`w-6 h-6 ${card.textColor} opacity-80`} />
                  </div>
                  <p className="text-sm text-gray-700 font-medium mb-5 pr-8 leading-relaxed">{card.message}</p>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUseCard(card)}
                      disabled={isMaxRedeemed}
                      className={`flex-1 py-3 rounded-xl text-sm font-bold flex justify-center items-center gap-2 transition-all shadow-sm ${
                        isMaxRedeemed 
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                          : 'bg-white hover:bg-gray-50 text-gray-800'
                      }`}
                    >
                      <CheckCircle className="w-5 h-5" /> ใช้คูปองนี้
                    </button>
                    <button
                      onClick={() => handleDiscardCard(card)}
                      className="p-3 bg-white/60 hover:bg-rose-100 hover:text-rose-600 rounded-xl text-gray-400 transition-colors shadow-sm"
                      title="ทิ้งคูปอง"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* History Modal */}
        <AnimatePresence>
          {showHistoryModal && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
              onClick={() => setShowHistoryModal(false)}
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-3xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto shadow-2xl relative"
                onClick={e => e.stopPropagation()}
              >
                <button onClick={() => setShowHistoryModal(false)} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200"><X className="w-5 h-5"/></button>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-rose-100 text-rose-500 rounded-full flex justify-center items-center"><Gift className="w-6 h-6"/></div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">ประวัติการใช้คูปอง</h3>
                    <p className="text-sm text-gray-500">คูปองที่ใช้ไปในเดือนนี้</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {(gameState.usedCardsHistory?.[currentUser] || [])
                    .filter(record => {
                      const now = new Date();
                      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
                      return record.timestamp >= startOfMonth;
                    })
                    .sort((a, b) => b.timestamp - a.timestamp)
                    .map((record, idx) => (
                      <div key={idx} className={`p-4 rounded-2xl border border-gray-100 bg-gray-50 flex gap-3 items-center`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm border ${record.card.themeColor}`}>
                           <CheckCircle className={`w-5 h-5 ${record.card.textColor}`} />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800 text-sm">{record.card.title}</p>
                          <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                            <Clock className="w-3 h-3"/>
                            {new Date(record.timestamp).toLocaleString('th-TH', { 
                              dateStyle: 'medium', timeStyle: 'short' 
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                    {getMonthlyRedeemedCount(currentUser) === 0 && (
                      <div className="text-center py-8 text-gray-400 font-medium bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        ยังไม่มีประวัติการใช้คูปองในเดือนนี้
                      </div>
                    )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center font-sans">
        <Heart className="w-12 h-12 text-rose-500 animate-pulse mb-4" />
        <p className="text-gray-500 font-medium">กำลังเชื่อมต่อข้อมูลหัวใจ... 💖</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 selection:bg-pink-200 font-sans relative overflow-x-hidden flex justify-center">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 pointer-events-none"></div>
      
      <div className="w-full max-w-md bg-white/30 min-h-screen backdrop-blur-xl shadow-2xl relative">
        <AnimatePresence mode="wait">
          {currentScreen === 'select_user' && renderSelectUser()}
          {currentScreen === 'home' && renderHome()}
          {currentScreen === 'tasks' && renderTasks()}
          {currentScreen === 'gacha' && renderGacha()}
          {currentScreen === 'inventory' && renderInventory()}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
