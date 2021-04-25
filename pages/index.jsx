import React from 'react';
import { useCurrentUser } from '@/hooks/index';
import PostEditor from '@/components/post/editor';
import Posts from '@/components/post/posts';
import Geo from '../components/geolocation'

const IndexPage = () => {
  const [user] = useCurrentUser();

  return (
    <div>
     <Geo/>
        <div>
          <div>
          {user ?  (
          <>
            <PostEditor />
            <Posts />
          </>)
          : 'You must Log in to post or view maps'}
          </div>
        </div>
      </div>
  );
};

export default IndexPage;
