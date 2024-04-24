import Link from 'next/link';
import Fees from '../Fees/Fees';

const Navbar = () => {
  return (
    <div className='navbar flex h-20 items-center justify-between py-2'>
      <div className='flex items-center justify-center'>
        <Link href='/' className='ml-5 text-xl'>
          <span className='font-semibold text-white'>Stacks Status</span>
        </Link>
      </div>
      <Fees />
    </div>
  );
};

export default Navbar;
