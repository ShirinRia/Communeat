
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Review.css'
import Reviewcard from "./Reviewcard";
import { useEffect, useState } from "react";
const Review = ({ reviews }) => {

  const [availablereviews, setavailablereviews] = useState([])
  useEffect(() => {
    setavailablereviews(reviews)
  }, [reviews])

  // const first=reviews[0]
  // console.log(reviews)
  // console.log('first',first._id)
  var settings = {
    dots: false
  };
  return (
    <div className="cont max-w-[324px] md:max-w-2xl ">
      <Slider {...settings}>
        <div className="h-96 flex items-center justify-center rounded-md  text-gray-800 ">

          <div className="h-1/2  flex items-center justify-center"><h4 className="font-bold text-center text-3xl md:text-5xl">Testimonials</h4></div>

        </div>
        {
          availablereviews.map((review, idx) => <Reviewcard key={idx} review={review}></Reviewcard>)
        }
        {/* <Reviewcard key={1} review={reviews[reviews.length-1]}></Reviewcard> */}


      </Slider>
    </div>
  );
};

export default Review;