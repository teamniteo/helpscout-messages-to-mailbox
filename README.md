# helpscout-messages-to-mailbox
Creates a new message in mailbox every time the survey message is created. This is needed if you wish to create messages from survey responses.

## To use this Cloudflare Worker, follow these steps:

- Log in to your Cloudflare account and navigate to the Workers section.
- Click on the "Create a Worker" button.
- Give your worker a name and paste the code into the editor.
- Save the worker.
- Add the CLIENT_ID and CLIENT_SECRET variables with your own Help Scout APP API credentials in the Variables tab in worker settings.

Test the worker by sending a POST request to the worker URL with the following query parameters:

mailboxId: The ID of the mailbox to send the Help Scout conversation to.

name: The name of the conversation message. For example "Cancelation" to trigger the Help Scout API request.

## Automating conversion to mailbox message

Go to the [Apps](https://secure.helpscout.net/apps/webhooks/) and add a new Webhook with a URL that points to your worker (https://helpscout-messages-to-mailbox.workers.dev/?mailboxId=1&name=Cancelation). You should now see messages appering in your mailbox for a survey response. 

## We're hiring!

At Niteo we regularly contribute back to the Open Source community. If you do too, we'd like to invite you to [join our team](https://niteo.co/careers)!
