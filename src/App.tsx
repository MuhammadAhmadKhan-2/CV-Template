import React from 'react';
import ThreeBackground from './components/ThreeBackground';
import Navigation from './components/Navigation';
import Header from './components/Header';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
       <style>{`
        * {
          cursor: none !important;
        }
        a:hover, button:hover, input:hover, textarea:hover, select:hover {
          cursor: none !important;
        }
      `}</style>
      <ThreeBackground />
      <Navigation />
      <main>
        <section id="home">
          <Header />
        </section>
        <Education />
        <Skills />
        <Projects />
      </main>      
      <Footer />
    </div>
  );
}

export default App;