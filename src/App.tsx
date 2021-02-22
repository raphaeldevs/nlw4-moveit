import { ExperinceBar } from './components/ExperienceBar'
import './styles/global.css'

function App() {
  return (
    <div className="container">
      <ExperinceBar />

      <h1
        style={{
          textAlign: 'center',
          marginTop: '4rem',
          fontSize: '5rem'
        }}
      >
        NLW#4🚀
      </h1>
    </div>
  )
}

export default App
