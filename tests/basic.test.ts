import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { $fetch, isDev, setup } from '@nuxt/test-utils'

describe('example', async () => {
	await setup({
		rootDir: fileURLToPath(new URL('..', import.meta.url)),
		server: true,
	})

	it('форма регистрации', async () => {
		expect(await $fetch('/')).toMatch('Зарегистрироваться')
	})

	it('форма входа', async () => {
		expect(await $fetch('/')).toMatch('Войти')
	})

	if (isDev()) {
		it('[dev] ensure vite client script is added', async () => {
			expect(await $fetch('/')).toMatch('/_nuxt/@vite/client"')
		})
	}
})
