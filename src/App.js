import React, { useState } from 'react';
import { User, Briefcase, Mail, Phone, MapPin, Linkedin, Github, Code } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('user');
  
  // Your existing data objects remain the same
  const profileData = {
    name: "Shakir M. Shaker",
    title: "AI Engineer",
    location: "Copenhagen, Denmark",
    email: "shakir.m.shaker@gmail.com",
    phone: "+45 50 41 42 87",
    linkedin: "www.linkedin.com/in/shakir-m-shaker-3212a8168",
    bio: "Hi, I'm Shakir. I specialize in creating innovative solutions at the crossroads of AI, data science, and business strategy. With a passion for turning complex AI concepts into real-world impact, I thrive in dynamic environments, delivering cutting-edge, data-driven solutions that drive measurable business outcomes. I excel at collaborating with teams to push technological boundaries, leveraging emerging tools and methodologies to help organizations stay ahead in an AI-driven world."
  };

  // Keep all your existing content components (UserContent, ResumeContent, ProjectsContent)
  // ... 

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center p-2 md:p-4">
      <div className="w-full max-w-7xl h-[100vh] flex flex-col md:flex-row shadow-2xl rounded-lg overflow-hidden">
        {/* Desktop Navigation - Left Side */}
        <div className="hidden md:flex h-full w-14 bg-gray-800 flex-col justify-center items-center relative">
          <div className="absolute top-0 right-0 bottom-0 w-[1px] bg-gradient-to-b from-gray-800 via-emerald-400/30 to-gray-800" />
          <nav className="flex flex-col space-y-8">
            <button 
              className={`${activeTab === 'user' ? 'text-emerald-400' : 'text-gray-400'} hover:text-emerald-300 transition-colors duration-200 p-2`}
              onClick={() => setActiveTab('user')}
            >
              <User strokeWidth={2} />
            </button>
            <button 
              className={`${activeTab === 'resume' ? 'text-emerald-400' : 'text-gray-400'} hover:text-emerald-300 transition-colors duration-200 p-2`}
              onClick={() => setActiveTab('resume')}
            >
              <Briefcase strokeWidth={2} />
            </button>
            <button 
              className={`${activeTab === 'projects' ? 'text-emerald-400' : 'text-gray-400'} hover:text-emerald-300 transition-colors duration-200 p-2`}
              onClick={() => setActiveTab('projects')}
            >
              <Code strokeWidth={2} />
            </button>
          </nav>
        </div>

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Profile Image Section - Fixed Height */}
          <div className="h-[200px] md:h-auto md:w-[400px] bg-gray-900 relative shrink-0">
            <div className="absolute inset-0">
              <img
                src="/api/placeholder/400/300"
                alt="Profile"
                className="w-full h-full object-cover object-top md:object-center opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900"></div>
            </div>
            <div className="absolute bottom-4 md:bottom-12 left-0 right-0 px-4 md:px-6">
              <div className="hidden md:block text-center">
                <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-white tracking-wide">{profileData.name}</h1>
                <p className="text-lg md:text-xl text-emerald-400 tracking-wider">{profileData.title}</p>
              </div>
              {/* Mobile layout */}
              <div className="flex justify-between md:hidden">
                <h1 className="text-xl font-bold text-white tracking-wide">{profileData.name}</h1>
                <p className="text-lg text-emerald-400 tracking-wider">{profileData.title}</p>
              </div>
            </div>
          </div>

          {/* Main Content - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'user' ? <UserContent /> : 
             activeTab === 'resume' ? <ResumeContent /> : 
             <ProjectsContent />}
          </div>
        </div>

        {/* Mobile Navigation - Bottom Fixed */}
        <div className="h-14 md:hidden bg-gray-800 flex justify-center items-center relative">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-gray-800 via-emerald-400/30 to-gray-800" />
          <nav className="flex space-x-8">
            <button 
              className={`${activeTab === 'user' ? 'text-emerald-400' : 'text-gray-400'} hover:text-emerald-300 transition-colors duration-200 p-2`}
              onClick={() => setActiveTab('user')}
            >
              <User strokeWidth={2} />
            </button>
            <button 
              className={`${activeTab === 'resume' ? 'text-emerald-400' : 'text-gray-400'} hover:text-emerald-300 transition-colors duration-200 p-2`}
              onClick={() => setActiveTab('resume')}
            >
              <Briefcase strokeWidth={2} />
            </button>
            <button 
              className={`${activeTab === 'projects' ? 'text-emerald-400' : 'text-gray-400'} hover:text-emerald-300 transition-colors duration-200 p-2`}
              onClick={() => setActiveTab('projects')}
            >
              <Code strokeWidth={2} />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default App;