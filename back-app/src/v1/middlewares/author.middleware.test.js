const request = require('supertest');
const express = require('express');
const validateAuthorInfo = require('./author.middleware');

const app = express();
app.use(express.json());
app.use(validateAuthorInfo);

app.get('/test', (req, res) => {
    res.status(200).json({ message: 'Success', author: req.author });
});

describe('validateAuthorInfo Middleware', () => {
    it('should return 400 if Author-Info header is missing', async () => {
        const response = await request(app).get('/test');
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Missing Author-Info header');
    });

    it('should return 400 if Author-Info is not valid JSON', async () => {
        const response = await request(app)
            .get('/test')
            .set('Author-Info', 'Invalid JSON');
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Invalid Author-Info JSON format');
    });

    it('should return 400 if Author-Info format is invalid', async () => {
        const response = await request(app)
            .get('/test')
            .set('Author-Info', JSON.stringify({}));
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Invalid Author-Info format');
    });

    it('should return 401 if Author-Info does not match the correct author', async () => {
        const response = await request(app)
            .get('/test')
            .set('Author-Info', JSON.stringify({ name: 'Herrera', lastname: 'Juan' }));
        expect(response.status).toBe(401);
        expect(response.body.error).toBe('Unauthorized.');
    });

    it('should proceed to next middleware if Author-Info is valid', async () => {
        const response = await request(app)
            .get('/test')
            .set('Author-Info', JSON.stringify({ name: 'Juan', lastname: 'Herrera' }));
        expect(response.status).toBe(200);
        expect(response.body.author).toEqual({ name: 'Juan', lastname: 'Herrera' });
        expect(response.body.message).toBe('Success');
    });
});
