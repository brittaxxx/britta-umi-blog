// import yayJpg from '../assets/yay.jpg';

// export default function HomePage() {
//   return (
//     <div>
//       <h2>Yay! Welcome to umi!</h2>
//       <p>
//         <img src={yayJpg} width="388" />
//       </p>
//       <p>
//         To get started, edit <code>pages/index.tsx</code> and save to reload.
//       </p>
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import { history } from "umi";
 
export default function HomePage() {
  const [posts, setPosts] = useState<any[]>();

  async function refresh() {
    try {
      const res = await fetch('/api/posts');
      if (res.status !== 200) {
        console.error(await res.text());
      }
      setPosts(await res.json());
    } catch (err) {
      console.error(err)
    }
  }
 
  useEffect(() => {
    refresh();
  }, []);

  return (
    <div>
      {!posts && <p>Loading...</p>}
      {posts && <div>
        {posts.map(post => <div key={post.id}>
          <div onClick={() => history.push(`/posts/${post.id}`)}>
            <p>{post.title}</p>
          </div>
        </div>)}
      </div>}
    </div>
  );
}