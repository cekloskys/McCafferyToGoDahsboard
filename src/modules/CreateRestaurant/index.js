import { Form, Input, Button, Card, message, TimePicker, InputNumber} from 'antd';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { DataStore } from 'aws-amplify';
import { Restaurant } from '../../models';
import { useRestaurantContext } from "../../contexts/RestaurantContext";
const format = 'hh:mm A'; 

const CreateRestaurant = () => {
    
    const[name, setName] = useState("");
    const[location, setLocation] = useState("");
    const[image, setImage] = useState("");
    const[starthours, setStartHours] = useState("12:00 AM");
    const[endhours, setEndHours] = useState("12:00 AM");
    const[serviceFee, setServiceFee] = useState("");
    
    const {sub, setRestaurant, restaurant} = useRestaurantContext();
    // console.log(restaurant);
    useEffect(() => {
        if (!restaurant) {
            return;
        }
        setName(restaurant.name);
        setLocation(restaurant.location);
        setImage(restaurant.image);
        setStartHours(restaurant.startHrs);
        setEndHours(restaurant.endHrs);
        setServiceFee(restaurant.serviceFee);   
    },[restaurant])
    

    const onStartChange = (time , timeString ) => { 
        setStartHours(timeString.toString());
    }
    const onEndChange = (time , timeString ) => { 
        setEndHours(timeString.toString());
    }
    console.log(starthours);
    console.log(endhours);
    
    const onFinish = async () => {
    if (!restaurant) {
        await createNewRestuarant();
    } else {
        await updateRestuarant();
        }
    }

    const createNewRestuarant = async () => {
        if (!name) {
            message.error('Name required!');
            return;
        }
        if (!location) {
            message.error('Location required!');
            return;
        }
        if (!image) {
            message.error('Image link required!');
            return;
        }
        if (!starthours) {
            message.error('Start Hours required!');
            return;
        }
        if (!endhours) {
            message.error('End Hours required!');
            return;
        }

        
       const newRestuarant = await DataStore.save(
        new Restaurant({
            name,
            location,
            image,
            startHrs:starthours,
            endHrs:endhours,
            adminSub: sub,
            serviceFee,
        }));

        setRestaurant(newRestuarant);
        message.success('Restaurant has been created!');

    };


    const updateRestuarant = async () => {
        console.log(serviceFee)
        const updatedRestuarant = await DataStore.save(
            Restaurant.copyOf(restaurant, (updated) => {
                updated.name =  name;
                updated.location = location;
                updated.image = image;
                updated.serviceFee = serviceFee;
                updated.startHrs = starthours;
                updated.endHrs = endhours;
                
            })
        )
        setRestaurant(updatedRestuarant);
        message.success("Restaurant updated!");
    };

    return (
        <Card title={'Restaurant Details'} style={{margin: 20}}>
            <Form layout='vertical'>
                <Form.Item label={'Name'} required>
                    <Input placeholder='Enter Name' 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}/>
                </Form.Item>
                <Form.Item label={'Location'} required>
                    <Input placeholder='Enter Location' 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}/>
                </Form.Item>
                <Form.Item label={'Image'} required>
                    <Input placeholder='Enter Image Link' 
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    />
                </Form.Item>
                <Form.Item label={'Service Fee'}>
                        <InputNumber 
                            placeholder='Enter Service Fee'
                            value={serviceFee}
                            onChange={(e) => setServiceFee(e)}
                            />
                </Form.Item> 
                <div style={{display: 'flex'}}>
                <Form.Item label={'Start Hours'} required>
                <TimePicker 
                onChange={onStartChange} 
                defaultValue={dayjs('12:00 AM', format)}
                value={dayjs(starthours, format)} 
                format={format}
                use12Hours={true}
                />
                </Form.Item>
                <Form.Item style={{marginLeft:20}} label={'End Hours'} required>
                <TimePicker 
                onChange={onEndChange}
                defaultValue={dayjs('12:00 AM', format)}
                value={dayjs(endhours, format)}
                format={format}
                use12Hours={true} 
                />
                </Form.Item>
                </div>
                <Form.Item>
                    <Button type='primary' htmlType='submit' onClick={onFinish}>Submit</Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default CreateRestaurant;