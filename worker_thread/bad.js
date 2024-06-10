function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function doFib(num) {
  const data = new Promise((resolve,reject) => {
    var result = fibonacci(num)
    console.log("idk what result",result)
    resolve(result);
  })
  console.log("idk what data",data)
  return data;
}

const val = await Promise.all([doFib(40),doFib(40),doFib(40),doFib(40)])
console.log(val)
