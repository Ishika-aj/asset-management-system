import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore' // ✅ fixed

export default function Navbar(){
  const user = useAuthStore(s=>s.user)
  const logout = useAuthStore(s=>s.logout)
  const navigate = useNavigate()
  const doLogout = () => { logout(); navigate('/') }
  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to={user?.role==='ADMIN'?'/admin/dashboard':'/employee/dashboard'} className="brand">AssetPro</Link>
        <nav className="nav-links">
          {user?.role === 'ADMIN' && <>
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/assets">Assets</Link>
            <Link to="/admin/history">History</Link>
          </>}
          {user?.role === 'EMPLOYEE' && <>
            <Link to="/employee/dashboard">Dashboard</Link>
            <Link to="/employee/my-assets">My Assets</Link>
          </>}
          {!user ? <Link to="/">Login</Link> : <button className="btn-link" onClick={doLogout}>Logout</button>}
        </nav>
      </div>
    </header>
  )
}
