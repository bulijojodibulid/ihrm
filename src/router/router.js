import VueRouter from "vue-router";

const Login = () => import("@/views/login") // 动态加载，只有访问Login时才会加载Login组件
const Home = () => import("@/views/home")
const Department = () => import("@/views/department")
const Role = () => import("@/views/role")
const Employee = () => import("@/views/employee")
const Detail = () => import("@/views/employee/detail.vue")
const Permission = () => import('@/views/permission/index.vue')

const routes = [
  {
    path: "/",
    redirect: '/login'
  },
  {
    path: "/login",
    name: 'login',
    component: Login,
  },
  {
    path: "/home",
    component: Home,
    children: [
      // {
      //   path: "/overview",
      //   name: 'home',
      //   title: '首页',
      //   isSelected: true
      // },
      {
        path: '/department',
        component: Department,
        title: '组织',
        isSelected: false
      },
      {
        path: '/role',
        component: Role,
        title: '角色',
        isSelected: false
      },
      {
        path: '/employee',
        component: Employee,
        title: '员工',
        isSelected: false
      },
      {
        path: '/employee/detail/:id?',
        component: Detail,
        title: '员工详情',
        hidden: true
      },
      {
        path: '/permission',
        component: Permission,
        title: '权限',
        isSelected: false
      },
      // {
      //   path: '/attendance',
      //   title: '考勤',
      //   isSelected: false
      // },
      // {
      //   path: '/approval',
      //   title: '审批',
      //   isSelected: false
      // },
      // {
      //   path: '/salary',
      //   title: '工资',
      //   isSelected: false
      // },
      // {
      //   path: '/social',
      //   title: '社保',
      //   isSelected: false
      // }
    ]
  }
];

export const router = new VueRouter({
  mode: 'history',
  routes
})