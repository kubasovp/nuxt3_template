<script setup lang="ts">
import { useUserStore } from '~/stores/user.store';

const userState = useUserStore();
const { userSignOut } = useFirebaseAuth();

async function logOut() {
	await userSignOut();
	userState.clearUser();
}
</script>

<template>
	<Button type="primary" plain @click="logOut">
		Выйти
	</Button>
</template>

<style scoped lang="stylus">

</style>
