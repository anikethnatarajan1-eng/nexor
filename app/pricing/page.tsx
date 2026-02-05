"use client";

import Link from "next/link";
import "../globals.css"; // or wherever your index.css is

export default function PricingPage() {
  return (
    <div className="page">

      {/* NAVBAR */}
      <nav className="top-nav">
        <Link href="/" className="nav-logo">NEXORA</Link>
        <div className="nav-right">
          <Link href="/">Home</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/signin" className="btn-nav">Sign In</Link>
        </div>
      </nav>

      {/* PAGE CONTENT */}
      <div className="page-container">

        <h1 className="page-title">Pricing</h1>
        <p className="page-subtitle">Choose the plan that fits your workflow</p>

        <div className="pricing-grid">

          <div className="card pricing-card">
            <h2 className="plan-name">Starter</h2>
            <div className="plan-price">$0</div>
            <ul className="plan-features">
              <li>Basic AI Tools</li>
              <li>Limited Requests</li>
              <li>Email Support</li>
            </ul>
            <Link href="/signup" className="btn btn-primary">Get Started</Link>
          </div>

          <div className="card pricing-card">
            <h2 className="plan-name">Pro</h2>
            <div className="plan-price">$19/mo</div>
            <ul className="plan-features">
              <li>Unlimited AI Requests</li>
              <li>Priority Processing</li>
              <li>Team Collaboration</li>
            </ul>
            <Link href="/signup" className="btn btn-primary">Upgrade</Link>
          </div>

          <div className="card pricing-card">
            <h2 className="plan-name">Enterprise</h2>
            <div className="plan-price">Custom</div>
            <ul className="plan-features">
              <li>Dedicated AI Models</li>
              <li>Custom Integrations</li>
              <li>24/7 Support</li>
            </ul>
            <Link href="/signup" className="btn btn-primary">Contact Sales</Link>
          </div>

        </div>
      </div>
    </div>
  );
}
