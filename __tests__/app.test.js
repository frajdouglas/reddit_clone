const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');
const request = require('supertest')
const app = require('../app');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('APP', () => {
    describe('GET', () => {
        describe('/api', () => {
            test('status 200, data delivered successfully', () => {
                return request(app)
                    .get('/api')
                    .expect(200)
                    .then(({ body }) => {
                        expect(body).toEqual({
                            "GET /api": {
                                "description": "serves up a json representation of all the available endpoints of the api"
                            },
                            "GET /api/topics": {
                                "description": "serves an array of all topics",
                                "queries": [],
                                "exampleResponse": {
                                    "topics": [
                                        {
                                            "slug": "football",
                                            "description": "Footie!"
                                        }
                                    ]
                                }
                            },
                            "GET /api/articles": {
                                "description": "serves an array of all topics",
                                "queries": [
                                    "author",
                                    "topic",
                                    "sort_by",
                                    "order"
                                ],
                                "exampleResponse": {
                                    "articles": [
                                        {
                                            "title": "Seafood substitutions are increasing",
                                            "topic": "cooking",
                                            "author": "weegembump",
                                            "body": "Text from the article..",
                                            "created_at": 1527695953341
                                        }
                                    ]
                                }
                            },
                            "GET /api/articles/:article_id": {
                                "description": "serves an object of specified article",
                                "exampleResponse": {
                                    "articles": {
                                        "article_id": 1,
                                        "title": "Living in the shadow of a great man",
                                        "topic": "mitch",
                                        "author": "butter_bridge",
                                        "body": "I find this existence challenging",
                                        "created_at": 1527695953341,
                                        "votes": 100,
                                        "comment_count": 11
                                    }
                                }
                            },
                            "PATCH /api/articles/:article_id": {
                                "description": "Modifies the votes counter and responds with the updated article.",
                                "exampleResponse": [
                                    {
                                        "updatedArticle": {
                                            "article_id": 1,
                                            "title": "Living in the shadow of a great man",
                                            "topic": "mitch",
                                            "author": "butter_bridge",
                                            "body": "I find this existence challenging",
                                            "created_at": 1527695953341,
                                            "votes": 101
                                        }
                                    }
                                ]
                            },
                            "GET /api/articles/:article_id/comments": {
                                "description": "Serves array of comments for give article_id.",
                                "exampleResponse": {
                                    "comments": [
                                        {
                                            "comment_id": 10,
                                            "body": "git push origin master",
                                            "votes": 0,
                                            "author": "icellusedkars",
                                            "article_id": 3,
                                            "created_at": 1527695953341
                                        }
                                    ]
                                }
                            },
                            "POST /api/articles/:article_id/comments": {
                                "description": "Adds comment to specified article and responds with added comment.",
                                "exampleResponse": {
                                    "addedComment": [
                                        {
                                            "comment_id": 19,
                                            "author": "alan",
                                            "article_id": 1,
                                            "votes": 0,
                                            "created_at": 1527695953341,
                                            "body": "vitriol"
                                        }
                                    ]
                                }
                            },
                            "DELETE /api/comments/:comment_id": {
                                "description": "Deletes specified comment, if successful responds with 204 HTTP status code"
                            }
                        })
                    })
            })
        })
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
            test('status 200, data delivered successfully with "sort_by" query, default order is desc', () => {
                return request(app)
                    .get('/api/articles?sort_by=author')
                    .expect(200)
                    .then(({ body }) => {
                        console.log(body)
                        expect(body.articles).not.toEqual([])
                        expect(body.articles).toBeSortedBy('author', { descending: true });
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
            test('status 200, data delivered successfully with "sort_by" query and defaults to created_at column', () => {
                return request(app)
                    .get('/api/articles?sort_by=')
                    .expect(200)
                    .then(({ body }) => {
                        console.log(body)
                        expect(body.articles).not.toEqual([])
                        expect(body.articles).toBeSortedBy('created_at', { descending: true });
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
            test('status 200, data delivered successfully with "topic" query', () => {
                return request(app)
                    .get('/api/articles?topic=cats')
                    .expect(200)
                    .then(({ body }) => {
                        console.log(body)
                        expect(body.articles).not.toEqual([]);
                        expect(body.articles).toBeSortedBy('created_at', { descending: true });
                        expect(body.articles).toEqual(
                            [{
                                article_id: 5,
                                title: 'UNCOVERED: catspiracy to bring down democracy',
                                topic: 'cats',
                                author: 'rogersop',
                                created_at: new Date(1596464040000).toISOString(),
                                votes: 0,
                                comment_count: "2"
                            }]
                        )
                    })
            })
            test('status 200, data delivered successfully with "order" query', () => {
                return request(app)
                    .get('/api/articles?order=ASC')
                    .expect(200)
                    .then(({ body }) => {
                        console.log(body)
                        expect(body.articles).not.toEqual([])
                        expect(body.articles).toBeSortedBy('created_at', { descending: false });
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
            test('status 400, not a column sent as sort_by query', () => {
                return request(app)
                    .get('/api/articles?sort_by=DROP_DB')
                    .expect(400)
                    .then(({ body }) => {
                        console.log(body)
                        expect(body.msg).toBe('Bad request')
                    })
            })
            test('status 400, invalid order query', () => {
                return request(app)
                    .get('/api/articles?order=minion')
                    .expect(400)
                    .then(({ body }) => {
                        expect(body.msg).toBe('Bad request')
                    })
            }),
            test('status 400, invalid topic query', () => {
                return request(app)
                    .get('/api/articles?topic=dogs')
                    .expect(400)
                    .then(({ body }) => {
                        expect(body.msg).toBe('Bad request')
                    })
            })
            test('status 200, valid topic query but does not have any associated articles', () => {
                return request(app)
                    .get('/api/articles?topic=paper')
                    .expect(200)
                    .then(({ body }) => {
                        expect(body.articles).toEqual([])                 
            })
        })


    })

    describe('/api/articles/:article_id/comments', () => {
        test('status 200, data delivered successfully for given article_id', () => {
            return request(app)
                .get('/api/articles/3/comments')
                .expect(200)
                .then(({ body }) => {
                    expect(body.comments).toEqual(
                        [{
                            comment_id: 10,
                            body: "git push origin master",
                            votes: 0,
                            author: "icellusedkars",
                            article_id: 3,
                            created_at: new Date(1592641440000).toISOString()
                        },
                        {
                            comment_id: 11,
                            body: "Ambidextrous marsupial",
                            votes: 0,
                            author: "icellusedkars",
                            article_id: 3,
                            created_at: new Date(1600560600000).toISOString()
                        }]
                    )
                })
        })        
        test('status 404, data does not exist for given id', () => {
            return request(app)
                .get('/api/articles/999/comments')
                .expect(404)
                .then(({ body }) => {
                    expect(body).toEqual(
                        { msg: 'Article_id does not exist' }
                    )
                })
        })
        // test('Status 400, invalid ID, e.g. string of "not-an-id"', () => {
        //     return request(app)
        //         .get('/api/articles/not-an-id/comments')
        //         .expect(400)
        //         .then(({ body }) => {
        //             expect(body).toEqual(
        //                 { msg: 'Bad request' }
        //             )
        //         })
        //     })

    })
})

describe('PATCH', () => {
    describe('/api/articles/:article_id', () => {
        test('status 200, successful patch', () => {
            const patchRequest = { inc_votes: 1 }
            return request(app)
                .patch('/api/articles/1')
                .send(patchRequest)
                .expect(200)
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
        test('status 404, when no id provided, path not found', () => {
            const patchRequest = { inc_votes: 'badData' }
            return request(app)
                .patch('/api/articles/')
                .send(patchRequest)
                .expect(404)
                .expect(({ body }) => {
                    console.log({ body })
                    expect(body.msg).toBe("Route not found")
                })
        })
    })
})

describe('POST', () => {
    describe.only('/api/articles/:article_id/comments', () => {
        test('status 201, successful post', () => {
            const postData = {
                username: 'rogersop',
                body: 'nasty vitriol'
            }
            return request(app)
                .post('/api/articles/1/comments')
                .send(postData)
                .expect(201)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        addedComment: [{
                            comment_id: 19,
                            author: 'rogersop',
                            article_id: 1,
                            votes: 0,
                            created_at: expect.any(String),
                            body: 'nasty vitriol'
                        }]
                    })
                })
        })
        test('status 201, successful post, ignores unnecessary properties', () => {
            const postData = {
                username: 'rogersop',
                body: 'nasty vitriol',
                ignoreMe: "Please"
            }
            return request(app)
                .post('/api/articles/1/comments')
                .send(postData)
                .expect(201)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        addedComment: [{
                            comment_id: 19,
                            author: 'rogersop',
                            article_id: 1,
                            votes: 0,
                            created_at: expect.any(String),
                            body: 'nasty vitriol'
                        }]
                    })
                })
        })
        test('status 400, post data incorrect format', () => {
            const postData = {
                username: 'rogersop',
                boody: 'nasty vitriol'
            }
            return request(app)
                .post('/api/articles/1/comments')
                .send(postData)
                .expect(400)
                .expect(({body}) => {
                    expect(body.msg).toBe("Bad request")
                })
        })
        test.only('Status 404, username does not exist', () => {
            const postData = {
                username: 'frasd',
                body: 'nasty vitriol'
            }
            return request(app)
                .post('/api/articles/999/comments')
                .send(postData)
                .expect(400)
                .expect(({body}) => {
                    expect(body.msg).toBe("Bad request")
                })
        })
    })




})

describe('DELETE', () => {
    describe('/api/comments/:comment_id', () => {
        test('status 204, successfully deleted comment', () => {
            return request(app)
                .delete('/api/comments/1')
                .expect(204)
        })
        test('status 404, comment_id not found', () => {
            return request(app)
                .delete('/api/comments/999')
                .expect(404)
                .then(({ body }) => {
                    expect(body).toEqual(
                        { msg: 'Comment_id does not exist' }
                    )
                })
        })

    })
})
})
