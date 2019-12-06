import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Home from './pages/home/home';
import SideMenu from './components/menu/sidemenu';
import Contas from './pages/contas/contas';
import CadastroContas from './pages/contas/cadastrocontas';
import Categorias from './pages/categorias/categorias';
import CadastroCategorias from './pages/categorias/cadastrocategorias';
import Lancamentos from './pages/lancamentos/lancamentos';
import CadastroReceitas from './pages/lancamentos/cadastroreceitas';

const CategoriasNavigator = createSwitchNavigator({
    Categorias: Categorias,
    CadastroCategorias: CadastroCategorias
});

const ContasNavigator = createSwitchNavigator({
    Contas: Contas,
    CadastroContas: CadastroContas,
});

const LancamentosNavigator = createSwitchNavigator({
    Lancamentos: Lancamentos,
    CadastroReceitas: CadastroReceitas
});

const AppDrawerNavigator = createDrawerNavigator({
    Home: Home,
    Categorias: CategoriasNavigator,
    Contas: ContasNavigator,
    Lançamentos: LancamentosNavigator
}, {
    contentComponent: SideMenu
});

export default createAppContainer(AppDrawerNavigator);
