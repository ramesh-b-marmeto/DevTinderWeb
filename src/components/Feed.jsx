import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { addFeed } from '../utils/feedSlice';
import UserCard from '../components/UserCard';
import { Link, useNavigate } from 'react-router-dom';

const Feed = () => {

  const user = useSelector((store)=>store.user);
  const feed = useSelector((store)=>store.feed);

  const navigate = useNavigate();
  const dispath = useDispatch();

  const getFeed = async ()=>{
    try{
      const response = await axios.get(BASE_URL+'/user/feed' , { withCredentials : true});
      const feedData = response?.data?.data?.feed ;
      dispath(addFeed(feedData));
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    getFeed();  
  },[])

  if(!user){
    console.log('no data');
    navigate('/login');
  }

  if(!feed){
    return 'loading...'
  }

  if(feed.length === 0){
    return (
      <>
      <h1 className='text-2xl text-center my-4 text-white'>No Matching Profiles found</h1>
      <Link to={'/connections'} className='btn btn-primary w-[200px] mx-auto'>Explore your Connections</Link>
      </>
  )
  }

  return (
    <div className='flex items-center flex-col justify-center mt-4 gap-10'>
      <h1 className='text-3xl'>Explore near you</h1>
      <UserCard user={feed[0]} />
    </div>
  )
}

export default Feed