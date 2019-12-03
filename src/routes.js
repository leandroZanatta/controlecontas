import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Home from './pages/home';
import SideMenu from './components/menu/sidemenu';

const AppDrawerNavigator = createDrawerNavigator({
    Home: Home
}, {
    contentComponent: SideMenu
});

export default createAppContainer(AppDrawerNavigator);
