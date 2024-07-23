import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class cncfHackCommandAndControlStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const c2vpc = new ec2.Vpc(this, 'c&cvpc',{
        maxAzs: 1,
    })
    const commandAndControl = new ec2.BastionHostLinux(this, 'commandAndControlEc2', {
        vpc: c2vpc, 
        subnetSelection: {
            subnetType: ec2.SubnetType.PUBLIC
        }
    })

    commandAndControl.connections.allowFromAnyIpv4(ec2.Port.tcp(8080))
  }}
