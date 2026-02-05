'use client';

import { useState, useEffect } from 'react';
import './globals.css';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [typewriterText, setTypewriterText] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const texts = [
    "Nexora Already Works.",
    "Identity. Workflow. Trust.",
    "Built for Real Teams.",
    "Fast. Reliable. Scalable."
  ];

  useEffect(() => {
    // Loading screen
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Scroll effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Typewriter effect
    let index = 0;
    let i = 0;
    let isDeleting = false;
    const speed = 100;
    const eraseSpeed = 60;
    const delay = 1200;

    function typeEffect() {
      const currentText = texts[index];

      if (!isDeleting) {
        setTypewriterText(currentText.substring(0, i + 1));
        i++;

        if (i === currentText.length) {
          setTimeout(() => { isDeleting = true; }, delay);
        }
      } else {
        setTypewriterText(currentText.substring(0, i - 1));
        i--;

        if (i === 0) {
          isDeleting = false;
          index = (index + 1) % texts.length;
        }
      }

      setTimeout(typeEffect, isDeleting ? eraseSpeed : speed);
    }

    typeEffect();

    // Scroll reveal
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
      observer.observe(el);
    });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const showToastMessage = (message: string, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    showToastMessage('Successfully signed in!', 'success');
    setShowSignIn(false);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    showToastMessage('Account created!', 'success');
    setShowSignUp(false);
  };

  return (
    <>
      {/* Loading Screen */}
      <div id="loading-screen" className={isLoading ? '' : 'hidden'}>
        <div className="loading-logo">
          <svg viewBox="0 0 200 200">
            <circle className="logo-ring" cx="100" cy="100" r="90" />
            <circle className="logo-core" cx="100" cy="100" r="60" />
            <path className="logo-core" d="M100,40 L160,100 L100,160 L40,100 Z" />
          </svg>
        </div>
        <div className="loading-text">NEXORA</div>
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
      </div>

      {/* Background Animation */}
      <div className="bg-animation">
        <div className="grid-line horizontal" style={{ top: '10%' }}></div>
        <div className="grid-line horizontal" style={{ top: '30%' }}></div>
        <div className="grid-line horizontal" style={{ top: '50%' }}></div>
        <div className="grid-line horizontal" style={{ top: '70%' }}></div>
        <div className="grid-line horizontal" style={{ top: '90%' }}></div>
        <div className="grid-line vertical" style={{ left: '10%' }}></div>
        <div className="grid-line vertical" style={{ left: '30%' }}></div>
        <div className="grid-line vertical" style={{ left: '50%' }}></div>
        <div className="grid-line vertical" style={{ left: '70%' }}></div>
        <div className="grid-line vertical" style={{ left: '90%' }}></div>
      </div>

      {/* Navigation */}
      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <a href="#" className="logo-nav">
          <div className="logo-icon">N</div>
          NEXORA
        </a>
        <ul className="nav-links">
          <li><a href="features.html">Features</a></li>
          <li><a href="pricing.html">Pricing</a></li>
          <li><a href="docs.html">Docs</a></li>
          <li><a href="blog.html">Blog</a></li>
          <li><a href="about.html">About</a></li>
        </ul>
        <div className="nav-actions">
          <button className="btn btn-secondary" onClick={() => setShowSignIn(true)}>Sign In</button>
          <button className="btn btn-primary" onClick={() => setShowSignUp(true)}>Get Started</button>
        </div>
        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>☰</button>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`} id="mobileMenu">
        <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)}>×</button>
        <ul className="mobile-nav-links">
          <li><a href="features.html" onClick={() => setMobileMenuOpen(false)}>Features</a></li>
          <li><a href="pricing.html" onClick={() => setMobileMenuOpen(false)}>Pricing</a></li>
          <li><a href="docs.html" onClick={() => setMobileMenuOpen(false)}>Docs</a></li>
          <li><a href="blog.html" onClick={() => setMobileMenuOpen(false)}>Blog</a></li>
          <li><a href="about.html" onClick={() => setMobileMenuOpen(false)}>About</a></li>
          <li>
            <button className="btn btn-secondary" onClick={() => { setShowSignIn(true); setMobileMenuOpen(false); }}>
              Sign In
            </button>
          </li>
          <li>
            <a href="#" onClick={() => { setShowSignUp(true); setMobileMenuOpen(false); }}>Get Started</a>
          </li>
        </ul>
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>{typewriterText}</h1>
          <h2>A unified identity and operations layer built for real teams.</h2>
          <p className="hero-description">
            Thousands of users rely on Nexora to verify identity, manage workflows, and operate with trust.
            No hype — just a fast, reliable system that performs at scale.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => setShowSignUp(true)}>Create Your Profile</button>
            <button className="btn btn-secondary" onClick={() => window.location.href = 'demo.html'}>View Live Dashboard</button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stat-card scroll-reveal">
          <div className="stat-number">500K+</div>
          <div className="stat-label">Active Users</div>
        </div>
        <div className="stat-card scroll-reveal">
          <div className="stat-number">99.9%</div>
          <div className="stat-label">Uptime</div>
        </div>
        <div className="stat-card scroll-reveal">
          <div className="stat-number">150+</div>
          <div className="stat-label">Countries</div>
        </div>
        <div className="stat-card scroll-reveal">
          <div className="stat-number">24/7</div>
          <div className="stat-label">Support</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Powerful Features</h2>
        <p className="section-subtitle">Everything you need to build, deploy, and scale your applications with confidence</p>
        <div className="features-grid">
          <div className="feature-card scroll-reveal">
            <div className="feature-icon">⚡</div>
            <h3 className="feature-title">Lightning Fast</h3>
            <p className="feature-description">Experience blazing-fast performance with our optimized infrastructure. Deploy in seconds, not minutes.</p>
          </div>
          <div className="feature-card scroll-reveal">
            <div className="feature-icon">🔒</div>
            <h3 className="feature-title">Enterprise Security</h3>
            <p className="feature-description">Bank-level encryption, SOC 2 compliance, and advanced threat protection keep your data safe.</p>
          </div>
          <div className="feature-card scroll-reveal">
            <div className="feature-icon">🚀</div>
            <h3 className="feature-title">Auto Scaling</h3>
            <p className="feature-description">Automatically scale your resources based on demand. Pay only for what you use.</p>
          </div>
          <div className="feature-card scroll-reveal">
            <div className="feature-icon">🌐</div>
            <h3 className="feature-title">Global CDN</h3>
            <p className="feature-description">Deliver content at lightning speed with our worldwide network of edge servers.</p>
          </div>
          <div className="feature-card scroll-reveal">
            <div className="feature-icon">📊</div>
            <h3 className="feature-title">Real-time Analytics</h3>
            <p className="feature-description">Monitor performance, track metrics, and gain insights with our powerful analytics dashboard.</p>
          </div>
          <div className="feature-card scroll-reveal">
            <div className="feature-icon">🤖</div>
            <h3 className="feature-title">AI-Powered</h3>
            <p className="feature-description">Leverage machine learning and AI to automate workflows and optimize performance.</p>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="technologies">
        <h2 className="section-title">Built with Modern Tech</h2>
        <p className="section-subtitle">Powered by the latest and greatest technologies</p>
        <div className="tech-grid">
          {[
            { icon: '⚛️', name: 'React' },
            { icon: '📘', name: 'TypeScript' },
            { icon: '🟢', name: 'Node.js' },
            { icon: '🐳', name: 'Docker' },
            { icon: '☸️', name: 'Kubernetes' },
            { icon: '🔥', name: 'Firebase' },
            { icon: '🗄️', name: 'PostgreSQL' },
            { icon: '📮', name: 'Redis' },
            { icon: '🎨', name: 'GraphQL' },
            { icon: '⚙️', name: 'Rust' },
            { icon: '🐍', name: 'Python' },
            { icon: '☁️', name: 'AWS' }
          ].map((tech, idx) => (
            <div key={idx} className="tech-item scroll-reveal">
              <div className="tech-icon">{tech.icon}</div>
              <div className="tech-name">{tech.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Demo Section */}
      <section className="demo-section">
        <div className="demo-grid">
          <div className="demo-content scroll-reveal">
            <h3>See It In Action</h3>
            <p>Watch how Nexora transforms your workflow with intelligent automation, real-time collaboration, and seamless integrations.</p>
            <ul className="demo-features">
              <li>Instant deployment pipeline</li>
              <li>Collaborative code review</li>
              <li>Built-in monitoring and logging</li>
              <li>One-click rollbacks</li>
              <li>Advanced security scanning</li>
            </ul>
            <button className="btn btn-primary" onClick={() => window.location.href = 'demo.html'}>View Full Demo</button>
          </div>
          <div className="demo-image scroll-reveal">
            🎬
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing">
        <h2 className="section-title">Simple, Transparent Pricing</h2>
        <p className="section-subtitle">Choose the plan that fits your needs. Scale as you grow.</p>
        <div className="pricing-grid">
          <div className="pricing-card scroll-reveal">
            <h3 className="pricing-name">Starter</h3>
            <div className="pricing-price">$0</div>
            <div className="pricing-period">Free Forever</div>
            <ul className="pricing-features">
              <li>Up to 3 projects</li>
              <li>100GB storage</li>
              <li>Basic analytics</li>
              <li>Community support</li>
              <li>99% uptime SLA</li>
            </ul>
            <button className="btn btn-secondary">Get Started</button>
          </div>
          <div className="pricing-card featured scroll-reveal">
            <div className="pricing-badge">Most Popular</div>
            <h3 className="pricing-name">Pro</h3>
            <div className="pricing-price">$49</div>
            <div className="pricing-period">per month</div>
            <ul className="pricing-features">
              <li>Unlimited projects</li>
              <li>1TB storage</li>
              <li>Advanced analytics</li>
              <li>Priority support</li>
              <li>99.9% uptime SLA</li>
              <li>Custom domains</li>
              <li>Team collaboration</li>
            </ul>
            <button className="btn btn-primary">Start Free Trial</button>
          </div>
          <div className="pricing-card scroll-reveal">
            <h3 className="pricing-name">Enterprise</h3>
            <div className="pricing-price">Custom</div>
            <div className="pricing-period">Contact Sales</div>
            <ul className="pricing-features">
              <li>Everything in Pro</li>
              <li>Unlimited storage</li>
              <li>White-label solution</li>
              <li>24/7 phone support</li>
              <li>99.99% uptime SLA</li>
              <li>Dedicated account manager</li>
              <li>Custom integrations</li>
              <li>On-premise deployment</li>
            </ul>
            <button className="btn btn-secondary">Contact Sales</button>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="metrics">
        <h2 className="section-title">Performance That Matters</h2>
        <p className="section-subtitle">Real metrics from real users</p>
        <div className="metrics-grid">
          <div className="metric-card scroll-reveal">
            <div className="metric-value">&lt; 100ms</div>
            <div className="metric-label">Response Time</div>
            <div className="metric-trend">↑ 35% faster</div>
          </div>
          <div className="metric-card scroll-reveal">
            <div className="metric-value">99.99%</div>
            <div className="metric-label">Availability</div>
            <div className="metric-trend">↑ Industry leading</div>
          </div>
          <div className="metric-card scroll-reveal">
            <div className="metric-value">5M+</div>
            <div className="metric-label">Requests/Day</div>
            <div className="metric-trend">↑ 200% growth</div>
          </div>
          <div className="metric-card scroll-reveal">
            <div className="metric-value">45s</div>
            <div className="metric-label">Avg Deploy Time</div>
            <div className="metric-trend">↓ 50% faster</div>
          </div>
          <div className="metric-card scroll-reveal">
            <div className="metric-value">Zero</div>
            <div className="metric-label">Data Breaches</div>
            <div className="metric-trend">✓ Always secure</div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="use-cases">
        <h2 className="section-title">Built for Every Team</h2>
        <p className="section-subtitle">See how teams across industries use Nexora</p>
        <div className="use-cases-grid">
          <div className="use-case scroll-reveal">
            <div className="use-case-number">01</div>
            <h3 className="use-case-title">Startups</h3>
            <p className="use-case-description">Launch faster and scale effortlessly with our developer-friendly platform.</p>
            <ul className="use-case-benefits">
              <li>Free tier to get started</li>
              <li>Scale automatically as you grow</li>
              <li>Built-in CI/CD pipelines</li>
              <li>Access to startup credits</li>
            </ul>
          </div>
          <div className="use-case scroll-reveal">
            <div className="use-case-number">02</div>
            <h3 className="use-case-title">Enterprise</h3>
            <p className="use-case-description">Enterprise-grade security, compliance, and support for mission-critical applications.</p>
            <ul className="use-case-benefits">
              <li>SOC 2 Type II certified</li>
              <li>GDPR & HIPAA compliant</li>
              <li>Dedicated support team</li>
              <li>Custom SLAs available</li>
            </ul>
          </div>
          <div className="use-case scroll-reveal">
            <div className="use-case-number">03</div>
            <h3 className="use-case-title">Agencies</h3>
            <p className="use-case-description">Manage multiple client projects with ease using our white-label solution.</p>
            <ul className="use-case-benefits">
              <li>Multi-tenant architecture</li>
              <li>Client billing management</li>
              <li>Custom branding options</li>
              <li>Team collaboration tools</li>
            </ul>
          </div>
          <div className="use-case scroll-reveal">
            <div className="use-case-number">04</div>
            <h3 className="use-case-title">E-commerce</h3>
            <p className="use-case-description">Handle traffic spikes and deliver fast shopping experiences globally.</p>
            <ul className="use-case-benefits">
              <li>Global CDN included</li>
              <li>Auto-scaling for Black Friday</li>
              <li>99.99% uptime guarantee</li>
              <li>PCI DSS compliant</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="security">
        <h2 className="section-title">Security First</h2>
        <p className="section-subtitle">Your data security is our top priority</p>
        <div className="security-grid">
          <div className="security-card scroll-reveal">
            <div className="security-icon">🛡️</div>
            <h3 className="security-title">Advanced Encryption</h3>
            <p className="security-description">All data is encrypted at rest and in transit using AES-256 and TLS 1.3 protocols.</p>
            <ul className="security-list">
              <li>End-to-end encryption</li>
              <li>Zero-knowledge architecture</li>
              <li>Hardware security modules</li>
            </ul>
          </div>
          <div className="security-card scroll-reveal">
            <div className="security-icon">🔐</div>
            <h3 className="security-title">Access Control</h3>
            <p className="security-description">Granular permissions, SSO, 2FA, and advanced audit logging keep unauthorized access at bay.</p>
            <ul className="security-list">
              <li>Role-based access control</li>
              <li>SAML 2.0 SSO support</li>
              <li>Multi-factor authentication</li>
            </ul>
          </div>
          <div className="security-card scroll-reveal">
            <div className="security-icon">✅</div>
            <h3 className="security-title">Compliance</h3>
            <p className="security-description">We maintain the highest industry standards and certifications for your peace of mind.</p>
            <ul className="security-list">
              <li>SOC 2 Type II certified</li>
              <li>GDPR compliant</li>
              <li>HIPAA compliant</li>
            </ul>
          </div>
          <div className="security-card scroll-reveal">
            <div className="security-icon">🔍</div>
            <h3 className="security-title">Monitoring</h3>
            <p className="security-description">24/7 security monitoring, threat detection, and incident response by our expert team.</p>
            <ul className="security-list">
              <li>Real-time threat detection</li>
              <li>Automated security scanning</li>
              <li>Incident response team</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2 className="section-title">Loved by Developers</h2>
        <p className="section-subtitle">See what our users have to say</p>
        <div className="testimonials-grid">
          <div className="testimonial-card scroll-reveal">
            <p className="testimonial-text">"Nexora has completely transformed how our team deploys applications. What used to take hours now takes minutes. The auto-scaling is incredible!"</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">AN</div>
              <div className="testimonial-info">
                <h4>Aniketh N.</h4>
                <p>Protige, AI Startups</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card scroll-reveal">
            <p className="testimonial-text">"The security features are top-notch. We passed our SOC 2 audit with flying colors thanks to Nexora's comprehensive compliance tools."</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">JD</div>
              <div className="testimonial-info">
                <h4>John Doe</h4>
                <p>CTO, TechCorp</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card scroll-reveal">
            <p className="testimonial-text">"Best platform we've used. The developer experience is unmatched, and the support team is always there when we need them."</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">SK</div>
              <div className="testimonial-info">
                <h4>Sarah Kim</h4>
                <p>Lead Developer, Startup Inc</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of developers building the future with Nexora</p>
          <button className="btn btn-primary" onClick={() => setShowSignUp(true)}>Start Free Trial</button>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="footer-brand">
            <h3>NEXORA</h3>
            <p>Building the future of cloud infrastructure, one deployment at a time.</p>
            <div className="social-links">
              <a href="#" className="social-link">𝕏</a>
              <a href="#" className="social-link">in</a>
              <a href="#" className="social-link">f</a>
              <a href="#" className="social-link">gh</a>
            </div>
          </div>
          <div className="footer-section">
            <h4>Product</h4>
            <ul className="footer-links">
              <li><a href="#">Features</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Security</a></li>
              <li><a href="#">Enterprise</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Company</h4>
            <ul className="footer-links">
              <li><a href="#">About</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Resources</h4>
            <ul className="footer-links">
              <li><a href="#">Documentation</a></li>
              <li><a href="#">API Reference</a></li>
              <li><a href="#">Support</a></li>
              <li><a href="#">Status</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <ul className="footer-links">
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">Licenses</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Nexora. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </footer>

      {/* Sign In Modal */}
      {showSignIn && (
        <div className="modal active" onClick={(e) => e.target === e.currentTarget && setShowSignIn(false)}>
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowSignIn(false)}>×</button>
            <h2>Welcome Back</h2>
            <div className="oauth-buttons">
              <button className="oauth-btn" onClick={() => showToastMessage('Redirecting to Google...')}>
                <span>🔷</span>
                Continue with Google
              </button>
              <button className="oauth-btn" onClick={() => showToastMessage('Redirecting to GitHub...')}>
                <span>⚫</span>
                Continue with GitHub
              </button>
            </div>
            <div className="divider"><span>or sign in with email</span></div>
            <form onSubmit={handleSignIn}>
              <div className="form-group">
                <label htmlFor="signin-email">Email Address</label>
                <input type="email" id="signin-email" name="email" required placeholder="your@email.com" autoComplete="email" />
              </div>
              <div className="form-group">
                <label htmlFor="signin-password">Password</label>
                <input type="password" id="signin-password" name="password" required placeholder="••••••••" autoComplete="current-password" />
              </div>
              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input type="checkbox" name="remember" /> Remember me
                </label>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Sign In</button>
            </form>
            <div className="modal-footer">
              Don&apos;t have an account? <a href="#" onClick={(e) => { e.preventDefault(); setShowSignIn(false); setShowSignUp(true); }}>Sign up</a>
            </div>
          </div>
        </div>
      )}

      {/* Sign Up Modal */}
      {showSignUp && (
        <div className="modal active" onClick={(e) => e.target === e.currentTarget && setShowSignUp(false)}>
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowSignUp(false)}>×</button>
            <h2>Create Account</h2>
            <div className="oauth-buttons">
              <button className="oauth-btn" onClick={() => showToastMessage('Redirecting to Google...')}>
                <span>🔷</span>
                Sign up with Google
              </button>
              <button className="oauth-btn" onClick={() => showToastMessage('Redirecting to GitHub...')}>
                <span>⚫</span>
                Sign up with GitHub
              </button>
            </div>
            <div className="divider"><span>or create account with email</span></div>
            <form onSubmit={handleSignUp}>
              <div className="form-group">
                <label htmlFor="signup-name">Full Name</label>
                <input type="text" id="signup-name" name="name" required placeholder="John Doe" />
              </div>
              <div className="form-group">
                <label htmlFor="signup-email">Email Address</label>
                <input type="email" id="signup-email" name="email" required placeholder="your@email.com" autoComplete="email" />
              </div>
              <div className="form-group">
                <label htmlFor="signup-password">Password</label>
                <input type="password" id="signup-password" name="password" required placeholder="••••••••" minLength={8} autoComplete="new-password" />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Create Account</button>
            </form>
            <div className="modal-footer">
              Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setShowSignUp(false); setShowSignIn(true); }}>Sign in</a>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast.show && (
        <div className={`toast show ${toast.type}`}>
          {toast.message}
        </div>
      )}
    </>
  );
}