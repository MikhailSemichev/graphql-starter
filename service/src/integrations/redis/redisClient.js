import redis from 'redis';
import { ENVIRONMENT, REDIS_URL, REDIS_PASSWORD } from '../../constants';

const [host, port] = REDIS_URL.split(':');

class RedisClient {
    init() {
        this.client = redis.createClient(port, host, { no_ready_check: true });
        this.client.auth(REDIS_PASSWORD, (err) => {
            if (err) {
                throw err;
            }
        });

        this.client.on('connect', () => {
            console.log('Connected to Redis');
        });
    }

    get(key) {
        return promisify(this.client, 'get', envKey(key));
    }

    set(key, value) {
        return promisify(this.client, 'set', envKey(key), JSON.stringify(value));
    }

    hget(hash, key) {
        return promisify(this.client, 'hget', envKey(hash), key);
    }

    hset(hash, key, value) {
        return promisify(this.client, 'hset', envKey(hash), key, JSON.stringify(value));
    }

    del(key) {
        return promisify(this.client, 'del', envKey(key));
    }
}

const client = new RedisClient();
client.init();
export default client;


function envKey(key) {
    return `${ENVIRONMENT}__${key}`;
}

function promisify(object, method, ...args) {
    return new Promise((resolve, reject) => {
        object[method](...args, (err, value) => {
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
