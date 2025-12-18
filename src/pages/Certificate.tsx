import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, Download, Share2, Shield, ExternalLink, Zap, Calendar, Hash } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useAssessmentStore } from '@/stores/assessmentStore';

export default function CertificatePage() {
  const { userName, result, selectedCareerPath } = useAssessmentStore();

  const certificateData = {
    name: userName || 'John Doe',
    score: result?.totalScore || 85,
    topCareer: Object.entries(result?.careerFit || { 'Software Engineering': 88 })
      .sort(([, a], [, b]) => b - a)[0][0],
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    certificateId: `SF-${Date.now().toString(36).toUpperCase()}`,
    blockchainId: '0x7f4...3e2a',
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Award className="w-5 h-5" />
              <span className="font-medium">Blockchain Verified Certificate</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Your <span className="text-gradient">Achievement</span> Certificate
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Share your verified skill assessment with employers, universities, and on social media.
            </p>
          </motion.div>

          {/* Certificate Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto mb-12"
          >
            <div className="relative bg-card rounded-3xl border-2 border-primary/20 shadow-2xl shadow-primary/10 overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-full h-2 gradient-hero" />
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />

              {/* Certificate Content */}
              <div className="relative p-8 md:p-12">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                      <Zap className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="font-display font-bold text-lg">SkillForge Pro</div>
                      <div className="text-sm text-muted-foreground">Skill Assessment Platform</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/10 text-success text-sm font-medium">
                    <Shield className="w-4 h-4" />
                    Verified
                  </div>
                </div>

                {/* Main Content */}
                <div className="text-center py-8 border-y border-border">
                  <p className="text-muted-foreground mb-2">This certifies that</p>
                  <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient mb-4">
                    {certificateData.name}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    has successfully completed the comprehensive skill assessment with an overall score of
                  </p>
                  <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary/5 border border-primary/20">
                    <span className="font-display text-5xl font-bold text-primary">
                      {certificateData.score}
                    </span>
                    <div className="text-left">
                      <div className="text-sm text-muted-foreground">out of 100</div>
                      <div className="text-sm font-medium text-success">Excellent</div>
                    </div>
                  </div>
                  <p className="mt-6 text-lg">
                    Demonstrating strong aptitude for{' '}
                    <span className="font-bold text-primary">{certificateData.topCareer}</span>
                  </p>
                </div>

                {/* Footer */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                      <Calendar className="w-4 h-4" />
                      Issue Date
                    </div>
                    <div className="font-medium">{certificateData.date}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                      <Hash className="w-4 h-4" />
                      Certificate ID
                    </div>
                    <div className="font-mono font-medium">{certificateData.certificateId}</div>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                      <Shield className="w-4 h-4" />
                      Blockchain TX
                    </div>
                    <div className="font-mono font-medium text-primary">
                      {certificateData.blockchainId}
                      <ExternalLink className="w-3 h-3 inline ml-1" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Watermark */}
              <div className="absolute bottom-4 right-4 opacity-10">
                <Award className="w-24 h-24 text-primary" />
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-xl mx-auto"
          >
            <div className="bg-card rounded-2xl border border-border p-6 mb-8">
              <h3 className="font-display text-lg font-bold mb-4">Share Your Achievement</h3>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="hero" size="lg">
                  <Download className="w-5 h-5" />
                  Download PDF
                </Button>
                <Button variant="outline-primary" size="lg">
                  <Share2 className="w-5 h-5" />
                  Share Link
                </Button>
              </div>
            </div>

            <div className="bg-muted/50 rounded-2xl p-6">
              <h3 className="font-display text-lg font-bold mb-4">Mint as NFT</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Create a permanent, blockchain-verified record of your achievement on Ethereum or Polygon.
              </p>
              <Button variant="accent" size="lg" className="w-full">
                <Shield className="w-5 h-5" />
                Mint Certificate NFT
              </Button>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Requires a Web3 wallet (MetaMask, Coinbase, etc.)
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
