import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">Welcome to Personal Finance Tracker</h1>
        <p className="hero__subtitle">
          Manage your money with ease and get personalized insights using AI.
        </p>
        <div className={styles.buttons}>
          <a className="button button--secondary button--lg" href="/docs/setup">
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Home"
      description="Personal Finance Tracker with AI-powered budgeting tools"
    >
      <HomepageHeader />
      <main>
        <section className="padding-vert--lg">
          <div className="container">
            <p>
              Explore our documentation to set up your tracker, learn how to use
              it, and leverage AI for smarter financial decisions.
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}