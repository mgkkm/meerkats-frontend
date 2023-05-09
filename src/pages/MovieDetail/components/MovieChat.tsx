import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';
import { useRecoilValue } from 'recoil';
import { currentUserNicknameState } from '../../../recoil/JwtDecode';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const socket = io(`${BASE_URL}`);

interface MessageDataType {
  room: number;
  id: number;
  author: string;
  message: string;
  time: string;
}

export default function MovieChat() {
  const userNickname = useRecoilValue(currentUserNicknameState);
  const username = userNickname === '' ? socket.id : userNickname;
  const params = useParams();
  const roomId = Number(params.id);

  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState<MessageDataType[]>([]);
  const [onlineCount, setOnlineCount] = useState<number>(1);

  const joinRoom = () => {
    socket.emit('join_room', roomId);
  };

  useEffect(() => {
    joinRoom();

    const handleCount = (data: number) => {
      setOnlineCount(data);
    };
    socket.on('count', handleCount);

    const handlePopstate = () => {
      socket.emit('leave', roomId);
    };

    window.addEventListener('popstate', handlePopstate);

    return () => {
      socket.emit('leave', roomId);
      window.removeEventListener('popstate', handlePopstate);
      socket.off('count', handleCount);
    };
  }, []);

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room: roomId,
        id: messageList.length + 1,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit('send_message', messageData);
      setMessageList(
        prevList => [...prevList, messageData] as MessageDataType[]
      );
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', data => {
      setMessageList(prevList => [...prevList, data]);
    });
  }, [socket]);

  const enterEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="MovieChat">
      <div className="chatBox border border-mkLightGray border-b-transparent rounded-lg relative shadow-2xl">
        <div className="flex justify-between bottom-0 mt-7 mb-6 px-7">
          <img src="/images/logo_b.png" className="w-32" alt="logo" />
          <p className="text-sm">현재 접속 인원: {onlineCount}명</p>
        </div>
        <div className="h-[1px] bg-gradient-to-r from-mkBg via-mkLightGray to-mkBg" />
        <div className="chatContent">
          <ScrollToBottom className="h-[600px]">
            <div className="chat chat-start px-3 mt-5">
              <div className="chat-bubble">
                meerkats 유저들과 영화에 대한 생각을 나눠보세요!
              </div>
            </div>
            {messageList.map(({ id, author, message, time }) => {
              return (
                <div
                  className={`px-3 ${
                    username === author ? 'chat chat-end' : 'chat chat-start'
                  }`}
                  key={id}
                >
                  <div className="chat-header">
                    {author}
                    <time className="text-xs opacity-50 px-1.5">{time}</time>
                  </div>
                  <div
                    className={`chat-bubble ${
                      username === author && 'bg-mkOrange'
                    }`}
                  >
                    {message}
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className="relative">
          <input
            type="text"
            value={currentMessage}
            placeholder="Type here"
            className="input input-bordered w-full pr-20"
            onChange={e => setCurrentMessage(e.target.value)}
            onKeyPress={enterEvent}
          />
          <button
            className="btn absolute right-0 hover:bg-mkOrange hover:border-transparent"
            onClick={sendMessage}
          >
            SEND
          </button>
        </div>
      </div>
    </div>
  );
}
