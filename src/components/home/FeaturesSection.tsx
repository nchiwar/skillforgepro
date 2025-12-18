import { motion } from 'framer-motion';
import { Brain, BarChart3, Award, Zap, Shield, Globe } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Adaptive Testing',
    description: 'Questions dynamically adjust based on your performance. Get harder questions as you excel, or easier ones to build confidence.',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    icon: BarChart3,
    title: 'Detailed Analytics Dashboard',
    description: 'Beautiful radar charts, strength/weakness analysis, and personalized insights to understand your unique skill profile.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Award,
    title: 'Blockchain Certificates',
    description: 'Earn verifiable NFT certificates on Ethereum/Polygon. Share your achievements with employers confidently.',
    color: 'from-amber-500 to-orange-600',
  },
  {
    icon: Zap,
    title: 'JAMB/UTME Matcher',
    description: 'For Nigerian students: Get course recommendations based on your assessment scores mapped to JAMB requirements.',
    color: 'from-pink-500 to-rose-600',
  },
  {
    icon: Shield,
    title: 'Gamified Progress',
    description: 'Earn streaks, climb leaderboards, unlock badges. Learning and assessment should be engaging and fun.',
    color: 'from-violet-500 to-purple-600',
  },
  {
    icon: Globe,
    title: 'Real-time Job Matching',
    description: 'Our engine connects your skills to live job listings from Nigerian job boards and global platforms.',
    color: 'from-cyan-500 to-blue-600',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4"
          >
            Why SkillForge Pro?
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            Features That Set Us
            <span className="text-gradient"> Apart</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Built with cutting-edge technology to give you the most accurate, 
            engaging, and verifiable skill assessment experience.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-card rounded-2xl border border-border p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
