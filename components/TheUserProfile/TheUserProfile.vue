<script setup lang="ts">
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useUserStore} from "~/stores/user.store";

const userData: object = {
	isLogin: true,
	displayName: '',
	email: '',
	photoURL: '',
	emailVerified: '',
	uid: ''
};

const currentUser = useUserStore();

onMounted(() => {
	const auth = getAuth();
	onAuthStateChanged(auth, (user) => {
		if (user) {
			userData.displayName = user.displayName;
			userData.email = user.email;
			userData.photoURL = user.photoURL;
			userData.emailVerified = user.emailVerified;
			userData.uid = user.uid;
			currentUser.setUser(userData);

		} else {
			console.log('User is signed out');
		}
	});
});
</script>

<template>
	<form class="form form_profile">
		<h2 v-if="currentUser.isLogin">Вы вошли как {{ currentUser.email }}</h2>
		<h2 v-else>Вы не вошли</h2>
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
</template>

<style scoped lang="stylus">

</style>