import { ImageResponse } from 'next/og';
import { SITE_NAME, SITE_TAGLINE } from '@/lib/seo';

export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: 80,
                    background: '#0a0a0a',
                    color: '#fafafa',
                }}
            >
                <div style={{ fontSize: 28, opacity: 0.7, marginBottom: 16 }}>BuildSmiths</div>
                <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>{SITE_NAME}</div>
                <div style={{ fontSize: 28, opacity: 0.75, marginTop: 24 }}>{SITE_TAGLINE}</div>
            </div>
        ),
        { ...size },
    );
}
