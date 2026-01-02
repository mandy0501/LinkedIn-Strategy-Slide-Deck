import React, { useState } from 'react';
import { SlideData } from '../types';
import { saveSlide, resetSlidesToDefault, fetchSlides } from '../services/slideService';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, RefreshCw } from 'lucide-react';

interface Props {
  slides: SlideData[];
  onUpdate: () => void;
}

const CMS: React.FC<Props> = ({ slides, onUpdate }) => {
  const navigate = useNavigate();
  const [selectedSlideId, setSelectedSlideId] = useState<string>(slides[0]?.id || '1');
  const [editData, setEditData] = useState<SlideData | null>(slides[0] || null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSelect = (slide: SlideData) => {
    setSelectedSlideId(slide.id);
    setEditData({ ...slide });
  };

  const handleChange = (field: keyof SlideData, value: any) => {
    if (!editData) return;
    setEditData({ ...editData, [field]: value });
  };

  const handleItemChange = (idx: number, field: string, value: string) => {
      if(!editData || !editData.items) return;
      const newItems = [...editData.items];
      newItems[idx] = { ...newItems[idx], [field]: value };
      setEditData({ ...editData, items: newItems });
  };

  const handleSave = async () => {
    if (!editData) return;
    setIsSaving(true);
    await saveSlide(editData);
    await onUpdate(); // Refresh global state
    setIsSaving(false);
    alert("Saved!");
  };

  const handleReset = async () => {
    if(window.confirm("Are you sure you want to reset all slides to default? This cannot be undone.")) {
        setIsSaving(true);
        await resetSlidesToDefault();
        await onUpdate();
        setIsSaving(false);
    }
  }

  if (!editData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="text-gray-500 hover:text-black">
                <ArrowLeft />
            </button>
            <h1 className="text-xl font-bold">Content Management System</h1>
        </div>
        <div className="flex gap-2">
            <button onClick={handleReset} className="text-red-500 hover:bg-red-50 px-3 py-2 rounded flex items-center gap-2">
                <RefreshCw size={16}/> Reset Defaults
            </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r overflow-y-auto">
            {slides.map(slide => (
                <div 
                    key={slide.id}
                    onClick={() => handleSelect(slide)}
                    className={`p-4 border-b cursor-pointer hover:bg-blue-50 transition-colors ${selectedSlideId === slide.id ? 'bg-blue-100 border-l-4 border-l-blue-500' : ''}`}
                >
                    <div className="text-xs text-gray-400 font-bold uppercase">{slide.type}</div>
                    <div className="text-sm font-medium truncate">{slide.title}</div>
                </div>
            ))}
        </div>

        {/* Editor Form */}
        <div className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Edit Slide {editData.id}</h2>
                    <button 
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded flex items-center gap-2 disabled:opacity-50"
                    >
                        <Save size={18} /> {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Type</label>
                        <select 
                            value={editData.type} 
                            onChange={(e) => handleChange('type', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        >
                            <option value="intro">Intro</option>
                            <option value="agenda">Agenda</option>
                            <option value="concept">Concept</option>
                            <option value="resource">Resource</option>
                            <option value="outro">Outro</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input 
                            type="text" 
                            value={editData.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                        <input 
                            type="text" 
                            value={editData.subtitle || ''}
                            onChange={(e) => handleChange('subtitle', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>

                    {editData.type === 'concept' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Blue Callout Box (Optional)</label>
                            <textarea 
                                value={editData.callout || ''}
                                onChange={(e) => handleChange('callout', e.target.value)}
                                rows={3}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-blue-50"
                            />
                        </div>
                    )}
                    
                     {editData.type === 'concept' && editData.codeBlock && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Code Block Content</label>
                            <textarea 
                                value={editData.codeBlock.content || ''}
                                onChange={(e) => setEditData({...editData, codeBlock: {...editData.codeBlock!, content: e.target.value}})}
                                rows={5}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-slate-900 text-green-400 font-mono"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">List Items</label>
                        {editData.items?.map((item, idx) => (
                            <div key={idx} className="flex gap-2 mb-2">
                                <span className="pt-2 text-gray-400">{idx+1}.</span>
                                <div className="flex-1 space-y-2">
                                    <input 
                                        type="text" 
                                        value={item.text}
                                        onChange={(e) => handleItemChange(idx, 'text', e.target.value)}
                                        placeholder="Main text"
                                        className="block w-full border border-gray-300 rounded-md p-2 text-sm"
                                    />
                                    <input 
                                        type="text" 
                                        value={item.subtext || ''}
                                        onChange={(e) => handleItemChange(idx, 'subtext', e.target.value)}
                                        placeholder="Subtext (optional)"
                                        className="block w-full border border-gray-300 rounded-md p-2 text-xs text-gray-500"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CMS;