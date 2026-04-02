const RETELL_API_BASE = 'https://api.retellai.com'

export interface CreatePhoneCallRequest {
  from_number: string
  to_number: string
  override_agent_id?: string
  retell_llm_dynamic_variables?: Record<string, string>
  metadata?: Record<string, unknown>
}

export interface BatchCallTask {
  to_number: string
  retell_llm_dynamic_variables?: Record<string, string>
  metadata?: Record<string, unknown>
}

export interface CreateBatchCallRequest {
  name?: string
  from_number: string
  tasks: BatchCallTask[]
  trigger_timestamp?: number
}

export interface ListCallsRequest {
  filter_criteria?: {
    call_status?: string[]
    call_type?: string[]
    direction?: string[]
    user_sentiment?: string[]
    start_timestamp?: {
      upper_threshold?: number
      lower_threshold?: number
    }
  }
  sort_order?: 'ascending' | 'descending'
  limit?: number
  pagination_key?: string
}

export interface CallResponse {
  call_id: string
  agent_id: string
  agent_name?: string
  call_type: 'web_call' | 'phone_call'
  call_status: 'registered' | 'not_connected' | 'ongoing' | 'ended' | 'error'
  from_number?: string
  to_number?: string
  direction?: 'inbound' | 'outbound'
  start_timestamp?: number
  end_timestamp?: number
  duration_ms?: number
  transcript?: string
  recording_url?: string
  user_sentiment?: 'Positive' | 'Negative' | 'Neutral' | 'Unknown'
  call_successful?: boolean
  disconnection_reason?: string
  retell_llm_dynamic_variables?: Record<string, string>
  metadata?: Record<string, unknown>
}

export interface BatchCallResponse {
  batch_call_id: string
  name: string
  from_number: string
  scheduled_timestamp: number
  total_task_count: number
}

class RetellClient {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${RETELL_API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || `Request failed with status ${response.status}`)
    }

    return response.json()
  }

  async createPhoneCall(data: CreatePhoneCallRequest): Promise<CallResponse> {
    return this.request<CallResponse>('/v2/create-phone-call', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async createBatchCall(data: CreateBatchCallRequest): Promise<BatchCallResponse> {
    return this.request<BatchCallResponse>('/create-batch-call', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async listCalls(data: ListCallsRequest = {}): Promise<CallResponse[]> {
    return this.request<CallResponse[]>('/v2/list-calls', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async getCall(callId: string): Promise<CallResponse> {
    return this.request<CallResponse>(`/v2/get-call/${callId}`, {
      method: 'GET',
    })
  }
}

export function createRetellClient(): RetellClient {
  const apiKey = process.env.RETELL_API_KEY
  if (!apiKey) {
    throw new Error('RETELL_API_KEY environment variable is not set')
  }
  return new RetellClient(apiKey)
}
