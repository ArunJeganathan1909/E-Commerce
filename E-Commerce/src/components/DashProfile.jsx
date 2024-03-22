import React from 'react'
import { useSelector } from 'react-redux'

const DashProfile = () => {
    const {currentUser} = useSelector((state) => state.user)
  return (
    <div>DashProfile
    </div>
  )
}

export default DashProfile