import React from 'react';
import Link from 'next/link';

const About = () => {
  return (
    // add here a btn toolbar with a btn to go back to home page and a btn to go to my instagram page
    <div className='flex flex-col w-full items-center p-10 gap-3'>
      <div className='flex gap-4 mb-4'>
        <Link href="/">
          <button>
            Back to Home
          </button>
        </Link>
        <Link href="https://www.instagram.com/Ak76024/" target="_blank" rel="noopener noreferrer">
          <button>
            Follow on Instagram
          </button>
        </Link>
      </div>
      <h1 className='text-3xl font-bold mb-4'>About Get Me A Chai</h1>
      <p className='text-lg mb-2'>Get Me A Chai is a platform that allows users to support their favorite content creators by buying them a virtual cup of chai (tea). It's a simple and fun way to show appreciation for the hard work and creativity of content creators.</p>
      <p className='text-lg mb-2'>Users can visit a creator's profile, choose an amount to contribute, and leave a message along with their support. The payments are processed securely through Razorpay, ensuring a smooth and safe transaction experience.</p>
      <p className='text-lg mb-2'>For content creators, Get Me A Chai provides an easy way to receive support from their audience. Creators can share their unique profile link with their followers, making it convenient for fans to contribute and show their love.</p>
      <p className='text-lg mb-2'>Whether you're a content creator looking to monetize your work or a fan wanting to support your favorite creators, Get Me A Chai is the perfect platform to connect and share the love over a cup of virtual chai!</p>
    </div>
  );
}

export default About;