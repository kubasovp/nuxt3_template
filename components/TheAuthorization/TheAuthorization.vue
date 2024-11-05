<script setup lang="ts">
import type { FormInstance } from 'element-plus';
import { useUserStore } from '~/stores/user.store';

const { signUser } = useFirebaseAuth();
const userStore = useUserStore();

const formRef = ref<FormInstance>();
const formData = reactive<{ password: string; email: string }>({
	password: '',
	email: '',
});
const errorMessage = ref<string | null>(null);

async function handleSignIn() {
	errorMessage.value = null; // Сброс ошибок перед новой попыткой
	const result = await signUser(formData.email, formData.password);

	if (result.success) {
		userStore.setUser({
			isLogin: true,
			uid: result.data.user.uid,
			displayName: result.data.user.displayName || '',
			email: result.data.user.email || '',
			photoURL: result.data.user.photoURL || '',
			emailVerified: result.data.user.emailVerified,
		});
		formData.password = ''; // Очистка поля пароля после успешного входа
	}
	else {
		errorMessage.value = result.message || 'Ошибка входа. Проверьте данные.';
	}
}
</script>

<template>
	<el-form ref="formRef" :model="formData" label-width="auto" class="form authorization_form demo-dynamic">
		<fieldset>
			<legend>Вход</legend>

			<EmailInput v-model="formData.email" label="Email" />
			<PasswordInput v-model="formData.password" label="Password" />

			<Button type="primary" plain @click="handleSignIn">
				Войти
			</Button>

			<p v-if="errorMessage" class="error">
				{{ errorMessage }}
			</p>
		</fieldset>
	</el-form>
</template>

<style scoped>
/* Добавьте стили для вывода ошибок */
.error {
	color: red;
	font-size: 14px;
}
</style>
