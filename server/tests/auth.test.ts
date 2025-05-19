import request from 'supertest';
import app from '../index';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../models/User', () => {
  const users: any[] = [];

  return {
    User: {
      findOne: vi.fn(async (query) => {
        return users.find(u =>
          u.email === query.email &&
                    (!query.carPlate || u.carPlate === query.carPlate)
        );
      }),
      create: vi.fn(async (data) => {
        const user = { _id: 'mock-id-' + users.length, ...data };
        users.push(user);
        return user;
      }),
    },
  };
});

describe('Auth API (mocked)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should register a new user', async () => {
    const res = await request(app).post('/api/register').send({
      email: 'test@wango.io',
      fullName: 'Wango Tester',
      address: '123 Street',
      carPlate: 'TEST123',
    });

    expect(res.status).toBe(201);
    expect(res.body.user.email).toBe('test@wango.io');
    expect(res.body.token).toBeDefined();
  });

  it('should fail to register if user exists', async () => {
    // Первая регистрация
    await request(app).post('/api/register').send({
      email: 'test@wango.io',
      fullName: 'Wango Tester',
      address: '123 Street',
      carPlate: 'TEST123',
    });

    // Вторая попытка с тем же email
    const res = await request(app).post('/api/register').send({
      email: 'test@wango.io',
      fullName: 'Someone Else',
      address: 'Other Street',
      carPlate: 'DUPLICATE',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain('User already exists');
  });

  it('should login with valid credentials', async () => {
    await request(app).post('/api/register').send({
      email: 'login@wango.io',
      fullName: 'Login User',
      address: 'Login St',
      carPlate: 'LOGIN123',
    });

    const res = await request(app).post('/api/login').send({
      email: 'login@wango.io',
      carPlate: 'LOGIN123',
    });

    expect(res.status).toBe(200);
    expect(res.body.user).toBeDefined();
    expect(res.body.token).toBeDefined();
  });

  it('should fail login with wrong plate', async () => {
    await request(app).post('/api/register').send({
      email: 'wrong@wango.io',
      fullName: 'Wrong User',
      address: 'Wrong St',
      carPlate: 'CORRECT123',
    });

    const res = await request(app).post('/api/login').send({
      email: 'wrong@wango.io',
      carPlate: 'WRONG999',
    });

    expect(res.status).toBe(401);
    expect(res.body.message).toContain('Invalid credentials');
  });
});
