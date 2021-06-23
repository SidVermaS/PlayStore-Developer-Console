import {Home, CreateNewFolder, Person,ExitToApp} from '@material-ui/icons'
// import {path} from '../../../PageRoutes/routes'

enum path   {
    Home='/',
    NewProject='/project/new',
    Project='/project/:id',
    Login='/login',
    Register='/register'
}
const drawerItems:Array<any>=[
    {
        title: 'Home',
        icon: Home,
        path: path?.Home,
    },
    {
        title: 'New Project',
        icon: CreateNewFolder,
        path: path?.NewProject,
    },
    {
        title: 'Profile',
        icon: Person,
        path: path?.Home,
    },
    {
        title: 'Log out',
        icon: ExitToApp,
       
    }
]

export {drawerItems}
