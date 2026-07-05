import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SkipBack, Pause, SkipForward, CheckCircle, Search, Download, Volume2, Play } from 'lucide-react';

interface EBookAudioPlayerProps {
  speakText: (text: string) => void;
}

export function EBookAudioPlayer({ speakText }: EBookAudioPlayerProps) {
              // Internal state for E-Book Audio Player
              const EBOOK_AUDIO_DATA = [
                {
                  id: "eb-alphabet",
                  title: "Basic Thai Alphabet Workbook",
                  titleMm: "ထိုင်းအခြေခံအက္ခရာ သင်ပုန်းကြီး လက်စွဲ",
                  coverEmoji: "🔠",
                  color: "from-blue-500 to-indigo-600",
                  instructor: "Kru Jane",
                  tracks: [
                    {
                      id: "tr-al-consonants",
                      title: "Lesson 1: High, Mid, Low Consonant Classes",
                      titleMm: "မဟာသံ၊ မဇ္ဈိမသံနှင့် သာမန်သံဗျည်းများ ခွဲခြားခြင်း",
                      duration: "04:15",
                      phrases: [
                        { thai: "กอ ไก่", pronunciation: "ကော ကိုင် (Ko Kai)", translation: "ကြက်", english: "Chicken (Mid Class)" },
                        { thai: "ขอ ไข่", pronunciation: "ခေါ ခိုင် (Kho Khai)", translation: "ဥ", english: "Egg (High Class)" },
                        { thai: "คอ ควาย", pronunciation: "ခေါ ခွိုင် (Kho Khwai)", translation: "ကျွဲ", english: "Buffalo (Low Class)" },
                        { thai: "งอ งู", pronunciation: "ငေါ ငူ (Ngo Ngu)", translation: "မြွေ", english: "Snake (Low Class)" }
                      ]
                    },
                    {
                      id: "tr-al-vowels",
                      title: "Lesson 2: Short vs Long Spoken Vowels",
                      titleMm: "သရတိုနှင့် သရရှည်များ အသံထွက်ဖတ်နည်း",
                      duration: "03:50",
                      phrases: [
                        { thai: "สระ อะ", pronunciation: "သရ အာ့ (Sara A)", translation: "သရတို အသံထွက်", english: "Short vowel 'a'" },
                        { thai: "สระ อา", pronunciation: "သရ အာ (Sara Aa)", translation: "သရရှည် အသံထွက်", english: "Long vowel 'aa'" },
                        { thai: "สระ อิ", pronunciation: "သရ အိ့ (Sara I)", translation: "သရတို အသံထွက်", english: "Short vowel 'i'" },
                        { thai: "สระ อี", pronunciation: "သရ အီ (Sara Ii)", translation: "သရရှည် အသံထွက်", english: "Long vowel 'ii'" }
                      ]
                    }
                  ]
                },
                {
                  id: "eb-grammar",
                  title: "Basic Thai Grammar Pocketbook",
                  titleMm: "ထိုင်းစကားပြော အခြေခံသဒ္ဒါ အိတ်ဆောင်စာအုပ်",
                  coverEmoji: "📖",
                  color: "from-purple-500 to-indigo-700",
                  instructor: "Sayar Thura",
                  tracks: [
                    {
                      id: "tr-gr-future",
                      title: "Lesson 1: Future Tense with จะ (ca / ja)",
                      titleMm: "အနာဂတ်ကာလဖော်ပြချက် 'ကျ' (မည်)",
                      duration: "05:20",
                      phrases: [
                        { thai: "จะกิน", pronunciation: "ကျ ကိန်း (ca kin)", translation: "စားမယ်", english: "Will eat" },
                        { thai: "จะทำ", pronunciation: "ကျ ထမ်း (ca tham)", translation: "လုပ်မယ်", english: "Will do" },
                        { thai: "จะไป", pronunciation: "ကျ ပိုင် (ca pai)", translation: "သွားမယ်", english: "Will go" },
                        { thai: "จะมา", pronunciation: "ကျ မာ (ca ma)", translation: "လာမယ်", english: "Will come" },
                        { thai: "จะนอน", pronunciation: "ကျ နျော်န်း (ca non)", translation: "အိပ်မယ်", english: "Will sleep" },
                        { thai: "จะเดิน", pronunciation: "ကျ ဒန်း (ca doen)", translation: "လမ်းလျှောက်မယ်", english: "Will walk" }
                      ]
                    },
                    {
                      id: "tr-gr-polite",
                      title: "Lesson 2: Polite Ending Particles ครับ / ค่ะ",
                      titleMm: "ယဉ်ကျေးသော နောက်ပိတ်စကားလုံးများအသုံး",
                      duration: "04:45",
                      phrases: [
                        { thai: "ขอบคุณครับ", pronunciation: "ခေါပ်ခွန်း ခရတ် (Khop-khun khráp)", translation: "ကျေးဇူးတင်ပါတယ် (ကျား)", english: "Thank you (male)" },
                        { thai: "ขอบคุณค่ะ", pronunciation: "ခေါပ်ခွန်း ခါး (Khop-khun khâ)", translation: "ကျေးဇူးတင်ပါတယ် (မ)", english: "Thank you (female)" },
                        { thai: "สวัสดีครับ", pronunciation: "sa-wat-dee khrap (စဝပ်ဒီ ခရတ်)", translation: "မင်္ဂလာပါ (ကျား)", english: "Hello (male)" },
                        { thai: "สวัสดีค่ะ", pronunciation: "sa-wat-dee kha (စဝပ်ဒီ ခါး)", translation: "မင်္ဂလာပါ (မ)", english: "Hello (female)" }
                      ]
                    }
                  ]
                },
                {
                  id: "eb-business",
                  title: "Business Thai Email Templates",
                  titleMm: "รုံးသုံးထိုင်းအီးမေးလ်ရေးသားနည်း လက်စွဲ",
                  coverEmoji: "✉️",
                  color: "from-amber-500 to-orange-600",
                  instructor: "Kru Jane",
                  tracks: [
                    {
                      id: "tr-biz-intro",
                      title: "Lesson 1: Formal Inquiries & Client Communication",
                      titleMm: "အလုပ်အကိုင်စုံစမ်းမေးမြန်းခြင်းနှင့် ဆက်သွယ်ရေး",
                      duration: "06:10",
                      phrases: [
                        { thai: "ติดต่อสอบถาม", pronunciation: "တစ်တောစော့ထမ်း (Tit-to sop-tham)", translation: "ဆက်သွယ်မေးမြန်းသည်", english: "To inquire / contact for info" },
                        { thai: "ขออภัยในความไม่สะดวก", pronunciation: "ခေါ အပိုင်း နိုင် ခွမ် မိုင် သဒွက်", translation: "အဆင်မပြေမှုအတွက် တောင်းပန်အပ်ပါသည်", english: "Apologize for the inconvenience" },
                        { thai: "เรียนท่านผู้จัดการ", pronunciation: "ရိရန် ထန်း ဖူးကျတ်ကန်", translation: "လေးစားအပ်ပါသော မန်နေဂျာခင်ဗျာ", english: "Dear Manager" }
                      ]
                    }
                  ]
                }
              ];

              const [selectedBookId, setSelectedBookId] = useState(EBOOK_AUDIO_DATA[0].id);
              const [selectedTrackId, setSelectedTrackId] = useState(EBOOK_AUDIO_DATA[0].tracks[0].id);
              const [isPlaying, setIsPlaying] = useState(false);
              const [playbackProgress, setPlaybackProgress] = useState(0); // 0 to 100
              const [playbackSpeed, setPlaybackSpeed] = useState(1.0); // 0.8, 1.0, 1.25, 1.5
              const [audioSearch, setAudioSearch] = useState("");
              const [downloadingTrackId, setDownloadingTrackId] = useState<string | null>(null);
              const [downloadProgress, setDownloadProgress] = useState(0);
              const [downloadedTracks, setDownloadedTracks] = useState<string[]>([]);
              const [toastMessage, setToastMessage] = useState<string | null>(null);

              const currentBook = EBOOK_AUDIO_DATA.find(b => b.id === selectedBookId) || EBOOK_AUDIO_DATA[0];
              const currentTrack = currentBook.tracks.find(t => t.id === selectedTrackId) || currentBook.tracks[0];

              // Handle automatic seek progression when playing
              useEffect(() => {
                let interval: any;
                if (isPlaying) {
                  interval = setInterval(() => {
                    setPlaybackProgress((prev) => {
                      if (prev >= 100) {
                        // Finished track: move to next or stop
                        const trackIdx = currentBook.tracks.findIndex(t => t.id === currentTrack.id);
                        if (trackIdx < currentBook.tracks.length - 1) {
                          setSelectedTrackId(currentBook.tracks[trackIdx + 1].id);
                          return 0;
                        } else {
                          setIsPlaying(false);
                          return 0;
                        }
                      }
                      return prev + (1.5 * playbackSpeed);
                    });
                  }, 500);
                }
                return () => clearInterval(interval);
              }, [isPlaying, playbackSpeed, selectedTrackId, selectedBookId]);

              const togglePlay = () => {
                setIsPlaying(!isPlaying);
                if (!isPlaying) {
                  // Speak the title
                  speakText(currentTrack.title);
                }
              };

              const handleSkipBack = () => {
                const trackIdx = currentBook.tracks.findIndex(t => t.id === currentTrack.id);
                if (trackIdx > 0) {
                  setSelectedTrackId(currentBook.tracks[trackIdx - 1].id);
                  setPlaybackProgress(0);
                }
              };

              const handleSkipForward = () => {
                const trackIdx = currentBook.tracks.findIndex(t => t.id === currentTrack.id);
                if (trackIdx < currentBook.tracks.length - 1) {
                  setSelectedTrackId(currentBook.tracks[trackIdx + 1].id);
                  setPlaybackProgress(0);
                }
              };

              const handleDownload = (trackId: string) => {
                if (downloadedTracks.includes(trackId)) {
                  setToastMessage("Lesson audio already downloaded to offline cache!");
                  setTimeout(() => setToastMessage(null), 3000);
                  return;
                }
                setDownloadingTrackId(trackId);
                setDownloadProgress(10);
                const interval = setInterval(() => {
                  setDownloadProgress(p => {
                    if (p >= 100) {
                      clearInterval(interval);
                      setDownloadedTracks(prev => [...prev, trackId]);
                      setDownloadingTrackId(null);
                      setToastMessage("Successfully downloaded lesson audio for offline practice!");
                      setTimeout(() => setToastMessage(null), 3000);
                      return 100;
                    }
                    return p + 20;
                  });
                }, 300);
              };

              const filteredPhrases = currentTrack.phrases.filter(p => 
                p.thai.toLowerCase().includes(audioSearch.toLowerCase()) ||
                p.translation.toLowerCase().includes(audioSearch.toLowerCase()) ||
                p.english.toLowerCase().includes(audioSearch.toLowerCase())
              );

              return (
                <div className="max-w-7xl mx-auto space-y-6 min-h-[500px] animate-fade-in text-left">
                  
                  {/* Toast notification */}
                  <AnimatePresence>
                    {toastMessage && (
                      <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-24 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-sans font-black py-3 px-6 rounded-full shadow-lg z-50 flex items-center gap-2 border border-slate-800"
                      >
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span>{toastMessage}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Header info */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border-2 border-gray-100 shadow-3xs">
                    <div>
                      <span className="text-[10px] text-brand-purple font-sans font-black uppercase tracking-wider block">PREMIUM COMPANION</span>
                      <h3 className="font-sans font-black text-brand-dark text-base uppercase tracking-tight mt-0.5">
                        🎧 Interactive E-Book Audiobook Player
                      </h3>
                      <p className="text-xs text-brand-muted font-sans font-semibold mt-0.5">
                        Listen to premium spoken native chapters, adjust playback speeds, and follow along with synchronized text transcripts.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Column: E-Book Selection & Tracks (Col span 5) */}
                    <div className="lg:col-span-5 space-y-5">
                      
                      {/* E-Book list */}
                      <div className="bg-white p-5 rounded-2xl border-2 border-gray-100 shadow-3xs space-y-3.5">
                        <span className="text-[9px] text-brand-purple font-sans font-black uppercase tracking-widest block">SELECT E-BOOK • စာအုပ်ရွေးချယ်ရန်</span>
                        <div className="grid grid-cols-1 gap-2">
                          {EBOOK_AUDIO_DATA.map(book => {
                            const isSel = book.id === selectedBookId;
                            return (
                              <button
                                key={book.id}
                                onClick={() => {
                                  setSelectedBookId(book.id);
                                  setSelectedTrackId(book.tracks[0].id);
                                  setPlaybackProgress(0);
                                  setIsPlaying(false);
                                }}
                                className={`w-full p-4 rounded-xl text-left transition-all border-2 flex items-center gap-3.5 group cursor-pointer ${
                                  isSel 
                                    ? 'bg-gradient-to-r from-brand-purple/5 to-purple-50/20 border-brand-purple'
                                    : 'bg-white hover:bg-slate-50 border-gray-100'
                                }`}
                              >
                                <span className={`text-2xl p-2.5 rounded-lg bg-gradient-to-br ${book.color} text-white flex items-center justify-center shadow-sm shrink-0`}>
                                  {book.coverEmoji}
                                </span>
                                <div className="min-w-0 flex-1">
                                  <div className={`font-sans font-black text-xs leading-tight ${isSel ? 'text-brand-purple' : 'text-slate-800'}`}>
                                    {book.title}
                                  </div>
                                  <div className="font-sans font-semibold text-[10px] text-brand-muted truncate mt-0.5">
                                    {book.titleMm}
                                  </div>
                                  <div className="flex items-center gap-2 mt-1.5">
                                    <span className="text-[8.5px] font-mono font-bold uppercase bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded leading-none">
                                      {book.instructor}
                                    </span>
                                    <span className="text-[8.5px] font-sans font-bold text-brand-purple bg-brand-purple/5 px-1.5 py-0.5 rounded leading-none">
                                      {book.tracks.length} Spoken Track(s)
                                    </span>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Tracks of Selected Book */}
                      <div className="bg-white p-5 rounded-2xl border-2 border-gray-100 shadow-3xs space-y-3.5">
                        <span className="text-[9px] text-brand-purple font-sans font-black uppercase tracking-widest block">AUDIO TRACK LIST • အသံဖိုင်သင်ခန်းစာများ</span>
                        <div className="space-y-2">
                          {currentBook.tracks.map((track, idx) => {
                            const isSel = track.id === selectedTrackId;
                            const isDownloaded = downloadedTracks.includes(track.id);
                            return (
                              <div
                                key={track.id}
                                className={`p-3.5 rounded-xl border-2 transition-all flex items-center justify-between gap-3 ${
                                  isSel 
                                    ? 'bg-indigo-50/20 border-indigo-200'
                                    : 'bg-white hover:bg-slate-50 border-gray-50'
                                }`}
                              >
                                <button
                                  onClick={() => {
                                    setSelectedTrackId(track.id);
                                    setPlaybackProgress(0);
                                    setIsPlaying(false);
                                  }}
                                  className="flex-1 text-left min-w-0 cursor-pointer"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className={`text-[9.5px] font-mono font-black ${isSel ? 'text-brand-purple' : 'text-brand-muted'}`}>
                                      {String(idx + 1).padStart(2, '0')}
                                    </span>
                                    <span className={`font-sans font-black text-xs truncate ${isSel ? 'text-brand-purple' : 'text-slate-700'}`}>
                                      {track.title.split(":")[1] || track.title}
                                    </span>
                                  </div>
                                  <div className="font-sans font-semibold text-[10px] text-brand-muted truncate ml-5 mt-0.5">
                                    {track.titleMm}
                                  </div>
                                </button>
                                
                                <div className="flex items-center gap-2 shrink-0">
                                  <span className="text-[9px] font-mono font-extrabold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded">
                                    {track.duration}
                                  </span>
                                  <button
                                    onClick={() => handleDownload(track.id)}
                                    disabled={downloadingTrackId !== null}
                                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                                      isDownloaded 
                                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                        : 'bg-white text-slate-400 hover:text-brand-purple hover:bg-slate-50 border-gray-100'
                                    }`}
                                    title={isDownloaded ? "Downloaded" : "Download lesson audio"}
                                  >
                                    <Download className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                    </div>

                    {/* Right Column: Audio Player & Synced Transcript Viewer (Col span 7) */}
                    <div className="lg:col-span-7 space-y-6">
                      
                      {/* Interactive Premium Audio Player Card */}
                      <div className="bg-gradient-to-b from-slate-900 to-slate-950 p-6 rounded-3xl text-white shadow-md relative overflow-hidden">
                        
                        {/* Background light glow decoration */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                        {/* Top Metadata */}
                        <div className="flex items-center justify-between mb-6">
                          <span className="text-[9px] font-mono font-black tracking-widest text-brand-purple uppercase bg-purple-950/40 border border-purple-900/30 px-2.5 py-1 rounded-full select-none">
                            🎧 HIGH-QUALITY NATIVE PLAYER
                          </span>
                          <span className="text-[10px] font-sans font-black text-slate-400 flex items-center gap-1.5 select-none">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            Offline Ready
                          </span>
                        </div>

                        {/* Middle cover art + title */}
                        <div className="flex flex-col sm:flex-row items-center gap-5 my-3">
                          {/* Pulsing Cover Disc Artwork */}
                          <div className="relative shrink-0">
                            <div className={`w-24 h-24 rounded-2xl bg-gradient-to-tr ${currentBook.color} text-white flex items-center justify-center text-4xl shadow-lg relative z-10 ${isPlaying ? 'animate-spin-slow' : ''}`}>
                              {currentBook.coverEmoji}
                            </div>
                            {isPlaying && (
                              <div className="absolute inset-0 bg-brand-purple/20 rounded-2xl animate-ping scale-110 pointer-events-none" />
                            )}
                          </div>

                          <div className="min-w-0 text-center sm:text-left">
                            <span className="text-[9px] font-mono font-bold text-brand-purple uppercase tracking-wider block">
                              Book Track #{currentBook.tracks.findIndex(t => t.id === currentTrack.id) + 1}
                            </span>
                            <h4 className="font-sans font-black text-sm text-white leading-tight uppercase tracking-tight mt-0.5 line-clamp-1">
                              {currentTrack.title}
                            </h4>
                            <p className="font-sans font-semibold text-xs text-slate-400 mt-1 line-clamp-1">
                              {currentTrack.titleMm}
                            </p>
                            <span className="inline-block mt-2 text-[10px] font-mono bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded">
                              Narrator: {currentBook.instructor}
                            </span>
                          </div>
                        </div>

                        {/* Progress slider bar */}
                        <div className="mt-8 space-y-1.5">
                          <div className="relative w-full h-1.5 bg-slate-800 rounded-full overflow-hidden cursor-pointer">
                            <div 
                              className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-purple to-purple-400 transition-all duration-300 rounded-full"
                              style={{ width: `${playbackProgress}%` }}
                            />
                          </div>
                          <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                            <span>{isPlaying ? `00:${String(Math.floor(playbackProgress * 0.25)).padStart(2, '0')}` : "00:00"}</span>
                            <span>{currentTrack.duration}</span>
                          </div>
                        </div>

                        {/* Player Buttons Control */}
                        <div className="flex items-center justify-center gap-6 mt-4">
                          {/* Skip backward */}
                          <button
                            onClick={handleSkipBack}
                            disabled={currentBook.tracks.findIndex(t => t.id === currentTrack.id) === 0}
                            className="p-2.5 bg-slate-900/60 hover:bg-slate-800 border border-slate-800 rounded-xl hover:text-white transition-all text-slate-400 disabled:opacity-20 cursor-pointer"
                            title="Previous lesson"
                          >
                            <SkipBack className="w-5 h-5" />
                          </button>

                          {/* Play / Pause Toggle */}
                          <button
                            onClick={togglePlay}
                            className="w-14 h-14 bg-white text-slate-950 hover:bg-slate-50 flex items-center justify-center rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer"
                            title={isPlaying ? "Pause" : "Play native voice"}
                          >
                            {isPlaying ? (
                              <Pause className="w-6 h-6 fill-slate-950 text-slate-950 stroke-[2.5px]" />
                            ) : (
                              <Play className="w-6 h-6 fill-slate-950 text-slate-950 translate-x-0.5 stroke-[2.5px]" />
                            )}
                          </button>

                          {/* Skip forward */}
                          <button
                            onClick={handleSkipForward}
                            disabled={currentBook.tracks.findIndex(t => t.id === currentTrack.id) === currentBook.tracks.length - 1}
                            className="p-2.5 bg-slate-900/60 hover:bg-slate-800 border border-slate-800 rounded-xl hover:text-white transition-all text-slate-400 disabled:opacity-20 cursor-pointer"
                            title="Next lesson"
                          >
                            <SkipForward className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Speed controller & download display below player */}
                        <div className="flex items-center justify-between border-t border-slate-900 mt-6 pt-5">
                          {/* Playback speed switcher */}
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider">Speed:</span>
                            <div className="flex bg-slate-900 border border-slate-800 p-0.5 rounded-lg text-[9.5px] font-mono">
                              {[0.8, 1.0, 1.25, 1.5].map(sp => (
                                <button
                                  key={sp}
                                  onClick={() => setPlaybackSpeed(sp)}
                                  className={`px-2 py-1 rounded cursor-pointer transition-colors ${
                                    playbackSpeed === sp 
                                      ? 'bg-brand-purple text-white font-bold' 
                                      : 'text-slate-400 hover:text-white'
                                  }`}
                                >
                                  {sp}x
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Download visual progress bar */}
                          {downloadingTrackId === currentTrack.id && (
                            <div className="w-28 text-right space-y-1">
                              <div className="text-[9px] font-mono text-purple-400 font-bold uppercase animate-pulse">Downloading: {downloadProgress}%</div>
                              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-brand-purple" style={{ width: `${downloadProgress}%` }} />
                              </div>
                            </div>
                          )}
                        </div>

                      </div>

                      {/* Transcripts and Sync Phrases List */}
                      <div className="bg-white p-5 rounded-2xl border-2 border-gray-100 shadow-3xs space-y-4">
                        
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-gray-100 pb-3">
                          <div>
                            <span className="text-[9px] text-brand-purple font-sans font-black uppercase tracking-widest block">SYNCHRONIZED TRANSCRIPT • စကားပြောစာသားများ</span>
                            <h4 className="font-sans font-black text-slate-800 text-xs uppercase tracking-tight mt-0.5">
                              📖 Interactive Lesson Phrases ({filteredPhrases.length})
                            </h4>
                          </div>
                          
                          {/* Search transcript */}
                          <div className="relative max-w-xs w-full sm:w-48">
                            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                              type="text"
                              value={audioSearch}
                              onChange={(e) => setAudioSearch(e.target.value)}
                              placeholder="Search phrases..."
                              className="w-full bg-slate-50 border border-gray-200 focus:border-brand-purple focus:bg-white text-[11px] rounded-lg pl-8 pr-3 py-1.5 outline-none font-sans"
                            />
                          </div>
                        </div>

                        {/* Phrase listings */}
                        <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
                          {filteredPhrases.length === 0 ? (
                            <div className="text-center py-10 space-y-2">
                              <span className="text-2xl block">🔍</span>
                              <p className="text-xs text-brand-muted font-sans font-bold">No matching phrases found in this track.</p>
                            </div>
                          ) : (
                            filteredPhrases.map((phrase, pIdx) => {
                              // Simulate active phrasing based on progress percentage
                              const isPhraseActive = isPlaying && 
                                playbackProgress >= (pIdx * (100 / currentTrack.phrases.length)) && 
                                playbackProgress < ((pIdx + 1) * (100 / currentTrack.phrases.length));

                              return (
                                <div
                                  key={phrase.thai}
                                  className={`p-3.5 rounded-xl border-2 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                                    isPhraseActive 
                                      ? 'bg-brand-purple/5 border-brand-purple shadow-3xs'
                                      : 'bg-white hover:bg-slate-50 border-slate-100'
                                  }`}
                                >
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-sans font-extrabold text-brand-dark leading-normal">
                                        {phrase.thai}
                                      </span>
                                      {isPhraseActive && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-ping shrink-0" />
                                      )}
                                    </div>
                                    <div className="text-[10px] font-sans text-brand-purple font-extrabold flex items-center gap-1 leading-normal">
                                      <span>🔊</span>
                                      <span>{phrase.pronunciation}</span>
                                    </div>
                                    <div className="text-[11px] font-sans text-brand-muted font-semibold leading-normal">
                                      {phrase.translation}
                                    </div>
                                    <div className="text-[9.5px] font-sans text-slate-400 font-semibold italic leading-none pt-0.5">
                                      {phrase.english}
                                    </div>
                                  </div>

                                  <button
                                    onClick={() => speakText(phrase.thai)}
                                    className="p-2 bg-brand-purple/5 text-brand-purple hover:bg-brand-purple hover:text-white rounded-lg transition-colors border border-brand-purple/10 cursor-pointer self-end sm:self-center shrink-0 flex items-center gap-1 text-[10px] font-sans font-black"
                                    title="Speak Native Voice"
                                  >
                                    <Volume2 className="w-3.5 h-3.5" />
                                    <span>SPEAK</span>
                                  </button>
                                </div>
                              );
                            })
                          )}
                        </div>

                      </div>

                    </div>
                  </div>

                </div>
              );

}
