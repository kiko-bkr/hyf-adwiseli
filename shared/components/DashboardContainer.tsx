'use client';
import { useState } from 'react';
// Suppose the hook is imported from this path:
import useDashBoardData from '../hooks/useDashBoardData';

function DashboardContainer() {
  // Determine user type (brand or influencer)
  const [userType, setUserType] = useState('brand');

  // Call the hook with userType, destructuring 'cards' instead of 'data'
  const { cards, loading, error } = useDashBoardData(userType);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="bg-white rounded-xl p-8 shadow">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-xl font-bold">Statistics Overview</h1>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="text-gray-500">Loading...</div>
          )}

          {/* Error state */}
          {error && (
            <div className="text-red-600">Error: {error.message || 'Something went wrong'}</div>
          )}

          {/* Display cards if they exist */}
          {cards && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200"
                >
                  <p className="text-gray-500 text-sm">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
export default DashboardContainer;
