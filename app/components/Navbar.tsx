import Link from 'next/link';
import Fees from './Fees/Fees';

const Navbar = () => {
  return (
    <div className='navbar flex justify-between py-2'>
      <Link
        href='/'
        className='btn btn-ghost ml-5 text-xl md:text-xl xl:text-xl'
      >
        Stacks Status
      </Link>
      <Fees />
    </div>
  );
};

export default Navbar;
