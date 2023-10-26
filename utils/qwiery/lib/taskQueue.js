/*
 * A queue item consists of
 * - an action(done(err, result) with a callback holding an error and a result
 * - a callback(err, result) called after the action finished
 * */
export default class TaskQueue {
    running = false;
    queue = [];

    /**
     * Digests the tasks until done.
     */
    digest() {
        if (this.running || !this.queue.length) {
            return;
        }
        this.running = true;
        const item = this.queue.shift();
        item.action((err, res) => {
            this.tryCode(item.callback, this, [err, res]);
            this.running = false;
            process.nextTick(this.digest.bind(this));
        });
    }

    tryCode(fun, that, args) {
        try {
            fun.apply(that, args);
        } catch (err) {
            console.error(err);
        }
    }
}
