import { useState, useEffect } from 'react';
import { db } from "../firebase/fireBaseConfig";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { Wish } from '../data/wish'; // Import the Wish interface

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

  return (
    <section id="messages" className="py-8 px-4 bg-gradient-to-br from-blue-700 via-indigo-800 to-cyan-900 shadow-lg">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-pink-400 via-rose-500 to-pink-800 bg-clip-text text-transparent">
        Messages from the Beloved ❤️
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {messages.map((wish) => (
          <div
            key={wish.id}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between"
          >
            <p className="text-gray-800 mb-4 text-md leading-relaxed whitespace-pre-line">
              {wish.message}
            </p>
            <p className="text-right text-pink-500 font-semibold mt-auto">
              - {wish.author}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MessagesDisplay;