import React from "react";
import { useCurrentUser } from "@/hooks/index";
import PostEditor from "@/components/post/editor";
import Posts from "@/components/post/posts";
import Geo from "../components/geolocation";
import Mapview from "../components/mapviewr";

const IndexPage = () => {
  const [user] = useCurrentUser();

  return (
    <div>
      <Geo />
      <div>
        <div>
          {user ? (
            <>
              <PostEditor />
              <Mapview />
            </>
          ) : (
            "Guest"
          )}

          <Posts />
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
