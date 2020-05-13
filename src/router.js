import VueRouter from 'vue-router'
import routes from './routes'

const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes,
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
  
    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
      next('/');
    } else {
      next();
    }
  });

export default router;