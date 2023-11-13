import { AiTwotonePrinter } from 'react-icons/ai';
// import { useLoaderData } from 'react-router-dom';
import './print.css';
import Receiptcard from './Receiptcard';
import useAxiossecure from '../../../Hooks/useAxiossecure';
import { useEffect, useState } from 'react';
import Nodonation from './NoDonation';

const Receipt = () => {
  const [isproductavailable, setisproductavailable] = useState(true)
  const axiossecure = useAxiossecure()
  const url = `/receipt`
  const [donations, setdonatios] = useState([])
  
  useEffect(() => {
    axiossecure.get(url)
      .then(res => {
        setdonatios(res.data)
      })
    if (!donations.length) {
      setisproductavailable(false)
      // console.log('no')
    }
    else {
      setisproductavailable(true)
    }
  }, [axiossecure, donations.length, url])
  // const donations=useLoaderData()
  // console.log(donations)
  const printReceipt = () => {
    window.print();
}
  return (
    <div>
      <div className="text-center">
        <h1 className="font-medium text-5xl">Your Donation Receipts</h1>
      </div>

      {
        isproductavailable
          ? <div className="max-w-7xl mx-auto my-16 ">
            {
              donations.map(donation => <Receiptcard key={donation._id} donation={donation}></Receiptcard>)
            }
             <div className="flex justify-end text-sm divide-x">
                <button onClick={printReceipt} className="flex items-center px-2 py-1 ">

                    <span><AiTwotonePrinter className='text-9xl'></AiTwotonePrinter></span>
                </button>

            </div>
          </div >
          : <Nodonation></Nodonation>
      }


      {/* <th> <button className="hide-on-print" onClick={printReceipt}>Print</button></th> */}

    </div>
  );
};

export default Receipt;
