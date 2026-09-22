import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { getProjectUrl } from '../data/projects';

interface ProjectShareButtonProps {
  project: {
    id: string;
    title: string;
    description?: string;
    category?: string;
  };
  className?: string;
  variant?: 'card' | 'modal' | 'minimal';
}

export const ProjectShareButton: React.FC<ProjectShareButtonProps> = ({
  project,
  className = '',
  variant = 'card',
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const shareUrl = getProjectUrl(project.id);

    const shareData = {
      title: project.title,
      text: `Check out ${project.title} from Mashallah Welding Works:`,
      url: shareUrl,
    };

    // Use native Web Share API on supported mobile browsers
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        if (!navigator.canShare || navigator.canShare(shareData)) {
          await navigator.share(shareData);
          return;
        }
      } catch (err: unknown) {
        if ((err as Error)?.name === 'AbortError') {
          return;
        }
      }
    }

    // Fallback: Copy direct project link to clipboard
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  const baseCardStyle = "inline-flex items-center justify-center px-3 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer min-h-[44px] whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-copper";
  const cardStyle = copied
    ? "bg-emerald-50 text-emerald-700 border-emerald-300"
    : "bg-white hover:bg-stone-50 text-stone-700 border-stone-300";

  const modalStyle = copied
    ? "inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-300 min-h-[44px] cursor-pointer"
    : "inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 min-h-[44px] cursor-pointer transition-colors";

  const appliedClass = variant === 'modal' ? modalStyle : `${baseCardStyle} ${cardStyle}`;

  return (
    <button
      type="button"
      onClick={handleShare}
      className={`${appliedClass} ${className}`}
      aria-label={`Share ${project.title}`}
      title={copied ? 'Link copied to clipboard' : 'Share this project URL'}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-600 mr-1.5 shrink-0" />
          <span className="text-emerald-700 font-bold">Link Copied!</span>
        </>
      ) : (
        <>
          <Share2 className="w-3.5 h-3.5 text-stone-600 mr-1.5 shrink-0" />
          <span>Share</span>
        </>
      )}
    </button>
  );
};
