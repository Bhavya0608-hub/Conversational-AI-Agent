'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Users, Loader2, Plus, Trash2, Upload } from 'lucide-react'
import { toast } from 'sonner'

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming'
]

const PROPERTY_TYPES = ['Single Family', 'Townhouse', 'Condo', 'Multi-Family', 'Commercial']

interface Lead {
  id: string
  phone_number: string
  first_name: string
  last_name: string
  city: string
  state: string
  monthly_bill: string
  property_type: string
  roof_size: string
}

const createEmptyLead = (): Lead => ({
  id: crypto.randomUUID(),
  phone_number: '',
  first_name: '',
  last_name: '',
  city: '',
  state: '',
  monthly_bill: '',
  property_type: '',
  roof_size: '',
})

export default function BatchCallsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [campaignName, setCampaignName] = useState('')
  const [leads, setLeads] = useState<Lead[]>([createEmptyLead()])
  const [inputMode, setInputMode] = useState<'form' | 'csv'>('form')
  const [csvData, setCsvData] = useState('')

  const addLead = () => {
    setLeads((prev) => [...prev, createEmptyLead()])
  }

  const removeLead = (id: string) => {
    if (leads.length > 1) {
      setLeads((prev) => prev.filter((lead) => lead.id !== id))
    }
  }

  const updateLead = (id: string, field: keyof Lead, value: string) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === id ? { ...lead, [field]: value } : lead
      )
    )
  }

  const formatPhoneNumber = (value: string) => {
    // Allow only + at start and digits for international format
    let cleaned = value.replace(/[^\d+]/g, '')
    // Ensure + is only at the start
    if (cleaned.includes('+')) {
      cleaned = '+' + cleaned.replace(/\+/g, '')
    }
    return cleaned
  }

  const parseCSV = () => {
    try {
      const lines = csvData.trim().split('\n')
      if (lines.length < 2) {
        toast.error('Invalid CSV', { description: 'CSV must have a header row and at least one data row' })
        return
      }

      const headers = lines[0].toLowerCase().split(',').map(h => h.trim())
      const requiredFields = ['phone_number', 'first_name', 'last_name', 'city', 'state', 'monthly_bill', 'property_type']
      
      const parsedLeads: Lead[] = []
      
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim())
        const lead = createEmptyLead()
        
        headers.forEach((header, index) => {
          if (header in lead && values[index]) {
            (lead as Record<string, string>)[header] = values[index]
          }
        })
        
        parsedLeads.push(lead)
      }

      if (parsedLeads.length > 0) {
        setLeads(parsedLeads)
        toast.success('CSV parsed successfully', { description: `${parsedLeads.length} leads imported` })
        setInputMode('form')
      }
    } catch {
      toast.error('Failed to parse CSV', { description: 'Please check your CSV format' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/calls/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: campaignName,
          leads: leads.map(({ id, ...lead }) => lead),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create batch call')
      }

      toast.success('Batch call campaign created', {
        description: `Batch ID: ${data.batch_call_id} - ${data.total_task_count} calls scheduled`,
      })

      // Reset form
      setCampaignName('')
      setLeads([createEmptyLead()])
    } catch (error) {
      toast.error('Failed to create batch call', {
        description: error instanceof Error ? error.message : 'An error occurred',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Batch Calls</h2>
        <p className="text-muted-foreground">
          Create a batch campaign to call multiple solar leads
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            New Batch Campaign
          </CardTitle>
          <CardDescription>
            Add multiple leads to start a batch calling campaign
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="campaign_name">Campaign Name *</Label>
              <Input
                id="campaign_name"
                placeholder="Solar Campaign - March 2024"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                required
                className="mt-1.5 max-w-md"
              />
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant={inputMode === 'form' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setInputMode('form')}
              >
                Manual Entry
              </Button>
              <Button
                type="button"
                variant={inputMode === 'csv' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setInputMode('csv')}
              >
                <Upload className="mr-2 h-4 w-4" />
                Import CSV
              </Button>
            </div>

            {inputMode === 'csv' ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="csv_data">CSV Data</Label>
                  <Textarea
                    id="csv_data"
                    placeholder="phone_number,first_name,last_name,city,state,monthly_bill,property_type,roof_size
+919548165780,John,Smith,Los Angeles,California,250,Single Family,2000"
                    value={csvData}
                    onChange={(e) => setCsvData(e.target.value)}
                    className="mt-1.5 min-h-[200px] font-mono text-sm"
                  />
                  <p className="mt-2 text-xs text-muted-foreground">
                    Required column: phone_number (international format like +919548165780). All other columns are optional.
                  </p>
                </div>
                <Button type="button" onClick={parseCSV} variant="secondary">
                  Parse CSV
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {leads.map((lead, index) => (
                  <Card key={lead.id} className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium">Lead {index + 1}</span>
                      {leads.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeLead(lead.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <div>
                        <Label>Phone Number *</Label>
                        <Input
                          placeholder="+919548165780"
                          value={lead.phone_number}
                          onChange={(e) =>
                            updateLead(lead.id, 'phone_number', formatPhoneNumber(e.target.value))
                          }
                          required
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label>First Name</Label>
                        <Input
                          placeholder="John"
                          value={lead.first_name}
                          onChange={(e) => updateLead(lead.id, 'first_name', e.target.value)}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label>Last Name</Label>
                        <Input
                          placeholder="Smith"
                          value={lead.last_name}
                          onChange={(e) => updateLead(lead.id, 'last_name', e.target.value)}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label>City</Label>
                        <Input
                          placeholder="Los Angeles"
                          value={lead.city}
                          onChange={(e) => updateLead(lead.id, 'city', e.target.value)}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label>State</Label>
                        <Select
                          value={lead.state}
                          onValueChange={(value) => updateLead(lead.id, 'state', value)}
                        >
                          <SelectTrigger className="mt-1.5">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {US_STATES.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Monthly Bill ($)</Label>
                        <Input
                          type="number"
                          placeholder="250"
                          value={lead.monthly_bill}
                          onChange={(e) => updateLead(lead.id, 'monthly_bill', e.target.value)}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label>Property Type</Label>
                        <Select
                          value={lead.property_type}
                          onValueChange={(value) => updateLead(lead.id, 'property_type', value)}
                        >
                          <SelectTrigger className="mt-1.5">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {PROPERTY_TYPES.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Roof Size (sq ft)</Label>
                        <Input
                          type="number"
                          placeholder="2000"
                          value={lead.roof_size}
                          onChange={(e) => updateLead(lead.id, 'roof_size', e.target.value)}
                          className="mt-1.5"
                        />
                      </div>
                    </div>
                  </Card>
                ))}

                <Button type="button" variant="outline" onClick={addLead} className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Another Lead
                </Button>
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || inputMode === 'csv'}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Batch Campaign...
                </>
              ) : (
                <>
                  <Users className="mr-2 h-4 w-4" />
                  Start Batch Campaign ({leads.length} leads)
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
