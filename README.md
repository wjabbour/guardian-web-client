# Required Tools to Deploy Site

### VSCode

VSCode is basically an advanced text editor. It makes viewing and updating the source code much easier. Go [here](https://code.visualstudio.com/download) to download VSCode.

### Node

Node is a JavaScript runtime and also includes the package manager `npm`. `npm` is used to install all of the packages needed to run the site.

Follow [these instructions](https://nodejs.org/en/download/package-manager) to install Node for your operating system.

### Terraform

Terraform is a tool that takes care of deploying the resources to AWS that make the site functional, e.g. the database.

Download the appropriate binary [here](https://developer.hashicorp.com/terraform/install) (if you have 32-bit Windows you should use `386`, if you have 64-bit Windows you should use `AMD64`).

Once downloaded, unzip the compressed file, and move the Terraform binary (file ending with `.exe` extension) to your `C:\Apps\Terraform` folder (you may need to create this folder).

Once that is complete, you will need to update your PATH environment variable (this tells Windows where binaries are found on your operation system).

Check out [this StackOverflow post](https://stackoverflow.com/questions/1618280/where-can-i-set-path-to-make-exe-on-windows) for more information.

### git

git is a version control system. You will use this to save changes that you make to the website configurations. Go [here](https://git-scm.com/download/win) to download the appropriate version of git for your operating system (be sure to choose correctly between 32-bit and 64-bit).

### GitHub

The code is deployed on GitHub. You must download and install git to interact with GitHub. Go to github.com and create an account or sign in. The code is available [here](https://github.com/wjabbour/stivers).

First, in your shell, navigate to where you want this code to be stored on your file system. You will be going here whenever you want to run commands to deploy the site so make sure its convenient. Personally, I create a folder named `source` and put it directly under my user folder. So the path to the codebase ends up being `C/Users/wjabbour/source/stivers`.

So in that case, I first navigate to the `source` directory.

Type `git clone https://github.com/wjabbour/stivers.git`. Now `cd` into the `stivers` directory so that you're ready to run subsequent commands. Done!

### AWS CLI v2

The AWS CLI is used to manage credentials that will be used by Terraform to interact with AWS. [This page](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) has instructions for setting up AWS CLI v2.

The AWS access key and secret key will need to be securely shared with you.

With the cli installed, run the command `aws configure`. For "AWS Access Key ID" enter the AWS access key. For "AWS Secret Access Key" enter the secret key. For "Default region name" enter `us-east-1`. For "Default output format" enter `json`. Your local AWS profile has now been created.

### Ready To Go?

Open up PowerShell and try checking the version number of the programs to ensure installation was performed successfully. If you get a message saying something like "could not recognize that command" then something is wrong.

```
git -v
aws --version
terraform -v
node -v
```

# Tips & Tricks

### cd command

The `cd` command is used to move around your file system. Say you are currently in folder `A`, folder `A` contains folders `B` and `C`. If you wanted to run a program (`.exe` file) in folder `C`, you will first need to move to folder `C`.

```
cd C
```

Now you are in folder `C` and you can run the program. If you want to go back to the parent folder (folder `A`):

```
cd ..
```

`cd ..` always navigates you to the parent folder of the current folder you are in.

### project root

I may mention something called a `project root`. This is referring to the root directory of the project. The project is a giant folder, and it contains sub-folders of `client` and `backend`. For some commands, you will need to `cd` into the `client` folder and run them. Other commands, you may need to `cd` into the `backend` folder and run them. Some commands, you may need to run from the `project root`. You will need to use the `cd` command to navigate through the folders.

### git commands

git is relatively complex, but you will be using it in a very simple way. <br><br> **Run all git commands from the project root.**<br><br>

After you are done making all of the changes to the files and you have deployed all of the changes, you must update the history in git.

Run these three commands in this order (from the project root):

```
git add .
git commit -m "made changes"
git push
```

This updates the history of the project and pushes this new project history to an external server hosted by GitHub. This way, if your computer ever blows up, you will always have a copy of the codebase available in the cloud.

# Adding A New Site

### Buy the domain in GoDaddy

You must purchase a domain in GoDaddy. Go to GoDaddy.com, type in the name of the domain you want to use, don't buy any of the extra stuff they try and sell you. Once complete, you will have a domain name. Louis Budbill has the GoDaddy account where all domains have been purchased so far.

### Configure DNS

Now we need to make it so that we manage the DNS in AWS rather than in GoDaddy.

Sign into the AWS console as a root user (Louis Budbill has the sign-in information), type Route 53 in the search bar, create a hosted zone. The hosted zone name needs to be the exact name of your domain. For example, if you purchase the domain `gpstivers.com` then you need to create a hosted zone and set its name to `gpstivers.com`. Make sure the hosted zone is a public hosted zone.

A hosted zone is a container for DNS records. Find the DNS record in your zone with type "NS". GoDaddy will need to know the values for this record.

Sign into GoDaddy and find the domain that you just purchased. GoDaddy's website may change over time so I won't list the exact steps, but you need to find the DNS settings for the domain. Once you are viewing the DNS settings for the domain, navigate to the DNS settings for the Nameservers. Click "Change Nameservers". Click "I'll use my own nameservers". Here is where we will paste the nameserver values from our DNS `NS` record in Route 53. The Route 53 record contains four nameserver values and we will need to enter all four here. Be sure to omit the trailing period character from each of the four nameserver values as you paste them into GoDaddy.

We have now completed the process of transferring DNS management from GoDaddy to AWS.

### Setup S3

Now we need to create an S3 bucket. Type S3 in the search bar in your AWS console. Click "create bucket". The S3 bucket name needs to be the exact name of your domain. For example, if you purchase the domain `gpstivers.com` then you need to create an S3 bucket and set its name to `gpstivers.com`.

Uncheck the box that indicates this S3 bucket should block all public access. Check the acknowledgement box that you are aware this is making your S3 bucket public.

Navigate to your newly created bucket. Click the "Properties" button. Scroll down to "Static website hosting" and enable it. Set both index document and error document to "index.html" and save changes.

The last step is to modify the permissions. Click the "Permissions" button. Update the bucket policy:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::example.com/*"
        }
    ]
}
```

Be sure to put your domain name in place of `example.com`.

### Setup Certificates

Now we need to create a HTTPS certificate for the website. Type Certificate Manager in the search bar in your AWS console. Click "Request certificate". Request a public certificate. Enter your fully qualified domain name (e.g. `example.com`). Choose `DNS validation - recommended` as your validation method. Keep other all settings the same and click `Request`.

We have now requested a certificate from AWS. To receive that certificate, we need to prove that we own `example.com`. Navigate to that certificate you requested (you may need to refresh page to see it). Click `Create records in Route 53`. From here, the ownership verification process may take a few minutes, but is fully automated. Refresh the page every few minutes until you see the status of the certificate change from "Pending Validation" to "Issued". Once the certificate has been issued, this step is complete.

### Setup Cloudfront

Now we need to create a Cloudfront distribution. Type Cloudfront in the search bar in your AWS console. Click "Create distribution". For origin name, select the S3 bucket URL of the bucket you just created which should have the format of `{your_domain}.s3.amazonaws.com`.

Update `Allowed HTTP methods` to `GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE`. Click `Do not enable security protections` under `Web Application Firewall`. For `Price class` select `Use only North America and Europe`. For `Alternate domain name (CNAME) - optional` input your domain name. For `Custom SSL certificate - optional` choose the certificate that was just issued. For `Default root object - optional` put `index.html`. Take note of this distribution ID (which looks something like `E1YPW3JQQ2QQ81`).

Once the distribution has been created, navigate to the distribution in the AWS console. Under `Error pages`, click the `Create custom error response` button on the right. For `HTTP error code`, select 403. For `Customize error response` select `Yes`. For `Response page path` put `/`. For `HTTP Response code` select `200`.

### Hook up Cloudfront to Route 53

Now we need to create a DNS record in Route 53 that points to this Cloudfront distribution. Once setup, when users enter your domain in the browser URL bar, it will go to the Cloudfront distribution which will respond with the contents of the S3 bucket (our website).

Go to Route 53. Go to the hosted zone for your domain. Click `Create record`. Leave `Record name` blank. Enable the `Alias` checkbox. Set `Route traffic to` to `Alias to Cloudfront distribution`. For the second select box, choose the CloudFront distribution that was just created. Click `Create records`.

### client/package.json

We need to update some lines under `scripts`.

If scripts looks like this:

```
"scripts": {
    "deploy": "npm run deploy-stivers",
    "deploy-stivers": "npm run build && aws s3 cp build s3://gpstivers.com/ --recursive && aws cloudfront create-invalidation --distribution-id EEZ12WJWK62SX --paths \"/*\"",
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```

then you need to update it like so:

```
"scripts": {
    "deploy": "npm run deploy-stivers && npm run deploy-example",
    "deploy-stivers": "npm run build && aws s3 cp build s3://gpstivers.com/ --recursive && aws cloudfront create-invalidation --distribution-id EEZ12WJWK62SX --paths \"/*\"",
    "deploy-example": "npm run build && aws s3 cp build s3://{your_domain}/ --recursive && aws cloudfront create-invalidation --distribution-id {cloudfront_distribution_id} --paths \"/*\"",
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```

`your_domain` needs to be the value of your domain, e.g. `example.com`. The `cloudfront_distribution_id` needs to be the ID that you took note of earlier. You can always go back and view your distribution ID by going to CloudFront in AWS.

## Configs

Each site has its own stores, store codes, embroideries, etc. The configuration for each site is stored in a separate config file in `{project_root}/common/configs`.

More information about the configs and what the configuration options determine can be found in `{project_root/common/configs/README.md}`.

## Catalogs

Each site has its own catalogs. The catalog for each site is stored in `{project_root}/common/catalogs`.

More information about the catalogs can be found in `{project_root/common/configs/README.md}`.

## Uploading the logo pictures

To upload a logo picture, download a .png or .jpg file of the logo to your computer. Move that file from your Downloads folder to `{project_root}/client/public/images`. Ensure the filename is all lowercase. For example, for the Subaru logo, there is the file `{project_root}/client/public/images/subaru.png`. Ideally the logos you use are relatively uniform in size. If not, I can manually resize them.

## Deploying the site

With everything complete, we are ready to deploy. Deployment is the process of taking all of your local changes and pushing them to the cloud to update what the end users will interact with. We must deploy the client code (which will update the website in the users browser) and the backend code (which receives requests from the client and performs actions).

From the project root, run `git pull`. This will ensure that you have all of the latest code before you make any changes.

From the project root, `cd` into the client directory and run `npm run deploy`. This will take a few minutes.

Move back to the project root and `cd` into the backend directory and run `npm run deploy`. This will take a few minutes.

# Contributors

Shannel Williams <br>
shannel@gpcorp.com <br>
Turner Jabbour <br>
901-736-5273 <br>
doubleujabbour@gmail.com <br>

# Cloud Environment

Lambda, Dynamo, S3, CloudFront, and Terraform state are deployed in AWS account 732682028282.

S3 and CloudFront were deployed manually. Lambda, API Gateway, Dynamo are provisioned via Terraform.

# Paypal

We use the [Paypal JavaScript SDK](https://developer.paypal.com/sdk/js/reference/) to process payments.