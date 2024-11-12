import { Delete, Trash } from 'lucide-react'
import React, { FC } from 'react'
import $api from '../core/axios'
import { useAppDispatch } from '../store/store'
import { fetchImages } from '../store/slices/ImageSlice'


interface PhotoItemProps {
    src: string,
    title: string,
    _id: string
}
const PhotoItem : FC<PhotoItemProps> = ({src, title, _id}) => {
    const dispatch = useAppDispatch()
    const handleDelete = async() => {
        $api.delete(`/images/${_id}`).then(() => dispatch(fetchImages()))
    }

    return (
        <div className='bg-[#1e293b] w-[400px] min-h-[150px] max-h-[450px] flex flex-col p-2 rounded-lg '>

            <img className='w-[100%] h-[auto] max-h-[400px] object-cover rounded-lg' src={src} alt='gallery' />

            <div className='flex justify-between mt-1'>
                <h3 className='text-white mt-1 text-base font-semibold'>{title}</h3>
                <div onClick={handleDelete} className='w-[30px] h-[30px] bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-500'><Trash color='white' width={15} /></div>
            </div>
        </div>
    )
}

export default PhotoItem