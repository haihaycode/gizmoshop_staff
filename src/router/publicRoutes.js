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
    }, {
        path: '/test',
        component: useComponent('test'),
        // children: [

        //     {
        //         path: '',
        //         name: 'login',
        //         meta: {
        //             title: "Biểu Đồ Hệ Thống",
        //             description: "Biểu"
        //         },
        //         components: {
        //             default: useComponent('test'),

        //         }

        //     },

        // ]
    },
];

export default publicRoutes;  