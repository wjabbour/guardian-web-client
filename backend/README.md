## Deployment

The deployment setup is a little complicated here for historical reasons.

There are two AWS accounts - Cannon and Guardian. Cannon owns the Cannon account and Guardian owns the Guardian account. There are two sets of resources - Cannon and Guardian. The Cannon web client is configured to interact with resources in the Cannon account and all other websites are configured to interact with resources in the Guardian account. However, this same code base is deployed to both accounts, which means the code needs to be written so that it is compatible with both accounts.

The Terraform state S3 and Dynamo for both Cannon and Guardian are in the Guardian account. The Cannon account has an IAM role that the Guardian IAM user assumes to deploy resources to the Cannon account.