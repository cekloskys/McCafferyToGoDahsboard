import { Card, Table, Tag } from 'antd';
import orders from '../../data/dashboard/orders.json';
import { useNavigate } from 'react-router-dom';

const Orders = () => {

    const navigate = useNavigate();

    const renderOrderStatus = (orderStatus) => {
        let color = '';

        if (orderStatus === 'IN PROGRESS') {
            color = 'orange';
        } else if (orderStatus === 'PENDING') {
            color = 'blue';
        } else if (orderStatus === 'COMPLETED') {
            color = 'green';
        }
        else {
            color = 'red';
        }

        return <Tag color={color}>{orderStatus}</Tag>
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
        {
            title: 'Pick Up Time',
            dataIndex: 'pickup',
            key: 'pickup',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price) => `$${price}`
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