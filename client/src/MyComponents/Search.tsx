import { addData } from '@/store/dns/dnsSlice'
import axios from 'axios'
import { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { useDispatch } from 'react-redux'

export default function Search() {
    const [domain, setDomain] = useState('')
    const dispatch = useDispatch()
    const queryDomain = async () => {
        const res = await axios.post("http://localhost:3001/api/v1/dns", {
            domain
        })
        dispatch(addData(res.data))
        console.log(res.data)
    }
    return (
        <div className='w-[40%]'>
            <div className='dark:bg-zinc-800 bg-zinc-100 flex items-center gap-5 rounded-full p-2 border border-zinc-700'>
                <input onChange={(e) => setDomain(e.target.value)}
                    type="text"
                    className='bg-zinc-100 dark:bg-zinc-800 w-full outline-none ml-5'
                    placeholder='search domains eg. (google.com)' />
                <div className='p-2 cursor-pointer bg-zinc-300 dark:bg-zinc-950 rounded-full' onClick={queryDomain}>
                    <CiSearch className='size-6' />
                </div>
            </div>
        </div>
    )
}
