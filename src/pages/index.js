import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import { getSession } from "next-auth/client";
import {setAllItems} from '../slices/searchSlice'
import {useDispatch} from 'react-redux'



export default function Home(props) {

  const dispatch = useDispatch()
  dispatch(setAllItems(props.products))


  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon Clone</title>
      </Head>
      <Header />
      <main className="max-w-screen-2xl mx-auto">
        <Banner />
        <ProductFeed products={props.products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  const products = await fetch("https://fakestoreapi.com/products").then(response => response.json())

  return {
    props: {
      products: products,
      session: session,
    }
  }
}
