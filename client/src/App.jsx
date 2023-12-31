import { Routes, Route } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import { useEffect } from 'react'
import { useStore } from './store'

import Container from 'react-bootstrap/Container'

import Header from './components/Header'
import Footer from './components/Footer'
import Protect from './components/Protect'

import Home from './pages/Home'
import Auth from './pages/Auth'
import Profile from './pages/Profile'
import User from './pages/User'
import NotFound from './pages/NotFound'

export const AUTHENTICATE = gql`
  query {
    authenticate {
      _id
      email
      username
      profilePicture
      wishlists {
        _id
        name
      }
    }
  }
`

function App() {
  const { loading, error, data: userData } = useQuery(AUTHENTICATE);
  const { setState } = useStore()

  useEffect(() => {
    if (userData) {
      setState(oldState => ({
        ...oldState,
        user: userData.authenticate
      }))
    }
  }, [userData])

  return (
    <>
      {loading ? (
        <h3 className='d=flex justify-content-center align-items-center vh-100'>Loading...</h3>
      ) : (
        <>
          <Header />

          <Container>
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/login' element={<Auth isLogin={true} />}></Route>
              <Route path='/register' element={<Auth isLogin={false} />}></Route>
              <Route path='/profile' element={<Protect user={userData}>
                <Profile userData={userData} />
              </Protect>}></Route>
              <Route path='/user/:userId' element={<User />}></Route>

              <Route path='*' element={<NotFound />}></Route>
            </Routes>
          </Container>

          <Footer />
        </>
      )}
    </>
  )
}

export default App
