// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const OrderStatus = {
  "PENDING": "PENDING",
  "DECLINED": "DECLINED",
  "IN_PROGRESS": "IN_PROGRESS",
  "COMPLETED": "COMPLETED"
};

const { Order, OrderDish, Restaurant, Dish, Basket, BasketDish, User, PaymentIntent } = initSchema(schema);

export {
  Order,
  OrderDish,
  Restaurant,
  Dish,
  Basket,
  BasketDish,
  User,
  OrderStatus,
  PaymentIntent
};