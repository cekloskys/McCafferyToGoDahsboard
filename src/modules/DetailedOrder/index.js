import { Card, Descriptions, Divider, List, Button, Tag } from 'antd';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Order, OrderStatus, User, OrderDish, Dish } from '../../models';
import { useRestaurantContext } from '../../contexts/RestaurantContext';

const statusToColor = {
    [OrderStatus.IN_PROGRESS]: "orange",
    [OrderStatus.PENDING]: "blue",
    [OrderStatus.COMPLETED]: "green",
    [OrderStatus.DECLINED]: "red",
}

const DetailedOrder = () => {

    const { restaurant } = useRestaurantContext();
    
    const { id } = useParams();
    const [order, setOrder] = useState({});
    const [customer, setCustomer] = useState(null);
    const [orderdish, setOrderDish] = useState([]);
    const [finalOrderDishes, setFinalOrderDishes] = useState([]);
    const [createdOn, setCreatedOn] = useState('');

    const getFullDate = (date) => {
        const fulldate = date.split('T');
        return fulldate[0];
    };

    useEffect(() => {
        const sub = DataStore.observeQuery(Order, (o) =>
            o.id.eq(id)
        ).subscribe(({ items }) => {
            setOrder(items[0]);
        });

        return () => {
            sub.unsubscribe();
        };
    }, [id]);

    useEffect(() => {
        if (!id) {
            return;
        }
        DataStore.query(Order, id).then(setOrder);
    }, [id]);

    useEffect(() => {
        if (!order.createdAt) {
            return;
        }
        const result = getFullDate(order?.createdAt);
        setCreatedOn(result);
    }, [order.createdAt]);
    

    useEffect(() => {
        if (!order.userID) {
            return;
        }
        DataStore.query(User, order.userID).then(setCustomer);
    }, [order?.userID]);

    useEffect(() => {
        if (!order.id) {
            return;
        }
        DataStore.query(OrderDish, (od) => od.orderID.eq(order.id)).then(setOrderDish);
    }, [order?.id]);

    useEffect(() => {
        if (!orderdish) {
            return;
        }
        const fetchDishes = async () => {
            const dishes = await DataStore.query(Dish);
            console.log(dishes)

            setFinalOrderDishes(
                orderdish.map(orderdish => ({
                    ...orderdish,
                    Dish: dishes.find(d => d.id === orderdish.orderDishDishId),
                }))
            );
        };
        fetchDishes();
    }, [orderdish]);

    /* const onDecline = async () => {
        const updatedOrder = await DataStore.save(
            Order.copyOf(order, (updated) => {
                updated.status = OrderStatus.DECLINED;
            })
        )
        setOrder(updatedOrder);
    }; */

    const onAcceptOrder = async () => {
        const updatedOrder = await DataStore.save(
            Order.copyOf(order, (updated) => {
                updated.status = OrderStatus.IN_PROGRESS;
            })
        )
        setOrder(updatedOrder);
    };

    const onFoodIsDone = async () => {
        const updatedOrder = await DataStore.save(
            Order.copyOf(order, (updated) => {
                updated.status = OrderStatus.COMPLETED;
            })
        )
        setOrder(updatedOrder);
    };

    return (
        <Card title={`Order Details`} style={{ margin: 20 }}>
            <div style={styles.buttonsContainer}>
                <Button
                    block
                    type='primary'
                    size='large'
                    style={styles.button}
                    onClick={onAcceptOrder}
                >
                    Accept Order
                </Button>
                <Button
                    block
                    type='default'
                    size='large'
                    style={styles.button}
                    onClick={onFoodIsDone}
                >
                    Food Is Done
                </Button>
            </div>
            <Descriptions bordered column={{ lg: 1, md: 1, sm: 1 }}>
                <Descriptions.Item label='Order Status'><Tag color={statusToColor[order?.status]}>{order?.status}</Tag></Descriptions.Item>
                <Descriptions.Item label='Created On'>{createdOn}</Descriptions.Item>
                <Descriptions.Item label='Pick Up Time'>{order?.pickUpTime}</Descriptions.Item>
                <Descriptions.Item label='Customer'>{customer?.name}</Descriptions.Item>
            </Descriptions>
            <Divider />
            <List
                dataSource={finalOrderDishes}
                renderItem={(dish) => (
                    <List.Item>
                        <div>
                            <div style={{ fontWeight: 'bold' }}>{dish?.Dish?.name} x{dish?.quantity}</div>
                            <div style={{ fontStyle: 'italic'}}>{dish?.specialInstructions && 'Special Instructions: '}{dish?.specialInstructions}</div>
                        </div>
                        <div>${dish?.Dish?.price.toFixed(2)}</div>
                    </List.Item>
                )}
            />
            <Divider />
            <div style={styles.totalContainer}>
                <h2>Service Fee:</h2>
                <h2 style={styles.totalPrice}>${restaurant?.serviceFee.toFixed(2)}</h2>
            </div>
            <div style={styles.totalContainer}>
                <h2>Total:</h2>
                <h2 style={styles.totalPrice}>${order.total && order.total.toFixed(2)}</h2>
            </div>
            <Divider />

        </Card>
    );
};

const styles = {
    totalContainer: {
        flexDirection: 'row',
        display: 'flex',
    },
    totalPrice: {
        marginLeft: 'auto',
    },
    buttonsContainer: {
        display: 'flex',
        paddingBottom: 30,
    },
    button: {
        marginRight: 5,
        marginLeft: 5,
    },
};

export default DetailedOrder;