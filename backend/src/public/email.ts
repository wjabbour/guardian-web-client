import { SESClient, SendEmailCommand, SendRawEmailCommand } from '@aws-sdk/client-ses';
import { logger } from './utils';

const ses = new SESClient({});

export async function send_order_confirmation_email (email) {

  const html =
    `
    <div style="text-align: center">
      <h1 style="font-size: 38px">Your order has been placed</h1>
    </div>
  `

  await sendEmail(html, 'Order placed', [email])
}

async function sendEmail(html, subject, target_emails, source = 'doubleujabbour@gmail.com') {
  const command = new SendEmailCommand({
    Destination: {
      ToAddresses: target_emails,
    },
    Message: {
      Body: {
        Html: { Data: html },
      },

      Subject: { Data: subject },
    },
    Source: source,
  });

  try {
    await ses.send(command);
  }
  catch (e) {
    logger.info(e)
  }
}