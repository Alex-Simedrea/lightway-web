import { fetchMutation, fetchQuery } from 'convex/nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../../../convex/_generated/api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { lightId, date, latency, error } = body;
    
    if (!lightId) {
      return NextResponse.json(
        { error: 'lightId is required' },
        { status: 400 }
      );
    }
    
    // Use system time if date is not provided
    const scanDate = date !== undefined 
      ? date 
      : [new Date().toISOString()];
    
    // Validate date format if provided
    if (date !== undefined && !Array.isArray(date)) {
      return NextResponse.json(
        { error: 'date must be an array of strings' },
        { status: 400 }
      );
    }
    
    if (typeof latency !== 'number') {
      return NextResponse.json(
        { error: 'latency must be a number' },
        { status: 400 }
      );
    }
    
    if (typeof error !== 'boolean') {
      return NextResponse.json(
        { error: 'error must be a boolean' },
        { status: 400 }
      );
    }
    
    // Find the light by lightId string
    const light = await fetchQuery(api.lights.getLightByLightId, {
      lightId: lightId,
    });
    
    if (!light) {
      return NextResponse.json(
        { error: `Light with lightId "${lightId}" not found` },
        { status: 404 }
      );
    }
    
    // Add the scan
    const scanId = await fetchMutation(api.scans.addScan, {
      lightId: light._id,
      date: scanDate,
      latency,
      error,
    });
    
    return NextResponse.json(
      {
        success: true,
        scanId,
        message: 'Scan added successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding scan:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to retrieve all scans
export async function GET() {
  try {
    const scans = await fetchQuery(api.scans.getAllScans);
    
    return NextResponse.json({
      success: true,
      scans,
    });
  } catch (error) {
    console.error('Error fetching scans:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

