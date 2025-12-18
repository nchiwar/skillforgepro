import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Briefcase, 
  Rocket, 
  Code, 
  Stethoscope, 
  Scale,
  Palette,
  TrendingUp,
  Shield,
  Database,
  ArrowRight
} from 'lucide-react';

const careerPaths = [
  {
    id: 'tech',
    title: 'Technology',
    description: 'Software, Data, Cybersecurity',
    icon: Code,
    color: 'from-blue-500 to-indigo-600',
    roles: ['Frontend Developer', 'Data Analyst', 'DevOps Engineer'],
    users: '12.5K+',
  },
  {
    id: 'health',
    title: 'Healthcare',
    description: 'Medicine, Nursing, Pharmacy',
    icon: Stethoscope,
    color: 'from-emerald-500 to-teal-600',
    roles: ['Medical Doctor', 'Nurse', 'Pharmacist'],
    users: '8.2K+',
  },
  {
    id: 'law',
    title: 'Law & Policy',
    description: 'Legal, Governance, Public Service',
    icon: Scale,
    color: 'from-amber-500 to-orange-600',
    roles: ['Lawyer', 'Legal Advisor', 'Policy Analyst'],
    users: '5.8K+',
  },
  {
    id: 'creative',
    title: 'Creative Arts',
    description: 'Design, Media, Entertainment',
    icon: Palette,
    color: 'from-pink-500 to-rose-600',
    roles: ['UI/UX Designer', 'Content Creator', 'Brand Strategist'],
    users: '9.1K+',
  },
  {
    id: 'business',
    title: 'Business',
    description: 'Finance, Marketing, Management',
    icon: TrendingUp,
    color: 'from-violet-500 to-purple-600',
    roles: ['Product Manager', 'Digital Marketer', 'Financial Analyst'],
    users: '15.3K+',
  },
  {
    id: 'security',
    title: 'Cybersecurity',
    description: 'Security, Ethics, Compliance',
    icon: Shield,
    color: 'from-slate-500 to-gray-700',
    roles: ['Security Analyst', 'Penetration Tester', 'SOC Analyst'],
    users: '4.7K+',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function CareerPathExplorer() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            Explore 50+ Career Paths
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            Find Your Perfect
            <span className="text-gradient"> Career Path</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Whether you're a student choosing university courses, a job seeker, or a professional 
            looking to upskill — we have assessments tailored for you.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {careerPaths.map((path) => (
            <motion.div
              key={path.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              <Link to={`/explore/${path.id}`}>
                <div className="relative bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {/* Gradient Glow on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${path.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${path.color} flex items-center justify-center mb-5 shadow-lg`}>
                    <path.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {path.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {path.description}
                  </p>

                  {/* Roles */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {path.roles.map((role) => (
                      <span
                        key={role}
                        className="px-2.5 py-1 rounded-md bg-muted text-xs font-medium text-muted-foreground"
                      >
                        {role}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-sm text-muted-foreground">
                      <strong className="text-foreground">{path.users}</strong> assessments taken
                    </span>
                    <span className="flex items-center gap-1 text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
                      Explore
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
