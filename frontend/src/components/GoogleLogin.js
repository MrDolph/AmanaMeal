import React, { useEffect, useState } from 'react';

export default function GoogleLogin() {
  const [user, setUser] = useState(null);    
  
useEffect(() => {
    const handleCredentialResponse = (response) => {
        const token = response.credential;
        const userObject = decodeJwtResponse(token);
        setUser(userObject);
    };
    // Safety check
    if (!window.google || !window.google.accounts?.id) return;
    
    /* Load the Google Identity Services SDK i.e. Initialize the Google Identity Services */
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });

    // Render the Google sign-in button
    window.google.accounts.id.renderButton(
      document.getElementById('g_id_signin'),
      { theme: 'outline', size: 'large' }
    );

    // Optionally display One Tap prompt
    window.google.accounts.id.prompt();
  }, []);

  const decodeJwtResponse = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join('')
    );
    return JSON.parse(jsonPayload);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Google Sign-In</h2>
      {!user && <div id="g_id_signin"></div>}

      {user && (
        <div className="mt-4">
          <p className="font-semibold">Welcome, {user.name}</p>
          <p>Email: {user.email}</p>
          <img src={user.picture} alt="Profile" className="rounded-full w-16 h-16 mt-2" />
        </div>
      )}
    </div>
  );
}
