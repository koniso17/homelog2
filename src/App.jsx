import React, { useState } from 'react'

const questions = [
  '今日の指導を100点満点で採点するとしたら、何点ですか？',
  'その点数にした理由を、ひとことで教えてください。',
  '今日の指導の中で、特に印象に残った場面はありましたか？',
  'その場面を、次回の指導にどうつなげていきたいですか？',
  '最後に、今日の自分にひとこと声をかけるとしたら？'
]

const App = () => {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const [input, setInput] = useState('')
  const [saved, setSaved] = useState(false)

  const handleNext = () => {
    if (!input) return
    const newAnswers = [...answers, input]
    setAnswers(newAnswers)
    setInput('')
    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      const today = new Date().toLocaleDateString()
      const prev = JSON.parse(localStorage.getItem('homelog') || '[]')
      localStorage.setItem('homelog', JSON.stringify([...prev, { date: today, answers: newAnswers }]))
      setSaved(true)
    }
  }

  if (saved) {
    return (
      <div style={{ padding: 20 }}>
        <h2>記録を保存しました！</h2>
        <a href="#" onClick={() => window.location.reload()}>もう一度ふりかえる</a>
        <hr />
        <h3>過去の記録</h3>
        {(JSON.parse(localStorage.getItem('homelog') || '[]')).map((entry, i) => (
          <div key={i}>
            <strong>{entry.date}</strong>
            <ul>{entry.answers.map((a, j) => <li key={j}>{questions[j]} → {a}</li>)}</ul>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>ほめログ</h2>
      <p>{questions[step]}</p>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        style={{ width: '100%', padding: '0.5em', marginBottom: '1em' }}
      />
      <button onClick={handleNext}>次へ</button>
    </div>
  )
}

export default App
