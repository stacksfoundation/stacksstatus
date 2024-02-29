'use server';

import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <div className='flex w-full items-center justify-center bg-[#141414] p-2'>
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='https://stacks.org'
        className='mx-2'
      >
        <Image
          priority
          src={'/images/stacks.svg'}
          height={28}
          width={28}
          alt='stacks'
        />
      </a>
      <a
        className='mx-2'
        target='_blank'
        rel='noopener noreferrer'
        href='https://github.com/stacksfoundation/stacksstatus'
      >
        <Image
          priority
          src={'/images/github.svg'}
          height={28}
          width={28}
          alt='stacks'
        />
      </a>
      <a
        className='mx-2'
        target='_blank'
        rel='noopener noreferrer'
        href='https://discord.gg/HsK3ShU'
      >
        <Image
          priority
          src={'/images/discord.svg'}
          height={28}
          width={28}
          alt='stacks'
        />
      </a>
      <a
        className='mx-2'
        target='_blank'
        rel='noopener noreferrer'
        href='https://twitter.com/stacksstatus'
      >
        <Image
          priority
          src={'/images/twitter.svg'}
          height={28}
          width={28}
          alt='stacks'
        />
      </a>
    </div>
  );
};

export default Footer;
