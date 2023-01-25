import { Form, Input, Button, Card, InputNumber, message, Checkbox, Select } from 'antd';

const { TextArea } = Input;

const CreateMenuItem = () => {
    
    const handleChange = (value) => { console.log(`selected ${value}`);
      };

    const onChange = (gluten) => {console.log(`checked = ${gluten.target.checked}`);
    };
    const onFinish = ({name, description, price, calories}) => {
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
        message.success('Dish created!');
    }

    return (
        <Card title={'Create New Item'} style={{margin: 20}}>
            <Form layout='vertical' onFinish={onFinish}>
                <Form.Item label={'Name'} required name='name'>
                    <Input placeholder='Enter Name' />
                </Form.Item>
                <Form.Item label={'Description'} required name='description'>
                    <TextArea 
                        rows={4}
                        placeholder='Enter Description'
                    />
                </Form.Item>
                <div style={{display: 'flex'}}>
                <Form.Item label={'Price'} required name='price'>
                    <InputNumber placeholder='Enter Price' />
                </Form.Item>
                <Form.Item style={{marginLeft:50}} label={'Calories'} required name='calories'>
                    <InputNumber placeholder='Enter Calories' />
                </Form.Item>
                <Form.Item style={{marginLeft:50}} label={'Gluten'} name='gluten'>
                <Checkbox onChange={onChange}>Gluten Free</Checkbox>
                </Form.Item>
                </div>
                <Form.Item label={'Food Category'} required name='foodcategory'>
                <Select defaultValue="Choose Food Category" style={{ width: 240, }} 
                onChange={handleChange}
      options={[
        {
          value: 'food',
          label: 'Choose Food Category',
        },
        {
          value: 'breakfast',
          label: 'Breakfast',
        },
        {
          value: 'lunch',
          label: 'Lunch',
        },
        {
            value: 'snacks',
            label: 'Snacks',
        },
        {
            value: 'beverages',
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