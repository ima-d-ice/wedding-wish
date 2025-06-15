import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { db } from "../firebase/fireBaseConfig";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import HeartRainEffect from './HeartRainEffect'; 

const MessageInputForm = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showHeartRain, setShowHeartRain] = useState(false); // State to trigger heart rain

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!message.trim() || !name.trim() || !email.trim()) {
      toast.error("Please fill in all fields.");
      setIsSubmitting(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    try {
      const messagesRef = collection(db, "messages_public");
      const q = query(messagesRef, where("email", "==", email.trim().toLowerCase()));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        toast.error("A message has already been submitted with this email address. Thank you!");
        setIsSubmitting(false);
        return;
      }

      await addDoc(collection(db, "messages_public"), {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
        timestamp: serverTimestamp()
      });
      
      await addDoc(collection(db, "mail_queue"), {
        to: email.trim(),
        message: {
          subject: `Thank You for Your Message, ${name.trim()}!`,
          html: `<p>Dear ${name.trim()},</p><p>Thank you for sharing your heartfelt message! It has been received and is now displayed.</p><p>Warmly,</p><p>The Event Team</p>`,
        },
      });
      console.log("Email task added to queue and message posted.");
      toast.success("Message sent and posted! Thank you! ❤️"); 
      setShowHeartRain(true); // Trigger the heart rain!

      setMessage('');
      setName('');
      setEmail('');
    } catch (error) {
      console.error("Error processing message:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-lg mx-auto bg-slate-900/70 backdrop-blur-xl rounded-xl shadow-2xl p-8 space-y-6 border border-sky-600/50"
      >
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-sky-200 mb-1.5">
            Your Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={5}
            className="mt-1 block w-full px-4 py-2.5 rounded-lg bg-slate-800/60 border border-sky-700/70 focus:border-sky-500 focus:bg-slate-700/70 focus:ring-2 focus:ring-sky-500/50 text-sky-50 placeholder-sky-400/60 shadow-sm transition-all duration-300 outline-none disabled:opacity-50"
            placeholder="Share your heartfelt wishes and memories..."
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-sky-200 mb-1.5">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2.5 rounded-lg bg-slate-800/60 border border-sky-700/70 focus:border-sky-500 focus:bg-slate-700/70 focus:ring-2 focus:ring-sky-500/50 text-sky-50 placeholder-sky-400/60 shadow-sm transition-all duration-300 outline-none disabled:opacity-50"
            placeholder="e.g., Ice Cream Lover"
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-sky-200 mb-1.5">
            Your Email <span className="text-xs text-sky-300/70">(for a thank you note & one message per person)</span>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2.5 rounded-lg bg-slate-800/60 border border-sky-700/70 focus:border-sky-500 focus:bg-slate-700/70 focus:ring-2 focus:ring-sky-500/50 text-sky-50 placeholder-sky-400/60 shadow-sm transition-all duration-300 outline-none disabled:opacity-50"
            placeholder="yourname@example.com"
            disabled={isSubmitting}
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500 transition-all duration-300 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : (
            'Add My Message'
          )}
        </button>
      </form>

      {/* Add the HeartRainEffect component here */}
      <HeartRainEffect
        isRaining={showHeartRain}
        onComplete={() => setShowHeartRain(false)} // Reset the state when animation finishes
      />
    </>
  );
};

export default MessageInputForm;