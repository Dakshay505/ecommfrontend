import {createStore,combineReducers,applyMiddleware} from 'redux';
import {newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productReviewsReducer, productsReducer, reviewReducer} from './reducers/productReducer'
import {allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer} from './reducers/userReducer'
import {cartReducer} from './reducers/cartReducer'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension';
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from './reducers/orderReducer';

const reducer = combineReducers({
  products:productsReducer,
  productDetails : productDetailsReducer,
  user:userReducer,
  profile:profileReducer,
  forgotPassword:forgotPasswordReducer,
  cart:cartReducer,
  newOrder:newOrderReducer,
  myOrders : myOrdersReducer,
  orderDetails :orderDetailsReducer,
  newReview: newReviewReducer,
  review: reviewReducer,
  product: productReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  newProduct: newProductReducer,
});

let initialstate = {
  cart:{
    cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    :[],
    shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    :{},
  }
};

let middleware = [thunk];

const store = createStore(reducer,initialstate,composeWithDevTools(applyMiddleware(...middleware)))

export default store;