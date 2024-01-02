import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import img1 from './Carousel-imgs/img1.svg'

function BasicExample({name}) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={img1} className='h-[150px]' />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          Some quick example text to build .
        </Card.Text>
        <Button className='bg-[#020B2D] mt-3 ' variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default BasicExample;