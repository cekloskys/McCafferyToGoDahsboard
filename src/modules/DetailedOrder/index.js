import { Card, Descriptions, Divider, List, Button } from 'antd';
import { useParams } from 'react-router-dom';
import dishes from '../../data/dashboard/dishes.json';

const DetailedOrder = () => {

    const { id } = useParams();

    const total = dishes.reduce((sum, dish) => {
        return sum + (dish.quantity * dish.price)
    }, 0);

    const onDecline = () => {
        console.log('Order declined.')
    };

    const onAcceptOrder = () => {
        console.log('In Progress.')
    };
    
    const onFoodIsDone = () => {
        console.log('Completed.')
    };

    return (
        <Card title={`Order Number ${id}`} style={{ margin: 20 }}>
            <Descriptions bordered column={{ lg: 1, md: 1, sm: 1 }}>
                <Descriptions.Item label='Order Status'>APPROVED</Descriptions.Item>
                <Descriptions.Item label='Pick Up Time'>Tues Jan 17 2023 08:20:20</Descriptions.Item>
                <Descriptions.Item label='Customer'>Susan Ceklosky</Descriptions.Item>
            </Descriptions>
            <Divider />
            <List 
                dataSource={dishes}
                renderItem={(dishItem) => (
                    <List.Item>
                        <div style={{fontWeight: 'bold'}}>{dishItem.name} | 
                        Quantity Amount: {dishItem.quantity}</div>
                        <div>${dishItem.price}</div>
                    </List.Item>
                )}
            />
            <Divider />
            <div style={styles.totalContainer}>
                <h2>Total:</h2>
                <h2 style={styles.totalPrice}>${total}</h2>
            </div>
            <Divider />
            <div style={styles.buttonsContainer}>
                <Button
                    block
                    danger
                    type='primary'
                    size='large'
                    style={styles.button}
                    onClick={onDecline}
                >
                    Decline Order
                </Button>
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