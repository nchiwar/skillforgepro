import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Search,
  ArrowRight,
  Code,
  Stethoscope,
  Scale,
  Palette,
  TrendingUp,
  Shield,
  Wrench,
  GraduationCap,
  Briefcase,
  Building2,
  Leaf,
  Music,
  Camera,
  Plane,
  HeartPulse,
  Calculator,
  Megaphone,
  Users,
  Database,
  Cpu,
  Globe,
  Lightbulb,
  PenTool
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'all', name: 'All Paths', count: 50 },
  { id: 'tech', name: 'Technology', count: 12 },
  { id: 'health', name: 'Healthcare', count: 8 },
  { id: 'business', name: 'Business', count: 10 },
  { id: 'creative', name: 'Creative Arts', count: 7 },
  { id: 'legal', name: 'Legal & Policy', count: 5 },
  { id: 'engineering', name: 'Engineering', count: 8 },
];

const careerPaths = [
  {
    id: 'software-engineering',
    title: 'Software Engineering',
    category: 'tech',
    icon: Code,
    color: 'from-blue-500 to-indigo-600',
    description: 'Build applications, websites, and software systems that power the digital world.',
    skills: ['JavaScript', 'Python', 'System Design', 'Problem Solving'],
    salary: '₦3M - ₦25M/year',
    demand: 'Very High',
    users: '12.5K+',
  },
  {
    id: 'data-science',
    title: 'Data Science',
    category: 'tech',
    icon: Database,
    color: 'from-purple-500 to-violet-600',
    description: 'Extract insights from data using statistics, machine learning, and visualization.',
    skills: ['Python', 'Statistics', 'Machine Learning', 'SQL'],
    salary: '₦4M - ₦20M/year',
    demand: 'Very High',
    users: '8.3K+',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    category: 'tech',
    icon: Shield,
    color: 'from-red-500 to-rose-600',
    description: 'Protect organizations from cyber threats and secure digital infrastructure.',
    skills: ['Network Security', 'Ethical Hacking', 'Risk Assessment', 'Cryptography'],
    salary: '₦4M - ₦18M/year',
    demand: 'High',
    users: '4.7K+',
  },
  {
    id: 'product-management',
    title: 'Product Management',
    category: 'business',
    icon: Lightbulb,
    color: 'from-amber-500 to-orange-600',
    description: 'Lead product strategy and development from conception to launch.',
    skills: ['Strategy', 'User Research', 'Agile', 'Data Analysis'],
    salary: '₦5M - ₦25M/year',
    demand: 'High',
    users: '6.2K+',
  },
  {
    id: 'medicine',
    title: 'Medicine',
    category: 'health',
    icon: Stethoscope,
    color: 'from-emerald-500 to-teal-600',
    description: 'Diagnose and treat patients, improving health outcomes through medical care.',
    skills: ['Clinical Skills', 'Patient Care', 'Medical Knowledge', 'Research'],
    salary: '₦4M - ₦30M/year',
    demand: 'Very High',
    users: '8.2K+',
  },
  {
    id: 'nursing',
    title: 'Nursing',
    category: 'health',
    icon: HeartPulse,
    color: 'from-pink-500 to-rose-500',
    description: 'Provide patient care and support in hospitals and healthcare facilities.',
    skills: ['Patient Care', 'Clinical Skills', 'Communication', 'Empathy'],
    salary: '₦2M - ₦8M/year',
    demand: 'High',
    users: '5.1K+',
  },
  {
    id: 'law',
    title: 'Law',
    category: 'legal',
    icon: Scale,
    color: 'from-slate-500 to-gray-700',
    description: 'Practice law, represent clients, and navigate legal systems.',
    skills: ['Legal Research', 'Argumentation', 'Writing', 'Critical Thinking'],
    salary: '₦3M - ₦50M/year',
    demand: 'Medium',
    users: '5.8K+',
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    category: 'creative',
    icon: PenTool,
    color: 'from-pink-500 to-fuchsia-600',
    description: 'Create beautiful, user-friendly digital experiences and interfaces.',
    skills: ['Figma', 'User Research', 'Prototyping', 'Visual Design'],
    salary: '₦2.5M - ₦15M/year',
    demand: 'High',
    users: '9.1K+',
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    category: 'business',
    icon: Megaphone,
    color: 'from-orange-500 to-red-600',
    description: 'Drive brand awareness and customer acquisition through digital channels.',
    skills: ['SEO', 'Social Media', 'Analytics', 'Content Strategy'],
    salary: '₦2M - ₦12M/year',
    demand: 'High',
    users: '7.4K+',
  },
  {
    id: 'financial-analysis',
    title: 'Financial Analysis',
    category: 'business',
    icon: Calculator,
    color: 'from-green-500 to-emerald-600',
    description: 'Analyze financial data to guide investment and business decisions.',
    skills: ['Financial Modeling', 'Excel', 'Accounting', 'Valuation'],
    salary: '₦3M - ₦20M/year',
    demand: 'Medium',
    users: '4.5K+',
  },
  {
    id: 'civil-engineering',
    title: 'Civil Engineering',
    category: 'engineering',
    icon: Building2,
    color: 'from-yellow-500 to-amber-600',
    description: 'Design and oversee construction of infrastructure and buildings.',
    skills: ['AutoCAD', 'Structural Analysis', 'Project Management', 'Mathematics'],
    salary: '₦3M - ₦15M/year',
    demand: 'Medium',
    users: '3.8K+',
  },
  {
    id: 'mechanical-engineering',
    title: 'Mechanical Engineering',
    category: 'engineering',
    icon: Wrench,
    color: 'from-gray-500 to-slate-600',
    description: 'Design and develop mechanical systems and machinery.',
    skills: ['CAD', 'Thermodynamics', 'Materials Science', 'Problem Solving'],
    salary: '₦3M - ₦18M/year',
    demand: 'Medium',
    users: '4.2K+',
  },
  {
    id: 'ai-ml-engineering',
    title: 'AI/ML Engineering',
    category: 'tech',
    icon: Cpu,
    color: 'from-cyan-500 to-blue-600',
    description: 'Build intelligent systems using artificial intelligence and machine learning.',
    skills: ['Python', 'TensorFlow', 'Deep Learning', 'Mathematics'],
    salary: '₦5M - ₦30M/year',
    demand: 'Very High',
    users: '5.6K+',
  },
  {
    id: 'hr-management',
    title: 'Human Resources',
    category: 'business',
    icon: Users,
    color: 'from-teal-500 to-cyan-600',
    description: 'Manage recruitment, employee relations, and organizational development.',
    skills: ['Recruitment', 'Employee Relations', 'Training', 'Conflict Resolution'],
    salary: '₦2.5M - ₦12M/year',
    demand: 'Medium',
    users: '3.2K+',
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    category: 'creative',
    icon: Palette,
    color: 'from-violet-500 to-purple-600',
    description: 'Create visual content for brands, marketing, and digital platforms.',
    skills: ['Adobe Creative Suite', 'Typography', 'Branding', 'Layout'],
    salary: '₦1.5M - ₦10M/year',
    demand: 'Medium',
    users: '6.8K+',
  },
  {
    id: 'content-creation',
    title: 'Content Creation',
    category: 'creative',
    icon: Camera,
    color: 'from-rose-500 to-pink-600',
    description: 'Create engaging content for social media, blogs, and video platforms.',
    skills: ['Video Editing', 'Writing', 'Social Media', 'Storytelling'],
    salary: '₦1M - ₦15M/year',
    demand: 'High',
    users: '8.9K+',
  },
  {
    id: 'pharmacy',
    title: 'Pharmacy',
    category: 'health',
    icon: HeartPulse,
    color: 'from-blue-400 to-indigo-500',
    description: 'Dispense medications and advise on pharmaceutical care.',
    skills: ['Pharmacology', 'Patient Counseling', 'Drug Interactions', 'Compounding'],
    salary: '₦3M - ₦12M/year',
    demand: 'Medium',
    users: '3.4K+',
  },
  {
    id: 'architecture',
    title: 'Architecture',
    category: 'engineering',
    icon: Building2,
    color: 'from-indigo-500 to-blue-600',
    description: 'Design buildings and spaces that are functional, safe, and aesthetically pleasing.',
    skills: ['AutoCAD', '3D Modeling', 'Design Principles', 'Building Codes'],
    salary: '₦3M - ₦20M/year',
    demand: 'Medium',
    users: '2.9K+',
  },
];

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPaths = careerPaths.filter((path) => {
    const matchesSearch = path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      path.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || path.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Explore <span className="text-gradient">Career Paths</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover 50+ career paths with detailed insights, skill requirements, 
              and personalized assessments to find your perfect fit.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-10"
          >
            {/* Search */}
            <div className="relative max-w-xl mx-auto mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search career paths..."
                className="w-full h-14 pl-12 pr-4 rounded-2xl border-2 border-border bg-card focus:border-primary focus:ring-0 outline-none transition-colors text-lg"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                    selectedCategory === category.id
                      ? "gradient-primary text-primary-foreground shadow-md"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {category.name}
                  <span className="ml-1.5 text-xs opacity-70">({category.count})</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Career Paths Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPaths.map((path, index) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="h-full bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${path.color} flex items-center justify-center shadow-lg`}>
                      <path.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-success/10 text-success text-xs font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-success" />
                      {path.demand} Demand
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {path.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-1">
                    {path.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {path.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md bg-muted text-xs font-medium text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                    {path.skills.length > 3 && (
                      <span className="px-2 py-0.5 rounded-md bg-muted text-xs font-medium text-muted-foreground">
                        +{path.skills.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-border mb-4">
                    <div>
                      <div className="text-xs text-muted-foreground">Salary Range</div>
                      <div className="text-sm font-semibold">{path.salary}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">Assessments</div>
                      <div className="text-sm font-semibold">{path.users}</div>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button variant="outline-primary" className="w-full group/btn" asChild>
                    <Link to={`/assessment?path=${path.id}`}>
                      Take Assessment
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredPaths.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">No career paths found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
