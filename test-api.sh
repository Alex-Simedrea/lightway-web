#!/bin/bash

# Test API Script for Scans Endpoint
# Make this file executable with: chmod +x test-api.sh

BASE_URL="http://localhost:3000"

echo "🧪 Testing Scans API"
echo "===================="
echo ""

# Test 1: Add a new scan (success case)
echo "📝 Test 1: Adding a new scan..."
curl -X POST "$BASE_URL/api/scans" \
  -H "Content-Type: application/json" \
  -d '{
    "lightId": "LGT-1A2B3C",
    "date": ["'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"],
    "latency": 95,
    "error": false
  }' \
  -w "\nStatus: %{http_code}\n\n"

echo "---"
echo ""

# Test 2: Add a scan with error
echo "📝 Test 2: Adding a scan with error..."
curl -X POST "$BASE_URL/api/scans" \
  -H "Content-Type: application/json" \
  -d '{
    "lightId": "LGT-1A2B3C",
    "date": ["'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"],
    "latency": 250,
    "error": true
  }' \
  -w "\nStatus: %{http_code}\n\n"

echo "---"
echo ""

# Test 3: Invalid request (missing lightId)
echo "📝 Test 3: Testing validation (missing lightId)..."
curl -X POST "$BASE_URL/api/scans" \
  -H "Content-Type: application/json" \
  -d '{
    "date": ["'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"],
    "latency": 100,
    "error": false
  }' \
  -w "\nStatus: %{http_code}\n\n"

echo "---"
echo ""

# Test 4: Get all scans
echo "📝 Test 4: Getting all scans..."
curl -X GET "$BASE_URL/api/scans" \
  -H "Content-Type: application/json" \
  -w "\nStatus: %{http_code}\n\n"

echo "---"
echo ""
echo "✅ Tests completed!"
echo ""
echo "💡 Tip: Check your app at http://localhost:3000 to see the scans!"

