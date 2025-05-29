
import React, { useState } from 'react';
import { Calculator as CalculatorIcon } from 'lucide-react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleOperation = (op: string) => {
    if (op === '=') {
      if (operation && previousValue !== null) {
        const inputValue = parseFloat(display);
        const newValue = calculate(previousValue, inputValue, operation);
        setDisplay(String(newValue));
        setPreviousValue(null);
        setOperation(null);
        setWaitingForOperand(true);
      }
    } else {
      performOperation(op);
    }
  };

  const Button = ({ onClick, className = '', children, ...props }: any) => (
    <button
      onClick={onClick}
      className={`h-16 rounded-2xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl ${className}`}
      {...props}
    >
      {children}
    </button>
  );

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/50">
      {/* Display */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-6 mb-6 shadow-inner">
        <div className="text-right">
          <div className="text-white/70 text-sm mb-1">
            {operation && previousValue !== null ? `${previousValue} ${operation}` : ''}
          </div>
          <div className="text-white text-4xl font-bold truncate">
            {display}
          </div>
        </div>
      </div>

      {/* Buttons Grid */}
      <div className="grid grid-cols-4 gap-3">
        {/* First Row */}
        <Button
          onClick={clear}
          className="col-span-2 bg-gradient-to-r from-pink-400 to-pink-500 text-white hover:from-pink-500 hover:to-pink-600"
        >
          Clear
        </Button>
        <Button
          onClick={() => handleOperation('÷')}
          className="bg-gradient-to-r from-purple-400 to-purple-500 text-white hover:from-purple-500 hover:to-purple-600"
        >
          ÷
        </Button>
        <Button
          onClick={() => handleOperation('×')}
          className="bg-gradient-to-r from-purple-400 to-purple-500 text-white hover:from-purple-500 hover:to-purple-600"
        >
          ×
        </Button>

        {/* Second Row */}
        <Button
          onClick={() => inputNumber('7')}
          className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-gray-200 hover:to-gray-300"
        >
          7
        </Button>
        <Button
          onClick={() => inputNumber('8')}
          className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-gray-200 hover:to-gray-300"
        >
          8
        </Button>
        <Button
          onClick={() => inputNumber('9')}
          className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-gray-200 hover:to-gray-300"
        >
          9
        </Button>
        <Button
          onClick={() => handleOperation('-')}
          className="bg-gradient-to-r from-purple-400 to-purple-500 text-white hover:from-purple-500 hover:to-purple-600"
        >
          -
        </Button>

        {/* Third Row */}
        <Button
          onClick={() => inputNumber('4')}
          className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-gray-200 hover:to-gray-300"
        >
          4
        </Button>
        <Button
          onClick={() => inputNumber('5')}
          className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-gray-200 hover:to-gray-300"
        >
          5
        </Button>
        <Button
          onClick={() => inputNumber('6')}
          className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-gray-200 hover:to-gray-300"
        >
          6
        </Button>
        <Button
          onClick={() => handleOperation('+')}
          className="bg-gradient-to-r from-purple-400 to-purple-500 text-white hover:from-purple-500 hover:to-purple-600"
        >
          +
        </Button>

        {/* Fourth Row */}
        <Button
          onClick={() => inputNumber('1')}
          className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-gray-200 hover:to-gray-300"
        >
          1
        </Button>
        <Button
          onClick={() => inputNumber('2')}
          className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-gray-200 hover:to-gray-300"
        >
          2
        </Button>
        <Button
          onClick={() => inputNumber('3')}
          className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-gray-200 hover:to-gray-300"
        >
          3
        </Button>
        <Button
          onClick={() => handleOperation('=')}
          className="row-span-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700"
        >
          =
        </Button>

        {/* Fifth Row */}
        <Button
          onClick={() => inputNumber('0')}
          className="col-span-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-gray-200 hover:to-gray-300"
        >
          0
        </Button>
        <Button
          onClick={inputDecimal}
          className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-gray-200 hover:to-gray-300"
        >
          .
        </Button>
      </div>

      {/* Calculator Icon */}
      <div className="flex justify-center mt-4">
        <CalculatorIcon className="w-6 h-6 text-purple-400" />
      </div>
    </div>
  );
};

export default Calculator;
