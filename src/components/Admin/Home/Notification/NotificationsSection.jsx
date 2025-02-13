import React, { useState, useMemo } from 'react';
import { ChevronDown, Bell, Check, AlertCircle, Clock, Info } from 'lucide-react';
import './NotificationsSection.css'
const NotificationsSection = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Alumni Registration Request",
      content: "John Doe (Batch 2020) has submitted a registration request. Please review their profile and credentials for approval.",
      timestamp: "2025-02-14T10:30:00",
      read: false,
      priority: "high"
    },
    {
      id: 2,
      title: "Annual Alumni Meet Registration Update",
      content: "25 alumni members have registered for the upcoming Annual Meet 2025. View complete registration details and manage event logistics.",
      timestamp: "2025-02-14T09:15:00",
      read: true,
      priority: "medium"
    },
    {
      id: 3,
      title: "Profile Update Requests Pending",
      content: "5 alumni members have requested profile updates. Changes include employment status, contact information, and achievement updates.",
      timestamp: "2025-02-13T16:45:00",
      read: false,
      priority: "high"
    },
    {
        id: 4,
        title: "Profile Update Requests Pending",
        content: "5 alumni members have requested profile updates. Changes include employment status, contact information, and achievement updates.",
        timestamp: "2025-02-13T16:45:00",
        read: false,
        priority: "high"
      },
      {
        id: 5,
        title: "Profile Update Requests Pending",
        content: "5 alumni members have requested profile updates. Changes include employment status, contact information, and achievement updates.",
        timestamp: "2025-02-13T16:45:00",
        read: false,
        priority: "high"
      },
      {
        id: 6,
        title: "Profile Update Requests Pending",
        content: "5 alumni members have requested profile updates. Changes include employment status, contact information, and achievement updates.",
        timestamp: "2025-02-13T16:45:00",
        read: false,
        priority: "high"
      },
      {
        id: 7,
        title: "Profile Update Requests Pending",
        content: "5 alumni members have requested profile updates. Changes include employment status, contact information, and achievement updates.",
        timestamp: "2025-02-13T16:45:00",
        read: false,
        priority: "high"
      }
  ]);

  const [expandedId, setExpandedId] = useState(null);

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  // Sort notifications by priority and read status
  const sortedNotifications = useMemo(() => {
    return [...notifications].sort((a, b) => {
      // First sort by read status
      if (!a.read && b.read) return -1;
      if (a.read && !b.read) return 1;
      
      // Then sort by priority
      const priorityOrder = { high: 0, medium: 1, normal: 2 };
      if (priorityOrder[a.priority] < priorityOrder[b.priority]) return -1;
      if (priorityOrder[a.priority] > priorityOrder[b.priority]) return 1;
      
      // Finally sort by timestamp
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
  }, [notifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <AlertCircle size={14} className="text-red-500" />;
      case 'medium':
        return <Clock size={14} className="text-yellow-500" />;
      default:
        return <Info size={14} className="text-green-500" />;
    }
  };

  return (
    <div className="notifications-section">
      <div className="notification-header">
        <h2>
          <Bell size={24} className="text-primary" />
          Notifications
          {unreadCount > 0 && (
            <span className="notification-count">{unreadCount}</span>
          )}
        </h2>
      </div>
      <div className="notifications-container">
        {sortedNotifications.map(notification => (
          <div 
            key={notification.id} 
            className={`notification-item ${expandedId === notification.id ? 'active' : ''}`}
          >
            <div className="notification-main" onClick={() => toggleExpand(notification.id)}>
              <div className="notification-left">
                <h3 className="notification-title">
                  {notification.title}
                  <span className={`priority-indicator priority-${notification.priority}`}>
                    {/* {getPriorityIcon(notification.priority)} */}
                    {notification.priority}
                  </span>
                </h3>
              </div>
              <div className="notification-right">
                <div className="notification-status">
                  {/* <div className={`status-dot ${notification.read ? 'read' : 'unread'}`} /> */}
                  {notification.read ? 'Read' : 'Unread'}
                </div>
                <span className="notification-time">
                  {formatDate(notification.timestamp)}
                </span>
                <ChevronDown 
                  className={`dropdown-icon ${expandedId === notification.id ? 'expanded' : ''}`}
                  size={20}
                />
              </div>
            </div>
            
            {expandedId === notification.id && (
              <div className="notification-expand">
                <p className="notification-content">{notification.content}</p>
                {!notification.read && (
                  <div className="notification-actions">
                    <button 
                      className="mark-read-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkAsRead(notification.id);
                      }}
                    >
                      <Check size={16} />
                      Mark as Read
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsSection;