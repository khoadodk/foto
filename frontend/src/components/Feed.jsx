import { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'

import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
import NotFound from '../assets/notFound.svg'
import {searchQuery, feedQuery} from '../utils/data'
import {client} from '../client'


const Feed = () => {

  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null)

  const {categoryId} = useParams();

  useEffect(() => {
    setLoading(true);
    if(categoryId) {
      const query = searchQuery(categoryId)
      client.fetch(query).then((data) => {
        // console.log("pins of the selected category: ", data)
        setPins(data)
        setLoading(false)
      })
    }else {
      client.fetch(feedQuery).then(data => {
        console.log("feed: ", data)
        setPins(data)
        setLoading(false)
      })
    }
  },[categoryId])

  if(loading) return <Spinner msg="New Feeds are loading" />

  if(!pins?.length) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <p>Sorry 🙏! No feed available</p>
        <img src={NotFound} alt="not found" className='md:w-[30%] w-[80%] mt-5' />
      </div>
    )
  }

  return (
    <div>{pins && <MasonryLayout pins={pins} /> }</div>
  )
}

export default Feed