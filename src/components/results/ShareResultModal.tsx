import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShareableResultCard } from './ShareableResultCard';
import { Download, Copy, Check, Twitter, Linkedin, Facebook } from 'lucide-react';
import { toast } from 'sonner';

interface ShareResultModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName: string;
  totalScore: number;
  topCareer: string;
  topCareerScore: number;
  strengths: string[];
  completedAt: Date;
}

export function ShareResultModal({
  open,
  onOpenChange,
  userName,
  totalScore,
  topCareer,
  topCareerScore,
  strengths,
  completedAt,
}: ShareResultModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareText = `I just scored ${totalScore}/100 on my SkillForge Pro assessment! My top career match is ${topCareer} with a ${topCareerScore}% fit. Take your assessment at skillforge.pro 🚀`;
  const shareUrl = 'https://skillforge.pro';

  const handleDownload = async () => {
    if (!cardRef.current) return;
    
    setIsDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 2,
      });
      
      const link = document.createElement('a');
      link.download = `skillforge-result-${userName.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
      
      toast.success('Image downloaded successfully!');
    } catch (error) {
      console.error('Failed to download image:', error);
      toast.error('Failed to download image');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  const handleShareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleShareLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Share Your Results</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Preview Card */}
          <div className="flex justify-center overflow-hidden rounded-xl border border-border">
            <div className="scale-[0.85] origin-center">
              <ShareableResultCard
                ref={cardRef}
                userName={userName}
                totalScore={totalScore}
                topCareer={topCareer}
                topCareerScore={topCareerScore}
                strengths={strengths}
                completedAt={completedAt}
              />
            </div>
          </div>

          {/* Download Button */}
          <Button
            onClick={handleDownload}
            disabled={isDownloading}
            variant="hero"
            className="w-full"
            size="lg"
          >
            <Download className="w-4 h-4" />
            {isDownloading ? 'Generating...' : 'Download as Image'}
          </Button>

          {/* Social Share Buttons */}
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground text-center">Or share directly</p>
            <div className="grid grid-cols-4 gap-3">
              <Button
                variant="outline"
                onClick={handleCopyLink}
                className="flex flex-col items-center gap-1 h-auto py-3"
              >
                {copied ? <Check className="w-5 h-5 text-success" /> : <Copy className="w-5 h-5" />}
                <span className="text-xs">Copy</span>
              </Button>
              <Button
                variant="outline"
                onClick={handleShareTwitter}
                className="flex flex-col items-center gap-1 h-auto py-3 hover:bg-[#1DA1F2]/10 hover:border-[#1DA1F2]/50"
              >
                <Twitter className="w-5 h-5" />
                <span className="text-xs">Twitter</span>
              </Button>
              <Button
                variant="outline"
                onClick={handleShareLinkedIn}
                className="flex flex-col items-center gap-1 h-auto py-3 hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/50"
              >
                <Linkedin className="w-5 h-5" />
                <span className="text-xs">LinkedIn</span>
              </Button>
              <Button
                variant="outline"
                onClick={handleShareFacebook}
                className="flex flex-col items-center gap-1 h-auto py-3 hover:bg-[#1877F2]/10 hover:border-[#1877F2]/50"
              >
                <Facebook className="w-5 h-5" />
                <span className="text-xs">Facebook</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
