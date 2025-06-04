import axios from 'axios';
import { useEffect, useState, useRef } from 'react';

const ArticlesSection = () => {
  const [articles, setArticles] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null); // Ref for the section container

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/articles/')
      .then(res => {
        setArticles(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching articles:', err);
        setLoading(false);
      });
  }, []);

  const toggleExpand = (id) => {
    if (expandedId === id) {
      // Collapsing the article
      setExpandedId(null);

      // Scroll back to the articles section smoothly
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Expanding the article
      setExpandedId(id);
    }
  };

  const truncateText = (text, limit = 250) => {
    if (!text) return "";
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  if (loading) {
    return (
      <section ref={sectionRef} id="articles" className="py-20 px-4 sm:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto flex justify-center items-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return (
      <section ref={sectionRef} id="articles" className="py-20 px-4 sm:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800">Latest Articles</h2>
          <p className="text-center text-gray-500">No articles available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="articles" className="py-20 px-4 sm:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800">Latest Articles</h2>

        {expandedId ? (
          <article className="bg-white rounded-xl shadow-md border p-8 max-w-full mx-auto">
            <h3 className="text-3xl font-bold text-blue-700 mb-6">
              {articles.find(a => a.id === expandedId)?.title}
            </h3>
            <p className="text-gray-700 whitespace-pre-line text-lg">
              {articles.find(a => a.id === expandedId)?.content}
            </p>
            <div className="mt-6 text-right">
              <button
                onClick={() => toggleExpand(expandedId)}
                className="px-6 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
              >
                Read Less
              </button>
            </div>
          </article>
        ) : (
          <div
            className="flex space-x-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200"
            style={{ scrollBehavior: 'smooth' }}
          >
            {articles.map(article => (
              <div
                key={article.id}
                className="bg-white rounded-xl shadow-sm border hover:shadow-md transition p-6 flex-shrink-0 min-w-[320px] flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-blue-700 mb-3">{article.title}</h3>
                  <p className="text-gray-700 text-sm whitespace-pre-line">
                    {truncateText(article.content)}
                  </p>
                </div>

                <div className="mt-4 text-right">
                  <button
                    onClick={() => toggleExpand(article.id)}
                    className="text-sm text-blue-600 hover:underline font-medium"
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ArticlesSection;
