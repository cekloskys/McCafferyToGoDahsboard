// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const OrderStatus = {
  "PENDING": "PENDING",
  "DECLINED": "DECLINED",
  "IN_PROGRESS": "IN_PROGRESS",
  "COMPLETED": "COMPLETED"
};

const { OrderDish, Order, Restaurant, Dish, Basket, BasketDish, User } = initSchema(schema);

export {
  OrderDish,
  Order,
  Restaurant,
  Dish,
  Basket,
  BasketDish,
  User,
  OrderStatus
};