import React, { useState } from 'react'
import UserModel from '../Interfaces/UserModel';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import CartModel from '../Interfaces/CartModel';
import { useGetCartQuery } from '../apis/CartAPI';
import CartItemModel from '../Interfaces/CartItemModel';
import { usePlaceOrderMutation } from '../apis/OrderAPI';
import OrderPlaced from '../Components/OrderPlaced';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const userData: UserModel = useSelector((state: RootState) => state.UserStore);
  const { data: cartData, isLoading, isError, refetch: refetchCart } = useGetCartQuery(userData.id);
  const [err,setErr]=useState(" ")
  const navigate=useNavigate()
  const userCart: CartModel | undefined = cartData?.result;
  const [addressData, setAddressData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    zip: ''
  });
  const cartId = userCart?.id;

  const [placeOrderMutation] = usePlaceOrderMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Validate form fields here
    if (!addressData.firstName || !addressData.lastName || !addressData.phone || !addressData.address || !addressData.city) {
      setErr("Fields can not be empty")
      return;
    }
    
    // Concatenate the form data into an address object
    const address = {
      name: `${addressData.firstName} ${addressData.lastName}`,
      email: addressData.email,
      phone: addressData.phone,
      address: addressData.address,
      city: addressData.city,
      zip: addressData.zip
    };
    const addressString = JSON.stringify(address);
    // Call the placeOrder mutation with the address object
    try {
      const response = await placeOrderMutation({ cartId, Address: addressString });
      console.log(response)
      navigate("/orderconfirmed")
      // Handle successful order placement
    } catch (error) {
      // Handle error
    }
  };
  if(!userCart){
    return(<div>Access Denied</div>)
  }
  return (
    <div className="maincontainer">
      <div className="container">
        <h3 className='text-danger'>{err}</h3>
        <div className="row">
          <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Your cart</span>
              <span className="badge badge-secondary badge-pill">3</span>
            </h4>
            <ul className="list-group mb-3">
              {userCart?.cartItems?.map((cartItem: CartItemModel, index: number) => (
                <li key={index} className="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 className="my-0">{cartItem.menuItem.name}</h6>
                    <small className="text-muted">{cartItem.menuItem.description}</small>
                  </div>
                  <span className="text-muted">{cartItem.quantity * cartItem.menuItem.price}</span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (PKR)</span>
                <strong>{userCart.cartTotal}</strong>
              </li>
            </ul>
          </div>
          <div className="col-md-8 order-md-1">
            <h4 className="mb-3">Billing address</h4>
            <form className="needs-validation">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstName">First name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name..."
                    value={addressData.firstName}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">Valid first name is required.</div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName">Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name..."
                    value={addressData.lastName}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">Valid last name is required.</div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="username">Phone</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">+92</span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    placeholder="300..."
                    value={addressData.phone}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">Your username is required.</div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="email">Email <span className="text-muted">(Optional)</span></label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  value={addressData.email}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">Please enter a valid email address for shipping updates.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  placeholder="1234 Main St"
                  value={addressData.address}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">Please enter your shipping address.</div>
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    placeholder="City"
                    value={addressData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="zip">Zip (Optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    name="zip"
                    placeholder=""
                    value={addressData.zip}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">Zip code required.</div>
                </div>
              </div>
              <hr className="mb-4" />
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="same-address" />
                <label className="custom-control-label" htmlFor="same-address">Shipping address is the same as my billing address</label>
              </div>
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="save-info" />
                <label className="custom-control-label" htmlFor="save-info">Save this information for next time</label>
              </div>
              <hr className="mb-4" />
              <h4 className="mb-3">Payment</h4>
              <div className="d-block my-3">
                <div className="custom-control custom-radio">
                  <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" checked required />
                  <label className="custom-control-label" htmlFor="credit">Cash On Delivery</label>
                </div>
                <div className="custom-control custom-radio disabled">
                  <input id="credit" name="paymentMethod" type="radio" className="custom-control-input disabled" disabled />
                  <label className="custom-control-label" htmlFor="credit">Credit card</label>
                </div>
                <div className="custom-control custom-radio">
                  <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" disabled />
                  <label className="custom-control-label" htmlFor="debit">Debit card</label>
                </div>
                <div className="custom-control custom-radio">
                  <input id="paypal" name="paymentMethod" type="radio" className="custom-control-input" disabled />
                  <label className="custom-control-label" htmlFor="paypal">Paypal</label>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <small>* Online Payment is currently not available</small>
                  <label htmlFor="cc-name">Name on card</label>
                  <input
                    disabled
                    type="text"
                    className="form-control"
                    id="cc-name"
                    placeholder=""
                    required
                  />
                  <small className="text-muted">Full name as displayed on card</small>
                  <div className="invalid-feedback">Name on card is required</div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="cc-number">Credit card number</label>
                  <input
                    disabled
                    type="text"
                    className="form-control"
                    id="cc-number"
                    placeholder=""
                    required
                  />
                  <div className="invalid-feedback">Credit card number is required</div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <label htmlFor="cc-expiration">Expiration</label>
                  <input
                    disabled
                    type="text"
                    className="form-control"
                    id="cc-expiration"
                    placeholder=""
                    required
                  />
                  <div className="invalid-feedback">Expiration date required</div>
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="cc-expiration">CVV</label>
                  <input
                    disabled
                    type="text"
                    className="form-control"
                    id="cc-cvv"
                    placeholder=""
                    required
                  />
                  <div className="invalid-feedback">Security code required</div>
                </div>
              </div>
              <hr className="mb-4" />
              <button className="btn btn-primary btn-lg btn-block" type="button" onClick={handleSubmit}>Place Order</button>
            </form>
          </div>
        </div>
        <footer className="my-5 pt-5 text-muted text-center text-small">
          <p className="mb-1">&copy; 2023-2024 tobedecided.com</p>
          <ul className="list-inline">
            <li className="list-inline-item"><a href="#">Privacy</a></li>
            <li className="list-inline-item"><a href="#">Terms</a></li>
            <li className="list-inline-item"><a href="#">Support</a></li>
          </ul>
        </footer>
      </div>
    </div>
  )
}
