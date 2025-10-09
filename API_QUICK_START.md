# 🚀 API Quick Start Guide

Your public API for adding scans is ready to use!

## 📍 API Endpoint

```
POST http://localhost:3000/api/scans
```

## ⚡ Quick Test

### Option 1: Using the Test Script (Bash)
```bash
./test-api.sh
```

### Option 2: Using Node.js
```bash
node test-api.js
```

### Option 3: Using cURL
```bash
curl -X POST http://localhost:3000/api/scans \
  -H "Content-Type: application/json" \
  -d '{
    "lightId": "LGT-1A2B3C",
    "date": ["2024-01-15T10:30:00Z"],
    "latency": 95,
    "error": false
  }'
```

## 📦 Request Format

```json
{
  "lightId": "LGT-1A2B3C",
  "date": ["2024-01-15T10:30:00Z"],
  "latency": 95,
  "error": false
}
```

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `lightId` | string | The light identifier (e.g., "LGT-1A2B3C") |
| `date` | string[] | Array of ISO 8601 timestamps |
| `latency` | number | Latency in milliseconds |
| `error` | boolean | Whether the scan had an error |

## ✅ Success Response

```json
{
  "success": true,
  "scanId": "k17abc123def456",
  "message": "Scan added successfully"
}
```

## ❌ Error Responses

### Light Not Found (404)
```json
{
  "error": "Light with lightId \"LGT-XXXXX\" not found"
}
```

### Validation Error (400)
```json
{
  "error": "lightId is required"
}
```

## 🔍 Get All Scans

```bash
curl http://localhost:3000/api/scans
```

Response:
```json
{
  "success": true,
  "scans": [...]
}
```

## 🧪 Before Testing

Make sure you have:
1. ✅ Convex dev server running: `bun run convex:dev`
2. ✅ Next.js dev server running: `bun run dev`
3. ✅ Sample lights in database: `bunx convex run seed:seedData`

## 📚 Full Documentation

See `API_DOCUMENTATION.md` for complete API documentation with examples in multiple languages.

## 🎯 Integration Examples

### JavaScript/TypeScript
```javascript
const response = await fetch('http://localhost:3000/api/scans', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
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

### Python
```python
import requests

response = requests.post('http://localhost:3000/api/scans', json={
    'lightId': 'LGT-1A2B3C',
    'date': ['2024-01-15T10:30:00Z'],
    'latency': 95,
    'error': False
})

print(response.json())
```

### IoT Device (Arduino/ESP32)
```cpp
HTTPClient http;
http.begin("http://your-server.com/api/scans");
http.addHeader("Content-Type", "application/json");

String payload = "{\"lightId\":\"LGT-1A2B3C\",\"date\":[\"" + 
                 getISO8601Time() + "\"],\"latency\":95,\"error\":false}";

int httpCode = http.POST(payload);
String response = http.getString();
```

## 🔒 Security Note

This API is **public** with no authentication. For production:
- Add API key authentication
- Rate limit requests
- Validate input more strictly
- Use HTTPS

## 📂 Files Created

- `/src/app/api/scans/route.ts` - API route handler
- `/API_DOCUMENTATION.md` - Full API documentation
- `/test-api.sh` - Bash test script
- `/test-api.js` - Node.js test script

---

Happy coding! 🎉

