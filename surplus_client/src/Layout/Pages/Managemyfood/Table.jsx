import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import { useEffect, useMemo, useState } from 'react';
import useAxiossecure from "../../../Hooks/useAxiossecure";
import useAuth from '../../../Hooks/useAuth';
import { GrDocumentUpdate } from 'react-icons/gr';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { SiNginxproxymanager } from 'react-icons/si';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';

const Table = () => {

  const { user } = useAuth()
  console.log(user)
  const [Myfood, setmyfood] = useState([]);

  const axiosSecure = useAxiossecure()
  // const url = `/userfood?email=${user?.email}`;
  const url = `/userfood`;
  useEffect(() => {

    axiosSecure.get(url)
      .then(res => {
        setmyfood(res.data)
      })
  }, [axiosSecure, url])
  console.log(Myfood)
  
  const itemDelete = (id_) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
      .then((result) => {
        if (result.isConfirmed) {

          const del_url = `/table/${id_}`
          axiosSecure.delete(del_url)
            .then(res => {
              console.log(res.data.deletedCount)
              if (res.data.deletedCount > 0) {
                const filtered = Myfood.filter(cart => cart._id !== id_)
                setmyfood(filtered)
                Swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                )
              }
            })

        }
      })
  }

  const data = useMemo(() => Myfood, [Myfood])
  /**@type import('@tanstack/react-table').ColumnDef<any>*/
  const columns = [
    // {
    //   header: 'ID',
    //   // accessorKey: '_id'
    // },
    {
      header: 'Foodname',
      accessorKey: 'foodname'
    },
    {
      header: 'Quantity',
      accessorKey: 'quantity'
    },
    {
      header: 'Pick Up Location',

      accessorKey: 'address'
    },
    {
      header: 'Expiredate',

      accessorKey: 'expiredate'
    },
    {
      header: 'Note',

      accessorKey: 'note'
    },
    {
      header: "Action",
      cell: ({ row }) => {
        const x = row.original
        const id = x._id
        const name1=x.foodname
        
       
        return (
          <div className='py-8 px-4 space-y-8'>

            <div> <Link to={`/updatefood/${id}`}><GrDocumentUpdate className='text-2xl' /></Link></div>
            <div >
              <button onClick={() => itemDelete(id)}><RiDeleteBin6Fill className='text-2xl' /></button>
            </div>
            <div> <Link to={`/manage/${id}/${name1}`}><SiNginxproxymanager className='text-2xl' /></Link></div>
          </div>
        )
      }
    },

    // {
    //   header: 'Image',

    //   accessorKey: 'image'
    // },

  ]
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() })
  return (
    <div >
      <table className='mx-auto'>
        {table.getHeaderGroups().map(headergroup => (
          <tr key={headergroup._id} className='border-b-2 border-gray-950 text-center'>
            {
              headergroup.headers.map(header => (
                <th className='p-4 text-center' key={header._id} >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))
            }

          </tr>
        ))}
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row._id} className='border-b-2 border-gray-950 text-lg'>
              {row.getVisibleCells().map(cell => (
                <td className='p-4 text-center' key={cell._id} >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}

                </td>

              ))}


            </tr>
          ))}
        </tbody>
      </table>

     
     
    </div>
  );
};

export default Table;