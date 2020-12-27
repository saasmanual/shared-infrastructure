const { Stack } = require('@aws-cdk/core');
const { PublicHostedZone, MxRecord, TxtRecord, CnameRecord } = require('@aws-cdk/aws-route53');
const { DnsValidatedCertificate } = require('@aws-cdk/aws-certificatemanager');

class Dns extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const domainName = this.node.tryGetContext('domainName');
    const certificateAlternativeNames = this.node.tryGetContext('certificateAlternativeNames');
    
    // [embed: stack-public-hosted-zone]
    const zone = new PublicHostedZone(this, 'hosted-zone', {
      zoneName: domainName
    });

    new DnsValidatedCertificate(this, 'certificate', {
      domainName,
      subjectAlternativeNames: [certificateAlternativeNames],
      hostedZone: zone
    });
    // [/embed]

    // Google
    new MxRecord(this, 'google-mail-mx', {
      zone,
      values: [{
        hostName: 'ASPMX.L.GOOGLE.COM',
        priority: 1
      }, {
        hostName: 'ALT1.ASPMX.L.GOOGLE.COM',
        priority: 5
      }, {
        hostName: 'ALT2.ASPMX.L.GOOGLE.COM',
        priority: 5
      }, {
        hostName: 'ALT3.ASPMX.L.GOOGLE.COM',
        priority: 10
      }, {
        hostName: 'ALT4.ASPMX.L.GOOGLE.COM',
        priority: 10
      }]
    });

    new TxtRecord(this, 'google-verification-record', {
      zone: zone,
      recordName: `saasmanual.com`,
      values: ['google-site-verification=ZUuhNw3ibgEF9x7ka2bTyHt72PXADfk2xZdVYr7roxg']
    });
  }
}

module.exports = {
  Dns
}
