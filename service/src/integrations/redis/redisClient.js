import redis from 'redis';
import { promisify } from 'util';
import { ENVIRONMENT, REDIS_URL, REDIS_PASSWORD } from '../../constants';

const [host, port] = REDIS_URL.split(':');

const client = redis.createClient(port, host, { no_ready_check: true });
client.auth(REDIS_PASSWORD, (err) => {
    if (err) {
        throw err;
    }
});

client.on('connect', () => {
    console.log('Connected to Redis');
});

export function get(key) {
    return promisify('get', envKey(key));
}

export function set(key, value) {
    return promisify('set', envKey(key), JSON.stringify(value));
}

export function hget(hash, key) {
    return promisify('hget', envKey(hash), key);
}

export function hset(hash, key, value) {
    return promisify('hset', envKey(hash), key, JSON.stringify(value));
}

export function hmget(hash, keys) {
    return promisify('hmget', envKey(hash), keys);
}

export function hmset(hash, keyValArray) {
    return promisify('hmset', envKey(hash), keyValArray);
}

export function del(key) {
    return promisify('del', envKey(key));
}

function envKey(key) {
    return `${ENVIRONMENT}__${key}`;
}

function promisify(method, ...args) {
    return new Promise((resolve, reject) => {
        client[method](...args, (err, value) => {
            if (err) {
                reject(err);
                return;
            }

            const result = typeof value === 'string' ? parseJSON(value) : value;
            resolve(result);
        });
    });
}

function parseJSON(str) {
    try {
        return str && JSON.parse(str);
    } catch (e) {
        return;
    }
}
