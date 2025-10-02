// postit-frontend/src/components/PostList.js
import React, { useEffect, useState } from 'react';

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use relative URL so CRA proxy forwards to http://127.0.0.1:8000
  const url = '/api/posts/';

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetch(url)
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP ${res.status} ${res.statusText} - ${text}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;
        const arr = Array.isArray(data) ? data : (data.results || data.items || []);
        setPosts(arr);
      })
      .catch((e) => {
        if (!isMounted) return;
        console.error('Failed to load posts:', e);
        setError(e.message || 'Failed to fetch');
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => { isMounted = false; };
  }, [url]);

  if (loading) return <div>Loading posts…</div>;
  if (error) return <div>Error loading posts: {error}</div>;
  if (!posts.length) return <div>No posts found.</div>;

  return (
    <ul>
      {posts.map((p, i) => (
        <li key={p.id ?? i}>
          <strong>{p.title ?? p.name ?? '(untitled)'}</strong>
          <div>{p.content ?? p.body ?? p.text ?? ''}</div>
          <hr/>
        </li>
      ))}
    </ul>
  );
}