import { type Database, getDatabase } from 'wildebeest/backend/src/database'
import type { ContextData, Env } from 'wildebeest/backend/src/types'

export const onRequestGet: PagesFunction<Env, any, ContextData> = async ({ env }) => {
	return handleRequestGet(await getDatabase(env))
}

export async function handleRequestGet(db: Database) {
	const query = `SELECT * from server_rules;`
	const result = await db.prepare(query).all<{ id: string; text: string }>()

	if (!result.success) {
		return new Response('SQL error: ' + result.error, { status: 500 })
	}

	return new Response(JSON.stringify(result.results ?? []), { status: 200 })
}
