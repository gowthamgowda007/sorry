import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, RotateCcw, Image, Heart, FileText, Check } from 'lucide-react';

export default function CustomizeModal({
  isOpen,
  onClose,
  letterText,
  setLetterText,
  memories,
  setMemories,
  promises,
  setPromises,
  onResetDefaults,
}) {
  const [activeTab, setActiveTab] = useState('letter');
  const [tempLetter, setTempLetter] = useState(letterText);
  const [tempMemories, setTempMemories] = useState(memories);
  const [tempPromises, setTempPromises] = useState(promises);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setLetterText(tempLetter);
    setMemories(tempMemories);
    setPromises(tempPromises);

    // Save to localStorage
    localStorage.setItem('sorry_app_letter_v3', tempLetter);
    localStorage.setItem('sorry_app_memories_v3', JSON.stringify(tempMemories));
    localStorage.setItem('sorry_app_promises_v3', JSON.stringify(tempPromises));

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  const handleMemoryChange = (index, field, value) => {
    const updated = [...tempMemories];
    updated[index] = { ...updated[index], [field]: value };
    setTempMemories(updated);
  };

  const handlePromiseChange = (index, text) => {
    const updated = [...tempPromises];
    updated[index] = { ...updated[index], text };
    setTempPromises(updated);
  };

  const handleAddPromise = () => {
    setTempPromises([
      ...tempPromises,
      { id: Date.now(), text: 'New heartfelt promise...', subtitle: '' },
    ]);
  };

  const handleRemovePromise = (index) => {
    const updated = tempPromises.filter((_, i) => i !== index);
    setTempPromises(updated);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-pink-100"
        >
          {/* Modal Header */}
          <div className="p-5 bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50 border-b border-pink-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-pink-100 rounded-full text-pink-500">
                <FileText size={18} />
              </div>
              <div>
                <h3 className="font-poppins font-semibold text-slate-800 text-lg">
                  Customize Your Apology Site
                </h3>
                <p className="text-xs text-slate-500">
                  Update your letter, memories, or promises easily
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-200/60 text-slate-500 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-100 bg-slate-50/70 px-4 pt-2 gap-2 text-sm font-poppins font-medium">
            <button
              onClick={() => setActiveTab('letter')}
              className={`pb-3 px-4 flex items-center gap-1.5 border-b-2 transition-colors ${
                activeTab === 'letter'
                  ? 'border-pink-500 text-pink-600 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileText size={15} /> Letter Text
            </button>

            <button
              onClick={() => setActiveTab('memories')}
              className={`pb-3 px-4 flex items-center gap-1.5 border-b-2 transition-colors ${
                activeTab === 'memories'
                  ? 'border-pink-500 text-pink-600 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Image size={15} /> Memories
            </button>

            <button
              onClick={() => setActiveTab('promises')}
              className={`pb-3 px-4 flex items-center gap-1.5 border-b-2 transition-colors ${
                activeTab === 'promises'
                  ? 'border-pink-500 text-pink-600 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Heart size={15} /> Promises
            </button>
          </div>

          {/* Tab Content Body */}
          <div className="p-6 overflow-y-auto flex-1 font-poppins text-slate-700">
            {activeTab === 'letter' && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Paste / Edit Your Apology Letter:
                </label>
                <textarea
                  rows={9}
                  value={tempLetter}
                  onChange={(e) => setTempLetter(e.target.value)}
                  className="w-full p-4 rounded-xl border border-slate-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none text-slate-700 leading-relaxed text-sm font-sans"
                  placeholder="Type or paste your heartfelt apology letter here..."
                />
              </div>
            )}

            {activeTab === 'memories' && (
              <div className="space-y-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Edit Photo Captions & Image Links:
                </label>
                {tempMemories.map((mem, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="text-xs font-semibold text-pink-600">Memory Card #{idx + 1}</div>
                    <input
                      type="text"
                      value={mem.caption}
                      onChange={(e) => handleMemoryChange(idx, 'caption', e.target.value)}
                      placeholder="Caption text"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-pink-400 outline-none"
                    />
                    <input
                      type="text"
                      value={mem.url}
                      onChange={(e) => handleMemoryChange(idx, 'url', e.target.value)}
                      placeholder="Image URL (e.g. /assets/memory_1.jpg or https://...)"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-mono focus:border-pink-400 outline-none text-slate-500"
                    />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'promises' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Your Promises:
                  </label>
                  <button
                    onClick={handleAddPromise}
                    className="text-xs text-pink-600 hover:text-pink-700 font-medium underline"
                  >
                    + Add New Promise
                  </button>
                </div>

                {tempPromises.map((p, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={p.text}
                      onChange={(e) => handlePromiseChange(idx, e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-pink-400 outline-none"
                    />
                    <button
                      onClick={() => handleRemovePromise(idx)}
                      className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                      title="Remove"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={onResetDefaults}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-600 transition-colors"
            >
              <RotateCcw size={13} /> Reset to Defaults
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-full text-xs font-medium text-slate-600 hover:bg-slate-200/60 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-semibold text-white bg-pink-500 hover:bg-pink-600 transition-colors shadow-md"
              >
                {savedSuccess ? (
                  <>
                    <Check size={14} /> Saved!
                  </>
                ) : (
                  <>
                    <Save size={14} /> Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
