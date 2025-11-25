import { useState } from 'react'

function App() {
  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <h1>Admin Frontend</h1>
      <p>This is a new Vite + React + TypeScript admin frontend.</p>
      <div className="card" style={{ padding: '2rem' }}>
        <h2>Theme Integration</h2>
        <p>The styling you see here is coming from the shared theme configuration.</p>
        <button className="btn btn-primary">Primary Button</button>
        <button className="btn btn-secondary" style={{ marginLeft: '1rem' }}>Secondary Button</button>
      </div>
    </div>
  )
}

export default App
