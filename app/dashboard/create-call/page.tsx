'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Phone, Loader2 } from 'lucide-react'
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

export default function CreateCallPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    phone_number: '',
    first_name: '',
    last_name: '',
    city: '',
    state: '',
    monthly_bill: '',
    property_type: '',
    roof_size: '',
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePhoneChange = (value: string) => {
    // Allow only + at start and digits
    let cleaned = value.replace(/[^\d+]/g, '')
    // Ensure + is only at the start
    if (cleaned.includes('+')) {
      cleaned = '+' + cleaned.replace(/\+/g, '')
    }
    handleChange('phone_number', cleaned)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/calls/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create call')
      }

      toast.success('Call initiated successfully', {
        description: `Call ID: ${data.call_id}`,
      })

      // Reset form
      setFormData({
        phone_number: '',
        first_name: '',
        last_name: '',
        city: '',
        state: '',
        monthly_bill: '',
        property_type: '',
        roof_size: '',
      })
    } catch (error) {
      toast.error('Failed to create call', {
        description: error instanceof Error ? error.message : 'An error occurred',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Create Call</h2>
        <p className="text-muted-foreground">
          Initiate a new outbound call to a solar lead
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            New Call Details
          </CardTitle>
          <CardDescription>
            Enter the lead information to start an AI-powered call
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="phone_number">Phone Number *</Label>
                <Input
                  id="phone_number"
                  placeholder="+919548165780"
                  value={formData.phone_number}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  required
                  className="mt-1.5"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Enter in international format with country code (e.g., +919548165780)
                </p>
              </div>

              <div>
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  placeholder="John"
                  value={formData.first_name}
                  onChange={(e) => handleChange('first_name', e.target.value)}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  placeholder="Smith"
                  value={formData.last_name}
                  onChange={(e) => handleChange('last_name', e.target.value)}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="Los Angeles"
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="state">State</Label>
                <Select
                  value={formData.state}
                  onValueChange={(value) => handleChange('state', value)}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select state" />
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
                <Label htmlFor="monthly_bill">Monthly Electric Bill ($)</Label>
                <Input
                  id="monthly_bill"
                  type="number"
                  placeholder="250"
                  value={formData.monthly_bill}
                  onChange={(e) => handleChange('monthly_bill', e.target.value)}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="property_type">Property Type</Label>
                <Select
                  value={formData.property_type}
                  onValueChange={(value) => handleChange('property_type', value)}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select type" />
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

              <div className="sm:col-span-2">
                <Label htmlFor="roof_size">Estimated Roof Size (sq ft)</Label>
                <Input
                  id="roof_size"
                  type="number"
                  placeholder="2000"
                  value={formData.roof_size}
                  onChange={(e) => handleChange('roof_size', e.target.value)}
                  className="mt-1.5"
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Initiating Call...
                </>
              ) : (
                <>
                  <Phone className="mr-2 h-4 w-4" />
                  Start Call
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
