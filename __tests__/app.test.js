const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');
const request = require('supertest')
const app = require('../app');
const topicsRouter = require('../routes/topics-router.js');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('APP', () => {
    describe('GET', () => {
        describe('/api/topics', () => {
            test('status 200, data delivered successfully', () => {
                return request(app)
                    .get('/api/topics')
                    .expect(200)
                    .then(({ body }) => {
                        expect(body).toEqual([
                            {
                                description: 'The man, the Mitch, the legend',
                                slug: 'mitch'
                            },
                            {
                                description: 'Not dogs',
                                slug: 'cats'
                            },
                            {
                                description: 'what books are made of',
                                slug: 'paper'
                            }
                        ])
                    })
            })
            test('status 404, bad url', () => {
                return request(app)
                    .get('/api/INVALID')
                    .expect(404)
                    .then(({ body }) => {
                        expect(body).toEqual({ msg: 'Route not found' })
                    })
            })
        })

        describe('/api/articles/:article_id', () => {
            test('status 200, data delivered successfully', () => {
                return request(app)
                    .get('/api/articles/1')
                    .expect(200)
                    .then(({ body }) => {
                        expect(body).toEqual(
                            {
                                articles:
                                {
                                    article_id: 1,
                                    title: 'Living in the shadow of a great man',
                                    topic: 'mitch',
                                    author: 'butter_bridge',
                                    body: 'I find this existence challenging',
                                    created_at: new Date(1594329060000).toISOString(),
                                    votes: 100,
                                    comment_count: 11
                                }
                            }
                        )
                    })
            })
            test('status 404, data does not exist for given id', () => {
                return request(app)
                    .get('/api/articles/999')
                    .expect(404)
                    .then(({ body }) => {
                        expect(body).toEqual(
                            { msg: 'Article_id does not exist' }
                        )
                    })
            })
            test('status 400, incorrect parametric query type', () => {
                return request(app)
                    .get('/api/articles/notAnId')
                    .expect(400)
                    .then(({ body }) => {
                        expect(body).toEqual(
                            { msg: 'Invalid Input' }
                        )
                    })
            })
        })
        describe('/api/articles', () => {
            test('status 200, data delivered successfully with no query', () => {
                return request(app)
                    .get('/api/articles')
                    .expect(200)
                    .then(({ body }) => {
                        expect(body.articles.length).toBe(12)
                        body.articles.forEach((element) => {
                            expect(element).toEqual(
                                expect.objectContaining({
                                    article_id: expect.any(Number),
                                    author: expect.any(String),
                                    title: expect.any(String),
                                    topic: expect.any(String),
                                    created_at: expect.any(String),
                                    votes: expect.any(Number),
                                    comment_count: expect.any(String)
                                })
                            )
                        })
                    })
            })
            test.only('status 200, data delivered successfully with "sort_by" query', () => {
                return request(app)
                    .get('/api/articles?sort_by=author')
                    .expect(200)
                    .then(({ body }) => {
                        console.log(body)
                        expect(body.articles).not.toEqual([])
                        expect(body.articles).toBeSortedBy('author');
                        body.articles.forEach((element) => {
                            expect(element).toEqual(
                                expect.objectContaining({
                                    article_id: expect.any(Number),
                                    author: expect.any(String),
                                    title: expect.any(String),
                                    topic: expect.any(String),
                                    created_at: expect.any(String),
                                    votes: expect.any(Number),
                                    comment_count: expect.any(String)
                                })
                            )
                        })
                    })
            })
            test.only('status 200, data delivered successfully with "sort_by" query and defaults to created_at column', () => {
                return request(app)
                    .get('/api/articles?sort_by=')
                    .expect(200)
                    .then(({ body }) => {
                        console.log(body)
                        expect(body.articles).not.toEqual([])
                        expect(body.articles).toBeSortedBy('created_at');
                        body.articles.forEach((element) => {
                            expect(element).toEqual(
                                expect.objectContaining({
                                    article_id: expect.any(Number),
                                    author: expect.any(String),
                                    title: expect.any(String),
                                    topic: expect.any(String),
                                    created_at: expect.any(String),
                                    votes: expect.any(Number),
                                    comment_count: expect.any(String)
                                })
                            )
                        })
                    })
            })
            test.only('status 400, not a column sent as sort_by query', () => {
                return request(app)
                    .get('/api/articles?sort_by=DROP_DB')
                    .expect(400)
                    .then(({ body }) => {
                        console.log(body)
                        expect(body.msg).toBe('Bad request')      
            })
        })
        test.only('status 200, data delivered successfully with "order" query and defaults to created_at column', () => {
            return request(app)
                .get('/api/articles?sort_by=')
                .expect(200)
                .then(({ body }) => {
                    console.log(body)
                    expect(body.articles).not.toEqual([])
                    expect(body.articles).toBeSortedBy('created_at');
                    body.articles.forEach((element) => {
                        expect(element).toEqual(
                            expect.objectContaining({
                                article_id: expect.any(Number),
                                author: expect.any(String),
                                title: expect.any(String),
                                topic: expect.any(String),
                                created_at: expect.any(String),
                                votes: expect.any(Number),
                                comment_count: expect.any(String)
                            })
                        )
                    })
                
    
    test('status 200, data delivered successfully with multiple queries', () => { })
})
    })

describe('PATCH', () => {
    describe('/api/articles/:article_id', () => {
        test('status 201, successful patch', () => {
            const patchRequest = { inc_votes: 1 }
            return request(app)
                .patch('/api/articles/1')
                .send(patchRequest)
                .expect(201)
                .expect(({ body }) => {
                    expect(body).toEqual(
                        {
                            updatedArticle: [{
                                article_id: 1,
                                title: 'Living in the shadow of a great man',
                                topic: 'mitch',
                                author: 'butter_bridge',
                                body: 'I find this existence challenging',
                                created_at: new Date(1594329060000).toISOString(),
                                votes: 101,
                            }]
                        }
                    )
                })
        })
        test('status 400, bad key in patch data', () => {
            const patchRequest = { badRequest: 1 }
            return request(app)
                .patch('/api/articles/1')
                .send(patchRequest)
                .expect(400)
                .expect(({ body }) => {
                    expect(body).toEqual(
                        { msg: "Bad request" }
                    )
                })
        })
        test('status 400, bad value in patch data', () => {
            const patchRequest = { inc_votes: 'badData' }
            return request(app)
                .patch('/api/articles/1')
                .send(patchRequest)
                .expect(400)
                .expect(({ body }) => {
                    expect(body.msg).toBe("Invalid Input")
                })
        })
    })
})
})
