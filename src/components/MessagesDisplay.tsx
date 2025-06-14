import { useState, useEffect } from 'react';
import { db } from "../firebase/fireBaseConfig";
import { collection, query, orderBy, onSnapshot, Timestamp } from "firebase/firestore";
import { Wish } from '../data/wish'; // Import the Wish interface
import { motion } from "framer-motion";

type SortOrder = "desc" | "asc";

const MessagesDisplay = () => {
  const [messages, setMessages] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc"); // 'desc' for newest first, 'asc' for oldest first

  useEffect(() => {
    setLoading(true); // Set loading to true when sortOrder changes
    const messagesRef = collection(db, "messages_public");
    const q = query(messagesRef, orderBy("timestamp", sortOrder));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedMessages: Wish[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedMessages.push({
          id: doc.id,
          author: data.name,
          message: data.message,
          email: data.email,
          timestamp: data.timestamp as Timestamp, // Ensure timestamp is treated as Firestore Timestamp
        } as Wish);
      });
      setMessages(fetchedMessages);
      setLoading(false);
      setError(null);
    }, (err) => {
      console.error("Error fetching messages:", err);
      setError("Failed to load messages. Please try again.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, [sortOrder]); // Re-run effect when sortOrder changes

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value as SortOrder);
  };

  if (loading) {
    return <p className="text-center text-gray-400 py-10">Loading messages...</p>;
  }

  if (error) {
    return <p className="text-center text-red-400 py-10">{error}</p>;
  }

  if (!loading && messages.length === 0) {
    return <p className="text-center text-gray-500 py-10">No messages yet! Be the first to share.</p>;
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05, // Adjusted delay for potentially faster re-renders
        duration: 0.4,
        ease: "easeOut" as const
      }
    })
  };

  return (
    <section id="messages" className="py-12 px-4 sm:px-6 lg:px-8 ">
      <motion.h2
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6 md:mb-10 bg-gradient-to-r from-pink-700 via-rose-400 to-red-800 bg-clip-text text-transparent drop-shadow-sm"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9, ease: "easeOut" }}
      >
        Heartfelt Wishes & Memories ❤️
      </motion.h2>

      <div className="max-w-7xl mx-auto mb-8 flex justify-end">
        <div className="relative">
          <label htmlFor="sort-messages" className="sr-only">Sort messages</label>
          <select
            id="sort-messages"
            value={sortOrder}
            onChange={handleSortChange}
            className="appearance-none bg-slate-800/60 border border-sky-700/70 text-sky-200 py-2.5 pl-3 pr-10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 text-sm"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-sky-300">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
          </div>
        </div>
      </div>

      {messages.length === 0 && !loading && (
         <p className="text-center text-gray-500 py-10">No messages yet! Be the first to share.</p>
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {messages.map((wish, index) => (
          <motion.div
            key={wish.id} // Key should be stable even when sorting
            custom={index} // Custom prop for stagger
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            layout // Add layout prop for smooth reordering animation
            className="bg-gradient-to-br from-slate-50 via-gray-100 to-stone-200 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col"
          >
            <blockquote className="flex-grow">
              <p className="text-gray-700 mb-5 text-base md:text-lg leading-relaxed whitespace-pre-line italic">
                "{wish.message}"
              </p>
            </blockquote>
            <p className="text-right text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 font-semibold mt-auto text-md">
              - {wish.author}
            </p>
          </motion.div>
        ))}
      </div>
      {messages.length > 3 && (
         <p className="text-center text-sky-300 mt-12 text-lg">
           Scroll to see more beautiful messages!
         </p>
      )}
    </section>
  );
};

export default MessagesDisplay;