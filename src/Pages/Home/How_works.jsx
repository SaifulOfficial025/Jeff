
const How_works = () => {
  return (
    <section className='bg-[#121212]'>

        <div>
            <h1 className='text-[48px]  capitalize text-center text-white italic font-semibold'>How <span className='text-[#1471FF]'>it works</span></h1>
            <p className=' w-1/3 mx-auto text-lg text-center text-[#AAAAAA]'>Our platform leverages advanced AI technology to analyze your design files and create comprehensive PDF documents for your projects</p>
        </div>


      <div className='container mx-auto'>

          <div className='flex items-center justify-between'>
                <div className="basis-8/12">
                    <img src="https://res.cloudinary.com/dpi0t9wfn/image/upload/v1747573371/Group_2147226060_1_apq8cy.png" className="w-full" alt="" />
                </div>

               <div className="space-y-5 basis-4/12">
                    <h1 className='capitalize text-white text-[40px] font-semibold'>PDF Processing Report</h1>
                    <p className='text-[#3876FD] cursor-pointer'>File Integrity & Summary</p>

                    <p className='text-[#AAAAAA] w-3/4 text-[18px]'>Detailed information and processing summary of your uploaded design files to ensure accuracy.</p>
                </div>
        </div>


          <div className='flex items-center justify-between'>

                 <div className="space-y-5 basis-4/12">
                    <h1 className='capitalize text-white text-[40px] font-semibold'>Processing Report: Scope of Work Summary </h1>
                    <p className='text-[#3876FD] cursor-pointer'>Reinforcement Mapping</p>
                    <p className='text-[#AAAAAA] w-4/5 text-[18px]'>Analyze Design drawings identify scopes of work, key requirements and a user interface to determine inclusions and exclusions on projects.</p>
                </div>

                  <div className="basis-8/12">
                    <img src="https://res.cloudinary.com/dpi0t9wfn/image/upload/v1747574445/image_4_cnf4gs.png" className="w-full" alt="" />
                </div>
        </div>

         <div className='flex items-center justify-between'>

                 <div className="space-y-5 basis-4/12">
                    <h1 className='capitalize text-white text-[40px] font-semibold'>Material Takeoff</h1>
                    <p className='text-[#3876FD] cursor-pointer'>Accurate Material Quantities</p>
                    <p className='text-[#AAAAAA] w-4/5 text-[18px]'>Precisely Identifying material quantities and parceling according to identified scope of work.</p>
                </div>

                  <div className="basis-8/12">
                    <img src="https://res.cloudinary.com/dpi0t9wfn/image/upload/v1747574827/Mask_group_1_ya9tzq.png" className="w-full" alt="" />
                </div>
        </div>


           <div className='flex items-center justify-between'>
                <div className="basis-8/12">
                    <img src="https://res.cloudinary.com/dpi0t9wfn/image/upload/v1747574884/image_5_sxpsmd.png" className="w-full" alt="" />
                </div>

               <div className="space-y-5 basis-4/12">
                    <h1 className='capitalize text-white text-[40px] font-semibold'>Project Deliverables</h1>
                    <p className='text-[#3876FD] cursor-pointer'>Tailored Project Reports</p>

                    <p className='text-[#AAAAAA] w-3/4 text-[18px]'>Scope of work, Material lists, Tailored Estimates, Schedule of value, and custom proposals.</p>
                </div>
        </div>


      </div>

       <div className="text-center">
          <button className="text-white border border-[#1471FF] rounded-full bg-[#1471FF] px-18 py-3">
              Register
            </button>
       </div>
      
    </section>
  )
}

export default How_works
