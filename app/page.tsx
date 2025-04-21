"use client";
import { useState, useEffect } from "react";
import GuestForm from "@/Components/GuestForm";
import GuestList from "@/Components/GuestList";

interface Guest {
  name: string;
  email: string;
  rsvp: boolean;
}

export default function HomePage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  // Set isClient to true once component mounts on client
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Only access localStorage after confirming we're on the client
  useEffect(() => {
    if (isClient) {
      const storedGuests = localStorage.getItem("eventGuests");
      if (storedGuests) {
        setGuests(JSON.parse(storedGuests));
      }
    }
  }, [isClient]);
  
  // Update localStorage whenever guests state changes (only on client)
  useEffect(() => {
    if (isClient && guests.length > 0) {
      localStorage.setItem("eventGuests", JSON.stringify(guests));
    }
  }, [guests, isClient]);

  const handleAddGuest = (guest: Guest) => {
    setGuests((prev) => [...prev, guest]);
    setShowModal(false);
  };

  const handleToggleRSVP = (index: number) => {
    setGuests((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], rsvp: !updated[index].rsvp };
      return updated;
    });
  };

  const handleDeleteGuest = (index: number) => {
    setGuests((prev) => prev.filter((_, i) => i !== index));
  };

  const total = guests.length;
  const confirmed = guests.filter((g) => g.rsvp).length;
  const unconfirmed = total - confirmed;

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Event Guest List</h1>
        
        {/* Summary Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">Total Guests</p>
              <p className="text-3xl font-bold text-blue-600">{total}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">Confirmed</p>
              <p className="text-3xl font-bold text-green-600">{confirmed}</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">Unconfirmed</p>
              <p className="text-3xl font-bold text-yellow-600">{unconfirmed}</p>
            </div>
          </div>
        </div>
        
        {/* Guest List Section with Add Button */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Guest List</h2>
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Guest
            </button>
          </div>
          
          <GuestList
            guests={guests}
            onToggleRSVP={handleToggleRSVP}
            onDeleteGuest={handleDeleteGuest}
          />
        </div>
      </div>
      
      {/* Modal for Guest Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Add New Guest</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <GuestForm onAddGuest={handleAddGuest} />
          </div>
        </div>
      )}
    </main>
  );
}
