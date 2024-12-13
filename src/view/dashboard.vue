<template>
    <div class="p-2 bg-gray-200 bg-opacity-30 shadow-md shadow-black/5  lg:m-2 md:m-0">
        <!-- <h1 class="text-lg font-semibold mb-4 lg:mb-0 lg:text-xl">Dashboard - GizmoShop</h1> -->
        <!-- <div class="space-y-2 text-sm lg:text-base">
            <p><strong>Token:</strong> <span class="break-all">{{ token }}</span></p>
            <p><strong>Refresh Token:</strong> <span class="break-all">{{ refreshToken }}</span></p>
            <p><strong>Email:</strong> {{ email }}</p>
            <p><strong>Role:</strong> {{ role }}</p>
            
        </div> -->
        <!-- Tiêu đề -->
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 px-4 rounded-md shadow-lg">
            <h1 class="text-3xl lg:text-4xl font-bold">Chào mừng đến với hệ thống quản lý GizmoShop</h1>
            <p class="mt-2 text-sm lg:text-base">
                Hệ thống quản lý này được thiết kế để giúp các nhân viên của GizmoShop quản lý công việc một cách dễ dàng và hiệu quả.
            </p>
        </div>

        <!-- Giới thiệu về hệ thống -->
        <div class="mt-6 bg-white p-6 rounded-md shadow-md">
            <h2 class="text-2xl font-bold text-gray-800">Giới thiệu về hệ thống</h2>
            <p class="mt-4 text-gray-700 leading-relaxed">
                Hệ thống quản lý GizmoShop cung cấp một nền tảng toàn diện để quản lý các công việc hàng ngày tại cửa hàng. Từ việc quản lý sản phẩm, theo dõi đơn hàng, đến việc kiểm soát các thông tin của khách hàng, hệ thống này giúp bạn dễ dàng thực hiện tất cả các tác vụ cần thiết trong công việc của mình.
            </p>
            <p class="mt-4 text-gray-700 leading-relaxed">
                Hệ thống còn cho phép bạn theo dõi và báo cáo các hoạt động trong cửa hàng, giúp bạn có cái nhìn tổng quan về tình trạng hoạt động của toàn bộ cửa hàng.
            </p>
        </div>

        <!-- Nhiệm vụ hàng ngày -->
        <div class="mt-6 bg-white p-6 rounded-md shadow-md">
            <h2 class="text-2xl font-bold text-gray-800">Nhiệm vụ hàng ngày của bạn</h2>
            <p class="mt-4 text-gray-700 leading-relaxed">
                Là nhân viên quản lý, nhiệm vụ hàng ngày của bạn có thể bao gồm:
            </p>
            <ul class="list-disc pl-6 mt-4 text-gray-700">
                <li>Kiểm tra tình trạng đơn hàng và đảm bảo các đơn hàng được xử lý đúng thời gian.</li>
                <li>Cập nhật thông tin sản phẩm, giá cả và số lượng hàng hóa trong kho.</li>
                <li>Giải quyết các yêu cầu của khách hàng và đảm bảo họ có trải nghiệm mua sắm tốt nhất.</li>
                <li>Theo dõi và phân tích các báo cáo hoạt động của cửa hàng để tối ưu hóa hiệu quả công việc.</li>
            </ul>
        </div>

        <!-- Các tính năng hệ thống -->
        <div class="mt-6 bg-white p-6 rounded-md shadow-md">
            <h2 class="text-2xl font-bold text-gray-800">Các tính năng của hệ thống</h2>
            <p class="mt-4 text-gray-700 leading-relaxed">
                Hệ thống của chúng tôi cung cấp nhiều tính năng hữu ích để hỗ trợ công việc hàng ngày của bạn:
            </p>
            <ul class="list-disc pl-6 mt-4 text-gray-700">
                <li><strong>Quản lý sản phẩm:</strong> Dễ dàng thêm, sửa và xóa sản phẩm trong kho. Cập nhật thông tin chi tiết của từng sản phẩm như tên, mô tả, giá cả và hình ảnh.</li>
                <li><strong>Theo dõi đơn hàng:</strong> Quản lý các đơn hàng của khách hàng, theo dõi trạng thái đơn hàng và xử lý các yêu cầu liên quan đến đơn hàng.</li>
                <li><strong>Báo cáo và thống kê:</strong> Xem các báo cáo về doanh thu, số lượng sản phẩm bán ra, và các chỉ số hoạt động của cửa hàng để đưa ra các quyết định kịp thời.</li>
                <li><strong>Quản lý các nhà cung cấp của hàng:</strong> Theo dõi thông tin của nhà cung cấp, bao gồm lịch sử đơn hàng cung cấp và các chương trình khuyến mãi, ưu đãi...</li>
            </ul>
        </div>

        <!-- Hướng dẫn nhanh -->
        <div class="mt-6 bg-white p-6 rounded-md shadow-md">
            <h2 class="text-2xl font-bold text-gray-800">Hướng dẫn nhanh</h2>
            <ul class="list-disc pl-6 mt-4 text-gray-700">
                <li>Sử dụng menu bên trái để truy cập các chức năng quản lý.</li>
                <li>Thường xuyên kiểm tra các thông báo hệ thống để cập nhật tình trạng đơn hàng và yêu cầu từ khách hàng.</li>
                <li>Bảo mật tài khoản của bạn bằng cách thay đổi mật khẩu định kỳ và không chia sẻ thông tin đăng nhập với người khác.</li>
                <li>Liên hệ với quản trị viên nếu bạn gặp bất kỳ vấn đề kỹ thuật nào trong khi sử dụng hệ thống.</li>
            </ul>
        </div>

        <!-- Kết luận -->
        <div class="mt-6 bg-white p-6 rounded-md shadow-md">
            <h2 class="text-2xl font-bold text-gray-800">Kết luận</h2>
            <p class="mt-4 text-gray-700 leading-relaxed">
                Chúng tôi hy vọng hệ thống này sẽ giúp bạn thực hiện công việc quản lý một cách dễ dàng và hiệu quả. Nếu có bất kỳ câu hỏi hoặc yêu cầu nào, đừng ngần ngại liên hệ với bộ phận hỗ trợ kỹ thuật.
            </p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'dashboard-view',
    computed: {
        ...mapGetters('auth', ['token', 'refreshToken', 'name', 'role', 'user']),
        email() {
            return this.name || 'Không có email';
        }
    },
    // mounted() {
    //     console.log('User Info:', this.user);
    // }
};
</script>

<style scoped>
/* Add custom styles if necessary */
</style>
