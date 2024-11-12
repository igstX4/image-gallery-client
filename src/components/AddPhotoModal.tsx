import { X, Save, Sailboat, ArrowLeft, ArrowRight } from 'lucide-react';
import React, { FC, useState, ChangeEvent } from 'react';
import { Upload } from 'lucide-react';
import $api from '../core/axios';
import { useAppDispatch } from '../store/store';
import { fetchImages } from '../store/slices/ImageSlice';

interface AddPhotoModalProps {
    setOpen: () => void;
    isOpened: boolean;
}

const AddPhotoModal: FC<AddPhotoModalProps> = ({ setOpen, isOpened }) => {
    const dispatch = useAppDispatch()
    const [file, setFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [step, setStep] = useState(0);
    const [title, setTitle] = useState('');
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            setFile(selectedFile);
            setImagePreview(URL.createObjectURL(selectedFile));
        } else {
            alert('Please select an image file');
        }
    };

    const handleImageClick = () => {
        setFile(null);
        setImagePreview(null);
    };

    const handleSave = () => {
        if (file && title) {
            const formData = new FormData();
            formData.append('title', title); // Додати заголовок
            formData.append('image', file);
            $api.post('/images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(() => {
                dispatch(fetchImages())
                setFile(null);
                setImagePreview(null);
                setStep(0);
                setTitle('');
                setOpen()
            })
        }

    }

    const steps = () => {
        if (step === 0) {
            return (
                !imagePreview ? (
                    <label className="w-full flex flex-col items-center px-4 py-6 bg-transparent text-white rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer transition hover:bg-[#364a69] hover:text-white">
                        <Upload size={50} color='white' />
                        <span className="mt-2 text-base leading-normal">Upload Image</span>
                        <input
                            type='file'
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </label>
                ) : (
                    <div onClick={() => handleImageClick()} className="cursor-pointer">
                        <img src={imagePreview} alt="Preview" className="w-auto h-[400px] rounded-lg" />
                    </div>
                )
            )
        } else if (step === 1) {
            return (
                <div className='w-full h-full flex flex-col items-center justify-center mb-6'>
                    <div>
                        <h2 className='mb-2 text-white text-lg font-semibold'>Enter title of the photo:</h2>
                        <input onChange={(e) => setTitle(e.target.value)} value={title} className='w-[300px] h-[40px]  bg-[#3e557a] rounded-lg px-4 text-white outline-none' />
                    </div>
                </div>
            )
        }
    }
    return (
        <div className={`fixed  top-0 left-0 w-full h-full bg-black transition bg-opacity-50 flex items-center justify-center opacity-0 pointer-events-none ${isOpened && 'opacity-100 pointer-events-auto'}`}>
            <div className={`w-[700px] relative transition-all bg-[#1e293b] rounded-xl overflow-y-hidden ${imagePreview ? 'h-[500px]' : 'h-[210px]'} `}>
                <div className='w-full h-[50px] px-3 flex justify-between items-center border-b-[1px] border-[#3e557a]'>
                    <h2 className='text-white text-xl font-semibold'>Adding New Photo</h2>
                    <div className='w-[50px] h-[50px] flex items-center justify-center cursor-pointer' onClick={setOpen}>
                        <X color='white' />
                    </div>
                </div>

                {/* Image Upload Button */}
                <div className="p-4 flex h-[calc(100%-50px)] flex-col items-center justify-center">
                    {steps()}
                </div>
                {imagePreview && (
                    <>
                        {step === 1 && <div onClick={() => setStep(0)} className='w-[70px] h-[70px] rounded-full absolute bottom-[30px] left-[30px] items-center flex cursor-pointer justify-center bg-[rgb(168,85,247)] hover:bg-[rgb(117,60,170)] transition z-20'>
                            <ArrowLeft width={70} color='white' />
                        </div>}
                        {step !== 1 || title !== '' ? <div onClick={() => {
                            if (step === 0) {
                                setStep(1)
                            } else {
                                handleSave()
                            }
                        }} className='w-[70px] h-[70px] rounded-full absolute bottom-[30px] right-[30px] items-center flex cursor-pointer justify-center bg-[rgb(168,85,247)] hover:bg-[rgb(117,60,170)] transition z-20'>
                            {step === 0 ? <ArrowRight onClick={() => setStep(1)} width={70} color='white' /> : <Save width={70} color='white' />}
                        </div> : null}
                    </>
                )}
            </div>
        </div>
    );
}

export default AddPhotoModal;
