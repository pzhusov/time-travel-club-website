import { useState, useEffect } from 'react'
import { ChevronDown, ArrowRight, MapPin, Clock, Shield, Star, Globe, Sparkles, Mail, Phone } from 'lucide-react'

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Check visibility of sections
      const sections = ['hero', 'about', 'services', 'contact']
      sections.forEach(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top < window.innerHeight * 0.8) {
            setVisibleSections(prev => new Set([...prev, section]))
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#ededed]">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-strong py-4' : 'glass py-6'
      }`}>
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#F4E4BC] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#050505]" />
              </div>
              <span className="text-xl font-semibold tracking-tight">TIME TRAVEL CLUB</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('about')} className="text-sm text-[#888888] hover:text-[#ededed] transition-colors">
                About
              </button>
              <button onClick={() => scrollToSection('services')} className="text-sm text-[#888888] hover:text-[#ededed] transition-colors">
                Services
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-sm text-[#888888] hover:text-[#ededed] transition-colors">
                Contact
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-5 py-2.5 bg-[#ededed] text-[#050505] text-sm font-medium rounded-lg hover:bg-[#D4AF37] transition-colors"
              >
                Join Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-[#ededed] transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-full h-0.5 bg-[#ededed] transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-0.5 bg-[#ededed] transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-strong absolute top-full left-0 right-0 p-6 space-y-4">
            <button onClick={() => scrollToSection('about')} className="block w-full text-left text-[#888888] hover:text-[#ededed] py-2">
              About
            </button>
            <button onClick={() => scrollToSection('services')} className="block w-full text-left text-[#888888] hover:text-[#ededed] py-2">
              Services
            </button>
            <button onClick={() => scrollToSection('contact')} className="block w-full text-left text-[#888888] hover:text-[#ededed] py-2">
              Contact
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full px-5 py-2.5 bg-[#ededed] text-[#050505] text-sm font-medium rounded-lg"
            >
              Join Now
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-radial" />

        {/* Animated circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#D4AF37]/5 animate-pulse-glow blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#D4AF37]/3 animate-pulse-glow blur-3xl delay-500" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <div className={`transition-all duration-1000 ${visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* License badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8">
              <Shield className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs text-[#888888]">Licensed by Dubai Integrated Economic Zones Authority</span>
            </div>

            {/* Main heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
              <span className="block">Experience</span>
              <span className="gradient-text">Time Travel</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-[#888888] max-w-2xl mx-auto mb-10">
              Unlock extraordinary journeys through time. Join an exclusive club of discerning travelers seeking unparalleled adventures across eras.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => scrollToSection('contact')}
                className="group px-8 py-4 bg-[#ededed] text-[#050505] font-medium rounded-lg flex items-center gap-2 hover:bg-[#D4AF37] transition-all"
              >
                Become a Member
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="px-8 py-4 glass text-[#ededed] font-medium rounded-lg hover:border-[#D4AF37]/30 transition-all"
              >
                Explore Services
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <ChevronDown className="w-6 h-6 text-[#888888]" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding relative">
        <div className="container-custom">
          <div className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${visibleSections.has('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                A Legacy of <span className="gradient-text">Excellence</span>
              </h2>
              <div className="space-y-4 text-[#888888] leading-relaxed">
                <p>
                  Time Travel Club is a premier luxury travel organization, licensed by the Dubai Integrated Economic Zones Authority and headquartered in the heart of Dubai Silicon Oasis.
                </p>
                <p>
                  Founded with a vision to redefine luxury travel, we specialize in curating extraordinary experiences that transcend the ordinary. Our expert team combines decades of industry knowledge with innovative approaches to deliver unforgettable journeys.
                </p>
                <p>
                  As a licensed FZCO, we uphold the highest standards of professionalism and integrity, ensuring every member receives exceptional service and exclusive access to world-class travel experiences.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-[#333333]">
                <div>
                  <div className="text-3xl font-bold gradient-text">10+</div>
                  <div className="text-sm text-[#888888] mt-1">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold gradient-text">50K+</div>
                  <div className="text-sm text-[#888888] mt-1">Happy Members</div>
                </div>
                <div>
                  <div className="text-3xl font-bold gradient-text">100+</div>
                  <div className="text-sm text-[#888888] mt-1">Destinations</div>
                </div>
              </div>
            </div>

            {/* Image/Visual */}
            <div className="relative">
              <div className="aspect-square rounded-2xl glassStrong overflow-hidden glow-gold">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Globe className="w-24 h-24 mx-auto text-[#D4AF37] mb-4" />
                    <div className="text-2xl font-bold">Dubai Silicon Oasis</div>
                    <div className="text-[#888888] mt-2">IFZA Properties</div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 glassStrong px-6 py-4 rounded-xl glow-gold">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#D4AF37]" />
                  <div>
                    <div className="text-sm text-[#888888]">Based in</div>
                    <div className="font-medium">Dubai, UAE</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding relative bg-[#0a0a0a]">
        <div className="container-custom">
          <div className={`text-center mb-16 transition-all duration-1000 ${visibleSections.has('services') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-[#888888] max-w-2xl mx-auto">
              Comprehensive luxury travel solutions tailored to the discerning traveler
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Star,
                title: 'Premium Concierge',
                description: 'Personalized 24/7 concierge service handling every detail of your journey, from reservations to exclusive access.',
                delay: 'delay-100'
              },
              {
                icon: Globe,
                title: 'Luxury Travel Planning',
                description: 'Bespoke itineraries crafted by industry experts, ensuring unique experiences beyond conventional tourism.',
                delay: 'delay-200'
              },
              {
                icon: Clock,
                title: 'Time-Critical Services',
                description: 'Priority booking and coordination for time-sensitive experiences, ensuring you never miss a moment.',
                delay: 'delay-300'
              },
              {
                icon: Shield,
                title: 'Corporate Training',
                description: 'Professional and management development training programs conducted in prestigious international locations.',
                delay: 'delay-400'
              },
              {
                icon: Sparkles,
                title: 'Event Management',
                description: 'Exclusive event organization and management, from corporate gatherings to private celebrations.',
                delay: 'delay-500'
              },
              {
                icon: MapPin,
                title: 'Global Consulting',
                description: 'Expert marketing research and consultancy services for businesses expanding globally.',
                delay: 'delay-600'
              }
            ].map((service, index) => (
              <div
                key={index}
                className={`group glassStrong p-8 rounded-2xl card-hover ${visibleSections.has('services') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${service.delay}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-6 group-hover:bg-[#D4AF37]/20 transition-colors">
                  <service.icon className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-[#888888] text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding relative">
        <div className="container-custom">
          <div className={`max-w-2xl mx-auto text-center transition-all duration-1000 ${visibleSections.has('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Begin Your <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-[#888888] mb-12">
              Join Time Travel Club and unlock a world of extraordinary experiences
            </p>

            <form className="glassStrong p-8 rounded-2xl" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-left">
                    <label className="block text-sm text-[#888888] mb-2">First Name</label>
                    <input
                      type="text"
                      className="w-full bg-[#111111] border border-[#333333] rounded-lg px-4 py-3 text-[#ededed] focus:border-[#D4AF37] focus:outline-none transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div className="text-left">
                    <label className="block text-sm text-[#888888] mb-2">Last Name</label>
                    <input
                      type="text"
                      className="w-full bg-[#111111] border border-[#333333] rounded-lg px-4 py-3 text-[#ededed] focus:border-[#D4AF37] focus:outline-none transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div className="text-left">
                  <label className="block text-sm text-[#888888] mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full bg-[#111111] border border-[#333333] rounded-lg px-4 py-3 text-[#ededed] focus:border-[#D4AF37] focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="text-left">
                  <label className="block text-sm text-[#888888] mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full bg-[#111111] border border-[#333333] rounded-lg px-4 py-3 text-[#ededed] focus:border-[#D4AF37] focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your travel aspirations..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-[#ededed] text-[#050505] font-medium rounded-lg hover:bg-[#D4AF37] transition-colors flex items-center justify-center gap-2"
                >
                  Submit Inquiry
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Contact Info */}
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <div className="glass p-6 rounded-xl flex items-center gap-4">
                <Mail className="w-5 h-5 text-[#D4AF37]" />
                <div className="text-left">
                  <div className="text-sm text-[#888888]">Email</div>
                  <div className="font-medium">info@timetravelclub.ae</div>
                </div>
              </div>
              <div className="glass p-6 rounded-xl flex items-center gap-4">
                <Phone className="w-5 h-5 text-[#D4AF37]" />
                <div className="text-left">
                  <div className="text-sm text-[#888888]">Phone</div>
                  <div className="font-medium">+971 4 XXX XXXX</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[#333333]">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#F4E4BC] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#050505]" />
              </div>
              <span className="text-lg font-semibold">TIME TRAVEL CLUB</span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-8 text-sm text-[#888888]">
              <button onClick={() => scrollToSection('about')} className="hover:text-[#ededed] transition-colors">About</button>
              <button onClick={() => scrollToSection('services')} className="hover:text-[#ededed] transition-colors">Services</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-[#ededed] transition-colors">Contact</button>
            </div>

            {/* Copyright */}
            <div className="text-sm text-[#888888]">
              © 2024 Time Travel Club. All rights reserved.
            </div>
          </div>

          {/* License Info */}
          <div className="mt-8 pt-8 border-t border-[#333333] text-center">
            <div className="text-sm text-[#888888]">
              License No: 39915 | Licensed by Dubai Integrated Economic Zones Authority | Manager: Sergiy Kravchenko
            </div>
            <div className="text-sm text-[#888888] mt-2">
              Dubai Silicon Oasis, IFZA Properties
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
