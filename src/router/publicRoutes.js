const useComponent = component => () => import(`../view/${component}.vue`);
import client from '@/view/client.vue';
const publicRoutes = [
    {
        path: '/login',
        component: client,
        children: [
            {
                path: '',
                name: 'login',
                meta: {
                    title: "Quản Lý Cửa Hàng",
                    description: "Đăng nhập"
                },
                components: {
                    default: useComponent('login'),

                }

            },

        ]
    },
    {
        //route lỗi (err)
        path: '/err',
        component: client,
        children: [

            {
                path: '404',
                name: 'NotFound',
                meta: {
                    title: "Đường dẫn không tồn tại",
                    description: "Gizmo"
                },
                components: {
                    default: useComponent('error/404'),

                }

            },
            {
                path: '500',
                name: 'ServerError',
                meta: {
                    title: "Đã có lỗi xảy ra",
                    description: "Gizmo"
                },
                components: {
                    default: useComponent('error/500'),

                }
            },
            {
                path: '',
                redirect: '/err/500'
            },
            //thêm route lỗi
        ]
    },
    {
        //route test
        path: '/test',
        component: useComponent('test'),
    },
];

export default publicRoutes;  