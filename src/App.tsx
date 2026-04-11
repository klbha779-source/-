/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, RotateCcw, CheckCircle2, Brain, Activity, Clock, ArrowRight, Zap, Volume2, ListTree, Plus, Save, Flame, Calendar, Camera, Upload, Loader2, Sun, Moon, Dumbbell, Map, HeartPulse, Utensils } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { sessions, Session, Exercise, weeklySchedule, getCaloriesForSession } from './data';

let activeAudioCtx: AudioContext | null = null;

const stopBeep = () => {
  if (activeAudioCtx) {
    activeAudioCtx.close().catch(console.error);
    activeAudioCtx = null;
  }
};

// Helper to play a short 3-beep sound
const playQuickBeeps = () => {
  stopBeep();
  try {
    activeAudioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const ctx = activeAudioCtx;
    const now = ctx.currentTime;
    
    for (let i = 0; i < 3; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now + i * 0.3); // High pitch
      gain.gain.setValueAtTime(0.5, now + i * 0.3);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.3 + 0.1);
      osc.start(now + i * 0.3);
      osc.stop(now + i * 0.3 + 0.1);
    }
  } catch (e) {
    console.error("Audio playback failed", e);
  }
};

// Helper to play a loud 10-second pulsing alarm using Web Audio API
const playBeep = (type: 'end' | 'rest') => {
  stopBeep(); // Stop any currently playing alarm
  try {
    activeAudioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const ctx = activeAudioCtx;
    const duration = 10; // 10 seconds
    
    // Create a pulsing alarm for 10 seconds (2 pulses per second)
    for (let i = 0; i < duration * 2; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      // 'square' wave is loud and piercing
      osc.type = 'square'; 
      
      // Alternate frequencies for an alarm effect
      const freq = i % 2 === 0 ? 800 : 1000;
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.5);
      
      // Max volume
      gain.gain.setValueAtTime(1, ctx.currentTime + i * 0.5);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.5 + 0.3);
      
      osc.start(ctx.currentTime + i * 0.5);
      osc.stop(ctx.currentTime + i * 0.5 + 0.4);
    }
  } catch (e) {
    console.error("Audio API not supported", e);
  }
};

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

const NavButton = ({ active, onClick, icon, text }: { active: boolean, onClick: () => void, icon: React.ReactNode, text: string }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
      active 
        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
        : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800'
    }`}
  >
    {icon}
    <span>{text}</span>
  </button>
);

const MobileNavButton = ({ active, onClick, icon, text }: { active: boolean, onClick: () => void, icon: React.ReactNode, text: string }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
      active ? 'text-emerald-500' : 'text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300'
    }`}
  >
    <div className={`p-1 rounded-full transition-all ${active ? 'bg-emerald-500/10' : ''}`}>
      {icon}
    </div>
    <span className="text-[10px] font-bold">{text}</span>
  </button>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<'training' | 'roadmap' | 'nighttime' | 'nutrition' | 'nervous_test'>('training');
  const [completedSessions, setCompletedSessions] = useState<string[]>([]);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('app-theme');
    return (saved as 'dark' | 'light') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('app-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  
  const [consumedCalories, setConsumedCalories] = useState<number>(0);
  const [consumedProtein, setConsumedProtein] = useState<number>(0);
  const [foodLog, setFoodLog] = useState<{name: string, calories: number, protein: number, time: string}[]>([]);
  const [foodInput, setFoodInput] = useState('');
  const [foodImage, setFoodImage] = useState<File | null>(null);
  const [isCalculatingFood, setIsCalculatingFood] = useState(false);

  const [customActivities, setCustomActivities] = useState<{name: string, calories: number, time: string}[]>([]);
  const [activityInput, setActivityInput] = useState('');
  const [isCalculatingActivity, setIsCalculatingActivity] = useState(false);

  useEffect(() => {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('lastDate');
    if (savedDate !== today) {
      localStorage.setItem('lastDate', today);
      localStorage.setItem('completedSessions', JSON.stringify([]));
      localStorage.setItem('completedExercises', JSON.stringify([]));
      localStorage.setItem('consumedCalories', '0');
      localStorage.setItem('consumedProtein', '0');
      localStorage.setItem('foodLog', JSON.stringify([]));
      localStorage.setItem('customActivities', JSON.stringify([]));
      setCompletedSessions([]);
      setCompletedExercises([]);
      setConsumedCalories(0);
      setConsumedProtein(0);
      setFoodLog([]);
      setCustomActivities([]);
    } else {
      const savedSessions = localStorage.getItem('completedSessions');
      if (savedSessions) setCompletedSessions(JSON.parse(savedSessions));
      const savedExercises = localStorage.getItem('completedExercises');
      if (savedExercises) setCompletedExercises(JSON.parse(savedExercises));
      const savedCalories = localStorage.getItem('consumedCalories');
      if (savedCalories) setConsumedCalories(Number(savedCalories));
      const savedProtein = localStorage.getItem('consumedProtein');
      if (savedProtein) setConsumedProtein(Number(savedProtein));
      const savedLog = localStorage.getItem('foodLog');
      if (savedLog) setFoodLog(JSON.parse(savedLog));
      const savedActivities = localStorage.getItem('customActivities');
      if (savedActivities) setCustomActivities(JSON.parse(savedActivities));
    }

    const hour = new Date().getHours();
    if (hour >= 20 || hour < 5) {
      setActiveTab('nighttime');
    }
  }, []);

  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDay());
  
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [speed, setSpeed] = useState(1);
  
  const timerRef = useRef<number | null>(null);

  // Nervous System Test State
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [hasTestStarted, setHasTestStarted] = useState(false);
  const [testTimeLeft, setTestTimeLeft] = useState(10);
  const [tapCount, setTapCount] = useState(0);
  const [bestTapCount, setBestTapCount] = useState(() => parseInt(localStorage.getItem('bestTapCount') || '0'));
  const [testResult, setTestResult] = useState<{status: 'excellent' | 'average' | 'fatigued', message: string} | null>(null);
  const testTimerRef = useRef<number | null>(null);

  const REST_DURATION = 60; // 1 minute rest

  // Initialize timer when exercise or session changes
  useEffect(() => {
    if (selectedSession && !isResting) {
      const exercise = selectedSession.exercises[currentExerciseIndex];
      if (exercise) {
        setTimeLeft(exercise.durationMinutes * 60);
      }
    }
  }, [selectedSession, currentExerciseIndex, isResting]);

  const completeSession = () => {
    playBeep('end');
    alert("أحسنت! لقد أكملت الجلسة التدريبية بنجاح.");
    if (selectedSession) {
      const newCompleted = [...completedSessions, selectedSession.id];
      setCompletedSessions(newCompleted);
      localStorage.setItem('completedSessions', JSON.stringify(newCompleted));
    }
    setSelectedSession(null);
    setCurrentExerciseIndex(0);
  };

  const markExerciseComplete = (sessionId: string, exerciseId: string) => {
    const key = `${sessionId}_${exerciseId}`;
    setCompletedExercises(prev => {
      if (!prev.includes(key)) {
        const next = [...prev, key];
        localStorage.setItem('completedExercises', JSON.stringify(next));
        return next;
      }
      return prev;
    });
  };

  // Timer logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          const next = prev - 1;
          if (selectedSession && selectedSession.exercises[currentExerciseIndex]?.id === 'n1' && next === 180) {
            playQuickBeeps();
          }
          return next;
        });
      }, 1000 / speed);
    } else if (timeLeft === 0 && isRunning) {
      // Timer finished
      setIsRunning(false);
      
      if (isResting) {
        // Rest finished, move to next exercise
        playBeep('end');
        setIsResting(false);
        if (selectedSession && currentExerciseIndex < selectedSession.exercises.length - 1) {
          setCurrentExerciseIndex(prev => prev + 1);
        } else {
          completeSession();
        }
      } else {
        // Exercise finished, start rest
        playBeep('rest');
        if (selectedSession) {
          markExerciseComplete(selectedSession.id, selectedSession.exercises[currentExerciseIndex].id);
        }

        if (selectedSession && currentExerciseIndex < selectedSession.exercises.length - 1) {
          const currentExercise = selectedSession.exercises[currentExerciseIndex];
          const restTime = currentExercise.restDurationSeconds !== undefined ? currentExercise.restDurationSeconds : REST_DURATION;
          
          if (restTime > 0) {
            setIsResting(true);
            setTimeLeft(restTime);
            setIsRunning(true); // Auto-start rest
          } else {
            // No rest, move to next exercise
            setCurrentExerciseIndex(prev => prev + 1);
            setIsRunning(true);
          }
        } else {
          completeSession();
        }
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft, isResting, currentExerciseIndex, selectedSession, speed]);

  const toggleTimer = () => {
    stopBeep(); // Stop alarm if user interacts
    setIsRunning(!isRunning);
  };
  
  const skipToNext = () => {
    stopBeep(); // Stop alarm if user interacts
    setIsRunning(false);
    if (isResting) {
      setIsResting(false);
      if (selectedSession && currentExerciseIndex < selectedSession.exercises.length - 1) {
        setCurrentExerciseIndex(prev => prev + 1);
      } else {
        completeSession();
      }
    } else {
      if (selectedSession) {
        markExerciseComplete(selectedSession.id, selectedSession.exercises[currentExerciseIndex].id);
      }
      if (selectedSession && currentExerciseIndex < selectedSession.exercises.length - 1) {
        const currentExercise = selectedSession.exercises[currentExerciseIndex];
        const restTime = currentExercise.restDurationSeconds !== undefined ? currentExercise.restDurationSeconds : REST_DURATION;
        if (restTime > 0) {
          setIsResting(true);
          setTimeLeft(restTime);
        } else {
          setCurrentExerciseIndex(prev => prev + 1);
        }
      } else {
        completeSession();
      }
    }
  };

  const skipToPrevious = () => {
    stopBeep(); // Stop alarm if user interacts
    setIsRunning(false);
    if (isResting) {
      setIsResting(false);
    } else {
      if (selectedSession && currentExerciseIndex > 0) {
        setCurrentExerciseIndex(prev => prev - 1);
      } else if (selectedSession) {
        setTimeLeft(selectedSession.exercises[0].durationMinutes * 60);
      }
    }
  };

  const resetTimer = () => {
    stopBeep(); // Stop alarm if user interacts
    setIsRunning(false);
    if (isResting) {
      const currentExercise = selectedSession?.exercises[currentExerciseIndex];
      const restTime = currentExercise?.restDurationSeconds !== undefined ? currentExercise.restDurationSeconds : REST_DURATION;
      setTimeLeft(restTime);
    } else if (selectedSession) {
      setTimeLeft(selectedSession.exercises[currentExerciseIndex].durationMinutes * 60);
    }
  };

  // Nervous System Test Logic
  useEffect(() => {
    let interval: number | undefined;
    if (isTestRunning && hasTestStarted) {
      interval = window.setInterval(() => {
        setTestTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTestRunning, hasTestStarted]);

  useEffect(() => {
    if (isTestRunning && hasTestStarted && testTimeLeft === 0) {
      setIsTestRunning(false);
      setHasTestStarted(false);
      
      if (tapCount >= 60) {
        setTestResult({
          status: 'excellent',
          message: `ممتاز جداً ونشط! (${tapCount} نقرة). جهازك العصبي في قمة استعداده، اذهب وحطم الأوزان!`
        });
      } else if (tapCount > 45 && tapCount < 60) {
        setTestResult({
          status: 'average',
          message: `متوسط (${tapCount} نقرة). جهازك العصبي في حالة جيدة، يمكنك أداء تمرينك بشكل طبيعي.`
        });
      } else {
        setTestResult({
          status: 'fatigued',
          message: `منهك مركزياً (${tapCount} نقرة). جهازك العصبي متعب اليوم، يُفضل أداء مهارات خفيفة فقط أو أخذ راحة.`
        });
      }

      if (tapCount > bestTapCount) {
        setBestTapCount(tapCount);
        localStorage.setItem('bestTapCount', tapCount.toString());
      }
    }
  }, [testTimeLeft, isTestRunning, hasTestStarted, tapCount, bestTapCount]);

  const startNervousTest = () => {
    setTapCount(0);
    setTestTimeLeft(10);
    setTestResult(null);
    setIsTestRunning(true);
    setHasTestStarted(false);
  };

  const handleTestTap = () => {
    if (isTestRunning) {
      if (!hasTestStarted) {
        setHasTestStarted(true);
      }
      setTapCount((prev) => prev + 1);
    }
  };

  const calculateSessionTotalTime = (session: Session) => {
    let totalSeconds = 0;
    session.exercises.forEach((ex, index) => {
      totalSeconds += ex.durationMinutes * 60;
      if (index < session.exercises.length - 1) {
        totalSeconds += ex.restDurationSeconds !== undefined ? ex.restDurationSeconds : REST_DURATION;
      }
    });
    return formatTime(totalSeconds);
  };

  const calculateBurnedCalories = () => {
    let total = 0;
    completedExercises.forEach(key => {
      const [sessionId, exerciseId] = key.split('_');
      const session = sessions.find(s => s.id === sessionId);
      if (session) {
        const exercise = session.exercises.find(e => e.id === exerciseId);
        if (exercise) {
          const totalSessionMinutes = session.exercises.reduce((sum, ex) => sum + ex.durationMinutes, 0);
          const exerciseCalories = getCaloriesForSession(sessionId) * (exercise.durationMinutes / totalSessionMinutes);
          total += exerciseCalories;
        }
      }
    });
    customActivities.forEach(act => {
      total += act.calories;
    });
    return Math.round(total);
  };

  const handleCalculateActivity = async () => {
    if (!activityInput.trim()) return;
    setIsCalculatingActivity(true);
    
    try {
      let apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === 'undefined' || apiKey === '""' || apiKey === "''") {
        apiKey = localStorage.getItem('userGeminiApiKey') || '';
        if (!apiKey) {
          apiKey = window.prompt("أنت تستخدم التطبيق كموقع خارجي. يرجى إدخال مفتاح Gemini API الخاص بك لتشغيل الذكاء الاصطناعي:") || '';
          if (apiKey) {
            localStorage.setItem('userGeminiApiKey', apiKey);
          } else {
            setIsCalculatingActivity(false);
            return;
          }
        }
      }

      const { GoogleGenAI, Type } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey: apiKey });
      
      let prompt = "أنت خبير رياضي. المستخدم (وزنه 63 كجم) سيخبرك بمجهود بدني إضافي قام به اليوم. قم بتقدير السعرات الحرارية المحروقة بدقة. أرجع البيانات بصيغة JSON تحتوي على: activity_name (اسم النشاط باختصار)، calories (رقم صحيح للسعرات المحروقة).";
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [prompt, activityInput],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              activity_name: { type: Type.STRING },
              calories: { type: Type.INTEGER }
            },
            required: ["activity_name", "calories"]
          }
        }
      });
      
      if (response.text) {
        const data = JSON.parse(response.text);
        
        const newLog = [...customActivities, {
          name: data.activity_name,
          calories: data.calories,
          time: new Date().toLocaleTimeString('ar-IQ', { hour: '2-digit', minute: '2-digit' })
        }];
        
        setCustomActivities(newLog);
        localStorage.setItem('customActivities', JSON.stringify(newLog));
        
        setActivityInput('');
      }
    } catch (error: any) {
      console.error("Error calculating activity:", error);
      const errorMessage = error?.message || '';
      if (errorMessage.includes('API key') || error?.status === 403 || error?.status === 400) {
        localStorage.removeItem('userGeminiApiKey');
        alert("مفتاح API غير صالح أو منتهي الصلاحية. يرجى المحاولة مرة أخرى وإدخال مفتاح صحيح.");
      } else {
        alert(`حدث خطأ أثناء حساب المجهود: ${errorMessage || 'يرجى المحاولة مرة أخرى.'}`);
      }
    } finally {
      setIsCalculatingActivity(false);
    }
  };

  const handleCalculateFood = async () => {
    if (!foodInput.trim() && !foodImage) return;
    setIsCalculatingFood(true);
    
    try {
      let apiKey = process.env.GEMINI_API_KEY;
      // Handle the case where the app is exported and API key is missing
      if (!apiKey || apiKey === 'undefined' || apiKey === '""' || apiKey === "''") {
        apiKey = localStorage.getItem('userGeminiApiKey') || '';
        if (!apiKey) {
          apiKey = window.prompt("أنت تستخدم التطبيق كموقع خارجي. يرجى إدخال مفتاح Gemini API الخاص بك لتشغيل الذكاء الاصطناعي:") || '';
          if (apiKey) {
            localStorage.setItem('userGeminiApiKey', apiKey);
          } else {
            setIsCalculatingFood(false);
            return;
          }
        }
      }

      const { GoogleGenAI, Type } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey: apiKey });
      
      let prompt = "أنت خبير تغذية رياضي. المستخدم سيعطيك وصفاً أو صورة لما أكله. قم بتقدير السعرات الحرارية والبروتين بدقة. أرجع البيانات بصيغة JSON تحتوي على: food_name (اسم الأكلة باختصار)، calories (رقم صحيح)، protein (رقم صحيح).";
      
      let contents: any[] = [prompt];
      if (foodInput.trim()) {
        contents.push(foodInput);
      }
      
      if (foodImage) {
        const reader = new FileReader();
        const base64Promise = new Promise<string>((resolve) => {
          reader.onload = () => resolve((reader.result as string).split(',')[1]);
          reader.readAsDataURL(foodImage);
        });
        const base64Data = await base64Promise;
        contents.push({
          inlineData: {
            data: base64Data,
            mimeType: foodImage.type
          }
        });
      }
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: contents,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              food_name: { type: Type.STRING },
              calories: { type: Type.INTEGER },
              protein: { type: Type.INTEGER }
            },
            required: ["food_name", "calories", "protein"]
          }
        }
      });
      
      if (response.text) {
        const data = JSON.parse(response.text);
        
        const newLog = [...foodLog, {
          name: data.food_name,
          calories: data.calories,
          protein: data.protein,
          time: new Date().toLocaleTimeString('ar-IQ', { hour: '2-digit', minute: '2-digit' })
        }];
        
        setFoodLog(newLog);
        setConsumedCalories(prev => {
          const next = prev + data.calories;
          localStorage.setItem('consumedCalories', String(next));
          return next;
        });
        setConsumedProtein(prev => {
          const next = prev + data.protein;
          localStorage.setItem('consumedProtein', String(next));
          return next;
        });
        localStorage.setItem('foodLog', JSON.stringify(newLog));
        
        setFoodInput('');
        setFoodImage(null);
      }
    } catch (error: any) {
      console.error("Error calculating food:", error);
      const errorMessage = error?.message || '';
      if (errorMessage.includes('API key') || error?.status === 403 || error?.status === 400) {
        localStorage.removeItem('userGeminiApiKey');
        alert("مفتاح API غير صالح أو منتهي الصلاحية. يرجى المحاولة مرة أخرى وإدخال مفتاح صحيح.");
      } else {
        alert(`حدث خطأ أثناء حساب السعرات: ${errorMessage || 'يرجى المحاولة مرة أخرى.'}`);
      }
    } finally {
      setIsCalculatingFood(false);
    }
  };

  if (!selectedSession) {
    return (
      <div dir="rtl" className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-slate-50 font-sans selection:bg-emerald-500/30 transition-colors duration-300 pb-24 md:pb-0">
        
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
              الزون الاحترافي
            </h1>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              <NavButton active={activeTab === 'training'} onClick={() => setActiveTab('training')} icon={<Dumbbell className="w-5 h-5" />} text="التدريب" />
              <NavButton active={activeTab === 'roadmap'} onClick={() => setActiveTab('roadmap')} icon={<Map className="w-5 h-5" />} text="الخريطة" />
              <NavButton active={activeTab === 'nighttime'} onClick={() => setActiveTab('nighttime')} icon={<HeartPulse className="w-5 h-5" />} text="الاستشفاء" />
              <NavButton active={activeTab === 'nutrition'} onClick={() => setActiveTab('nutrition')} icon={<Utensils className="w-5 h-5" />} text="التغذية" />
              <NavButton active={activeTab === 'nervous_test'} onClick={() => setActiveTab('nervous_test')} icon={<Zap className="w-5 h-5" />} text="فحص العصب" />
            </div>

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
          <div className="flex justify-around items-center h-16 px-2">
            <MobileNavButton active={activeTab === 'training'} onClick={() => setActiveTab('training')} icon={<Dumbbell className="w-6 h-6" />} text="التدريب" />
            <MobileNavButton active={activeTab === 'roadmap'} onClick={() => setActiveTab('roadmap')} icon={<Map className="w-6 h-6" />} text="الخريطة" />
            <MobileNavButton active={activeTab === 'nighttime'} onClick={() => setActiveTab('nighttime')} icon={<HeartPulse className="w-6 h-6" />} text="الاستشفاء" />
            <MobileNavButton active={activeTab === 'nutrition'} onClick={() => setActiveTab('nutrition')} icon={<Utensils className="w-6 h-6" />} text="التغذية" />
            <MobileNavButton active={activeTab === 'nervous_test'} onClick={() => setActiveTab('nervous_test')} icon={<Zap className="w-6 h-6" />} text="الفحص" />
          </div>
        </nav>

        <main className="max-w-4xl mx-auto p-4 md:p-6 pt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >

          {activeTab === 'training' && (
            <div className="space-y-6">
              <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-hide">
                {['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'].map((dayName, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedDay(idx)}
                    className={`whitespace-nowrap px-4 py-2 rounded-xl font-bold transition-all ${selectedDay === idx ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' : 'bg-white dark:bg-slate-900 text-gray-600 dark:text-slate-400 border border-gray-200 dark:border-slate-800 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-800'}`}
                  >
                    {dayName}
                  </button>
                ))}
              </div>

              <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 text-center mb-8 shadow-sm">
                <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-2">
                  <Calendar className="w-6 h-6" />
                  جدول اليوم: {weeklySchedule[selectedDay].title}
                </h2>
              </div>
              
              {weeklySchedule[selectedDay].sessionIds.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-12 text-center shadow-sm">
                  <h3 className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-4">يوم راحة تامة 🧘‍♂️</h3>
                  <p className="text-gray-500 dark:text-slate-400 text-lg">استمتع بيومك، استرخي، وتناول طعاماً صحياً لتعافي العضلات.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {weeklySchedule[selectedDay].sessionIds.every(id => completedSessions.includes(id)) && (
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-500/30 rounded-2xl p-6 text-center shadow-sm">
                      <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">تم انجاز اليوم بنجاح 🏆</h3>
                      <p className="text-emerald-700 dark:text-emerald-200/70 text-sm">لقد أكملت جميع الجلسات التدريبية المجدولة لهذا اليوم. بطل!</p>
                    </div>
                  )}
                  <div className="grid md:grid-cols-2 gap-6">
                    {weeklySchedule[selectedDay].sessionIds
                      .map(id => sessions.find(s => s.id === id))
                      .filter((s): s is Session => s !== undefined)
                      .map((session) => {
                        const isCompleted = completedSessions.includes(session.id);
                        return (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            key={session.id}
                            onClick={() => {
                              stopBeep();
                              setSelectedSession(session);
                              setCurrentExerciseIndex(0);
                              setIsResting(false);
                              setIsRunning(false);
                              setSpeed(1);
                            }}
                            className={`bg-white dark:bg-slate-900 border ${isCompleted ? 'border-emerald-500/50' : 'border-gray-200 dark:border-slate-800'} rounded-2xl p-8 text-right hover:border-emerald-500/50 transition-colors group relative overflow-hidden shadow-sm hover:shadow-md`}
                          >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity group-hover:opacity-100 opacity-0"></div>
                            <div className="flex justify-between items-start mb-2">
                              <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{session.title}</h2>
                              {isCompleted && (
                                <span className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 p-2 rounded-full" title="مكتمل">
                                  <CheckCircle2 className="w-5 h-5" />
                                </span>
                              )}
                            </div>
                            <div className="flex flex-col gap-2 mb-6">
                              <p className="text-gray-500 dark:text-slate-400">{session.exercises.length} تمارين مخصصة</p>
                              <p className="text-gray-400 dark:text-slate-500 text-sm flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                الوقت الإجمالي: {calculateSessionTotalTime(session)} دقيقة
                              </p>
                            </div>
                            
                            <div className={`flex items-center font-medium ${isCompleted ? 'text-emerald-500 dark:text-emerald-400' : 'text-emerald-600 dark:text-emerald-500'}`}>
                              <span>{isCompleted ? 'إعادة الجلسة' : 'ابدأ الجلسة'}</span>
                              <ArrowRight className="mr-2 w-5 h-5 rotate-180" />
                            </div>
                          </motion.button>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'roadmap' && (
            <div className="space-y-16">
               {sessions.map(session => (
                 <div key={session.id} className="bg-white dark:bg-slate-900/30 p-6 md:p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm">
                   <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-8 flex items-center gap-3">
                     <ListTree className="w-6 h-6" />
                     {session.title}
                   </h2>
                   <div className="relative border-r-2 border-gray-200 dark:border-slate-800 pr-6 md:pr-8 space-y-8">
                     {session.exercises.map((ex, idx) => (
                       <div key={ex.id} className="relative">
                         <div className="absolute -right-[33px] md:-right-[41px] top-4 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-white dark:ring-slate-950" />
                         <div className="bg-gray-50 dark:bg-slate-900 p-5 rounded-2xl border border-gray-200 dark:border-slate-800 hover:border-emerald-500/30 transition-colors shadow-sm">
                           <div className="flex justify-between items-start mb-2">
                             <h3 className="font-bold text-lg text-gray-900 dark:text-white">{idx + 1}. {ex.title}</h3>
                             <span className="text-sm font-bold bg-gray-200 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-lg">{ex.durationMinutes} د</span>
                           </div>
                           <p className="text-gray-600 dark:text-slate-400 text-sm">{ex.description}</p>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
               ))}
            </div>
          )}

          {activeTab === 'nighttime' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold text-center text-emerald-600 dark:text-emerald-400 mb-8">نظام الاستشفاء الليلي الجديد</h2>
              <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 text-gray-700 dark:text-slate-300 leading-relaxed shadow-sm">
                <p className="mb-4">
                  هذا النظام مصمم ليكون رفيقك في نهاية اليوم. يبدأ تلقائياً لضمان استشفاء عضلاتك، تحسين توازنك، ووقايتك من الإصابات.
                </p>
                <p className="mb-4">
                  "حيث لا تتوفر المعلومات بسرعة، فهذا يعني أن التحديثات ليست سريعة، بل مفصلة. وفوائد كل شيء واضحة."
                </p>
                <p>
                  استعد لرحلة استشفاء من أعماق الطب والفلسفة، كأنك تلعب كرة القدم لمليار سنة.
                </p>
              </div>
              <button
                onClick={() => {
                  const nightSession = sessions.find(s => s.id === 'night_recovery');
                  if (nightSession) {
                    setSelectedSession(nightSession);
                    setCurrentExerciseIndex(0);
                  }
                }}
                className="w-full bg-emerald-500 text-white dark:text-slate-950 font-bold py-4 rounded-xl hover:bg-emerald-400 transition-colors shadow-md shadow-emerald-500/20"
              >
                ابدأ جلسة الاستشفاء الليلي
              </button>
            </div>
          )}

          {activeTab === 'nutrition' && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-4">التغذية والسعرات الحرارية</h2>
                <p className="text-gray-500 dark:text-slate-400 text-lg">مصممة خصيصاً لك (وزن 63 كجم، طول 170 سم، عمر 20، طالب)</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 text-center shadow-sm">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Flame className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h3 className="text-gray-500 dark:text-slate-400 mb-2">السعرات المحروقة اليوم</h3>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {calculateBurnedCalories()} <span className="text-sm text-gray-400 dark:text-slate-500">kcal</span>
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 text-center shadow-sm">
                  <div className="w-16 h-16 bg-cyan-100 dark:bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Activity className="w-8 h-8 text-cyan-500" />
                  </div>
                  <h3 className="text-gray-500 dark:text-slate-400 mb-2">السعرات المطلوبة (للحفاظ والتعويض)</h3>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {2000 + calculateBurnedCalories()} <span className="text-sm text-gray-400 dark:text-slate-500">kcal</span>
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 text-center shadow-sm">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-purple-500" />
                  </div>
                  <h3 className="text-gray-500 dark:text-slate-400 mb-2">احتياج البروتين اليومي</h3>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    125 <span className="text-sm text-gray-400 dark:text-slate-500">جرام</span>
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-6">حاسبة السعرات الذكية 📸</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <p className="text-gray-600 dark:text-slate-300">اكتب ماذا أكلت أو ارفع صورة لوجبتك، وسنقوم بحساب السعرات والبروتين بدقة.</p>
                    <textarea
                      value={foodInput}
                      onChange={(e) => setFoodInput(e.target.value)}
                      placeholder="مثال: أكلت 150 جرام صدر دجاج مع كوب أرز أبيض..."
                      className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl p-4 text-gray-900 dark:text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none h-32"
                    />
                    <div className="flex items-center gap-4">
                      <label className="flex-1 flex items-center justify-center gap-2 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-600 dark:text-slate-300 py-3 rounded-xl cursor-pointer transition-colors border border-dashed border-gray-300 dark:border-slate-600">
                        <Camera className="w-5 h-5" />
                        <span>{foodImage ? 'تم اختيار صورة' : 'تصوير / رفع صورة'}</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setFoodImage(e.target.files[0]);
                            }
                          }}
                        />
                      </label>
                      <button 
                        onClick={handleCalculateFood}
                        disabled={isCalculatingFood || (!foodInput.trim() && !foodImage)}
                        className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:bg-gray-200 dark:disabled:bg-slate-800 disabled:text-gray-400 dark:disabled:text-slate-500 text-white dark:text-slate-950 font-bold py-3 rounded-xl transition-colors shadow-sm"
                      >
                        {isCalculatingFood ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                        <span>حساب وإضافة</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-slate-950 rounded-xl p-6 border border-gray-200 dark:border-slate-800 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-gray-900 dark:text-white">سجل اليوم</h4>
                      <span className="text-sm text-gray-500 dark:text-slate-400">المجموع: {consumedCalories} سعرة / {consumedProtein}g بروتين</span>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto space-y-3 pr-2 max-h-48">
                      {foodLog.length === 0 ? (
                        <div className="text-center text-gray-400 dark:text-slate-500 py-8">لم تقم بإضافة أي وجبة اليوم.</div>
                      ) : (
                        foodLog.map((log, idx) => (
                          <div key={idx} className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-gray-200 dark:border-slate-800 flex justify-between items-center shadow-sm">
                            <div>
                              <p className="font-bold text-gray-700 dark:text-slate-300">{log.name}</p>
                              <p className="text-xs text-gray-500 dark:text-slate-500">{log.time}</p>
                            </div>
                            <div className="text-left">
                              <p className="text-emerald-600 dark:text-emerald-400 font-bold">{log.calories} kcal</p>
                              <p className="text-xs text-purple-600 dark:text-purple-400">{log.protein}g protein</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-800">
                      {(() => {
                        const targetCalories = 2000 + calculateBurnedCalories();
                        const remaining = targetCalories - consumedCalories;
                        
                        if (consumedCalories === 0) {
                          return <p className="text-gray-500 dark:text-slate-400 text-sm text-center">ابدأ بتسجيل وجباتك لمعرفة مدى تقدمك.</p>;
                        }
                        
                        if (remaining <= 0) {
                          return (
                            <div className="text-center">
                              <p className="text-emerald-600 dark:text-emerald-400 font-bold mb-1">أحسنت يا بطل! 🏆</p>
                              <p className="text-sm text-gray-600 dark:text-slate-300">لقد وصلت للحد المطلوب من السعرات اليوم. استمر هكذا!</p>
                            </div>
                          );
                        } else {
                          return (
                            <div>
                              <p className="text-amber-600 dark:text-amber-400 font-bold mb-2 text-center">باقي لك {remaining} سعرة حرارية للوصول للهدف!</p>
                              <p className="text-xs text-gray-500 dark:text-slate-400 mb-2">مخاطر النقص: هدم عضلي، قلة تركيز في الدراسة، إرهاق سريع.</p>
                              <p className="text-sm text-gray-600 dark:text-slate-300">أكلات سريعة لتعويض النقص:</p>
                              <ul className="text-xs text-gray-500 dark:text-slate-400 list-disc list-inside mt-1">
                                {remaining > 500 && <li>وجبة شوفان مع حليب كامل الدسم ومكسرات وموز.</li>}
                                {remaining > 300 && remaining <= 500 && <li>ساندويتش زبدة فول سوداني مع كوب حليب.</li>}
                                {remaining <= 300 && <li>حفنة مكسرات (لوز/جوز) أو كوب زبادي يوناني مع عسل.</li>}
                              </ul>
                            </div>
                          );
                        }
                      })()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-6">حاسبة المجهود الإضافي 🏃‍♂️</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <p className="text-gray-600 dark:text-slate-300">هل قمت بمجهود بدني خارج الجدول؟ (مثل: لعبت مباراة، مشيت 10 آلاف خطوة، سباحة). اكتبه هنا وسنحسب السعرات المحروقة بدقة.</p>
                    <textarea
                      value={activityInput}
                      onChange={(e) => setActivityInput(e.target.value)}
                      placeholder="مثال: لعبت مباراة كرة قدم خماسي لمدة ساعة كاملة..."
                      className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl p-4 text-gray-900 dark:text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none h-32"
                    />
                    <button 
                      onClick={handleCalculateActivity}
                      disabled={isCalculatingActivity || !activityInput.trim()}
                      className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:bg-gray-200 dark:disabled:bg-slate-800 disabled:text-gray-400 dark:disabled:text-slate-500 text-white dark:text-slate-950 font-bold py-3 rounded-xl transition-colors shadow-sm"
                    >
                      {isCalculatingActivity ? <Loader2 className="w-5 h-5 animate-spin" /> : <Activity className="w-5 h-5" />}
                      <span>حساب المجهود وإضافته</span>
                    </button>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-slate-950 rounded-xl p-6 border border-gray-200 dark:border-slate-800 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-gray-900 dark:text-white">سجل المجهود الإضافي</h4>
                      <span className="text-sm text-gray-500 dark:text-slate-400">
                        المجموع: {customActivities.reduce((sum, act) => sum + act.calories, 0)} سعرة
                      </span>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto space-y-3 pr-2 max-h-48">
                      {customActivities.length === 0 ? (
                        <div className="text-center text-gray-400 dark:text-slate-500 py-8">لم تقم بإضافة أي مجهود إضافي اليوم.</div>
                      ) : (
                        customActivities.map((log, idx) => (
                          <div key={idx} className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-gray-200 dark:border-slate-800 flex justify-between items-center shadow-sm">
                            <div>
                              <p className="font-bold text-gray-700 dark:text-slate-300">{log.name}</p>
                              <p className="text-xs text-gray-500 dark:text-slate-500">{log.time}</p>
                            </div>
                            <div className="text-left">
                              <p className="text-emerald-600 dark:text-emerald-400 font-bold">+{log.calories} kcal</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-6">التعويض الدقيق (بالملي المضبوط 🎯)</h3>
                
                {calculateBurnedCalories() === 0 ? (
                  <div className="text-center text-gray-500 dark:text-slate-400 py-8">
                    <p className="text-xl mb-2">لم تقم بأي مجهود إضافي اليوم.</p>
                    <p>التزم بسعرات الثبات الخاصة بك (2000 سعرة) مقسمة على وجباتك المعتادة.</p>
                  </div>
                ) : (
                  <div className="space-y-6 text-gray-700 dark:text-slate-300">
                    <p className="text-lg mb-4">لقد حرقت <strong className="text-emerald-600 dark:text-emerald-400">{calculateBurnedCalories()} سعرة حرارية</strong> إضافية. لتعويضها بدقة تامة وبدون أي زيادة في الدهون، اختر إحدى الوجبتين التاليتين لإضافتها ليومك:</p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Option 1 */}
                      <div className="bg-emerald-50 dark:bg-slate-800/50 border border-emerald-200 dark:border-emerald-500/30 rounded-xl p-6 shadow-sm">
                        <h4 className="font-bold text-emerald-700 dark:text-emerald-400 text-xl mb-4">الخيار الأول: وجبة رئيسية (غداء/عشاء)</h4>
                        <ul className="space-y-3 text-lg">
                          <li className="flex justify-between border-b border-emerald-100 dark:border-slate-700 pb-2">
                            <span>أرز أبيض (مطبوخ)</span>
                            <span className="font-bold text-gray-900 dark:text-white">{Math.round((calculateBurnedCalories() * 0.55) / 1.3)} جرام</span>
                          </li>
                          <li className="flex justify-between border-b border-emerald-100 dark:border-slate-700 pb-2">
                            <span>صدر دجاج (مشوي/مسلوق)</span>
                            <span className="font-bold text-gray-900 dark:text-white">{Math.round((calculateBurnedCalories() * 0.35) / 1.65)} جرام</span>
                          </li>
                          <li className="flex justify-between border-b border-emerald-100 dark:border-slate-700 pb-2">
                            <span>زيت زيتون</span>
                            <span className="font-bold text-gray-900 dark:text-white">{Math.round((calculateBurnedCalories() * 0.10) / 9)} جرام</span>
                          </li>
                        </ul>
                        <div className="mt-4 text-sm text-emerald-600 dark:text-slate-400 text-center">
                          إجمالي السعرات: ~{Math.round(
                            (Math.round((calculateBurnedCalories() * 0.55) / 1.3) * 1.3) + 
                            (Math.round((calculateBurnedCalories() * 0.35) / 1.65) * 1.65) + 
                            (Math.round((calculateBurnedCalories() * 0.10) / 9) * 9)
                          )} kcal
                        </div>
                      </div>

                      {/* Option 2 */}
                      <div className="bg-cyan-50 dark:bg-slate-800/50 border border-cyan-200 dark:border-cyan-500/30 rounded-xl p-6 shadow-sm">
                        <h4 className="font-bold text-cyan-700 dark:text-cyan-400 text-xl mb-4">الخيار الثاني: وجبة سريعة (بعد التمرين)</h4>
                        <ul className="space-y-3 text-lg">
                          <li className="flex justify-between border-b border-cyan-100 dark:border-slate-700 pb-2">
                            <span>موز</span>
                            <span className="font-bold text-gray-900 dark:text-white">ثمرة متوسطة</span>
                          </li>
                          <li className="flex justify-between border-b border-cyan-100 dark:border-slate-700 pb-2">
                            <span>شوفان</span>
                            <span className="font-bold text-gray-900 dark:text-white">{Math.round((Math.max(0, calculateBurnedCalories() - 105) * 0.50) / 3.89)} جرام</span>
                          </li>
                          <li className="flex justify-between border-b border-cyan-100 dark:border-slate-700 pb-2">
                            <span>بروتين (واي بروتين)</span>
                            <span className="font-bold text-gray-900 dark:text-white">{Math.round((Math.max(0, calculateBurnedCalories() - 105) * 0.35) / 4.0)} جرام</span>
                          </li>
                          <li className="flex justify-between border-b border-cyan-100 dark:border-slate-700 pb-2">
                            <span>زبدة فول سوداني</span>
                            <span className="font-bold text-gray-900 dark:text-white">{Math.round((Math.max(0, calculateBurnedCalories() - 105) * 0.15) / 5.88)} جرام</span>
                          </li>
                        </ul>
                        <div className="mt-4 text-sm text-cyan-600 dark:text-slate-400 text-center">
                          إجمالي السعرات: ~{Math.round(
                            105 + 
                            (Math.round((Math.max(0, calculateBurnedCalories() - 105) * 0.50) / 3.89) * 3.89) + 
                            (Math.round((Math.max(0, calculateBurnedCalories() - 105) * 0.35) / 4.0) * 4.0) + 
                            (Math.round((Math.max(0, calculateBurnedCalories() - 105) * 0.15) / 5.88) * 5.88)
                          )} kcal
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-100 dark:bg-slate-800/50 p-4 rounded-xl mt-6">
                      <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">
                        <strong className="text-emerald-600 dark:text-emerald-400">ملاحظة هامة لطالب السادس:</strong> هذه الوجبات تعوض مجهودك البدني <strong>فقط</strong>. لا تنسَ أن عقلك يستهلك طاقة كبيرة جداً أثناء المذاكرة والتركيز. استمر في شرب الماء بكثرة (3-4 لتر)، وإذا شعرت بالجوع أثناء الدراسة، تناول حفنة لوز (حوالي 15 حبة) فهي ممتازة للتركيز ولا تزيد الوزن.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {activeTab === 'nervous_test' && (
            <div className="max-w-2xl mx-auto space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-4 flex items-center justify-center gap-3">
                  <Zap className="w-8 h-8" />
                  فحص الجهاز العصبي
                </h2>
                <p className="text-gray-500 dark:text-slate-400 text-lg leading-relaxed">
                  كيف تعرف أن جهازك العصبي "نشيط" أم "تعبان"؟ (اختبار نقرة الإصبع)
                  <br />
                  هذا الاختبار أدق من شعورك الشخصي، لأن العضلات قد تكذب لكن الجهاز العصبي لا يكذب.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-8 text-center relative overflow-hidden shadow-sm">
                {!isTestRunning && !testResult && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 dark:bg-slate-800/50 p-6 rounded-2xl text-right space-y-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Activity className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                        طريقة الاختبار:
                      </h3>
                      <p className="text-gray-700 dark:text-slate-300">
                        حاول أن تنقر على الزر الأخضر الكبير بأصبعك السبابة بأقصى سرعة ممكنة لمدة 10 ثوانٍ.
                      </p>
                      <ul className="list-disc list-inside text-gray-500 dark:text-slate-400 space-y-2">
                        <li><strong className="text-emerald-600 dark:text-emerald-400">60 نقرة فأكثر:</strong> ممتاز جداً ونشط، حطم الأوزان!</li>
                        <li><strong className="text-amber-600 dark:text-amber-400">46 إلى 59 نقرة:</strong> متوسط، العب تمرينك المعتاد.</li>
                        <li><strong className="text-red-600 dark:text-red-400">45 نقرة فأقل:</strong> منهك، العب مهارات خفيفة فقط.</li>
                      </ul>
                    </div>
                    <button
                      onClick={startNervousTest}
                      className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-white dark:text-slate-950 font-bold text-xl rounded-2xl transition-all shadow-lg shadow-emerald-500/20"
                    >
                      ابدأ الفحص الآن
                    </button>
                  </div>
                )}

                {isTestRunning && (
                  <div className="space-y-8">
                    <div className="flex justify-between items-center px-8">
                      <div className="text-center">
                        <div className="text-sm text-gray-500 dark:text-slate-400 mb-1">الوقت المتبقي</div>
                        <div className="text-4xl font-mono font-bold text-cyan-600 dark:text-cyan-400">{testTimeLeft}ث</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-500 dark:text-slate-400 mb-1">النقرات</div>
                        <div className="text-4xl font-mono font-bold text-emerald-600 dark:text-emerald-400">{tapCount}</div>
                      </div>
                    </div>
                    
                    <button
                      onPointerDown={handleTestTap}
                      className="w-full aspect-video bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 active:bg-emerald-500 dark:active:bg-emerald-500 active:scale-95 border-2 border-gray-200 dark:border-slate-700 active:border-emerald-400 rounded-3xl transition-all flex items-center justify-center select-none touch-manipulation shadow-inner"
                    >
                      <span className="text-3xl font-bold text-gray-400 dark:text-slate-400 pointer-events-none">
                        {!hasTestStarted ? "انقر هنا للبدء!" : "أسرع! أسرع!"}
                      </span>
                    </button>
                  </div>
                )}

                {testResult && !isTestRunning && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                    <div className={`p-8 rounded-2xl border-2 ${
                      testResult.status === 'excellent' ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-500/50 text-emerald-700 dark:text-emerald-400' :
                      testResult.status === 'average' ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-500/50 text-amber-700 dark:text-amber-400' :
                      'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-500/50 text-red-700 dark:text-red-400'
                    }`}>
                      <Brain className="w-16 h-16 mx-auto mb-4 opacity-80" />
                      <h3 className="text-2xl font-bold mb-4">النتيجة: {tapCount} نقرة</h3>
                      <p className="text-lg leading-relaxed text-gray-700 dark:text-slate-200">
                        {testResult.message}
                      </p>
                    </div>
                    
                    <div className="flex gap-4">
                      <button
                        onClick={startNervousTest}
                        className="flex-1 py-3 bg-gray-200 dark:bg-slate-800 hover:bg-gray-300 dark:hover:bg-slate-700 text-gray-900 dark:text-white font-bold rounded-xl transition-all shadow-sm"
                      >
                        إعادة الفحص
                      </button>
                      <button
                        onClick={() => setActiveTab('training')}
                        className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 text-white dark:text-slate-950 font-bold rounded-xl transition-all shadow-sm"
                      >
                        الذهاب للتدريب
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    );
  }

  const currentExercise = selectedSession.exercises[currentExerciseIndex];
  const restTime = currentExercise.restDurationSeconds !== undefined ? currentExercise.restDurationSeconds : REST_DURATION;
  const progress = isResting 
    ? ((restTime - timeLeft) / restTime) * 100 
    : ((currentExercise.durationMinutes * 60 - timeLeft) / (currentExercise.durationMinutes * 60)) * 100;

  const nextExercise = currentExerciseIndex < selectedSession.exercises.length - 1 
    ? selectedSession.exercises[currentExerciseIndex + 1] 
    : null;

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-slate-50 font-sans flex flex-col transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 p-4 flex justify-between items-center sticky top-0 z-40">
        <div>
          <h2 className="text-xl font-bold text-emerald-500 dark:text-emerald-400">{selectedSession.title}</h2>
          <p className="text-sm text-gray-500 dark:text-slate-400">
            تمرين {currentExerciseIndex + 1} من {selectedSession.exercises.length}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button 
            onClick={() => {
              stopBeep();
              setSelectedSession(null);
            }}
            className="text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white text-sm px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
          >
            تغيير الجلسة
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-6 flex flex-col md:flex-row gap-8 items-start">
        
        {/* Timer Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-200 dark:border-slate-800 relative overflow-hidden shadow-sm">
          {isResting && (
            <div className="absolute inset-0 bg-cyan-900/20 animate-pulse pointer-events-none"></div>
          )}
          
          <h3 className={`text-2xl font-bold mb-8 text-center leading-relaxed ${isResting ? 'text-cyan-400' : 'text-emerald-400'}`}>
            {isResting ? (nextExercise ? `استراحة! استعد لـ:\n${nextExercise.title}` : 'وقت الراحة!') : currentExercise.title}
          </h3>

          {/* Circular Timer */}
          <div className="relative w-64 h-64 mb-10 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="120"
                className="stroke-slate-800"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="128"
                cy="128"
                r="120"
                className={`${isResting ? 'stroke-cyan-400' : 'stroke-emerald-400'}`}
                strokeWidth="8"
                fill="none"
                strokeDasharray={2 * Math.PI * 120}
                strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
                strokeLinecap="round"
                style={{ transition: `stroke-dashoffset ${1000 / speed}ms linear` }}
              />
            </svg>
            <div className="text-6xl font-mono font-bold tracking-tighter z-10">
              {formatTime(timeLeft)}
            </div>
            {isResting && (
              <div className="absolute bottom-12 text-cyan-400 font-medium z-10">
                استرخِ وتنفس
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 z-10">
            <button 
              onClick={resetTimer}
              className="p-4 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white transition-colors shadow-sm"
              title="إعادة تعيين"
            >
              <RotateCcw className="w-6 h-6" />
            </button>

            <button 
              onClick={skipToPrevious}
              className="p-4 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white transition-colors shadow-sm"
              title="السابق"
            >
              <SkipBack className="w-6 h-6" />
            </button>
            
            <button 
              onClick={toggleTimer}
              className={`p-6 rounded-full transition-transform hover:scale-105 active:scale-95 shadow-lg ${
                isResting 
                  ? 'bg-cyan-500 hover:bg-cyan-400 text-white shadow-cyan-500/20' 
                  : 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-500/20'
              }`}
            >
              {isRunning ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
            </button>
            
            <button 
              onClick={skipToNext}
              className="p-4 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white transition-colors shadow-sm"
              title="التالي"
            >
              <SkipForward className="w-6 h-6" />
            </button>
          </div>

          {/* Speed Controls */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-800 w-full flex flex-col items-center z-10">
            <div className="flex items-center gap-2 text-gray-500 dark:text-slate-400 mb-3 text-sm">
              <Zap className="w-4 h-4" />
              <span>مسرع الوقت</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-gray-50 dark:bg-slate-950/50 p-1.5 rounded-full border border-gray-200 dark:border-slate-800">
              {[1, 2, 5, 10, 60].map(s => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
                    speed === s 
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' 
                      : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-slate-800'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={isResting ? 'rest' : currentExercise.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {isResting ? (
                <div className="space-y-6">
                  <div className="bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-900/50 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4 text-cyan-600 dark:text-cyan-400">
                      <Clock className="w-6 h-6" />
                      <h3 className="text-xl font-bold">استراحة محارب - استعد للقادم</h3>
                    </div>
                    <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
                      خذ دقيقة للراحة. اشرب القليل من الماء، نظم تنفسك، واقرأ تفاصيل التمرين القادم لتبدأ فور انتهاء الوقت.
                    </p>
                  </div>

                  {nextExercise ? (
                    <div className="space-y-4 opacity-100">
                      <div className="bg-emerald-50 dark:bg-emerald-900/40 border-2 border-emerald-200 dark:border-emerald-500/50 rounded-2xl p-6 shadow-lg shadow-emerald-500/5 dark:shadow-emerald-900/20">
                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-4">
                          <ArrowRight className="w-6 h-6" />
                          <h4 className="text-2xl font-bold">التمرين القادم: {nextExercise.title}</h4>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h5 className="text-emerald-700 dark:text-emerald-300 font-bold mb-2 flex items-center gap-2"><Activity className="w-5 h-5"/> المطلوب منك:</h5>
                            <p className="text-gray-700 dark:text-slate-200 leading-relaxed text-base">
                              {nextExercise.description}
                            </p>
                          </div>
                          
                          <div className="bg-emerald-100/50 dark:bg-emerald-950/50 rounded-xl p-4 border border-emerald-200/50 dark:border-emerald-800/50 mt-4">
                            <h5 className="text-emerald-600 dark:text-emerald-400 font-bold mb-2 flex items-center gap-2"><Brain className="w-5 h-5"/> نصيحة جبارة:</h5>
                            <p className="text-emerald-800 dark:text-emerald-100/90 leading-relaxed font-medium text-base">
                              {nextExercise.tips}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 text-center shadow-sm">
                      <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">هذا آخر تمرين!</h3>
                      <p className="text-gray-500 dark:text-slate-400">أنت على وشك إنهاء الجلسة بنجاح.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-3 text-emerald-500 dark:text-emerald-400">
                      <Activity className="w-6 h-6" />
                      <h3 className="text-xl font-bold">كيفية الأداء</h3>
                    </div>
                    <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
                      {currentExercise.description}
                    </p>
                  </div>

                  {currentExercise.setsAndReps && (
                    <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/50 rounded-2xl p-6 relative overflow-hidden shadow-sm">
                      <div className="absolute top-0 right-0 w-2 h-full bg-purple-500"></div>
                      <div className="flex items-center gap-3 mb-3 text-purple-600 dark:text-purple-400">
                        <Activity className="w-6 h-6" />
                        <h3 className="text-xl font-bold">التكرارات والجولات (احترافي)</h3>
                      </div>
                      <p className="text-purple-800 dark:text-purple-100/90 leading-relaxed font-medium">
                        {currentExercise.setsAndReps}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
