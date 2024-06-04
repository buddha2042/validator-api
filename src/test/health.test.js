import request from 'supertest';
import app from '../app.js';

describe('POST /health', () => {
  it('should respond with a JSON object containing a message', async () => {
    const response = await request(app).post('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'The health check passed' });
  });
});
