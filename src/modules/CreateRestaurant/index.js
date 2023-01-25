import { Form, Input, Button, Card, message, TimePicker} from 'antd';
import dayjs from 'dayjs';
const format = 'HH:mm'; 

const CreateRestaurant = () => {
    const onStartChange = (time , timeString ) => { 
        console.log(time, timeString); 
    }
    const onEndChange = (time , timeString ) => { 
        console.log(time, timeString); 
    }
    const onFinish = ({name, address, image, starthours, endhours}) => {
        if (!name) {
            message.error('Name required!');
            return;
        }
        if (!address) {
            message.error('Address required!');
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
        
        message.success('Restaurant created!' + starthours + ' ' + endhours);
    }

    return (
        <Card title={'Restaurant Details'} style={{margin: 20}}>
            <Form layout='vertical' onFinish={onFinish}>
                <Form.Item label={'Name'} required name='name'>
                    <Input placeholder='Enter Name' />
                </Form.Item>
                <Form.Item label={'Address'} required name='address'>
                    <Input placeholder='Enter Address' />
                </Form.Item>
                <Form.Item label={'Image'} required name='image'>
                    <Input placeholder='Enter Image Link' />
                </Form.Item> 
                <div style={{display: 'flex'}}>
                <Form.Item label={'Start Hours'} required name='starthours'>
                <TimePicker onChange={onStartChange} defaultValue={dayjs('12:08', format)} format={format}
                use12Hours={true} />
                </Form.Item>
                <Form.Item style={{marginLeft:20}} label={'End Hours'} required name='endhours'>
                <TimePicker onChange={onEndChange} defaultValue={dayjs('12:08', format)} format={format}
                use12Hours={true} />
                </Form.Item>
                </div>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>Submit</Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default CreateRestaurant;