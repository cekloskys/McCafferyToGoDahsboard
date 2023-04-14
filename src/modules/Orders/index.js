import { useState, useEffect } from "react";
import { Card, Table, Tag, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { DataStore, Predicates, SortDirection } from 'aws-amplify';
import { Order, OrderStatus } from '../../models';
import { useRestaurantContext } from '../../contexts/RestaurantContext';


const Orders = () => {
    const [orders, setOrders] = useState([]);
    const { restaurant } = useRestaurantContext();

    const navigate = useNavigate();

    const getFullDate = (date) => {
        const fulldate = date.split('T');
        return fulldate[0];
    };

    useEffect(() => {
        if (!restaurant) {
            return;
        }
        DataStore.query(Order, 
            (order) => order.orderRestaurantId.eq(restaurant.id),
            Predicates.ALL, {
                sort: (d) => d.createdAt(SortDirection.DESCENDING)
            }).then(setOrders);
    }, [restaurant]);

    const renderOrderStatus = (orderStatus) => {
        const statusToColor = {
            [OrderStatus.IN_PROGRESS]: "orange",
            [OrderStatus.PENDING]: "blue",
            [OrderStatus.COMPLETED]: "green",
            [OrderStatus.DECLINED]: "red",
        }
        return <Tag color={statusToColor[orderStatus]}>{orderStatus}</Tag>
    }

    const tableColumns = [
        {
            title: 'Created On',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: ((date) => getFullDate(date)),

        },

        {
            title: 'Pick Up Time',
            dataIndex: 'pickUpTime',
            key: 'pickUpTime',
        },

        {
            title: 'Price',
            dataIndex: 'total',
            key: 'total',
            render: (total) => `$${total.toFixed(2)}`
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: renderOrderStatus
        },
    ];

    const getorders = () => {
        DataStore.query(Order, 
            (order) => order.orderRestaurantId.eq(restaurant.id),
            Predicates.ALL, {
                sort: (d) => d.createdAt(SortDirection.DESCENDING)
            }).then(setOrders);
    };

    const renderGetOrderButton = () => {
        return (

            <Button type='primary' onClick={getorders}>Get Orders</Button>

        );
    };

    return (
        <Card title='Orders' style={{ margin: 20 }} extra={renderGetOrderButton()}>
            <Table
                dataSource={orders}
                columns={tableColumns}
                rowKey='id'
                onRow={(order) => ({
                    onClick: () => navigate(`order/${order.id}`)
                })}
            />
        </Card>
    );
};

export default Orders;