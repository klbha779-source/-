/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, RotateCcw, CheckCircle2, Brain, Activity, Clock, ArrowRight, Zap, Volume2, ListTree, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { sessions, Session, Exercise } from './data';

let activeAudioCtx: AudioContext | null = null;

const stopBeep = () => {
  if (activeAudioCtx) {
    activeAudioCtx.close().catch(console.error);
    activeAudioCtx = null;
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

export default function App() {
  const [activeTab, setActiveTab] = useState<'training' | 'roadmap' | 'benefits'>('training');
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [speed, setSpeed] = useState(1);
  
  const timerRef = useRef<number | null>(null);

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

  // Timer logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
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
          // Session complete
          alert("أحسنت! لقد أكملت الجلسة التدريبية بنجاح.");
          setSelectedSession(null);
          setCurrentExerciseIndex(0);
        }
      } else {
        // Exercise finished, start rest
        playBeep('rest');
        if (selectedSession && currentExerciseIndex < selectedSession.exercises.length - 1) {
          setIsResting(true);
          setTimeLeft(REST_DURATION);
          setIsRunning(true); // Auto-start rest
        } else {
          // Last exercise finished
          playBeep('end');
          alert("أحسنت! لقد أكملت الجلسة التدريبية بنجاح.");
          setSelectedSession(null);
          setCurrentExerciseIndex(0);
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
      }
    } else {
      if (selectedSession && currentExerciseIndex < selectedSession.exercises.length - 1) {
        setIsResting(true);
        setTimeLeft(REST_DURATION);
      }
    }
  };

  const resetTimer = () => {
    stopBeep(); // Stop alarm if user interacts
    setIsRunning(false);
    if (isResting) {
      setTimeLeft(REST_DURATION);
    } else if (selectedSession) {
      setTimeLeft(selectedSession.exercises[currentExerciseIndex].durationMinutes * 60);
    }
  };

  if (!selectedSession) {
    return (
      <div dir="rtl" className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500/30">
        <div className="max-w-4xl mx-auto p-6 pt-12">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              الزون الاحترافي
            </h1>
            <p className="text-slate-400 text-lg">اختر جلستك التدريبية لليوم وانطلق نحو الاحتراف</p>
          </header>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12 bg-slate-900/50 p-2 rounded-2xl border border-slate-800 w-fit mx-auto">
            <button 
              onClick={() => setActiveTab('training')}
              className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'training' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
            >
              <Play className="w-5 h-5" />
              <span>التدريب</span>
            </button>
            <button 
              onClick={() => setActiveTab('roadmap')}
              className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'roadmap' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
            >
              <ListTree className="w-5 h-5" />
              <span>خريطة الجلسات</span>
            </button>
            <button 
              onClick={() => setActiveTab('benefits')}
              className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'benefits' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
            >
              <Target className="w-5 h-5" />
              <span>الفوائد والأهداف</span>
            </button>
          </div>

          {activeTab === 'training' && (
            <div className="grid md:grid-cols-2 gap-6">
              {sessions.map((session) => (
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
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-right hover:border-emerald-500/50 transition-colors group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity group-hover:opacity-100 opacity-0"></div>
                  <h2 className="text-2xl font-bold mb-2 text-emerald-400">{session.title}</h2>
                  <p className="text-slate-400 mb-6">{session.exercises.length} تمارين مخصصة</p>
                  
                  <div className="flex items-center text-emerald-500 font-medium">
                    <span>ابدأ الجلسة</span>
                    <ArrowRight className="mr-2 w-5 h-5 rotate-180" />
                  </div>
                </motion.button>
              ))}
            </div>
          )}

          {activeTab === 'roadmap' && (
            <div className="space-y-16">
               {sessions.map(session => (
                 <div key={session.id} className="bg-slate-900/30 p-6 md:p-8 rounded-3xl border border-slate-800">
                   <h2 className="text-2xl font-bold text-emerald-400 mb-8 flex items-center gap-3">
                     <ListTree className="w-6 h-6" />
                     {session.title}
                   </h2>
                   <div className="relative border-r-2 border-slate-800 pr-6 md:pr-8 space-y-8">
                     {session.exercises.map((ex, idx) => (
                       <div key={ex.id} className="relative">
                         <div className="absolute -right-[33px] md:-right-[41px] top-4 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-slate-950" />
                         <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/30 transition-colors">
                           <div className="flex justify-between items-start mb-2">
                             <h3 className="font-bold text-lg text-white">{idx + 1}. {ex.title}</h3>
                             <span className="text-sm font-bold bg-slate-800 text-emerald-400 px-3 py-1 rounded-lg">{ex.durationMinutes} د</span>
                           </div>
                           <p className="text-slate-400 text-sm">{ex.description}</p>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
               ))}
            </div>
          )}

          {activeTab === 'benefits' && (
            <div className="space-y-12">
              {sessions.map(session => (
                <div key={session.id}>
                  <h2 className="text-2xl font-bold text-emerald-400 mb-6">{session.title}</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {session.exercises.map(ex => (
                      <div key={ex.id} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/30 transition-colors">
                        <h3 className="text-xl font-bold text-white mb-3">{ex.title}</h3>
                        <div className="mb-4">
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1.5 rounded-lg">
                            <Target className="w-3.5 h-3.5" />
                            يستهدف: {ex.targets}
                          </span>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-slate-500 mb-1">الاستفادة:</p>
                            <p className="text-slate-300 text-sm leading-relaxed">{ex.benefits}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  const currentExercise = selectedSession.exercises[currentExerciseIndex];
  const progress = isResting 
    ? ((REST_DURATION - timeLeft) / REST_DURATION) * 100 
    : ((currentExercise.durationMinutes * 60 - timeLeft) / (currentExercise.durationMinutes * 60)) * 100;

  const nextExercise = currentExerciseIndex < selectedSession.exercises.length - 1 
    ? selectedSession.exercises[currentExerciseIndex + 1] 
    : null;

  return (
    <div dir="rtl" className="min-h-screen bg-slate-950 text-slate-50 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 p-4 flex justify-between items-center sticky top-0 z-10">
        <div>
          <h2 className="text-xl font-bold text-emerald-400">{selectedSession.title}</h2>
          <p className="text-sm text-slate-400">
            تمرين {currentExerciseIndex + 1} من {selectedSession.exercises.length}
          </p>
        </div>
        <button 
          onClick={() => {
            stopBeep();
            setSelectedSession(null);
          }}
          className="text-slate-400 hover:text-white text-sm px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          تغيير الجلسة
        </button>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto p-6 flex flex-col md:flex-row gap-8 items-start">
        
        {/* Timer Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-slate-900 rounded-3xl p-8 border border-slate-800 relative overflow-hidden">
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
              className="p-4 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              title="إعادة تعيين"
            >
              <RotateCcw className="w-6 h-6" />
            </button>
            
            <button 
              onClick={toggleTimer}
              className={`p-6 rounded-full transition-transform hover:scale-105 active:scale-95 shadow-lg ${
                isResting 
                  ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20' 
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
              }`}
            >
              {isRunning ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
            </button>
            
            <button 
              onClick={skipToNext}
              className="p-4 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              title="تخطي"
            >
              <SkipForward className="w-6 h-6" />
            </button>
          </div>

          {/* Speed Controls */}
          <div className="mt-8 pt-6 border-t border-slate-800 w-full flex flex-col items-center z-10">
            <div className="flex items-center gap-2 text-slate-400 mb-3 text-sm">
              <Zap className="w-4 h-4" />
              <span>مسرع الوقت</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-slate-950/50 p-1.5 rounded-full border border-slate-800">
              {[1, 2, 5, 10, 60].map(s => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
                    speed === s 
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
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
                  <div className="bg-cyan-950/30 border border-cyan-900/50 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4 text-cyan-400">
                      <Clock className="w-6 h-6" />
                      <h3 className="text-xl font-bold">استراحة محارب - استعد للقادم</h3>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      خذ دقيقة للراحة. اشرب القليل من الماء، نظم تنفسك، واقرأ تفاصيل التمرين القادم لتبدأ فور انتهاء الوقت.
                    </p>
                  </div>

                  {nextExercise ? (
                    <div className="space-y-4 opacity-100">
                      <div className="bg-emerald-900/40 border-2 border-emerald-500/50 rounded-2xl p-6 shadow-lg shadow-emerald-900/20">
                        <div className="flex items-center gap-2 text-emerald-400 mb-4">
                          <ArrowRight className="w-6 h-6" />
                          <h4 className="text-2xl font-bold">التمرين القادم: {nextExercise.title}</h4>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h5 className="text-emerald-300 font-bold mb-2 flex items-center gap-2"><Activity className="w-5 h-5"/> المطلوب منك:</h5>
                            <p className="text-slate-200 leading-relaxed text-base">
                              {nextExercise.description}
                            </p>
                          </div>
                          
                          <div className="bg-emerald-950/50 rounded-xl p-4 border border-emerald-800/50 mt-4">
                            <h5 className="text-emerald-400 font-bold mb-2 flex items-center gap-2"><Brain className="w-5 h-5"/> نصيحة جبارة:</h5>
                            <p className="text-emerald-100/90 leading-relaxed font-medium text-base">
                              {nextExercise.tips}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
                      <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">هذا آخر تمرين!</h3>
                      <p className="text-slate-400">أنت على وشك إنهاء الجلسة بنجاح.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3 text-emerald-400">
                      <Activity className="w-6 h-6" />
                      <h3 className="text-xl font-bold">كيفية الأداء</h3>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      {currentExercise.description}
                    </p>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3 text-blue-400">
                      <CheckCircle2 className="w-6 h-6" />
                      <h3 className="text-xl font-bold">الاستفادة</h3>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      {currentExercise.benefits}
                    </p>
                  </div>

                  <div className="bg-emerald-950/20 border border-emerald-900/50 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-2 h-full bg-emerald-500"></div>
                    <div className="flex items-center gap-3 mb-3 text-emerald-400">
                      <Brain className="w-6 h-6" />
                      <h3 className="text-xl font-bold">نصيحة جبارة</h3>
                    </div>
                    <p className="text-emerald-100/90 leading-relaxed font-medium">
                      {currentExercise.tips}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
