<script setup lang="ts">
import type { FormInstance } from 'element-plus';
import { useUserStore } from '~/stores/user.store';

const { signUser } = useFirebaseAuth();
const userStore = useUserStore();

const formRef = ref<FormInstance>();
const formData = reactive<{
	password: string;
	email: string;
}>({
	password: '',
	email: '',
});

async function handleSignIn() {
	const userData = await signUser(formData.email, formData.password);

	userStore.setUser({
		uid: userData.user.uid,
		displayName: userData.user.displayName || '',
		email: userData.user.email || '',
		photoURL: userData.user.photoURL || '',
		emailVerified: userData.user.emailVerified,
	});
}
</script>

<template>
	<el-form
		ref="formRef"
		:model="formData"
		label-width="auto"
		class="form authorization_form demo-dynamic"
	>
		<fieldset>
			<legend>Вход</legend>

			<EmailInput v-model="formData.email" label="Email" />

			<PasswordInput v-model="formData.password" label="Password" />

			<Button type="primary" plain @send="handleSignIn">
				Войти
			</Button>
		</fieldset>
	</el-form>
</template>

<style scoped lang="stylus">

</style>
<!-- обновить зависимости -->
