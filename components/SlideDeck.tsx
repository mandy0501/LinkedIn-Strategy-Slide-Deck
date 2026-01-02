import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SlideData } from '../types';
import SlideContent from './SlideContent';
import { ChevronLeft, ChevronRight, Download, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface Props {
  slides: SlideData[];
  isAuthenticated: boolean;
  onLoginRequest: () => void;
}

const SlideDeck: React.FC<Props> = ({ slides, isAuthenticated, onLoginRequest }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const deckRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleNext = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.min(prev + 1, slides.length - 1));
  }, [slides.length]);

  const handlePrev = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // PDF Generation Logic
  const handleDownloadPDF = async () => {
    // Simple Auth Check for download
    if (!isAuthenticated) {
        // In a real app, show the DownloadSurveyModal here
        const confirmLogin = window.confirm("下載 PDF 需要登入。是否前往登入？");
        if (confirmLogin) onLoginRequest();
        return;
    }

    if (isGeneratingPdf || !deckRef.current) return;
    setIsGeneratingPdf(true);

    try {
      const pdf = new jsPDF('l', 'mm', 'a4'); // Landscape A4
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();

      // We need to render every slide. 
      // Strategy: Since we can't easily snapshot hidden React components without complex logic,
      // we will iterate through the slides quickly visually or clone the DOM.
      // For this simplified version, we will snapshot the *current* view only to demonstrate, 
      // OR ideally, we assume the user scrolls through or we programmatically change slides.
      
      // Better approach for Single Page App PDF: 
      // 1. Alert user "Generating PDF... do not interact"
      // 2. Loop through indices, render, snapshot, add page.
      
      alert("Generating PDF. Please wait while we capture all slides...");
      
      const originalIndex = currentSlideIndex;
      
      for (let i = 0; i < slides.length; i++) {
        setCurrentSlideIndex(i);
        // Wait for render
        await new Promise(resolve => setTimeout(resolve, 500)); 
        
        const canvas = await html2canvas(deckRef.current, {
            scale: 2, // Higher quality
            useCORS: true
        });
        
        const imgData = canvas.toDataURL('image/jpeg', 0.8);
        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
      }
      
      // Restore
      setCurrentSlideIndex(originalIndex);
      pdf.save('linkedin-strategy.pdf');
      
    } catch (err) {
      console.error("PDF Gen Error", err);
      alert("Failed to generate PDF");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  if (slides.length === 0) return <div className="flex items-center justify-center h-screen">Loading content...</div>;

  return (
    <div className="relative w-full h-screen bg-slate-900 flex items-center justify-center overflow-hidden">
      
      {/* Main Slide Area */}
      <div 
        ref={deckRef}
        className="w-full h-full md:w-[1280px] md:h-[720px] bg-white shadow-2xl relative transition-all duration-300"
      >
        <SlideContent slide={slides[currentSlideIndex]} />
      </div>

      {/* Navigation Overlays (Desktop Hover / Mobile Touch zones) */}
      <div 
        className="absolute top-0 left-0 w-24 h-full z-10 hover:bg-gradient-to-r from-black/10 to-transparent cursor-pointer hidden md:flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
        onClick={handlePrev}
      >
        <ChevronLeft className="text-white w-10 h-10" />
      </div>
      <div 
        className="absolute top-0 right-0 w-24 h-full z-10 hover:bg-gradient-to-l from-black/10 to-transparent cursor-pointer hidden md:flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
        onClick={handleNext}
      >
        <ChevronRight className="text-white w-10 h-10" />
      </div>

      {/* Toolbar */}
      <div className="absolute top-4 right-4 z-50 flex gap-2">
         {isAuthenticated && (
            <button 
                onClick={() => navigate('/cms')}
                className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-all"
                title="Edit Content"
            >
                <Edit size={20} />
            </button>
         )}
         <button 
            onClick={handleDownloadPDF}
            disabled={isGeneratingPdf}
            className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transition-all ${isGeneratingPdf ? 'opacity-50 cursor-wait' : ''}`}
         >
            <Download size={18} />
            <span className="text-sm font-medium">{isGeneratingPdf ? 'Generating...' : 'Download PDF'}</span>
         </button>
      </div>

      {/* Login Button (if not logged in) */}
      {!isAuthenticated && (
          <div className="absolute top-4 left-4 z-50">
               <button onClick={onLoginRequest} className="text-white/50 hover:text-white text-xs underline">
                   Admin Login
               </button>
          </div>
      )}

      {/* Progress Bar */}
      <div className="absolute bottom-6 z-20 flex gap-2">
        {slides.map((_, idx) => (
            <div 
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${idx === currentSlideIndex ? 'w-8 bg-blue-500' : 'w-2 bg-white/30 hover:bg-white/50'}`}
            />
        ))}
      </div>
    </div>
  );
};

export default SlideDeck;