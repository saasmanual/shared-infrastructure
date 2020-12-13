# SaaS Manual shared infrastructure

This is the repository for all infrastructure which is shared between SaaS Manual services.

## Installation

Simply clone the repository and run `npm install` and you are ready to run the SaaS Manual stack.

## Infrastructure setup

To bootstrap a new environment, run `npm run cdk:bootstrap`. After you have done this, you can initiate the first deployment by running `npm run cdk:deploy`.
You only need to do this once, from hereon, any change to the infrastructure will be deployed through the pipeline.

NOTE: Make sure you change the profile defined in the package.json to match your profile.
