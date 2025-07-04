'use client';
import { useState } from 'react';
// import useDashBoardData from '../hooks/useDashBoardData'; // Temporarily disabled - hook not merged

function DashboardContainer() {
  const [userType, setUserType] = useState('brand');

  // Placeholder data until useDashBoardData is merged
  const cards = [
    { title: 'Total Campaigns', value: 12 },
    { title: 'Active Influencers', value: 34 },
    { title: 'Pending Approvals', value: 5 },
  ];
  const loading = false;
  const error = null;

  // const { cards, loading, error } = useDashBoardData(userType); // To be used when hook is ready

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-8">
        <div className="bg-white rounded-xl p-8 shadow">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-xl font-bold">Statistics Overview</h1>
          </div>

          {loading && <div className="text-gray-500">Loading...</div>}
          {error && <div className="text-red-600">Error: {error.message || 'Something went wrong'}</div>}

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
