import React from 'react';
import { Link } from 'react-router-dom';

const SettingsPage = () => {
  return (
    <div className="min-vh-100" style={{ background: 'linear-gradient(135deg, #EFFAFD 0%, #A0006D 100%)', padding: '5rem 0' }}>
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-4" style={{ color: '#111827', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>Account Settings</h1>
          <p className="lead mb-5" style={{ color: '#2c2c2c', fontSize: '1.25rem' }}>
            Manage your profile, security, and preferences.
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 rounded-4 p-4 text-center" style={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <div className="mb-3" style={{ background: 'linear-gradient(135deg, #4A8BDF, #3A7BC8)', borderRadius: '50%', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="bi bi-person-circle" style={{ fontSize: '2.5rem', color: 'white' }}></i>
                </div>
                <h5 className="card-title mb-3" style={{ color: '#111827', fontWeight: '600' }}>Edit Profile</h5>
                <p className="card-text mb-4" style={{ color: '#2c2c2c' }}>Update your personal information.</p>
                <Link
                  to="/profile"
                  className="btn mt-auto"
                  style={{
                    background: 'transparent',
                    border: '2px solid #4A8BDF',
                    color: '#4A8BDF',
                    borderRadius: '25px',
                    padding: '0.5rem 1.5rem',
                    fontWeight: '500',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    display: 'inline-block'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = '#4A8BDF';
                    e.target.style.color = 'white';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#4A8BDF';
                  }}
                >
                  Go to Profile
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 rounded-4 p-4 text-center" style={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <div className="mb-3" style={{ background: 'linear-gradient(135deg, #A0006D, #8B005A)', borderRadius: '50%', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="bi bi-shield-lock" style={{ fontSize: '2.5rem', color: 'white' }}></i>
                </div>
                <h5 className="card-title mb-3" style={{ color: '#111827', fontWeight: '600' }}>Security</h5>
                <p className="card-text mb-4" style={{ color: '#2c2c2c' }}>Change your password or manage security settings.</p>
                <Link
                  to="/settings/security"
                  className="btn mt-auto text-white"
                  style={{
                    background: 'linear-gradient(135deg, #4A8BDF, #3A7BC8)',
                    border: 'none',
                    borderRadius: '25px',
                    padding: '0.5rem 1.5rem',
                    fontWeight: '500',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(74, 139, 223, 0.3)',
                    display: 'inline-block'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(74, 139, 223, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(74, 139, 223, 0.3)';
                  }}
                >
                  Manage Security
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 rounded-4 p-4 text-center" style={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <div className="mb-3" style={{ background: 'linear-gradient(135deg, #A0006D, #8B005A)', borderRadius: '50%', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="bi bi-gear" style={{ fontSize: '2.5rem', color: 'white' }}></i>
                </div>
                <h5 className="card-title mb-3" style={{ color: '#111827', fontWeight: '600' }}>Preferences</h5>
                <p className="card-text mb-4" style={{ color: '#2c2c2c' }}>Adjust your notification and display preferences.</p>
                <Link
                  to="/settings/preferences"
                  className="btn mt-auto"
                  style={{
                    background: 'transparent',
                    border: '2px solid #A0006D',
                    color: '#A0006D',
                    borderRadius: '25px',
                    padding: '0.5rem 1.5rem',
                    fontWeight: '500',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    display: 'inline-block'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = '#A0006D';
                    e.target.style.color = 'white';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#A0006D';
                  }}
                >
                  Edit Preferences
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
