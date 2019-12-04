import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Home from './pages/home/home';
import SideMenu from './components/menu/sidemenu';
import Grupos from './pages/grupos/grupos';
import CadastroGrupos from './pages/grupos/cadastrogrupos';

const HomeNavigator = createSwitchNavigator({
    Grupos: Grupos,
    CadastroGrupos: CadastroGrupos
});

const AppDrawerNavigator = createDrawerNavigator({
    Home: Home,
    Grupos: HomeNavigator
}, {
    contentComponent: SideMenu
});

export default createAppContainer(AppDrawerNavigator);
