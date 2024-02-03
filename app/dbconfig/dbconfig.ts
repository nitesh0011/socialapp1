import mongoose from 'mongoose';

// Centralized connection function with error handling and logging
export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('MongoDB connected successfully');
      console.log('Connection state:', connection.readyState); // Log connection state
    });
    
    connection.on('error', (error) => {
      console.error('MongoDB connection error:', error);
      // Handle error gracefully (e.g., retry, display user-friendly message, etc.)
    });
  } catch (error:any) {
    console.error('Connection failed:', error.message);
    // Handle connection failure (e.g., retry, display user-friendly message, etc.)
  }
}