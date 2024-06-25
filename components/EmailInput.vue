<script setup lang="ts">
const props = defineProps({
	modelValue: String,
	label: {
		type: String,
		default: 'Email',
	},
	rules: {
		type: Array,
		default: () => [
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
		],
	},
});
const inputValue = ref(props.modelValue);

// Todo
// так ли нужен тут вотчер?
watch(() => props.modelValue, (newValue) => {
	inputValue.value = newValue;
});
</script>

<template>
	<el-form-item :label="label" :rules="rules">
		<el-input v-model="inputValue" type="email" @input="$emit('update:modelValue', inputValue)" />
	</el-form-item>
</template>

<style scoped lang="stylus">

</style>
