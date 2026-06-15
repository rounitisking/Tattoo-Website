import { NextResponse } from 'next/server';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  
  if (!token) {
    return NextResponse.json({ 
      data: [], 
      error: 'Instagram API credentials not configured.' 
    }, { status: 200 }); // Return 200 so UI doesn't crash, just shows empty state
  }

  try {
    const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${token}&limit=12`;
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Instagram API Error:', errorData);
      return NextResponse.json({ 
        data: [], 
        error: 'Failed to fetch Instagram feed.' 
      }, { status: 200 });
    }

    const data = await response.json();
    return NextResponse.json({ data: data.data || [] });
  } catch (error) {
    console.error('Instagram API Exception:', error);
    return NextResponse.json({ 
      data: [], 
      error: 'An unexpected error occurred.' 
    }, { status: 200 });
  }
}
