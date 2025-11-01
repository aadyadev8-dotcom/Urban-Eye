import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';

const categories = [
  { name: 'Potholes/Road Damage', color: 'bg-red-600 hover:bg-red-700' },
  { name: 'Water Leakage', color: 'bg-purple-600 hover:bg-purple-700' },
  { name: 'Broken Streetlights', color: 'bg-blue-600 hover:bg-blue-700' },
  { name: 'Illegal Dumping', color: 'bg-pink-600 hover:bg-pink-700' },
  { name: 'Garbage', color: 'bg-amber-800 hover:bg-amber-900' },
  { name: 'Amenities', color: 'bg-indigo-600 hover:bg-indigo-700' },
  { name: 'Other', color: 'bg-pink-400 hover:bg-pink-500' },
];

const NewComplaintCategoryPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-gray-800">
          <h1 className="text-2xl font-bold mb-6">What issue would you like to report?</h1>
          <p className="text-gray-600 mb-8">Select a category to report a new issue.</p>

          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                to="/new-complaint-media"
                state={{ category: category.name }} // Pass category name via state
              >
                <Button className={`w-full h-20 text-white text-lg font-semibold ${category.color}`}>
                  {category.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewComplaintCategoryPage;