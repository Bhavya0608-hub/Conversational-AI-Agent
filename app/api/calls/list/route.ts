import { NextResponse } from 'next/server'
import { createRetellClient } from '@/lib/retell'

export async function GET() {
  try {
    const client = createRetellClient()

    const calls = await client.listCalls({
      filter_criteria: {
        call_type: ['phone_call'],
      },
      sort_order: 'descending',
      limit: 100,
    })

    return NextResponse.json(calls)
  } catch (error) {
    console.error('Error listing calls:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to list calls' },
      { status: 500 }
    )
  }
}
