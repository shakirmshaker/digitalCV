import React, { useState } from 'react';
import { User, Briefcase, Mail, Phone, MapPin, Linkedin, Github, Code } from 'lucide-react';
import profileImage from './shakirmshakerLinkedInBillede.jpeg';

// Logos
import reactLogo from './assets/react.svg';
import flaskLogo from './assets/flask.svg';
import fastApiLogo from './assets/fastapi.svg';
import tensorflowLogo from './assets/tensorflow.svg';
import powerbiLogo from './assets/powerbi.svg';
import tableauLogo from './assets/tableau.svg';
import postgresLogo from './assets/postgresql.svg';
import snowflakeLogo from './assets/snowflake.svg';
import azureLogo from './assets/azure.svg';
import openaiLogo from './assets/openai-2.svg';
import langchainLogo from './assets/langchain.svg';
import pandasLogo from './assets/pandas.svg';

// project images
import egAnbefalerImage from './projects/egAnbefaler.png';
import lexiImage from './projects/LexiImage.png';
import mortalityProject from './projects/mortalityProject.png';
import eddieImage from './projects/eddie.png';

const App = () => {
  const [activeTab, setActiveTab] = useState('user');
  
  const profileData = {
    name: "Shakir M. Shaker",
    title: "AI Engineer",
    location: "Copenhagen, Denmark",
    email: "shakir.m.shaker@gmail.com",
    phone: "+45 50 41 42 87",
    linkedin: "www.linkedin.com/in/shakir-m-shaker-3212a8168",
    bio: "Hi, I’m Shakir. I specialize in creating innovative solutions at the crossroads of AI, data science, and business strategy. With a passion for turning complex AI concepts into real-world impact, I thrive in dynamic environments, delivering cutting-edge, data-driven solutions that drive measurable business outcomes. I excel at collaborating with teams to push technological boundaries, leveraging emerging tools and methodologies to help organizations stay ahead in an AI-driven world."
  };

  const skills = [
    {
      name: "Flask",
      element: (
        <div className="w-24 h-24 bg-gray-700/50 flex items-center justify-center rounded p-4">
          <img src={flaskLogo} alt="Flask" className="w-full h-full object-contain invert brightness-0" />
        </div>
      )
    },
    {
      name: "FastAPI",
      element: (
        <div className="w-24 h-24 bg-gray-700/50 flex items-center justify-center rounded p-4">
          <img src={fastApiLogo} alt="FastAPI" className="w-full h-full object-contain" />
        </div>
      )
    },
    {
      name: "Power BI",
      element: (
        <div className="w-24 h-24 bg-gray-700/50 flex items-center justify-center rounded p-4">
          <img src={powerbiLogo} alt="Power BI" className="w-full h-full object-contain invert brightness-0" />
        </div>
      )
    },
    {
      name: "Postgres",
      element: (
        <div className="w-24 h-24 bg-gray-700/50 flex items-center justify-center rounded p-4">
          <img src={postgresLogo} alt="Postgres" className="w-full h-full object-contain" />
        </div>
      )
    },
    {
      name: "Tableau",
      element: (
        <div className="w-24 h-24 bg-gray-700/50 flex items-center justify-center rounded p-4">
          <img src={tableauLogo} alt="Tableau" className="w-full h-full object-contain" />
        </div>
      )
    },
    {
      name: "React",
      element: (
        <div className="w-24 h-24 bg-gray-700/50 flex items-center justify-center rounded p-4">
          <img src={reactLogo} alt="React" className="w-full h-full object-contain" />
        </div>
      )
    },
    {
      name: "Snowflake",
      element: (
        <div className="w-24 h-24 bg-gray-700/50 flex items-center justify-center rounded p-4">
          <img src={snowflakeLogo} alt="Snowflake" className="w-full h-full object-contain" />
        </div>
      )
    },
    {
      name: "TensorFlow",
      element: (
        <div className="w-24 h-24 bg-gray-700/50 flex items-center justify-center rounded p-4">
          <img src={tensorflowLogo} alt="TensorFlow" className="w-full h-full object-contain" />
        </div>
      )
    },
    {
      name: "Azure",
      element: (
        <div className="w-24 h-24 bg-gray-700/50 flex items-center justify-center rounded p-4">
          <img src={azureLogo} alt="Azure" className="w-full h-full object-contain" />
        </div>
      )
    },
    {
      name: "OpenAI",
      element: (
        <div className="w-24 h-24 bg-gray-700/50 flex items-center justify-center rounded p-4">
          <img src={openaiLogo} alt="OpemAI" className="w-full h-full object-contain invert brightness-0" />
        </div>
      )
    },
    {
      name: "LangChain",
      element: (
        <div className="w-24 h-24 bg-gray-700/50 flex items-center justify-center rounded p-4">
          <img src={langchainLogo} alt="LangChain" className="w-full h-full object-contain invert brightness-0" />
        </div>
      )
    },
    {
      name: "Pandas",
      element: (
        <div className="w-24 h-24 bg-gray-700/50 flex items-center justify-center rounded p-4">
          <img src={pandasLogo} alt="Pandas" className="w-full h-full object-contain" />
        </div>
      )
    },
  ];

  const technicalSkills = [
    {
      category: "AI & Machine Learning",
      skills: [
        "LLM Implementation",
        "RAG Systems Development",
        "Machine Learning Model Development",
      ]
    },
    {
      category: "Backend Development",
      skills: [
        "LLM Application Architecture",
        "API Development",
        "Web Application Backend",
      ]
    },
    {
      category: "Data Engineering & Analysis",
      skills: [
        "Postgres & Snowflake",
        "PowerBI & Tableau",
        "Pandas & Spark"
      ]
    }
  ];

  const experience = [
    {
      title: "AI Engineer",
      company: "Modstrøm",
      period: "Present",
      description: "As AI Lead, I drove enterprise-wide transformation through LLM integration and strategic C-suite collaboration. Led implementation of large language models across business units while aligning technical capabilities with organizational objectives, establishing data-driven and AI-augmented decision making throughout the company."
    },
    {
      title: "Founder",
      company: "Lexi",
      period: "Present",
      description: "Architected and developed an AI-powered email client that revolutionizes inbox management through deep LLM integration. Built and deployed sophisticated vector search capabilities and natural language processing systems that enable contextual email understanding and intelligent responses."
    },
    {
      title: "AI Engineer",
      company: "Medley VC",
      period: "2022 - 2023",
      description: "Engaged with teams to raise awareness of AI potential, ensuring users understood AI capabilities and limitations in their day-today operations. Identified and refined use cases for AI tools in business intelligence and energy recommendations, contributing to operational efficiency and improved decision-making."
    },
    {
      title: "Research Assistant",
      company: "Hvidovre Hospital",
      period: "2022",
      description: "Developed and implemented machine learning models to predict short and long-term mortality in acutely hospitalized patients. Led the technical development and data analysis that resulted in a published research paper. Applied sophisticated ML techniques to analyze patient data and create predictive models with direct clinical applications."
    },
    {
      title: "Associate",
      company: "KPMG",
      period: "2021 - 2022",
      description: "Advised top-tier clients on AI and data science strategies, focusing on improving quality processes and operational efficiency through automation and data-driven insights. Collaborated closely with clients to identify AI use cases and deploy tailored AI tools that addressed specific business challenges."
    }
  ];

  const education = [
    {
      degree: "Master of Engineering - Human-Centered Artificial Intelligence",
      school: "Technical University of Denmark",
      period: "2023 - 2025",
      description: "Focusing on the intersection of AI, human-interaction, and Large Language Models."
    },
    {
      degree: "Bachelor of Science - Data Science",
      school: "IT University of Copenhagen",
      period: "2020 - 2022",
      description: "Specialized in machine learning, data visualization, and data-driven decision-making."
    }
  ];

  const projects = [
    {
      title: "AI Energy Recommender",
      tech: "Flask, Pandas, Scikit-learn",
      description: "Developed a real-time energy recommendation system using machine learning to optimize energy consumption patterns. Developed a real-time energy recommendation system using machine learning to optimize energy consumption patterns.",
      link: "https://www.anbefaler.easygreen.dk/",
      image: egAnbefalerImage 
    },
    {
      title: "Estimating Mortality Risk Using ML",
      tech: "Python, TensorFlow",
      description: "This project involves creating and testing machine learning algorithms that predict the short-term and long-term survival chances of patients urgently admitted to hospitals, using data from their blood tests.",
      link: "https://www.nature.com/articles/s41598-024-56638-6",
      image: mortalityProject
    },
    {
      title: "Lexi",
      tech: "React, FastAPI, PostgreSQL, OpenAI",
      description: "Developed a tool that uses LLM to generate email responses based on the content of incoming emails. The system analyzes the email content, identifies the intent, and generates a suitable response, reducing the time spent on email management.",
      link: "https://lexi-iota.vercel.app/",
      image: lexiImage
    },
    {
      title: "Recommendation System for Restaurants",
      tech: "Python, TensorFlow, Pandas, Scikit-learn",
      description: "is project develops a personalized restaurant recommendation system by analyzing user preferences and dining history. Leveraging content-based filtering algorithms, it suggests restaurants that closely match the user's taste profile, enhancing the dining experience.",
      // link: "https://www.nature.com/articles/s41598-024-56638-6",
      image: eddieImage
    },
  ];

  const UserContent = () => (
    <div className="bg-gray-800 p-4 md:p-12">
      <div className="mb-8 md:mb-12 max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">About Me 👋🏽</h2>
        <p className="text-gray-300 leading-relaxed text-base md:text-lg">
          {profileData.bio}
        </p>
      </div>

      <div className="mb-8 md:mb-12 max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-white">Contact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <MapPin className="text-emerald-400" size={20} />
              <span className="text-gray-300">{profileData.location}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="text-emerald-400" size={20} />
              <a href={`mailto:${profileData.email}`} className="text-gray-300 hover:text-emerald-400 transition-colors">
                {profileData.email}
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Linkedin className="text-emerald-400" size={20} />
              <a href={`https://${profileData.linkedin}`} target="_blank" rel="noopener noreferrer" 
                className="text-gray-300 hover:text-emerald-400 transition-colors">
                LinkedIn Profile
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="text-emerald-400" size={20} />
              <span className="text-gray-300">{profileData.phone}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-white">Areas of Expertise</h2>
        <div className="space-y-4 md:space-y-6">
          {technicalSkills.map((category, index) => (
            <div key={index} className="bg-gray-700/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-emerald-400 mb-4">{category.category}</h3>
              <ul className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="text-gray-300">• {skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ResumeContent = () => (
    <div className="bg-gray-800 p-4 md:p-12">
      <div className="mb-12 max-w-3xl">
        <h2 className="text-3xl font-bold mb-6 text-white">Experience</h2>
        <div className="space-y-6">
          {experience.map((job, index) => (
            <div key={index} className="border-l-2 border-emerald-400 pl-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                  <p className="text-emerald-400">{job.company}</p>
                </div>
                <span className="text-gray-400">{job.period}</span>
              </div>
              <p className="text-gray-300 mt-2">{job.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12 max-w-3xl">
        <h2 className="text-3xl font-bold mb-6 text-white">Education</h2>
        <div className="space-y-6">
          {education.map((edu, index) => (
            <div key={index} className="border-l-2 border-emerald-400 pl-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-white">{edu.degree}</h3>
                  <p className="text-emerald-400">{edu.school}</p>
                </div>
                <span className="text-gray-400">{edu.period}</span>
              </div>
              <p className="text-gray-300 mt-2">{edu.description}</p>
            </div>
          ))}
        </div>
      </div>

      <SkillsSection />
    </div>
  );

  const SkillsSection = () => (
    <div className="max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-white">Technical Skills</h2>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12 p-2 justify-items-center">
        {skills.map((skill, index) => (
          <div key={index} className="text-center">
            <div className="w-24 h-24 md:w-24 md:h-24 bg-gray-700/50 flex items-center justify-center rounded p-4">
              <img src={skill.element.props.children.props.src} alt={skill.name} className="w-full h-full object-contain" />
            </div>
            <p className="mt-2 md:mt-4 text-gray-300 text-base md:text-lg">{skill.name}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const ProjectsContent = () => (
    <div className="bg-gray-800 p-4 md:p-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-white">Projects</h2>
      <div className="grid grid-cols-1 gap-4 md:gap-6 max-w-3xl">
        {projects.map((project, index) => (
          <div key={index} className="bg-gray-700/50 p-4 md:p-6 rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              <div className="w-full md:w-48 h-48 md:h-auto flex-shrink-0">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-emerald-400 mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{project.tech}</p>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 inline-flex items-center"
                >
                  <Github size={16} className="mr-2" />
                  View Project
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-screen bg-gray-900" style={{backgroundColor: '#111827'}}>
      {/* Main container with padding for desktop only */}
      <div className="h-full md:min-h-screen md:p-4 flex justify-center items-center">
        <div className="w-full h-full md:max-w-7xl md:h-[85vh] flex flex-col md:flex-row shadow-2xl rounded-lg overflow-hidden">
          {/* Desktop navigation */}
          <div className="hidden md:flex h-full w-14 bg-gray-800 flex-col justify-center items-center relative">
            <div className="absolute top-0 right-0 bottom-0 w-[1px] bg-gradient-to-b from-gray-800 via-emerald-400/30 to-gray-800" />
            <nav className="flex flex-col space-y-8">
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

          {/* Mobile layout container */}
          <div className="flex-1 flex flex-col md:flex-row h-screen md:h-auto">
            {/* Fixed header for mobile */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-48 bg-gray-900 z-10">
              <div className="absolute inset-0">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover object-top opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900"></div>
              </div>
              <div className="absolute bottom-4 left-0 right-0 px-4">
                <div className="flex justify-between">
                  <h1 className="text-2xl font-bold text-white tracking-wide">{profileData.name}</h1>
                  <p className="text-lg text-emerald-400 tracking-wider">{profileData.title}</p>
                </div>
              </div>
            </div>

            {/* Desktop sidebar with image */}
            <div className="hidden md:block shrink-0 h-auto w-[400px] bg-gray-900 relative">
              <div className="absolute inset-0">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover object-center opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900"></div>
              </div>
              <div className="absolute bottom-12 left-0 right-0 px-6">
                <div className="text-center">
                  <h1 className="text-4xl font-bold mb-4 text-white tracking-wide">{profileData.name}</h1>
                  <p className="text-xl text-emerald-400 tracking-wider">{profileData.title}</p>
                </div>
              </div>
            </div>

            {/* Scrollable content area with padding for fixed elements on mobile */}
            <div className="flex-1 overflow-y-auto md:overflow-y-auto">
              <div className="md:hidden h-48" aria-hidden="true"></div>
              {activeTab === 'user' ? <UserContent /> : 
               activeTab === 'resume' ? <ResumeContent /> : 
               <ProjectsContent />}
              <div className="md:hidden h-14" aria-hidden="true"></div>
            </div>
          </div>

          {/* Fixed bottom navigation for mobile */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-gray-800 flex justify-center items-center z-10">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-gray-800 via-emerald-400/30 to-gray-800" />
            <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-black/20" />
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
    </div>
  );
};

export default App;