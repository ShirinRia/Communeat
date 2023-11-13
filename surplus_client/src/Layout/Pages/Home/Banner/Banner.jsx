
import banner from "../../../../assets/raf,360x360,075,t,fafafa_ca443f4786.jpg"
import banner2 from "../../../../assets/banner-2.jpg"
import banner3 from "../../../../assets/banner-3.jpg"
import banner4 from "../../../../assets/banner-4.jpg"
import banner5 from "../../../../assets/banner-5.png"
import banner6 from "../../../../assets/banner-6.jpg"

import Carousel from 'react-elastic-carousel'
const Banner = () => {
    return (
       
        <section className='max-w-7xl mx-1 md:mx-4 lg:mx-auto'>
            <Carousel
                transitionMs={100} enableAutoPlay autoPlaySpeed={1500}
            >
                <img src={banner5} alt="" className='w-[100vw] h-[70vh]' />
                <img src={banner} alt="" className='w-[100vw] h-[70vh]' />
                <img src={banner2} alt="" className='w-[100vw] h-[70vh]' />
                <img src={banner3} alt="" className='w-[100vw] h-[70vh]' />
                <img src={banner4} alt="" className='w-[100vw] h-[70vh]' />
                <img src={banner6} alt="" className='w-[100vw] h-[70vh]' />

            </Carousel>
        </section>

    );
};

export default Banner;