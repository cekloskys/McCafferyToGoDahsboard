import { Menu } from 'antd';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { useRestaurantContext } from '../../contexts/RestaurantContext';

const SideMenu = () => {

    const navigate = useNavigate();
    const { restaurant } = useRestaurantContext();

    const onMenuItemClick = async (menuItem) => {
        if (menuItem.key === 'signout') {
            await Auth.signOut();
            navigate("/");
            window.location.reload();
        } else {
            navigate(menuItem.key);
        }
    };

    const mainMenuItems = [
        {
            key: 'order',
            label: 'Orders',
        },
        {
            key: 'menu',
            label: 'Restaurant Menu',
        },
    ]

    const menuItems = [
        ...(restaurant ? mainMenuItems : []),
        {
            key: '/',
            label: 'Create Restaurant',
        },
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