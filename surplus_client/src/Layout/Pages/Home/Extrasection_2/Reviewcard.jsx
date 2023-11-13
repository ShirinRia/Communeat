

const Reviewcard = ({review}) => {
  
   
    return (
        <div>
        <div className="container flex flex-col w-full max-w-xl p-6 mx-auto divide-y rounded-md divide-gray-700  text-gray-800">
          <div className="flex justify-between p-4 ">
            <div className="flex items-center  w-full">
              <div className="w-1/6 ">
                <img src={review.reviewer_image} alt="" className="object-cover w-12 h-12 rounded-full bg-gray-800" />
              </div>
              <div className="w-5/6 ">
                <h4 className="font-bold text-sm md:text-lg">{review.reviewer_name}</h4>
                {/* <span className="text-xs text-gray-400">2 days ago</span> */}
              </div>
            </div>
           
          </div>
          <div className="p-4 space-y-2 text-lg text-gray-800 italic">
            <p>{review.comment}</p>
           
          </div>
        </div>
      </div>
    );
};

export default Reviewcard;