
const About = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center text-center bg-[#121212]"
    >
      <div
        className="w-9/12 mx-auto bg-black/50 p-0 rounded-xl backdrop-blur-sm h-[60vh] relative"
        style={{
          backgroundImage:
            'url("https://res.cloudinary.com/dpi0t9wfn/image/upload/v1747570161/Subtract_j1cckc.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute top-0 left-0 w-2/5 bg-[#121212] p-5 px-5 py-10 rounded-br-[20px]">
          <h1 className="text-[52px] text-white font-semibold italic text-start">
            <span className="text-[#1471FF]">About</span> Us
          </h1>
          <p className="text-xl text-[#AAAAAA] text-start">
            We are dedicated to developing a seamless process for your projects. Our platform leverages advanced AI Technology to analyze your design files and produce accurate reports.
          </p>
        </div>

        <div className="absolute bottom-0 right-0 w-2/5 bg-[#121212] p-5 px-5 py-10 rounded-tl-[20px]">
      
          <p className="text-xl text-[#AAAAAA] text-start">
            Upload your designs with confidence, knowing your data is safe and your PDF are generated with precision.
          </p>

             

          <div className="flex mt-5">
            <button className="text-white border border-[#1471FF] rounded-full bg-[#1471FF] px-18 py-3">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;