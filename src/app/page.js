"use client"
import Loader from '@/components/Loader'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function Home() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const onsubmit = (data) => {
    console.log(data)
    reset()
  }
  const [posts, setPosts] = useState([])
  const [currentpage, setcurrentPage] = useState(1)
  const postperPage = 6
  const indexLastPage = currentpage * postperPage;
  const indexFirstPage = indexLastPage - postperPage
  const currentPosts = posts.slice(indexFirstPage, indexLastPage)
  const [loading, setLoading] = useState(true)

  const fetchApi = async () => {
    const getData = await axios.get('https://jsonplaceholder.typicode.com/posts')
    setPosts(getData.data);
    setTimeout(() => {
      setLoading(false)
    }, 5000);
  }
  useEffect(() => {
    fetchApi()
  }, [])
  const pagination = (pagenunber) => {
    setcurrentPage(pagenunber)
  }
  return (
    <>
      
      <main className='h-screen'>
        {loading ? <Loader/> :
          <>
          <form onSubmit={handleSubmit(onsubmit)} className='py-5'>
        <div className='flex justify-center items-center gap-4'>
          <label>Input</label>
          <input className='border border-gray-300' type='text' {...register('name', { required: 'Name is required' })} />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <div className='flex justify-center items-center gap-4'>
          <label>Email</label>
          <input className='border border-gray-300' type='text' {...register('email', { required: 'Email is required' })} />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div className='flex justify-center items-center gap-4'>
          <label>Message</label>
          <input className='border border-gray-300' type='text' {...register('message', { required: 'Message is required' })} />
          {errors.message && <span>{errors.message.message}</span>}
        </div>
        <div className='flex justify-center items-center my-5'>
          <button type='submit' className='bg-green-400 rounded-md px-3 py-3'>Submit</button>
        </div>
      </form>
            <div className='flex justify-center items-center gap-5 overflow-x-scroll overflow-y-hidden p-5 '>
              {currentPosts.map((item) => (
                <div className='w-full h-60 p-5  bg-gray-600 text-white rounded-sm box-border '>
                  <p className='text-center'>{item.id}</p>
                  <p className='text-center'>{item.title}</p>
                  <p className='text-center'>{item.body}</p>
                </div>
              ))}

            </div>
            <div className='flex justify-between px-5 my-5'>
              <button className='p-2 bg-green-400 rounded-md text-white' disabled={currentpage === 1} onClick={() => pagination(currentpage - 1)}>
                Prev
              </button>
              <button className='p-2 bg-green-400 rounded-md text-white' disabled={indexLastPage >= posts.length - 1} onClick={() => pagination(currentpage + 1)}>
                Next
              </button>
            </div>
          </>
        }
      </main>

    </>
  )
}
