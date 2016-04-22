# UniqLeads.com Middleman Static Website

## Prerequisites

brew install imagemagick

## To run locally

gem install bundler

git clone git@github.com:iamlos/uniqleads.git

cd 

bundle install

middleman server

## Build a production build

middleman build

## Deploy

AWS_ACCESS_KEY_ID=xxxxxxx AWS_SECRET_ACCESS_KEY=yyyyyy middleman s3_sync


## AWS keys

Get your AWS keys from the AWS console:

https://signin.aws.amazon.com/console

Go to IAM (Identity and Access Management) > Users > you > Manage Access Keys

There, you can create or rotate your access keys.

