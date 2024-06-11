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

### AWS CLI v2
The AWS CLI is used to manage credentials that will be used by Terraform to interact with AWS. [This page](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) has instructions for setting up AWS CLI v2.


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
I may mention something called a `project root`. This is referring to the root directory of the project. The project is a giant folder, and it contains sub-folders of `client` and `backend`. Some commands, you will need to `cd` into the `client` folder and run them. Other commands, you may need to `cd` into the `backend` folder and run them. Some commands, you may need to run from the `project root`.

### git commands
git is relatively complex, but you will be using it in a very simple way. <br><br> **Run all git commands from the project root.**<br><br>

After you are done making all of the changes to the files and you have deployed all of the changes, you must update the history in git.

Run these three commands in this order (from the project root):
```
git add .
git commit -m "made changes"
git push
```

# Adding A New Site

## Buy the domain in GoDaddy
You must purchase a domain in GoDaddy. Go to godaddy.com, type in the name of the domain you want to use, don't buy any of the extra stuff they try and sell you. Once complete, you will have a domain name.

## Configure DNS
Now we need to make it so that we manage the DNS in AWS rather than in GoDaddy. Go to the AWS console, go to Route53, create a hosted zone. The hosted zone name needs to be the exact name of your domain. 

For example, if you purchase the domain "gpstivers.com" then you need to create a hosted zone and set its name to "gpstivers.com".

# Contributor

Turner Jabbour <br>
901-736-5273 <br>
doubleujabbour@gmail.com <br>

# Cloud Environment

Lambda, Dynamo, S3 and CloudFront are deployed in AWS account 732682028282.
Terraform state S3 is deployed in AWS account 671072365384.

S3 and CloudFront were deployed manually. Lambda and Dynamo are provisioned via Terraform.

# Paypal

We use the [Paypal JavaScript SDK](https://developer.paypal.com/sdk/js/reference/) to process payments.
