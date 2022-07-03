import { useState, useRef, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { client } from '../client';
import { userQuery } from '../utils/data';
import Pin from './Pin';

const Home = () => {
  const [user, setUser] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
      // Get user info from local storage
    const userInfo =
    localStorage.getItem('user') !== 'undefined'
      ? JSON.parse(localStorage.getItem('user'))
      : localStorage.clear();
    // Remember we set googleId as userId in Sanity
    const query = userQuery(userInfo?.googleId);
    // Fetch userinfo from Sanity and set it to the state
    client.fetch(query).then((data) => {
      // console.log(data);
      setUser(data[0]);
    });
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col h-full transition-height duration-75 ease-out">
      <div
        className="pb-2 flex-1 h-screen overflow-y-scroll"
        ref={scrollRef}
      >
        <Routes>
          <Route path="/*" element={<Pin user={user} />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default Home;
