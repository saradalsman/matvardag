import Home from './views/Home.vue'
import Profile from './views/Profile.vue'
import RecipeArchive from './views/RecipeArchive.vue'
import Recipe from './views/Recipe.vue'
import CreateRecipe from './views/CreateRecipe.vue'
import Menu from './views/Menu.vue'
import CreateMenu from './views/CreateMenu.vue'
import ShoppingList from './views/ShoppingList.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
    },
    {
        path: '/recipe/all',
        name: 'recipe/all',
        component: RecipeArchive,
        props: true,
    },
    {
        path: '/recipe/create',
        name: 'recipe/create',
        component: CreateRecipe,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/recipe/update/:recipe_id',
        name: 'recipe/update/:recipe_id',
        component: CreateRecipe,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/recipe/:recipe_id',
        name: 'recipe/:recipe_id',
        component: Recipe,
    },
    {
        path: '/mymenu',
        name: 'mymenu',
        component: Menu,
        props: true,
    },
    {
        path: '/mymenu/create',
        name: 'mymenu/create',
        component: CreateMenu,
    },
    {
        path: '/shopping-list',
        name: 'shopping-list',
        component: ShoppingList,
    },
    // {
        //     path: '/login',
        //     name: 'home',
        //     component: Home,
    // },
    // {
        //     path: '/logout',
        //     name: 'home',
        //     component: Home,
        // },
    // {
        //     path: '*',
        //     component: 404,
        // },
];

export default routes;