const request = require('supertest');
const app = require('../app');
const fs = require('fs');

describe('Calculator', () => {
    const path = '/calc';
    test('/calc status 200', async () => {
        const resp = await request(app)
            .get(path);
        
        expect(resp.status).toEqual(200);
    });

    test('/calc add 3 55', async () => {
        const resp = await request(app)
            .get(path)
            .query({
                operation: 'add',
                a: 3,
                b: 55
            });

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

        expect(resp.text).toEqual('2');
    });
});

describe('File System', () => {
    const path = '/fs';
    test('/fs status 201 check', async () => {
        const resp = await request(app)
            .get(path);
        
        expect(resp.status).toEqual(201);
    });

    test('/fs create tf988.txt smart inside', async () => {
        
        fs.unlink('tf988.txt', async (err) => {
            if(err) throw err;
            const resp = await request(app)
            .get(path)
            .query({
                operation: 'create',
                filename: 'tf988.txt',
                text: 'smart inside'
            });
        
            expect(resp.text).toEqual('tf988.txt was created');
        });

    });

    test('/fs read tf988.txt', async () => {
        const fileName = 'tf988.txt';
        const text = '---------____------------_____----';
        fs.unlink(fileName, async (err) => {
            if(err) throw err;
            fs.appendFile(fileName, text, async (err) => {
                if(err) throw err;
                const resp = await request(app)
                .get(path)
                .query({
                    operation: 'read',
                    filename: fileName
                });
            
                expect(resp.text).toEqual(text);
            });
        });

        const resp = await request(app)
            .get(path)
            .query({
                operation: 'read',
                filename: 'tf988.txt'
            });
        
        expect(resp.text).toEqual('smart inside');
    });

    test('/fs read tf989.txt', async () => {
        const fileName = 'tf989.txt';
        const text = 'tf989.txttf989.txttf989.txttf989.txttf989.txt';
        fs.unlink(fileName, async (err) => {
            if(err) throw err;
            fs.appendFile(fileName, text, async (err) => {
                if(err) throw err;
                const resp = await request(app)
                .get(path)
                .query({
                    operation: 'read',
                    filename: fileName
                });
            
                expect(resp.text).toEqual(text);
            });
        });
    });
});

describe('Operation unknown', () => {
    const opUn = 'Operation unknown';
    test('/ff', async () => {
        const resp = await request(app)
            .get('/ff');
        
        expect(resp.text).toEqual(opUn);
    });
    test('/', async () => {
        const resp = await request(app)
            .get('/');
        
        expect(resp.text).toEqual(opUn);
    });
    test('/calculation', async () => {
        const resp = await request(app)
            .get('/calculation');
        
        expect(resp.text).toEqual(opUn);
    });
});