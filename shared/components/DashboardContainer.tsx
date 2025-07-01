'use client';
import { useState } from 'react';
// Suppose the hook is imported from this path:
import useDashBoardData from '@/hooks/useDashBoardData';
function DashboardContainer() {
  // Determine user type (brand or influencer)
  const [userType, setUserType] = useState('brand');
  // Call the hook with userType
  const { data, loading, error } = useDashBoardData(userType);
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-50 p-6 border-r border-gray-200">
        <div className="mb-8 flex items-center space-x-2">
          <div className="w-4 h-4 bg-orange-500 mb-2"></div>
          <p className="text-sm font-semibold">Creator Name</p>
        </div>
        <nav className="space-y-6 text-sm">
          <div>
            <p className="text-gray-400 uppercase tracking-wide mb-2">General</p>
            <ul className="space-y-1">
              <li className="text-gray-900 font-medium">Dashboard</li>
            </ul>
          </div>
          <div>
            <p className="text-gray-400 uppercase tracking-wide mb-2">Messaging</p>
            <ul className="space-y-1">
              <li className="text-gray-700">Inbox</li>
            </ul>
          </div>
          <div>
            <p className="text-gray-400 uppercase tracking-wide mb-2">Support</p>
            <ul className="space-y-1">
              <li className="text-gray-700">Ask a question</li>
              <li className="text-gray-700">More about us</li>
              <li className="text-gray-700">Report an issue</li>
            </ul>
          </div>
        </nav>
      </aside>
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
          {/* Display cards if data exists */}
          {data && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.map((card, index) => (
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