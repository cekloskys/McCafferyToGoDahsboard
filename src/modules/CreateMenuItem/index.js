import { Form, Input, Button, Card, InputNumber, message, Checkbox, Select } from 'antd';
import { useState } from "react";
import { useRestaurantContext } from "../../contexts/RestaurantContext";
import { Dish } from '../../models';
import { DataStore } from 'aws-amplify';
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

const CreateMenuItem = () => {

    const navigate = useNavigate();

    const { restaurant } = useRestaurantContext();

    const [gluten, setGluten] = useState(false);
    
    const handleChange = (value) => {
        console.log(`${value}`);
    };

    const onChange = () => {
        setGluten(!gluten);
    };

    const onFinish = async ({ name, description, price, calories, category, specialInstructions, image }) => {
        if (!name) {
            message.error('Name required!');
            return;
        }
        if (!description) {
            message.error('Description required!');
            return;
        }
        if (!price) {
            message.error('Price required!');
            return;
        }
        if (!calories) {
            calories = 0;
            /* message.error('Calories required!');
            return; */
        }
        if (!category) {
            message.error('Category required!');
            return;
        }
        const newMenuItem = await DataStore.save(
            new Dish({
                name,
                description,
                price,
                calories,
                category,
                glutenFree: gluten,
                image,
                restaurantID: restaurant.id,
                specialInstructions,
            }));
            console.log(newMenuItem);
        message.success('Dish has been created!');
        navigate('/menu');
    };

    return (
        <Card title={'Create New Item'} style={{ margin: 20 }}>
            <Form layout='vertical' onFinish={onFinish}>
                <Form.Item label={'Name'} required name='name'>
                    <Input
                        placeholder='Enter Name'
                    />
                </Form.Item>
                <Form.Item label={'Description'} required name='description'>
                    <TextArea
                        rows={4}
                        placeholder='Enter Description'
                    />
                </Form.Item>
                <Form.Item label={'Special Instructions'} name='specialInstructions'>
                    <Input
                        placeholder='Enter Special Instructions'
                    />
                </Form.Item>
                <div style={{ display: 'flex' }}>
                    <Form.Item label={'Price'} required name='price'>
                        <InputNumber placeholder='Enter Price' />
                    </Form.Item>
                    <Form.Item style={{ marginLeft: 50 }} label={'Calories'} required name='calories'>
                        <InputNumber placeholder='Enter Calories' />
                    </Form.Item>
                    <Form.Item style={{ marginLeft: 50 }} label={'Gluten'}>
                        <Checkbox
                            onChange={onChange}>Gluten Free</Checkbox>
                    </Form.Item>
                </div>
                <Form.Item label={'Food Category'} required name='category'>
                    <Select defaultValue="Choose Food Category" style={{ width: 240, }}
                        onChange={handleChange}
                        options={[
                            {
                                value: 'Breakfast',
                                label: 'Breakfast',
                            },
                            {
                                value: 'Lunch',
                                label: 'Lunch',
                            },
                            {
                                value: 'Snacks',
                                label: 'Snacks',
                            },
                            {
                                value: 'Beverages',
                                label: 'Beverages',
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item label={'Image'} name='image'>
                    <Input placeholder='Enter Image Link' />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>Submit</Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default CreateMenuItem;