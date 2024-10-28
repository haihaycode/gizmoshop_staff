const useComponent = (component) => () => import(`../view/${component}.vue`);
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
        name:"info",
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
      },
    ],
  },
];
export default dashboardRoutes;
