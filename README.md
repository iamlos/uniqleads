# UniqLeads.com Middleman Static Website
GitHub issues:		https://img.shields.io/github/issues/iamlos/uniqleads.svg
GitHub forks:		https://img.shields.io/github/forks/iamlos/uniqleads.svg
GitHub stars:		https://img.shields.io/github/stars/iamlos/uniqleads.svg
Twitter:		https://img.shields.io/twitter/url/https/github.com/iamlos/uniqleads.svg?style=social

## Prerequisites

brew install imagemagick

## To run locally

gem install bundler

git clone git@github.com:iamlos/uniqleads.git

cd 

bundle exec bundle install

## Build a development livereload local page

bundle exec middleman server

# How to change the content
Changing the content is easy. The main pages are found in the root folder. 

Services and Industries pages can be found inside of the /sources directory.

The header, footer, and other reusuable components are located in the /partials directory

## Build a production build

bundle exec middleman build

## Deploy

AWS_ACCESS_KEY_ID=xxxxxxx AWS_SECRET_ACCESS_KEY=yyyyyy bundle exec middleman s3_sync


## AWS keys

Get your AWS keys from the AWS console:

https://signin.aws.amazon.com/console

Go to IAM (Identity and Access Management) > Users > you > Manage Access Keys

There, you can create or rotate your access keys.

