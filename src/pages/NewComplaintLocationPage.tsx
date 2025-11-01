import React from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { showSuccess } from '@/utils/toast';

const NewComplaintLocationPage = () => {
  const navigate = useNavigate();

  const handleSubmitComplaint = () => {
    // Retrieve data from localStorage
    const category = localStorage.getItem('newComplaintCategory');
    const description = localStorage.getItem('newComplaintDescription');
    const mediaUrl = localStorage.getItem('newComplaintMediaUrl');

    console.log('Final Complaint Submission:', { category, description, mediaUrl, location: 'User selected location' });
    // Here you would typically send all data to your Supabase database
    showSuccess('Complaint submitted successfully!');

    // Clear temporary storage
    localStorage.removeItem('newComplaintCategory');
    localStorage.removeItem('newComplaintDescription');
    localStorage.removeItem('newComplaintMediaUrl');

    navigate('/home'); // Navigate back to home or a confirmation page
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-gray-800">
          <h1 className="text-2xl font-bold mb-4">Add Location Details</h1>
          <p className="text-gray-600 mb-6">
            (This is a placeholder for location selection. In a real app, you'd integrate a map here.)
          </p>
          <Button
            className="w-full bg-green-600 hover:bg-green-700 text-white text-lg font-semibold"
            onClick={handleSubmitComplaint}
          >
            Submit Complaint
          </Button>
        </div>
      </main>
    </div>
  );
};

export default NewComplaintLocationPage;