import { Timestamp } from "firebase/firestore";

export interface Wish {
  id: string;
  author: string; // Corresponds to 'name' in Firestore
  message: string;
  email: string;   // For thank you notes, not displayed
  timestamp: Timestamp;
  likeCount?: number; 
  authorPhotoURL?: string; // Add this line for the author's profile picture URL
}

