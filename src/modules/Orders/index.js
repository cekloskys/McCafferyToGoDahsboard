import { useState, useEffect } from "react";
import { Card, Table, Tag, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { DataStore } from 'aws-amplify';
import { Order, OrderStatus } from '../../models';
import { useRestaurantContext } from '../../contexts/RestaurantContext';


const Orders = () => {
    const [orders, setOrders] = useState([]);
    const { restaurant } = useRestaurantContext();

    const navigate = useNavigate();

    const getFullDate = (date) => {
        const dateAndTime = date.split('T');
        var time = dateAndTime[1].split(':');
        var hours = time[0];
        var minutes = time[1];
        var timeValue = "" + ((hours > 12) ? hours - 12 : hours);
        timeValue += (minutes < 10) ? ":0" : ":" + minutes;
        timeValue += (hours >= 12) ? " PM" : " AM";
        return dateAndTime[0] + " " + timeValue;
    };

    useEffect(() => {
        if (!restaurant) {
            return;
        }
        DataStore.query(Order, (order) =>
            order.orderRestaurantId.eq(restaurant.id)).then(setOrders);
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
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: ((date) => getFullDate(date)),
            sorter:
            {
                compare: (a, b) => {
                    if (a.createdAt > b.createdAt) {
                        return -1;
                    }
                    if (a.createdAt < b.createdAt) {
                        return 1;
                    }
                    return 0;
                },
                multiple: 1,
            },
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
        DataStore.query(Order, (order) =>
        order.orderRestaurantId.eq(restaurant.id)).then(setOrders);
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