<script setup lang="ts">
import {getAuth, onAuthStateChanged} from "firebase/auth";

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