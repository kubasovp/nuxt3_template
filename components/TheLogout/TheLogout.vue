<script setup lang="ts">
const { userSignOut } = useFirebaseAuth()

async function logOut() {
	userAcc = await userSignOut()
	isLogin.value = false
}
</script>

<template>
	<button @click.prevent="logOut">
		Выйти
	</button>
</template>

<style scoped lang="stylus">

</style>
