# Packt Free Book Notifier

This is a quick script which will scrape the title of the days free book at [Packt](https://www.packtpub.com) and push it to you via Pushbullet.

## Usage

Grab your Pushbullet API key and put it in the 'config.json.example' file, then remove the '.example' suffix.

Install dependencies - 'npm install'.

Test that everything is working - 'node index.js'.

If all is well you should get a push telling you the title of todays free book.

If it worked, then you can run this daily by setting up a cron job.
