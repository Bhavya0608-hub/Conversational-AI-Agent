import { NextRequest, NextResponse } from 'next/server'
import { createRetellClient, CallResponse } from '@/lib/retell'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const range = searchParams.get('range') || '7d'

    // Calculate timestamp range
    const now = Date.now()
    let lowerThreshold: number

    switch (range) {
      case '30d':
        lowerThreshold = now - 30 * 24 * 60 * 60 * 1000
        break
      case '90d':
        lowerThreshold = now - 90 * 24 * 60 * 60 * 1000
        break
      default: // 7d
        lowerThreshold = now - 7 * 24 * 60 * 60 * 1000
    }

    const client = createRetellClient()

    const calls = await client.listCalls({
      filter_criteria: {
        call_type: ['phone_call'],
        start_timestamp: {
          lower_threshold: lowerThreshold,
          upper_threshold: now,
        },
      },
      sort_order: 'descending',
      limit: 1000,
    })

    // Calculate analytics
    const totalCalls = calls.length
    const successfulCalls = calls.filter((c: CallResponse) => c.call_successful).length
    
    // Calculate average duration
    const callsWithDuration = calls.filter((c: CallResponse) => c.duration_ms)
    const avgDuration = callsWithDuration.length > 0
      ? callsWithDuration.reduce((acc: number, c: CallResponse) => acc + (c.duration_ms || 0), 0) / 
        callsWithDuration.length / 1000
      : 0

    // Sentiment breakdown
    const sentimentCounts: Record<string, number> = {
      Positive: 0,
      Negative: 0,
      Neutral: 0,
      Unknown: 0,
    }
    calls.forEach((call: CallResponse) => {
      const sentiment = call.user_sentiment || 'Unknown'
      sentimentCounts[sentiment] = (sentimentCounts[sentiment] || 0) + 1
    })
    const sentimentBreakdown = Object.entries(sentimentCounts)
      .filter(([, value]) => value > 0)
      .map(([name, value]) => ({ name, value }))

    // Status breakdown
    const statusCounts: Record<string, number> = {}
    calls.forEach((call: CallResponse) => {
      const status = call.call_status
      statusCounts[status] = (statusCounts[status] || 0) + 1
    })
    const statusBreakdown = Object.entries(statusCounts).map(([name, value]) => ({
      name,
      value,
    }))

    // Calls by day
    const callsByDayMap: Record<string, number> = {}
    calls.forEach((call: CallResponse) => {
      if (call.start_timestamp) {
        const date = new Date(call.start_timestamp).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        })
        callsByDayMap[date] = (callsByDayMap[date] || 0) + 1
      }
    })
    const callsByDay = Object.entries(callsByDayMap)
      .map(([date, calls]) => ({ date, calls }))
      .reverse()

    return NextResponse.json({
      totalCalls,
      successfulCalls,
      avgDuration,
      sentimentBreakdown,
      statusBreakdown,
      callsByDay,
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
