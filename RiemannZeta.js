const math = require('mathjs');
function calculateB(n) {
    var b = new Array(n + 1);
    b[0] = 1;
    b[1] = -0.5;
  
    for (var m = 2; m <= n; m++) {
      b[m] = 0;
  
      for (var k = 0; k <= m; k++) {
        for (var v = 0; v <= k; v++) {
          b[m] += Math.pow(-1, v) * binomial(k, v) * Math.pow(v, m) / (k + 1);
        }
      }
    }
  
    return b;
}
  
// Helper function to calculate binomial coefficient (n choose k)
function binomial(n, k) {
    if (k === 0 || k === n) {
      return 1;
    } else {
      var numerator = 1;
      var denominator = 1;
  
      for (var i = 1; i <= k; i++) {
        numerator *= (n - i + 1);
        denominator *= i;
      }
  
      return numerator / denominator;
    }
}

function calculateTkns(s, k, n, bernoulliArray) {
    var tkns = (bernoulliArray[2 * k] / factorial(2 * k)) * Math.pow(n, 1 - s - 2 * k);
  
    for (var j = 0; j <= (2 * k - 2); j++) {
      tkns *= (s + j);
    }
  
    return tkns;
}
  
 // Helper function to calculate factorial
function factorial(num) {
    if (num === 0 || num === 1) {
      return 1;
    } else {
      var result = 1;
      for (var i = 2; i <= num; i++) {
        result *= i;
      }
      return result;
    }
}

function calculateZeta(s, n, m) {
    let zeta = math.complex(0, 0);
  
    for (let j = 1; j < n; j++) {
      zeta = math.add(zeta, math.pow(j, math.multiply(-1, s)));
    }
  
    zeta = math.add(zeta, math.divide(math.pow(n, math.multiply(-1, s)), 2));
    zeta = math.add(zeta, math.divide(math.pow(n, math.subtract(1, s)), math.subtract(s, 1)));
  
    for (let k = 1; k <= m; k++) {
      const tkns = calculateTkns(s, k, n, bernoulliArray);
      zeta = math.add(zeta, tkns);
    }
  
    return zeta;
  }
  