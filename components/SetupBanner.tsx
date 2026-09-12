import { getMissingSetup } from '@/lib/env';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function SetupBanner() {
    const missing = getMissingSetup();
    if (missing.length === 0) return null;

    return (
        <div className="border-b bg-muted/40">
            <div className="max-w-5xl mx-auto px-4 py-3">
                <Alert>
                    <AlertTitle>This deploy is running in setup mode</AlertTitle>
                    <AlertDescription>
                        <p className="mb-2">
                            The site built without extra Vercel env vars. Add these in Project Settings → Environment Variables, then redeploy, to enable sign-in and the database.
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                            {missing.map((item) => (
                                <li key={item.name}>
                                    <code className="font-mono text-xs bg-muted px-1 rounded">{item.name}</code>
                                    {' '}— {item.why}
                                </li>
                            ))}
                        </ul>
                    </AlertDescription>
                </Alert>
            </div>
        </div>
    );
}
