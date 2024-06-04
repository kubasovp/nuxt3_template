<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { useUserStore } from '~/stores/user.store'

const { signUser } = useFirebaseAuth()
const userStore = useUserStore()

const formRef = ref<FormInstance>()
const formData = reactive<{
	password: string
	email: string
}>({
	password: '',
	email: '',
})

async function handleSignIn() {
	const userData = await signUser(formData.email, formData.password)

	userStore.setUser({
		uid: userData.user.uid,
		displayName: userData.user.displayName || '',
		email: userData.user.email || '',
		photoURL: userData.user.photoURL || '',
		emailVerified: userData.user.emailVerified,
	})
}
</script>

<template>
	<el-form
		ref="formRef"
		style="max-width: 600px"
		:model="formData"
		label-width="auto"
		class="form authorization_form demo-dynamic"
	>
		<fieldset>
			<legend>Войти</legend>

			<el-form-item
				prop="email"
				label="Email"
				:rules="[
					{
						required: true,
						message: 'Please input email address',
						trigger: 'blur',
					},
					{
						type: 'email',
						message: 'Please input correct email address',
						trigger: ['blur', 'change'],
					},
				]"
			>
				<el-input v-model="formData.email" />
			</el-form-item>

			<el-form-item label="Password" prop="pass">
				<el-input v-model="formData.password" type="password" autocomplete="off" />
			</el-form-item>

			<el-button type="primary" plain @click.prevent="handleSignIn">
				Войти
			</el-button>
		</fieldset>
	</el-form>
</template>

<style scoped lang="stylus">

</style>
<!-- два компонента или один с полями ввода? -->
<!-- обновить зависимости -->
