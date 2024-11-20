const useComponent = (component) => () => import(`../view/${component}.vue`);
const useComponentTAG = (component) => () => import(`@/components/${component}.vue`);
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import sideBar from "@/components/sideBar.vue";

const dashboardRoutes = [
  {
    path: "/",
    component: useComponent("admin"),
    children: [
      {
        path: "",
        name: "dashboard",
        meta: {
          title: "QUẢN LÝ CHUNG",
          description: "GIZMO",
        },
        components: {
          default: useComponent("dashboard"),
          header: Header,
          footer: Footer,
          sideBar: sideBar,
        },
      },
    ],
  },
  {
    path: "/info",
    component: useComponent("admin"),
    children: [
      {
        path: "",
        name: "info",
        meta: {
          title: "QUẢN LÝ CHUNG",
          description: "GIZMO",
        },
        components: {
          default: useComponent("infoAccount"),
          header: Header,
          footer: Footer,
          sideBar: sideBar,
        },
      },
    ],
  },
  {
    path: "/brand",
    component: useComponent("admin"),
    children: [
      {
        path: "",
        name: "brand",
        meta: {
          title: "THƯƠNG HIỆU",
          description: "GIZMO",
        },
        components: {
          default: useComponent("brand"),
          header: Header,
          footer: Footer,
          sideBar: sideBar,
        },
      },
    ],
  },
  {
    path: "/categories",
    component: useComponent("admin"),
    children: [
      {
        path: "",
        name: "categories",
        meta: {
          title: "Quản lý danh mục",
          description: "Gizmo",
        },
        components: {
          default: useComponent("categories"),
          header: Header,
          footer: Footer,
          sideBar: sideBar,
        },
      },
    ],
  },
  {
    path: "/voucher",
    component: useComponent("admin"),
    children: [
      {
        path: "",
        name: "voucher",
        meta: {
          title: "PHIẾU GIẢM GIÁ",
          description: "GIZMO",
        },
        components: {
          default: useComponent("voucher"),
          header: Header,
          footer: Footer,
          sideBar: sideBar,
        },
      },
    ],
  },
  {
    path: "/product",
    component: useComponent("admin"),
    children: [
      {
        path: "",
        name: "product",
        meta: {
          title: "DANH SÁCH SẢN PHẨM",
          description: "GIZMO",
        },
        components: {
          default: useComponent("product"),
          header: Header,
          footer: Footer,
          sideBar: sideBar,
        },
      }, {
        path: "add",
        name: "add-product",
        meta: {
          title: "THÊM SẢN PHẨM",
          description: "GIZMO",
        },
        components: {
          default: useComponentTAG("product/InventoryNewProductComponent"),
          header: Header,
          footer: Footer,
          sideBar: sideBar,
        },
      },
    ],
  },
  {
    path: "/orderclient",
    component: useComponent("admin"),
    children: [
      {
        path: "",
        name: "orderclient",
        meta: {
          title: "DANH SÁCH ĐƠN HÀNG KHÁCH HÀNG",
          description: "GIZMO",
        },
        components: {
          default: useComponent("orderClient"),
          header: Header,
          footer: Footer,
          sideBar: sideBar,
        },
      },
    ],
  }, {
    path: "/orderpartner",
    component: useComponent("admin"),
    children: [
      {
        path: "",
        name: "orderpartner",
        meta: {
          title: "DANH SÁCH ĐƠN HÀNG ĐỐI TÁC",
          description: "GIZMO",
        },
        components: {
          default: useComponent("orderPartner"),
          header: Header,
          footer: Footer,
          sideBar: sideBar,
        },
      },
    ],
  }, {
    path: "/transaction",
    component: useComponent("admin"),
    children: [
      {
        path: "",
        name: "transactions",
        meta: {
          title: "DANH SÁCH GIAO DỊCH",
          description: "GIZMO",
        },
        components: {
          default: useComponent("transaction"),
          header: Header,
          footer: Footer,
          sideBar: sideBar,
        },
      },
    ],
  },
];
export default dashboardRoutes;
