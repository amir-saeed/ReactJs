const Hero = () => {
  return (
    <div className="flex flex-col tablet:flex-row items-center justify-between p-6 tablet:p-12 w-full bg-base-200 min-h-screen;">
      <div className="w-full tablet:w-3/5 space-y-4">
         <h1 className="text-4xl font-bold text-gray-900">John Doe</h1>
         <h2 className="text-2xl font-semibold text-gray-700 py-3">Full Stack Developer</h2>
         <div className="text-gray-600 leading-relaxed text-justify">
              this is test text
         </div>
      </div>
    </div>
  );
};

export default Hero;
