
import { useContext } from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import './index.css'
import SignUp from './components/SignUp'
import Login from './components/Login'
import { AuthContext } from './context/AuthContext';
import ChatMain from './components/ChatMain';
import Navbar from './components/Navbar';
import { ChatContextProvider } from './context/ChatContext';
const App = () => {


  const { user } = useContext(AuthContext);
  // const user = { _id: '1234' };

  // console.log(useContext(ChatContext))

  return (


    <>

      <ChatContextProvider user={user}>

        <Navbar />
        <Routes>
          <Route path="/" element={user ? <ChatMain /> : <Login />} />
          <Route path="/signup" element={user ? <ChatMain /> : <SignUp />} />
          <Route path="/login" element={user ? <ChatMain /> : <Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

      </ChatContextProvider>
    </>
  )
}

export default App
