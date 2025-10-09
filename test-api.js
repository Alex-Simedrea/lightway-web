#!/usr/bin/env node

/**
 * Test script for the Scans API
 * Run with: node test-api.js
 */

const BASE_URL = 'http://localhost:3000';

async function testAPI() {
  console.log('🧪 Testing Scans API');
  console.log('====================\n');

  // Test 1: Add a new scan (success case)
  console.log('📝 Test 1: Adding a new scan...');
  try {
    const response1 = await fetch(`${BASE_URL}/api/scans`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lightId: 'LGT-1A2B3C',
        date: [new Date().toISOString()],
        latency: 95,
        error: false,
      }),
    });
    const data1 = await response1.json();
    console.log(`Status: ${response1.status}`);
    console.log('Response:', JSON.stringify(data1, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  }
  console.log('\n---\n');

  // Test 2: Add a scan with error
  console.log('📝 Test 2: Adding a scan with error...');
  try {
    const response2 = await fetch(`${BASE_URL}/api/scans`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lightId: 'LGT-1A2B3C',
        date: [new Date().toISOString()],
        latency: 250,
        error: true,
      }),
    });
    const data2 = await response2.json();
    console.log(`Status: ${response2.status}`);
    console.log('Response:', JSON.stringify(data2, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  }
  console.log('\n---\n');

  // Test 3: Invalid request (missing lightId)
  console.log('📝 Test 3: Testing validation (missing lightId)...');
  try {
    const response3 = await fetch(`${BASE_URL}/api/scans`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: [new Date().toISOString()],
        latency: 100,
        error: false,
      }),
    });
    const data3 = await response3.json();
    console.log(`Status: ${response3.status}`);
    console.log('Response:', JSON.stringify(data3, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  }
  console.log('\n---\n');

  // Test 4: Light not found
  console.log('📝 Test 4: Testing with non-existent light...');
  try {
    const response4 = await fetch(`${BASE_URL}/api/scans`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lightId: 'LGT-NOTFOUND',
        date: [new Date().toISOString()],
        latency: 100,
        error: false,
      }),
    });
    const data4 = await response4.json();
    console.log(`Status: ${response4.status}`);
    console.log('Response:', JSON.stringify(data4, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  }
  console.log('\n---\n');

  // Test 5: Get all scans
  console.log('📝 Test 5: Getting all scans...');
  try {
    const response5 = await fetch(`${BASE_URL}/api/scans`);
    const data5 = await response5.json();
    console.log(`Status: ${response5.status}`);
    console.log(`Total scans: ${data5.scans?.length || 0}`);
    if (data5.scans?.length > 0) {
      console.log('First scan:', JSON.stringify(data5.scans[0], null, 2));
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
  console.log('\n---\n');

  console.log('✅ Tests completed!\n');
  console.log('💡 Tip: Check your app at http://localhost:3000 to see the scans!');
}

// Run the tests
testAPI().catch(console.error);

