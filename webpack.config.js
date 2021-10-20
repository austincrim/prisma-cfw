const path = require("path")

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "worker.js",
    path: path.join(__dirname, "dist")
  },
  // Cloudflare Worker environment is similar to a webworker
  target: "webworker",
  resolve: {
    extensions: [".js"],
    // Alias to tell resolve the Prisma Client properly
    alias: {
      "@prisma/client$": require.resolve("@prisma/client")
    }
  },
  mode: "development",
  // Wrangler doesn't like eval which devtools use in development.
  devtool: "none"
}
