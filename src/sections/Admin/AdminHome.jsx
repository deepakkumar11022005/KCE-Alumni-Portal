import React from 'react';
import { Users, Bell, Calendar, UserCog } from 'lucide-react';
import { Link } from 'react-router-dom';
import { QuickActionCard, NotificationsSection, AlumniFeedback, AlumniStats } from '../../components';
import './AdminHome.css'


const AdminHome = ({adminAuthData}) => {
  // console.log(JSON.stringify(adminAuthData)+"home");
  
  return (
    <div className="admin-home">
      <div className="admin-header">
        <h1 className="admin-title">KCE Alumni Admin Dashboard</h1>
        <p className="admin-username">{adminAuthData.data.username}</p>
      </div>
      
      <div className="quick-actions">
        <Link to="/admin/manage-alumni">
          <QuickActionCard icon={<Users size={24} />} title="Manage Alumni" description="View and edit alumni data" />
        </Link>
        <Link to="/admin/notification">
          <QuickActionCard icon={<Bell size={24} />} title="Notification" description="Send updates to alumni" />
        </Link>
        <Link to="/admin/event">
          <QuickActionCard icon={<Calendar size={24} />} title="Events" description="Manage upcoming events" />
        </Link>
        <Link to="/admin/profile">
          <QuickActionCard icon={<UserCog size={24} />} title="Profile Updates" description="Review profile changes" />
        </Link>
      </div>
      
      <div className="dashboard-content">
        
       <AlumniStats adminAuthData={adminAuthData}/>
        <AlumniFeedback adminAuthData={adminAuthData}/>
        <NotificationsSection adminAuthData={adminAuthData} />
      </div>
    </div>
  );
};

export default AdminHome;