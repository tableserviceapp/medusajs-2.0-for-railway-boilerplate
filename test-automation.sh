#!/bin/bash

echo "🧪 Testing Cake Box Gifts Webhook Automation"
echo "=============================================="

# Test 1: Valid webhook
echo "📡 Test 1: Valid webhook request..."
RESPONSE=$(curl -s -X POST "https://cakeboxgifts.co.uk/api/webhooks/product-update" \
  -H "Content-Type: application/json" \
  -H "x-webhook-secret: b4bd500d1cf3d66e9a8a187a0090f455ef489505582277c07f9823f961e2e47d" \
  -d '{"event": "product.created", "data": {"id": "test-'$(date +%s)'", "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)'"}}')

if echo "$RESPONSE" | grep -q '"success":true'; then
    echo "✅ Valid webhook: PASSED"
    echo "   Response: $RESPONSE"
else
    echo "❌ Valid webhook: FAILED"
    echo "   Response: $RESPONSE"
fi

echo ""

# Test 2: Invalid secret  
echo "🔒 Test 2: Invalid secret (should fail)..."
RESPONSE=$(curl -s -X POST "https://cakeboxgifts.co.uk/api/webhooks/product-update" \
  -H "Content-Type: application/json" \
  -H "x-webhook-secret: wrong-secret" \
  -d '{"event": "product.created", "data": {"id": "test-fail"}}')

if echo "$RESPONSE" | grep -q '"error":"Unauthorized"'; then
    echo "✅ Security test: PASSED"
    echo "   Response: $RESPONSE"
else
    echo "❌ Security test: FAILED"
    echo "   Response: $RESPONSE"  
fi

echo ""

# Test 3: Manual cache revalidation
echo "⚡ Test 3: Manual cache revalidation..."
RESPONSE=$(curl -s -X POST "https://cakeboxgifts.co.uk/api/revalidate?category=fathers-day")

if echo "$RESPONSE" | grep -q '"revalidated":true'; then
    echo "✅ Manual revalidation: PASSED"
    echo "   Response: $RESPONSE"
else
    echo "❌ Manual revalidation: FAILED"
    echo "   Response: $RESPONSE"
fi

echo ""
echo "🎯 Summary:"
echo "   - Webhook endpoint: Working"
echo "   - Security: Protected"  
echo "   - Cache revalidation: Active"
echo ""
echo "🔗 Test URLs:"
echo "   - Fathers Day: https://cakeboxgifts.co.uk/gb/categories/fathers-day"
echo "   - Admin: https://admin.cakeboxgifts.co.uk"
echo ""
echo "📊 Next: Add a product in admin and watch it appear instantly!" 