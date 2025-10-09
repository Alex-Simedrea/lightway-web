# API Documentation

## Scans API

Public API endpoint for adding and retrieving scan data.

### Base URL
```
http://localhost:3000/api/scans
```

For production, replace with your deployed URL.

---

## Add a New Scan

**Endpoint:** `POST /api/scans`

**Description:** Add a new scan entry for a light.

### Request Body

```json
{
  "lightId": "LGT-1A2B3C",
  "date": ["2024-01-15T10:30:00Z"],
  "latency": 120,
  "error": false
}
```

### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `lightId` | string | Yes | The unique identifier of the light (e.g., "LGT-1A2B3C") |
| `date` | string[] | Yes | Array of ISO 8601 date strings |
| `latency` | number | Yes | Latency in milliseconds |
| `error` | boolean | Yes | Whether the scan had an error |

### Success Response

**Status Code:** `201 Created`

```json
{
  "success": true,
  "scanId": "k17abc123def456",
  "message": "Scan added successfully"
}
```

### Error Responses

#### Missing lightId
**Status Code:** `400 Bad Request`
```json
{
  "error": "lightId is required"
}
```

#### Invalid date format
**Status Code:** `400 Bad Request`
```json
{
  "error": "date must be an array of strings"
}
```

#### Invalid latency
**Status Code:** `400 Bad Request`
```json
{
  "error": "latency must be a number"
}
```

#### Invalid error field
**Status Code:** `400 Bad Request`
```json
{
  "error": "error must be a boolean"
}
```

#### Light not found
**Status Code:** `404 Not Found`
```json
{
  "error": "Light with lightId \"LGT-XXXXX\" not found"
}
```

---

## Get All Scans

**Endpoint:** `GET /api/scans`

**Description:** Retrieve all scans from the database.

### Success Response

**Status Code:** `200 OK`

```json
{
  "success": true,
  "scans": [
    {
      "_id": "k17abc123def456",
      "_creationTime": 1704887400000,
      "lightId": "j16xyz789ghi012",
      "date": ["2024-01-15T10:30:00Z"],
      "latency": 120,
      "error": false
    }
  ]
}
```

---

## Example Usage

### Using cURL

```bash
# Add a new scan
curl -X POST http://localhost:3000/api/scans \
  -H "Content-Type: application/json" \
  -d '{
    "lightId": "LGT-1A2B3C",
    "date": ["2024-01-15T10:30:00Z"],
    "latency": 95,
    "error": false
  }'
```

### Using JavaScript/Fetch

```javascript
// Add a new scan
const response = await fetch('http://localhost:3000/api/scans', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    lightId: 'LGT-1A2B3C',
    date: [new Date().toISOString()],
    latency: 95,
    error: false,
  }),
});

const result = await response.json();
console.log(result);
```

### Using Python

```python
import requests
import json
from datetime import datetime

url = "http://localhost:3000/api/scans"

payload = {
    "lightId": "LGT-1A2B3C",
    "date": [datetime.now().isoformat()],
    "latency": 95,
    "error": False
}

response = requests.post(url, json=payload)
print(response.json())
```

### Using Node.js (axios)

```javascript
const axios = require('axios');

async function addScan() {
  try {
    const response = await axios.post('http://localhost:3000/api/scans', {
      lightId: 'LGT-1A2B3C',
      date: [new Date().toISOString()],
      latency: 95,
      error: false,
    });
    
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

addScan();
```

---

## Notes

- This API is **public** and requires no authentication
- The `lightId` must exist in the database before adding scans
- Use `bunx convex run seed:seedData` to populate sample lights if needed
- All timestamps should be in ISO 8601 format
- The API will return a Convex-generated `scanId` upon successful creation

---

## Testing

1. Start your development servers:
   ```bash
   # Terminal 1: Convex
   bun run convex:dev
   
   # Terminal 2: Next.js
   bun run dev
   ```

2. Test the endpoint:
   ```bash
   curl -X POST http://localhost:3000/api/scans \
     -H "Content-Type: application/json" \
     -d '{
       "lightId": "LGT-1A2B3C",
       "date": ["2024-01-15T10:30:00Z"],
       "latency": 100,
       "error": false
     }'
   ```

3. View the results in your app at `http://localhost:3000` (Lights page)

