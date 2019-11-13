module.exports = function() {
  if (!process.env.privateKey) {
    console.error("fatal error,please set privateKey");
    process.exit(1);
  }
};
