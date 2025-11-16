import React from 'react';

const HeroSection = ({ isEmbedded = false }) => {
  const renderContent = () => (
    <>
      {/* Two-Column Section */}
      <div className="flex flex-col lg:flex-row">
        
        {/* Left Column - Light Gray Background (wider on desktop) */}
        <div className="flex-[1.5] bg-gray-50 p-8 sm:p-10 lg:p-14 xl:p-16">
          {/* Heading Section */}
          <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            You bring the curiosity.
            <br />
            <span className="text-gray-900">We'll </span>
            <span className="text-orange-500">back it up with proof.</span>
          </h1>
          
          {/* Paragraph */}
          <p className="text-sm sm:text-base text-gray-400 mb-8 leading-relaxed max-w-xl">
            Record is built for people like you – learners, job-seekers, builders. Whatever your goal, we help you earn verified skill badges and turn effort into outcomes.
          </p>
          
          {/* Feature List */}
          <div className="space-y-4">
            {/* Feature 1 */}
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <div className="w-5 h-5 rounded border-2 border-orange-500 flex items-center justify-center">
                  <svg className="w-3 h-3 text-orange-500" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5">
                    {/* 3D Cube - Isometric view */}
                    {/* Top face */}
                    <path d="M4 6 L10 3 L10 9 L4 12 Z" strokeLinejoin="miter"/>
                    {/* Front face */}
                    <path d="M4 12 L4 6 L7 8 L7 14 Z" strokeLinejoin="miter"/>
                    {/* Right face */}
                    <path d="M10 9 L10 3 L7 5 L7 11 Z" strokeLinejoin="miter"/>
                    {/* Edges connecting faces */}
                    <line x1="4" y1="6" x2="7" y2="8" strokeLinecap="round"/>
                    <line x1="10" y1="3" x2="7" y2="5" strokeLinecap="round"/>
                    <line x1="7" y1="8" x2="7" y2="5" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-900 font-medium">
                Earn verified skill badges from projects, courses & YouTube
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <div className="w-5 h-5 rounded border-2 border-orange-500 flex items-center justify-center">
                  <svg className="w-3 h-3 text-orange-500" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5">
                    {/* 3D Cube - Isometric view */}
                    {/* Top face */}
                    <path d="M4 6 L10 3 L10 9 L4 12 Z" strokeLinejoin="miter"/>
                    {/* Front face */}
                    <path d="M4 12 L4 6 L7 8 L7 14 Z" strokeLinejoin="miter"/>
                    {/* Right face */}
                    <path d="M10 9 L10 3 L7 5 L7 11 Z" strokeLinejoin="miter"/>
                    {/* Edges connecting faces */}
                    <line x1="4" y1="6" x2="7" y2="8" strokeLinecap="round"/>
                    <line x1="10" y1="3" x2="7" y2="5" strokeLinecap="round"/>
                    <line x1="7" y1="8" x2="7" y2="5" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-900 font-medium">
                Take AI-powered assessments to showcase your skills
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <div className="w-5 h-5 rounded border-2 border-orange-500 flex items-center justify-center">
                  <svg className="w-3 h-3 text-orange-500" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5">
                    {/* 3D Cube - Isometric view */}
                    {/* Top face */}
                    <path d="M4 6 L10 3 L10 9 L4 12 Z" strokeLinejoin="miter"/>
                    {/* Front face */}
                    <path d="M4 12 L4 6 L7 8 L7 14 Z" strokeLinejoin="miter"/>
                    {/* Right face */}
                    <path d="M10 9 L10 3 L7 5 L7 11 Z" strokeLinejoin="miter"/>
                    {/* Edges connecting faces */}
                    <line x1="4" y1="6" x2="7" y2="8" strokeLinecap="round"/>
                    <line x1="10" y1="3" x2="7" y2="5" strokeLinecap="round"/>
                    <line x1="7" y1="8" x2="7" y2="5" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-900 font-medium">
                Share your profile & badges publicly, like a mini portfolio
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <div className="w-5 h-5 rounded border-2 border-orange-500 flex items-center justify-center">
                  <svg className="w-3 h-3 text-orange-500" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5">
                    {/* 3D Cube - Isometric view */}
                    {/* Top face */}
                    <path d="M4 6 L10 3 L10 9 L4 12 Z" strokeLinejoin="miter"/>
                    {/* Front face */}
                    <path d="M4 12 L4 6 L7 8 L7 14 Z" strokeLinejoin="miter"/>
                    {/* Right face */}
                    <path d="M10 9 L10 3 L7 5 L7 11 Z" strokeLinejoin="miter"/>
                    {/* Edges connecting faces */}
                    <line x1="4" y1="6" x2="7" y2="8" strokeLinecap="round"/>
                    <line x1="10" y1="3" x2="7" y2="5" strokeLinecap="round"/>
                    <line x1="7" y1="8" x2="7" y2="5" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-900 font-medium">
                Be visible to 200+ recruiters hiring via Record
              </p>
            </div>
          </div>
        </div>
        
        {/* Right Column - Dark Blue Background */}
        <div className="flex-1 bg-[#283457] p-8 sm:p-10 lg:p-14 xl:p-16 flex flex-col justify-center">
          {/* Certificate Icon */}
          <div className="flex justify-center mb-10">
            <svg className="w-24 h-24 sm:w-28 sm:h-28" viewBox="0 0 100 100" fill="none">
              {/* Document/Certificate - rounded top corners, sharp bottom corners */}
              <path d="M25 32 Q25 25 32 25 L68 25 Q75 25 75 32 L75 88 L25 88 Z" 
                    stroke="#7a8ba8" 
                    strokeWidth="2.5" 
                    fill="none"
                    strokeLinejoin="miter"
                    strokeLinecap="round"/>
              
              {/* Three horizontal lines - varying lengths (longest to shortest), left-aligned */}
              <line x1="32" y1="42" x2="68" y2="42" stroke="#7a8ba8" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="32" y1="52" x2="62" y2="52" stroke="#7a8ba8" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="32" y1="62" x2="56" y2="62" stroke="#7a8ba8" strokeWidth="2.5" strokeLinecap="round"/>
              
              {/* Circular badge overlapping bottom-right corner - concentric circles */}
              <circle cx="68" cy="72" r="10" stroke="#7a8ba8" strokeWidth="2.5" fill="none"/>
              <circle cx="68" cy="72" r="6" stroke="#7a8ba8" strokeWidth="2.5" fill="none"/>
              
              {/* Two V-shaped ribbons extending downward from badge, fanning out slightly */}
              <path d="M67 82 L64 90 L67 87 L70 90 Z" 
                    stroke="#7a8ba8" 
                    strokeWidth="2.5" 
                    fill="none"
                    strokeLinejoin="round"/>
              <path d="M69 82 L66 90 L69 87 L72 90 Z" 
                    stroke="#7a8ba8" 
                    strokeWidth="2.5" 
                    fill="none"
                    strokeLinejoin="round"/>
            </svg>
          </div>
          
          {/* Testimonial */}
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-sm sm:text-base text-white leading-relaxed mb-8">
              Throughout my journey spanning projects, work experience, licenses, education, and even my personal YouTube learning playlist, I've built a strong skill set. And now, I can see them all in one place with Record.
            </p>
            
            {/* Author */}
            <div>
              <p className="text-sm sm:text-base font-medium text-white mb-1">
                – Arunmathavan
              </p>
              <p className="text-xs sm:text-sm text-gray-300">
                Mobile App Developer at NSIC
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Section */}
      <div className="bg-[#2d3142] px-8 sm:px-10 lg:px-16 xl:px-28 py-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        {/* Text */}
        <p className="text-gray-400 text-sm font-normal whitespace-nowrap">
          Trusted & Supported by
        </p>
        
        {/* Company Logos - Horizontal layout */}
        <div className="flex items-center gap-6 sm:gap-7 lg:gap-24">
          {/* ZOHO Logo */}
          <div className="flex items-center h-8 sm:h-9 md:h-10">
            <img 
              src="/zoho-logo-png_seeklogo-274112.png" 
              alt="ZOHO" 
              className="h-full w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
          
          {/* AWS Logo */}
          <div className="flex items-center h-8 sm:h-9 md:h-10">
            <img 
              src="/amazon-web-services-aws-logo-png_seeklogo-319188.png" 
              alt="AWS" 
              className="h-full w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
          
          {/* Microsoft Logo */}
          <div className="flex items-center h-8 sm:h-9 md:h-10">
            <img 
              src="/microsoft-logo-png_seeklogo-168319.png" 
              alt="Microsoft for Startups Founders Hub" 
              className="h-full w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
          
          {/* Notion Logo */}
          <div className="flex items-center h-8 sm:h-9 md:h-10">
            <img 
              src="/Untitled_Project-removebg-preview.png" 
              alt="Notion" 
              className="h-full w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
          
          {/* StartupTN Logo */}
          <div className="flex items-center h-8 sm:h-9 md:h-10">
            <img 
              src="/image-removebg-preview.png" 
              alt="StartupTN" 
              className="h-full w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>
    </>
  );

  // When embedded, return with wrapper
  if (isEmbedded) {
    return (
      <div className="w-full bg-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            {renderContent()}
          </div>
        </div>
      </div>
    );
  }

  // Standalone version
  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;