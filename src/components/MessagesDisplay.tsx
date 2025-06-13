import { useState, useEffect } from 'react';
import { db } from "../firebase/fireBaseConfig";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { Wish } from '../data/wish'; // Import the Wish interface
import { motion } from "framer-motion";

const MessagesDisplay = () => {
  const [messages, setMessages] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const messagesRef = collection(db, "messages_public");
    const q = query(messagesRef, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedMessages: Wish[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedMessages.push({
          id: doc.id,
          author: data.name, 
          message: data.message,
          email: data.email,
          timestamp: data.timestamp,
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
  }, []);

  if (loading) {
    return <p className="text-center text-gray-400 py-10">Loading messages...</p>;
  }

  if (error) {
    return <p className="text-center text-red-400 py-10">{error}</p>;
  }

  if (messages.length === 0) {
    return <p className="text-center text-gray-500 py-10">No messages yet! Be the first to share.</p>;
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1, // Stagger animation
        duration: 0.5,
        ease: "easeOut" as const
      }
    })
  };

  return (
    <section id="messages" className="py-12 px-4 sm:px-6 lg:px-8 ">
      <motion.h2 
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-10 md:mb-16 bg-gradient-to-r from-pink-700 via-rose-400 to-red-800 bg-clip-text text-transparent drop-shadow-sm"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9, ease: "easeOut" }}
      >
        Heartfelt Wishes & Memories ❤️
      </motion.h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {messages.map((wish, index) => (
          <motion.div
            key={wish.id}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
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