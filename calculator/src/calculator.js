// 'use client'

// import React, { useState, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Moon, Sun, History, Plus, Minus, X, Divide, Equal, Percent } from 'lucide-react'

// export default function Calculator() {
//   const [expression, setExpression] = useState('0')
//   const [history, setHistory] = useState([])
//   const [isDarkMode, setIsDarkMode] = useState(true)
//   const [showHistory, setShowHistory] = useState(false)
//   const [memory, setMemory] = useState(null)
//   const [pressedKey, setPressedKey] = useState(null)

//   useEffect(() => {
//     const savedHistory = localStorage.getItem('calculatorHistory')
//     if (savedHistory) {
//       setHistory(JSON.parse(savedHistory))
//     }
//     const savedTheme = localStorage.getItem('calculatorTheme')
//     if (savedTheme) {
//       setIsDarkMode(JSON.parse(savedTheme))
//     }
//   }, [])

//   useEffect(() => {
//     localStorage.setItem('calculatorHistory', JSON.stringify(history))
//     localStorage.setItem('calculatorTheme', JSON.stringify(isDarkMode))
//     if (isDarkMode) {
//       document.documentElement.classList.add('dark')
//     } else {
//       document.documentElement.classList.remove('dark')
//     }
//   }, [history, isDarkMode])

//   useEffect(() => {
//     const handleKeyPress = (event) => {
//       const key = event.key
//       if (key >= '0' && key <= '9' || ['+', '-', '*', '/', '.', '%'].includes(key)) {
//         handleButtonClick(key === '*' ? '×' : key === '/' ? '÷' : key)
//         setPressedKey(key)
//       } else if (key === 'Enter') {
//         handleCalculate()
//         setPressedKey('=')
//       } else if (key === 'Backspace') {
//         handleClear()
//         setPressedKey('C')
//       }
//       setTimeout(() => setPressedKey(null), 100)
//     }
//     window.addEventListener('keydown', handleKeyPress)
//     return () => window.removeEventListener('keydown', handleKeyPress)
//   }, [])

//   const handleButtonClick = (value) => {
//     setExpression(prev => {
//       if (prev === '0' && !isNaN(Number(value))) {
//         return value
//       }
//       if (['+', '-', '×', '÷', '%'].includes(value) && ['+', '-', '×', '÷', '%'].includes(prev[prev.length - 1])) {
//         return prev.slice(0, -1) + value
//       }
//       return prev + value
//     })
//   }

//   const handleClear = () => {
//     setExpression('0')
//   }

//   const handleCalculate = () => {
//     try {
//       const result = evaluateExpression(expression.replace(/×/g, '*').replace(/÷/g, '/'))
//       setExpression(result.toString())
//       setHistory(prev => [{ expression, result: result.toString() }, ...prev.slice(0, 4)])
//     } catch (error) {
//       setExpression('Error')
//     }
//   }

//   const evaluateExpression = (expr) => {
//     // This is a simple implementation. For production use, consider using a proper math library.
//     return new Function('return ' + expr)()
//   }

//   const handleToggleTheme = () => {
//     setIsDarkMode(prev => !prev)
//   }

//   const handleMemoryAdd = () => {
//     setMemory(parseFloat(expression))
//   }

//   const handleMemoryRecall = () => {
//     if (memory !== null) {
//       setExpression(memory.toString())
//     }
//   }

//   const handleMemoryClear = () => {
//     setMemory(null)
//   }

//   const handleClearHistory = () => {
//     setHistory([])
//     localStorage.removeItem('calculatorHistory')
//   }

//   const buttons = [
//     { text: 'C', bg: 'bg-red-400 dark:bg-red-600', textColor: 'text-white', onClick: handleClear },
//     { text: 'MC', bg: 'bg-gray-300 dark:bg-gray-600', textColor: 'text-black dark:text-white', onClick: handleMemoryClear },
//     { text: 'MR', bg: 'bg-gray-300 dark:bg-gray-600', textColor: 'text-black dark:text-white', onClick: handleMemoryRecall },
//     { text: 'M+', bg: 'bg-gray-300 dark:bg-gray-600', textColor: 'text-black dark:text-white', onClick: handleMemoryAdd },
//     { text: '(', bg: 'bg-gray-300 dark:bg-gray-600', textColor: 'text-black dark:text-white' },
//     { text: ')', bg: 'bg-gray-300 dark:bg-gray-600', textColor: 'text-black dark:text-white' },
//     { text: '√', bg: 'bg-gray-300 dark:bg-gray-600', textColor: 'text-black dark:text-white', onClick: () => handleButtonClick('Math.sqrt(') },
//     { text: '÷', bg: 'bg-amber-500', textColor: 'text-white', icon: <Divide className="w-6 h-6" /> },
//     { text: '7', bg: 'bg-white dark:bg-gray-800', textColor: 'text-black dark:text-white' },
//     { text: '8', bg: 'bg-white dark:bg-gray-800', textColor: 'text-black dark:text-white' },
//     { text: '9', bg: 'bg-white dark:bg-gray-800', textColor: 'text-black dark:text-white' },
//     { text: '×', bg: 'bg-amber-500', textColor: 'text-white', icon: <X className="w-6 h-6" /> },
//     { text: '4', bg: 'bg-white dark:bg-gray-800', textColor: 'text-black dark:text-white' },
//     { text: '5', bg: 'bg-white dark:bg-gray-800', textColor: 'text-black dark:text-white' },
//     { text: '6', bg: 'bg-white dark:bg-gray-800', textColor: 'text-black dark:text-white' },
//     { text: '-', bg: 'bg-amber-500', textColor: 'text-white', icon: <Minus className="w-6 h-6" /> },
//     { text: '1', bg: 'bg-white dark:bg-gray-800', textColor: 'text-black dark:text-white' },
//     { text: '2', bg: 'bg-white dark:bg-gray-800', textColor: 'text-black dark:text-white' },
//     { text: '3', bg: 'bg-white dark:bg-gray-800', textColor: 'text-black dark:text-white' },
//     { text: '+', bg: 'bg-amber-500', textColor: 'text-white', icon: <Plus className="w-6 h-6" /> },
//     { text: '0', bg: 'bg-white dark:bg-gray-800', textColor: 'text-black dark:text-white', cols: 'col-span-2' },
//     { text: '%', bg: 'bg-white dark:bg-gray-800', textColor: 'text-black dark:text-white', icon: <Percent className="w-5 h-5" /> },
//     { text: '=', bg: 'bg-green-500 dark:bg-green-600', textColor: 'text-white', onClick: handleCalculate, icon: <Equal className="w-6 h-6" /> },
//   ]

//   return (
//     <div className={`flex items-center justify-center min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
//       <div className="w-96 bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl">
//         <div className="h-40 bg-gray-100 dark:bg-gray-700 flex flex-col items-end justify-end p-6 space-y-2">
//           <motion.span 
//             className="text-black dark:text-white text-5xl font-light tracking-wider"
//             key={expression}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.2 }}
//           >
//             {expression}
//           </motion.span>
//         </div>
//         <div className="p-4 bg-gray-50 dark:bg-gray-900">
//           <div className="grid grid-cols-4 gap-2">
//             {buttons.map((button, index) => (
//               <motion.button
//                 key={index}
//                 className={`${button.bg} ${button.textColor} h-16 text-2xl font-medium rounded-2xl ${button.cols || ''} 
//                             transition-colors duration-200 focus:outline-none flex items-center justify-center`}
//                 onClick={() => {
//                   button.onClick ? button.onClick() : handleButtonClick(button.text)
//                 }}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 animate={pressedKey === button.text ? { scale: 0.95 } : { scale: 1 }}
//                 transition={{ type: "spring", stiffness: 400, damping: 17 }}
//               >
//                 {button.icon || button.text}
//               </motion.button>
//             ))}
//           </div>
//         </div>
//         <div className="flex justify-between items-center px-4 py-2 bg-gray-200 dark:bg-gray-700">
//           <button 
//             onClick={() => setShowHistory(prev => !prev)}
//             className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors duration-200 flex items-center"
//           >
//             <History className="w-5 h-5 mr-2" />
//             {showHistory ? 'Hide History' : 'Show History'}
//           </button>
//           <button onClick={handleToggleTheme} className="text-gray-600 dark:text-gray-300">
//             {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//           </button>
//         </div>
//         <AnimatePresence>
//           {showHistory && (
//             <motion.div 
//               initial={{ height: 0, opacity: 0 }} 
//               animate={{ height: 'auto', opacity: 1 }} 
//               exit={{ height: 0, opacity: 0 }}
//               className="overflow-hidden bg-gray-50 dark:bg-gray-800 p-4"
//             >
//               <div className="space-y-2">
//                 {history.map((item, index) => (
//                   <div key={index} className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
//                     <span>{item.expression}</span>
//                     <span>{item.result}</span>
//                   </div>
//                 ))}
//                 {history.length > 0 && (
//                   <button 
//                     onClick={handleClearHistory} 
//                     className="w-full mt-2 text-red-500 hover:text-red-700 text-xs"
//                   >
//                     Clear History
//                   </button>
//                 )}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   )
// }


// 'use client'

// import React, { useState, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Moon, Sun, History, Plus, Minus, X, Divide, Equal, Percent, Delete } from 'lucide-react'

// export default function Calculator() {
//   const [expression, setExpression] = useState('0')
//   const [history, setHistory] = useState([])
//   const [isDarkMode, setIsDarkMode] = useState(true)
//   const [showHistory, setShowHistory] = useState(false)
//   const [pressedKey, setPressedKey] = useState(null)
//   const [lastCalculated, setLastCalculated] = useState('')

//   const MAX_INPUT_LENGTH = 20

//   useEffect(() => {
//     const savedHistory = localStorage.getItem('calculatorHistory')
//     if (savedHistory) setHistory(JSON.parse(savedHistory))

//     const savedTheme = localStorage.getItem('calculatorTheme')
//     if (savedTheme) setIsDarkMode(JSON.parse(savedTheme))
//   }, [])

//   useEffect(() => {
//     localStorage.setItem('calculatorHistory', JSON.stringify(history))
//     localStorage.setItem('calculatorTheme', JSON.stringify(isDarkMode))
//     document.documentElement.classList.toggle('dark', isDarkMode)
//   }, [history, isDarkMode])

//   useEffect(() => {
//     const handleKeyPress = (event) => {
//       const key = event.key
//       if (/[\d+\-*/.%]/.test(key)) handleButtonClick(key === '*' ? '×' : key === '/' ? '÷' : key)
//       else if (key === 'Enter') handleCalculate()
//       else if (key === 'Backspace') handleBackspace()
//       setPressedKey(key)
//       setTimeout(() => setPressedKey(null), 100)
//     }
//     window.addEventListener('keydown', handleKeyPress)
//     return () => window.removeEventListener('keydown', handleKeyPress)
//   }, [expression])

//   const handleButtonClick = (value) => {
//     setExpression((prev) => {
//       if (prev.length >= MAX_INPUT_LENGTH) return prev;

//       if (prev === '0' && !isNaN(Number(value))) return value
//       if (['+', '-', '×', '÷', '%'].includes(value) && ['+', '-', '×', '÷', '%'].includes(prev.slice(-1))) return prev.slice(0, -1) + value
//       return prev + value
//     })
//   }

//   const handleClear = () => setExpression('0')

//   const handleBackspace = () => setExpression((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'))

//   const handleCalculate = () => {
//     if (expression === lastCalculated) {
//       // Prevent recalculation if the expression is the same as the last calculation
//       return
//     }

//     try {
//       // Ensure there's no incomplete expression like an operator at the end
//       const sanitizedExpression = expression.trim().replace(/×/g, '*').replace(/÷/g, '/')
//       if (/[^0-9+\-*/.%]/.test(sanitizedExpression) || /[+\-*/.%]$/.test(sanitizedExpression)) {
//         setExpression('Error')
//         return
//       }
      
//       const result = evaluateExpression(sanitizedExpression)
//       setExpression(result.toString())
//       setLastCalculated(sanitizedExpression)
//       setHistory((prev) => [{ expression: sanitizedExpression, result: result.toString() }, ...prev.slice(0, 4)])
//     } catch {
//       setExpression('Error')
//     }
//   }

//   const evaluateExpression = (expr) => {
//     return new Function('return ' + expr)()
//   }

//   const handleToggleTheme = () => setIsDarkMode((prev) => !prev)

//   const handleClearHistory = () => {
//     setHistory([])
//     localStorage.removeItem('calculatorHistory')
//   }

//   const buttons = [
//     { text: 'C', bg: 'bg-red-400 dark:bg-red-600', onClick: handleClear },
//     { text: '⌫', bg: 'bg-gray-300 dark:bg-gray-600', onClick: handleBackspace, icon: <Delete className="w-5 h-5" /> },
//     { text: '%', bg: 'bg-gray-300 dark:bg-gray-600', onClick: () => handleButtonClick('%'), icon: <Percent className="w-5 h-5" /> },
//     { text: '÷', bg: 'bg-amber-500', onClick: () => handleButtonClick('÷'), icon: <Divide className="w-6 h-6" /> },
//     { text: '7', bg: 'bg-white dark:bg-gray-800' },
//     { text: '8', bg: 'bg-white dark:bg-gray-800' },
//     { text: '9', bg: 'bg-white dark:bg-gray-800' },
//     { text: '×', bg: 'bg-amber-500', onClick: () => handleButtonClick('×'), icon: <X className="w-6 h-6" /> },
//     { text: '4', bg: 'bg-white dark:bg-gray-800' },
//     { text: '5', bg: 'bg-white dark:bg-gray-800' },
//     { text: '6', bg: 'bg-white dark:bg-gray-800' },
//     { text: '-', bg: 'bg-amber-500', onClick: () => handleButtonClick('-'), icon: <Minus className="w-6 h-6" /> },
//     { text: '1', bg: 'bg-white dark:bg-gray-800' },
//     { text: '2', bg: 'bg-white dark:bg-gray-800' },
//     { text: '3', bg: 'bg-white dark:bg-gray-800' },
//     { text: '+', bg: 'bg-amber-500', onClick: () => handleButtonClick('+'), icon: <Plus className="w-6 h-6" /> },
//     { text: '0', bg: 'bg-white dark:bg-gray-800', cols: 'col-span-2' },
//     { text: '.', bg: 'bg-gray-300 dark:bg-gray-600', onClick: () => handleButtonClick('.') },
//     { text: '=', bg: 'bg-green-500 dark:bg-green-600', onClick: handleCalculate, icon: <Equal className="w-6 h-6" /> },
//   ]

//   const calculateFontSize = (expression) => {
//     const length = expression.length
//     if (length <= 10) return 'text-5xl'
//     if (length <= 15) return 'text-4xl'
//     return 'text-3xl'
//   }

//   return (
//     <div className={`flex items-center justify-center min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
//       <div className="w-96 bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl">
//         <div className="h-40 bg-gray-100 dark:bg-gray-700 flex flex-col items-end justify-end p-6">
//           <motion.span
//             className={`text-black dark:text-white font-light tracking-wider ${calculateFontSize(expression)}`}
//             key={expression}
//             style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
//           >
//             {expression}
//           </motion.span>
//         </div>
//         <div className="p-4 bg-gray-50 dark:bg-gray-900">
//           <div className="grid grid-cols-4 gap-2">
//             {buttons.map((button, index) => (
//               <motion.button
//                 key={index}
//                 className={`${button.bg} h-16 text-2xl font-medium rounded-2xl ${button.cols || ''} transition-colors duration-200 focus:outline-none flex items-center justify-center`}
//                 onClick={() => button.onClick ? button.onClick() : handleButtonClick(button.text)}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 animate={pressedKey === button.text ? { scale: 0.95 } : { scale: 1 }}
//               >
//                 {button.icon || button.text}
//               </motion.button>
//             ))}
//           </div>
//         </div>
//         <div className="flex justify-between items-center px-4 py-2 bg-gray-200 dark:bg-gray-700">
//           <button 
//             onClick={() => setShowHistory((prev) => !prev)}
//             className="text-sm text-gray-600 dark:text-gray-300 flex items-center"
//           >
//             <History className="w-5 h-5 mr-2" />
//             {showHistory ? 'Hide History' : 'Show History'}
//           </button>
//           <button onClick={handleToggleTheme} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
//             {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//           </button>
//         </div>

//         <AnimatePresence>
//           {showHistory && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="p-4"
//             >
//               <div className="space-y-2">
//                 {history.map((item, index) => (
//                   <div key={index} className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
//                     <span>{item.expression}</span>
//                     <span>{item.result}</span>
//                   </div>
//                 ))}
//                 {history.length > 0 && (
//                   <button 
//                     onClick={handleClearHistory} 
//                     className="w-full mt-2 text-red-500 hover:text-red-700 text-xs"
//                   >
//                     Clear History
//                   </button>
//                 )}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   )
// }

'use client'

import React, { useState, useEffect } from 'react'
import { motion,} from 'framer-motion'
import { History, Plus, Minus, X, Divide, Equal, Percent, Delete } from 'lucide-react'

export default function Calculator() {
  const [expression, setExpression] = useState('0')
  const [history, setHistory] = useState([])
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [showHistory, setShowHistory] = useState(false)
  const [pressedKey, setPressedKey] = useState(null)
  const [lastCalculated, setLastCalculated] = useState('')
  const [isResult, setIsResult] = useState(false)

  const MAX_INPUT_LENGTH = 20

  useEffect(() => {
    const savedHistory = localStorage.getItem('calculatorHistory')
    if (savedHistory) setHistory(JSON.parse(savedHistory))

    const savedTheme = localStorage.getItem('calculatorTheme')
    if (savedTheme) setIsDarkMode(JSON.parse(savedTheme))
  }, [])

  useEffect(() => {
    localStorage.setItem('calculatorHistory', JSON.stringify(history))
    localStorage.setItem('calculatorTheme', JSON.stringify(isDarkMode))
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [history, isDarkMode])

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key
      if (/[\d+\-*/.%]/.test(key)) handleButtonClick(key === '*' ? '×' : key === '/' ? '÷' : key)
      else if (key === 'Enter') handleCalculate()
      else if (key === 'Backspace') handleBackspace()
      else if (key === 'Escape' || key === 'Delete') handleClear()
      setPressedKey(key)
      setTimeout(() => setPressedKey(null), 100)
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  },)

  const handleButtonClick = (value) => {
    setExpression((prev) => {
      if (isResult && !isNaN(Number(value))) {
        setIsResult(false)
        return value
      }

      if (prev.length >= MAX_INPUT_LENGTH) return prev

      if (prev === '0' && !isNaN(Number(value))) return value
      if (['+', '-', '×', '÷', '%'].includes(value) && ['+', '-', '×', '÷', '%'].includes(prev.slice(-1))) return prev.slice(0, -1) + value
      
      setIsResult(false)
      return prev + value
    })
  }

  const handleClear = () => {
    setExpression('0')
    setIsResult(false)
  }

  const handleBackspace = () => {
    setExpression((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'))
    setIsResult(false)
  }

  const handleCalculate = () => {
    if (expression === lastCalculated) return

    try {
      const sanitizedExpression = expression.trim().replace(/×/g, '*').replace(/÷/g, '/')
      if (/[^0-9+\-*/.%]/.test(sanitizedExpression) || /[+\-*/.%]$/.test(sanitizedExpression)) {
        setExpression('Error')
        return
      }

      const result = evaluateExpression(sanitizedExpression)
      setExpression(result.toString())
      setLastCalculated(sanitizedExpression)
      setHistory((prev) => [{ expression: sanitizedExpression, result: result.toString() }, ...prev.slice(0, 4)])
      setIsResult(true)
    } catch {
      setExpression('Error')
    }
  }

  const evaluateExpression = (expr) => {
    return new Function('return ' + expr)()
  }


  const handleClearHistory = () => {
    setHistory([])
    localStorage.removeItem('calculatorHistory')
  }

  const buttons = [
    { text: 'C', bg: 'bg-red-400 dark:bg-red-600', onClick: handleClear },
    { text: '⌫', bg: 'bg-gray-300 dark:bg-gray-600', onClick: handleBackspace, icon: <Delete className="w-5 h-5" /> },
    { text: '%', bg: 'bg-gray-300 dark:bg-gray-600', onClick: () => handleButtonClick('%'), icon: <Percent className="w-5 h-5" /> },
    { text: '÷', bg: 'bg-amber-500', onClick: () => handleButtonClick('÷'), icon: <Divide className="w-6 h-6" /> },
    { text: '7', bg: 'bg-white dark:bg-gray-800' },
    { text: '8', bg: 'bg-white dark:bg-gray-800' },
    { text: '9', bg: 'bg-white dark:bg-gray-800' },
    { text: '×', bg: 'bg-amber-500', onClick: () => handleButtonClick('×'), icon: <X className="w-6 h-6" /> },
    { text: '4', bg: 'bg-white dark:bg-gray-800' },
    { text: '5', bg: 'bg-white dark:bg-gray-800' },
    { text: '6', bg: 'bg-white dark:bg-gray-800' },
    { text: '-', bg: 'bg-amber-500', onClick: () => handleButtonClick('-'), icon: <Minus className="w-6 h-6" /> },
    { text: '1', bg: 'bg-white dark:bg-gray-800' },
    { text: '2', bg: 'bg-white dark:bg-gray-800' },
    { text: '3', bg: 'bg-white dark:bg-gray-800' },
    { text: '+', bg: 'bg-amber-500', onClick: () => handleButtonClick('+'), icon: <Plus className="w-6 h-6" /> },
    { text: '0', bg: 'bg-white dark:bg-gray-800', cols: 'col-span-2' },
    { text: '.', bg: 'bg-gray-300 dark:bg-gray-600', onClick: () => handleButtonClick('.') },
    { text: '=', bg: 'bg-green-500 dark:bg-green-600', onClick: handleCalculate, icon: <Equal className="w-6 h-6" /> },
  ]

  const calculateFontSize = (expression) => {
    const length = expression.length
    if (length <= 10) return 'text-5xl'
    if (length <= 15) return 'text-4xl'
    return 'text-3xl'
  }

  return (
    <div className={`flex items-center justify-center min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <div className="w-96 bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl">
        {!showHistory && (
          <div>
            <div className="h-40 bg-gray-100 dark:bg-gray-700 flex flex-col items-end justify-end p-6">
              <motion.span
                className={`text-black dark:text-white font-light tracking-wider ${calculateFontSize(expression)}`}
                key={expression}
                style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
              >
                {expression}
              </motion.span>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-900">
              <div className="grid grid-cols-4 gap-2">
                {buttons.map((button, index) => (
                  <motion.button
                    key={index}
                    className={`${button.bg} h-16 text-2xl font-medium rounded-2xl ${button.cols || ''} transition-colors duration-200 focus:outline-none flex items-center justify-center`}
                    onClick={() => button.onClick ? button.onClick() : handleButtonClick(button.text)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={pressedKey === button.text ? { scale: 0.95 } : { scale: 1 }}
                  >
                    {button.icon || button.text}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        )}
        {showHistory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 bg-gray-100 dark:bg-gray-800 h-96"
          >
            {history.length ? (
              history.map((item, index) => (
                <div key={index} className="flex justify-between items-center text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-300">{item.expression}</span>
                  <span className="text-gray-900 dark:text-white font-medium">{item.result}</span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 dark:text-gray-500">No history available</p>
            )}
            <button
              className="mt-4 bg-red-500 dark:bg-red-700 text-white py-2 px-4 rounded-lg w-full"
              onClick={handleClearHistory}
            >
              Clear History
            </button>
          </motion.div>
        )}
        <button
          className="absolute top-2 left-2 p-2 bg-gray-200 dark:bg-gray-700 rounded-full shadow-md"
          onClick={() => setShowHistory(!showHistory)}
        >
          <History className="w-6 h-6 text-gray-600 dark:text-gray-200" />
        </button>
      </div>
    </div>
  )
}
