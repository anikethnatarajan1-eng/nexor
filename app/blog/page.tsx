"use client";

import Link from "next/link";
import "../globals.css";

export default function BlogPage() {
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

        <h1 className="page-title">NEXORA Blog</h1>
        <p className="page-subtitle">Insights, updates, and AI breakthroughs</p>

        <div className="blog-grid">

          <div className="card blog-card">
            <h3>Introducing NEXORA</h3>
            <p>A new era of identity, workflow, and trust begins.</p>
            <Link href="/blog/introducing-nexora" className="blog-link">Read More →</Link>
          </div>

          <div className="card blog-card">
            <h3>How We Built Our AI Engine</h3>
            <p>A deep dive into the architecture powering NEXORA.</p>
            <Link href="/blog/ai-engine" className="blog-link">Read More →</Link>
          </div>

          <div className="card blog-card">
            <h3>Scaling to 10,000 Users</h3>
            <p>What we learned about performance, reliability, and speed.</p>
            <Link href="/blog/scaling" className="blog-link">Read More →</Link>
          </div>

        </div>
      </div>
    </div>
  );
}
        