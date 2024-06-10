import Redis from 'ioredis'

async function ConnRedis() {
  const redis = new Redis({
    host:process.env.HOST,
    port:process.env.PORT,
    password:process.env.PASSWORD,
  });

  redis.on('connect',()=> {
    console.log('connnected to redis')
  })
  /*
  for (let i=10_001 ; i<=1_000_000 ; i++) {
    redis.call('json.arrappend','users','.',JSON.stringify({username:i,email:`${i}@gmail.com`}))
  }
  */
  return redis;
}

export { ConnRedis }

