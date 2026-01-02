import React from 'react';
import { SlideData, SlideItem } from '../types';
import { CircleCheck, Video, Heart, Bot, Link as LinkIcon, ExternalLink } from 'lucide-react';

interface Props {
  slide: SlideData;
}

const IconMap: Record<string, React.FC<any>> = {
  'check-circle': CircleCheck,
  'video': Video,
  'heart': Heart,
  'bot': Bot,
  'link': LinkIcon
};

const renderIcon = (iconName?: string, className?: string) => {
  if (!iconName) return null;
  const Icon = IconMap[iconName] || CircleCheck;
  return <Icon className={className} />;
};

const SlideContent: React.FC<Props> = ({ slide }) => {
  // Footer Component
  const Footer = () => (
    <div className="absolute bottom-0 left-0 w-full h-16 border-t border-gray-100 flex justify-between items-center px-10 text-gray-400 text-sm">
      <span>{slide.footerText}</span>
      <span>{slide.author || (slide.footerText && 'Robin Hsu')}</span>
    </div>
  );

  // Common Header
  const Header = ({ isCentered = false }) => (
    <div className={`mb-8 ${isCentered ? 'text-center' : ''}`}>
        {slide.type !== 'intro' && slide.subtitle && (
            <h4 className="text-blue-600 font-semibold mb-2 text-sm md:text-base tracking-wide uppercase">
                {slide.subtitle}
            </h4>
        )}
        <h1 className={`text-3xl md:text-5xl font-bold text-slate-800 ${isCentered ? 'mb-4' : 'mb-6'}`}>
            {slide.title}
        </h1>
        {slide.type === 'intro' && (
            <h2 className="text-xl md:text-2xl text-slate-500 font-medium">
                {slide.subtitle}
            </h2>
        )}
    </div>
  );

  // Renderers per type
  const renderIntro = () => (
    <div className="flex flex-col items-center justify-center h-full pb-20">
      <div className="mb-10 text-blue-600">
        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="12" cy="12" r="1" />
        </svg>
      </div>
      <Header isCentered />
      <div className="mt-12 flex flex-col gap-4">
        {slide.items?.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 text-slate-600 text-lg">
             {renderIcon(item.icon, "text-blue-500 w-6 h-6")}
             <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAgenda = () => (
    <div className="flex flex-col h-full pt-10 px-4 md:px-12">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {slide.items?.map((item, idx) => (
          <div key={idx} className="bg-slate-50 p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl font-bold text-blue-100 mb-2">0{idx + 1}</div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{item.text}</h3>
            {item.subtext && <p className="text-slate-500 text-sm leading-relaxed">{item.subtext}</p>}
          </div>
        ))}
      </div>
    </div>
  );

  const renderConcept = () => (
    <div className="flex flex-col h-full pt-10 px-4 md:px-12 overflow-y-auto custom-scrollbar">
      <Header />
      
      {/* Blue Callout Box */}
      {slide.callout && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8 shadow-sm">
            <p className="whitespace-pre-line text-blue-900 font-medium text-lg leading-relaxed">
                {slide.callout}
            </p>
        </div>
      )}

      {/* Code Block */}
      {slide.codeBlock && (
          <div className="bg-slate-900 rounded-lg p-6 mb-8 text-left shadow-lg">
              {slide.codeBlock.title && (
                  <div className="flex items-center gap-2 mb-4 text-yellow-400 font-mono text-sm uppercase tracking-wider">
                      <span className="text-xl">⚡</span> {slide.codeBlock.title}
                  </div>
              )}
              <pre className="font-mono text-green-400 whitespace-pre-wrap text-sm md:text-base leading-relaxed">
                  {slide.codeBlock.content}
              </pre>
          </div>
      )}

      {/* List Items */}
      {slide.items && (
        <div className="flex flex-col gap-6">
          {slide.items.map((item, idx) => (
            <div key={idx} className="flex items-start gap-4">
                {/* Icon handling: if icon provided, use it, else if numbered list implicit via index */}
                {item.icon ? (
                    <div className="mt-1 flex-shrink-0">{renderIcon(item.icon, `w-6 h-6 ${item.highlight ? 'text-green-500' : 'text-blue-500'}`)}</div>
                ) : (
                    <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">
                        {idx + 1}
                    </div>
                )}
                
                <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-1">{item.text}</h3>
                    {item.subtext && <p className="text-slate-500 leading-relaxed">{item.subtext}</p>}
                </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Fallback simple content text */}
      {slide.content && !slide.items && !slide.callout && (
          <div className="prose prose-lg text-slate-600 whitespace-pre-line">
              {slide.content}
          </div>
      )}
    </div>
  );

  const renderOutro = () => (
    <div className="flex flex-col h-full items-center justify-center pt-10 px-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-12">{slide.title}</h1>
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12 w-full max-w-5xl">
            {/* Left: QR Profile */}
            <div className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                 {/* Placeholder for QR Code */}
                 <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://linkedin.com" alt="QR Code" className="w-40 h-40 mb-6" />
                 <h3 className="text-xl font-bold text-slate-800">{slide.author}</h3>
                 <p className="text-slate-500 mb-4">{slide.subtitle}</p>
                 <a href={slide.content} target="_blank" rel="noreferrer" className="text-blue-500 text-xs break-all hover:underline">
                    {slide.content}
                 </a>
            </div>

            {/* Right: Articles */}
            <div className="flex-1 flex flex-col gap-4 w-full">
                <h3 className="text-left text-xl font-bold text-slate-700 mb-2 flex items-center gap-2">
                    <ExternalLink size={20} /> 精選文章
                </h3>
                {slide.items?.map((item, idx) => (
                    <div key={idx} className="bg-slate-50 p-4 rounded-lg text-left border-l-4 border-slate-200 hover:border-blue-400 transition-colors cursor-pointer group">
                        <h4 className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{item.text}</h4>
                        <p className="text-slate-400 text-xs mt-1 truncate">{item.subtext}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );

  return (
    <div className="w-full h-full bg-white relative overflow-hidden select-none">
      <div className="absolute top-0 right-0 p-6 opacity-10 font-bold text-9xl text-slate-100 pointer-events-none">
        {slide.id}
      </div>
      
      {slide.type === 'intro' && renderIntro()}
      {slide.type === 'agenda' && renderAgenda()}
      {slide.type === 'concept' && renderConcept()}
      {slide.type === 'outro' && renderOutro()}
      
      <Footer />
    </div>
  );
};

export default SlideContent;