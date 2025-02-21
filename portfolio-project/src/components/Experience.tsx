const Experience = () => {
  return (
    <div className="join join-vertical w-full mt-5 mb-5">
      <h1 className="ml-4 w-full text-center font-bold text-[36px]">Experience</h1>
      <div className="collapse collapse-arrow join-item border-b-2">
        <input type="radio" name="my-accordion-4" />
        <div className="collapse-title text-xl font-medium">
          Microsoft
        </div>
        <div className="collapse-content">
          <p>hello</p>
        </div>
      </div>
      <div className="collapse collapse-arrow join-item border-b-2">
        <input type="radio" name="my-accordion-4" />
        <div className="collapse-title text-xl font-medium">
          Google
        </div>
        <div className="collapse-content">
          <p>hello</p>
        </div>
      </div>
      <div className="collapse collapse-arrow join-item border-b-2">
        <input type="radio" name="my-accordion-4" />
        <div className="collapse-title text-xl font-medium">
          Apple
        </div>
        <div className="collapse-content">
          <p>hello</p>
        </div>
      </div>
    </div>
  );
};

export default Experience;
