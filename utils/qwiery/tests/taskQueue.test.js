import { describe, test, it, expect } from 'vitest';
import TaskQueue from '../lib/taskQueue';
import _ from 'lodash';

describe('TaskQueue', function (done) {
    it('should digest the queue', function (done) {
        const q = new TaskQueue();
        const coll = [];
        const tasks = _.range(10).map((i) => ({
            action: async (done) => {
                await new Promise((r) => setTimeout(r, 120));
                coll.push(i);
                done(null, i);
            },
            callback: (err, res) => {
                // console.log(res);
                if (res === 9) {
                    // note that because of the nextTick this test would not work if put after digest
                    expect(coll.length).toEqual(10);
                    done();
                }
            },
        }));
        q.queue = tasks;
        q.digest();
    });
});
