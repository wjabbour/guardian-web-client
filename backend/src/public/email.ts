import { SESClient, SendEmailCommand, SendRawEmailCommand } from '@aws-sdk/client-ses';
import { logger } from './utils';

const ses = new SESClient({});

// TEMPORARY: this sends Turner an email to confirm that an order was placed. Turner will
// then inspect the order in the DB to make sure everything looks correct.
export async function send_order_confirmation_email (email) {

  const html =
    `
    <div style="text-align: center">
      <h1 style="font-size: 38px">${email} has placed an order</h1>
    </div>
  `

  await sendEmail(html, 'Order placed', ['doubleujabbour@gmail.com'])
}

async function sendEmail(html, subject, target_emails, source = 'turner') {
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
    Source: `Seshi <${source}@cannonemployeestore.com>`,
  });

  try {
    await ses.send(command);
  }
  catch (e) {
    logger.info(e)
  }
}