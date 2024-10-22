import React from 'react';
import './NewsroomEvents.css';

const NewsItem = ({ title, date }) => (
    <div className="news-item">
        <a>{title}</a>
        <p>{date}</p>
    </div>
);

const EventItem = ({ date, month, title, location }) => (
    <div className="event-item">
        <div className="event-date">
            <div className="event-month">{month}</div>
            <div className="event-day">{date}</div>
        </div>
        <div className="event-info">
            <p className="past-label">PAST</p>
            <h3>{title}</h3>
            <p>{location}</p>
        </div>
    </div>
);

const NewsroomSection = () => (
    <div className="section newsroom-section">
        <h2>NEWSROOM</h2>
        <div className="section-content">
            <NewsItem title="INDUSTRY ALUMNI - CIT ADVISORY BOARD" date="24 Apr 2024" />
            <NewsItem title="CIT INSTITUTE DAY CELEBRATION 2024" date="8 Apr 2024" />
            <NewsItem title="CIT 1973 Batch Golden Jubilee celebrations" date="28 Dec 2023" />
            <NewsItem title="In Loving Memory of Mrs. Rajeswary Ramakrishnan: A Pillar of..." date="28 Dec 2023" />
            <NewsItem title="IGNATIA 2023 – Step into the World of Startup" date="5 Dec 2023" />
        </div>
    </div>
);

const EventsSection = () => (
    <div className="section events-section">
        <h2>EVENTS</h2>
        <div className="section-content">
            <div className='single-event'>
                <EventItem
                    month="DEC"
                    date="28"
                    title="CIT 1973 Batch Golden Jubilee celebrations"
                    location="Conference Hall, Main building"
                />
            </div>
            <div className='single-event'>
                <EventItem
                    month="DEC"
                    date="28"
                    title="CIT 1973 Batch Golden Jubilee celebrations"
                    location="Conference Hall, Main building"
                />
            </div>
        </div>
    </div>
);

const NewsroomEvents = () => (
    <div className="newsroom-events-container">
        <NewsroomSection />
        <EventsSection />
    </div>
);

export default NewsroomEvents;