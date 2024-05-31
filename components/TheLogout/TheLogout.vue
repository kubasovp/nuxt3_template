<script setup lang="ts">
import { useUserStore } from '~/stores/user.store'

const userState = useUserStore()
const { userSignOut } = useFirebaseAuth()

async function logOut() {
	const userAcc: boolean | object = await userSignOut()
	userState.clearUser()

	// isLogin.value = false
}
</script>

<template>
	<button @click.prevent="logOut">
		Выйти
	</button>
</template>

<style scoped lang="stylus">

</style>
