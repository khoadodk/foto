import React, { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { gapi } from 'gapi-script';

import video from '../assets/video.mp4';
import logo from '../assets/logo.png';
import { client } from '../client';

const Login = () => {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  const navigate = useNavigate();

  const responseGoogle = (res) => {
    localStorage.setItem('user', JSON.stringify(res.profileObj));

    const { name, imageUrl, googleId } = res.profileObj;
    // Save user data into sanity
    const doc = {
      _id: googleId,
      _type: 'user',
      username: name,
      image: imageUrl,
    };
    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full opacity-85">
        <video
          src={video}
          type="video/mp4"
          loop
          controls={false}
          autoPlay
          muted
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay effect */}
      <div className="absolute flex flex-col justify-center items-center top-0 left-0 right-0 bottom-0 bg-b">
        <div className="p-5">
          <img src={logo} alt="logo" width="200px" />
        </div>

        {/* Login */}
        <div className="shadow-2xl">
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
            render={(renderProps) => (
              <button
                type="button"
                className="bg-white flex justify-center items-center p-2 rounded-lg cursor-pointer outline-none"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <FcGoogle className="mr-4" />
                Sign in with Google
              </button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
