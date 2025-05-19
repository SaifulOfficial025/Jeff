"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Link } from "react-router-dom"

export default function Base_Labor_rates() {
  const [step, setStep] = useState(1)
  const totalSteps = 5

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-blue-400 mb-4">DO5 Estimator</h1>

        <p className="text-center mb-6">Tell Us About Your Company to Personalize Your Experience</p>

        {/* Progress bar */}
        <div className="relative mb-12">
          <div className="w-full h-1 bg-gray-700 rounded-full">
            <div className="h-1 bg-blue-400 rounded-full" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
          </div>
          <div
            className="absolute top-0 w-4 h-4 bg-blue-400 rounded-full -mt-1.5"
            style={{ left: `${(step / totalSteps) * 100}%`, transform: "translateX(-50%)" }}
          ></div>
        </div>

        <div className="space-y-8">
          <h2 className="text-xl font-semibold text-center text-blue-400 mb-6">Base Labor Rates</h2>

          <div className="space-y-2">
            <label className="block text-sm">
              What is your company's standard fully burdened shop labor rate ($/hr) used for estimating fabrication?
            </label>
            <div className="relative">
              <select className="w-full bg-gray-800 border border-gray-700 rounded p-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option>Include wages</option>
                <option>$50 - $75</option>
                <option>$75 - $100</option>
                <option>$100 - $125</option>
                <option>$125 - $150</option>
                <option>$150+</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                size={20}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm">
              What is your company's standard fully burdened field labor rate ($/hr) used for estimating erection?
            </label>
            <div className="relative">
              <select className="w-full bg-gray-800 border border-gray-700 rounded p-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option>Insurance</option>
                <option>$60 - $85</option>
                <option>$85 - $110</option>
                <option>$110 - $135</option>
                <option>$135 - $160</option>
                <option>$160+</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                size={20}
              />
            </div>
          </div>

   <div className="flex items-center justify-center w-1/2 mx-auto">
  <Link
    to="/general_project_context"
    className="text-[18px] bg-[#2473CD] rounded-full w-full  py-[6px] text-center text-white"
  >
    Next
  </Link>
</div>

        </div>
      </div>
    </div>
  )
}


