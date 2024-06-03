<script setup lang="ts">

</script>

<template>
	<main class="grid">
		<section class="content">
			<h1>Nuxt 3, Firebase, Pinia</h1>

			<TheRegistration />

			<TheAuthorization />

			<TheUserProfile />

			<TheLogout />
		</section>

		<aside>
			<h3>Task list</h3>
			<ul class="task-list">
				<li class="task task_complete">
					Создать пользователя
				</li>
				<li class="task task_complete">
					Войдите в систему с помощью адреса электронной почты и пароля
				</li>
				<li class="task task_complete">
					Выход из системы
				</li>
				<li class="task task_complete">
					Получить профиль пользователя
				</li>
				<li class="task">
					Обновить профиль пользователя
				</li>
				<li class="task task_complete">
					Отправить пользователю электронное письмо с подтверждением
				</li>
				<li class="task">
					Установить пароль пользователя
				</li>
				<li class="task">
					Отправить электронное письмо для сброса пароля
				</li>
				<li class="task">
					Удаление пользователя
				</li>
			</ul>
		</aside>
	</main>
</template>

<style lang="stylus">
input
	border 1px solid coral

.grid
	display grid
	grid-template-columns 2fr 1fr
	gap 32px

.form fieldset
	display grid
	grid-template-columns: 2fr 2fr 1fr;
	gap 16px

.form_profile fieldset
	grid-template-columns 1fr

.task-list
	padding: 0
	list-style-type: none;

.task
	padding-left: 24px
	text-indent: -24px;

	&::before
		color tomato
		content "☓"
		padding-right 10px

.task_complete
	&::before
		color green
		content "✓"
</style>
