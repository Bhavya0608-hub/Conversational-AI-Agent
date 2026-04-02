'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { History, Search, Play, FileText, Loader2, RefreshCw } from 'lucide-react'

interface CallRecord {
  call_id: string
  agent_name?: string
  call_type: string
  call_status: string
  from_number?: string
  to_number?: string
  direction?: string
  start_timestamp?: number
  end_timestamp?: number
  duration_ms?: number
  transcript?: string
  recording_url?: string
  user_sentiment?: string
  call_successful?: boolean
  disconnection_reason?: string
  retell_llm_dynamic_variables?: Record<string, string>
}

export default function CallHistoryPage() {
  const [calls, setCalls] = useState<CallRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCall, setSelectedCall] = useState<CallRecord | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const fetchCalls = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/calls/list')
      const data = await response.json()
      if (response.ok) {
        setCalls(data)
      }
    } catch (error) {
      console.error('Failed to fetch calls:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCalls()
  }, [])

  const formatDuration = (ms?: number) => {
    if (!ms) return '--'
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const formatDate = (timestamp?: number) => {
    if (!timestamp) return '--'
    return new Date(timestamp).toLocaleString()
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      ended: 'default',
      ongoing: 'secondary',
      error: 'destructive',
      not_connected: 'outline',
    }
    return <Badge variant={variants[status] || 'outline'}>{status}</Badge>
  }

  const getSentimentBadge = (sentiment?: string) => {
    if (!sentiment) return null
    const colors: Record<string, string> = {
      Positive: 'bg-green-100 text-green-800',
      Negative: 'bg-red-100 text-red-800',
      Neutral: 'bg-gray-100 text-gray-800',
      Unknown: 'bg-yellow-100 text-yellow-800',
    }
    return (
      <Badge className={colors[sentiment] || 'bg-gray-100 text-gray-800'} variant="outline">
        {sentiment}
      </Badge>
    )
  }

  const filteredCalls = calls.filter((call) => {
    const searchLower = searchQuery.toLowerCase()
    return (
      call.call_id.toLowerCase().includes(searchLower) ||
      call.to_number?.includes(searchQuery) ||
      call.from_number?.includes(searchQuery) ||
      call.retell_llm_dynamic_variables?.first_name?.toLowerCase().includes(searchLower) ||
      call.retell_llm_dynamic_variables?.last_name?.toLowerCase().includes(searchLower)
    )
  })

  const viewCallDetails = (call: CallRecord) => {
    setSelectedCall(call)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Call History</h2>
          <p className="text-muted-foreground">
            View recordings and transcriptions of all calls
          </p>
        </div>
        <Button onClick={fetchCalls} variant="outline" disabled={isLoading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Recent Calls
          </CardTitle>
          <CardDescription>
            Browse and search through your call history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by phone number, name, or call ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredCalls.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <History className="h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-muted-foreground">
                {searchQuery ? 'No calls match your search' : 'No calls found'}
              </p>
              <p className="text-sm text-muted-foreground">
                Make sure your RETELL_API_KEY is configured
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contact</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sentiment</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCalls.map((call) => (
                    <TableRow key={call.call_id}>
                      <TableCell className="font-medium">
                        {call.retell_llm_dynamic_variables?.first_name || '--'}{' '}
                        {call.retell_llm_dynamic_variables?.last_name || ''}
                      </TableCell>
                      <TableCell>{call.to_number || call.from_number || '--'}</TableCell>
                      <TableCell>{getStatusBadge(call.call_status)}</TableCell>
                      <TableCell>{getSentimentBadge(call.user_sentiment)}</TableCell>
                      <TableCell>{formatDuration(call.duration_ms)}</TableCell>
                      <TableCell>{formatDate(call.start_timestamp)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => viewCallDetails(call)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Call Details</DialogTitle>
            <DialogDescription>
              Call ID: {selectedCall?.call_id}
            </DialogDescription>
          </DialogHeader>

          {selectedCall && (
            <Tabs defaultValue="details" className="mt-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="transcript">Transcript</TabsTrigger>
                <TabsTrigger value="recording">Recording</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Contact</p>
                    <p>
                      {selectedCall.retell_llm_dynamic_variables?.first_name || '--'}{' '}
                      {selectedCall.retell_llm_dynamic_variables?.last_name || ''}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                    <p>{selectedCall.to_number || selectedCall.from_number || '--'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                    <p>{getStatusBadge(selectedCall.call_status)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Sentiment</p>
                    <p>{getSentimentBadge(selectedCall.user_sentiment) || '--'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Duration</p>
                    <p>{formatDuration(selectedCall.duration_ms)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Direction</p>
                    <p className="capitalize">{selectedCall.direction || '--'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Start Time</p>
                    <p>{formatDate(selectedCall.start_timestamp)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">End Time</p>
                    <p>{formatDate(selectedCall.end_timestamp)}</p>
                  </div>
                  {selectedCall.disconnection_reason && (
                    <div className="sm:col-span-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        Disconnection Reason
                      </p>
                      <p>{selectedCall.disconnection_reason}</p>
                    </div>
                  )}
                </div>

                {selectedCall.retell_llm_dynamic_variables && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      Lead Information
                    </p>
                    <div className="rounded-md border p-3 text-sm">
                      {Object.entries(selectedCall.retell_llm_dynamic_variables).map(
                        ([key, value]) => (
                          <div key={key} className="flex justify-between py-1">
                            <span className="text-muted-foreground capitalize">
                              {key.replace(/_/g, ' ')}
                            </span>
                            <span>{value}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="transcript">
                <ScrollArea className="h-[400px] rounded-md border p-4">
                  {selectedCall.transcript ? (
                    <pre className="whitespace-pre-wrap text-sm">
                      {selectedCall.transcript}
                    </pre>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <FileText className="h-12 w-12 text-muted-foreground/50" />
                      <p className="mt-4 text-muted-foreground">No transcript available</p>
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="recording">
                {selectedCall.recording_url ? (
                  <div className="space-y-4">
                    <audio controls className="w-full">
                      <source src={selectedCall.recording_url} type="audio/wav" />
                      Your browser does not support the audio element.
                    </audio>
                    <Button variant="outline" asChild className="w-full">
                      <a
                        href={selectedCall.recording_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Open Recording in New Tab
                      </a>
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Play className="h-12 w-12 text-muted-foreground/50" />
                    <p className="mt-4 text-muted-foreground">No recording available</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
