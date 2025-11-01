import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Users, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MadeWithDyad } from '@/components/made-with-dyad';
import Header from '@/components/Header';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-urban-eye-pink">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">Welcome to Urban Eye</h1>
          <p className="text-gray-600 mb-8">Your platform for community reporting and engagement.</p>

          <div className="space-y-4">
            <Link to="/new-complaint-category">
              <Button className="w-full h-24 bg-blue-600 hover:bg-blue-700 text-white flex flex-col items-center justify-center text-lg font-semibold">
                <Plus className="h-6 w-6 mb-1" />
                New Complaint
                <span className="text-sm font-normal opacity-80">Report an issue in your area.</span>
              </Button>
            </Link>
            <Link to="/community-feed"> {/* Assuming a community feed page will be added later */}
              <Button className="w-full h-24 bg-green-600 hover:bg-green-700 text-white flex flex-col items-center justify-center text-lg font-semibold">
                <Users className="h-6 w-6 mb-1" />
                Community Feed
                <span className="text-sm font-normal opacity-80">See reported issues and their status.</span>
              </Button>
            </Link>
            <Link to="/leaderboard"> {/* Assuming a leaderboard page will be added later */}
              <Button className="w-full h-24 bg-red-600 hover:bg-red-700 text-white flex flex-col items-center justify-center text-lg font-semibold">
                <Trophy className="h-6 w-6 mb-1" />
                View Leaderboard
                <span className="text-sm font-normal opacity-80">Check out top community contributors.</span>
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default HomePage;