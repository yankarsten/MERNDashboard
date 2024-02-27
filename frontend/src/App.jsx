import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import CreateUsers from './pages/CreateUsers';
import ShowUser from './pages/ShowUser';
import EditUser from './pages/EditUser';
import DeleteUser from './pages/DeleteUser';


const App = () => {
return (
<Routes>
  <Route path='/' element={<Home />} />
  <Route path='/users/create' element={<CreateUsers />} />
  <Route path='/users/details/:id' element={<ShowUser />} />
  <Route path='/users/edit/:id' element={<EditUser />} />
  <Route path='/users/delete' element={<DeleteUser />} />
</Routes>
)
}

export default App