import { NextRequest, NextResponse } from 'next/server'
import { createRetellClient, BatchCallTask } from '@/lib/retell'

interface Lead {
  phone_number: string
  first_name?: string
  last_name?: string
  city?: string
  state?: string
  monthly_bill?: string
  property_type?: string
  roof_size?: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, leads } = body as { name: string; leads: Lead[] }

    const fromNumber = process.env.RETELL_FROM_NUMBER
    const agentId = process.env.RETELL_AGENT_ID

    if (!fromNumber) {
      return NextResponse.json(
        { error: 'RETELL_FROM_NUMBER environment variable is not set' },
        { status: 500 }
      )
    }

    const client = createRetellClient()

    // Format leads into batch call tasks
    const tasks: BatchCallTask[] = leads.map((lead) => {
      // Validate phone number is in E.164 format (starts with +)
      const formattedPhone = lead.phone_number.startsWith('+') 
        ? lead.phone_number 
        : `+${lead.phone_number}`

      return {
        to_number: formattedPhone,
        retell_llm_dynamic_variables: {
          phone_number: formattedPhone,
          first_name: lead.first_name || '',
          last_name: lead.last_name || '',
          city: lead.city || '',
          state: lead.state || '',
          monthly_bill: lead.monthly_bill || '',
          property_type: lead.property_type || '',
          roof_size: lead.roof_size || '',
        },
        metadata: {
          source: 'batch_campaign',
          campaign_name: name,
          created_at: new Date().toISOString(),
        },
        override_agent_id: agentId,
      }
    })

    const batchResponse = await client.createBatchCall({
      name: name || `Solar Campaign - ${new Date().toLocaleDateString()}`,
      from_number: fromNumber,
      tasks,
    })

    return NextResponse.json(batchResponse, { status: 201 })
  } catch (error) {
    console.error('Error creating batch call:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create batch call' },
      { status: 500 }
    )
  }
}
