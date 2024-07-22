import * as cdk from "aws-cdk-lib";
import * as gd from "aws-cdk-lib/aws-guardduty";
import * as sechub from "aws-cdk-lib/aws-securityhub";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class SecurityToolStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const guardduty = new gd.CfnDetector(this, "cncfHackGuarddutyDetect", {
      enable: true,
      features: [
        {
          name: "EKS_AUDIT_LOGS",
          status: "ENABLED",
        },
        {
          name: "RUNTIME_MONITORING",
          additionalConfiguration: [
            {
              name: "EKS_ADDON_MANAGEMENT",
              status: "ENABLED",
            },
          ],
          status: "ENABLED",
        },
      ],
    });

    const securityHub = new sechub.CfnHub(this, "cncfHackSechubEnable", {
      enableDefaultStandards: true,
    });
  }
}
