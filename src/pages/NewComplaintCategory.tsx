"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const categories = [
  { name: "Potholes/Road Damage" }, // Removed color property
  { name: "Water Leakage" },
  { name: "Broken Streetlights" },
  { name: "Illegal Dumping" },
  { name: "Garbage" },
  { name: "Amenities" },
  { name: "Other" },
];

const NewComplaintCategory: React.FC = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName: string) => {
    console.log(`Selected category: ${categoryName}`);
    // In a real app, you would navigate to a form page with this category pre-selected
    // navigate(`/new-complaint-form?category=${categoryName}`);
  };

  return (
    <> {/* Use a fragment as the main card is now in Layout */}
      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">What issue would you like to report?</h2> {/* Changed to h2 */}
      <p className="text-md md:text-lg text-gray-600 mb-8">Select a category to report a new issue.</p>

      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <div key={category.name}>
            <Button
              onClick={() => handleCategoryClick(category.name)}
              className={cn(
                "flex flex-col items-center justify-center text-white p-4 rounded-lg shadow-button-3d border border-transparent w-full h-24 text-center transition-all transform hover:scale-105 active:scale-95", // Added shadow, hover, active effects
                "bg-gradient-to-br from-button-gradient-start to-button-gradient-end" // Applied new gradient
              )}
            >
              <span className="text-lg font-semibold text-wrap">{category.name}</span>
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};

export default NewComplaintCategory;