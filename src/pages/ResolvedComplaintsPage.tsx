import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import ComplaintCard from '@/components/ComplaintCard';
import { supabase } from '@/integrations/supabase/client';
import { showSuccess, showError } from '@/utils/toast';
import { useNavigate } from 'react-router-dom';

interface Complaint {
  id: string;
  title: string;
  status: string;
  created_at: string;
  description: string;
  image_url?: string;
  video_url?: string;
  upvotes: number;
}

const ResolvedComplaintsPage = () => {
  const [resolvedComplaints, setResolvedComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResolvedComplaints = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('complaints')
        .select('*')
        .eq('status', 'Resolved')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching resolved complaints:', error);
        setError('Failed to load resolved complaints.');
        showError('Failed to load resolved complaints.');
      } else {
        setResolvedComplaints(data || []);
      }
      setLoading(false);
    };

    fetchResolvedComplaints();
  }, []);

  const handleViewDetails = (complaintId: string) => {
    console.log('View details for complaint:', complaintId);
    showSuccess(`Viewing details for complaint ID: ${complaintId}`);
  };

  const handleUpvote = async (complaintId: string) => {
    // Optimistically update UI
    setResolvedComplaints(prevComplaints =>
      prevComplaints.map(c =>
        c.id === complaintId ? { ...c, upvotes: c.upvotes + 1 } : c
      )
    );

    const { data, error } = await supabase
      .from('complaints')
      .update({ upvotes: resolvedComplaints.find(c => c.id === complaintId)!.upvotes + 1 })
      .eq('id', complaintId);

    if (error) {
      console.error('Error upvoting complaint:', error);
      showError('Failed to upvote complaint.');
      // Revert optimistic update if error occurs
      setResolvedComplaints(prevComplaints =>
        prevComplaints.map(c =>
          c.id === complaintId ? { ...c, upvotes: c.upvotes - 1 } : c
        )
      );
    } else {
      showSuccess('Complaint upvoted!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      <main className="flex-grow flex flex-col items-center p-4">
        <div className="w-full max-w-md text-center mb-8">
          <div className="bg-urban-eye-pink p-6 rounded-lg shadow-lg mb-4">
            <h1 className="text-3xl font-bold text-gray-800">Resolved Complaints</h1>
            <p className="text-gray-600">Reports that have been "Resolved".</p>
          </div>
        </div>

        <div className="w-full max-w-md">
          {loading ? (
            <p className="text-center text-gray-400">Loading resolved complaints...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : resolvedComplaints.length === 0 ? (
            <p className="text-center text-gray-400">No resolved complaints found.</p>
          ) : (
            resolvedComplaints.map((complaint) => (
              <ComplaintCard
                key={complaint.id}
                complaint={complaint}
                onViewDetails={handleViewDetails}
                onUpvote={handleUpvote}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default ResolvedComplaintsPage;