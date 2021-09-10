import Header from '../components/Header'
import CheckoutProduct from '../components/CheckoutProduct'
import Image from 'next/image'
import {selectItems, selectTotal} from '../slices/basketSlice';
import Currency from 'react-currency-formatter'
import {useSelector} from 'react-redux'
import {
    useSession, signIn, signOut, getSession
} from 'next-auth/client'
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY) // The loadStripe function asynchronously loads the Stripe.js script and initializes a Stripe object. 


function Checkout() {
    const items = useSelector(selectItems)
    const total = useSelector(selectTotal)
    const [session, loading] = useSession()

    async function createCheckoutSession(){
        const stripe = await stripePromise
        const checkoutSession = await axios.post('/api/create-checkout-session', {
            items: items,
            email: session.user.email,
        })
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id,
        })
    }

    return (
        <div className="bg-gray-100">
            <Header/> 
            <main className="lg:flex max-w-screen-2xl mx-auto"> 
                <div className="flex-grow m-5 shadow-sm">
                    <Image src='https://links.papareact.com/ikj' width={1020} height={250} objectFit='contain'/>
                    <div className="flex flex-col p-5 space-y-10 bg-white">
                        <h1 className="text-3xl border-b pb-4">{items.length === 0 ? 'Your Amazon Basket is empty' : 'Shopping Basket'}</h1>
                        {items.map((item, index) => <CheckoutProduct key={index} item={item} />)}
                    </div>
                </div>

                <div className='flex flex-col bg-white p-10 shadow-md'>
                    {items.length > 0 && <>
                        <h2 className="whitespace-nowrap">Subtotal ({items.length} items): <span className="font-bold"> <Currency quantity={total} currency='GBP'/></span> </h2>
                        <button onClick={createCheckoutSession} disabled={!session} className={`button mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>{!session ? 'Sign in to checkout' : 'Proceed to checkout'}</button>
                    </>}
                </div>
            </main>
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    return {
      props: {
        session: session,
      }
    }
}

export default Checkout
