module.exports = {
  siteUrl: process.env.NODE_ENV === 'production'
    ? 'https://jackies-recipes-git-updating-ssr-jackie-huynhs-projects.vercel.app/'
    : 'http://localhost:3001/',
  generateRobotsTxt: true,
  exclude: ['/settings', '/add-recipe', '/edit-recipe/*'],
};
