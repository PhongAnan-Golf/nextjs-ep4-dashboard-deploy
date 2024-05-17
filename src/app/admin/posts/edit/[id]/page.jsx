'use client';
import React, { useState, useEffect } from 'react';
import AdminNav from '../../../componemts/AdminNav';
import Footer from '../../../componemts/Footer';
import Link from 'next/link';
import Image from 'next/image';
import Container from '../../../componemts/Container';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';

function AdminEditPostPage({ params }) {
  const { data: session } = useSession();
  if (!session) redirect('/login');
  if (!session?.user?.role === 'admin') redirect('/welcome');

  const { id } = params;
  const router = useRouter();

  const [postOldData, setPostOldData] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newImg, setNewImg] = useState('');
  const [newContent, setNewContent] = useState('');

  console.log(postOldData);
  const getPostById = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/totalposts/${id}`, {
        method: 'GET',
        cache: 'no-store',
      });
      if (!res.ok) {
        throw new Error('Failed to fetch post.');
      }

      const data = await res.json();
      setPostOldData(data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(newImg);
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalposts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newTitle, newImg, newContent }),
      });

      if (!res.ok) {
        throw new Error('Faliled to update post.');
      }
      router.refresh();
      router.push('/admin/posts');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostById(id);
  }, [id]);
  return (
    <Container>
      <AdminNav session={session} />
      <div className='flex-grow'>
        <div className='container mx-auto  shadow-xl my-10 p-10 rounded-xl'>
          <Link href='/admin/posts' className='bg-gray-500 inline-block text-white border px-2 py-3 rounded my-3'>
            Bo back
          </Link>
          <hr className='my-3' />
          <h3 className='text-3xl'>Admin Edit User Post Page</h3>
          <form onSubmit={handleSubmit}>
            <input type='text' className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-ls my-2' placeholder={postOldData?.title} onChange={(e) => setNewTitle(e.target.value)} value={newTitle} />
            <input type='text' className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-ls my-2' placeholder={postOldData?.img} onChange={(e) => setNewImg(e.target.value)} value={newImg} />
            <textarea className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-ls my-2' name='' id='' cols='30' rows='10' placeholder={postOldData?.content} onChange={(e) => setNewContent(e.target.value)} value={newContent}></textarea>
            <button type='submit' name='update' className='bg-green-500 text-white border py-2 px-3 rounded text-ls my-2'>
              Update post
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </Container>
  );
}

export default AdminEditPostPage;
