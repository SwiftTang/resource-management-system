#!/bin/bash

# Script to force dev server to run on port 3000
# If port 3000 is occupied, kill the process and restart

PORT=3000

echo "🔍 Checking if port $PORT is in use..."

# Find process using port 3000
PID=$(lsof -ti:$PORT)

if [ ! -z "$PID" ]; then
    echo "⚠️  Port $PORT is occupied by process $PID"
    echo "🔪 Killing process $PID..."
    kill -9 $PID
    sleep 1
    echo "✅ Process killed"
else
    echo "✅ Port $PORT is available"
fi

# Remove Next.js lock file if it exists
LOCK_FILE=".next/dev/lock"
if [ -f "$LOCK_FILE" ]; then
    echo "🔓 Removing Next.js lock file..."
    rm "$LOCK_FILE"
fi

echo "🚀 Starting dev server on port $PORT..."
npm run dev
