import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleScrollTo = (elementId: string) => {
    setIsOpen(false); // Close mobile menu if open
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Fallback for the main logo or if element not found, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-blue-900/80 backdrop-blur-lg p-4 shadow-lg sticky top-0 z-50 border-b border-blue-700/50">
      <div className="container mx-auto flex justify-between items-center">
        <button 
          onClick={() => handleScrollTo('count-down')} // Or scroll to top: window.scrollTo({ top: 0, behavior: 'smooth' }); setIsOpen(false);
          className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent"
        >
          AK Nikkah
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {/* Ensure these IDs exist on your page */}
          <button onClick={() => handleScrollTo('countdown')} className="text-blue-200 hover:text-cyan-300 font-semibold transition-colors duration-300">
            Countdown
          </button>
          {/* <button onClick={() => handleScrollTo('roast')} className="text-blue-200 hover:text-cyan-300 font-semibold transition-colors duration-300">
            Daily Banter 
          </button> */}
          <button onClick={() => handleScrollTo('messages')} className="text-blue-200 hover:text-cyan-300 font-semibold transition-colors duration-300">
            Messages
          </button>
          <button onClick={() => handleScrollTo('share-message')} className="text-blue-200 hover:text-cyan-300 font-semibold transition-colors duration-300">
            Send Message
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-blue-200 hover:text-cyan-300 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu - Dropdown */}
      <div
        className={`
          md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? 'max-h-screen opacity-100 pt-3 pb-2' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="space-y-1">
          <button
            onClick={() => handleScrollTo('countdown')}
            className="block w-full text-left py-2 px-4 text-sm text-blue-200 hover:bg-blue-700/50 hover:text-cyan-300 rounded transition-colors duration-300"
          >
            Countdown
          </button>
          {/* <button
            onClick={() => handleScrollTo('roast')}
            className="block w-full text-left py-2 px-4 text-sm text-blue-200 hover:bg-blue-700/50 hover:text-cyan-300 rounded transition-colors duration-300"
          >
            Daily Banter
          </button> */}
          <button
            onClick={() => handleScrollTo('messages')}
            className="block w-full text-left py-2 px-4 text-sm text-blue-200 hover:bg-blue-700/50 hover:text-cyan-300 rounded transition-colors duration-300"
          >
            Messages
          </button>
          <button
            onClick={() => handleScrollTo('share-message')}
            className="block w-full text-left py-2 px-4 text-sm text-blue-200 hover:bg-blue-700/50 hover:text-cyan-300 rounded transition-colors duration-300"
          >
            Send Message
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;