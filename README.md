# Authentication Frontend

A Next.js-based frontend for a multi-step authentication system.

## Setup

1. Clone the repository:
```bash
git clone [your-repo-url]
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Run with Docker:
```bash
docker-compose up -d
```

## Environment Variables

- `NEXT_PUBLIC_BACKEND_URL`: URL of the backend service
- `NODE_ENV`: Environment (development/production)

## Development

```bash
npm run dev
```

## Production

```bash
docker-compose up -d
```
