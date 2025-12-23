import React from 'react'
import './home.css'
const Loading = () => {
  return (
    <div className="loader-overlay">
  <div className="spinner"></div>
  <p>Loading products...</p>
</div>
  )
}

export default Loading