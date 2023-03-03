import { Route, Routes } from 'react-router-dom';
import CreateMenuItem from '../../modules/CreateMenuItem';
import CreateRestaurant from '../../modules/CreateRestaurant';
import DetailedOrder from '../../modules/DetailedOrder';
import Orders from '../../modules/Orders';
import RestaurantMenu from '../../modules/RestaurantMenu';
import UpdateMenuItem from '../../modules/UpdateMenuItem';

const AppRoutes = () => {

    return (
        <Routes>
            <Route path='order' element={<Orders />} />
            <Route path='order/order/:id' element={<DetailedOrder />} />
            <Route path='menu' element={<RestaurantMenu />} />
            <Route path='menu/create' element={<CreateMenuItem />} />
            <Route path='/' element={<CreateRestaurant />} />
            <Route path='menu/update/:id' element={<UpdateMenuItem />} />
        </Routes>
    );
};

export default AppRoutes;