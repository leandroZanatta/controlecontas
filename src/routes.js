import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Home from './pages/home/home';
import SideMenu from './components/menu/sidemenu';
import Contas from './pages/contas/contas';
import CadastroContasDespesa from './pages/contas/cadastrocontasdespesa';
import CadastroContasReceita from './pages/contas/cadastrocontasreceita';
import Categorias from './pages/categorias/categorias';
import CadastroCategorias from './pages/categorias/cadastrocategorias';

const CategoriasNavigator = createSwitchNavigator({
    Categorias: Categorias,
    CadastroCategorias: CadastroCategorias
});

const ContasNavigator = createSwitchNavigator({
    Contas: Contas,
    CadastroContasDespesa: CadastroContasDespesa,
    CadastroContasReceita: CadastroContasReceita,
});

const AppDrawerNavigator = createDrawerNavigator({
    Home: Home,
    Categorias: CategoriasNavigator,
    Contas: ContasNavigator
}, {
    contentComponent: SideMenu
});

export default createAppContainer(AppDrawerNavigator);
