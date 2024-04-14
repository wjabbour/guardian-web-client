# TODO

figure out paypal thing
deploy backend and test
add embroidery options

# Contributor

Turner Jabbour <br>
901-736-5273 <br>
doubleujabbour@gmail.com <br>

# Cloud Environment

Lambda, Dynamo, S3 and CloudFront are deployed in AWS account 732682028282.
Terraform state S3 is deployed in AWS account 671072365384.

S3 and CloudFront were deployed manually. Lambda and Dynamo are provisioned via Terraform.

# Catalog

The catalog is maintained manually in the code. Guardian tells me the items to add and the allowable colors, I then copy the photos from sanmar.com and update the catalog.ts.

# Paypal

We use the [Paypal JavaScript SDK](https://developer.paypal.com/sdk/js/reference/) to process payments.

# TODO:

- Proceed to checkout button greyed if cart size is 0
- Allow quantites to be modified in cart

- Have CRON that runs on Friday that sends email
- Delete old orders that are never paid via CRON job
