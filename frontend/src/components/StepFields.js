import React from 'react';
import HeroSection from './HeroSection';
import { Input } from './ui/input';

const StepFields = ({ stepNumber, data, onChange, user }) => {
  const handleFieldChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const renderStepFields = () => {
    switch (stepNumber) {
      case 1:
        return (
          <div className="text-center space-y-4 sm:space-y-6 flex flex-col items-center">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                It's your time!
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Let us know about yourself first.
              </p>
            </div>
            
            <div className="space-y-3 sm:space-y-4 max-w-md w-full mx-auto">
              <div>
                <Input
                  type="text"
                  className="w-full text-sm sm:text-base"
                  placeholder="Your Name"
                  value={data.yourName || ''}
                  onChange={(e) => handleFieldChange('yourName', e.target.value)}
                />
              </div>
              
              <div>
                <Input
                  type="text"
                  className="w-full"
                  placeholder="Your Username"
                  value={data.yourUsername || (user?.name || '')}
                  onChange={(e) => handleFieldChange('yourUsername', e.target.value)}
                />
              </div>
              
              <div>
                <select
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 appearance-none bg-white"
                  value={data.describesYou || ''}
                  onChange={(e) => handleFieldChange('describesYou', e.target.value)}
                >
                  <option value="">What best describes you?</option>
                  <option value="student">Student</option>
                  <option value="professional">Professional</option>
                  <option value="entrepreneur">Entrepreneur</option>
                  <option value="freelancer">Freelancer</option>
                </select>
              </div>
              
              <div>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 appearance-none bg-white"
                  value={data.location || ''}
                  onChange={(e) => handleFieldChange('location', e.target.value)}
                >
                  <option value="">Select your location</option>
                  <option value="india">India</option>
                  <option value="usa">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="canada">Canada</option>
                  <option value="australia">Australia</option>
                </select>
              </div>
              
              <div>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 appearance-none bg-white"
                  value={data.howDoYouKnowUs || ''}
                  onChange={(e) => handleFieldChange('howDoYouKnowUs', e.target.value)}
                >
                  <option value="">How do you know us?</option>
                  <option value="social-media">Social Media</option>
                  <option value="friend">Friend</option>
                  <option value="search">Search Engine</option>
                  <option value="advertisement">Advertisement</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4 sm:space-y-6 flex flex-col items-center">
            <div className="text-center px-2">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Hey {user?.name || data.yourName || 'there'} 👋
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                Let us know, how would you like to use Record for:
              </p>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                What's your main goal?
              </h2>
            </div>
            
            <div className="space-y-2 sm:space-y-3 max-w-md w-full mx-auto">
              {[
                'Build my Skill Repository',
                'Get a Good Job',
                'Upskill for Current Role',
                'Explore New Skills',
                'Make Learning a Habit!',
                'Others'
              ].map((goal) => (
                <label key={goal} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.mainGoal === goal}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleFieldChange('mainGoal', goal);
                      } else {
                        handleFieldChange('mainGoal', '');
                      }
                    }}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  />
                  <span className="ml-3 text-gray-700">{goal}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="w-full">
            <HeroSection isEmbedded={true} />
          </div>
        );

      case 4:
        return (
          <div className="space-y-4 sm:space-y-6 flex flex-col items-center">
            <div className="text-center w-full px-2">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                What's your Interest?
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Let us know what you are most curious about.
              </p>
              
              <div className="max-w-md w-full mx-auto">
                <Input
                  type="text"
                  className="w-full text-sm sm:text-base"
                  placeholder="Search Skills i.e figma, front end"
                  value={data.skillSearch || ''}
                  onChange={(e) => handleFieldChange('skillSearch', e.target.value)}
                />
                <p className="text-xs sm:text-sm text-gray-500 mt-2">
                  ({data.selectedSkills?.length || 0}/5 skills selected - you can edit later)
                </p>
              </div>
            </div>

            {/* Selected Skills */}
            {data.selectedSkills && data.selectedSkills.length > 0 && (
              <div className="w-full max-w-4xl mx-auto px-2">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Selected Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {data.selectedSkills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center bg-red-500 text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      <span>{skill}</span>
                      <button
                        onClick={() => {
                          const currentSkills = data.selectedSkills || [];
                          handleFieldChange('selectedSkills', currentSkills.filter(s => s !== skill));
                        }}
                        className="ml-2 text-white hover:text-white rounded-full border border-white/70 hover:border-white bg-transparent hover:bg-white/10 w-6 h-6 flex items-center justify-center"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Business Skills */}
            <div className="w-full max-w-4xl mx-auto px-2">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Business</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "DaVinci Resolve", "Microsoft SharePoint", "IIBA Entry Certificate in Business Analysis",
                  "Microsoft Project", "Operations Management", "Microsoft Access", "Management Skills",
                  "Lean", "Sony Vegas", "Quality Checking", "Business Model Canvas", "Technical Writing",
                  "HR Analytics", "Online Course Creation", "Microsoft PowerPoint"
                ].map((skill) => (
                  <button
                    key={skill}
                    onClick={() => {
                      const currentSkills = data.selectedSkills || [];
                      if (currentSkills.includes(skill)) {
                        handleFieldChange('selectedSkills', currentSkills.filter(s => s !== skill));
                      } else if (currentSkills.length < 5) {
                        handleFieldChange('selectedSkills', [...currentSkills, skill]);
                      }
                    }}
                    className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                      data.selectedSkills?.includes(skill)
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
                <button className="px-2 sm:px-3 py-1.5 sm:py-2 text-blue-600 text-xs sm:text-sm font-medium hover:underline">
                  See more
                </button>
              </div>
            </div>

            {/* Design Skills */}
            <div className="w-full max-w-4xl mx-auto px-2">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Design</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Cinematic Editing", "Wix", "Adobe Premiere Pro", "User Experience (UX) design",
                  "Fashion", "Game Design", "Canva", "Character Design", "Sewing",
                  "Building Information Modelling (BIM)", "Mobile App design", "Textiles",
                  "Illustration", "Virtual Reality", "UI/UX"
                ].map((skill) => (
                  <button
                    key={skill}
                    onClick={() => {
                      const currentSkills = data.selectedSkills || [];
                      if (currentSkills.includes(skill)) {
                        handleFieldChange('selectedSkills', currentSkills.filter(s => s !== skill));
                      } else if (currentSkills.length < 5) {
                        handleFieldChange('selectedSkills', [...currentSkills, skill]);
                      }
                    }}
                    className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                      data.selectedSkills?.includes(skill)
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
                <button className="px-2 sm:px-3 py-1.5 sm:py-2 text-blue-600 text-xs sm:text-sm font-medium hover:underline">
                  See more
                </button>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4 sm:space-y-6 flex flex-col items-center">
            <div className="text-center px-2">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Set your profile
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                This is important!
              </p>
            </div>

            <div className="max-w-md w-full mx-auto space-y-4 sm:space-y-6 px-2">
              {/* Profile Picture */}
              <div className="text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center overflow-hidden">
                  {data.profileImage ? (
                    <img 
                      src={data.profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">Your Profile Preview</p>
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      // Check file size (max 5MB)
                      if (file.size > 5 * 1024 * 1024) {
                        alert('Image size should be less than 5MB. Please choose a smaller image.');
                        return;
                      }
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        handleFieldChange('profileImage', event.target.result);
                      };
                      reader.onerror = () => {
                        alert('Error reading image file. Please try again.');
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden"
                />
                <label
                  htmlFor="profileImage"
                  className="flex items-center mx-auto px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer w-fit"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Upload Photo
                </label>
              </div>

              {/* Job Seeking Question */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                  Are you actively looking for a job?
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="jobSeeking"
                      value="yes"
                      checked={data.jobSeeking === 'yes'}
                      onChange={(e) => handleFieldChange('jobSeeking', e.target.value)}
                      className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                    />
                    <span className="ml-3 text-gray-700">Yes, actively seeking</span>
                  </label>
                  <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="jobSeeking"
                      value="no"
                      checked={data.jobSeeking === 'no'}
                      onChange={(e) => handleFieldChange('jobSeeking', e.target.value)}
                      className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                    />
                    <span className="ml-3 text-gray-700">No, I'm not looking</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Invalid step</div>;
    }
  };

  return (
    <div className="space-y-6">
      {renderStepFields()}
    </div>
  );
};

export default StepFields;
