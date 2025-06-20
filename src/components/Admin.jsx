import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Confirmation Dialog Component
const ConfirmationDialog = ({ message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md text-center">
      <p className="mb-4 text-lg text-gray-800">{message}</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onConfirm}
          className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700"
        >
          Yes, I'm sure
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-xl hover:bg-gray-400"
        >
          No, take me back
        </button>
      </div>
    </div>
  </div>
);

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('events');

  // Event States
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState([]);
  const [events, setEvents] = useState([]);
  const [editingEventId, setEditingEventId] = useState(null);

  // Article States
  const [articleTitle, setArticleTitle] = useState('');
  const [content, setContent] = useState('');
  const [articles, setArticles] = useState([]);
  const [editingArticleId, setEditingArticleId] = useState(null);

  // Confirmation Dialog State
  const [confirmDialog, setConfirmDialog] = useState({ show: false, type: null, id: null });

  const fetchEvents = async () => {
    try {
      const [upcomingRes, pastRes] = await Promise.all([
        fetch('https://imarikafoundation.pythonanywhere.com/api/events/upcoming/'),
        fetch('https://imarikafoundation.pythonanywhere.com/api/events/past/'),
      ]);
      if (!upcomingRes.ok || !pastRes.ok) throw new Error('Failed to fetch events');
      const [upcomingEvents, pastEvents] = await Promise.all([
        upcomingRes.json(),
        pastRes.json(),
      ]);
      setEvents([...upcomingEvents, ...pastEvents]);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchArticles = async () => {
    try {
      const res = await fetch('https://imarikafoundation.pythonanywhere.com/api/articles/');
      if (!res.ok) throw new Error('Failed to fetch articles');
      const data = await res.json();
      setArticles(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchArticles();
  }, []);

  const handleImageChange = (e) => setImages([...e.target.files]);

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('event_date', eventDate);
    formData.append('location', location);
    images.forEach((img) => formData.append('images', img));

    const url = editingEventId
      ? `https://imarikafoundation.pythonanywhere.com/api/events/${editingEventId}/`
      : 'https://imarikafoundation.pythonanywhere.com/api/events/create-with-images/';
    const method = editingEventId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, { method, body: formData });
      if (!res.ok) throw new Error('Error submitting event');
      fetchEvents();
      resetEventForm();
    } catch (error) {
      console.error('Error submitting event:', error);
    }
  };

  const resetEventForm = () => {
    setTitle('');
    setDescription('');
    setEventDate('');
    setLocation('');
    setImages([]);
    setEditingEventId(null);
  };

  const deleteEvent = async (id) => {
    try {
      const res = await fetch(`https://imarikafoundation.pythonanywhere.com/api/events/${id}/`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete event');
      fetchEvents();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteArticle = async (id) => {
    try {
      const res = await fetch(`https://imarikafoundation.pythonanywhere.com/api/articles/${id}/`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete article');
      fetchArticles();
    } catch (error) {
      console.error(error);
    }
  };

  const editEvent = (event) => {
    setTitle(event.title);
    setDescription(event.description);
    setEventDate(event.event_date);
    setLocation(event.location);
    setEditingEventId(event.id);
  };

  const editArticle = (article) => {
    setArticleTitle(article.title);
    setContent(article.content);
    setEditingArticleId(article.id);
  };

  const handleArticleSubmit = async (e) => {
    e.preventDefault();
    const articleData = { title: articleTitle, content };

    const url = editingArticleId
      ? `https://imarikafoundation.pythonanywhere.com/api/articles/${editingArticleId}/`
      : 'https://imarikafoundation.pythonanywhere.com/api/articles/';
    const method = editingArticleId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(articleData),
      });

      if (!res.ok) throw new Error('Error submitting article');
      fetchArticles();
      resetArticleForm();
    } catch (error) {
      console.error('Error submitting article:', error);
    }
  };

  const resetArticleForm = () => {
    setArticleTitle('');
    setContent('');
    setEditingArticleId(null);
  };

  const handleDelete = (type, id) => {
    setConfirmDialog({ show: true, type, id });
  };

  const confirmDelete = () => {
    const { type, id } = confirmDialog;
    if (type === 'event') deleteEvent(id);
    else if (type === 'article') deleteArticle(id);
    setConfirmDialog({ show: false, type: null, id: null });
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-sky-100 via-blue-50 to-orange-50 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-6 border-t-4 border-orange-500">
        <h1 className="text-3xl font-bold text-darkblue-900 text-center mb-6">Admin Panel</h1>

        <div className="flex justify-center gap-4 mb-6">
          <button
            className={`px-5 py-2 font-semibold rounded-xl shadow ${
              activeTab === 'events' ? 'bg-orange-500 text-white' : 'bg-blue-100 text-blue-800'
            }`}
            onClick={() => setActiveTab('events')}
          >
            Manage Events
          </button>
          <button
            className={`px-5 py-2 font-semibold rounded-xl shadow ${
              activeTab === 'articles' ? 'bg-orange-500 text-white' : 'bg-blue-100 text-blue-800'
            }`}
            onClick={() => setActiveTab('articles')}
          >
            Manage Articles
          </button>
        </div>

        {activeTab === 'events' && (
          <>
            <form onSubmit={handleEventSubmit} className="space-y-4 mb-6" encType="multipart/form-data">
              <h2 className="text-xl font-semibold text-darkblue-900">Create / Edit Event</h2>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full p-2 border border-blue-300 rounded-xl"
                required
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="w-full p-2 border border-blue-300 rounded-xl"
                rows={4}
                required
              />
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full p-2 border border-blue-300 rounded-xl"
                required
              />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="w-full p-2 border border-blue-300 rounded-xl"
                required
              />
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border border-blue-300 rounded-xl"
              />
              <button className="bg-sky-500 text-white px-4 py-2 rounded-xl hover:bg-sky-600">
                {editingEventId ? 'Update Event' : 'Create Event'}
              </button>
            </form>

            <h3 className="text-lg font-semibold text-blue-900 mb-2">All Events</h3>
            <ul className="space-y-2">
              {events.map((event) => (
                <li key={event.id} className="bg-sky-50 p-4 rounded-xl shadow flex justify-between items-center">
                  <div>
                    <p className="font-bold text-blue-800">{event.title}</p>
                    <p className="text-sm text-blue-600">{event.event_date} - {event.location}</p>
                  </div>
                  <div className="space-x-2">
                    <button onClick={() => editEvent(event)} className="text-sky-700 hover:underline">Edit</button>
                    <button onClick={() => handleDelete('event', event.id)} className="text-orange-600 hover:underline">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        {activeTab === 'articles' && (
          <>
            <form onSubmit={handleArticleSubmit} className="space-y-4 mb-6">
              <h2 className="text-xl font-semibold text-darkblue-900">Create / Edit Article</h2>
              <input
                type="text"
                value={articleTitle}
                onChange={(e) => setArticleTitle(e.target.value)}
                placeholder="Article Title"
                className="w-full p-2 border border-blue-300 rounded-xl"
                required
              />
              <ReactQuill theme="snow" value={content} onChange={setContent} className="bg-white" />
              <button type="submit" className="bg-sky-500 text-white px-4 py-2 rounded-xl hover:bg-sky-600">
                {editingArticleId ? 'Update Article' : 'Create Article'}
              </button>
            </form>

            <h3 className="text-lg font-semibold text-blue-900 mb-2">All Articles</h3>
            <ul className="space-y-2">
              {articles.map((article) => (
                <li key={article.id} className="bg-sky-50 p-4 rounded-xl shadow flex justify-between items-center">
                  <div>
                    <p className="font-bold text-blue-800">{article.title}</p>
                  </div>
                  <div className="space-x-2">
                    <button onClick={() => editArticle(article)} className="text-sky-700 hover:underline">Edit</button>
                    <button onClick={() => handleDelete('article', article.id)} className="text-orange-600 hover:underline">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        {confirmDialog.show && (
          <ConfirmationDialog
            message="Are you sure you want to delete this item?"
            onConfirm={confirmDelete}
            onCancel={() => setConfirmDialog({ show: false, type: null, id: null })}
          />
        )}
      </div>
    </div>
  );
}
