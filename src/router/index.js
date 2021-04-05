import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import store from '../stores/store';

Vue.use(VueRouter);

import Home from '../pages/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Rates from '../pages/Rates';
import Products from '../pages/Products';
import ProductDetails from '../pages/ProductDetails';
import manage from '../pages/Manage';
import Dashboard from '../pages/Admin/Dashboard';

import PackagesAdmin from '../components/admin/Packages';
import ProductsAdmin from '../components/admin/Products';
import PreAlertsAdmin from '../components/admin/PreAlerts';
import PaymentsAdmin from '../components/admin/Payments';
import Users from '../components/admin/Users';
import Settings from '../components/admin/Settings';

import NotFound from '../pages/NotFound';
const router = new VueRouter({
	routes: [
		{
			path: '/verify/:hash',
			name: 'Verify',
			meta: { authOnly: true },
			props: true,
			component: () => import('../pages/auth/Verify.vue')
		},
		{
			path: '/forgot-password',
			name: 'forgot-password',
			meta: { guestOnly: true },
			component: () => import('../pages/auth/ForgotPassword.vue')
		},
		{
			path: '/reset-password/:token',
			name: 'reset-password',
			meta: { guestOnly: true },
			props: true,
			component: () => import('../pages/auth/ResetPassword.vue')
		},
		{
			path: '/checkout',
			name: 'checkout',
			meta: { authOnly: true },
			component: () => import('../pages/Checkout.vue')
		},

		{
			path: '/verification',
			name: 'Verification',
			meta: { authOnly: true },
			props: true,
			component: () => import('../pages/auth/Verification.vue')
		},

		{ path: '/', component: Home },
		{ path: '/login', component: Login, meta: { guestOnly: true }, props: true },
		{ path: '/Register', component: Register, meta: { guestOnly: true } },
		{ path: '/about', component: About },
		{ path: '/contact', component: Contact },
		{ path: '/our-rates', component: Rates },
		{ path: '/browse-products', component: Products },
		{ path: '/details/:id', component: ProductDetails },
		//user dashboard
		{
			path: '/manage',
			component: manage
		},

		{
			path: '/dashboard',
			component: Dashboard,
			children: [
				{
					path: 'packages',
					component: PackagesAdmin
				},
				{
					path: 'products',
					component: ProductsAdmin
				},
				{
					path: 'pre_alerts',
					component: PreAlertsAdmin
				},
				{
					path: 'payments',
					component: PaymentsAdmin
				},
				{
					path: 'users',
					component: Users
				},
				{
					path: 'settings',
					component: Settings
				}
			],
			meta: { adminOnly: true }
		},

		{ path: '*', component: NotFound }
	],
	mode: 'history'
});

router.beforeEach((to, from, next) => {
	const isLoggedIn = () => {
		return localStorage.getItem('polaris-token');
	};
	const isAdmin = () => {
		return localStorage.getItem('is_admin');
	};

	Vue.config.productionTip = false;
	axios.interceptors.response.use(
		(response) => response,
		(error) => {
			if (error.response.status === 401) {
				store.commit('LOGIN', true);
				store.commit('AUTH_USER', null);
				localStorage.removeItem('polaris-token');
				router.push({ name: 'Login' });
			} else {
				return Promise.reject(error);
			}
		}
	);

	if (to.matched.some((record) => record.meta.authOnly)) {
		// this route requires auth, check if logged in
		// if not, redirect to login page.
		if (!isLoggedIn()) {
			next({
				path: '/login',
				query: { redirect: to.fullPath }
			});
        } else {
			next();
		}
	} else if (to.matched.some((record) => record.meta.guestOnly)) {
        if (isLoggedIn()) {

			next({
				path: '/',
				query: { redirect: to.fullPath }
			});
        } else {

			next();
		}
	} else if (to.matched.some((record) => record.meta.adminOnly)) {
		if (!!isLoggedIn() && isAdmin() == 0) {
			next({
				path: '*',
				query: { redirect: to.fullPath }
			});
		} else {
			next();
		}
	} else if (to.matched.some((record) => record.meta.userOnly)) {
		if (!!isLoggedIn() && isAdmin() == 1) {
			next({
				path: '*',
				query: { redirect: to.fullPath }
			});
		} else {
			next();
		}
	} else {
		next(); // make sure to always call next()!
	}
});

export default router;
