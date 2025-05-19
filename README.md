# 🚗 Wango Parking App

## 📦 Project Structure
- **client/** — frontend built with React + Vite
- **server/** — backend using Express + MongoDB (via Mongoose)

---

## 🚀 Quick Start (Local Development)

### 🔧 Install dependencies
```bash
npm install
```

### 🧪 Start development servers
```bash
# Start both client and server
npm run dev
```

### 🌱 Seed the database (cities and areas)
```bash
npm run seed
```

> Make sure MongoDB is running locally and accessible via `MONGO_URI`

---

## 🧪 Run Tests
```bash
npm run test
```

> Tests are written using **Vitest** and **supertest**. Mongoose models are mocked using `vi.mock`. No real MongoDB connection is required.

Test coverage includes:
- ✅ User login
- ✅ Start parking session
- ✅ Stop parking session
- ✅ Handle no active session case
- ✅ Fetch parking history

## 🐳 Run with Docker

### 📁 Create a `.env` file in the root:
```env
MONGO_URI=mongodb://mongo:27017/wango
JWT_SECRET=your_jwt_secret
```

### 🛠 Dockerfile (in project root)
```Dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install && npm run build
CMD ["npm", "run", "start"]
```

### 🐋 docker-compose.yml
```yaml
version: '3.8'
services:
  mongo:
    image: mongo
    ports:
      - "27017:27017"

  wango:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - mongo
    environment:
      - MONGO_URI=mongodb://mongo:27017/wango
      - JWT_SECRET=your_jwt_secret
```

### ▶️ Run
```bash
docker-compose up --build
```

The app will be available at `http://localhost:3000`

---

## 📁 NPM Scripts
| Script        | Description                         |
|---------------|-------------------------------------|
| `dev`         | Starts the server with ts-node      |
| `dev:client`  | Runs Vite client dev server         |
| `build`       | Builds the client                   |
| `start`       | Runs production server              |
| `seed`        | Seeds DB with cities and areas      |

---

## 📬 API Endpoints
| Method | Path                 | Description                   |
|--------|----------------------|-------------------------------|
| POST   | `/api/register`      | Register a user               |
| POST   | `/api/login`         | Login with email & car plate |
| POST   | `/api/start-parking` | Start a parking session       |
| POST   | `/api/stop-parking`  | Stop parking and calculate fee|
| GET    | `/api/parkings`      | Get all sessions for user     |
