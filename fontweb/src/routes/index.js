import loadable from '@/utils/loadable'

const Register = loadable(() => {import('@/views/Register')});

const routes = [
    {path:'/register',name:'Register',component:Register}
];

export default routes
