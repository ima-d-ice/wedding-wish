import Countdown from './components/Count';
import Navbar from './components/Navbar';
import MessagesDisplay from './components/MessagesDisplay';
import Footer from './components/footer';
import MessageInputForm from './components/MessageInputForm';
import { Toaster } from 'react-hot-toast';
import { motion } from "framer-motion";
import AkLogo from './assets/ak.png'; // Assuming your image is named ak.png and in src/assets

// HomePage content is now directly part of App or could be a simple component
const HomePageContent = () => (
  <>
    <motion.header
      className="text-center py-10 md:py-16 relative" // Added relative positioning for potential absolute positioning of elements if needed
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="flex flex-col items-center justify-center"> {/* Flex container for centering */}
        <motion.img
          src={AkLogo}
          alt="Akram & Khathija Initials"
          className="h-80 w-auto md:h-40 mb-4 md:mb-6" // Adjusted height classes
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        />
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold drop-shadow-md bg-gradient-to-r from-pink-300 via-rose-200 to-red-300 bg-clip-text text-transparent mb-4">
          Celebrating Akram & Khathija
        </h2>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold drop-shadow-lg bg-gradient-to-r from-sky-300 via-cyan-200 to-indigo-400 bg-clip-text text-transparent" id="countdown" >
          A Shower of Blessings
        </h1>
        <p className="text-lg sm:text-xl mt-6 md:mt-8 bg-gradient-to-r from-blue-200 via-indigo-100 to-sky-200 bg-clip-text text-transparent" id="count-down"> {/* Ensure ID matches Navbar target */}
          Join us in sending heartfelt wishes to the happy couple as they begin their beautiful journey together.
        </p>
      </div>
    </motion.header>

    <motion.section 
      
      className="text-center my-8 md:my-12"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
    > {/* Ensure ID matches Navbar target */}
      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold drop-shadow-xl bg-gradient-to-r from-red-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
        <Countdown targetDate="2025-06-16T10:30:00+05:30" />
      </div>
      <div className='flex items-center justify-center'>
        <p className="text-xl sm:text-2xl mt-4 md:mt-6 bg-gradient-to-r from-teal-200 via-green-100 to-emerald-300 bg-clip-text text-transparent pr-3">
        Until their Nikkah! 
      </p>
      <p className='text-xl sm:text-2xl mt-4 md:mt-6 '> 🌙</p>
      </div>
      
    </motion.section>
    
    <motion.section 
      id="share-message" 
      className="my-12 md:my-16 flex flex-col items-center px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
    > {/* Ensure ID matches Navbar target */}
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 md:mb-12 drop-shadow-sm bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-400 bg-clip-text text-transparent">
        Leave Your Warm Wishes & Memories
      </h2>
      <MessageInputForm />
    </motion.section>

    {/* MessagesDisplay has id="messages" internally, ensure Navbar targets this if needed */}
    <MessagesDisplay /> 
  </>
);


const App = () => {
  return (
    // Router component removed
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-sky-700 font-sans text-gray-100 flex flex-col">
      <Toaster 
        position="top-center" 
        reverseOrder={false} 
        toastOptions={{
          duration: 5000,
          style: {
            background: '#1e293b', // slate-800
            color: '#e0f2fe', // sky-100
            border: '1px solid #0ea5e9', // sky-500
          },
          success: {
            iconTheme: {
              primary: '#34d399', // emerald-400
              secondary: '#1e293b',
            },
          },
          error: {
            iconTheme: {
              primary: '#f87171', // red-400
              secondary: '#1e293b',
            },
          },
        }}
      />
      <Navbar />
      <main className="flex-grow">
        {/* Routes component removed, HomePageContent rendered directly */}
        <HomePageContent />
      </main>
      <Footer />
    </div>
    // Router component removed
  );
};

export default App;
