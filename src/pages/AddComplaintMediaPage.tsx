import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Camera, Video, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/Header';
import { showSuccess } from '@/utils/toast'; // Assuming you have a toast utility

const AddComplaintMediaPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const category = location.state?.category || 'General Issue'; // Get category from state
  const [description, setDescription] = React.useState('');
  const [mediaUrl, setMediaUrl] = React.useState('');

  const handleContinue = () => {
    // Here you would typically save the complaint data to Supabase
    console.log('Complaint Data:', { category, description, mediaUrl });
    showSuccess('Complaint submitted successfully!');
    navigate('/'); // Navigate back to home or a confirmation page
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-gray-800">
          <h1 className="text-2xl font-bold mb-4">Add Photo or Video</h1>
          <p className="text-red-600 font-semibold mb-6">Category: {category}</p>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <Button className="h-24 bg-gray-700 hover:bg-gray-800 text-white flex flex-col items-center justify-center">
              <Camera className="h-6 w-6 mb-1" />
              Take Photo
            </Button>
            <Button className="h-24 bg-blue-600 hover:bg-blue-700 text-white flex flex-col items-center justify-center">
              <Video className="h-6 w-6 mb-1" />
              Record Video
            </Button>
            <Button className="h-24 bg-purple-600 hover:bg-purple-700 text-white flex flex-col items-center justify-center">
              <Upload className="h-6 w-6 mb-1" />
              Upload from Gallery
            </Button>
          </div>

          <Input
            placeholder="Or paste image/video URL here (optional)"
            className="mb-4 p-2 border rounded-md w-full"
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
          />

          <Textarea
            placeholder="Add a description for the issue..."
            className="mb-6 p-2 border rounded-md w-full min-h-[100px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="space-y-4">
            <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white text-lg font-semibold">
              Add Description Only
            </Button>
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white text-lg font-semibold"
              onClick={handleContinue}
            >
              Continue to Location
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddComplaintMediaPage;