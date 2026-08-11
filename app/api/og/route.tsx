import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Extract parameters
    const hasTitle = searchParams.has('title');
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'Building intelligent software from ideas to deployment.';
      
    const date = searchParams.get('date') || '';
    const category = searchParams.get('category') || 'Developer Log';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            backgroundColor: '#0a0a0a',
            padding: '80px',
            color: '#ededed',
            border: '8px solid #1a1a1a',
          }}
        >
          {/* Top Header */}
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '2px solid #27272a',
              paddingBottom: '30px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '24px', height: '24px', backgroundColor: '#06b6d4', borderRadius: '50%' }} />
              <span style={{ fontSize: 28, fontWeight: 800, letterSpacing: '0.15em', fontFamily: 'monospace' }}>
                VAIBHAV RAM // WORKSPACE
              </span>
            </div>
            <span style={{ fontSize: 24, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              [ {category} ]
            </span>
          </div>

          {/* Center Title */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'center',
              marginTop: '40px',
              marginBottom: '40px',
              maxWidth: '1000px',
            }}
          >
            <h1
              style={{
                fontSize: 76,
                fontWeight: 900,
                lineHeight: 1.1,
                color: '#ffffff',
                margin: 0,
              }}
            >
              {title}
            </h1>
          </div>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              borderTop: '2px solid #27272a',
              paddingTop: '30px',
            }}
          >
            <div style={{ fontSize: 28, color: '#a1a1aa', fontFamily: 'monospace' }}>
              vaibhav-bharathula.tech
            </div>
            {date && (
              <div style={{ fontSize: 28, color: '#06b6d4', fontWeight: 600, fontFamily: 'monospace' }}>
                {date}
              </div>
            )}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error(`Error generating OG image: ${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
