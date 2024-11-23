'use client'
import { useEffect, useState } from "react";

export default function FetchPosts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/external");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data); 
      } catch (error: any) {
        setError(error.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []); 

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full px-4 py-8 lg:px-10">
      <h1 className="text-2xl font-bold mb-8">Posts</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex flex-col bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-2" style={{ fontFamily: "Poppins" }}>{post.title}</h2>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "Poppins" }}>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
