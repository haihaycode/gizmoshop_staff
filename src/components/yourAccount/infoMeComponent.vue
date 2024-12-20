<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h1 class="  text-2xl font-semibold border-l-4 border-blue-500 mb-6">&nbsp; Thông tin của tôi</h1>

    <div class="flex flex-col md:flex-row items-center mb-6">
      <img @error="handleImageError" v-if="infoAccount?.image" :src="loadImage(infoAccount?.image, 'account')"
        alt="Profile Image" class="w-24 h-24 rounded-full object-cover" />

      <div class="mt-4 md:mt-0 md:ml-4 text-center md:text-left">
        <h2 class="text-xl font-semibold">{{ infoAccount?.fullname }}</h2>
        <p class="text-gray-600">{{ infoAccount?.email }}</p>
        <p class="text-blue-600 cursor-pointer" @click="updateImageModal()">
          Cập nhật hình ảnh
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 class="text-xl font-semibold">THÔNG TIN CÁ NHÂN</h2>
        <div class="mt-4 space-y-4">
          <div>
            <span class="font-semibold">Email</span>
            <p>
              {{ infoAccount?.email
              }}<a @click="changeEmailModal()" class="text-blue-500 cursor-pointer">&nbsp;Change</a>
            </p>
          </div>
          <div>
            <span class="font-semibold">Số điện thoại</span>
            <p>{{ infoAccount?.sdt }}</p>
          </div>
          <div>
            <span class="font-semibold">Ngày sinh</span>
            <p>{{ formattedBirthday }}</p>
          </div>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-semibold">THÔNG TIN KHÁC</h2>
        <div class="mt-4 space-y-4">
          <div>
            <span class="font-semibold">Họ và Tên</span>
            <p>{{ infoAccount?.fullname }}</p>
          </div>
          <div>
            <span class="font-semibold">Quyền</span>
            <p class="text-gray-700">
              <span v-for="(role, index) in translatedRoles" :key="index" :style="{ color: role.color }" class="inline">
                {{ role.name }}<span v-if="index < translatedRoles.length - 1">, </span>
              </span>
            </p>
          </div>
          <div>
            <span class="font-semibold">Thời gian tạo tài khoản</span>
            <p>{{ formattedCreateAt }}</p>
          </div>
          <div>
            <span class="font-semibold">Thông tin thêm</span>
            <p>
              {{ infoAccount?.extraInfo || "No extra information provided" }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end">
      <Button @click="updateMeModal()" :isLoading="isLoading" :text="'Cập nhật thông tin'" type="button"
        class="px-4 py-2 mt-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600">
      </Button>
    </div>
    <updateAvatar :isOpen="ModalUpdateImageIsOpen" @close="updateImageModal" :getInfo="info" @update-success="info">
    </updateAvatar>
    <changeEmail :isOpen="ModalChangeEmailIsOpen" @close="changeEmailModal" @update-success="info">
    </changeEmail>
    <updateInfoMe :isOpen="ModalUpdateMeIsOpen" @close="updateMeModal" :getInfo="info" @update-success="info">
    </updateInfoMe>
  </div>
</template>

<script>
import { getinfo } from "@/api/auth/meApi";
import dayjs from "dayjs";
import { loadImage } from "@/services/imageService";
import Button from "../buttons/button.vue";
import updateAvatar from "../yourAccount/updateAvatar.vue";
import changeEmail from "../yourAccount/changeEmail.vue";
import updateInfoMe from "../yourAccount/updateInfoMe.vue";
import { mapGetters } from "vuex";
import { translatedRoles } from "@/utils/currencyUtils";

export default {
  name: "infoMeComponent",
  components: {
    changeEmail,
    updateAvatar,
    Button,
    updateInfoMe
  },
  data() {
    return {
      ModalChangeEmailIsOpen: false,
      ModalUpdateMeIsOpen: false,
      ModalUpdateImageIsOpen: false,
      imageNotFound: require("@/assets/image/3red.svg"),
      infoAccount: {
        email: "Đang tải...",
        fullname: "Đang tải...",
        sdt: "Đang tải...",
        birthday: "Đang tải...",
        extraInfo: "Đang tải...",
        roles: ["Đang tải..."],
        createAt: "Đang tải...",
        image: require("@/assets/image/3red.svg"),
      },
    };
  },
  computed: {
    ...mapGetters("loading", ["isLoading"]),
    formattedBirthday() {
      return this.infoAccount?.birthday
        ? dayjs(this.infoAccount.birthday).format("DD/MM/YYYY")
        : "No birthday provided";
    },

    formattedRoles() {
      return this.infoAccount?.roles?.length
        ? this.infoAccount.roles.join(", ")
        : "No roles assigned";
    },

    formattedCreateAt() {
      return this.infoAccount?.createAt
        ? dayjs(this.infoAccount.createAt).format("DD/MM/YYYY HH:mm")
        : "No creation date available";
    },
    translatedRoles() {
      return translatedRoles(this.infoAccount.roles || []);
    },
  },
  mounted() {
    this.info();
  },
  methods: {
    loadImage,
    handleImageError(event) {
      event.target.src = "https://demofree.sirv.com/nope-not-here.jpg";
    },
    async info() {
      try {
        const response = await getinfo();
        this.infoAccount = response.data;
        return this.infoAccount;
      } catch (error) {
        console.error(error);
      }
    },
    changeEmailModal() {
      this.ModalChangeEmailIsOpen = !this.ModalChangeEmailIsOpen;
    },
    updateMeModal() {
      this.ModalUpdateMeIsOpen = !this.ModalUpdateMeIsOpen;
    },
    updateImageModal() {
      this.ModalUpdateImageIsOpen = !this.ModalUpdateImageIsOpen;
    },
  },
};
</script>

<style scoped></style>