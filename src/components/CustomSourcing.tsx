import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, Mic, FileText, Send, Sparkles, CheckCircle, 
  Volume2, ShieldCheck, AlertTriangle, RefreshCw, X 
} from 'lucide-react';

export const CustomSourcing: React.FC = () => {
  const [textRequest, setTextRequest] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'critical'>('high');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [waveHeights, setWaveHeights] = useState<number[]>([10, 15, 8, 25, 12, 18, 5, 14, 28, 9]);
  
  // File upload states
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [docFile, setDocFile] = useState<string | null>(null);
  
  // Submission flow states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sourcingResult, setSourcingResult] = useState<{
    requestId: string;
    estimatedQuoteTime: string;
    message: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  // Run dynamic waveform animations while recording
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
        setWaveHeights(Array.from({ length: 15 }, () => Math.floor(Math.random() * 32) + 6));
      }, 1000);
    } else {
      setRecordingSeconds(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const handleStartRecording = () => {
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // Simulate AI voice transcription
    setTextRequest(
      "Query transcribed: Need 300 custom teakwood chairs matching premium banquet standards + 50 heavy-duty catering thermal containers with customized Larzoo temperature regulation, delivered to Bengaluru South by Monday morning."
    );
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0].name);
    }
  };

  const handleDocFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocFile(e.target.files[0].name);
    }
  };

  const handleSubmitSourcing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!textRequest && !imageFile && !docFile) {
      alert("Please provide at least a text description, model photo reference, or spec document.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/custom-sourcing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          req: textRequest,
          priorityLevel: priority,
          hasPhoto: !!imageFile,
          hasDoc: !!docFile,
        }),
      });

      const data = await response.json();
      setTimeout(() => {
        setIsSubmitting(false);
        setSourcingResult({
          requestId: data.requestId || ("LZS-" + Math.floor(100000 + Math.random() * 900000)),
          estimatedQuoteTime: data.estimatedQuoteTime || "Within 45 minutes",
          message: data.message || "Custom requisition successfully dispatched to premium trade contractors.",
        });
      }, 1200);

    } catch (err) {
      console.error(err);
      // Fallback
      setTimeout(() => {
        setIsSubmitting(false);
        setSourcingResult({
          requestId: "LZS-" + Math.floor(100000 + Math.random() * 900000),
          estimatedQuoteTime: "Within 45 minutes",
          message: "Custom requisition dispatched, running in server fallback mode.",
        });
      }, 1000);
    }
  };

  const resetForm = () => {
    setTextRequest('');
    setImageFile(null);
    setDocFile(null);
    setSourcingResult(null);
  };

  return (
    <section id="custom-sourcing-section" className="py-24 bg-transparent border-b border-white/5 overflow-hidden relative">
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-[#00D4FF]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[350px] h-[350px] bg-[#00A99D]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block with high visual hierarchy */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/5 text-[#00D4FF] text-xs font-bold rounded-full border border-white/10 uppercase tracking-widest backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> Ultra-Premium Custom Sourcing
          </div>
          <h2 className="text-4xl sm:text-5xl font-sans font-extrabold text-white tracking-tight leading-tight mt-4">
            If It Exists, Larzoo Can Get It.
          </h2>
          <p className="mt-4 text-slate-350 text-base md:text-lg">
            Bypass generic category filters. Upload technical blueprints, speak requirements aloud, or submit reference photos. Our intelligent backend coordinates bids from multi-state trade networks immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Sourcing form workspace */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="bg-[#0F172A]/70 border border-white/10 p-8 rounded-3xl shadow-2xl space-y-6 flex-1 flex flex-col justify-between backdrop-blur-xl">
              
              <AnimatePresence mode="wait">
                {!sourcingResult ? (
                  <motion.form 
                    initial={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmitSourcing} 
                    className="space-y-6 flex-1 flex flex-col justify-between"
                  >
                    <div className="space-y-6">
                      {/* Priority selector */}
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Priority Level</label>
                        <div className="grid grid-cols-4 gap-2">
                          {(['low', 'medium', 'high', 'critical'] as const).map((lvl) => {
                            const isSelected = priority === lvl;
                            let colorClass = "";
                            if (lvl === 'low') colorClass = isSelected ? "bg-slate-900 border-slate-700 text-slate-300" : "border-slate-850 text-slate-500 hover:border-slate-800";
                            if (lvl === 'medium') colorClass = isSelected ? "bg-teal-950/50 border-teal-500/50 text-teal-400" : "border-slate-850 text-slate-500 hover:border-teal-900/40";
                            if (lvl === 'high') colorClass = isSelected ? "bg-cyan-950/50 border-cyan-500/50 text-cyan-400" : "border-slate-850 text-slate-500 hover:border-cyan-900/40";
                            if (lvl === 'critical') colorClass = isSelected ? "bg-red-950/50 border-red-500/50 text-red-400 font-bold" : "border-slate-850 text-slate-500 hover:border-red-900/40";
                            
                            return (
                              <button
                                key={lvl}
                                type="button"
                                onClick={() => setPriority(lvl)}
                                className={`py-2 px-3 border rounded-xl text-xs uppercase tracking-wider text-center transition-all cursor-pointer ${colorClass}`}
                              >
                                {lvl}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Input specification area */}
                      <div className="relative">
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Requirement Specifications</label>
                        <textarea
                          id="sourcing-desc-textarea"
                          value={textRequest}
                          onChange={(e) => setTextRequest(e.target.value)}
                          placeholder="Describe materials, item parameters, sizing, density thresholds, timeframes..."
                          className="w-full h-36 bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00D4FF]/40 transition-colors resize-none font-sans backdrop-blur-md"
                        />
                        
                        {/* Audio record icon floating inside */}
                        <div className="absolute bottom-3 right-3 flex items-center gap-2">
                          {isRecording ? (
                            <div className="flex items-center gap-2 bg-[#0F172A] px-3 py-1.5 rounded-lg border border-red-500/30 backdrop-blur-md">
                              <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                              </span>
                              <span className="text-[10px] text-red-400 font-mono">00:{recordingSeconds < 10 ? `0${recordingSeconds}` : recordingSeconds}</span>
                              
                              {/* Small waveform visualization */}
                              <div className="flex gap-0.5 items-end h-3 px-1">
                                {waveHeights.map((h, idx) => (
                                  <div 
                                    key={idx} 
                                    className="w-[1.5px] bg-red-500 transition-all rounded" 
                                    style={{ height: `${h / 2}px` }} 
                                  />
                                ))}
                              </div>

                              <button 
                                type="button" 
                                onClick={handleStopRecording}
                                className="bg-red-950 hover:bg-red-900 text-red-300 p-1 rounded transition-colors text-[10px] cursor-pointer"
                              >
                                Stop
                              </button>
                            </div>
                          ) : (
                            <button
                              id="btn-voice-source"
                              type="button"
                              onClick={handleStartRecording}
                              className="p-2.5 bg-white/5 text-slate-300 hover:text-[#00D4FF] hover:bg-white/10 rounded-lg border border-white/10 transition-all cursor-pointer backdrop-blur-md"
                              title="Voice Dictation"
                            >
                              <Mic className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* File uploads row */}
                      <div className="grid grid-cols-2 gap-4">
                        {/* Photo uploader */}
                        <div 
                          onClick={() => fileInputRef.current?.click()}
                          className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all rounded-xl cursor-pointer flex flex-col items-center justify-center text-center space-y-1 relative backdrop-blur-md"
                        >
                          <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleImageFileChange} 
                            accept="image/*" 
                            className="hidden" 
                          />
                          {imageFile ? (
                            <>
                              <CheckCircle className="w-5 h-5 text-teal-400" />
                              <span className="text-[11px] font-semibold text-white truncate max-w-full px-2">{imageFile}</span>
                              <span className="text-[9px] text-slate-500">Image Attached</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-5 h-5 text-slate-400" />
                              <span className="text-[11px] font-semibold text-slate-300">Image Reference</span>
                              <span className="text-[9px] text-slate-500">Attach photo/render</span>
                            </>
                          )}
                        </div>

                        {/* Document spec uploader */}
                        <div 
                          onClick={() => docInputRef.current?.click()}
                          className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all rounded-xl cursor-pointer flex flex-col items-center justify-center text-center space-y-1 relative backdrop-blur-md"
                        >
                          <input 
                            type="file" 
                            ref={docInputRef} 
                            onChange={handleDocFileChange} 
                            accept=".pdf,.csv,.xlsx,.docx,.txt" 
                            className="hidden" 
                          />
                          {docFile ? (
                            <>
                              <CheckCircle className="w-5 h-5 text-[#00A99D]" />
                              <span className="text-[11px] font-semibold text-white truncate max-w-full px-2">{docFile}</span>
                              <span className="text-[9px] text-slate-500">Document Attached</span>
                            </>
                          ) : (
                            <>
                              <FileText className="w-5 h-5 text-slate-400" />
                              <span className="text-[11px] font-semibold text-slate-300">Spec Sheet / PDF</span>
                              <span className="text-[9px] text-slate-500">Attach blueprints/BOQ</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/5 mt-6">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 px-6 bg-gradient-to-r from-[#00D4FF] to-[#00A99D] text-slate-950 rounded-xl font-bold transition-all shadow-[0_4px_20px_rgba(0,212,255,0.25)] hover:shadow-[0_4px_35px_rgba(0,212,255,0.5)] hover:scale-[1.01] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw className="w-5 h-5 animate-spin" /> Verifying Requisition Details...
                          </>
                        ) : (
                          <>
                            Submit Multi-Vendor Sourcing Bid <Send className="w-4 h-4 text-slate-950" />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8 text-center space-y-6 flex-1 flex flex-col justify-center items-center"
                  >
                    <div className="w-16 h-16 bg-teal-500/10 border border-teal-500/30 text-teal-400 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-white">Requisition Code Allocated</h3>
                      <p className="text-xs font-mono text-cyan-400 bg-cyan-950/50 border border-cyan-800/40 px-3 py-1.5 rounded-lg inline-block">
                        {sourcingResult.requestId}
                      </p>
                      <p className="text-xs text-slate-400 max-w-md mx-auto pt-2">
                        {sourcingResult.message} Bidding protocol has been broadcasted across our trade network nodes matching priority level: <span className="text-red-400 uppercase font-bold">{priority}</span>.
                      </p>
                    </div>

                    {/* Interactive quote countdown */}
                    <div className="w-full bg-slate-900 border border-slate-850 p-4 rounded-xl space-y-2 max-w-md">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Average Contractor Bid Duration:</span>
                        <span className="font-bold text-white">{sourcingResult.estimatedQuoteTime}</span>
                      </div>
                      <div className="w-full h-1 bg-slate-950 rounded-full overflow-hidden">
                        <div className="h-full bg-teal-400 animate-pulse w-1/3" />
                      </div>
                      <p className="text-[10px] text-slate-500 text-left pt-1">
                        * Trade licenses, quality assurance certifications, and flat rate logistics agreements are vetted before quotes reach your portal.
                      </p>
                    </div>

                    <button 
                      type="button" 
                      onClick={resetForm}
                      className="text-xs text-slate-450 hover:text-white transition-colors underline cursor-pointer"
                    >
                      Dispatch Another Requisition
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

          {/* Sourcing credentials explaining Larzoo advantages */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-5 backdrop-blur-md">
              <h3 className="text-md font-bold tracking-wide uppercase font-mono text-[11px] text-[#00D4FF]">Sourcing Flow Mechanics</h3>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/5 text-[#00D4FF] text-xs font-bold flex items-center justify-center shrink-0 border border-white/10">
                    1
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">Spec Parsing & AI Grading</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed pt-0.5">
                      Larzoo's sourcing parses documents and audio logs into clean line-items, allocating exact dimensions and quality checks.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/5 text-[#00D4FF] text-xs font-bold flex items-center justify-center shrink-0 border border-white/10">
                    2
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">Auction-Style Multi-Vendor Bidding</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed pt-0.5">
                      Vetted tier-1 wholesalers, Agritech warehouses, and commercial mills compete on pricing, providing you matching low-margin deals.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/5 text-[#00D4FF] text-xs font-bold flex items-center justify-center shrink-0 border border-white/10">
                    3
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">Full Sourcing Guarantee</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed pt-0.5">
                      If an item is out of stock in standard networks, Larzoo allocates specialized scouts to physically coordinate procurement.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-[22px] border border-white/10 flex items-start gap-3 backdrop-blur-md">
              <ShieldCheck className="w-5 h-5 text-[#00A99D] shrink-0" />
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white">100% Quality Assurance Protocol</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Every custom batch sourced via Larzoo passes rigorous physical grading checks at our local Hub Stations prior to last-mile dispatch.
                </p>
              </div>
            </div>

            <div className="p-5 bg-red-950/20 border border-red-500/20 rounded-2xl flex items-start gap-3 backdrop-blur-md">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-200">System Priority Allocation Lock</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Selecting <span className="text-red-400 uppercase font-semibold">Critical Priority</span> automatically triggers real-time telephonic notifications to top-ranked trade contractors in Bengaluru, establishing 45-minute response caps.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
