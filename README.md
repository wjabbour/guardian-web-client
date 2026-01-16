# Guardian Web Client

A full-stack e-commerce platform for managing custom product catalogs, orders, and store configurations. The application consists of a React frontend, AWS Lambda backend, and shared common utilities.

## Table of Contents

- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Development](#development)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Adding a New Site](#adding-a-new-site)
- [Contributors](#contributors)
- [Cloud Environment](#cloud-environment)
- [Payment Processing](#payment-processing)

## Project Overview

This monorepo contains:

- **Client**: React-based frontend application for browsing catalogs, managing carts, and processing orders
- **Backend**: AWS Lambda functions for order processing, authentication, and data management
- **Common**: Shared TypeScript utilities, types, configurations, and catalogs used by both client and backend

## Project Structure

```
guardian-web-client/
├── client/          # React frontend application
├── backend/         # AWS Lambda functions and Terraform infrastructure
├── common/          # Shared types, utilities, configs, and catalogs
└── scripts/         # Utility scripts
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) and npm
- **Git** - [Download Git](https://git-scm.com/download)
- **VS Code** (recommended) - [Download VS Code](https://code.visualstudio.com/download)
- **AWS CLI** - Configured with appropriate credentials
- **Terraform** (for backend infrastructure)

### Verifying Installation

Open a terminal and verify your installations:

```bash
git --version
node --version
npm --version
aws --version
terraform --version
```

## Getting Started

### Clone the Repository

1. Navigate to your desired directory (e.g., `~/source` or `C:\Users\YourName\source`)
2. Clone the repository:

```bash
git clone https://github.com/wjabbour/guardian-web-client.git
cd guardian-web-client
```

### Install Dependencies

Install dependencies for all packages:

```bash
# Install common package dependencies
cd common
npm install
npm run build
cd ..

# Install client dependencies
cd client
npm install
cd ..

# Install backend dependencies
cd backend
npm install
cd ..
```

## Development

### Running the Client Locally

From the `client` directory:

```bash
npm start
```

The application will start on `http://localhost:3000` with hot-reloading enabled.

### Building the Client

```bash
cd client
npm run build
```

### Running Backend Locally

The backend uses AWS Lambda functions. For local development, you can use tools like [SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html) or [Serverless Framework](https://www.serverless.com/).

### Project Root

Many commands need to be run from specific directories:
- **Project root**: The main `guardian-web-client` directory
- **Client commands**: Run from `client/` directory
- **Backend commands**: Run from `backend/` directory
- **Common package**: Run from `common/` directory

## Configuration

### Configs

Each site has its own configuration file in `common/configs/`. These files define:
- Store information and codes
- Account representatives
- Email settings
- Feature flags
- Route prefixes

See `common/configs/README.md` for detailed configuration options.

### Catalogs

Product catalogs are stored in `common/catalogs/`. Each site has its own catalog file containing:
- Product items with pricing
- Available sizes, colors, and options
- Embroidery and placement options

See `common/catalogs/README.md` for catalog structure details.

### Adding Logo Images

1. Download the logo as a `.png` or `.jpg` file
2. Move it to `client/public/images/`
3. Ensure the filename is all lowercase (e.g., `subaru.png`)
4. Logos should be relatively uniform in size for consistency

## Deployment

### Automatic Deployment

The site is automatically deployed via GitHub Actions whenever changes are pushed to the repository. The workflow:
1. Builds the common package
2. Builds the client application
3. Syncs files to S3
4. Invalidates CloudFront cache

### Manual Deployment

To manually deploy a specific site:

```bash
cd client
npm run deploy-{site-name}
```

For example:
```bash
npm run deploy-stivers
```

## Adding a New Site

Follow these steps to add a new site to the platform:

### 1. Purchase Domain in GoDaddy

1. Go to [GoDaddy.com](https://www.godaddy.com)
2. Search for and purchase your desired domain
3. Skip any additional services/upsells
4. Note: Louis Budbill manages the GoDaddy account for existing domains

### 2. Configure DNS in AWS Route 53

1. Sign into AWS Console as root user
2. Navigate to **Route 53**
3. Click **Create hosted zone**
4. Set the hosted zone name to your exact domain (e.g., `example.com`)
5. Ensure it's set as a **Public hosted zone**
6. Find the **NS** record in your zone (contains 4 nameserver values)

### 3. Update GoDaddy Nameservers

1. Sign into GoDaddy
2. Navigate to your domain's DNS settings
3. Go to **Nameservers** section
4. Click **Change Nameservers**
5. Select **"I'll use my own nameservers"**
6. Paste the 4 nameserver values from Route 53 (omit trailing periods)
7. Save changes

DNS management is now handled by AWS.

### 4. Create S3 Bucket

1. Navigate to **S3** in AWS Console
2. Click **Create bucket**
3. Set bucket name to your exact domain (e.g., `example.com`)
4. **Uncheck** "Block all public access"
5. Check the acknowledgement box
6. Click **Create bucket**

#### Configure Static Website Hosting

1. Open your bucket
2. Go to **Properties** tab
3. Scroll to **Static website hosting**
4. Click **Edit**
5. Enable static website hosting
6. Set both **Index document** and **Error document** to `index.html`
7. Save changes

#### Update Bucket Policy

1. Go to **Permissions** tab
2. Click **Bucket policy**
3. Add the following policy (replace `example.com` with your domain):

```json
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

### 5. Request SSL Certificate

1. Navigate to **Certificate Manager** in AWS Console
2. Click **Request certificate**
3. Select **Request a public certificate**
4. Enter your fully qualified domain name (e.g., `example.com`)
5. Choose **DNS validation - recommended**
6. Click **Request**

#### Validate Certificate

1. Navigate to your certificate request
2. Click **Create records in Route 53**
3. Wait a few minutes for validation
4. Refresh until status changes from "Pending Validation" to "Issued"

### 6. Create CloudFront Distribution

1. Navigate to **CloudFront** in AWS Console
2. Click **Create distribution**
3. Configure:
   - **Origin domain**: Select your S3 bucket URL (`{your_domain}.s3.amazonaws.com`)
   - **Allowed HTTP methods**: `GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE`
   - **Web Application Firewall**: `Do not enable security protections`
   - **Price class**: `Use only North America and Europe`
   - **Alternate domain name (CNAME)**: Your domain name
   - **Custom SSL certificate**: Select the certificate you just created
   - **Default root object**: `index.html`
4. **Note the Distribution ID** (e.g., `E1YPW3JQQ2QQ81`)

#### Configure Error Pages

1. Navigate to your CloudFront distribution
2. Go to **Error pages** tab
3. Click **Create custom error response**
4. Configure:
   - **HTTP error code**: `403`
   - **Customize error response**: `Yes`
   - **Response page path**: `/`
   - **HTTP Response code**: `200`
5. Save

### 7. Create Route 53 DNS Record

1. Navigate to **Route 53**
2. Open your domain's hosted zone
3. Click **Create record**
4. Configure:
   - **Record name**: Leave blank
   - **Record type**: A
   - **Alias**: Enable
   - **Route traffic to**: `Alias to CloudFront distribution`
   - **CloudFront distribution**: Select your distribution
5. Click **Create records**

### 8. Update Client Package.json

Add a new deployment script in `client/package.json`:

```json
{
  "scripts": {
    "deploy": "npm run deploy-stivers && npm run deploy-example",
    "deploy-stivers": "npm run build && aws s3 sync build s3://gpstivers.com/ --delete && aws cloudfront create-invalidation --distribution-id EEZ12WJWK62SX --paths \"/*\"",
    "deploy-example": "npm run build && aws s3 sync build s3://example.com/ --delete && aws cloudfront create-invalidation --distribution-id {YOUR_DISTRIBUTION_ID} --paths \"/*\"",
    "start": "react-scripts start",
    "build": "react-scripts build"
  }
}
```

Replace:
- `example.com` with your domain
- `{YOUR_DISTRIBUTION_ID}` with your CloudFront distribution ID

### 9. Create Configuration Files

1. Create a new config file: `common/configs/{site-name}.js`
2. Create a new catalog file: `common/catalogs/{site-name}.js`
3. See existing configs/catalogs for structure examples
4. Reference `common/configs/README.md` for configuration options

## Git Workflow

**Always run git commands from the project root.**

After making changes and deploying:

```bash
git add .
git commit -m "Description of changes"
git push
```

This updates the project history and pushes to GitHub, ensuring your code is backed up in the cloud.

## Tips & Tricks

### Navigation Commands

- `cd folder-name` - Enter a folder
- `cd ..` - Go back to parent folder
- `cd ~` - Go to home directory
- `pwd` (Linux/Mac) or `cd` (Windows) - Show current directory

### Common Issues

- **Module not found errors**: Ensure you've built the common package (`cd common && npm run build`)
- **Build failures**: Check that all dependencies are installed (`npm install` in each directory)
- **Deployment issues**: Verify AWS credentials are configured (`aws configure`)

## Contributors

- **Shanell Williams**  
  Email: swilliams@gpcorp.com

- **Turner Jabbour**  
  Phone: 901-736-5273  
  Email: doubleujabbour@gmail.com

## Cloud Environment

### AWS Account

All infrastructure is deployed in AWS account: **732682028282**

### Infrastructure Components

- **S3 & CloudFront**: Deployed manually via AWS Console
- **Lambda, API Gateway, DynamoDB**: Provisioned via Terraform
- **Terraform State**: Managed in AWS

### Services Used

- **S3**: Static website hosting
- **CloudFront**: CDN and HTTPS termination
- **Lambda**: Serverless backend functions
- **API Gateway**: REST API endpoints
- **DynamoDB**: Order and data storage
- **Route 53**: DNS management
- **Certificate Manager**: SSL/TLS certificates
- **Secrets Manager**: Secure credential storage

## Payment Processing

We use the [PayPal JavaScript SDK](https://developer.paypal.com/sdk/js/reference/) to process payments. The integration handles:
- Order creation and capture
- Payment validation
- Order confirmation emails

---

For questions or issues, please contact the contributors listed above.
