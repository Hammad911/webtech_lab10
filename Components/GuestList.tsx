"use client"

interface Guest {
  name: string;
  email: string;
  rsvp: boolean;
}

interface GuestListProps {
  guests: Guest[];
  onToggleRSVP: (index: number) => void;
  onDeleteGuest: (index: number) => void;
}

export default function GuestList({ guests, onToggleRSVP, onDeleteGuest }: GuestListProps) {
  return (
    <div>
      {guests.length === 0 ? (
        <div className="text-center py-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="mt-2 text-gray-500">No guests yet. Add some guests to get started!</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <ul className="divide-y divide-gray-200">
            {guests.map((guest, i) => (
              <li key={i} className="bg-white hover:bg-gray-50">
                <div className="flex items-center justify-between p-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">{guest.name}</h3>
                    <p className="text-sm text-gray-500">{guest.email}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      guest.rsvp ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {guest.rsvp ? 'Confirmed' : 'Pending'}
                    </span>
                    
                    <button
                      onClick={() => onToggleRSVP(i)}
                      className={`inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                        guest.rsvp ? 'bg-purple-600 hover:bg-purple-700' : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      {guest.rsvp ? 'Unconfirm' : 'Confirm'}
                    </button>
                    
                    <button
                      onClick={() => onDeleteGuest(i)}
                      className="inline-flex items-center p-1 border border-transparent text-sm font-medium rounded-md text-red-600 hover:bg-red-100"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}