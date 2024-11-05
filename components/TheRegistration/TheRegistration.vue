<script setup lang="ts">
import { getAuth, sendEmailVerification } from 'firebase/auth';
import type { FormInstance } from 'element-plus';

const { registerUser } = useFirebaseAuth();
const formRef = ref<FormInstance>();
const formData = reactive<{ password: string; email: string }>({
	password: '',
	email: '',
});
const errorMessage = ref<string | null>(null);

async function handleRegistration() {
	errorMessage.value = null;
	const isRegistered = await registerUser(formData.email, formData.password);

	if (isRegistered) {
		const auth = getAuth();
		if (auth.currentUser) {
			sendEmailVerification(auth.currentUser)
				.then(() => {
					console.log('Email verification sent!');
				})
				.catch((error) => {
					console.log('Ошибка отправки подтверждения email:', error);
					errorMessage.value = 'Не удалось отправить подтверждение на email';
				});
		}
	}
	else {
		errorMessage.value = 'Регистрация не удалась. Попробуйте еще раз.';
	}
}
</script>

<template>
	<el-form ref="formRef" :model="formData" label-width="auto" class="form authorization_form demo-dynamic">
		<fieldset>
			<legend>Регистрация</legend>
			<EmailInput v-model="formData.email" label="Email" />
			<PasswordInput v-model="formData.password" label="Password" />
			<Button type="primary" plain @click="handleRegistration">
				Зарегистрироваться
			</Button>
			<p v-if="errorMessage" class="error">
				{{ errorMessage }}
			</p>
		</fieldset>
	</el-form>
</template>

<style scoped>

</style>
