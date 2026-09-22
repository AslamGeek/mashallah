import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';

interface ProjectShareButtonProps {
  project: {
    id: string;
    title: string;
    description?: string;
    category?: string;
  };
  className?: string;
}

export const ProjectShareButton: React.FC<ProjectShareButtonProps> = ({
  project,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const categoryParam = project.category ? `?category=${project.category}` : '';
    const shareUrl = `${origin}/our-work${categoryParam}#gallery-card-${project.id}`;

    const shareData = {
      title: `${project.title} | Mashallah Welding Works`,
      text: `Check out ${project.title} by Mashallah Welding Works in Proddatur:`,
      url: shareUrl,
    };

    // Use native Web Share API on supported devices
    if (typeof navigator !== 'undefined' && navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
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
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer min-h-[36px] focus:outline-none focus-visible:ring-2 focus-visible:ring-copper select-none ${className}`}
      aria-label={`Share ${project.title}`}
      title={copied ? 'Link copied to clipboard' : 'Share this project'}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span className="text-emerald-700 font-semibold">Link copied</span>
        </>
      ) : (
        <>
          <Share2 className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-600 shrink-0" />
          <span>Share</span>
        </>
      )}
    </button>
  );
};
