import { Menu } from 'antd';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { useRestaurantContext } from '../../contexts/RestaurantContext';


const SideMenu = () => {

    const navigate = useNavigate();
    const {restaurant} = useRestaurantContext();

    const onMenuItemClick = async (menuItem) => {
        if (menuItem.key === 'signout'){
            await Auth.signOut();
            window.location.reload();
        } else {
            navigate(menuItem.key);
        }  
    };

    const mainMenuItems = [

        {
            key: '/',
            label: 'Orders',
        },
        {
            key: 'menu',
            label: 'Restaurant Menu',
        },
        {
            key: 'restaurant',
            label: 'Create Restaurant',
        },

    ]

    const menuItems = [
        ...(restaurant ? mainMenuItems : []),
        {
            key: 'signout',
            label: 'Sign Out',
        },
    ];

    
    return (
        <>
          {restaurant && (<h4>{restaurant.name}</h4>)}
          <Menu items={menuItems} onClick={onMenuItemClick} />
        </>
    );
};

export default SideMenu;