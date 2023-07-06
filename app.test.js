const request = require('supertest');
const fs = require('fs');
const app = require('../app');

console.log('Tests are started. e');

describe('Operation unknown', () => {
    const opUn = 'Operation unknown';
    test('/bb status 400 & Operation unknown', async () => {
        const resp = await request(app)
            .get('/bb');
        
            expect(resp.status).toEqual(400);
            expect(resp.text).toEqual(opUn);
    });
});

describe('Calculator', () => {
    const path = '/calc';

    test('/calc add 3 55', async () => {
        const resp = await request(app)
            .get(path)
            .query({
                operation: 'add',
                a: 3,
                b: 55
            });

        expect(resp.status).toEqual(200);
        expect(resp.text).toEqual('58');
    });
    
    test('/calc sub 32 5', async () => {
        const resp = await request(app)
            .get(path)
            .query({
                operation: 'sub',
                a: 32,
                b: 5
            });

        expect(resp.status).toEqual(200);
        expect(resp.text).toEqual('27');
    });

    test('/calc mul 4 51', async () => {
        const resp = await request(app)
            .get(path)
            .query({
                operation: 'mul',
                a: 4,
                b: 51
            });

        expect(resp.status).toEqual(200);
        expect(resp.text).toEqual('204');
    });

    test('/calc div 14 7', async () => {
        const resp = await request(app)
            .get(path)
            .query({
                operation: 'div',
                a: 14,
                b: 7
            });

        expect(resp.status).toEqual(200);
        expect(resp.text).toEqual('2');
    });
});

describe('File System', () => {
    const path = '/fs';

    test('/fs create tf988.txt smart inside', async () => {

        const resp = await request(app)
        .get(path)
        .query({
            operation: 'create',
            filename: 'tf988.txt',
            text: 'smart inside'
        });

        expect(resp.status).toEqual(201);
        expect(resp.text).toEqual('tf988.txt was created');
    });

    test('/fs read tf989.txt', async () => {
        const fileName = 'tf989.txt';
        const text = '---------____------------_____----';
        fs.appendFile(fileName, text, async (err) => {
            if(err) throw err;
            const resp = await request(app)
            .get(path)
            .query({
                operation: 'read',
                filename: fileName
            });
            
            expect(resp.status).toEqual(201);
            expect(resp.text).toEqual(text);
        });
    });
});