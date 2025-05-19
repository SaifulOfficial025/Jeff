"use client"

import { useState } from "react"
import { ChevronDown } from 'lucide-react'
import { Link } from "react-router-dom"

export default function Fabrication_Capabilities() {
  const [step, setStep] = useState(3)
  const totalSteps = 4

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-5xl  rounded-lg p-6">
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

        {step === 1 && (
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
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-center text-blue-400 mb-6">General & Project Context</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm">What is your company size (number of shop/field employees)?</label>
                <div className="relative">
                  <select className="w-full bg-gray-800 border border-gray-700 rounded p-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option>51-100</option>
                    <option>1-10</option>
                    <option>11-25</option>
                    <option>26-50</option>
                    <option>101-250</option>
                    <option>251+</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={20}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm">What is your company's union affiliation?</label>
                <div className="relative">
                  <select className="w-full bg-gray-800 border border-gray-700 rounded p-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option>Shop Union / Field Non-Union</option>
                    <option>All Union</option>
                    <option>All Non-Union</option>
                    <option>Shop Non-Union / Field Union</option>
                    <option>Mixed</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={20}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm">
                  Which AISC certifications does your company hold? (Select all that apply)
                </label>
                <div className="relative">
                  <select className="w-full bg-gray-800 border border-gray-700 rounded p-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option>Fabricator (BU, SBR, CBR, ABR)</option>
                    <option>Erector (CSE, ASCE)</option>
                    <option>Component Manufacturer (CPT, STD)</option>
                    <option>None</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={20}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm">
                  What is the typical project size your company handles (in tonnage)?
                </label>
                <div className="relative">
                  <select className="w-full bg-gray-800 border border-gray-700 rounded p-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option>501 - 1500 Tons</option>
                    <option>0 - 100 Tons</option>
                    <option>101 - 500 Tons</option>
                    <option>1501 - 3000 Tons</option>
                    <option>3001+ Tons</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={20}
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm">What are your primary project types? (Select top 2-3)</label>
                <div className="relative">
                  <select className="w-full bg-gray-800 border border-gray-700 rounded p-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option>Government/Public Works</option>
                    <option>Commercial</option>
                    <option>Industrial</option>
                    <option>Healthcare</option>
                    <option>Education</option>
                    <option>Infrastructure</option>
                    <option>Residential</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={20}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-center text-blue-400 mb-6">Fabrication Shop Capabilities</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm">What is the size of your fabrication shop?</label>
                <div className="relative">
                  <select className="w-full bg-gray-800 border border-gray-700 rounded p-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option>10k - 25k sqft</option>
                    <option>Less than 5k sqft</option>
                    <option>5k - 10k sqft</option>
                    <option>25k - 50k sqft</option>
                    <option>50k+ sqft</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={20}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm">How would you describe your shop layout and workflow?</label>
                <div className="relative">
                  <select className="w-full bg-gray-800 border border-gray-700 rounded p-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option>Congested/Inefficient</option>
                    <option>Highly Efficient</option>
                    <option>Moderately Efficient</option>
                    <option>Needs Improvement</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={20}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm">What is the capacity of your main bay crane?</label>
                <div className="relative">
                  <select className="w-full bg-gray-800 border border-gray-700 rounded p-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option>5 - 10 tons</option>
                    <option>Less than 5 tons</option>
                    <option>10 - 20 tons</option>
                    <option>20 - 50 tons</option>
                    <option>50+ tons</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={20}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm">Do you have a CNC Beam Line?</label>
                <div className="relative">
                  <select className="w-full bg-gray-800 border border-gray-700 rounded p-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option>Yes</option>
                    <option>No</option>
                    <option>Planning to acquire</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={20}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm">Do you have a CNC Plate Processor?</label>
                <div className="relative">
                  <select className="w-full bg-gray-800 border border-gray-700 rounded p-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option>Yes</option>
                    <option>No</option>
                    <option>Planning to acquire</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={20}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm">Do you use automated coping or thermal cutting?</label>
                <div className="relative">
                  <select className="w-full bg-gray-800 border border-gray-700 rounded p-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option>Yes</option>
                    <option>No</option>
                    <option>Limited capability</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={20}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm">What is the extent of your robotic welding capabilities?</label>
                <div className="relative">
                  <select className="w-full bg-gray-800 border border-gray-700 rounded p-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option>Specific Tasks</option>
                    <option>None</option>
                    <option>Limited</option>
                    <option>Extensive</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={20}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm">What percentage of your welders are certified?</label>
                <div className="relative">
                  <select className="w-full bg-gray-800 border border-gray-700 rounded p-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option>50 - 75%</option>
                    <option>Less than 25%</option>
                    <option>25 - 50%</option>
                    <option>75 - 100%</option>
                    <option>100%</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={20}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm">What is the average fabrication labor experience?</label>
                <div className="relative">
                  <select className="w-full bg-gray-800 border border-gray-700 rounded p-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option>7 - 15 years</option>
                    <option>Less than 3 years</option>
                    <option>3 - 7 years</option>
                    <option>15+ years</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={20}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm">What coating facilities does your shop have?</label>
                <div className="relative">
                  <select className="w-full bg-gray-800 border border-gray-700 rounded p-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option>None/Outsource</option>
                    <option>Basic Primer Only</option>
                    <option>Full Paint Shop</option>
                    <option>Galvanizing</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={20}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* {(step === 2 || step === 3) && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleNext}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-full transition-colors w-full max-w-xs"
            >
              Next
            </button>
          </div>
        )} */}

         <div className="flex items-center justify-center w-1/2 mx-auto mt-5">
  <Link
    to="/field_erection"
    className="text-[18px] bg-[#2473CD] rounded-full w-full  py-[6px] text-center text-white"
  >
    Next
  </Link>
</div>
      </div>
    </div>
  )
}

