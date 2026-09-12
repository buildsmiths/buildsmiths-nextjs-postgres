import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { db, isDatabaseConfigured } from '@/lib/db';
import { auditEvents } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from "@/components/ui/badge"

interface AuditEvent {
    id: string;
    ts: Date;
    actor: string | null;
    type: string;
    payload: any;
}

export async function RecentActivity() {
    let events: AuditEvent[] = [];
    let loadError = false;

    try {
        if (!isDatabaseConfigured()) {
            throw new Error('database not configured');
        }
        const result = await db.select().from(auditEvents).orderBy(desc(auditEvents.ts)).limit(5);
        events = result.map(evt => ({
            ...evt,
            ts: new Date(evt.ts)
        }));
    } catch (e) {
        console.error("Failed to fetch audit events", e);
        loadError = true;
    }

    if (events.length === 0) {
        return (
            <Card className="col-span-1 md:col-span-2">
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Rows from the <code className="font-mono text-xs">audit_events</code> table.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
                        <p className="text-sm">
                            {loadError
                                ? 'Could not load audit events. Check DATABASE_URL.'
                                : 'No events yet. Sign in or register to write an auth.signin / auth.register row.'}
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="col-span-1 md:col-span-2">
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                    Latest rows from <code className="font-mono text-xs">audit_events</code>.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[150px]">Time</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Actor</TableHead>
                            <TableHead className="text-right">Details</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {events.map((evt) => (
                            <TableRow key={evt.id}>
                                <TableCell className="text-xs text-muted-foreground font-mono">
                                    {new Date(evt.ts).toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="font-normal text-xs">{evt.type}</Badge>
                                </TableCell>
                                <TableCell className="text-sm">
                                    {evt.actor || <span className="text-muted-foreground italic">system</span>}
                                </TableCell>
                                <TableCell className="text-right text-xs text-muted-foreground max-w-[200px] truncate font-mono">
                                    {JSON.stringify(evt.payload)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
