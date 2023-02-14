import {useState, useEffect} from "react";
import { Card, Table, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';

import { DataStore } from 'aws-amplify';
import {Order, OrderStatus} from '../../models';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        DataStore.query(Order).then(setOrders);
    }, []);

    console.log(orders);

    const renderOrderStatus = (orderStatus) => {
        const statusToColor ={
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
        },
        /*
        {
            title: 'Pick Up Time',
            dataIndex: 'pickup',
            key: 'pickup',
        },
       */
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

    return (
        <Card title='Orders' style={{margin: 20}}>
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