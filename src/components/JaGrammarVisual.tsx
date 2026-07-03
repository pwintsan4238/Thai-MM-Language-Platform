import React, { useState } from 'react';
import { Volume2, Sparkles, BookOpen, Layers, CheckCircle2, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface JaGrammarVisualProps {
  speakText: (text: string) => void;
  audioSpeedIndex: number;
}

export default function JaGrammarVisual({ speakText, audioSpeedIndex }: JaGrammarVisualProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(0);
  const [viewMode, setViewMode] = useState<'diagram' | 'cards'>('diagram');
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showQuizCheck, setShowQuizCheck] = useState(false);

  // Exact data from user's manual handbook request
  const combinations = [
    { verb: "กิน", verbPhonetic: "kin", verbBurmese: "ကိန်း", result: "จะกิน", resultPhonetic: "ca kin", myanmar: "စားမယ်", english: "will eat" },
    { verb: "ทำ", verbPhonetic: "tham", verbBurmese: "ထမ်း", result: "จะทำ", resultPhonetic: "ca tham", myanmar: "လုပ်မယ်", english: "will do" },
    { verb: "ไป", verbPhonetic: "bpai", verbBurmese: "ပိုင်", result: "จะไป", resultPhonetic: "ca bpai", myanmar: "သွားမယ်", english: "will go" },
    { verb: "มา", verbPhonetic: "maa", verbBurmese: "မာ", result: "จะมา", resultPhonetic: "ca maa", myanmar: "လာမယ်", english: "will come" },
    { verb: "นอน", verbPhonetic: "nɔɔn", verbBurmese: "နျော်န်း", result: "จะนอน", resultPhonetic: "ca nɔɔn", myanmar: "အိပ်မယ်", english: "will sleep" },
    { verb: "เดิน", verbPhonetic: "dəən", verbBurmese: "ဒန်း", result: "จะเดิน", resultPhonetic: "ca  dəən", myanmar: "လမ်းလျှောက်မယ်", english: "will walk" },
    { verb: "เห็น", verbPhonetic: "hěn", verbBurmese: "ဟန်", result: "จะเห็น", resultPhonetic: "ca hěn", myanmar: "မြင်မယ်", english: "will see" },
    { verb: "ชอบ", verbPhonetic: "chɔ̂ɔp", verbBurmese: "ချော့ဘ်", result: "จะชอบ", resultPhonetic: "ca chɔ̂ɔp", myanmar: "ကြိုက်မယ်", english: "will like" },
    { verb: "ให้", verbPhonetic: "hâi", verbBurmese: "ဟိုက်", result: "จะให้", resultPhonetic: "ca hâi", myanmar: "ပေးမယ်", english: "will give" },
    { verb: "เอา", verbPhonetic: "ao", verbBurmese: "အောင်း", result: "จะเอา", resultPhonetic: "ca ao", myanmar: "ယူမယ်", english: "will take" },
    { verb: "รัก", verbPhonetic: "rák", verbBurmese: "ရတ်ခ်", result: "จะรัก", resultPhonetic: "ca rák", myanmar: "ချစ်မယ်", english: "will love" },
    { verb: "ซื้อ", verbPhonetic: "sʉ́ʉ", verbBurmese: "စူး", result: "จะซื้อ", resultPhonetic: "ca sʉ́ʉ", myanmar: "ဝယ်မယ်", english: "will buy" },
    { verb: "ขาย", verbPhonetic: "khǎaj", verbBurmese: "ခါႆ", result: "จะขาย", resultPhonetic: "ca khǎaj", myanmar: "ရောင်းမယ်", english: "will sell" },
    { verb: "ใช้", verbPhonetic: "cháaj", verbBurmese: "ချိုင်း", result: "จะใช้", resultPhonetic: "ca cháaj", myanmar: "သုံးမယ်", english: "will use" },
    { verb: "ทำงาน", verbPhonetic: "tham-ngaan", verbBurmese: "ထမ်းငါန်း", result: "จะทำงาน", resultPhonetic: "ca tham-ngaan", myanmar: "အလုပ်လုပ်မယ်", english: "will work" }
  ];

  const speedMultiplier = audioSpeedIndex === 0 ? "1.0x" : audioSpeedIndex === 1 ? "0.7x" : "0.5x";

  // Dimensions for high-fidelity straight diagonal line branching
  const rowHeight = 48;
  const numRows = combinations.length;
  const totalDiagramHeight = rowHeight * numRows;
  const yStartPoint = totalDiagramHeight / 2; // Center point for Left Root Node

  const handleRowClick = (idx: number, textToSpeak: string) => {
    setActiveIdx(idx);
    speakText(textToSpeak);
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setQuizScore(null);
    setShowQuizCheck(false);
  };

  const handleCheckQuiz = () => {
    let correct = 0;
    combinations.forEach((c, idx) => {
      const ans = quizAnswers[idx]?.trim().toLowerCase();
      const cleanTarget = c.result.trim().toLowerCase();
      if (ans === cleanTarget) {
        correct++;
      }
    });
    setQuizScore(correct);
    setShowQuizCheck(true);
  };

  return (
    <div className="space-y-6" id="ja-grammar-lesson-module">
      {/* Intro Header */}
      <div className="bg-[#583092]/5 border border-[#583092]/10 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-3xs select-none">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-[#583092] text-white rounded-xl shadow-2xs shrink-0 select-none">
            <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-sans font-black text-[#583092] flex items-center gap-1.5 uppercase tracking-wide">
              Future Auxiliary Word • จะ (ca / ja) [ကျ]
            </h4>
            <p className="text-[12px] font-sans text-brand-dark font-extrabold mt-0.5 leading-relaxed">
              In Thai, placing <span className="px-1.5 py-0.5 bg-[#583092]/10 text-[#583092] rounded-md font-sans font-black">จะ (ca / ja)</span> directly before any main verb creates a future action expression.
            </p>
            <p className="text-[11.5px] font-sans text-brand-muted font-bold italic mt-1 pl-2 border-l-2 border-brand-purple/20">
              ထိုင်းဘာသာစကားတွင် အနာဂတ်ကာလ (မည်/လိမ့်မည်) ကို ဖော်ပြရန် <span className="text-[#583092] font-black">"จะ" (ကျ)</span> ကို ကြိယာ၏ ရှေ့တွင် ထားရှိရုံသာဖြစ်ပြီး၊ ကြိယာပုံစံပြောင်းလဲခြင်းမရှိပါ။
            </p>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex gap-2 w-full md:w-auto self-stretch md:self-auto shrink-0">
          <button
            onClick={() => setViewMode('diagram')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-[11px] font-sans font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 border-b-3 ${
              viewMode === 'diagram'
                ? 'bg-[#583092] border-[#3b1d66] text-white shadow-xs'
                : 'bg-white border-gray-200 text-brand-muted hover:bg-gray-50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Interactive Diagram</span>
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-[11px] font-sans font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 border-b-3 ${
              viewMode === 'cards'
                ? 'bg-[#583092] border-[#3b1d66] text-white shadow-xs'
                : 'bg-white border-gray-200 text-brand-muted hover:bg-gray-50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Practice Test</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <AnimatePresence mode="wait">
        {viewMode === 'diagram' ? (
          <motion.div
            key="diagram"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center"
          >
            {/* Textbook Page Simulation Wrapper */}
            <div className="w-full max-w-2xl bg-[#fcf9f2] border-2 border-[#e6dec9] rounded-3xl shadow-md p-6 sm:p-10 relative overflow-x-auto select-text">
              {/* Notebook Red Margin Line */}
              <div className="absolute top-0 bottom-0 left-6 sm:left-10 w-[1.5px] bg-red-400/30 pointer-events-none" />
              
              {/* Textbook Heading Mimics Original Layout */}
              <div className="mb-6 text-center select-none">
                <h2 className="text-lg sm:text-xl font-sans font-black text-[#2c2419] tracking-wide relative inline-block pb-2">
                  จะ ကျ + ကြိယာ တွဲသုံးခြင်း
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2c2419]" />
                  <span className="absolute bottom-[-3px] left-1 right-1 h-[1px] bg-[#2c2419]/70" />
                </h2>
              </div>

              {/* Exact Line Diagram Box layout */}
              <div className="min-w-[550px] w-full relative flex items-stretch justify-between py-4 pl-4 sm:pl-8">
                
                {/* 1. Left Root Box: จะ (ကျ) */}
                <div className="w-24 shrink-0 flex items-center justify-center relative select-none">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => speakText("จะ")}
                    className={`px-4 py-3 bg-white border border-[#2c2419] rounded-xl shadow-xs transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer relative group ${
                      activeIdx !== null ? 'ring-2 ring-[#583092] border-[#583092] bg-purple-50/25' : ''
                    }`}
                    title="Hear pronunciation of จะ"
                  >
                    <span className="text-2xl font-sans font-black text-[#2c2419]">จะ</span>
                    <span className="text-xs font-sans font-black text-brand-purple bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">ကျ</span>
                    <Volume2 className="w-3.5 h-3.5 text-[#583092]/60 group-hover:text-[#583092] transition-colors" />
                  </motion.button>
                </div>

                {/* 2. SVG Radiating Straight Diagonal Line Branches */}
                <div className="w-16 sm:w-20 shrink-0 relative" style={{ height: `${totalDiagramHeight}px` }}>
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox={`0 0 100 ${totalDiagramHeight}`} preserveAspectRatio="none">
                    {combinations.map((_, i) => {
                      const yEnd = (i * rowHeight) + (rowHeight / 2);
                      const isHighlighted = activeIdx === i;
                      
                      return (
                        <line
                          key={i}
                          x1="0"
                          y1={yStartPoint}
                          x2="100"
                          y2={yEnd}
                          stroke={isHighlighted ? "#583092" : "#2c2419"}
                          strokeWidth={isHighlighted ? "2.5" : "1.2"}
                          opacity={isHighlighted ? "1" : "0.5"}
                          className="transition-all duration-300"
                        />
                      );
                    })}
                  </svg>
                </div>

                {/* 3. Middle Columns: Verb capsule -> Connection line -> Translation capsule */}
                <div className="flex-1 space-y-0" style={{ height: `${totalDiagramHeight}px` }}>
                  {combinations.map((comb, index) => {
                    const isActive = activeIdx === index;
                    return (
                      <div
                        key={index}
                        onClick={() => handleRowClick(index, comb.result)}
                        className="flex items-center gap-3 select-none cursor-pointer transition-all hover:bg-black/3 rounded-lg px-1.5 group"
                        style={{ height: `${rowHeight}px` }}
                      >
                        {/* Verb Rounded Capsule (e.g. กิน ကိန်း) */}
                        <div
                          className={`w-[170px] py-1 px-3 bg-white border rounded-xl flex items-center justify-between text-left shadow-3xs transition-all ${
                            isActive
                              ? 'border-[#583092] bg-purple-50/25 ring-1 ring-[#583092]/30 scale-[1.02]'
                              : 'border-[#2c2419]/70 group-hover:border-[#2c2419]'
                          }`}
                        >
                          <div className="truncate pr-1">
                            <span className="text-sm font-sans font-black text-[#2c2419]">{comb.verb}</span>
                            <span className="text-[11px] font-sans font-bold text-gray-500 ml-1.5">({comb.verbPhonetic})</span>
                          </div>
                          <span className="text-xs font-sans font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 shrink-0">
                            {comb.verbBurmese}
                          </span>
                        </div>

                        {/* Traditional Solid Connector line */}
                        <div className="flex-1 h-[1.2px] bg-[#2c2419]/50 relative flex items-center justify-end">
                          <div className="absolute right-0 w-1.5 h-1.5 border-t-[1.2px] border-r-[1.2px] border-[#2c2419]/60 rotate-45 transform -translate-y-[0.5px]" />
                        </div>

                        {/* Translation Capsule */}
                        <div
                          className={`w-[130px] py-1.5 px-3 bg-white border rounded-xl text-left shadow-3xs transition-all ${
                            isActive
                              ? 'border-[#583092] bg-purple-50/30 scale-[1.02]'
                              : 'border-[#2c2419]/70 group-hover:border-[#2c2419]'
                          }`}
                        >
                          <span className="text-xs font-sans font-black text-brand-dark leading-none">{comb.myanmar}</span>
                        </div>

                        {/* Action audio button indicator */}
                        <div className={`p-1.5 rounded-lg transition-all shrink-0 ${
                          isActive ? 'bg-[#583092] text-white' : 'text-gray-400 group-hover:text-[#583092]'
                        }`}>
                          <Volume2 className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

              {/* Page Number indicator matching schoolbook layout */}
              <div className="mt-6 pt-4 border-t border-[#e6dec9] flex items-center justify-between text-[11px] font-sans font-bold text-gray-500/80 px-4">
                <span>Sayar Som Chai • Grammar Handbook</span>
                <span className="font-mono bg-gray-200/50 px-2 py-0.5 rounded text-gray-600">Page 13</span>
              </div>
            </div>

            {/* Selected formula equation breakdown */}
            {activeIdx !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 w-full max-w-2xl bg-white border border-brand-purple/20 p-5 rounded-2xl shadow-3xs flex flex-col sm:flex-row items-center justify-between gap-4 text-left"
              >
                <div>
                  <span className="text-[10px] font-sans font-black uppercase text-brand-purple tracking-widest block mb-1.5">
                    Equation Breakdown • စကားလုံးပေါင်းစပ်ပုံအချိုး
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-base font-sans font-black text-brand-dark bg-[#583092]/10 px-2 py-0.5 rounded-lg">จะ (ကျ)</span>
                    <span className="text-lg font-sans font-extrabold text-gray-400">+</span>
                    <span className="text-base font-sans font-black text-brand-dark bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">
                      {combinations[activeIdx].verb} ({combinations[activeIdx].verbBurmese})
                    </span>
                    <span className="text-lg font-sans font-extrabold text-gray-400">➔</span>
                    <span className="text-base font-sans font-black text-white bg-[#583092] px-2.5 py-0.5 rounded-lg shadow-3xs">
                      {combinations[activeIdx].result}
                    </span>
                  </div>
                  <p className="text-[12px] font-sans font-extrabold text-brand-muted mt-2">
                    Resulting phrase meaning: <span className="text-[#583092] font-black underline">{combinations[activeIdx].myanmar}</span> (English: {combinations[activeIdx].english})
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0 self-stretch sm:self-auto justify-end">
                  <span className="text-[9px] font-sans font-black text-brand-muted bg-gray-100 px-2 py-1 rounded">
                    Speed: {speedMultiplier}
                  </span>
                  <button
                    onClick={() => speakText(combinations[activeIdx].result)}
                    className="p-3 bg-brand-purple hover:bg-[#6c3cb2] text-white rounded-xl active:translate-y-0.5 transition-all shadow-2xs cursor-pointer flex items-center justify-center gap-1 text-xs font-sans font-black"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Play Audio</span>
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="cards"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* Textbook practice self-quiz module */}
            <div className="bg-white border border-gray-150 rounded-2xl p-5 shadow-3xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 select-none">
                <div>
                  <h5 className="text-xs font-sans font-black text-brand-purple uppercase tracking-wider">
                    📝 Will + Verb Self-Evaluation Test
                  </h5>
                  <p className="text-[11.5px] font-sans text-brand-muted font-bold mt-0.5">
                    Type the correct Thai future form (e.g. จะกิน) to match each Myanmar translation.
                  </p>
                </div>
                {quizScore !== null && (
                  <div className="px-3 py-1.5 bg-brand-purple/10 border border-brand-purple/20 rounded-xl text-xs font-sans font-black text-[#583092] animate-bounce">
                    Your Score: {quizScore} / {combinations.length}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {combinations.map((comb, idx) => {
                  const userAnswer = quizAnswers[idx] || '';
                  const isCorrect = userAnswer.trim().toLowerCase() === comb.result.trim().toLowerCase();
                  
                  return (
                    <div key={idx} className="p-3 bg-gray-50 border border-gray-200/80 rounded-xl flex items-center justify-between gap-3">
                      <div className="space-y-1 text-left flex-1 min-w-0">
                        <div className="text-[10px] font-sans text-brand-muted font-black uppercase tracking-wider">
                          Verb {idx + 1}
                        </div>
                        <div className="text-xs font-sans font-black text-brand-dark truncate">
                          {comb.myanmar} (will {comb.english.replace('will ', '')})
                        </div>
                        <div className="text-[11px] font-sans text-emerald-600 font-bold">
                          Formula: จะ + {comb.verb} ({comb.verbPhonetic})
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-1.5">
                        <input
                          type="text"
                          value={userAnswer}
                          onChange={(e) => {
                            setQuizAnswers({ ...quizAnswers, [idx]: e.target.value });
                          }}
                          placeholder="Type Thai..."
                          disabled={showQuizCheck}
                          className={`w-32 px-2.5 py-1.5 text-xs font-sans font-extrabold rounded-lg border-2 text-center transition-all outline-none ${
                            showQuizCheck
                              ? isCorrect
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                                : 'bg-rose-50 border-rose-400 text-rose-700'
                              : 'bg-white border-gray-250 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple/25'
                          }`}
                        />
                        {showQuizCheck && (
                          <span className="text-sm select-none">
                            {isCorrect ? '✅' : '❌'}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action buttons for Quiz */}
              <div className="mt-6 flex justify-end gap-3 border-t border-gray-150 pt-4">
                <button
                  onClick={handleResetQuiz}
                  className="px-4 py-2 bg-white border-2 border-b-4 border-gray-200 hover:bg-gray-50 text-brand-muted rounded-xl transition-all font-sans font-black text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Quiz</span>
                </button>
                <button
                  onClick={handleCheckQuiz}
                  disabled={showQuizCheck}
                  className="px-5 py-2 bg-[#583092] border-b-4 border-[#3b1d66] text-white hover:bg-[#6c3cb2] rounded-xl transition-all font-sans font-black text-xs flex items-center gap-1.5 disabled:opacity-50 cursor-pointer shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Grade Quiz</span>
                </button>
              </div>

              {showQuizCheck && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 p-4 bg-purple-50 border border-purple-100 rounded-xl text-left"
                >
                  <h6 className="text-xs font-sans font-black text-brand-purple uppercase">
                    🎓 Quiz Answer Key • အဖြေမှန်များ
                  </h6>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-3">
                    {combinations.map((c, idx) => (
                      <div key={idx} className="bg-white p-2 border border-purple-100/50 rounded-lg text-center space-y-0.5 shadow-3xs">
                        <div className="text-[9px] text-brand-muted font-bold">{c.myanmar}</div>
                        <div className="text-[12px] font-sans font-black text-[#583092]">{c.result}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Language insight rules card */}
      <div className="p-4.5 bg-amber-50/40 border border-amber-200/40 rounded-2xl text-left space-y-2 select-text">
        <div className="text-xs font-sans font-black text-amber-800 flex items-center gap-1.5 uppercase select-none">
          💡 Grammar Notes • သဒ္ဒါစည်းမျဉ်းများ
        </div>
        <ul className="text-[11.5px] font-sans text-amber-900/90 font-semibold space-y-2 list-disc pl-4.5 leading-relaxed">
          <li>
            <strong className="text-amber-950 font-extrabold font-sans">No Conjugation:</strong> Unlike other languages where verbs change dynamically depending on tense, Thai verbs are uninflected. The word stays exactly the same.
          </li>
          <li>
            <strong className="text-amber-950 font-extrabold font-sans">Prefix Suffix match:</strong> Placing <span className="font-sans font-black text-brand-purple">จะ (ca)</span> in front is perfectly equivalent to appending the Burmese suffix <span className="text-[#583092] font-black">"~မည်"</span> or <span className="text-[#583092] font-black">"~မလို့"</span> at the end of the sentence.
          </li>
        </ul>
      </div>
    </div>
  );
}
