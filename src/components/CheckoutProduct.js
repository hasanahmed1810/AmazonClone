import Image from 'next/image'
import Currency from 'react-currency-formatter'
import {StarIcon} from '@heroicons/react/solid'
import {useDispatch} from 'react-redux'
import {addToBasket, removeFromBasket} from '../slices/basketSlice'

function CheckoutProduct({item}) {
    const dispatch = useDispatch()

    function addItemToBasket(){
        dispatch(addToBasket(item))
    }

    function removeItemFromBasket(){
        dispatch(removeFromBasket(item))
    }

    return (
        <div className="grid grid-cols-5" >
            <Image src={item.image} height={200} width={200} objectFit='contain'/>
            <div className="col-span-3 mx-5">
                <p>{item.title}</p>
                <div className='flex'>
                    {Array(item.rating).fill().map((_, index) =><StarIcon key={index} className='h-5 text-yellow-500'/>)}
                </div>
                <p className='text-xs my-2 line-clamp-3'>{item.description}</p>
                <Currency quantity={item.price} currency='GBP'/>
                {item.hasPrime && <div className='flex items-center space-x-2'>
                    <img className='w-12' src="https://links.papareact.com/fdw" alt="" loading='lazy'/>
                    <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                </div>}
            </div>
            <div className='flex flex-col space-y-2 my-auto justify-self-end'>
                <button className='button' onClick={addItemToBasket}>Add to Basket</button>
                <button className='button' onClick={removeItemFromBasket}>Remove from Basket</button>
            </div>
        </div>
    )
}

export default CheckoutProduct
