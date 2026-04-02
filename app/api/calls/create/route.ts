import { NextRequest, NextResponse } from 'next/server'
import { createRetellClient } from '@/lib/retell'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      phone_number,
      first_name,
      last_name,
      city,
      state,
      monthly_bill,
      property_type,
      roof_size,
    } = body

    // Validate phone number is in E.164 format (starts with +)
    const formattedPhone = phone_number.startsWith('+') 
      ? phone_number 
      : `+${phone_number}`

    const fromNumber = process.env.RETELL_FROM_NUMBER
    const agentId = process.env.RETELL_AGENT_ID

    if (!fromNumber) {
      return NextResponse.json(
        { error: 'RETELL_FROM_NUMBER environment variable is not set' },
        { status: 500 }
      )
    }

    const client = createRetellClient()

    const callResponse = await client.createPhoneCall({
      from_number: fromNumber,
      to_number: formattedPhone,
      override_agent_id: agentId,
      retell_llm_dynamic_variables: {
        phone_number: formattedPhone,
        first_name: first_name || '',
        last_name: last_name || '',
        city: city || '',
        state: state || '',
        monthly_bill: monthly_bill ? String(monthly_bill) : '',
        property_type: property_type || '',
        roof_size: roof_size ? String(roof_size) : '',
      },
      metadata: {
        source: 'dashboard',
        created_at: new Date().toISOString(),
      },
    })

    return NextResponse.json(callResponse, { status: 201 })
  } catch (error) {
    console.error('Error creating call:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create call' },
      { status: 500 }
    )
  }
}
