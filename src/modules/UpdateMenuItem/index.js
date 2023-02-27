import { Form, Input, Button, Card, InputNumber, message, Checkbox, Select } from 'antd';
import { useState, useEffect } from "react";
import { Dish } from '../../models';
import { DataStore } from 'aws-amplify';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

const { TextArea } = Input;

const UpdateMenuItem = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id);
   

    const[dish, setDish] = useState({});
    const[name, setName] = useState('');
    const[description, setDescription] = useState('');
    const[price, setPrice] = useState(0);
    const[calories, setCalories] = useState(0);
    const[gluten, setGluten] = useState();
    const[category, setCategory] = useState();
    const[image, setImage] = useState();

    useEffect(() => {
        if (!id) {
            return;
        }
        DataStore.query(Dish,id).then(setDish);
        
    },[id])
    useEffect(() => {
        if(!dish) {
            return;
        }
        setPrice(dish.price);
        setName(dish.name);
    },[dish]);
    
    const handleChange = (value) => {
        console.log(`${value}`);
    };

    const onChange = () => {
        setGluten(!gluten);
    };

    const onFinish = async () => {
        if (!dish) {
            await updateMenuDetails();
        } else {
            await updatedMenuItem();
            }
        }

    const updateMenuDetails = async () => {
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
            message.error('Calories required!');
            return;
        }
        if (!category) {
            message.error('Category required!');
            return;
        }
        };

        const updatedMenuItem = async () => {
        const updatedDish = await DataStore.save(
            Dish.copyOf(dish, (updated) => {
                updated.name =  name;
                updated.description = description;
                updated.price = price;
                updated.calories = calories;
                updated.category = category;
                updated.image = image;
                
            })
        )
        setDish(updatedDish);
        message.success("Dish has been updated!");
        navigate('/menu');
    };

    return (
        <Card title={'Update New Item'} style={{ margin: 20 }}>
            <Form layout='vertical'>
                <Form.Item label={'Name'} required>
                    <Input 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Item>
                <Form.Item label={'Description'} required>
                    <TextArea
                        rows={4}
                        value={dish.description} 
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Item>
                <div style={{ display: 'flex' }}>
                    <Form.Item label={'Price'} required>
                        <InputNumber
                        value={dish.price} 
                        onChange={(e) => setPrice(e.target.value)}/>
                    </Form.Item>
                    <Form.Item style={{ marginLeft: 50 }} label={'Calories'} required>
                        <InputNumber 
                        value={dish.calories} 
                        onChange={(e) => setCalories(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item style={{ marginLeft: 50 }} label={'Gluten'}>
                        <Checkbox
                            checked={dish.glutenFree}
                            onChange={onChange}>Gluten Free</Checkbox>
                    </Form.Item>
                </div>
                <Form.Item label={'Food Category'} required>
                    <Select defaultValue="Choose Food Category" style={{ width: 240, }}
                        value={dish.category}
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
                <Form.Item label={'Image'}>
                    <Input
                    value={dish.image} 
                    onChange={(e) => setImage(e.target.value)}/>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'
                    onClick={updateMenuDetails}
                    >Submit</Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default UpdateMenuItem;