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
                        <picture>
                            {/* Ultra Wide (≥2560px) */}
                            <source srcSet={item.images.uw} media="(min-width: 2560px)" />

                            {/* Extra Large (1367 – 1920px) */}
                            <source srcSet={item.images.xl} media="(min-width: 1367px)" />

                            {/* Large (1025 – 1366px) */}
                            <source srcSet={item.images.lg} media="(min-width: 1025px)" />

                            {/* Medium (769 – 1024px) */}
                            <source srcSet={item.images.md} media="(min-width: 769px)" />

                            {/* Small (481 – 768px) */}
                            <source srcSet={item.images.sm} media="(min-width: 481px)" />

                            {/* Extra Small (≤480px) */}
                            <source srcSet={item.images.xs} media="(max-width: 480px)" />

                            {/* Default / fallback */}
                            <Image
                                src={item.images.xl} // default desktop image
                                alt="Responsive Banner"
                                fill
                                priority
                                quality={80}
                                sizes="100vw"
                                style={{ objectFit: "cover" }}
                            />
                        </picture>
                        <Carousel.Caption>
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
