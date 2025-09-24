import React, { useState, useEffect, useRef, useCallback } from 'react';
import { User, Briefcase, Mail, Phone, MapPin, Linkedin, Github, Edit, Save, X, Plus, Trash2, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import profileImage from './shakirmshakerLinkedInBillede.jpeg';
// Dynamic import - removed static import to prevent caching

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

const CVApp = ({ isAuthenticated }) => {
  const [activeTab, setActiveTab] = useState('user');
  const [isEditMode, setIsEditMode] = useState(false);
  const [cvData, setCvData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
      image: eddieImage
    },
  ];

  // Function to refresh data from JSON file
  const refreshData = async () => {
    setIsLoading(true);
    await fetchCvData();
  };

  // Expose refresh function to window for debugging
  useEffect(() => {
    window.refreshCvData = refreshData;

    // Test server connection on localhost
    if (window.location.hostname === 'localhost') {
      window.testServerConnection = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/health');
          const result = await response.json();
          console.log('Server connection test:', result);
          return result;
        } catch (error) {
          console.log('Server connection failed:', error);
          return { error: error.message };
        }
      };

      // Debug function to check current data state
      window.debugCvData = () => {
        console.log('Current cvData state:', cvData);
        console.log('Last saved timestamp:', cvData?.lastSaved);
        console.log('Profile name:', cvData?.profileData?.name);
      };

      // Function to manually fetch and compare
      window.testFetch = async () => {
        console.log('=== Manual fetch test ===');
        try {
          const response = await fetch('http://localhost:3001/api/cv-data');
          const serverData = await response.json();
          console.log('Server data timestamp:', serverData.lastSaved);
          console.log('Server data name:', serverData.profileData?.name);
          console.log('Current state timestamp:', cvData?.lastSaved);
          console.log('Current state name:', cvData?.profileData?.name);
          console.log('Data is in sync:', serverData.lastSaved === cvData?.lastSaved);
          return serverData;
        } catch (error) {
          console.error('Fetch test failed:', error);
        }
      };

      // Force refresh all EditableText components
      window.forceRefreshUI = () => {
        console.log('=== Forcing UI refresh ===');
        setIsEditMode(false);
        setTimeout(() => {
          console.log('UI refresh complete');
        }, 100);
      };
    }
  }, [cvData]);

  const saveData = async () => {
    // Initialize sync functions registry if it doesn't exist
    if (!window.editableSyncFunctions) {
      window.editableSyncFunctions = {};
    }

    console.log('=== SAVE DEBUG START ===');
    console.log('Current cvData before sync:', cvData.profileData?.bio?.substring(0, 50) + '...');
    console.log('Number of sync functions:', Object.keys(window.editableSyncFunctions).length);

    // Build the updated data object directly by collecting changes
    let updatedData = { ...cvData };

    // Create a function to update our local copy
    const directUpdateFunctions = {};

    // Replace the sync functions temporarily to capture the changes directly
    Object.keys(window.editableSyncFunctions).forEach(id => {
      const originalSyncFn = window.editableSyncFunctions[id];

      // Create a wrapper that captures the data directly
      directUpdateFunctions[id] = () => {
        console.log(`Processing ${id}...`);
        // Call the original sync function to trigger state changes
        originalSyncFn();

        // Also manually get the current value from the input
        const element = document.getElementById(id);
        if (element && element.value !== undefined) {
          const currentValue = element.value;
          console.log(`${id} current value:`, currentValue.substring(0, 50) + '...');

          // Update our data directly based on the field ID
          if (id === 'profile-bio') {
            updatedData.profileData.bio = currentValue;
          } else if (id === 'profile-name-desktop') {
            updatedData.profileData.name = currentValue;
          } else if (id === 'profile-title-desktop') {
            updatedData.profileData.title = currentValue;
          } else if (id === 'profile-location') {
            updatedData.profileData.location = currentValue;
          } else if (id === 'profile-email') {
            updatedData.profileData.email = currentValue;
          } else if (id === 'profile-linkedin') {
            updatedData.profileData.linkedin = currentValue;
          } else if (id === 'profile-phone') {
            updatedData.profileData.phone = currentValue;
          }
        }
      };
    });

    // Call our direct update functions
    Object.values(directUpdateFunctions).forEach(updateFn => {
      updateFn();
    });

    console.log('Updated data bio:', updatedData.profileData?.bio?.substring(0, 50) + '...');
    console.log('=== SAVE DEBUG END ===');

    // Check if we're on Vercel or localhost
    const isVercel = window.location.hostname.includes('vercel.app') ||
                     window.location.hostname === process.env.REACT_APP_VERCEL_URL;
    const isLocalhost = window.location.hostname === 'localhost' ||
                       window.location.hostname === '127.0.0.1';

    // Add timestamp to track saves
    const dataToSave = {
      ...updatedData,
      lastSaved: new Date().toISOString()
    };

    try {
      // Use full URL for localhost to avoid proxy issues
      const apiUrl = isLocalhost ? 'http://localhost:3001/api/save-cv-data' : '/api/save-cv-data';
      console.log('Attempting to save data to:', apiUrl);
      console.log('Request payload size:', JSON.stringify(dataToSave).length, 'characters');
      console.log('Saving with timestamp:', dataToSave.lastSaved);
      console.log('Bio being saved:', dataToSave.profileData?.bio?.substring(0, 50) + '...');

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSave),
      });

      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Response data:', result);

      if (!response.ok) {
        if (response.status === 500 && result.error === 'GitHub token not configured') {
          alert('GitHub token not configured in Vercel. Please set up GITHUB_TOKEN in Vercel environment variables.');
        } else {
          alert(`Error saving: ${result.message || 'Unknown error'}`);
        }
      } else {
        console.log('Data saved successfully:', result);
        if (isVercel) {
          alert('Changes saved successfully to GitHub repository! The changes will be reflected after the next deployment.');
        } else {
          alert('Changes saved successfully to the JSON file!');
          // Try to refresh data after saving, but don't fail if it doesn't work
          try {
            await refreshData();
            console.log('Data refreshed successfully after save');
          } catch (refreshError) {
            console.warn('Failed to refresh data after save (this is usually not a problem):', refreshError);
            // Don't show an error to the user since the save was successful
          }
        }
      }
    } catch (error) {
      console.log('Error saving to server:', error);
      if (isVercel) {
        alert('Error connecting to Vercel API. Check your Vercel deployment and GitHub token configuration.');
      } else if (isLocalhost) {
        alert('Cannot connect to local server. Please make sure the server is running:\n\n1. Open a terminal\n2. Run: node server.js\n3. Server should start on port 3001');
      } else {
        alert('Server connection failed. Please check your server configuration.');
      }
    }

    setIsEditMode(false);
  };


  const exportToPDF = useCallback(async () => {
    // Sync all local changes before export
    if (window.editableSyncFunctions) {
      Object.values(window.editableSyncFunctions).forEach(syncFn => {
        if (typeof syncFn === 'function') {
          syncFn();
        }
      });
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Modern color palette
    const colors = {
      primary: [16, 22, 26],        // Dark navy
      accent: [59, 130, 246],       // Blue (more visible than emerald)
      text: [55, 65, 81],           // Dark gray
      textLight: [107, 114, 128],   // Medium gray
      background: [249, 250, 251],  // Light gray
      white: [255, 255, 255]
    };

    let currentY = 0;

    // Helper function to add section with elegant styling
    const addSection = async (title, content, isFirstSection = false) => {
      // Avoid page breaks - only add new page if absolutely necessary
      if (!isFirstSection && currentY > pageHeight - 30) {
        pdf.addPage();
        await addSideBar();
        currentY = 25;
      }

      // Section title with underline - compact
      pdf.setTextColor(...colors.primary);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text(title, 75, currentY);

      // Elegant underline
      pdf.setDrawColor(...colors.accent);
      pdf.setLineWidth(0.6);
      pdf.line(75, currentY + 1, 75 + pdf.getTextWidth(title), currentY + 1);

      currentY += 8;
      await content();
      currentY += 4;
    };

    // Sidebar function
    const addSideBar = async () => {
      // Sidebar background
      pdf.setFillColor(...colors.primary);
      pdf.rect(0, 0, 65, pageHeight, 'F');

      // Add profile image
      try {
        // Create a high-resolution canvas to process the image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        await new Promise((resolve, reject) => {
          img.onload = () => {
            // Use high resolution for crisp image (3x the display size)
            const displaySize = 45; // mm in PDF
            const pixelRatio = 3; // High DPI multiplier
            const size = displaySize * pixelRatio * 2.83; // Convert mm to pixels at 72 DPI * pixelRatio

            canvas.width = size;
            canvas.height = size;

            // Enable image smoothing for better quality
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            // Clear canvas and create circular clipping path
            ctx.clearRect(0, 0, size, size);
            ctx.beginPath();
            ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
            ctx.clip();

            // Calculate crop dimensions to center the image with proper scaling
            const imgAspect = img.width / img.height;
            let drawWidth, drawHeight, drawX, drawY;

            if (imgAspect > 1) {
              // Image is wider than tall
              drawHeight = size;
              drawWidth = size * imgAspect;
              drawX = (size - drawWidth) / 2;
              drawY = 0;
            } else {
              // Image is taller than wide or square
              drawWidth = size;
              drawHeight = size / imgAspect;
              drawX = 0;
              drawY = (size - drawHeight) / 2;
            }

            // Draw the image with high quality
            ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
            resolve();
          };
          img.onerror = reject;
          img.crossOrigin = 'anonymous';
          img.src = profileImage;
        });

        // Convert canvas to base64 with maximum quality
        const imageData = canvas.toDataURL('image/jpeg', 0.95);
        pdf.addImage(imageData, 'JPEG', 10, 10, 45, 45); // Moved up from y=15 to y=10

        // Add subtle border around image
        pdf.setDrawColor(255, 255, 255);
        pdf.setLineWidth(0.5);
        pdf.circle(32.5, 32.5, 22.5, 'S'); // Adjusted center to match new position

      } catch (error) {
        console.log('Could not load profile image for PDF');
      }

      // Name and title (moved down to accommodate image)
      pdf.setTextColor(...colors.white);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');

      const nameLines = pdf.splitTextToSize(cvData.profileData.name, 58);
      let nameY = 70; // Moved up from 75 to 70
      nameLines.forEach(line => {
        pdf.text(line, 5, nameY);
        nameY += 7;
      });

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(200, 200, 200);

      const titleLines = pdf.splitTextToSize(cvData.profileData.title, 58);
      titleLines.forEach(line => {
        pdf.text(line, 5, nameY);
        nameY += 5;
      });

      // About section in sidebar
      let sideY = nameY + 5; // Reduced from 20 to 10 to move sections up

      pdf.setFontSize(13);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(...colors.white);
      // pdf.text('ABOUT', 5, sideY);
      // sideY += 5;

      // About content
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(220, 220, 220);
      const aboutLines = pdf.splitTextToSize(cvData.profileData.bio, 50);
      aboutLines.forEach(line => {
        if (sideY > pageHeight - 20) return;
        pdf.text(line, 5, sideY);
        sideY += 4;
      });
      sideY += 8;

      // Contact section in sidebar
      pdf.setFontSize(13);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(...colors.white);
      pdf.text('CONTACT', 5, sideY);
      sideY += 10;

      // Contact items with better styling
      const contactItems = [
        { label: 'Email', value: cvData.profileData.email },
        { label: 'Phone', value: cvData.profileData.phone },
        { label: 'Location', value: cvData.profileData.location }
      ];

      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');

      contactItems.forEach(item => {
        pdf.setTextColor(...colors.accent);
        pdf.text(item.label.toUpperCase(), 5, sideY);
        sideY += 3.5;

        pdf.setTextColor(220, 220, 220);
        const valueLines = pdf.splitTextToSize(item.value, 50); // Reduced width to maintain right margin
        valueLines.forEach(line => {
          pdf.text(line, 5, sideY);
          sideY += 4;
        });
        sideY += 2;
      });

      // LinkedIn in sidebar with clickable link
      if (cvData.profileData.linkedin) {
        sideY += 3;
        pdf.setTextColor(...colors.accent);
        pdf.setFontSize(9);
        pdf.text('LINKEDIN', 5, sideY);
        sideY += 3.5;

        // Create clickable LinkedIn text
        pdf.setTextColor(220, 220, 220);
        const linkedInText = 'LinkedIn Profile';
        const linkedInUrl = cvData.profileData.linkedin.startsWith('http')
          ? cvData.profileData.linkedin
          : `https://${cvData.profileData.linkedin}`;

        // Add the text
        pdf.text(linkedInText, 5, sideY);

        // Add underline
        const textWidth = pdf.getTextWidth(linkedInText);
        pdf.setDrawColor(220, 220, 220);
        pdf.setLineWidth(0.2);
        pdf.line(5, sideY + 0.5, 5 + textWidth, sideY + 0.5);

        // Make it clickable
        pdf.link(5, sideY - 3, textWidth, 4, { url: linkedInUrl });

        sideY += 4;
      }

      // Skills in sidebar
      sideY += 10;
      if (sideY < pageHeight - 30) { // Adjusted threshold to show expertise section
        pdf.setFontSize(13);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(...colors.white);
        pdf.text('EXPERTISE', 5, sideY);
        sideY += 10;

        pdf.setFontSize(9);
        cvData.technicalSkills.forEach(category => {
          if (sideY > pageHeight - 15) return; // Adjusted to allow more content

          pdf.setTextColor(...colors.accent);
          pdf.setFont('helvetica', 'bold');
          const categoryLines = pdf.splitTextToSize(category.category.toUpperCase(), 50); // Wrap category names if needed
          categoryLines.forEach(line => {
            pdf.text(line, 5, sideY);
            sideY += 4;
          });

          pdf.setFont('helvetica', 'normal');
          pdf.setTextColor(200, 200, 200);
          category.skills.forEach(skill => {
            if (sideY > pageHeight - 10) return; // Adjusted to allow more content
            const skillLines = pdf.splitTextToSize(`• ${skill}`, 48); // Wrap skill text if needed
            skillLines.forEach(line => {
              pdf.text(line, 7, sideY);
              sideY += 4;
            });
          });
          sideY += 3;
        });
      }
    };

    // Add first page sidebar
    await addSideBar();
    currentY = 15;

    // Experience section (moved up since About is now in sidebar)
    await addSection('Professional experience', async () => {
      for (let index = 0; index < cvData.experience.length; index++) {
        const job = cvData.experience[index];

        if (currentY > pageHeight - 20) {
          pdf.addPage();
          await addSideBar();
          currentY = 25;
        }

        // Job header with compact styling and new color
        pdf.setFillColor(238, 242, 255); // Light blue background
        pdf.rect(75, currentY - 1, 115, 7, 'F');

        // Job title and company in single text with different colors
        const jobText = `${job.title} • ${job.company}`;

        // Job title part (bold, primary color)
        pdf.setTextColor(...colors.primary);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.text(job.title, 78, currentY + 3);

        // Get width of title to position company part
        const titleWidth = pdf.getTextWidth(job.title);

        // Company part (normal, accent color)
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(...colors.accent);
        pdf.text(` • ${job.company}`, 78 + titleWidth, currentY + 3);

        // Period on the right
        pdf.setTextColor(...colors.textLight);
        pdf.setFontSize(8);
        const periodWidth = pdf.getTextWidth(job.period);
        pdf.text(job.period, 185 - periodWidth, currentY + 3);

        currentY += 10;

        // Description with larger font
        pdf.setTextColor(...colors.text);
        pdf.setFontSize(9); // Increased from 8 to 9
        pdf.setFont('helvetica', 'normal');
        const descLines = pdf.splitTextToSize(job.description, 110);

        for (const line of descLines) {
          if (currentY > pageHeight - 15) {
            pdf.addPage();
            await addSideBar();
            currentY = 25;
          }
          pdf.text(line, 78, currentY);
          currentY += 4; // Increased spacing to match larger font
        }

        currentY += 5;

        // Separator line
        if (index < cvData.experience.length - 1) {
          pdf.setDrawColor(...colors.background);
          pdf.setLineWidth(0.3);
          pdf.line(75, currentY, 190, currentY);
          currentY += 3;
        }
      }
    });

    // Education section
    await addSection('Education', async () => {
      for (let index = 0; index < cvData.education.length; index++) {
        const edu = cvData.education[index];

        if (currentY > pageHeight - 15) {
          pdf.addPage();
          await addSideBar();
          currentY = 25;
        }

        // Education header - compact
        pdf.setFillColor(238, 242, 255); // Light blue background - same as job headers
        pdf.rect(75, currentY - 2, 115, 10, 'F');

        pdf.setTextColor(...colors.primary);
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'bold');
        pdf.text(edu.degree, 78, currentY + 2);

        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(...colors.accent);
        pdf.text(edu.school, 78, currentY + 6);

        if (edu.period) {
          pdf.setTextColor(...colors.textLight);
          const eduPeriodWidth = pdf.getTextWidth(edu.period);
          pdf.text(edu.period, 185 - eduPeriodWidth, currentY + 6);
        }

        currentY += 12;

        if (edu.description) {
          pdf.setTextColor(...colors.text);
          pdf.setFontSize(9); // Increased from 8 to 9
          const eduDescLines = pdf.splitTextToSize(edu.description, 110);
          eduDescLines.forEach(line => {
            pdf.text(line, 78, currentY);
            currentY += 4; // Increased spacing to match larger font
          });
          currentY += 3;
        }

        if (index < cvData.education.length - 1) {
          pdf.setDrawColor(...colors.background);
          pdf.setLineWidth(0.3);
          pdf.line(75, currentY, 190, currentY);
          currentY += 2;
        }
      }
    });

    // Check if we have any empty pages and remove them
    const totalPages = pdf.internal.getNumberOfPages();

    // If the last page was created but has no content (currentY is very low), remove it
    if (totalPages > 1 && currentY < 50) {
      pdf.deletePage(totalPages);
    }

    // No footer - clean professional look

    // Save the PDF
    pdf.save(`${cvData.profileData.name.replace(/\s+/g, '_')}_CV.pdf`);
  }, [cvData]);

  // Function to fetch fresh JSON data
  const fetchCvData = async () => {
    console.log('Starting to fetch CV data...');
    try {
      // Check if we're on localhost or Vercel
      const isLocalhost = window.location.hostname === 'localhost' ||
                         window.location.hostname === '127.0.0.1';

      // Use API endpoint on localhost to get fresh data from server
      const fetchUrl = isLocalhost
        ? `http://localhost:3001/api/cv-data?t=${Date.now()}`
        : `/data/cvData.json?t=${Date.now()}`;

      console.log('Fetching from:', fetchUrl);

      const response = await fetch(fetchUrl, {
        cache: 'no-cache',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });

      console.log('Fetch response status:', response.status);
      console.log('Fetch response ok:', response.ok);

      if (!response.ok) {
        throw new Error(`Failed to fetch CV data: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Successfully fetched CV data with timestamp:', data.lastSaved);
      console.log('Profile name in fetched data:', data.profileData?.name);
      setCvData(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching CV data:', error);
      console.log('Using fallback data structure...');
      // Use default structure if fetch fails
      setCvData({
        profileData: {
          name: 'Name not loaded',
          title: 'Title not loaded',
          bio: 'Bio not loaded',
          email: 'email@example.com',
          phone: '+1234567890',
          location: 'Location not loaded',
          linkedin: 'linkedin.com/in/profile'
        },
        experience: [
          {
            title: 'Position Title',
            company: 'Company Name',
            period: 'Year - Year',
            description: 'Job description...'
          }
        ],
        education: [
          {
            degree: 'Degree Name',
            school: 'School Name',
            period: 'Year - Year',
            description: 'Education description...'
          }
        ],
        technicalSkills: [
          {
            category: 'Skills Category',
            skills: ['Skill 1', 'Skill 2']
          }
        ]
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initialize sync functions registry
    if (!window.editableSyncFunctions) {
      window.editableSyncFunctions = {};
    }

    // Fetch fresh data on mount
    fetchCvData();

    // Refresh data when window gains focus (optional - uncomment if needed)
    // const handleFocus = () => {
    //   fetchCvData();
    // };
    // window.addEventListener('focus', handleFocus);
    // return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const updateProfileData = useCallback((field, value) => {
    setCvData(prev => ({
      ...prev,
      profileData: {
        ...prev.profileData,
        [field]: value
      }
    }));
  }, []);

  const updateExperience = useCallback((index, field, value) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  }, []);

  const addExperience = useCallback(() => {
    const newExperience = {
      title: "New Position",
      company: "Company Name",
      period: "Year - Year",
      description: "Job description here..."
    };
    setCvData(prev => ({
      ...prev,
      experience: [newExperience, ...prev.experience]
    }));
  }, []);

  const deleteExperience = useCallback((index) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  }, []);

  const updateEducation = useCallback((index, field, value) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  }, []);

  const EditableText = React.memo(({ value, onChange, multiline = false, className = "", id }) => {
    const [localValue, setLocalValue] = useState(value);
    const hasChanges = useRef(false);
    const textareaRef = useRef(null);

    // Always update local value when prop value changes, unless we have unsaved local changes
    useEffect(() => {
      if (!hasChanges.current || !isEditMode) {
        setLocalValue(value);
      }
    }, [value, isEditMode]);

    // Reset hasChanges when exiting edit mode
    useEffect(() => {
      if (!isEditMode && hasChanges.current) {
        hasChanges.current = false;
      }
    }, [isEditMode]);

    // Auto-resize textarea
    const autoResize = useCallback(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
      }
    }, []);

    // Auto-resize on value change
    useEffect(() => {
      if (multiline && isEditMode) {
        autoResize();
      }
    }, [localValue, multiline, isEditMode, autoResize]);

    const handleChange = useCallback((e) => {
      const newValue = e.target.value;
      setLocalValue(newValue);
      hasChanges.current = true;
      if (multiline) {
        autoResize();
      }
    }, [multiline, autoResize]);

    // Sync changes to parent only when explicitly saving
    const syncToParent = useCallback(() => {
      if (hasChanges.current) {
        console.log(`Syncing ${id}: "${value}" -> "${localValue}"`);
        onChange(localValue);
        hasChanges.current = false;
      } else {
        console.log(`No changes to sync for ${id}`);
      }
    }, [onChange, localValue, value, id]);

    // Expose sync function to parent component
    useEffect(() => {
      if (id && window.editableSyncFunctions) {
        window.editableSyncFunctions[id] = syncToParent;
      }
      return () => {
        if (id && window.editableSyncFunctions) {
          delete window.editableSyncFunctions[id];
        }
      };
    }, [id, syncToParent]);

    if (!isEditMode) {
      return multiline ? (
        <p className={className}>{value}</p>
      ) : (
        <span className={className}>{value}</span>
      );
    }

    return multiline ? (
      <textarea
        ref={textareaRef}
        value={localValue}
        onChange={handleChange}
        className={`${className} bg-gray-700 border border-gray-600 rounded p-2 text-white resize-none overflow-hidden`}
        style={{ minHeight: '100px' }}
        id={id}
      />
    ) : (
      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        className={`${className} bg-gray-700 border border-gray-600 rounded p-1 text-white`}
        id={id}
      />
    );
  });

  const UserContent = React.memo(() => (
    <div className="bg-gray-800 p-4 md:p-12">
      <div className="mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">About</h2>
        <EditableText
          value={cvData.profileData.bio}
          onChange={(value) => updateProfileData('bio', value)}
          multiline
          className="text-gray-300 leading-relaxed text-base md:text-lg w-full"
          id="profile-bio"
        />
      </div>

      <div className="mb-8 md:mb-12 max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-white">Contact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <MapPin className="text-emerald-400" size={20} />
              <EditableText
                value={cvData.profileData.location}
                onChange={(value) => updateProfileData('location', value)}
                className="text-gray-300"
                id="profile-location"
              />
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="text-emerald-400" size={20} />
              <EditableText
                value={cvData.profileData.email}
                onChange={(value) => updateProfileData('email', value)}
                className="text-gray-300"
                id="profile-email"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Linkedin className="text-emerald-400" size={20} />
              {isEditMode ? (
                <EditableText
                  value={cvData.profileData.linkedin}
                  onChange={(value) => updateProfileData('linkedin', value)}
                  className="text-gray-300"
                  id="profile-linkedin"
                />
              ) : (
                <a
                  href={cvData.profileData.linkedin.startsWith('http')
                    ? cvData.profileData.linkedin
                    : `https://${cvData.profileData.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-emerald-400 underline transition-colors duration-200"
                >
                  LinkedIn Profile
                </a>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="text-emerald-400" size={20} />
              <EditableText
                value={cvData.profileData.phone}
                onChange={(value) => updateProfileData('phone', value)}
                className="text-gray-300"
                id="profile-phone"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-white">Areas of Expertise</h2>
        <div className="space-y-4 md:space-y-6">
          {cvData.technicalSkills.map((category, index) => (
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
  ));

  const ResumeContent = React.memo(() => (
    <div className="bg-gray-800 p-4 md:p-12">
      <div className="mb-12 max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">Experience</h2>
          {isEditMode && (
            <button
              onClick={addExperience}
              className="bg-emerald-400 text-gray-900 px-3 py-2 rounded-lg hover:bg-emerald-300 transition-colors flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Add Experience</span>
            </button>
          )}
        </div>
        <div className="space-y-6">
          {cvData.experience.map((job, index) => (
            <div key={index} className="border-l-2 border-emerald-400 pl-4 relative">
              {isEditMode && (
                <button
                  onClick={() => deleteExperience(index)}
                  className="absolute -right-2 top-0 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full transition-colors"
                  title="Delete experience"
                >
                  <Trash2 size={14} />
                </button>
              )}
              <div className="flex justify-between items-start">
                <div className="flex-1 mr-4">
                  <EditableText
                    value={job.title}
                    onChange={(value) => updateExperience(index, 'title', value)}
                    className="text-xl font-semibold text-white block w-full"
                    id={`experience-title-${index}`}
                  />
                  <EditableText
                    value={job.company}
                    onChange={(value) => updateExperience(index, 'company', value)}
                    className="text-emerald-400 block w-full"
                    id={`experience-company-${index}`}
                  />
                </div>
                <EditableText
                  value={job.period}
                  onChange={(value) => updateExperience(index, 'period', value)}
                  className="text-gray-400"
                  id={`experience-period-${index}`}
                />
              </div>
              <EditableText
                value={job.description}
                onChange={(value) => updateExperience(index, 'description', value)}
                multiline
                className="text-gray-300 mt-2 w-full"
                id={`experience-description-${index}`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12 max-w-3xl">
        <h2 className="text-3xl font-bold mb-6 text-white">Education</h2>
        <div className="space-y-6">
          {cvData.education.map((edu, index) => (
            <div key={index} className="border-l-2 border-emerald-400 pl-4">
              <div className="flex justify-between items-start">
                <div className="flex-1 mr-4">
                  <EditableText
                    value={edu.degree}
                    onChange={(value) => updateEducation(index, 'degree', value)}
                    className="text-xl font-semibold text-white block w-full"
                  />
                  <EditableText
                    value={edu.school}
                    onChange={(value) => updateEducation(index, 'school', value)}
                    className="text-emerald-400 block w-full"
                  />
                </div>
                <EditableText
                  value={edu.period}
                  onChange={(value) => updateEducation(index, 'period', value)}
                  className="text-gray-400"
                />
              </div>
              <EditableText
                value={edu.description}
                onChange={(value) => updateEducation(index, 'description', value)}
                multiline
                className="text-gray-300 mt-2 w-full"
              />
            </div>
          ))}
        </div>
      </div>

      <SkillsSection />
    </div>
  ));

  const SkillsSection = React.memo(() => (
    <div className="max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-white">Tech Stack</h2>
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
  ));

  const ProjectsContent = React.memo(() => (
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
  ));

  if (isLoading || !cvData || !cvData.profileData) {
    return (
      <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center">
      <div className="pb-14 md:pb-0 md:p-6 min-h-screen md:min-h-0 md:h-[85vh] w-full flex justify-center">
        <div className="w-full md:max-w-7xl flex flex-col md:flex-row shadow-2xl rounded-lg overflow-hidden">
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
              <button
                onClick={exportToPDF}
                className="text-gray-400 hover:text-emerald-300 transition-colors duration-200 p-2"
                title="Export to PDF"
              >
                <Download strokeWidth={2} />
              </button>
              {isAuthenticated && (
                <div className="flex flex-col space-y-4">
                  <button
                    onClick={() => setIsEditMode(!isEditMode)}
                    className="text-gray-400 hover:text-emerald-300 transition-colors duration-200 p-2"
                  >
                    {isEditMode ? <X strokeWidth={2} /> : <Edit strokeWidth={2} />}
                  </button>
                  {isEditMode && (
                    <button
                      onClick={saveData}
                      className="text-gray-400 hover:text-emerald-300 transition-colors duration-200 p-2"
                      title="Save Changes"
                    >
                      <Save strokeWidth={2} />
                    </button>
                  )}
                </div>
              )}
            </nav>
          </div>

          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            <div className="shrink-0 h-[200px] md:h-auto md:w-[400px] bg-gray-900 relative">
              <div className="absolute inset-0">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover object-top md:object-center opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900"></div>
              </div>
              <div className="absolute bottom-4 md:bottom-12 left-0 right-0 px-4 md:px-6">
                <div className="hidden md:block text-center">
                  <EditableText
                    value={cvData.profileData.name}
                    onChange={(value) => updateProfileData('name', value)}
                    className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-white tracking-wide block w-full text-center"
                    id="profile-name-desktop"
                  />
                  <EditableText
                    value={cvData.profileData.title}
                    onChange={(value) => updateProfileData('title', value)}
                    className="text-lg md:text-xl text-emerald-400 tracking-wider block w-full text-center"
                    id="profile-title-desktop"
                  />
                </div>
                <div className="flex justify-end md:hidden">
                  <div className="text-right">
                    <EditableText
                      value={cvData.profileData.name}
                      onChange={(value) => updateProfileData('name', value)}
                      className="text-lg font-bold text-white tracking-wide"
                    />
                    <EditableText
                      value={cvData.profileData.title}
                      onChange={(value) => updateProfileData('title', value)}
                      className="text-sm text-emerald-400 tracking-wider"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {activeTab === 'user' ? <UserContent /> :
               activeTab === 'resume' ? <ResumeContent /> :
               <ProjectsContent />}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 h-14 md:hidden bg-gray-800 flex justify-center items-center">
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
          <button
            onClick={exportToPDF}
            className="text-gray-400 hover:text-emerald-300 transition-colors duration-200 p-2"
            title="Export to PDF"
          >
            <Download strokeWidth={2} />
          </button>
          {isAuthenticated && (
            <>
              <button
                onClick={() => setIsEditMode(!isEditMode)}
                className="text-gray-400 hover:text-emerald-300 transition-colors duration-200 p-2"
              >
                {isEditMode ? <X strokeWidth={2} /> : <Edit strokeWidth={2} />}
              </button>
              {isEditMode && (
                <button
                  onClick={saveData}
                  className="text-gray-400 hover:text-emerald-300 transition-colors duration-200 p-2"
                  title="Save Changes"
                >
                  <Save strokeWidth={2} />
                </button>
              )}
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

export default CVApp;