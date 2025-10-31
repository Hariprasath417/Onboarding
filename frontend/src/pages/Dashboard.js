import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { formAPI } from '../services/api';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const loadFormData = async () => {
      try {
        const response = await formAPI.getForm();
        setFormData(response.data.formEntry);
      } catch (error) {
        console.error('Error loading form data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFormData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-50 shadow-sm flex flex-col transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo - Orange Block */}
        <div className="h-16 bg-orange-500 flex items-center justify-between px-4 lg:justify-center">
          <span className="text-white font-bold text-lg hidden lg:inline">Record</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col px-4 pt-6 pb-4">
          {/* Main Navigation */}
          <div className="space-y-2 flex-1">
            <a
              href="#"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center px-3 py-2 text-orange-600 bg-orange-50 rounded-lg font-medium"
            >
              <svg className="w-5 h-5 mr-3 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              Dashboard
            </a>

            <a
              href="#"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <svg className="w-5 h-5 mr-3 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              Profile
            </a>

            <a
              href="#"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <svg className="w-5 h-5 mr-3 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
              Skill Repository
            </a>

            <a
              href="#"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <svg className="w-5 h-5 mr-3 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Learnings
            </a>

            <a
              href="#"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <svg className="w-5 h-5 mr-3 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Jobs
            </a>

            {/* Tools Section */}
            <div className="mt-6">
              <h3 className="px-3 text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                TOOLS
              </h3>
              <div className="space-y-1">
                <a
                  href="#"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <svg className="w-5 h-5 mr-3 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  YouTube to Course
                </a>
                <a
                  href="#"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <svg className="w-5 h-5 mr-3 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  One Click Resume
                </a>
                <a
                  href="#"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <svg className="w-5 h-5 mr-3 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  AI Assessment
                </a>
                <a
                  href="#"
                  className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <svg className="w-5 h-5 mr-3 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Setup
                  <span className="ml-auto text-sm text-gray-500">56%</span>
                </a>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="border-t border-gray-200 my-4"></div>

          {/* Footer */}
          <div>
            <div className="space-y-2">
              <a
                href="#"
                className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-5 h-5 mr-3 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.759 8.241 16 9.007 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08a3.996 3.996 0 00-.342 3.138l.463-.463zM4.93 4.93a5.99 5.99 0 01.525 2.516L3.913 8.165a5.99 5.99 0 01-.027-1.789l1.043-1.446zm1.446 1.446l1.562 1.562a4.006 4.006 0 012.08.041l-.08-.08a3.996 3.996 0 00-3.138-.342l-.463.463zM10 4a5.976 5.976 0 012.516.552l-1.562 1.562a4.006 4.006 0 00-1.789-.027L8.165 3.913A5.99 5.99 0 0110 4z"
                    clipRule="evenodd"
                  />
                </svg>
                Support
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-5 h-5 mr-3 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
                Feedback
              </a>
            </div>

            <div className="mt-4 px-3 text-xs text-gray-500">
              <div className="space-y-1">
                <div>Privacy Policy | Terms & Conditions</div>
                <div>© 2025 Record Innovation and Enterprises Pvt. Ltd.</div>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white w-full lg:w-auto">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-600 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <button className="bg-black text-white px-2 sm:px-4 py-2 rounded-lg flex items-center hover:bg-gray-800 transition-colors text-xs sm:text-sm">
                <svg className="w-4 h-4 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="hidden sm:inline">Upgrade</span>
              </button>

              <button className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 text-white rounded flex items-center justify-center hover:bg-orange-600 transition-colors flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>

              <button className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 text-gray-600 rounded flex items-center justify-center hover:bg-gray-300 transition-colors flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
              </button>

              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-pink-500 text-white rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors cursor-pointer flex-shrink-0"
                >
                  <span className="text-sm font-semibold">
                    {user?.name
                      ?.split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()
                      .slice(0, 2) || 'U'}
                  </span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.name || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
                    </div>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        handleLogout();
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-3 sm:p-4 lg:p-6 bg-gray-100 overflow-x-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Welcome Banner */}
            <div className="lg:col-span-2">
              <div className="bg-blue-600 rounded-lg p-4 sm:p-6 lg:p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-xl sm:text-2xl font-bold mb-2">
                    Welcome back, {user?.name || 'there'}!
                  </h2>
                  <p className="text-sm sm:text-base text-blue-100 mb-4 sm:mb-6">
                    You can now turn your YouTube Playlists into Courses.
                  </p>
                  <button className="bg-white text-blue-600 px-4 sm:px-6 py-2 rounded-lg font-medium flex items-center hover:bg-blue-50 transition-colors text-sm sm:text-base">
                    Explore Now
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400 rounded-full opacity-20 transform translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-400 rounded-full opacity-20 transform translate-x-12 translate-y-12"></div>
              </div>
            </div>

            {/* Skill Badges */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Skill Badges</h3>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm flex-1">
                  <div className="flex items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">0</div>
                    <div className="text-xs sm:text-sm text-gray-600">Role Based</div>
                  </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm flex-1">
                  <div className="flex items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">0</div>
                      <div className="text-sm text-gray-600">Super Skills</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          {/* Course In-Progress */}
          <div className="lg:col-span-2 mt-4 sm:mt-8">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Course In-Progress</h3>
            <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm">
              <div className="text-center text-gray-500">
                <svg
                  className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-base sm:text-lg">No courses in progress at the moment.</p>
              </div>
            </div>
          </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
