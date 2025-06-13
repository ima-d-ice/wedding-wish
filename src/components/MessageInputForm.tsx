import { useState } from 'react';
import { db } from "../firebase/fireBaseConfig"; 
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore"; // Added query, where, getDocs

const MessageInputForm = () => {
  const [message, setMessage] = useState('');
  const [author, setAuthor] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // To prevent double submissions

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!message.trim() || !author.trim() || !email.trim()) {
      alert("Please fill in all fields.");
      setIsSubmitting(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Check if email already exists in messages_public
      const messagesRef = collection(db, "messages_public");
      const q = query(messagesRef, where("email", "==", email.trim().toLowerCase())); // Normalize email for check
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert("A message has already been submitted with this email address. Thank you!");
        setIsSubmitting(false);
        return;
      }

      // Add directly to the public messages collection
      await addDoc(collection(db, "messages_public"), {
        name: author.trim(),
        email: email.trim().toLowerCase(), // Store normalized email
        message: message.trim(),
        timestamp: serverTimestamp()
      });
      
      // Add a document to the mail_queue for the Trigger Email extension
      await addDoc(collection(db, "mail_queue"), {
        to: email.trim(), // Extension will use this for the recipient
        message: {
          subject: `Thank You for Your Message, ${author.trim()}!`, // Extension uses this
          html: `<p>Dear ${author.trim()},</p><p>Thank you for sharing your heartfelt message! It has been received and is now displayed.</p><p>Warmly,</p><p>The Event Team</p>`, // Extension uses this
        },
      });
      console.log("Email task added to queue and message posted.");
      alert("Message sent and posted! Thank you!"); 

      setMessage('');
      setAuthor('');
      setEmail('');
    } catch (error) {
      console.error("Error processing message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-md md:max-w-lg bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-6 space-y-4"
    >
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-blue-200 mb-1">
          Your Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          className="mt-1 block w-full rounded-md bg-white/20 border-transparent focus:border-blue-300 focus:bg-white/30 focus:ring-0 text-gray-100 placeholder-gray-400"
          placeholder="Write your heartfelt message here..."
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label htmlFor="author" className="block text-sm font-medium text-blue-200 mb-1">
          Your Name
        </label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="mt-1 block w-full rounded-md bg-white/20 border-transparent focus:border-blue-300 focus:bg-white/30 focus:ring-0 text-gray-100 placeholder-gray-400"
          placeholder="Your Name"
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-blue-200 mb-1">
          Your Email (for a thank you note & to ensure one message per person)
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full rounded-md bg-white/20 border-transparent focus:border-blue-300 focus:bg-white/30 focus:ring-0 text-gray-100 placeholder-gray-400"
          placeholder="e.g., yourname@example.com"
          disabled={isSubmitting}
        />
      </div>
      <button
        type="submit"
        className="w-full py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-900 focus:ring-cyan-500 transition-colors duration-300 disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Add Message'}
      </button>
    </form>
  );
};

export default MessageInputForm;