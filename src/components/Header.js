import Image from "next/image";
import {
  useSession, signIn, signOut
} from 'next-auth/client'
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import {useRouter} from 'next/router';
import {selectItems} from '../slices/basketSlice';
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {useState} from 'react'
import {setSearchItems, selectAllItems} from '../slices/searchSlice'


function Header() {
  const [session, loading] = useSession()
  const router = useRouter()
  const items = useSelector(selectItems)
  const allItems = useSelector(selectAllItems)
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch()


  function searchItems() {
    if (searchTerm === '') {
      router.push('/')
    } else {
      const searchItems = allItems.filter(product => {
        if (product.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())) return product
      })
      dispatch(setSearchItems(searchItems))
      router.push('/search')
    }
  }

  return (
    <header>
      <div className="flex items-center bg-amazon_blue p-1 py-2 flex-grow">
        <div className="flex mt-2 items-center flex-grow sm:flex-grow-0">
          <Image
            onClick={() => router.push('/')}
            src="https://links.papareact.com/f90"
            width="150"
            height="40"
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>

        {/* flex and hidden are both display types when the display greater than small its gonna be flex or else (less than small) hidden */}
        <div className="hidden sm:flex items-center rounded-md flex-grow h-10 bg-yellow-400 hover:bg-yellow-500 cursor-pointer">
          <input
            type="text"
            className=" flex-shrink rounded-l-md outline-none h-full w-6 flex-grow p-2"
            onChange={event => setSearchTerm(event.target.value)}
          />
          <SearchIcon onClick={searchItems} className="h-12 p-4" />
        </div>

        {/* breakpoints in tailwind css: sm is sm or greater, md is md or greater, lg is lg or greater, etc */}
        {/* its a mobile first approach in tailwind css */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div onClick={signIn} className='cursor-pointer hover:underline'>
            <p>{session ? `Hello, ${session.user.name}` : 'Sign In'}</p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>
          <div onClick={() => router.push('/orders')} className='cursor-pointer hover:underline'>
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>
          <div onClick={() => router.push('/checkout')} className='cursor-pointer hover:underline relative flex items-center'>
            <span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold'>{items.length}</span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline font-extrabold md:text-sm mt-2">Basket</p>
          </div>
        </div>
      </div>

      <div className='flex space-x-3 p-2 pl-6 items-center bg-amazon_blue-light text-white text-sm'>
        <p className='flex items-center cursor-pointer hover:underline'><MenuIcon className="h-6 mr-1"/> All</p>
        <p className="cursor-pointer hover:underline">Prime Video</p>
        <p className="cursor-pointer hover:underline">Amazon Business</p>
        <p className="cursor-pointer hover:underline">Today's Deals</p>
        <p className="hidden lg:inline-flex cursor-pointer hover:underline">Electronics</p>
        <p className="hidden lg:inline-flex cursor-pointer hover:underline">Food & Grocery</p>
        <p className="hidden lg:inline-flex cursor-pointer hover:underline">Prime</p>
        <p className="hidden lg:inline-flex cursor-pointer hover:underline">Buy Again</p>
        <p className="hidden lg:inline-flex cursor-pointer hover:underline">Shopper Toolkit</p>
        <p className="hidden lg:inline-flex cursor-pointer hover:underline">Health & Personal Care</p>
      </div>
    </header>
  );
}

export default Header;