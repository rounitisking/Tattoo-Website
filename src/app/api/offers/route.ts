import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Offer } from '@/types';

const dataFilePath = path.join(process.cwd(), 'data', 'offers.json');

function readData(): Offer[] {
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([]));
    return [];
  }
  const fileData = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(fileData);
}

function writeData(data: Offer[]) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

export async function GET() {
  try {
    const offers = readData();
    // Sort by order ascending
    offers.sort((a, b) => a.order - b.order);
    return NextResponse.json(offers);
  } catch (error) {
    console.error('Error reading offers:', error);
    return NextResponse.json({ error: 'Failed to fetch offers' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const offers = readData();
    
    const newOffer: Offer = {
      id: Date.now().toString(),
      ...body,
    };
    
    offers.push(newOffer);
    writeData(offers);
    
    return NextResponse.json(newOffer, { status: 201 });
  } catch (error) {
    console.error('Error creating offer:', error);
    return NextResponse.json({ error: 'Failed to create offer' }, { status: 500 });
  }
}
