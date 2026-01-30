#!/bin/bash

# Vercel API Test Script
# Usage: ./test-vercel-apis.sh https://your-domain.vercel.app

DOMAIN=$1

if [ -z "$DOMAIN" ]; then
  echo "❌ Usage: $0 https://your-domain.vercel.app"
  exit 1
fi

echo "🧪 Testing Vercel APIs for: $DOMAIN"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Test 1: Trending API (GET)
echo ""
echo "📊 Test 1: GET /api/trending"
TRENDING_RESPONSE=$(curl -s -w "\n%{http_code}" "$DOMAIN/api/trending")
TRENDING_CODE=$(echo "$TRENDING_RESPONSE" | tail -n1)
TRENDING_BODY=$(echo "$TRENDING_RESPONSE" | sed '$d')

if [ "$TRENDING_CODE" = "200" ]; then
  echo "✅ Status: $TRENDING_CODE"
  echo "📦 Response preview:"
  echo "$TRENDING_BODY" | head -c 200
  echo "..."
else
  echo "❌ Status: $TRENDING_CODE"
  echo "📦 Response: $TRENDING_BODY"
fi

# Test 2: Ask Novus API (POST)
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🤖 Test 2: POST /api/ask-novus"
NOVUS_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$DOMAIN/api/ask-novus" \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Hello Novee, are you online?","isSiteChat":true}')
NOVUS_CODE=$(echo "$NOVUS_RESPONSE" | tail -n1)
NOVUS_BODY=$(echo "$NOVUS_RESPONSE" | sed '$d')

if [ "$NOVUS_CODE" = "200" ]; then
  echo "✅ Status: $NOVUS_CODE"
  echo "📦 Response:"
  echo "$NOVUS_BODY"
else
  echo "❌ Status: $NOVUS_CODE"
  echo "📦 Response: $NOVUS_BODY"
fi

# Summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 Summary:"
if [ "$TRENDING_CODE" = "200" ] && [ "$NOVUS_CODE" = "200" ]; then
  echo "✅ All APIs working correctly!"
else
  echo "❌ Some APIs failed. Check logs above."
fi
