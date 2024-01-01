import Carousel from "react-bootstrap/Carousel";
import img1 from "./Carousel-imgs/img1.svg";

function DarkVariantExample() {
  return (
    <Carousel className="" data-bs-theme="dark">
      <Carousel.Item>
        <img className="d-block w-100" src={img1} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>

        <img className="d-block w-100" src={img1} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={img1} alt="First slide" />

      </Carousel.Item>
    </Carousel>
  );
}

export default DarkVariantExample;
