import { NextRequest, NextResponse } from 'next/server';
export async function POST(request: NextRequest) {
  const baseUrl = process.env.BASE_URL;
  try {
    const { last_name,first_name, email, password} = await request.json();
    
    const response = await fetch(`${baseUrl}/api/users/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ last_name,first_name, email, password}),
    });

   
   
    if (!response.ok) {
      const textResponse = await response.text();
      console.log('Backend response:', textResponse, 'Status:', response.status);
          return NextResponse.json(
            { error: textResponse || 'Failed to create user' },
            { status: response.status }
          );
    }
    const result = await response.json();
    console.log('User created successfully:', result);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error during signup:', error);
    return NextResponse.json(
        { error: 'An unexpected error occurred. '+(error as Error).message  },
        { status: 500 }
    );
  }
}