"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PrivateRoute from "@/components/PrivetRoute/PrivetRoute";
import { toast } from "react-toastify";

function ManageEventsContent() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [imageLoadStates, setImageLoadStates] = useState({});
  const { data: session } = useSession();
  const router = useRouter();


  const fetchMyEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`);

      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }

      const allEvents = await response.json();
      
      const myEvents = allEvents.filter(
        (event) => event.organizer === session.user.id
      );
      setEvents(myEvents);
      
    
      const initialLoadStates = {};
      myEvents.forEach(event => {
        initialLoadStates[event._id] = { loaded: false, error: false };
      });
      setImageLoadStates(initialLoadStates);
    } catch (err) {
      setError("Error loading your events. Please try again.");
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchMyEvents();
    }
  }, [session]);

  const handleImageLoad = (eventId) => {
    setImageLoadStates(prev => ({
      ...prev,
      [eventId]: { ...prev[eventId], loaded: true }
    }));
  };

  const handleImageError = (eventId) => {
    setImageLoadStates(prev => ({
      ...prev,
      [eventId]: { loaded: true, error: true }
    }));
  };


  const handleDeleteEvent = async (eventId, eventTitle) => {
    
    const eventToDelete = events.find(event => event._id === eventId);
    
    if (!eventToDelete) {
      toast.error("Event not found!");
      return;
    }

    if (eventToDelete.organizer !== session.user.id) {
      toast.error("You are not authorized to delete this event. You can only delete events that you created.");
      return;
    }

    if (!window.confirm(`Are you sure you want to delete "${eventTitle}"? This action cannot be undone.`)) {
      return;
    }

    setDeleteLoading(eventId);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/${eventId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
      
        setEvents(events.filter((event) => event._id !== eventId));
        toast.success("Event deleted successfully!");
      } else if (response.status === 403) {
        toast.error("You are not authorized to delete this event. Please make sure you are the event organizer.");
      } else if (response.status === 404) {
        toast.error("Event not found. It may have been already deleted.");
       
        fetchMyEvents();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'Failed to delete event'}`);
      }
    } catch (err) {
      console.error("Error deleting event:", err);
      toast.error("Failed to delete event. Please check your internet connection and try again.");
    } finally {
      setDeleteLoading(null);
    }
  };


  const handleEditEvent = (event) => {
  
    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toISOString().slice(0, 16);
    
    setEditingEvent({ 
      ...event, 
      date: formattedDate 
    });
  };


  const handleCancelEdit = () => {
    setEditingEvent(null);
  };


  const handleUpdateEvent = async (e) => {
    e.preventDefault();

    if (!editingEvent) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/${editingEvent._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: editingEvent.title,
            shortDescription: editingEvent.shortDescription,
            fullDescription: editingEvent.fullDescription,
            price: parseFloat(editingEvent.price),
            date: editingEvent.date,
            category: editingEvent.category,
            location: editingEvent.location,
            imageUrl: editingEvent.imageUrl,
            organizer: session.user.id,
          }),
        }
      );

      if (response.ok) {
     
        setEvents(
          events.map((event) =>
            event._id === editingEvent._id ? editingEvent : event
          )
        );
        setEditingEvent(null);
        toast.success("Event updated successfully!");
      } else {
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (err) {
      console.error("Error updating event:", err);
      toast.error("Failed to update event");
    }
  };


  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingEvent({
      ...editingEvent,
      [name]: value,
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleString('en-US', { month: 'short' }),
      weekday: date.toLocaleString('en-US', { weekday: 'short' })
    };
  };


  const renderEditForm = () => {
    if (!editingEvent) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Edit Event</h2>
              <button
                onClick={handleCancelEdit}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleUpdateEvent} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Event Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={editingEvent.title}
                  onChange={handleEditChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  required
                />
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Short Description *
                </label>
                <textarea
                  name="shortDescription"
                  rows="3"
                  value={editingEvent.shortDescription}
                  onChange={handleEditChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  required
                />
              </div>

              {/* Full Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Full Description *
                </label>
                <textarea
                  name="fullDescription"
                  rows="5"
                  value={editingEvent.fullDescription}
                  onChange={handleEditChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  required
                />
              </div>

              {/* Price and Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    min="0"
                    step="0.01"
                    value={editingEvent.price}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Event Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    name="date"
                    value={editingEvent.date}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Category and Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={editingEvent.category}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Technology">Technology</option>
                    <option value="Music">Music</option>
                    <option value="Business">Business</option>
                    <option value="Sports">Sports</option>
                    <option value="Arts">Arts</option>
                    <option value="Food">Food</option>
                    <option value="Education">Education</option>
                    <option value="Health">Health</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={editingEvent.location}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={editingEvent.imageUrl}
                  onChange={handleEditChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-gray-500 text-sm mt-2">
                  Optional. Leave empty to use the current image.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Update Event
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchMyEvents}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                EventHub
              </Link>
              <nav className="ml-10 flex space-x-8">
                <Link href="/all-events" className="text-gray-500 hover:text-gray-900 font-medium">
                  Browse Events
                </Link>
                <Link href="/manage-event" className="text-blue-600 font-medium">
                  My Events
                </Link>
                <Link href="/add-events" className="text-gray-500 hover:text-gray-900 font-medium">
                  Create Event
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {session?.user?.name}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Manage Your Events
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Edit, update, or manage all events you have created
          </p>
        </div>

        {/* Stats and Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{events.length}</div>
                <div className="text-sm text-gray-600">Total Events</div>
              </div>
              <div className="h-12 w-px bg-gray-200"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {events.filter(event => new Date(event.date) > new Date()).length}
                </div>
                <div className="text-sm text-gray-600">Upcoming</div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <Link
                href="/all-events"
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold"
              >
                Browse Events
              </Link>
              <Link
                href="/add-events"
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create New Event
              </Link>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {events.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Events Yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You have not created any events yet. Start by creating your first event and share it with the world!
            </p>
            <Link
              href="/add-events"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Your First Event
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {events.map((event) => {
              const dateInfo = formatDate(event.date);
              const imageState = imageLoadStates[event._id] || { loaded: false, error: false };
              const isUpcoming = new Date(event.date) > new Date();

              return (
                <div key={event._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                  {/* Event Image */}
                  <div className="relative h-48 overflow-hidden">
                    {!imageState.loaded && (
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <img 
                      src={imageState.error ? '/default-event.jpg' : (event.imageUrl || '/default-event.jpg')} 
                      alt={event.title}
                      className={`w-full h-full object-cover transition-all duration-500 ${
                        imageState.loaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={() => handleImageLoad(event._id)}
                      onError={() => handleImageError(event._id)}
                    />
                    
                    {/* Date Badge */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-3 text-center min-w-14">
                      <div className="text-lg font-bold text-gray-900 leading-none">{dateInfo.day}</div>
                      <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide">{dateInfo.month}</div>
                    </div>

                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-2 rounded-xl shadow-lg font-bold text-sm">
                      ${event.price === 0 ? 'Free' : event.price}
                    </div>

                    {/* Status Badge */}
                    <div className="absolute bottom-4 left-4">
                      <div className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        isUpcoming 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {isUpcoming ? 'Upcoming' : 'Past Event'}
                      </div>
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-900 line-clamp-2 flex-1 mr-2">
                        {event.title}
                      </h3>
                    </div>

                    {/* Category */}
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-3">
                      {event.category}
                    </span>

                    {/* Description */}
                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
                      {event.shortDescription}
                    </p>

                    {/* Event Details */}
                    <div className="space-y-2 text-sm text-gray-500 mb-6">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleEditEvent(event)}
                        className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold text-sm flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event._id, event.title)}
                        disabled={deleteLoading === event._id}
                        className="flex-1 bg-red-600 text-white py-2.5 rounded-xl hover:bg-red-700 transition-all duration-200 font-semibold text-sm flex items-center justify-center disabled:opacity-50"
                      >
                        {deleteLoading === event._id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                          <>
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-gray-600">&copy; 2024 EventHub. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Edit Form Modal */}
      {renderEditForm()}
    </div>
  );
}

export default function ManageEvent() {
  return (
    <PrivateRoute>
      <ManageEventsContent />
    </PrivateRoute>
  );
}