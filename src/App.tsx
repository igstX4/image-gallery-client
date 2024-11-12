import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import s from './App.module.scss';
import PhotoItem from './components/PhotoItem';
import { Plus } from 'lucide-react';
import AddPhotoModal from './components/AddPhotoModal';
import { useAppDispatch, useAppSelector } from './store/store';
import { v4 as uuidv4 } from 'uuid';
import { fetchMe } from './store/slices/UserSlice';
import { fetchImages } from './store/slices/ImageSlice';
import { API_URL } from './core/axios';

function App() {
  const [isOpened, setOpened] = useState<boolean>(false);
  const [ws, setWs] = useState<WebSocket | null>(null); 

  const user = useAppSelector(state => state.user)
  const images = useAppSelector(state => state.images)
  const dispatch = useAppDispatch()
  console.log(user)

  useEffect(() => {

    dispatch(fetchMe())
    dispatch(fetchImages())
    // https://image-gallery-server-one.vercel.app/api
    const socket = new WebSocket('ws://localhost:8081'); 
    socket.onopen = () => console.log('WebSocket соединение установлено');
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data, 21212)
      dispatch(fetchMe())
      dispatch(fetchImages())
    };
    socket.onerror = (error) => console.error('Ошибка WebSocket:', error);

    setWs(socket);


    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    const authToken = uuidv4()
    localStorage.setItem('token', authToken)
    if (ws) {
      ws.send(JSON.stringify({ authToken, }));

      window.open(`https://t.me/imageGalleryApp_bot?start=${authToken}`, '_blank');
    }
  }

  return (
    <>
      <AddPhotoModal isOpened={isOpened} setOpen={() => setOpened(!isOpened)} />
      <div className={"bg-[rgb(15,23,42)] h-[100vh] flex-col flex items-center"}>
        <div className='bg-[#1e293b] min-h-[60px] w-full flex items-center justify-center'>
          <h2 className='text-white text-2xl text-center font-semibold'>React-Gallery</h2>
        </div>

        {user.data ? <>
          <div className='w-[95vw] p-6 pb-10 flex gap-10 mt-10 justify-center items-center flex-wrap max-[428px]:w-[95vw]'>
            {images.data && images.data.map((item) => <PhotoItem src={`${API_URL}${item.imageUrl}`} title={item.title} _id={item._id} key={item._id} />)}
          </div>

          <div onClick={() => setOpened(true)} className='w-[70px] h-[70px] rounded-full fixed bottom-[30px] right-[30px] items-center flex cursor-pointer justify-center bg-[rgb(168,85,247)] hover:bg-[rgb(117,60,170)] transition z-20'>
            <Plus width={70} color='white' />
          </div>
        </> :
          <button onClick={sendMessage} className='bg-[rgb(14,165,233)] w-[200px] h-[50px] mt-10 rounded-md text-white text-xl'>Sign in with telegram</button>}

      </div>
    </>
  );
}

export default App;
