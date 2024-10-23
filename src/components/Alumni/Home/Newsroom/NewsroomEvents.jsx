import React, { useEffect, useState } from 'react';
import './NewsroomEvents.css';
import Loading from '../../Loading/Loading';

// News item component
const NewsItem = ({ title, date }) => (
    <div className="news-item">
        <a className='news-title'>{title}</a>
        <p>{date}</p>
    </div>
);

// Event item component with required format
const EventItem = ({ month, date, title, location }) => (
    <div className="event-item">
        <div className="event-date">
            <div className="event-month">{month}</div>
            <div className="event-day">{date}</div>
        </div>
        <div className="event-info">
            <p className="past-label">PAST</p>
            <h3>{title}</h3>
            <p >{location}</p>
        </div>
    </div>
);

// Newsroom section component with "View More" link
const NewsroomSection = ({ news }) => (
    <div className="section newsroom-section">
        <div className="section-header">
            <h2>NEWSROOM</h2>
            <a href="/alumni/newsroom" className="view-more">View More</a>
        </div>
        <div className="section-content">
            {news.map((item) => (
                <NewsItem 
                    key={item._id} 
                    title={item.title} 
                    date={item.date} 
                />
            ))}
        </div>
    </div>
);

// Events section component with "View More" link
const EventsSection = ({ events }) => (
    <div className="section events-section">
        <div className="section-header">
            <h2>EVENTS</h2>
            <a href="/alumni/events" className="view-more">View More</a>
        </div>
        <div className="section-content">
            {events.map(event => {
                const eventDate = new Date(event.event_date);
                const month = eventDate.toLocaleString('default', { month: 'short' }).toUpperCase();
                const date = eventDate.getDate();
                return (
                    <EventItem
                        key={event._id}
                        month={month}
                        date={date}
                        title={event.event_name}
                        location={event.event_venue}
                    />
                );
            })}
        </div>
    </div>
);

// Main component for fetching news and events
const NewsroomEvents = () => {
    const [news, setNews] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch news
    useEffect(() => {
        fetch('https://alumni-apis.vercel.app/news?page=1&limit=5&sort=batch&order=desc')
            .then(response => response.json())
            .then(data => {
                setNews(data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching the news:', error);
                setLoading(false);
            });
    }, []);

    // Fetch events
    useEffect(() => {
        fetch('https://alumni-apis.vercel.app/events?page=1&limit=2&sort=batch&order=desc')
            .then(response => response.json())
            .then(data => {
                setEvents(data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching the events:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Loading/>;
    }

    return (
        <div className="newsroom-events-container">
            <NewsroomSection news={news} />
            <EventsSection events={events} />
        </div>
    );
};

export default NewsroomEvents;
