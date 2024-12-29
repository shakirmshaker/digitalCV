import React, { useState } from 'react';
import { User, Briefcase, Mail, Phone, MapPin, Linkedin, Github, Code } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('user');
  
  // ... keep all your existing data constants ...

  return (
    // Remove padding from the outer container to use full viewport
    <div className="h-screen w-screen bg-gray-900 flex justify-center items-center" style={{backgroundColor: '#111827'}}>
      {/* Set exact viewport height and handle overflow */}
      <div className="w-full h-full md:max-w-7xl md:h-[85vh] flex flex-col md:flex-row shadow-2xl rounded-lg overflow-hidden">
        {/* Navigation for desktop - left side */}
        <div className="hidden md:flex h-full w-14 bg-gray-800 flex-col justify-center items-center relative">
          {/* ... desktop navigation content remains the same ... */}
        </div>

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Make image container fixed height on mobile */}
          <div className="shrink-0 h-[200px] md:h-auto md:w-[400px] bg-gray-900 relative">
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover object-top md:object-center"
            />
            <div className="absolute bottom-4 md:bottom-12 left-0 right-0 px-4 md:px-6">
              {/* ... profile content remains the same ... */}
            </div>
          </div>

          {/* Make content area scrollable */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'user' ? <UserContent /> : 
             activeTab === 'resume' ? <ResumeContent /> : 
             <ProjectsContent />}
          </div>
        </div>

        {/* Fixed bottom navigation for mobile */}
        <div className="h-14 md:hidden bg-gray-800 flex justify-center items-center relative">
          <nav className="flex space-x-8">
            <button 
              className={`${activeTab === 'user' ? 'text-emerald-400' : 'text-gray-400'} hover:text-emerald-300 block transition-colors duration-200 p-2`}
              onClick={() => setActiveTab('user')}
            >
              <User strokeWidth={2} />
            </button>
            <button 
              className={`${activeTab === 'resume' ? 'text-emerald-400' : 'text-gray-400'} hover:text-emerald-300 block transition-colors duration-200 p-2`}
              onClick={() => setActiveTab('resume')}
            >
              <Briefcase strokeWidth={2} />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default App;