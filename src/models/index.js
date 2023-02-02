// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const OrderStatus = {
  "PENDING": "PENDING",
  "DECLINED": "DECLINED",
  "IN_PROGRESS": "IN_PROGRESS",
  "COMPLETED": "COMPLETED"
};

const { OrderDish, Dish, Order, Restaurant, Basket, BasketDish, User } = initSchema(schema);

export {
  OrderDish,
  Dish,
  Order,
  Restaurant,
  Basket,
  BasketDish,
  User,
  OrderStatus
};