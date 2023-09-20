import nikeLogo from './assets/nike.png'
import './App.css'
import Customebtn from './components/button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css'
import Placeholder from 'react-bootstrap/Placeholder'
import Button from 'react-bootstrap/Button'
import {useState, useEffect} from 'react'
import useWindowDimensions from './hooks/useWindowDimensions'
import { baseURL } from './config/baseURL'
import trash from './assets/trash.png'
import plus from './assets/plus.png'
import minus from './assets/minus.png'
import check from './assets/check.png'
function App() {
  const { height, width } = useWindowDimensions();
  const isMobile = width <= 765
  const isDesktop = width < 995 && width > 766
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || [])
  // if (!cart) {
  //   localStorage.setItem ('cart', []);
  // }
  const [total, setTotal] = useState(0)

  useEffect(() => {
    let temp = 0
    cart.forEach(element => {
      temp += element.price
    })
    setTotal(temp)
    const controller = new AbortController()
    fetch(`${baseURL}/products`, {signal: controller.signal}).then(res => res.json()).then(data => {
      // setProducts(data)
      var updatedProducts = [...data]
      for(var i = 0; i < cart.length; ++i) {
        var item = updatedProducts.find(product => product.id == cart[i].id)
        item.isInCart = true
      }
      setProducts(updatedProducts)
    })
    
    return () => {
      controller.abort()
    }
  }, [])

  useEffect(() => {
    let temp = 0
    cart.forEach(product => {
      temp = temp + (product.price * product.quantity)
    })
    
    setTotal(temp)
  }, [cart])

  const addProductToCart = async (id) => {
    const addedproduct = products.filter(item => item.id == id)
    const updatedCart = [...cart, {
      id: id,
      name: addedproduct[0].name,
      quantity: 1,
      image: addedproduct[0].image,
      color: addedproduct[0].color,
      price: addedproduct[0].price
    }];
    
    setCart(updatedCart)
    localStorage.setItem ('cart', JSON.stringify(updatedCart));
    const updateProducts = [...products]
    const itemToChange = updateProducts.find(item => item.id === id);
    itemToChange.isInCart = true
    setProducts(updateProducts)
  }
  const increaseQuantity = async (id) => {
    const updatedCart = [...cart]
    const itemToIncrease = updatedCart.find(item => item.id == id)
    itemToIncrease.quantity++
    setCart(updatedCart)
    localStorage.setItem ('cart', JSON.stringify(updatedCart));
  }
  const decreaseQuantity = async (id) => {
    const updatedCart = [...cart]
    const itemToDecrease = updatedCart.find(item => item.id == id)
    if (itemToDecrease.quantity != 1) {
      itemToDecrease.quantity--
      setCart(updatedCart)
      localStorage.setItem ('cart', JSON.stringify(updatedCart));
    }
    
  }

  const deleteProduct = async (id) => {
    const updatedCart = [...cart]
    const newCart = updatedCart.filter(item => item.id != id)
    setCart(newCart)
    localStorage.setItem ('cart', JSON.stringify(newCart));
    const updateProducts = [...products]
    const itemToChange = updateProducts.find(item => item.id === id);
    itemToChange.isInCart = false
    setProducts(updateProducts)
  }

  return (
    <>
      <Container className='justify-content-center align-items-center' fluid="md">
        <Row className="justify-content-md-center">
          <Col style={{marginRight: isDesktop ? "40px" : "0px", marginBottom: isMobile ? "40px" : "0px" , borderRadius: "28px"}}  sm="10" md="4" xs="4" id='card-column'>
            <Card style={{ padding: "12px 28px", borderRadius: "28px" }} className='card-shadow semi-circle' >
              <Card.Text className='p-0 m-0 mb-3 text-start'>
                <img src={nikeLogo} style={{height: "1.5rem"}} alt='nike logo'/>
              </Card.Text>
              <Card.Title className={'text-start fw-bold'}>Our Products</Card.Title>
              <Card.Body>
                <Container style={{overflowY: "scroll", width: "100%", height: "500px"}} className='list-view-noscrollbar'>
                  {products.length == 0 ? (
                    <Card style={{ width: '100%' }}  className='p-0'>
                      <Card.Img variant="top" src="holder.js/100px180" />
                      <Card.Body>
                        <Placeholder as={Card.Title} animation="glow">
                          <Placeholder xs={6} />
                        </Placeholder>
                        <Placeholder as={Card.Text} animation="glow">
                          <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                          <Placeholder xs={6} /> <Placeholder xs={8} />
                        </Placeholder>
                        <Placeholder.Button variant="primary" xs={6} />
                      </Card.Body>
                    </Card>
                  )
                :
                products.map((product, idx) => (
                  <Row key={idx} style={{marginBottom: "80px"}}  className='p-0'>
                    <Card style={{ width: '100%', border: "none" }}  className='p-0'>
                      <div className='img-background border-radius-28' style={{backgroundColor: `${product.color}`, marginBottom: "10px"}} >
                        <Card.Img className='img-rotate' variant="top" src={`${product.image}`} />
                      </div>
                      <Card.Body className='p-0'>
                        <Card.Title style={{marginBottom: "10px"}} className={'text-start fw-bold'}>{product.name}</Card.Title>
                        <Card.Text style={{textAlign: "left", fontSize: "0.8em"}}>
                          {product.description}
                        </Card.Text>
                        <div className='d-flex flex-row justify-content-between align-items-center'>
                          <Card.Text className='m-0 fs-6 fw-bold'>
                            ${product.price}
                          </Card.Text>
                          <Button style={{borderRadius: "28px", backgroundColor: "var(--yellow)", border: "none", color: "var(--black)", width: product.isInCart && "28px", height: product.isInCart && "28px", display: "inline", transition: "width 0.2s cubic-bezier(0.175, 0.885, 0.320, 1.275)"}} className='fw-bold p-0' disabled={product.isInCart} onClick={() => addProductToCart(product.id)}>
                              {product.isInCart ? (
                                <img style={{display: 'flex', padding: "5px", height: "28px", maxWidth: "28px"}} src={check} alt="button icon" />
                              ): (
                                <p style={{padding: "5px"}} className='m-0'>Add to Cart</p>
                              )}
                            </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Row>
                ))}
                </Container>
                
              </Card.Body>
            </Card>
          </Col>
          <Col sm="10" md="4" xs="4" style={{ borderRadius: "28px" }}>
            <Card style={{ padding: "12px 28px", borderRadius: "28px", height: "100%" }} className='card-shadow'>
                <Card.Text className='p-0 m-0 mb-3 text-start'>
                  <img src={nikeLogo} style={{height: "1.5rem"}} alt='nike logo'/>
                </Card.Text>
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <Card.Title className={'text-start fw-bold'}>Your cart</Card.Title>
                  <Card.Subtitle className={'text-start fw-bold'}>${total.toFixed(2)}</Card.Subtitle>
                </div>
                <Card.Body className='p-0'>
                  <Container style={{overflowY: "scroll", width: "100%", height: "500px"}} className='list-view-noscrollbar'>
                    {cart.length == 0 ? (
                      <h4>Your cart is empty</h4>
                    )
                  :
                  cart.map((product, idx) => (
                    <Row key={idx} style={{marginBottom: "40px"}}>
                      <Card style={{ width: '100%', border: "none" }} className='d-flex flex-row p-0'>
                        <div className='img-background d-flex justify-content-center align-items-center' style={{position: "relative", width: "108px", minWidth: "108px"}} >
                          <div style={{position: "absolute", backgroundColor: `${product.color}`, top: "50px", left: "25px", height: "50%", width: "50%", borderRadius: "50%"}}></div>
                          <Card.Img className='img-rotate p-0 m-0' variant="top" src={`${product.image}`} />
                        </div>
                        <Card.Body className='p-0'>
                          <Card.Title style={{marginBottom: "10px", fontSize: "0.8em"}} className={'text-start fw-bold'}>{product.name}</Card.Title>
                          <Card.Subtitle style={{marginBottom: "10px", fontSize: "0.9em"}} className={'text-start fw-bold'}>
                            ${product.price}
                          </Card.Subtitle>
                          <div className='d-flex justify-content-between flex-row align-items-center'>
                            <div id="in-decrease-btn-group" className='d-flex flex-row align-items-center'>
                              <button className={"btn-round center"} style={{backgroundColor: `var(--gray)`, display: "inline"}} onClick={() => decreaseQuantity(product.id)}>
                                  <img style={{display: 'flex', padding: "5px", height: "auto", maxWidth: "100%"}} src={minus} alt="button icon" />
                              </button>
                              <span style={{margin: "0 5px", lineHeight: "28px"}}>{product.quantity}</span>
                              <button className={"btn-round center"} style={{backgroundColor: `var(--gray)`, display: "inline"}} onClick={() => increaseQuantity(product.id)}>
                                  <img style={{display: 'flex', padding: "5px", height: "auto", maxWidth: "100%"}} src={plus} alt="button icon" />
                              </button>
                            </div>
                            <button className={"btn-round center"} style={{backgroundColor: `var(--yellow)`, display: "inline"}} onClick={() => deleteProduct(product.id)}>
                                  <img style={{display: 'flex', padding: "5px", height: "auto", maxWidth: "100%"}} src={trash} alt="button icon" />
                              </button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Row>
                  ))}
                  </Container>
                  
                </Card.Body>
              </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App
