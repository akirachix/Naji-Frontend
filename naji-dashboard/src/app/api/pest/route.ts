import { NextResponse } from 'next/server';
const baseURL = process.env.BASE_URL;
export async function GET() {
try {
  const response = await fetch(`${baseURL}/api/pest/`);
   if (!response.ok) {
    throw new Error('Failed to fetch pest');
  }
   const pestIncident = await response.json();
  return NextResponse.json(pestIncident);
 } catch (error) {
  console.error('Error fetching pest:', error);
  return NextResponse.json({ error: 'Failed to fetch pest' }, { status: 500 });
}
}
