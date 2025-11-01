import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { showError } from '@/utils/toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  issues_resolved: number;
  unlocked_badges: string[]; // Assuming badges are stored as an array of strings (e.g., emoji)
}

const badgeEmojis = ['🥇', '🥈', '🥉', '🏅', '🌟', '✨']; // Emojis for top contributors

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, issues_resolved, unlocked_badges')
        .order('issues_resolved', { ascending: false })
        .limit(10); // Limit to top 10 for the leaderboard

      if (error) {
        console.error('Error fetching leaderboard:', error);
        setError('Failed to load leaderboard.');
        showError('Failed to load leaderboard.');
      } else {
        setLeaderboard(data || []);
      }
      setLoading(false);
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 text-center">
        <Card className="bg-urban-eye-pink p-8 rounded-lg shadow-lg max-w-md w-full text-gray-800">
          <CardHeader className="p-0 mb-6">
            <CardTitle className="text-3xl font-bold mb-2">Community Leaderboard</CardTitle>
            <p className="text-gray-600">Top contributors making a difference!</p>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <p className="text-gray-600">Loading leaderboard...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : leaderboard.length === 0 ? (
              <p className="text-gray-600">No contributors yet. Be the first!</p>
            ) : (
              <div className="space-y-3 mb-6">
                {leaderboard.map((profile, index) => (
                  <div
                    key={profile.id}
                    className="flex items-center justify-between bg-white p-4 rounded-md shadow-sm"
                  >
                    <div className="flex items-center">
                      <span className="font-bold text-lg mr-2">{index + 1}.</span>
                      <span className="text-lg font-medium">
                        {profile.first_name} {profile.last_name}
                      </span>
                      {profile.unlocked_badges && profile.unlocked_badges.length > 0 && (
                        <span className="ml-2 text-xl">{profile.unlocked_badges[0]}</span>
                      )}
                      {/* Display a default badge if no custom badges are unlocked, for top 3 */}
                      {index === 0 && !profile.unlocked_badges?.length && <span className="ml-2 text-xl">🥇</span>}
                      {index === 1 && !profile.unlocked_badges?.length && <span className="ml-2 text-xl">🥈</span>}
                      {index === 2 && !profile.unlocked_badges?.length && <span className="ml-2 text-xl">🥉</span>}
                    </div>
                    <span className="text-lg font-semibold text-gray-700">
                      {profile.issues_resolved} reports resolved
                    </span>
                  </div>
                ))}
              </div>
            )}
            <Link to="/new-complaint-category">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold">
                Back to Categories
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default LeaderboardPage;