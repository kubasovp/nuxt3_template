<script setup>
const props = defineProps({
	modelValue: String,
	label: {
		type: String,
		default: 'Password',
	},
});
defineEmits(['update:modelValue']);
const inputValue = ref(props.modelValue);
</script>

<template>
	<el-form-item :label="label">
		<el-input v-model="inputValue" type="password" autocomplete="off" @input="$emit('update:modelValue', inputValue)" />
	</el-form-item>
</template>

<style scoped lang="stylus">
</style>
