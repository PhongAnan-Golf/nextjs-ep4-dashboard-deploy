'use client';
import React, { useState, useEffect } from 'react';
import AdminNav from '../../../componemts/AdminNav';
import Container from '../../../componemts/Container';
import Footer from '../../../componemts/Footer';
import Link from 'next/link';
import Image from 'next/image';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';

function AdminEditUserPage({ params }) {
  const { data: session } = useSession();
  if (!session) redirect('/login');
  if (!session?.user?.role === 'admin') redirect('/welcome');

  const { id } = params;
  const router = useRouter();

  const [userOldData, setUserOldData] = useState([]);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  // console.log(userOldData);
  // console.log(id);
  const getUserById = async (id) => {
    try {
      // console.log(id);
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalusers/${id}`, {
        method: 'GET',
        cache: 'no-store',
      });
      if (!res.ok) {
        throw new Error('Failed to fecth users');
      }
      const data = await res.json();
      setUserOldData(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserById(id);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalusers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newName, newEmail, newPassword }),
      });
      if (!res.ok) {
        throw new Error('Failed to update user.');
      }
      // router.refresh();
      // router.push('/admin/users');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <AdminNav session={{ session }} />
      <div className='flex-grow'>
        .
        <div className='container mx-auto  shadow-xl my-10 p-10 rounded-xl'>
          <Link href='/admin' className='bg-gray-500 inline-block text-white border px-2 py-3 rounded my-3'>
            Bo back
          </Link>
          <hr className='my-3' />
          <h3 className='text-3xl'>Admin Edit User Page</h3>
          <form onSubmit={handleSubmit}>
            <input type='text' className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-ls my-2' placeholder={userOldData?.name} onChange={(e) => setNewName(e.target.value)} value={newName} />
            <input type='text' className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-ls my-2' placeholder={userOldData?.email} onChange={(e) => setNewEmail(e.target.value)} value={newEmail} />
            <input type='password' className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-ls my-2' placeholder={userOldData?.password} onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />

            <button type='submit' name='update' className='bg-green-500 text-white border py-2 px-3 rounded text-ls my-2'>
              Update user
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </Container>
  );
}

export default AdminEditUserPage;
