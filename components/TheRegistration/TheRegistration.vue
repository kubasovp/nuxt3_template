<script setup lang="ts">
import { getAuth, sendEmailVerification } from 'firebase/auth';
import type { FormInstance } from 'element-plus';

const { registerUser } = useFirebaseAuth();
const formRef = ref<FormInstance>();
const formData = reactive<{
	password: string;
	email: string;
}>({
	password: '',
	email: '',
});

async function handleRegistration() {
	await registerUser(formData.email, formData.password);

	// Отправляем письмо для подтверждения email
	const auth = getAuth();
	if (auth.currentUser) {
		sendEmailVerification(auth.currentUser)
			.then(() => {
				console.log('Email verification sent!');
			});
	}
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
			<legend>Регистрация</legend>

			<EmailInput v-model="formData.email" label="Email" />

			<PasswordInput v-model="formData.password" label="Password" />

			<Button type="primary" plain @send="handleRegistration">
				Зарегистрироваться
			</Button>
		</fieldset>
	</el-form>
</template>

<style scoped lang="stylus">

</style>
