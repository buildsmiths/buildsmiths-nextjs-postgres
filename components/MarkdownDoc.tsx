import { cn } from '@/lib/utils';

type Block =
    | { type: 'heading'; level: 1 | 2 | 3; text: string }
    | { type: 'paragraph'; text: string }
    | { type: 'list'; items: string[] }
    | { type: 'code'; lang: string; code: string };

function inline(text: string) {
    const parts: Array<string | { href: string; label: string } | { code: string }> = [];
    const pattern = /(`[^`]+`)|(\[[^\]]+\]\([^)]+\))/g;
    let last = 0;
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(text))) {
        if (match.index > last) parts.push(text.slice(last, match.index));
        const token = match[0];
        if (token.startsWith('`')) {
            parts.push({ code: token.slice(1, -1) });
        } else {
            const label = token.slice(1, token.indexOf(']'));
            const href = token.slice(token.indexOf('(') + 1, -1);
            parts.push({ href, label });
        }
        last = match.index + token.length;
    }
    if (last < text.length) parts.push(text.slice(last));

    return parts.map((part, i) => {
        if (typeof part === 'string') return <span key={i}>{part}</span>;
        if ('code' in part) {
            return (
                <code key={i} className="font-mono text-[0.9em] bg-muted px-1 rounded">
                    {part.code}
                </code>
            );
        }
        const external = part.href.startsWith('http');
        return (
            <a
                key={i}
                href={part.href}
                className="underline underline-offset-2 hover:text-foreground"
                {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
                {part.label}
            </a>
        );
    });
}

function parseBlocks(source: string): Block[] {
    const blocks: Block[] = [];
    const lines = source.replace(/\r\n/g, '\n').split('\n');
    let i = 0;
    while (i < lines.length) {
        const line = lines[i] ?? '';
        if (line.startsWith('```')) {
            const lang = line.slice(3).trim();
            const body: string[] = [];
            i += 1;
            while (i < lines.length && !lines[i]?.startsWith('```')) {
                body.push(lines[i] ?? '');
                i += 1;
            }
            blocks.push({ type: 'code', lang, code: body.join('\n') });
            i += 1;
            continue;
        }
        if (/^#{1,3} /.test(line)) {
            const level = line.startsWith('### ') ? 3 : line.startsWith('## ') ? 2 : 1;
            const text = line.replace(/^#{1,3} /, '');
            blocks.push({ type: 'heading', level, text });
            i += 1;
            continue;
        }
        if (line.startsWith('- ')) {
            const items: string[] = [];
            while (i < lines.length && lines[i]?.startsWith('- ')) {
                items.push((lines[i] ?? '').slice(2));
                i += 1;
            }
            blocks.push({ type: 'list', items });
            continue;
        }
        if (!line.trim()) {
            i += 1;
            continue;
        }
        const para: string[] = [];
        while (i < lines.length && lines[i]?.trim() && !lines[i]?.startsWith('#') && !lines[i]?.startsWith('- ') && !lines[i]?.startsWith('```')) {
            para.push(lines[i] ?? '');
            i += 1;
        }
        blocks.push({ type: 'paragraph', text: para.join(' ') });
    }
    return blocks;
}

export function MarkdownDoc({ source, className }: { source: string; className?: string }) {
    const blocks = parseBlocks(source);
    return (
        <article className={cn('space-y-4 text-foreground', className)}>
            {blocks.map((block, index) => {
                if (block.type === 'heading') {
                    if (block.level === 1) {
                        return (
                            <h1 key={index} className="text-3xl md:text-4xl font-bold tracking-tight">
                                {block.text}
                            </h1>
                        );
                    }
                    if (block.level === 2) {
                        return (
                            <h2 key={index} className="text-2xl font-semibold tracking-tight pt-4">
                                {block.text}
                            </h2>
                        );
                    }
                    return (
                        <h3 key={index} className="text-lg font-semibold pt-2">
                            {block.text}
                        </h3>
                    );
                }
                if (block.type === 'list') {
                    return (
                        <ul key={index} className="list-disc pl-5 space-y-1 text-muted-foreground">
                            {block.items.map((item, j) => (
                                <li key={j}>{inline(item)}</li>
                            ))}
                        </ul>
                    );
                }
                if (block.type === 'code') {
                    return (
                        <pre key={index} className="bg-zinc-950 text-zinc-50 rounded-lg p-4 text-sm font-mono overflow-x-auto leading-relaxed">
                            <code>{block.code}</code>
                        </pre>
                    );
                }
                return (
                    <p key={index} className="text-muted-foreground leading-relaxed">
                        {inline(block.text)}
                    </p>
                );
            })}
        </article>
    );
}
