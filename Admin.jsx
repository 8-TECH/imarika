import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

  const fetchEvents = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/events/');
      if (!res.ok) throw new Error('Failed to fetch events');
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchArticles = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/articles/');
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
    images.forEach(img => formData.append('images', img));

    const url = editingEventId
      ? `http://localhost:8000/api/events/${editingEventId}/`
      : 'http://localhost:8000/api/events/create-with-images/';
    const method = editingEventId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(JSON.stringify(errorData));
      }

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
      const res = await fetch(`http://localhost:8000/api/events/${id}/`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete event');
      fetchEvents();
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

  const handleArticleSubmit = async (e) => {
    e.preventDefault();
    const articleData = { title: articleTitle, content };

    const url = editingArticleId
      ? `http://localhost:8000/api/articles/${editingArticleId}/`
      : 'http://localhost:8000/api/articles/';
    const method = editingArticleId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(articleData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(JSON.stringify(errorData));
      }

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

  const deleteArticle = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/articles/${id}/`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete article');
      fetchArticles();
    } catch (error) {
      console.error(error);
    }
  };

  const editArticle = (article) => {
    setArticleTitle(article.title);
    setContent(article.content);
    setEditingArticleId(article.id);
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
          <div>
            <form onSubmit={handleEventSubmit} encType="multipart/form-data" className="space-y-4 mb-6">
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
                <li
                  key={event.id}
                  className="bg-sky-50 p-4 rounded-xl shadow flex justify-between items-center"
                >
                  <div>
                    <p className="font-bold text-blue-800">{event.title}</p>
                    <p className="text-sm text-blue-600">
                      {event.event_date} - {event.location}
                    </p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => editEvent(event)}
                      className="text-sky-700 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteEvent(event.id)}
                      className="text-orange-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'articles' && (
          <div>
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
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                className="bg-white"
              />
              <button
                type="submit"
                className="bg-sky-500 text-white px-4 py-2 rounded-xl hover:bg-sky-600"
              >
                {editingArticleId ? 'Update Article' : 'Create Article'}
              </button>
            </form>

            <h3 className="text-lg font-semibold text-blue-900 mb-2">All Articles</h3>
            <ul className="space-y-2">
              {articles.map((article) => (
                <li
                  key={article.id}
                  className="bg-sky-50 p-4 rounded-xl shadow flex justify-between items-center"
                >
                  <div>
                    <p className="font-bold text-blue-800">{article.title}</p>
                    <div
                      className="text-sm text-blue-600 max-h-24 overflow-hidden"
                      dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => editArticle(article)}
                      className="text-sky-700 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteArticle(article.id)}
                      className="text-orange-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
