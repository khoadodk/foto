import { useState, useEffect } from 'react';

import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import { feedQuery, searchQuery } from '../utils/data';
import NotFound from '../assets/notFound.svg';

const Search = ({ searchTerm, setSearchTerm }) => {
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [searchTerm]);

  return (
    <div>
      {loading && <Spinner msg={'Search for pins'} />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== '' && !loading && (
        <div className="w-full h-screen flex flex-col justify-center items-center">
          <p>
            Sorry 🙏! No pins available with : &nbsp;
            <strong>'{searchTerm}'</strong>
          </p>
          <img
            src={NotFound}
            alt="not found"
            className="md:w-[30%] w-[80%] mt-5"
          />
        </div>
      )}
    </div>
  );
};

export default Search;
