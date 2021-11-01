const testData =  require('../db/data/test-data/index.js');
const {dataManipulation} = require('../utils/utils.js')

describe('dataManipulation()', () => {

    // From articles test data
    let input = [
        {
            title: 'Living in the shadow of a great man',
            topic: 'mitch',
            author: 'butter_bridge',
            body: 'I find this existence challenging',
            created_at: new Date(1594329060000),
            votes: 100
        }];
    // From topics test data
    let secondInput = [
        {
            description: 'The man, the Mitch, the legend',
            slug: 'mitch'
        }
        ];
    let originMatchColumn = 'topic'
    let targetMatchColumn = 'slug'
    let targetNewColumn =  'topic_id'
    let originCopyColumn = 'topic_id'
    test('input data is not mutated', () => {

    dataManipulation(input,secondInput,originMatchColumn,targetMatchColumn,targetNewColumn,originCopyColumn)
    expect(secondInput).toEqual([
        {
            description: 'The man, the Mitch, the legend',
            slug: 'mitch',
            topic_id : 1
        }
        ]);
    expect(input).toEqual([
        {
            title: 'Living in the shadow of a great man',
            topic: 'mitch',
            author: 'butter_bridge',
            body: 'I find this existence challenging',
            created_at: new Date(1594329060000),
            votes: 100
        }]);
    })
    test('Output has different reference to inputs', () => {
        expect(dataManipulation(input,secondInput,originMatchColumn,targetMatchColumn,targetNewColumn,originCopyColumn)).not.toBe(input)
        expect(dataManipulation(input,secondInput,originMatchColumn,targetMatchColumn,targetNewColumn,originCopyColumn)).not.toBe(secondInput)
    })
    test('Output is an array', () => {
        expect(Array.isArray(dataManipulation(input,secondInput,originMatchColumn,targetMatchColumn,targetNewColumn,originCopyColumn))).toBe(true)
    })

    test('Data manipulated correctly', () => {
    
        let expected = [{
    
            title: 'Living in the shadow of a great man',
            topic: 'mitch',
            author: 'butter_bridge',
            body: 'I find this existence challenging',
            created_at: new Date(1594329060000),
            votes: 100,
            topic_id : 1
          }]
        expect(dataManipulation(input,secondInput,originMatchColumn,targetMatchColumn,targetNewColumn,originCopyColumn)).toEqual(expected)
    })
})

