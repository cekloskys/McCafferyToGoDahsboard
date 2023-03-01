import { Card, Table, Button, Popconfirm, message } from 'antd';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DataStore } from 'aws-amplify';
import { Dish } from '../../models';
import { useRestaurantContext } from '../../contexts/RestaurantContext';

const RestaurantMenu = () => {
    const[dishes, setDishes] = useState("");
    const { restaurant } = useRestaurantContext();
    
    useEffect(() => {
        if (!restaurant?.id) {
            return;
        }
        DataStore.query(Dish, d => d.restaurantID.eq(restaurant.id)).then(setDishes);
    }, [restaurant?.id]);

    const deleteDish = async (item) => {
        await DataStore.delete(Dish, d => d.id.eq(item.id));
        setDishes(dishes.filter((d) => d.id !== item.id));
        message.success('Dish has been deleted.');
    };

    const tableColumns = [
        {
            title: 'Menu Item',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Calories',
            dataIndex: 'calories',
            key: 'calories',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price) => `$${price.toFixed(2)}`
        },
        {
            title: '',
            key: 'action',
            render: (_, item) => (
                <Popconfirm
                    placement="topLeft"
                    title={'Are you sure you want to delete this dish?'}
                    onConfirm={() => deleteDish(item)}
                    okText="Yes"
                    cancelText="No"
                >
            <Button danger type='primary'>Remove</Button>
            </Popconfirm>            
            )
        },
        {
            title: '',
            key: 'action',
            render: (_, item) => (
            <Link to={`update/${item.id}`}>
                <Button type='primary'>Update</Button>
            </Link>       
            )
        },
    ];

    const renderNewItemButton = () => {
        return (
            <Link to={'create'}>
                <Button type='primary'>New Item</Button>
            </Link>
        );
    };

    return (
        <Card title={'Menu'} style={{margin: 20}} extra={renderNewItemButton()}>
            <Table 
                dataSource={dishes}
                columns={tableColumns}
                rowKey='id'
            />
        </Card>
    );
};

export default RestaurantMenu;