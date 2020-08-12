require('dotenv').config();
const mdxTableOfContents = require('./parsemdx-module');

const withMDX = require('@next/mdx')({
  extension: /\.(md|mdx)$/,
  // options: { compilers: [mdxTableOfContents] },
});

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  env: {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    REPO_FULL_NAME: process.env.REPO_FULL_NAME,
    BASE_BRANCH: process.env.BASE_BRANCH,
  },
});
