import request from 'supertest';
import app from '../index';
import { describe, it, expect, vi, beforeEach } from 'vitest';

let token: string;

vi.mock('../models/User', () => {
  return {
    User: {
      findOne: vi.fn(async ({ email }) => ({
        _id: 'user-id',
        email,
        carPlate: 'CAR123',
        fullName: 'Tester',
        address: '123 Street',
      })),
    },
  };
});

vi.mock('../models/ParkingSession', () => {
  const sessionData = {
    _id: 'session-id',
    user: 'user-id',
    startTime: new Date(),
    endTime: null,
    area: {
      name: 'Zone A',
      city: {
        name: 'Test City',
        rates: [{ from: '00:00', to: '23:59', price: 5 }],
      },
    },
    save: vi.fn(async function () {
      this.endTime = new Date();
      this.price = 5;
    }),
  };

  return {
    ParkingSession: {
      create: vi.fn(async () => sessionData),

      find: vi.fn(() => ({
        populate: vi.fn(() => ({
          sort: vi.fn().mockResolvedValue([sessionData])
        }))
      })),

      findById: vi.fn(() => ({
        populate: () => sessionData,
      })),

      findOne: vi.fn(() => ({
        populate: () => sessionData
      })),
    },
  };
});

vi.mock('../models/Area', () => {
  return {
    Area: {
      findById: vi.fn(async (id) => id ? { _id: id, name: 'Zone A', city: 'city-id' } : null),
    },
  };
});

vi.mock('../models/City', () => {
  return {
    City: {
      findById: vi.fn(async () => ({ _id: 'city-id', name: 'Test City', rates: [] })),
    },
  };
});

describe('Parking API (mocked)', () => {
  beforeEach(async () => {
    const res = await request(app).post('/api/login').send({
      email: 'test@wango.io',
      carPlate: 'CAR123'
    });
    token = res.body.token;
  });

  it('should start parking', async () => {
    const res = await request(app)
      .post('/api/start-parking')
      .set('Authorization', `Bearer ${token}`)
      .send({ areaId: 'area-id' });

    expect(res.status).toBe(201);
    expect(res.body.session.area.name).toBe('Zone A');
  });

  it('should stop parking', async () => {
    await request(app)
      .post('/api/start-parking')
      .set('Authorization', `Bearer ${token}`)
      .send({ areaId: 'area-id' });

    const res = await request(app)
      .post('/api/stop-parking')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.session.endTime).toBeDefined();
  });

  it('should return list of parkings', async () => {
    const res = await request(app)
      .get('/api/parkings')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
    expect(res.body[0]).toHaveProperty('area');
    expect(res.body[0].area).toHaveProperty('name', 'Zone A');
  });
});
