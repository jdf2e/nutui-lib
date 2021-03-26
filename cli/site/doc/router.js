import Vue from 'vue';
import VueRouter from 'vue-router';
import { version,name } from '@/../package.json';
import frontCover from './index.vue';
import frontCover_JDL from './indexJDL.vue';

const Index = () => import(/* webpackPrefetch: true */ /* webpackChunkName: 'info' */ './info.vue');
const Intro = () => import(/* webpackPrefetch: true */ /* webpackChunkName: 'intro' */ './page/intro.vue');
const Start = () => import(/* webpackPrefetch: true */ /* webpackChunkName: 'start' */ './page/start.vue');
const International = () => import(/* webpackPrefetch: true */ /* webpackChunkName: 'international' */ './page/international.vue');
const Design = () => import(/* webpackPrefetch: true */ /* webpackChunkName: 'design' */ './page/design.vue');
const Theme = () => import(/* webpackPrefetch: true */ /* webpackChunkName: 'theme' */ './page/theme.vue');
const JoinUs = () => import(/* webpackPrefetch: true */ /* webpackChunkName: 'joinus' */ './page/joinus.vue');
//const Update = () => import('./page/changelog.vue');

Vue.use(VueRouter);

const routes = [
	{
		path: '*',
		redirect: '/index'
	},
	{
		path: '/',
		redirect: '/index'
	},
	{
		path: '/index',
		name: 'frontcover',
		component: name == '@nutui/nutui-jdl' ? frontCover_JDL:frontCover 
	},
	{
		path: '/intro',
		name: 'intr',
		components: {
			default: Index,
			main: Intro
		}
	},
	{
		path: '/international',
		name: 'international',
		components: {
			default: Index,
			main: International
		}
	},
	{
		path: '/design',
		name: 'design',
		components: {
			default: Index,
			main: Design
		}
	},
	{
		path: '/start',
		name: 'start',
		components: {
			default: Index,
			main: Start
		}
	},
	{
		path: '/theme',
		name: 'theme',
		components: {
			default: Index,
			main: Theme
		}
	},
	{
		path: '/joinus',
		name: 'joinus',
		components: {
			default: Index,
			main: JoinUs
		}
	}
];

let contexts = require.context('./view', false, /\.vue$/)
contexts.keys().forEach(component => {
    let componentEntity = contexts(component).default;
    routes.push({
		path: '/' + componentEntity.name,
		components: {
			default: Index,
			main: componentEntity
		},
		name: componentEntity.name
	});
})

const router = new VueRouter({
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (to.path == '/index') {
			return null;
		} else {
			return { x: 0, y: 0 };
		}
	}
});

router.afterEach((to, from) => {
	try {
	  setTimeout(() => {
		new Image().src =
		  "https://nutui.jd.com/openapi/point?p=" +
		  encodeURIComponent(JSON.stringify(location));
	  }, 500);
	} catch (error) {}
  });

export default router;
