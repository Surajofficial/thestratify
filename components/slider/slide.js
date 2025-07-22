import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/image'
import items from '../../public/data/home/slider.json'
import ModalService from "@/utils/ModalService";
export default function CarouselFadeExample() {
    const slider = items.slider
    return (
        <div className='carousel slide carousel-fade'>
            <a className="carousel-control-prev" role="button" href="#heroCarousel">
                <span className="carousel-control-prev-icon bi bi-chevron-left" aria-hidden="true"></span>
            </a>

            <a className="carousel-control-next" role="button" href="#heroCarousel">
                <span className="carousel-control-next-icon bi bi-chevron-right" aria-hidden="true"></span>
            </a>
            <Carousel fade >

                {slider.map((item, key) => (
                    <Carousel.Item key={key}>
                        <Image
                            className="d-block w-100"
                            src={item.imageUrl}
                            alt={item.imageUrl}
                            fill
                            loading='eager'
                            quality={50}
                            sizes="100"
                        />
                        <Carousel.Caption>
                            <h3 className="animate__animated animate__fadeInDown">{item.title}</h3>
                            <p className="animate__animated animate__fadeInUp">{item.body}</p>
                            <button className='btn btn-primary m-1 ' onClick={() => ModalService.open()}>
                                {item.btn}
                            </button>
                        </Carousel.Caption>

                    </Carousel.Item>
                ))}


            </Carousel>

        </div>
    );
}
