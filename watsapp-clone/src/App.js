import React,{useEffect,useState} from 'react';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Pusher from 'pusher-js';
import axios from './axios'

function App() {


  const [messages,setMessages]=useState([]);
  useEffect(()=>{
    axios.get('/messages/sync')
    .then((resp)=>{
      setMessages(resp.data);
    });
  },[])

  useEffect(() => {
    const pusher = new Pusher('441374d6fb5e30613e83', {
      cluster: 'ap2'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', function(data) {
    
      setMessages([...messages,data]);
    });
    
    return ()=>{
      channel.unbind_all();
      channel.unsubscribe();
    }
   
  }, [messages]);

  console.log(messages);
  return (
    <div className="app">
      <div className="app__body">
        {/* SIDEBAR */}
          <Sidebar/>
        {/* Chat WINDOW */}
        <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
