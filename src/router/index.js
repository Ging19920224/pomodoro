import Vue from 'vue';
import VueRouter from 'vue-router';
import TaskList from '../views/TaskList.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/',
  },
  {
    path: '/',
    name: 'TaskList',
    component: TaskList,
  },
  {
    path: '/Ringtones',
    name: 'Ringtones',
    component: () => import('../views/Ringtones.vue'),
  },
  {
    path: '/Analysis',
    name: 'Analysis',
    component: () => import('../views/Analysis.vue'),
  },
  {
    path: '/SetUp',
    name: 'SetUp',
    component: () => import('../views/SetUp.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
