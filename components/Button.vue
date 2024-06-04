<script setup lang="ts">
</script>

<template>
	<el-button v-bind="$attrs" @click.prevent="$emit('send')">
		<slot />
	</el-button>
</template>

<style scoped lang="stylus">
</style>
