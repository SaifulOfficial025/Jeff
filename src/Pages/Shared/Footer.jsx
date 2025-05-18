import React from 'react'

const Footer = () => {
  return (
    <div className='bg-[#00224A] '>
      <footer className="footer px-28 sm:footer-horizontal text-base-content p-10">
  <nav className='text-white'>
<h1 className='text-[38px] font-bold text-[#1471FF]'>DO5 Estimator</h1>
<p className='w-2/4 mt-2 text-[16px] text-[#D4D4D4]'>Designed to simplify your project management, it saves time, improves accuracy, and supports efficient decision-making throughout the construction process.</p>
  </nav>
  <nav className='text-white'>
    <h6 className="footer-title font-semibold text-[18px] italic text-white">Quick Access</h6>
    <a className="link link-hover text-[16px]">Branding</a>
    <a className="link link-hover text-[16px]">Design</a>
    <a className="link link-hover text-[16px]">Marketing</a>
    <a className="link link-hover text-[16px]">Advertisement</a>
  </nav>
  <nav className='text-white'>
    <h6 className="footer-title font-semibold text-[18px] italic text-white">Contact</h6>
    <a className="link link-hover text-[16px]">About us</a>
    <a className="link link-hover text-[16px]">Contact</a>
    <a className="link link-hover text-[16px]">Jobs</a>
    <a className="link link-hover text-[16px]">Press kit</a>
  </nav>

  <nav className='text-white'>
    <h6 className="footer-title font-semibold text-[18px] italic text-white">Follow On </h6>
    <div className="grid grid-flow-col gap-4">
      <a>
       <img src="https://cdn-icons-png.flaticon.com/128/2111/2111463.png" alt="" className='w-[43px] rounded-full' />
      </a>

      <a>
        <img src="https://cdn-icons-png.flaticon.com/128/2504/2504903.png" alt="" className='w-[43px] rounded-full' />
      </a>

      <a>
       <img src="https://cdn-icons-png.flaticon.com/128/2504/2504923.png" alt="" className='w-[43px] rounded-full'/>
      </a>
    </div>
  </nav>
</footer>
    </div>
  )
}

export default Footer
