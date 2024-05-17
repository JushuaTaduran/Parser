import React, { useState } from 'react'
import './App.scss'
import D3Tree from './components/D3Tree/D3Tree'
import Parser from './components/Analyzer/Parser'
import TokenTable from './components/TokenTable/TokenTable'
import GrammarTable from './components/GrammarTable/GrammarTable'
import { PacmanLoader } from 'react-spinners'
import Swal from 'sweetalert2'

const App = () => {
  const [userInput, setUserInput] = useState('')
  const [parsedResult, setParsedResult] = useState(null)
  const parser = new Parser()

  const defaultInput = 'Q = '
  const inputString = `${defaultInput}${userInput}`

  const showAlert = (title, text) => {
    Swal.fire({
      title: title,
      text: text,
      icon: 'error',
      confirmButtonText: 'Close',
      customClass: {
        confirmButton: 'bg-blue-500 text-white rounded py-2 px-4'
      }
    })
  }

  const parseInput = () => {
    if (userInput.trim() === '') {
      showAlert('Input Error', 'Input string is empty. Please enter a valid expression.')
      return
    }

    try {
      const result = parser.parse(inputString)
      setParsedResult(result)
    } catch (error) {
      showAlert('Parsing Error', error.message)
    }
  }

  const resetInputAndResult = () => {
    Swal.fire({
      title: 'Reset Confirmation',
      text: 'Are you sure you want to reset?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reset it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setUserInput('')
        setParsedResult(null)
        Swal.fire('Reset!', 'Your input and result have been reset.', 'success')
      }
    })
  }

  console.log(inputString)
  if (parsedResult != null) {
    console.log('inputString:', inputString)
    console.log('parsed', JSON.stringify(parsedResult, null, 2))
  }

  return (
    <div className="w-full h-[100vh] overflow-hidden text-white bg-[#373C42] py-12 px-24">
      <div className="flex w-full h-full justify-between gap-8">
        <div className="w-full h-full flex flex-col gap-4">
          <form action="" className="w-full" onSubmit={(e) => e.preventDefault()}>
            <p className="mb-2">Set your Expression or Inputs here</p>
            <div className="flex items-center">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="text-black px-2 border-white border-4 bg-[#87969C] rounded-md"
              />
              <button
                onClick={parseInput}
                className="ml-2 bg-gray-600 px-4 py-2 rounded-md text-white hover:bg-[#87969C] transition-all"
              >
                Parse
              </button>
            </div>
          </form>
          <div className="w-full h-full border-white border-4 bg-[#87969C] rounded-md">
            {parsedResult ? (
              <D3Tree data={parsedResult} style={{ width: '100%', height: '100%' }} />
            ) : (
              <div className="w-full h-full flex flex-col justify-center items-center">
                <div className="mb-2">
                  <PacmanLoader color="#fafafa" />
                </div>
                <p className="text-sm text-[#ebebeb]">Waiting for your Inputs...</p>
              </div>
            )}
          </div>
        </div>
        {parsedResult ? (
          <div className="w-full h-full flex flex-col gap-4 relative pr-32">
            <div className="w-full h-fit border-white border-4 bg-[#87969C] rounded-md">
              <GrammarTable data={parsedResult} />
            </div>
            <div className="w-full h-full overflow-hidden border-white border-4 bg-[#87969C] rounded-md">
              <TokenTable data={parsedResult} />
            </div>
            <button
              onClick={resetInputAndResult}
              className="rounded-full border-white border-2 w-[50px] h-[50px] absolute right-0 top-[50%] hover:scale-110 transition-all"
            >
              Reset
            </button>
          </div>
        ) : (
          <div className="w-full h-full py-[15%]">
            <div className="w-full h-full border-white border-4 bg-[#87969C] rounded-md p-16">
              <h2 className="mb-8 uppercase font-black text-2xl">Lexical and Syntax Analyzer</h2>
              <p className="mb-2 font-bold">// Team Members //</p>
              <ul className="mb-8">
                <li>Taduran, Jushua</li>
                <li>Mercado, Benedick</li>
                <li>Ramos, Jules</li>
                <li>Santos, Nelson Marc</li>
                <li>San Juan, Rochelle</li>
              </ul>
              <a
                href="https://github.com/JushuaTaduran/Parser"
                className="bg-none hover:bg-black rounded-md hover:px-4 hover:py-2 transition-all hover:font-bold"
              >
                Check GitHub
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
