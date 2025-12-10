import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, YAxis, CartesianGrid } from 'recharts';
import { DollarSign, TrendingUp, Download, Ghost, X, Check, LayoutDashboard, Trash2, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- UTILS ---
const formatCurrency = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

const getDaysInMonth = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
};

const STORAGE_KEY = 'mochi_feline_budget_v1';

// --- COMPONENT: THE MOCHI CAT ---
const MochiCat = ({ mood }) => {
  const containerVariants = {
    HAPPY: { y: [0, -20, 0], rotate: [0, -5, 5, 0], transition: { repeat: Infinity, duration: 0.6 } },
    EUPHORIC: { y: [0, -40, 0], scale: [1, 1.2, 1], rotate: [0, -10, 10, 0], transition: { repeat: Infinity, duration: 0.4 } },
    SAD: { y: 10, rotate: 0, scaleY: 0.95 },
    ANXIOUS: { x: [-2, 2, -2], transition: { repeat: Infinity, duration: 0.2 } },
    PANIC: { scale: [1, 1.1, 1], rotate: [-5, 5, -5], transition: { repeat: Infinity, duration: 0.3 } },
    DEAD: { opacity: 1, y: -20 },
    BEGGING: { rotate: 10, y: 5 }
  };

  const eyeVariants = {
    HAPPY: { scaleY: 1, scaleX: 1 },
    EUPHORIC: { scale: 1.2 },
    SAD: { scaleY: 0.5, rotate: -10 },
    ANXIOUS: { scaleY: 1.2 },
    PANIC: { scale: 1.5 },
    DEAD: { scaleY: 0.1 },
    BEGGING: { scale: 1.3 }
  };

  const renderEyes = () => {
    if (mood === 'DEAD') {
      return (
        <g fill="none" stroke="#333" strokeWidth="3">
          <path d="M25,35 L35,45 M35,35 L25,45" />
          <path d="M65,35 L75,45 M75,35 L65,45" />
        </g>
      );
    }
    if (mood === 'EUPHORIC') {
        return (
            <g fill="#FF6B6B">
                <path d="M25,45 C20,35 15,45 25,52 C35,45 30,35 25,45" />
                <path d="M75,45 C70,35 65,45 75,52 C85,45 80,35 75,45" />
            </g>
        );
    }
    if (mood === 'HAPPY') {
        return (
            <g fill="none" stroke="#121212" strokeWidth="3">
                <path d="M25,45 Q30,35 35,45" />
                <path d="M65,45 Q70,35 75,45" />
            </g>
        );
    }
    return (
      <motion.g variants={eyeVariants} animate={mood}>
        <circle cx="30" cy="40" r={mood === 'BEGGING' ? 8 : 5} fill="#121212" />
        <circle cx="70" cy="40" r={mood === 'BEGGING' ? 8 : 5} fill="#121212" />
        {mood === 'BEGGING' && (
          <>
            <circle cx="32" cy="38" r="3" fill="white" />
            <circle cx="72" cy="38" r="3" fill="white" />
          </>
        )}
      </motion.g>
    );
  };

  const renderMouth = () => {
    if (mood === 'HAPPY') return <path d="M45,55 Q50,65 55,55" fill="none" stroke="#121212" strokeWidth="2" />;
    if (mood === 'EUPHORIC') return <path d="M40,60 Q50,75 60,60" fill="none" stroke="#121212" strokeWidth="3" />;
    if (mood === 'SAD') return <path d="M40,60 Q50,50 60,60" fill="none" stroke="#121212" strokeWidth="2" />;
    if (mood === 'ANXIOUS') return <path d="M45,60 Q50,55 55,60" fill="none" stroke="#121212" strokeWidth="2" />;
    if (mood === 'PANIC') return <circle cx="50" cy="60" r="8" fill="#121212" />;
    if (mood === 'DEAD') return <path d="M40,60 L60,60" fill="none" stroke="#121212" strokeWidth="2" />;
    if (mood === 'BEGGING') return <path d="M48,58 Q50,60 52,58" fill="none" stroke="#121212" strokeWidth="2" />;
    return <path d="M45,55 Q50,60 55,55" fill="none" stroke="#121212" strokeWidth="2" />;
  };

  const getBodyColor = () => {
    if (mood === 'PANIC') return '#FF6B6B';
    if (mood === 'DEAD') return '#E0E0E0';
    if (mood === 'ANXIOUS') return '#FFD93D';
    if (mood === 'SAD') return '#A0AEC0';
    if (mood === 'HAPPY') return '#68D391';
    if (mood === 'EUPHORIC') return '#F687B3';
    return '#FFFFFF';
  };

  return (
    <div className="relative w-48 h-48 flex justify-center items-center drop-shadow-2xl">
      {mood === 'DEAD' && (
        <motion.div 
          animate={{ y: -50, opacity: 0 }} 
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-0"
        >
          <Ghost size={40} className="text-gray-500" />
        </motion.div>
      )}
      {mood === 'PANIC' && (
        <motion.div 
          animate={{ y: [0, 20], opacity: [1, 0] }} 
          transition={{ repeat: Infinity, duration: 0.5 }}
          className="absolute top-10 right-10"
        >
          <div className="w-2 h-4 bg-blue-300 rounded-full" />
        </motion.div>
      )}
      {mood === 'EUPHORIC' && (
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0, 1, 0] }} 
          transition={{ repeat: Infinity, duration: 1 }}
          className="absolute top-0 right-10"
        >
            <div className="text-2xl">✨</div>
        </motion.div>
      )}

      <motion.svg
        width="180"
        height="180"
        viewBox="0 0 100 100"
        variants={containerVariants}
        animate={mood}
      >
        <path d="M20,30 L20,10 L40,25 Z" fill={getBodyColor()} stroke="#121212" strokeWidth="2" />
        <path d="M80,30 L80,10 L60,25 Z" fill={getBodyColor()} stroke="#121212" strokeWidth="2" />
        <ellipse cx="50" cy="55" rx="40" ry="35" fill={getBodyColor()} stroke="#121212" strokeWidth="3" />
        {renderEyes()}
        {renderMouth()}
        <circle cx="25" cy="50" r="5" fill="#FFC0CB" opacity="0.6" />
        <circle cx="75" cy="50" r="5" fill="#FFC0CB" opacity="0.6" />
        <path d="M15,50 L5,45" stroke="#121212" strokeWidth="1" />
        <path d="M15,55 L5,55" stroke="#121212" strokeWidth="1" />
        <path d="M85,50 L95,45" stroke="#121212" strokeWidth="1" />
        <path d="M85,55 L95,55" stroke="#121212" strokeWidth="1" />
        {mood === 'BEGGING' && (
            <path d="M35,75 Q50,85 65,75" fill="none" stroke="#121212" strokeWidth="3" />
        )}
      </motion.svg>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
const App = () => {
  const [appState, setAppState] = useState('ONBOARDING');
  const [income, setIncome] = useState('');
  const [savingsTarget, setSavingsTarget] = useState('');
  const [dailyBudgetLimit, setDailyBudgetLimit] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [streak, setStreak] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Interaction State
  const [inputType, setInputType] = useState(null); 
  const [amountInput, setAmountInput] = useState('');
  const [descInput, setDescInput] = useState('');
  const [catMood, setCatMood] = useState('HAPPY');
  const [moodOverride, setMoodOverride] = useState(null);
  const [notification, setNotification] = useState(null);

  // --- LOCAL STORAGE LOGIC ---
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
        try {
            const parsed = JSON.parse(savedData);
            setAppState(parsed.appState || 'ONBOARDING');
            setIncome(parsed.income || '');
            setSavingsTarget(parsed.savingsTarget || '');
            setDailyBudgetLimit(parsed.dailyBudgetLimit || 0);
            setTransactions(parsed.transactions || []);
            setStreak(parsed.streak || 0);
        } catch (e) {
            console.error("Failed to parse saved data", e);
        }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
        const dataToSave = {
            appState,
            income,
            savingsTarget,
            dailyBudgetLimit,
            transactions,
            streak
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    }
  }, [appState, income, savingsTarget, dailyBudgetLimit, transactions, streak, isLoaded]);

  // --- DERIVED DATA ---
  const spentToday = useMemo(() => {
    const today = new Date().toDateString();
    return transactions
        .filter(t => new Date(t.date).toDateString() === today && t.type === 'EXPENSE')
        .reduce((acc, t) => acc + t.amount, 0);
  }, [transactions]);

  const chartData = useMemo(() => {
      const grouped = {};
      transactions.forEach(t => {
          const day = new Date(t.date).toLocaleDateString(undefined, { weekday: 'short' });
          if (!grouped[day]) grouped[day] = 0;
          if (t.type === 'EXPENSE') grouped[day] += t.amount;
      });
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      return days.map(d => ({ day: d, spent: grouped[d] || 0 }));
  }, [transactions]);

  // --- LOGIC ---
  const calculateBudget = () => {
    const inc = parseFloat(income);
    const save = parseFloat(savingsTarget);
    if (!inc || isNaN(save)) {
      showNotification("Please enter valid numbers!", "error");
      return;
    }
    const daysInMonth = getDaysInMonth();
    const budget = (inc - save) / daysInMonth;
    
    if (budget < 0) {
      showNotification("You're saving more than you earn?!", "error");
      return;
    }

    setDailyBudgetLimit(budget);
    setAppState('DASHBOARD');
    setStreak(1); 
  };

  const showNotification = (msg, type = 'info') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const resetData = () => {
      if(window.confirm("Are you sure you want to reset all data? This cannot be undone.")) {
          localStorage.removeItem(STORAGE_KEY);
          setAppState('ONBOARDING');
          setIncome('');
          setSavingsTarget('');
          setDailyBudgetLimit(0);
          setTransactions([]);
          setStreak(0);
      }
  };

  // --- CAT EMOTION ENGINE ---
  useEffect(() => {
    if (appState === 'ONBOARDING') return;
    if (moodOverride) {
        setCatMood(moodOverride);
        return;
    }

    if (inputType === 'EXPENSE' && amountInput) {
        const val = parseFloat(amountInput);
        const projectedTotal = spentToday + val;
        const percent = (projectedTotal / dailyBudgetLimit) * 100;

        if (percent > 100) setCatMood('DEAD');
        else if (percent > 90) setCatMood('SAD');
        else if (percent > 75) setCatMood('PANIC');
        else if (percent > 50) setCatMood('ANXIOUS');
        else setCatMood('BEGGING');
        return;
    }

    if (inputType === 'INCOME') {
        setCatMood('EUPHORIC');
        return;
    }

    const percentUsed = (spentToday / dailyBudgetLimit) * 100;
    if (percentUsed >= 100) setCatMood('DEAD');
    else if (percentUsed >= 90) setCatMood('SAD');
    else if (percentUsed >= 75) setCatMood('PANIC');
    else if (percentUsed >= 50) setCatMood('ANXIOUS');
    else setCatMood('HAPPY');

  }, [spentToday, dailyBudgetLimit, inputType, amountInput, appState, moodOverride]);


  const handleTransaction = () => {
    const val = parseFloat(amountInput);
    if (!val || val <= 0) return;

    const newTransaction = {
        id: Date.now(),
        date: new Date().toISOString(),
        amount: val,
        type: inputType,
        description: descInput || (inputType === 'INCOME' ? 'Deposit' : 'Expense')
    };

    setTransactions(prev => [...prev, newTransaction]);
    
    if (inputType === 'INCOME') {
        const daysInMonth = getDaysInMonth();
        const dailyIncrease = val / daysInMonth;
        setDailyBudgetLimit(prev => prev + dailyIncrease);
        showNotification("Budget Increased! Mochi is thrilled!", "success");
        setMoodOverride('EUPHORIC');
        setTimeout(() => setMoodOverride(null), 4000);
    } else {
        if (spentToday + val > dailyBudgetLimit) {
            setStreak(0);
            showNotification("Streak broken!", "error");
        }
    }

    setAmountInput('');
    setDescInput('');
    setInputType(null);
  };

  const handleDeleteTransaction = (id) => {
    const transactionToDelete = transactions.find(t => t.id === id);
    if (!transactionToDelete) return;

    setTransactions(prev => prev.filter(t => t.id !== id));

    if (transactionToDelete.type === 'INCOME') {
        const daysInMonth = getDaysInMonth();
        const dailyDecrease = transactionToDelete.amount / daysInMonth;
        setDailyBudgetLimit(prev => Math.max(0, prev - dailyDecrease));
        showNotification("Income removed. Budget adjusted.", "info");
    } else {
        showNotification("Expense removed.", "info");
    }
  };

  const exportReport = () => {
    const headers = ["Date", "Time", "Type", "Description", "Amount", "Daily Limit"];
    const rows = transactions.map(t => {
        const d = new Date(t.date);
        return [
            d.toLocaleDateString(),
            d.toLocaleTimeString(),
            t.type,
            `"${t.description}"`,
            t.amount.toFixed(2),
            dailyBudgetLimit.toFixed(2)
        ];
    });
    
    let csvContent = "data:text/csv;charset=utf-8," 
        + headers.join(",") + "\n"
        + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Mochi_Report_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- RENDER HELPERS ---
  const remaining = dailyBudgetLimit - spentToday;
  const percentUsed = (spentToday / dailyBudgetLimit) * 100;
  
  let themeColor = 'text-cyan-400';
  let progressColor = 'bg-cyan-400';
  
  if (percentUsed > 100) {
      themeColor = 'text-gray-500';
      progressColor = 'bg-gray-700';
  } else if (percentUsed >= 90) {
      themeColor = 'text-red-500';
      progressColor = 'bg-red-500';
  } else if (percentUsed >= 75) {
      themeColor = 'text-orange-500';
      progressColor = 'bg-orange-500';
  } else if (percentUsed >= 50) {
      themeColor = 'text-yellow-400';
      progressColor = 'bg-yellow-400';
  }

  const getDialogue = () => {
    if (inputType === 'EXPENSE') {
        if (catMood === 'DEAD') return "I see the light... stop...";
        if (catMood === 'SAD') return "So hungry... don't spend...";
        if (catMood === 'PANIC') return "NO! WE ARE BROKE! STOP!";
        if (catMood === 'ANXIOUS') return "Do we really need this?";
        if (catMood === 'BEGGING') return "Please... I'm saving for a boat...";
    }
    if (inputType === 'INCOME') return "Make it rain!";

    switch(catMood) {
      case 'EUPHORIC': return "I LOVE MONEY! YAY!";
      case 'HAPPY': return "Purrfect! Keep saving!";
      case 'SAD': return "My tummy rumbles... so hungry...";
      case 'ANXIOUS': return "I'm getting nervous...";
      case 'PANIC': return "PUT THE WALLET DOWN!";
      case 'DEAD': return "*Ghost Noises*";
      default: return "Meow.";
    }
  };

  const styles = `
    body { margin: 0; background: #000; overflow: hidden; }
    .app-wrapper {
        display: flex;
        width: 100vw;
        height: 100vh;
        background-color: #121212;
        color: white;
    }
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #1a1a1a; }
    ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #444; }
  `;

  // --- VIEW: ONBOARDING ---
  if (!isLoaded) return <div className="bg-black w-screen h-screen"></div>;

  if (appState === 'ONBOARDING') {
    return (
      <div className="flex w-screen h-screen items-center justify-center bg-black">
        <style>{styles}</style>
        <div className="w-full max-w-md bg-gray-900 p-10 rounded-3xl shadow-2xl border border-gray-800 relative z-10">
            <div className="flex justify-center mb-8">
                <MochiCat mood="HAPPY" />
            </div>
            <h1 className="text-4xl font-bold mb-2 text-center text-cyan-400">Frugal Feline</h1>
            <p className="text-gray-400 text-center mb-10">Desktop Edition</p>
            <div className="space-y-6">
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Monthly Income</label>
                    <input 
                        type="number" 
                        placeholder="3000" 
                        value={income}
                        className="w-full p-4 mt-2 bg-gray-800 rounded-xl border border-gray-700 text-white text-lg outline-none focus:border-cyan-400 transition"
                        onChange={(e) => setIncome(e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Savings Goal</label>
                    <input 
                        type="number" 
                        placeholder="500" 
                        value={savingsTarget}
                        className="w-full p-4 mt-2 bg-gray-800 rounded-xl border border-gray-700 text-white text-lg outline-none focus:border-cyan-400 transition"
                        onChange={(e) => setSavingsTarget(e.target.value)}
                    />
                </div>
                <button 
                    onClick={calculateBudget}
                    className="w-full text-white font-bold p-4 rounded-xl shadow-lg hover:scale-[1.02] transition mt-4"
                    style={{ backgroundColor: '#10b981' }} // Force Emerald Green
                >
                    Start Tracking
                </button>
            </div>
        </div>
      </div>
    );
  }

  // --- VIEW: DESKTOP DASHBOARD ---
  return (
    <div className="app-wrapper">
       <style>{styles}</style>
      
      {/* Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className={`fixed top-0 left-1/2 transform -translate-x-1/2 z-[200] px-8 py-4 rounded-xl shadow-2xl font-bold border ${notification.type === 'error' ? 'bg-red-900/90 border-red-500 text-white' : 'bg-cyan-900/90 border-cyan-400 text-cyan-100'}`}
          >
            {notification.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* LEFT SIDEBAR: Controls & Character - FIXED, NO OVERLAP */}
      <div className="w-[400px] h-full bg-gray-900 border-r border-gray-800 flex flex-col p-8 relative shadow-2xl z-20 shrink-0">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-10 opacity-70">
            <LayoutDashboard size={20} className="text-cyan-400"/>
            <span className="font-bold tracking-widest uppercase text-sm">Dashboard</span>
        </div>

        {/* Character Stage */}
        <div className="flex-1 flex flex-col items-center justify-center min-h-[300px]">
            <MochiCat mood={catMood} />
            <motion.div 
                key={getDialogue()} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 bg-black/50 px-6 py-4 rounded-2xl border border-gray-700 text-center"
            >
                <p className={`font-bold text-lg ${themeColor}`}>{getDialogue()}</p>
            </motion.div>
        </div>

        {/* Stats */}
        <div className="mt-8 space-y-6">
            <div className="bg-black/40 p-6 rounded-2xl border border-gray-800">
                <span className="text-gray-400 text-sm mb-1 block">Daily Remaining</span>
                <div className={`text-6xl font-mono font-bold tracking-tighter ${themeColor}`}>
                    {formatCurrency(remaining)}
                </div>
                
                <div className="w-full h-3 bg-gray-800 rounded-full mt-6 overflow-hidden relative">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(Math.max(percentUsed, 0), 100)}%` }}
                        className={`h-full absolute left-0 ${progressColor}`}
                    />
                </div>
                <div className="flex justify-between w-full mt-3 text-xs text-gray-500 font-mono">
                    <span>Spent: {formatCurrency(spentToday)}</span>
                    <span>Limit: {formatCurrency(dailyBudgetLimit)}</span>
                </div>
            </div>

            {/* Action Buttons: FIXED BRIGHT COLORS */}
            <div className="grid grid-cols-2 gap-4">
                <button 
                    onClick={() => setInputType('INCOME')}
                    className="p-4 bg-emerald-500 rounded-xl hover:bg-emerald-400 hover:scale-[1.02] active:scale-95 transition-all flex flex-col items-center justify-center gap-2 group shadow-lg"
                >
                    <TrendingUp size={24} className="text-white" />
                    <span className="font-bold text-sm text-white">Add Income</span>
                </button>
                <button 
                    onClick={() => setInputType('EXPENSE')}
                    className="p-4 bg-red-600 rounded-xl hover:bg-red-500 hover:scale-[1.02] active:scale-95 transition-all flex flex-col items-center justify-center gap-2 group shadow-lg"
                >
                    <DollarSign size={24} className="text-white font-bold" />
                    <span className="font-bold text-sm text-white">Add Spend</span>
                </button>
            </div>
        </div>

        {/* Streak Badge */}
        <div className="absolute top-8 right-8 flex flex-col items-end">
             <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full border border-gray-700">
                <span>🔥</span>
                <span className="font-mono font-bold text-sm">{streak} Day Streak</span>
            </div>
        </div>
      </div>

      {/* RIGHT CONTENT: Data & History & INPUT OVERLAY */}
      <div className="flex-1 h-full flex flex-col overflow-hidden bg-[#121212] relative">
        
        {/* Top Bar */}
        <div className="h-20 border-b border-gray-800 flex items-center justify-between px-8 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
            <h2 className="text-2xl font-bold text-white">Analytics & History</h2>
            <div className="flex gap-2">
                <button onClick={resetData} className="flex items-center gap-2 px-4 py-2 bg-red-900/30 text-red-400 rounded-lg hover:bg-red-900/50 transition text-sm font-bold border border-red-900">
                    <RotateCcw size={16} />
                    Reset Data
                </button>
                <button onClick={exportReport} className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 hover:text-white transition text-sm font-bold text-gray-400 border border-gray-700">
                    <Download size={16} />
                    Export CSV
                </button>
            </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
            {/* Chart Section */}
            <div className="w-full bg-gray-900 rounded-3xl p-6 border border-gray-800 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                        <XAxis dataKey="day" stroke="#666" tickLine={false} axisLine={false} />
                        <YAxis stroke="#666" tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
                            cursor={{ stroke: '#374151', strokeWidth: 2 }}
                        />
                        <Line 
                            type="monotone" 
                            dataKey="spent" 
                            stroke="#22D3EE" 
                            strokeWidth={4} 
                            dot={{ r: 4, fill: '#22D3EE', strokeWidth: 0 }}
                            activeDot={{ r: 8 }} 
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Transactions List */}
            <div>
                <h3 className="text-gray-400 font-bold uppercase tracking-wider text-sm mb-4">Recent Transactions</h3>
                <div className="space-y-3">
                    {transactions.length === 0 ? (
                        <div className="text-center text-gray-600 py-20 border-2 border-dashed border-gray-800 rounded-2xl">
                            <p className="text-lg">No data yet.</p>
                            <p className="text-sm">Use the panel on the left to add transactions.</p>
                        </div>
                    ) : (
                        transactions.slice().reverse().map(t => (
                            <motion.div 
                                key={t.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-gray-900 p-5 rounded-xl border border-gray-800 hover:border-gray-700 transition flex justify-between items-center group"
                            >
                                <div className="flex items-center gap-5">
                                    <div className={`p-4 rounded-full ${t.type === 'INCOME' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                        {t.type === 'INCOME' ? <TrendingUp size={24} /> : <DollarSign size={24} />}
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg text-white group-hover:text-cyan-400 transition">{t.description}</p>
                                        <p className="text-sm text-gray-500">{new Date(t.date).toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className={`font-mono font-bold text-xl ${t.type === 'INCOME' ? 'text-green-400' : 'text-red-400'}`}>
                                        {t.type === 'INCOME' ? '+' : '-'}{formatCurrency(t.amount)}
                                    </div>
                                    <button 
                                        onClick={() => handleDeleteTransaction(t.id)}
                                        className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>

        {/* INPUT OVERLAY - RIGHT PANEL ONLY - MOCHI IS SAFE */}
        <AnimatePresence>
        {inputType && (
            <div className="absolute inset-0 z-30 flex items-center justify-center p-8">
                {/* Backdrop inside Right Panel */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setInputType(null)}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />
                
                {/* Modal Card */}
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="bg-gray-900 w-full max-w-lg rounded-3xl p-8 shadow-2xl border border-gray-700 relative z-40"
                >
                     <div className="flex flex-col gap-6">
                        <div className="flex justify-between items-center">
                             <h3 className={`text-xl font-bold uppercase tracking-wider ${inputType === 'INCOME' ? 'text-emerald-400' : 'text-red-400'}`}>
                                {inputType === 'INCOME' ? 'Add Income' : 'Add Expense'}
                            </h3>
                            <button onClick={() => setInputType(null)} className="p-2 bg-gray-800 hover:bg-red-500 hover:text-white rounded-full transition group">
                                <X className="text-gray-400 group-hover:text-white" size={20} />
                            </button>
                        </div>

                        <div className="flex items-center gap-4 bg-black p-6 rounded-2xl border border-gray-700">
                            <span className="text-4xl font-mono text-gray-500">$</span>
                            <input 
                                autoFocus
                                type="number" 
                                className="w-full bg-transparent text-5xl text-white font-mono outline-none"
                                placeholder="0.00"
                                value={amountInput}
                                onChange={(e) => setAmountInput(e.target.value)}
                            />
                        </div>

                        <input 
                            type="text" 
                            className="w-full bg-black border border-gray-700 rounded-xl p-5 text-white outline-none focus:border-cyan-400 transition text-lg"
                            placeholder={inputType === 'INCOME' ? "Where is this from?" : "What did you buy?"}
                            value={descInput}
                            onChange={(e) => setDescInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleTransaction()}
                        />
                        
                        <button 
                            onClick={handleTransaction}
                            className={`w-full p-5 rounded-xl font-bold text-xl text-white shadow-lg hover:scale-[1.02] active:scale-95 transition flex items-center justify-center gap-2 mt-2 ${inputType === 'INCOME' ? 'bg-emerald-500 hover:bg-emerald-400' : 'bg-red-600 hover:bg-red-500'}`}
                        >
                            <Check size={28} />
                            Confirm
                        </button>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
};

export default App;