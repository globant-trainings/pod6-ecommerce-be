module.exports = function withLatency(cb, latency = 1000) {
  setTimeout(cb, latency);
}