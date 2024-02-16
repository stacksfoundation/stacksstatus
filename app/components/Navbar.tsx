import Link from 'next/link';
import Fees from './Fees/Fees';

const Navbar = () => {
  return (
    <div className='navbar flex h-20 items-center justify-between py-2'>
      <Link href='/' className='ml-5 text-xl md:text-xl xl:text-xl'>
        Stacks Status
      </Link>
      <Fees />
    </div>
  );
};

export default Navbar;
