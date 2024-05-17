'use client';
import Image from 'next/image';
import Container from './componemts/Container';
import Navbar from './componemts/Navbar';
import Vercel from '../../public/vercel.svg';
import Footer from './componemts/Footer';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return (
    <main>
      <Container>
        <Navbar session={session} />
        <div className='flex-grow text-center p-10'>
          <h3 className='text-5xl'>NextJS Dashbaord</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
          <div className='flex justify-center my-10'>
            <Image src={Vercel} width={300} height={0} alt='Verce Logo' />
          </div>
        </div>
        <Footer />
      </Container>
    </main>
  );
}
