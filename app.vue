<script setup lang="ts">
import {getAuth, onAuthStateChanged} from "firebase/auth";

const {registerUser, signUser, userSignOut} = useFirebaseAuth();

const form = reactive({
	email: "",
	password: ""
})

const currentUser = reactive({
	isLogin: false,
	displayName: '',
	email: '',
	photoURL: '',
	emailVerified: '',
	uid: '',
})

let userAcc = reactive({});
let isLogin = ref(false);

async function handleRegistration() {
	await registerUser(form.email, form.password);
}

async function handleSignIn() {
	userAcc = await signUser(form.email, form.password);
	currentUser.isLogin = true;
}

async function exit() {
	userAcc = await userSignOut();
	isLogin.value = false;
}

onMounted(() => {
	const auth = getAuth();
	onAuthStateChanged(auth, (user) => {
		if (user) {
			currentUser.displayName = user.displayName;
			currentUser.email = user.email;
			currentUser.photoURL = user.photoURL;
			currentUser.emailVerified = user.emailVerified;
			currentUser.uid = user.uid;
		} else {
			console.log('User is signed out');
		}
	});
});
</script>

<template>
	<main class="grid">
		<section class="content">
			<h1>Nuxt 3, Firebase, <s>Pinia</s></h1>

			<form class="form authorization_form">
				<fieldset>
					<legend>Зарегистрироваться</legend>
					<input v-model="form.email" type="email" name="email" id="">
					<input v-model="form.password" type="password" name="password" id="">
					<button @click.prevent="handleRegistration">Зарегистрироваться</button>
				</fieldset>
			</form>

			<form class="form authorization_form">
				<fieldset>
					<legend>Войти</legend>
					<input v-model="form.email" type="email" name="email" id="">
					<input v-model="form.password" type="password" name="password" id="">
					<button @click.prevent="handleSignIn">Войти</button>
				</fieldset>
			</form>

			<form class="form form_profile">
				<fieldset>
					<legend>Профиль пользователя</legend>
					<ul>
						<li>displayName: <strong>{{ currentUser.displayName }}</strong></li>
						<li>email: <strong>{{ currentUser.email }}</strong></li>
						<li>photoURL: <strong>{{ currentUser.photoURL }}</strong></li>
						<li>emailVerified: <strong>{{ currentUser.emailVerified }}</strong></li>
						<li>uid: <strong>{{ currentUser.uid }}</strong></li>
					</ul>
				</fieldset>
			</form>

			<button @click.prevent="exit">Выйти</button>

			<h2 v-if="currentUser.isLogin">Вы вошли как {{ currentUser.email }}</h2>
			<h2 v-else>Вы не вошли</h2>

			<h4>Тестовый аккаунт</h4>
			<p>test@test.ru</p>
			<p>123456</p>
		</section>

		<aside>
			<h3>Task list</h3>
			<ul class="task-list">
				<li class="task task_complete">Создать пользователя</li>
				<li class="task task_complete">Войдите в систему с помощью адреса электронной почты и пароля</li>
				<li class="task task_complete">Выход из системы</li>
				<li class="task task_complete">Получить профиль пользователя</li>
				<li class="task">Получите информацию о профиле пользователя, зависящую от поставщика услуг.</li>
				<li class="task">Обновить профиль пользователя</li>
				<li class="task">Отправить пользователю электронное письмо с подтверждением</li>
				<li class="task">Установить пароль пользователя</li>
				<li class="task">Отправить электронное письмо для сброса пароля</li>
				<li class="task">Удаление пользователя</li>
			</ul>
		</aside>
	</main>
</template>

<style lang="stylus">
input
	border 1px solid coral

.grid
	display grid
	grid-template-columns 2fr 1fr
	gap 32px

.form fieldset
	display grid
	grid-template-columns: 2fr 2fr 1fr;
	gap 16px

.form_profile fieldset
	grid-template-columns 1fr

.task-list
	padding: 0
	list-style-type: none;

.task
	padding-left: 24px
	text-indent: -24px;

	&::before
		color tomato
		content "☓"
		padding-right 10px

.task_complete
	&::before
		color green
		content "✓"
</style>