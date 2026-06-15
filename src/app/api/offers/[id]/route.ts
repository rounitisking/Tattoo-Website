import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Offer } from '@/types';

const dataFilePath = path.join(process.cwd(), 'data', 'offers.json');

function readData(): Offer[] {
  if (!fs.existsSync(dataFilePath)) {
    return [];
  }
  const fileData = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(fileData);
}

function writeData(data: Offer[]) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const offers = readData();
    
    const index = offers.findIndex((o) => o.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Offer not found' }, { status: 404 });
    }
    
    offers[index] = { ...offers[index], ...body };
    writeData(offers);
    
    return NextResponse.json(offers[index]);
  } catch (error) {
    console.error('Error updating offer:', error);
    return NextResponse.json({ error: 'Failed to update offer' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const offers = readData();
    const filtered = offers.filter((o) => o.id !== id);
    
    if (filtered.length === offers.length) {
      return NextResponse.json({ error: 'Offer not found' }, { status: 404 });
    }
    
    writeData(filtered);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting offer:', error);
    return NextResponse.json({ error: 'Failed to delete offer' }, { status: 500 });
  }
}
