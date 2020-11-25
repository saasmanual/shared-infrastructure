const { Artifact } = require('@aws-cdk/aws-codepipeline');
const { CdkPipeline, SimpleSynthAction } = require('@aws-cdk/pipelines');
const { Stack, SecretValue } = require('@aws-cdk/core');
const { GitHubSourceAction, GitHubTrigger } = require('@aws-cdk/aws-codepipeline-actions');
const { Application } = require('../stage/application');

class PipelineStack extends Stack {
  constructor(app, id, props) {
    super(app, id, props);

    const sourceArtifact = new Artifact('src');
    const cloudAssemblyArtifact = new Artifact('asmb');
    const { owner, name, secretArn, branch } = this.node.tryGetContext('repo');

    const pipeline = new CdkPipeline(this, 'Shared-Infrastructure', {
      pipelineName: 'Shared-Infrastructure',
      cloudAssemblyArtifact,

      sourceAction: new GitHubSourceAction({
        actionName: 'GitHub',
        owner,
        branch,
        repo: name,
        oauthToken: SecretValue.secretsManager(secretArn, {
          jsonField: 'github-token'
        }),
        output: sourceArtifact,
        trigger: GitHubTrigger.WEBHOOK
      }),
      synthAction: new SimpleSynthAction({
        sourceArtifact,
        cloudAssemblyArtifact,
        installCommand: 'npm ci',
        synthCommand: 'npx cdk synth',
      })
    });

    const application = new Application(this, 'Shared-Infrastructure-Production', {
      stageName: 'Production',
      description: 'Shared infrastructure application stack running in us-east-1.'
    });

    pipeline.addApplicationStage(application);
  }
}

module.exports = { PipelineStack }