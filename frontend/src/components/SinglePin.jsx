import {useState, useEffect} from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid'
import {IoCloudDownload, IoArrowRedo} from 'react-icons/io5';
import {AiTwotoneDelete} from 'react-icons/ai'

import {client, urlFor} from '../client'
import {fetchUser} from '../utils/fetchUser'

const SinglePin = ({pin: {postedBy, image, _id, destination, save}}) => {
    const navigate = useNavigate()
    const [postHovered,setPostHovered] = useState(false)
    const [user, setUser] = useState(null)

    // Return false/true. !! to convert undefined/null value into true or false.
    const alreadySaved = !!(save?.filter(item => item.postedBy?._id === user?.googleId).length)
    // console.log(alreadySaved)

    useEffect(() => {
        const userInfo = fetchUser()
        setUser(userInfo)
    },[])

    const savePin = id => {
        if(!alreadySaved) {
            // https://www.sanity.io/docs/http-patches
          client.patch(id).setIfMissing({save: []}).insert('after', 'save[-1]', [
            {
                _key: uuidv4(),
                userId: user?.googleId,
                postedBy: {
                    _type: 'postedBy',
                    _ref: user?.googleId
                }
            }
          ]).commit().then(() => window.location.reload())
        }
    }
    const deletePin = id => {
        client.delete(id).then(() => {
            window.location.reload()
        })
    }

  return (
    <div className="m-2">
        <div className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-out"
            onMouseEnter={() => setPostHovered(true)}
            onMouseLeave={() => setPostHovered(false)}
            onClick={() => navigate(`/pin-detail/${_id}`)}
        >
            <img src={urlFor(image).width(250).url()} alt="Single pin" className="rounded-lg w-full" />
        {postHovered && (
            <div className="absolute top-0 w-full h-full flex flex-col justify-between p-2 z-50">
                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <a 
                            href={`${image?.asset?.url}?dl`} 
                            download 
                            onClick={e => e.stopPropagation()} 
                            className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 :hover:shadow-md outline-none"
                        >
                            <IoCloudDownload />
                        </a>
                    </div>

                    {alreadySaved ? (
                        <button type="button" className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-2 py-1 text-base rounded-3xl shadow-md'>{save?.length} Saved</button>
                    ): (
                        <button type="button" className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-2 py-1 text-base rounded-3xl shadow-md' onClick={(e => {
                            e.stopPropagation();
                            savePin(_id)
                        })}>Save</button>
                    )}
                </div>

                <div className="flex justify-between items-center gap-2 w-full">
                    {destination && (
                        <a href={destination} 
                        target="_blank"
                        rel="noreferrer" 
                        onClick={ e => e.stopPropagation()}
                        className="bg-white items-center gap-2 text-black font-bold px-4 py-2 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                        ><IoArrowRedo /></a>
                    )}

                    {postedBy?._id === user?.googleId && (
                        <button 
                            type="button" 
                            onClick={e => {
                                e.stopPropagation();
                                deletePin(_id);
                            }} 
                            className="bg-white p-2 opacity-70 hover:opacity-100 text-red-500 font-bold text-base rounded-full shadow-md" 
                        >
                            <AiTwotoneDelete />
                        </button>
                    )}
                </div>
            </div>
        )}
        </div>

        <Link
            to={`user-profile/${postedBy?._id}`}
            className="flex gap-2 mt-2 items-center"
        >
            <img src={postedBy?.image} alt="author" className="w-8 h-8 rounded-full object-cover" />
            <p className="font-semibold capitalize">{postedBy?.username}</p>
        </Link>
    </div>
  )
}

export default SinglePin