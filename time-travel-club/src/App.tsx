import { useState, useEffect, useRef } from 'react'
import { ChevronDown, ArrowRight, MapPin, Clock, Shield, Star, Globe, Sparkles, Mail, Phone, Menu, X, Play, Quote, TrendingUp, Users, Lock, ExternalLink } from 'lucide-react'

// Smooth scroll hook
const useSmoothScroll = () => {
  useEffect(() => {
    // Lenis-like smooth scroll implementation
    let scrollPosition = 0
    let targetScrollPosition = 0
    let isScrolling = false

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

    const animate = () => {
      if (!isScrolling) return

      const diff = targetScrollPosition - scrollPosition
      if (Math.abs(diff) < 0.5) {
        scrollPosition = targetScrollPosition
        isScrolling = false
        return
      }

      scrollPosition += diff * 0.1
      window.scrollTo(0, scrollPosition)
      requestAnimationFrame(animate)
    }

    const handleScroll = () => {
      targetScrollPosition = window.scrollY
      if (!isScrolling) {
        isScrolling = true
        requestAnimationFrame(animate)
      }
    }

    // Use native smooth scroll for better compatibility
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])
}

// Text reveal component
const TextReveal = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
      {children}
    </div>
  )
}

// Animated counter
const AnimatedCounter = ({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [isVisible, end, duration])

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold gradient-text">
      {count}{suffix}
    </div>
  )
}

// Preloader component
const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsExiting(true)
            setTimeout(onComplete, 1000)
          }, 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className={`fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center transition-all duration-1000 ${isExiting ? 'opacity-0 pointer-events-none' : ''}`}>
      <div className="text-center">
        <div className="mb-8">
          <Sparkles className="w-12 h-12 mx-auto text-[#D4AF37] animate-pulse" />
        </div>
        <div className="text-2xl md:text-4xl font-bold mb-4 tracking-widest">
          TIME TRAVEL CLUB
        </div>
        <div className="w-64 h-1 bg-[#333] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F4E4BC] transition-all duration-100"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <div className="mt-4 text-[#888] text-sm font-mono">
          {Math.min(Math.floor(progress), 100)}%
        </div>
      </div>
    </div>
  )
}

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useSmoothScroll()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  if (!isLoaded) {
    return <Preloader onComplete={() => setIsLoaded(true)} />
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#ededed] cursor-none">
      {/* Custom cursor */}
      <div
        className="fixed w-4 h-4 bg-[#D4AF37] rounded-full pointer-events-none z-[60] mix-blend-difference transition-transform duration-100"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: 'scale(1)'
        }}
      />

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? 'glass-strong py-4' : 'glass py-6'
      }`}>
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => scrollToSection('hero')}>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#F4E4BC] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5 text-[#050505]" />
              </div>
              <span className="text-xl font-semibold tracking-widest">TIME TRAVEL CLUB</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              {['About', 'Services', 'Mentoring', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="relative text-sm text-[#888888] hover:text-[#ededed] transition-colors group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                className="group px-6 py-2.5 bg-[#ededed] text-[#050505] text-sm font-medium rounded-lg hover:bg-[#D4AF37] transition-all flex items-center gap-2"
              >
                Join Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 relative"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-[#ededed] transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-full h-0.5 bg-[#ededed] transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-0.5 bg-[#ededed] transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden glass-strong absolute top-full left-0 right-0 overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
          <div className="p-6 space-y-4">
            {['About', 'Services', 'Mentoring', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="block w-full text-left text-[#888888] hover:text-[#ededed] py-2 transition-colors"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full px-5 py-2.5 bg-[#ededed] text-[#050505] text-sm font-medium rounded-lg"
            >
              Join Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-radial" />

        {/* Animated grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(212, 175, 55, 0.1) 1px, transparent  linear-gradient(901px),
             deg, rgba(212, 175, 55, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Floating shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#D4AF37]/5 animate-pulse-glow blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#D4AF37]/3 animate-pulse-glow blur-3xl delay-500" />
          <div className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full bg-[#D4AF37]/8 animate-pulse-glow blur-2xl delay-300" />
        </div>

        <div className="container-custom relative z-10 text-center">
          {/* License badge */}
          <TextReveal delay={200}>
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8">
              <Shield className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs text-[#888888] uppercase tracking-wider">Licensed by Dubai Integrated Economic Zones Authority</span>
            </div>
          </TextReveal>

          {/* Main heading */}
          <TextReveal delay={400}>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-6">
              <span className="block">STRATEGIC</span>
              <span className="gradient-text">INSIGHTS</span>
            </h1>
          </TextReveal>

          {/* Subheading */}
          <TextReveal delay={600}>
            <p className="text-lg md:text-xl text-[#888888] max-w-2xl mx-auto mb-12 leading-relaxed">
              We don't just analyze the present—we illuminate the future. Join industry leaders who trust our research and strategic expertise to navigate uncertainty and drive sustainable growth.
            </p>
          </TextReveal>

          {/* CTA Buttons */}
          <TextReveal delay={800}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button
                onClick={() => scrollToSection('contact')}
                className="group relative px-10 py-4 bg-[#ededed] text-[#050505] font-medium rounded-lg overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Partner With Us
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-[#D4AF37] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="px-10 py-4 glass text-[#ededed] font-medium rounded-lg hover:border-[#D4AF37]/50 transition-all group"
              >
                <span className="flex items-center gap-2">
                  <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Explore Services
                </span>
              </button>
            </div>
          </TextReveal>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="flex flex-col items-center gap-2">
            <ChevronDown className="w-6 h-6 text-[#888888]" />
            <div className="w-px h-12 bg-gradient-to-b from-[#D4AF37] to-transparent" />
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-8 bg-[#0a0a0a] border-y border-[#222] overflow-hidden">
        <div className="relative">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-16">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-16">
                <span className="text-2xl md:text-3xl font-bold text-[#333] uppercase tracking-widest">Strategic Research</span>
                <span className="text-2xl md:text-3xl font-bold gradient-text">✦</span>
                <span className="text-2xl md:text-3xl font-bold text-[#333] uppercase tracking-widest">Market Intelligence</span>
                <span className="text-2xl md:text-3xl font-bold gradient-text">✦</span>
                <span className="text-2xl md:text-3xl font-bold text-[#333] uppercase tracking-widest">Data-Driven Strategy</span>
                <span className="text-2xl md:text-3xl font-bold gradient-text">✦</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding relative">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <TextReveal>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                Visionary <span className="gradient-text">Intelligence</span>
              </h2>
            </TextReveal>

            <TextReveal delay={200}>
              <div className="space-y-6 text-[#888888] leading-relaxed">
                <p className="text-lg">
                  Time Travel Club is a premier strategic consulting firm, licensed by the Dubai Integrated Economic Zones Authority and headquartered in the heart of Dubai Silicon Oasis.
                </p>
                <p>
                  We specialize in transforming complex market dynamics into clear, actionable strategies. Our team combines solid industry experience with modern research methodologies to deliver insights that shape the future of business.
                </p>
                <p>
                  As a licensed FZCO, we uphold the highest standards of analytical rigor and strategic integrity, ensuring every client receives transformative insights that drive measurable business outcomes.
                </p>
              </div>
            </TextReveal>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding relative bg-[#0a0a0a]">
        <div className="container-custom">
          <TextReveal>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Our <span className="gradient-text">Services</span>
              </h2>
              <p className="text-[#888888] text-lg max-w-2xl mx-auto">
                Comprehensive strategic consulting services for forward-thinking organizations
              </p>
            </div>
          </TextReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: TrendingUp,
                title: 'Market Entry Analysis',
                description: 'Comprehensive market assessment for entering new territories. We analyze tender volumes, identify key customers, evaluate seasonality patterns, and determine funding stability to ensure informed market entry decisions.',
                features: ['Tender Volume Analysis', 'Customer Profiling', 'Seasonality Assessment', 'Funding Stability Evaluation', 'Market Sizing']
              },
              {
                icon: Globe,
                title: 'Geographic Intelligence',
                description: 'Strategic regional analysis to identify optimal market positioning. We evaluate regional activity levels, competition density, and growth potential to maximize your market presence.',
                features: ['Regional Activity Mapping', 'Competition Density Analysis', 'Market Potential Assessment', 'Entry Strategy by Region', 'Cross-Regional Planning']
              },
              {
                icon: Users,
                title: 'Competitive Intelligence',
                description: 'In-depth analysis of competitive landscape to identify strategic positioning. We segment competitors by size, assess market share, and evaluate partnership opportunities.',
                features: ['Competitor Mapping', 'Market Share Analysis', 'Subcontractor Assessment', 'Strategic Positioning', 'Competitive Benchmarking']
              },
              {
                icon: Lock,
                title: 'Regulatory Compliance',
                description: 'Complete barrier analysis and compliance roadmap. We identify legal requirements, necessary certifications, insurance needs, and financial guarantees for market entry.',
                features: ['Legal Form Requirements', 'Certification Roadmap', 'Insurance Analysis', 'Financial Guarantees', 'Compliance Timeline']
              },
              {
                icon: Shield,
                title: 'Financial Modeling',
                description: 'Detailed financial analysis for market entry. We provide pricing benchmarks, cost structure analysis, payment terms optimization, and risk assessment.',
                features: ['Pricing Benchmarks', 'Cost Structure Analysis', 'Payment Terms Optimization', 'Risk Assessment', 'Investment Planning']
              },
              {
                icon: MapPin,
                title: 'Tender Documentation',
                description: 'Expert analysis of tender documents to maximize success rate. We identify key requirements, common pitfalls, and disqualification risks to ensure competitive submissions.',
                features: ['Document Analysis', 'Trap Identification', 'Disqualification Risk Assessment', 'Success Strategy', 'Real Case Studies']
              },
              {
                icon: Sparkles,
                title: 'Expansion Strategy',
                description: 'Pan-European market expansion planning. We identify optimal markets, assess entry complexity, and develop partnership models for sustainable growth.',
                features: ['Market Selection', 'Entry Complexity Analysis', 'Partnership Models', 'Branch vs. Partner Assessment', 'Growth Roadmap']
              },
              {
                icon: Star,
                title: 'Strategic Advisory',
                description: 'End-to-end strategic consulting from market entry to expansion. We provide actionable recommendations, step-by-step implementation plans, and ongoing support.',
                features: ['Market Entry Recommendation', 'Implementation Roadmap', 'Timeline & Budget Planning', 'Risk Mitigation', 'Ongoing Strategic Support']
              }
            ].map((service, index) => (
              <TextReveal key={index} delay={index * 100}>
                <div className="group glassStrong p-8 rounded-2xl card-hover relative overflow-hidden">
                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-6 group-hover:bg-[#D4AF37]/20 transition-colors">
                      <service.icon className="w-7 h-7 text-[#D4AF37]" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                    <p className="text-[#888888] text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>
                    {/* Features list */}
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, i) => (
                        <span key={i} className="px-3 py-1 text-xs bg-[#111] rounded-full text-[#888]">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TextReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding relative bg-[#0a0a0a]">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <TextReveal>
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-6xl font-bold mb-6">
                  Begin Your <span className="gradient-text">Transformation</span>
                </h2>
                <p className="text-[#888888] text-lg">
                  Partner with Time Travel Club and unlock strategic insights that drive growth
                </p>
              </div>
            </TextReveal>

            <TextReveal delay={200}>
              <form className="glassStrong p-10 rounded-3xl" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm text-[#888888] mb-2 uppercase tracking-wider">First Name</label>
                      <input
                        type="text"
                        className="w-full bg-[#111111] border border-[#333333] rounded-lg px-4 py-4 text-[#ededed] focus:border-[#D4AF37] focus:outline-none transition-colors group-hover:border-[#D4AF37]/50"
                        placeholder="John"
                      />
                    </div>
                    <div className="group">
                      <label className="block text-sm text-[#888888] mb-2 uppercase tracking-wider">Last Name</label>
                      <input
                        type="text"
                        className="w-full bg-[#111111] border border-[#333333] rounded-lg px-4 py-4 text-[#ededed] focus:border-[#D4AF37] focus:outline-none transition-colors group-hover:border-[#D4AF37]/50"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div className="group">
                    <label className="block text-sm text-[#888888] mb-2 uppercase tracking-wider">Email</label>
                    <input
                      type="email"
                      className="w-full bg-[#111111] border border-[#333333] rounded-lg px-4 py-4 text-[#ededed] focus:border-[#D4AF37] focus:outline-none transition-colors group-hover:border-[#D4AF37]/50"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-sm text-[#888888] mb-2 uppercase tracking-wider">Message</label>
                    <textarea
                      rows={5}
                      className="w-full bg-[#111111] border border-[#333333] rounded-lg px-4 py-4 text-[#ededed] focus:border-[#D4AF37] focus:outline-none transition-colors group-hover:border-[#D4AF37]/50 resize-none"
                      placeholder="Tell us about your strategic challenges..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-5 bg-[#ededed] text-[#050505] font-medium rounded-lg hover:bg-[#D4AF37] transition-colors flex items-center justify-center gap-3 text-lg group"
                  >
                    Submit Inquiry
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            </TextReveal>

            {/* Contact Info */}
            <TextReveal delay={400}>
              <div className="grid md:grid-cols-2 gap-6 mt-12">
                <div className="glass p-6 rounded-xl flex items-center gap-4 group hover:border-[#D4AF37]/30 transition-colors cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <div className="text-xs text-[#888888] uppercase tracking-wider">Email</div>
                    <div className="font-medium">info@timetravelclub.ae</div>
                  </div>
                </div>
                <div className="glass p-6 rounded-xl flex items-center gap-4 group hover:border-[#D4AF37]/30 transition-colors cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <div className="text-xs text-[#888888] uppercase tracking-wider">Phone</div>
                    <div className="font-medium">+971 4 XXX XXXX</div>
                  </div>
                </div>
              </div>
            </TextReveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-[#222] bg-[#050505]">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Logo */}
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => scrollToSection('hero')}>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#F4E4BC] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#050505]" />
              </div>
              <span className="text-lg font-semibold tracking-widest">TIME TRAVEL CLUB</span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-8 text-sm">
              {['About', 'Services', 'Mentoring', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-[#888888] hover:text-[#D4AF37] transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-sm text-[#888888]">
              © 2024 Time Travel Club. All rights reserved.
            </div>
          </div>

          {/* License Info */}
          <div className="mt-12 pt-8 border-t border-[#222] text-center">
            <div className="text-sm text-[#666]">
              License No: 39915 | Licensed by Dubai Integrated Economic Zones Authority | Manager: Sergiy Kravchenko
            </div>
            <div className="text-sm text-[#666] mt-2">
              Dubai Silicon Oasis, IFZA Properties
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
