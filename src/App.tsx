import Countdown from './components/Count';
import Navbar from './components/Navbar';
import MessagesDisplay from './components/MessagesDisplay';
import Footer from './components/footer';
import MessageInputForm from './components/MessageInputForm';

// HomePage content is now directly part of App or could be a simple component
const HomePageContent = () => (
  <>
    <header className="text-center py-10 md:py-16">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold drop-shadow-lg bg-gradient-to-r from-emerald-400 via-green-200 to-indigo-500 bg-clip-text text-transparent">
        The Countdown Begins
      </h1>
      <p className="text-lg sm:text-xl mt-6 md:mt-8 bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent" id="count-down"> {/* Ensure ID matches Navbar target */}
        Anticipate the Moment
      </p>
    </header>

    <section id="countdown" className="text-center my-8 md:my-12"> {/* Ensure ID matches Navbar target */}
      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white drop-shadow-md">
        <Countdown targetDate="2025-06-16T10:30:00+05:30" />
      </div>
      <p className="text-xl sm:text-2xl mt-4 md:mt-6 bg-gradient-to-r from-teal-200 via-green-100 to-emerald-300 bg-clip-text text-transparent">
        Until the big day 💍
      </p>
    </section>
    
    <section id="share-message" className="my-12 md:my-16 flex flex-col items-center px-4"> {/* Ensure ID matches Navbar target */}
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 md:mb-12 drop-shadow-sm bg-gradient-to-r from-cyan-200 via-sky-100 to-blue-300 bg-clip-text text-transparent">
        Share Your Message
      </h2>
      <MessageInputForm />
    </section>

    {/* MessagesDisplay has id="messages" internally, ensure Navbar targets this if needed */}
    <MessagesDisplay /> 
  </>
);


const App = () => {
  return (
    // Router component removed
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500 font-sans text-gray-100 flex flex-col">
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
