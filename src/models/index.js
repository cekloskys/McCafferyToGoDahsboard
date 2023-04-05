// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const OrderStatus = {
  "PENDING": "PENDING",
  "DECLINED": "DECLINED",
  "IN_PROGRESS": "IN_PROGRESS",
  "COMPLETED": "COMPLETED"
};

const { Order, OrderDish, Basket, BasketDish, User, Dish, Restaurant, PaymentIntent } = initSchema(schema);

export {
  Order,
  OrderDish,
  Basket,
  BasketDish,
  User,
  Dish,
  Restaurant,
  OrderStatus,
  PaymentIntent
};