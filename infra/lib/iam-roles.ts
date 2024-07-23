import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CNCFHackIamRolesStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const jonRole = new iam.Role(this, "jonz", {
      assumedBy: new iam.AccountPrincipal("728412089767"),
    });
    const ricoRole = new iam.Role(this, "Rico", {
      assumedBy: new iam.AccountPrincipal("891376988429"),
    });

    const tonyRole = new iam.Role(this, "Tony", {
      assumedBy: new iam.AccountPrincipal("064850220344"),
    });

    const dakRole = new iam.Role(this, "Dakota", {
      assumedBy: new iam.AccountPrincipal("820872668201"),
    });

    ricoRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName("AdministratorAccess"),
    );
    tonyRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName("AdministratorAccess"),
    );
    jonRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName("AdministratorAccess"),
    );
    dakRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName("AdministratorAccess"),
    );
    new cdk.CfnOutput(this, "ricoRoleOutput", {
      value: ricoRole.roleArn,
    });

    new cdk.CfnOutput(this, "tonyRoleOutput", {
      value: tonyRole.roleArn,
    });

    new cdk.CfnOutput(this, "jonRoleOutput", {
      value: jonRole.roleArn,
    });

    new cdk.CfnOutput(this, "dakRoleOutput", {
      value: dakRole.roleArn,
    });
  }
}
