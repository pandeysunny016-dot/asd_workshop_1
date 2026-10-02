const cache = {};
const TTL = 60 * 1000;

function cacheMiddleware(req, res, next) {
    const key = req.url;
    const entry = cache[key];

    if (entry) {
        const age = Date.now() - entry.createdAt;
        if (age < TTL) {
            res.set('X-Cache', 'HIT');
            return res.json(entry.value);
        }
        delete cache[key];
    }

    res.set('X-Cache', 'MISS');

    const sendJson = res.json.bind(res);
    res.json = (data) => {
        cache[key] = { value: data, createdAt: Date.now() };
        return sendJson(data);
    };

    next();
}

function invalidateCache() {
    Object.keys(cache).forEach(key => delete cache[key]);
}

module.exports = { cacheMiddleware, invalidateCache };
