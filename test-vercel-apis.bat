@echo off
REM Vercel API Test Script for Windows
REM Usage: test-vercel-apis.bat https://your-domain.vercel.app

set DOMAIN=%1

if "%DOMAIN%"=="" (
  echo Usage: %0 https://your-domain.vercel.app
  exit /b 1
)

echo Testing Vercel APIs for: %DOMAIN%
echo ========================================

echo.
echo Test 1: GET /api/trending
curl -s "%DOMAIN%/api/trending"

echo.
echo ========================================
echo Test 2: POST /api/ask-novus
curl -s -X POST "%DOMAIN%/api/ask-novus" ^
  -H "Content-Type: application/json" ^
  -d "{\"prompt\":\"Hello Novee\",\"isSiteChat\":true}"

echo.
echo ========================================
echo Tests complete!
