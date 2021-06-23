import { Home, NewProject, ProjectSingle, Login, } from '../components/pages'

enum path   {
    Home='/',
    NewProject='/project/new',
    ProjectSingle='/project/:id',
    Login='/login',
    Register='/register'
}
interface RouteTemplate {
    path: string
    component: any
}
const unsecuredRoutes:RouteTemplate[]=[
    {
        path: path.Login,
        component: Login
    },
]
const securedRoutes:RouteTemplate[]=[
    {
        path: path.Home,
        component: Home
    },
    {
        path: path.NewProject,
        component: NewProject
    },
    {
        path: path.ProjectSingle,
        component: ProjectSingle
    },
]

export  {
    path, unsecuredRoutes, securedRoutes,
}