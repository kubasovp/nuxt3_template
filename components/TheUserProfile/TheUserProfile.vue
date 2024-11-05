<script setup lang="ts">
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useUserStore } from '~/stores/user.store';

const userStore = useUserStore();
const currentUser = computed(() => userStore.currentUser);

onMounted(() => {
	const auth = getAuth();
	onAuthStateChanged(auth, (user) => {
		if (user) {
			userStore.setUser({
				isLogin: true,
				uid: user.uid,
				displayName: user.displayName || '',
				email: user.email || '',
				photoURL: user.photoURL || '',
				emailVerified: user.emailVerified,
			});
		}
		else {
			console.log('User is signed out');
		}
	});
});
</script>

<template>
	<form class="form form_profile">
		<h2 v-if="currentUser">
			Вы вошли как {{ currentUser.email }}
		</h2>
		<h2 v-else>
			Вы не вошли
		</h2>

		<fieldset>
			<legend>Профиль пользователя</legend>

			<div v-if="currentUser" class="user-info">
				<ul>
					<li>displayName: <strong>{{ currentUser.displayName }}</strong></li>
					<li>email: <strong>{{ currentUser.email }}</strong></li>
					<li>photoURL: <strong>{{ currentUser.photoURL }}</strong></li>
					<li>emailVerified: <strong>{{ currentUser.emailVerified }}</strong></li>
					<li>uid: <strong>{{ currentUser.uid }}</strong></li>
				</ul>

				<TheLogout />
			</div>

			<p v-else>
				* Данные появятся после регистрации/авторизации
			</p>
		</fieldset>
	</form>
</template>

<style scoped>

</style>
