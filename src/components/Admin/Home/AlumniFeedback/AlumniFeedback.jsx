import React, { useState, useEffect } from 'react';
import { MessageCircle, ChevronDown, AlertCircle, Loader } from 'lucide-react';
import './AlumniFeedback.css'
const AlumniFeedback = ({adminAuthData}) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
     
      
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/feedback`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminAuthData?.token}`,
          },
        });
  
        const result = await response.json();
  
        if (result.success) {
          setFeedbacks(result.data);
        } else {
          throw new Error("Failed to fetch feedback");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchFeedbacks();
  }, [adminAuthData]);  
  

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <div className="admin-feedback-section">
        <div className="admin-feedback-loading">
          <Loader className="admin-feedback-spinner" />
          <p>Loading feedback...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-feedback-section">
        <div className="admin-feedback-error">
          <AlertCircle />
          <p>Error loading feedback: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-feedback-section">
      <div className="admin-feedback-header">
        <h2>
          <MessageCircle size={24} className="text-primary" />
          Alumni Feedback
          <span className="admin-feedback-count">{feedbacks.length}</span>
        </h2>
      </div>
      
      <div className="admin-feedback-container">
        {feedbacks.map((feedback) => (
          <div 
            key={feedback._id}
            className={`admin-feedback-item ${expandedId === feedback._id ? 'active' : ''}`}
          >
            <div className="admin-feedback-main" onClick={() => toggleExpand(feedback._id)}>
              <div className="admin-feedback-left">
                <h3 className="admin-feedback-title">
                  {feedback.subject}
                  <span className="admin-feedback-name">{feedback.name}</span>
                </h3>
              </div>
              <div className="admin-feedback-right">
                <span className="admin-feedback-contact">{feedback.contact_no}</span>
                <ChevronDown 
                  className={`dropdown-icon ${expandedId === feedback._id ? 'expanded' : ''}`}
                  size={20}
                />
              </div>
            </div>
            
            {expandedId === feedback._id && (
              <div className="admin-feedback-expand">
                <p className="admin-feedback-content">{feedback.description}</p>
                <div className="admin-feedback-details">
                  <span className="admin-feedback-email">
                    Email: {feedback.email}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlumniFeedback;