import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Star, Users, Award, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const stats = [
  { icon: Users, value: '50K+', label: 'Active Users' },
  { icon: Award, value: '10K+', label: 'Certificates Issued' },
  { icon: TrendingUp, value: '95%', label: 'Success Rate' },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-success/10 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <Star className="w-4 h-4 text-accent fill-accent" />
            <span className="text-sm font-medium text-primary">
              #1 Skill Assessment Platform in Nigeria
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6"
          >
            Discover Your True
            <br />
            <span className="text-gradient">Career Potential</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Take AI-powered assessments, get personalized career recommendations, 
            and earn blockchain-verified certificates. Join 50,000+ users transforming their futures.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button variant="hero" size="xl" asChild>
              <Link to="/assessment" className="group">
                Start Free Assessment
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <Link to="/explore" className="group">
                <Play className="w-5 h-5" />
                Watch Demo
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Hero Image / Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 relative"
        >
          <div className="relative max-w-5xl mx-auto">
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-success/20 rounded-3xl blur-2xl opacity-50" />
            
            {/* Dashboard Preview Card */}
            <div className="relative bg-card rounded-2xl border border-border shadow-2xl overflow-hidden">
              {/* Browser Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-muted border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/80" />
                  <div className="w-3 h-3 rounded-full bg-warning/80" />
                  <div className="w-3 h-3 rounded-full bg-success/80" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 bg-background rounded-md text-xs text-muted-foreground">
                    skillforge.pro/dashboard
                  </div>
                </div>
              </div>
              
              {/* Dashboard Content Preview */}
              <div className="p-6 bg-gradient-to-br from-background to-muted/30">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Score Card */}
                  <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
                    <div className="text-sm text-muted-foreground mb-2">Overall Score</div>
                    <div className="flex items-end gap-2">
                      <span className="font-display text-4xl font-bold text-primary">87</span>
                      <span className="text-success text-sm mb-1">+12%</span>
                    </div>
                    <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-[87%] gradient-primary rounded-full" />
                    </div>
                  </div>
                  
                  {/* Career Match Card */}
                  <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
                    <div className="text-sm text-muted-foreground mb-2">Top Career Match</div>
                    <div className="font-display text-xl font-bold mb-1">Software Engineer</div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-success">94%</span>
                      <span className="text-sm text-muted-foreground">match score</span>
                    </div>
                  </div>
                  
                  {/* Certificates Card */}
                  <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
                    <div className="text-sm text-muted-foreground mb-2">Certificates Earned</div>
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="w-10 h-10 rounded-full gradient-primary border-2 border-card flex items-center justify-center">
                            <Award className="w-4 h-4 text-primary-foreground" />
                          </div>
                        ))}
                      </div>
                      <span className="font-display font-bold">3 Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
