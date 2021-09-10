import Image from 'next/image'
import Currency from 'react-currency-formatter'
import {useState} from 'react'
import {StarIcon} from '@heroicons/react/solid'
import {useDispatch} from 'react-redux'
import {addToBasket} from '../slices/basketSlice'

function Product(props) {
    const dispatch = useDispatch()

    const [rating, setRating] = useState(Math.floor(Math.random() * 5) + 1)
    const [hasPrime, setHasPrime] = useState(Math.random() < 0.5)
    function addItemToBasket(){
        const product = {
            ...props.product,
            hasPrime,
            rating,
        }
        dispatch(addToBasket(product))
    } 

    return (
        <div className='relative flex flex-col m-5 bg-white z-30 p-10'>
            <p className='absolute top-2 right-2 text-xs italic text-gray-400'>{props.product.category}</p>
            <Image src={props.product.image} height={200} width={200} objectFit='contain'/>
            <h4 className='my-3' >{props.product.title}</h4>
            <div className='flex'>
                {Array(rating).fill().map((_, index) =><StarIcon key={index} className='h-5 text-yellow-500'/>)}
            </div>
            <p className='text-xs my-2 line-clamp-2'>{props.product.description}</p>
            <div className='mb-5'>
                <Currency quantity={props.product.price} currency='GBP'/>
            </div>
            {hasPrime && <div className='flex items-center space-x-2 -mt-5'>
                <img className='w-12' src="https://links.papareact.com/fdw" alt="" />
                <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
            </div>}
            <button onClick={addItemToBasket} className='mt-auto button'>Add to Basket</button>
        </div>
    )
}

export default Product
