<template>
    <div>
        <div class="py-2 px-6 bg-[#113254] flex items-center shadow-lg shadow-black/5 sticky top-0 left-0 z-30">
            <button @click="toggleLeftMenu" type="button"
                class="text-lg text-white font-semibold sidebar-toggle block md:hidden ">
                <i class='bx bx-menu'></i>
            </button>
            <ul class="ml-auto flex items-center">
                <!-- <li class="mr-1 ">
                    <ActiveTimeTrackerComponent />
                </li> -->
                <!-- tìm kiếm  -->
                <!-- <li class="mr-1 ">
                    <button type="button"
                        class="dropdown-toggle text-gray-400 mr-4 w-8 h-8 rounded flex items-center justify-center  hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            class="hover:bg-gray-100 hover:bg-opacity-5 rounded-full" viewBox="0 0 24 24"
                            style="fill: white;">
                            <path
                                d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z">
                            </path>
                        </svg>
                    </button>

                </li> -->
                <!-- thông báo -->
                <li class="ml-3">
                    <button @click="modalNotificationIsOpen = !modalNotificationIsOpen" type="button"
                        class="dropdown-toggle text-gray-400 mr-4 w-8 h-8 rounded flex items-center0">

                        <i v-if="isOpen" class="bx bx-bell text-3xl bx-tada bx-rotate-90">
                            <span
                                class="absolute bottom-4 left-4 text-xs font-semibold text-white bg-red-500 rounded-full w-4 h-4 flex items-center justify-center">
                                {{ count }}
                            </span>
                        </i>

                        <i v-else class="bx bx-bell text-3xl bx-flip-horizontal"></i>

                    </button>
                    <CornerModal class="custom-margin-left" :isShow="false"
                        :closeModal="() => (modalNotificationIsOpen = !modalNotificationIsOpen)"
                        :isOpen="modalNotificationIsOpen" :position="'top-left'" :header="`
                            <div class='flex items-center justify-center p-4 rounded-lg '>
                                <span class='uppercase font-bold text-lg text-red-300 text-center w-full'>Các dịch vụ cần xử lý</span>
                            </div>`">
                        <template #body>
                            <!-- Đơn hàng -->
                            <div @click="toggleOrders" class="mb-6 cursor-pointer">
                                <div
                                    class="flex items-center justify-between bg-blue-50 p-4 rounded-lg shadow-md hover:bg-blue-100 transition duration-300">
                                    <span class="font-semibold text-lg text-blue-800">Đơn hàng cần xử lý</span>
                                    <i v-if="!showOrders" class='bx bx-caret-down-circle bx-flashing'></i>
                                </div>
                                <div v-if="showOrders" class="ml-4 mt-4 space-y-4">

                                    <div v-if="isloading"
                                        class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-300">
                                        <p class="text-base text-blue-800">Mã đơn hàng: <span class="font-semibold">Đang
                                                tải...</span></p>
                                        <p class="text-sm text-gray-700">Người tạo:
                                            <span class="text-yellow-600">
                                                Đang tải...
                                            </span>
                                        </p>
                                        <p class="text-sm text-gray-600">Thời gian tạo: <span class="font-medium">Đang
                                                tải...</span></p>
                                    </div>

                                    <div v-else v-for="(order, index) in orderNotication" :key="index"
                                        class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-300">
                                        <p class="text-base text-blue-800">Mã đơn hàng: <span class="font-semibold">{{
                                            order.orderCode }}</span></p>
                                        <p class="text-sm text-gray-700">Người tạo:
                                            <span class="text-yellow-600">
                                                {{ order.supplier ? 'Nhà cung cấp' : 'Khách hàng' }}
                                            </span>

                                        </p>
                                        <p class="text-sm text-gray-600">Thời gian tạo: <span class="font-medium">{{
                                            formatDay(order.createDateOrder) }}</span></p>
                                    </div>

                                    <button v-if="count > limit" type="button" @click="handleLoadNotification(true)"
                                        class="px-4 py-2 border border-red-600 text-red-600 rounded-sm hover:bg-red-600 hover:text-white transition duration-300 ease-in-out">Xem
                                        thêm</button>
                                </div>
                            </div>

                            <!-- Giao dịch -->
                            <!-- <div @click="toggleTransactions" class="cursor-pointer">
                                <div
                                    class="flex items-center justify-between bg-blue-50 p-4 rounded-lg shadow-md hover:bg-blue-100 transition duration-300">
                                    <span class="font-semibold text-lg text-blue-800">Giao dịch cần xử lý</span>
                                    <i class='bx bx-caret-down-circle bx-flashing'></i>
                                </div>
                                <div v-if="showTransactions" class="ml-4 mt-4 space-y-4">
                                    <div v-for="(wishList, index) in wishListNotication" :key="index"
                                        class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-300">
                                        <p class="text-base text-blue-800">Mã giao dịch: <span class="font-semibold">{{
                                            wishList.id_transaction }}</span></p>
                                        <p class="text-sm text-gray-700">Trạng thái:
                                            <span
                                                :class="wishList.isSupplier === 'Không phải nhà cung cấp' ? 'text-yellow-600' : 'text-green-600'">{{
                                                    wishList.isSupplier }}</span>
                                        </p>
                                        <p class="text-sm text-gray-600">Thời gian tạo: <span class="font-medium">{{
                                            wishList.createAt }}</span></p>
                                    </div>
                                </div>
                            </div> -->
                        </template>
                    </CornerModal>

                </li>

                <!-- thông tin cá nhân  -->
                <li class=" ml-3">
                    <button @click="modalInfoIsOpen = !modalInfoIsOpen" type="button" class=" flex items-center">
                        <div class="flex-shrink-0 w-10 h-10 relative">
                            <div class="p-1 bg-white rounded-full focus:outline-none focus:ring">
                                <img class="w-8 h-8 rounded-full" :src="require('@/assets/image/Gizmo.png')" alt="" />
                                <div
                                    class="top-0 left-7 absolute w-3 h-3 bg-lime-400 border-2 border-white rounded-full animate-ping">
                                </div>
                                <div
                                    class="top-0 left-7 absolute w-3 h-3 bg-lime-500 border-2 border-white rounded-full">
                                </div>
                            </div>
                        </div>
                        <div class="p-2 md:block text-left">
                            <h2 class=" font-semibold text-white text-xs">Xin chào, {{ name }}
                            </h2>
                            <p class="text-xs text-white opacity-45">Nhân viên quản lý</p>
                        </div>
                    </button>
                    <CornerModal class="mr-2" :closeModal="() => (modalInfoIsOpen = !modalInfoIsOpen)"
                        :isOpen="modalInfoIsOpen" :offset="10" :position="'top-right'" :header="'Thông tin cá nhân'">
                        <template #body>
                            <div>
                                <div class="p-4">
                                    <div class="mb-4 flex flex-col items-center justify-center">
                                        <!-- Change to flex-col for vertical stacking -->
                                        <div class="flex-shrink-0">
                                            <img class="w-16 h-16 rounded-full" :src="loadImage(user.image, 'account')"
                                                alt="User Avatar" />
                                        </div>
                                        <div class="text-center mt-2"> <!-- Added mt-2 for some spacing -->
                                            <h3 class="font-bold text-lg">{{ user.fullname }}</h3>
                                            <p class="text-sm text-gray-600">{{ user.email }}</p>
                                        </div>
                                    </div>
                                    <div class="mb-4">
                                        <h4 class="font-semibold">THÔNG TIN CÁ NHÂN</h4>
                                        <p><strong>Điện thoại :</strong> {{ user.sdt }}</p>
                                        <p><strong>Ngày sinh:</strong> {{ formatBirthDay(user.birthday) }}</p>
                                        <p><strong>Tiểu sử :</strong> {{ user.extraInfo }}</p>
                                    </div>
                                    <div class="mb-4">
                                        <h4 class="font-semibold">QUYỀN HẠN</h4>
                                        <p class="text-gray-700">
                                            <span v-for="(role, index) in translatedRoles" :key="index"
                                                :style="{ color: role.color }" class="inline">
                                                {{ role.name }}<span v-if="index < translatedRoles.length - 1">, </span>
                                            </span>
                                        </p>
                                    </div>
                                    <div>
                                        <h4 class="font-semibold mb-4">THÔNG TIN KHÁC</h4>
                                        <div class="grid grid-cols-1 sm:grid-cols-1 gap-2"> <!-- Using grid layout -->
                                            <router-link :to="{ name: 'info' }"
                                                @click="modalInfoIsOpen = !modalInfoIsOpen"
                                                class="px-4 text-center py-2 border border-blue-600 text-blue-600 rounded-sm hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out">
                                                Quản lý thông tin
                                            </router-link>
                                            <button @click="logout"
                                                class="px-4 py-2 border border-red-600 text-red-600 rounded-sm hover:bg-red-600 hover:text-white transition duration-300 ease-in-out">
                                                Đăng xuất
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </CornerModal>
                </li>
            </ul>
        </div>
    </div>
    <!-- modal thông tin cá nhân -->

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { getinfo } from '@/api/auth/meApi';
import CornerModal from './modal/CornerModal.vue';
import { loadImage } from '@/services/imageService';
import { formatBirthDay, translatedRoles, formatDay } from '@/utils/currencyUtils';
import { orderNotification } from '@/api/orderApi';
// import ActiveTimeTrackerComponent from './time/ActiveTimeTrackerComponent.vue';
export default {
    name: 'HeaderComponent',
    data() {
        return {
            isloading: false,
            count: 0,
            isOpen: true,
            modalNotificationIsOpen: false,
            modalInfoIsOpen: false,
            user: {},
            showTransactions: false,
            showOrders: false,
            page: 0,
            limit: 2,
            type: 0,
            sortField: "id",
            sortDirection: "desc",
            orderNotication: [],
            wishListNotication: []

        }
    },
    components: {
        CornerModal,
    },
    async mounted() {
        await this.handleGetInfoAccount();
        this.handleLoadNotification();
    },

    computed: {
        translatedRoles() {
            return translatedRoles(this.user.roles || []);
        },
        ...mapGetters('auth', ['name'])
    },
    methods: {
        formatDay,
        formatBirthDay,
        loadImage,
        ...mapActions('leftMenu', ['toggleLeftMenu']),
        ...mapActions('auth', ['logout']),

        async handleLoadNotification(addlimit) {
            try {
                if (addlimit) {
                    this.limit += 2;
                }
                const data = {
                    page: this.page,
                    limit: this.limit,
                    sort: null,
                }
                const res = await orderNotification(data);
                this.orderNotication = res.data.content
                if (this.orderNotication.length > 0) {
                    this.count = res.data.totalElements;
                    this.isOpen = true;
                } else {
                    this.isOpen = false;
                }
                this.isloading = false;
            } catch (error) {
                console.error(error);
            }
        },

        async handleGetInfoAccount() {
            try {
                this.user = await getinfo().then(res => res.data);
            } catch (error) {
                console.error(error);
            }
        },
        toggleOrders() {
            console.log(this.showOrders);
            this.showOrders = !this.showOrders;
        },
        toggleTransactions() {
            this.showTransactions = !this.showTransactions;
        }
    }
}
</script>

<style scoped>
.custom-margin-left {
    margin-left: -13rem;
}

/* Thêm một số phong cách để làm cho giao diện đẹp hơn */
.bg-gray-100 {
    background-color: #f7fafc;
}

.shadow-lg {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.text-blue-500 {
    color: #3b82f6;
}

.text-yellow-500 {
    color: #f59e0b;
}

.text-green-500 {
    color: #10b981;
}

.transition-all {
    transition: all 0.3s ease;
}

.cursor-pointer:hover {
    cursor: pointer;
}
</style>