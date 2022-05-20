import React from 'react'
import { NavLink } from 'react-router-dom'
import "./NavBar.css"

export default function NavBar() {
  return (
    <div><ul>
      <li>
        <NavLink to= '/home' className={({isActive})=> (isActive ? 'active' : 'inactive')}>Home</NavLink>
      </li>
      <li>
        <NavLink to='/recipe' className={({isActive})=> (isActive ? 'active' : 'inactive')}>Cooking Station</NavLink>
      </li>
      <li>
        <NavLink to= '/Cookbook' className={({isActive})=> (isActive ? 'active' : 'inactive')}>Your Cookbook</NavLink>
      </li>
      <li>
        <NavLink to='/types' className={({isActive})=> (isActive ? 'active' : 'inactive')}>Diet Types</NavLink>
      </li>
      </ul></div>
  )
}
