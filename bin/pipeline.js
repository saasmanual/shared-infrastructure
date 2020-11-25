#!/usr/bin/env node

const { App } = require('@aws-cdk/core');
const { PipelineStack } = require('../infra/stack/pipeline');

const app = new App();
new PipelineStack(app, 'Shared-Infrastructure-Pipeline', {
  stackName: 'Shared-Infrastructure-Pipeline',
  description: 'Pipeline stack for shared SaaS Manual infrastructure such as Route53.'
});

app.synth();