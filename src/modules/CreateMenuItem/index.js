import { Form, Input, Button, Card, InputNumber, message, Checkbox, Select } from 'antd';
import { useState } from "react";
import { useRestaurantContext } from "../../contexts/RestaurantContext";
import { Dish } from '../../models';
import { DataStore } from 'aws-amplify';

const { TextArea } = Input;

const CreateMenuItem = () => {
   
    const {restaurant} = useRestaurantContext();
    
    const[name, setName] = useState("");
    const[description, setDescription] = useState("");
    const[category, setCategory] = useState("");
    const[gluten, setGluten] = useState(true);
    const[image, setImage] = useState("")
   
    const handleChange = (value) => { console.log(`selected ${value}`);
      };

    const onChange = () => {
      setGluten(!gluten);
    };

    
    const onFinish = async ({name, description, price, calories, category}) => {
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
            }));
            console.log(newMenuItem)
            message.success('Dish has been created!');

    };

    return (
        <Card title={'Create New Item'} style={{margin: 20}}>
            <Form layout='vertical' onFinish={onFinish}>
                <Form.Item label={'Name'} required name='name'>
                    <Input placeholder='Enter Name'
                    onChange={(e) => setName(e.target.value)}/>
                </Form.Item>
                <Form.Item label={'Description'} required name='description'>
                    <TextArea 
                        rows={4}
                        placeholder='Enter Description'
                        onChange={(e) => setDescription(e.target.value)} />
                </Form.Item>
                <div style={{display: 'flex'}}>
                <Form.Item label={'Price'} required name='price'>
                    <InputNumber placeholder='Enter Price'/>
                </Form.Item>
                <Form.Item style={{marginLeft:50}} label={'Calories'} required name='calories'>
                    <InputNumber placeholder='Enter Calories'/>
                </Form.Item>
                <Form.Item style={{marginLeft:50}} label={'Gluten'}>
                <Checkbox
                onChange={onChange}>Gluten Free</Checkbox>
                </Form.Item>
                </div>
                <Form.Item label={'Food Category'} required name='category'>
                <Select defaultValue="Choose Food Category" style={{ width: 240, }} 
                value={category} 
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
                    <Input placeholder='Enter Image Link'
                    onChange={(e) => setImage(e.target.value)} 
                    />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>Submit</Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default CreateMenuItem;