<script setup lang="ts">
import {getAuth, onAuthStateChanged} from "firebase/auth";

const {registerUser, signUser, userSignOut} = useFirebaseAuth();

const form = reactive({
	email: "",
	password: ""
})

let userAcc = reactive({});
let isLogin = ref(false);

async function handleRegistration() {
	await registerUser(form.email, form.password);
}

async function handleSignIn() {
	userAcc = await signUser(form.email, form.password);
	isLogin.value = true;
}

async function who() {
	await getUserState();
}

async function exit() {
	userAcc = await userSignOut();
	isLogin.value = false;
}

onMounted(() => {
	const auth = getAuth();
	onAuthStateChanged(auth, (user) => {
		if (user) {
			console.log('displayName', user.displayName);
			console.log('email', user.email);
			console.log('photoURL', user.photoURL);
			console.log('emailVerified', user.emailVerified);
			console.log('uid', user.uid);
		} else {
			console.log('User is signed out');
		}
	});
});
</script>

<template>
	<main class="grid">
		<section class="content">
			<div class="login_form">
				<form>
					<fieldset>
						<legend>Зарегистрироваться</legend>
						<input v-model="form.email" type="email" name="email" id="">
						<input v-model="form.password" type="password" name="password" id="">
						<button @click.prevent="handleRegistration">Зарегистрироваться</button>
					</fieldset>
				</form>
			</div>

			<div class="authorization_form">
				<fieldset>
					<legend>Войти</legend>
					<p>test@test.ru</p>
					<p>123456</p>
					<input v-model="form.email" type="email" name="email" id="">
					<input v-model="form.password" type="password" name="password" id="">
					<button @click.prevent="handleSignIn">Войти</button>
				</fieldset>
			</div>

			<div class="authorization_form">
				<fieldset>
					<legend>Получить данные пользователя</legend>
					<button @click.prevent="who">Who</button>
				</fieldset>
			</div>

			<button @click.prevent="exit">Выйти</button>

			<h2 v-if="isLogin">Вы вошли как {{ userAcc.user.email }}</h2>
			<h2 v-else>Вы не вошли</h2>
		</section>

		<aside>
			<h3>Task list</h3>
			<ul class="task-list">
				<li class="task task_complete">Создать пользователя</li>
				<li class="task task_complete">Войдите в систему с помощью адреса электронной почты и пароля</li>
				<li class="task task_complete">Получить текущего вошедшего в систему пользователя</li>
				<li class="task task_complete">Выход из системы</li>
				<li class="task">Получить профиль пользователя</li>
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