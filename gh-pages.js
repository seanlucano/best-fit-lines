var ghpages = require('gh-pages');

ghpages.publish(
    'public',
    {
        branch: 'main',
        repo: 'https://github.com/seanlucano/best-fit-lines.git',
        user: {
            name: 'seanlucano', // update to use your name
            email: 'seanlucano@gmail.com' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)