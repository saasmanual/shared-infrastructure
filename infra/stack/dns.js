const { Stack } = require('@aws-cdk/core');
const { PublicHostedZone } = require('@aws-cdk/aws-route53');
const { DnsValidatedCertificate } = require('@aws-cdk/aws-certificatemanager');

class Dns extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const domainName = this.node.tryGetContext('domainName');
    const certificateAlternativeNames = this.node.tryGetContext('certificateAlternativeNames');
    
    const zone = new PublicHostedZone(this, 'hosted-zone', {
      zoneName: domainName
    });

    new DnsValidatedCertificate(this, 'certificate', {
      domainName,
      subjectAlternativeNames: [certificateAlternativeNames],
      hostedZone: zone
    });
  }
}

module.exports = {
  Dns
}