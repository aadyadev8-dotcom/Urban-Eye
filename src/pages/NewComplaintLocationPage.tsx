import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { showSuccess, showError, showLoading, dismissToast } from '@/utils/toast';
import { MapPin, LocateFixed } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const NewComplaintLocationPage = () => {
  const navigate = useNavigate();
  const [loadingLocation, setLoadingLocation] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [mapUrl, setMapUrl] = useState<string | null>(null);

  const fetchUserLocation = () => {
    setLoadingLocation(true);
    setLocationError(null);
    setLatitude(null);
    setLongitude(null);
    setMapUrl(null);

    const toastId = showLoading('Fetching your location...');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dismissToast(toastId);
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);

          // OpenStreetMap embed URL
          const mapLink = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.01},${latitude - 0.01},${longitude + 0.01},${latitude + 0.01}&layer=mapnik&marker=${latitude},${longitude}`;
          setMapUrl(mapLink);
          showSuccess('Location detected successfully!');
          setLoadingLocation(false);
        },
        (error) => {
          dismissToast(toastId);
          setLoadingLocation(false);
          let errorMessage = 'Failed to get your location.';
          if (error.code === error.PERMISSION_DENIED) {
            errorMessage = 'Please enable location access in your browser settings to use this feature.';
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            errorMessage = 'Location information is unavailable.';
          } else if (error.code === error.TIMEOUT) {
            errorMessage = 'The request to get user location timed out.';
          }
          setLocationError(errorMessage);
          showError(errorMessage);
          console.error('Geolocation error:', error);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      dismissToast(toastId);
      setLoadingLocation(false);
      const errorMessage = 'Geolocation is not supported by your browser.';
      setLocationError(errorMessage);
      showError(errorMessage);
    }
  };

  const handleSubmitComplaint = async () => {
    if (latitude === null || longitude === null) {
      showError('Please get your location before submitting the complaint.');
      return;
    }

    const toastId = showLoading('Submitting complaint...');
    try {
      // Retrieve data from localStorage
      const category = localStorage.getItem('newComplaintCategory');
      const description = localStorage.getItem('newComplaintDescription');
      const mediaUrl = localStorage.getItem('newComplaintMediaUrl'); // This could be image_url or video_url

      const complaintData = {
        category: category || 'Uncategorized',
        description: description || 'No description provided.',
        image_url: mediaUrl && mediaUrl.match(/\.(jpeg|jpg|gif|png)$/) ? mediaUrl : null,
        video_url: mediaUrl && mediaUrl.match(/\.(mp4|webm|ogg)$/) ? mediaUrl : null,
        latitude: latitude,
        longitude: longitude,
        status: 'Pending', // Default status
        title: category || 'New Complaint', // Use category as title for now
        user_id: (await supabase.auth.getUser()).data.user?.id, // Get current user ID
      };

      const { error } = await supabase.from('complaints').insert([complaintData]);

      if (error) {
        throw error;
      }

      dismissToast(toastId);
      showSuccess('Complaint submitted successfully!');

      // Clear temporary storage
      localStorage.removeItem('newComplaintCategory');
      localStorage.removeItem('newComplaintDescription');
      localStorage.removeItem('newComplaintMediaUrl');

      navigate('/home'); // Navigate back to home or a confirmation page
    } catch (error: any) {
      dismissToast(toastId);
      showError(`Failed to submit complaint: ${error.message}`);
      console.error('Complaint submission error:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-gray-800">
          <h1 className="text-2xl font-bold mb-4">Add Location Details</h1>
          <p className="text-gray-600 mb-6">
            Pinpoint the exact location of the issue.
          </p>

          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold mb-4"
            onClick={fetchUserLocation}
            disabled={loadingLocation}
          >
            {loadingLocation ? (
              'Fetching Location...'
            ) : (
              <>
                <LocateFixed className="h-5 w-5 mr-2" />
                Get My Location
              </>
            )}
          </Button>

          {locationError && (
            <p className="text-red-500 mb-4">{locationError}</p>
          )}

          {latitude !== null && longitude !== null && (
            <div className="mb-6 text-left">
              <p className="text-gray-700 font-semibold flex items-center mb-2">
                <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                Location:
              </p>
              <p className="text-gray-600 ml-7">Latitude: {latitude.toFixed(6)}</p>
              <p className="text-gray-600 ml-7">Longitude: {longitude.toFixed(6)}</p>
            </div>
          )}

          {mapUrl && (
            <div className="mb-6 rounded-lg overflow-hidden shadow-md">
              <iframe
                id="mapFrame"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: '10px' }}
                src={mapUrl}
                title="OpenStreetMap Location"
                allowFullScreen
              ></iframe>
            </div>
          )}

          <Button
            className="w-full bg-green-600 hover:bg-green-700 text-white text-lg font-semibold"
            onClick={handleSubmitComplaint}
            disabled={latitude === null || longitude === null || loadingLocation}
          >
            Submit Complaint
          </Button>
        </div>
      </main>
    </div>
  );
};

export default NewComplaintLocationPage;