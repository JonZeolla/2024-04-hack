import * as cdk from "aws-cdk-lib";
import * as eks from "aws-cdk-lib/aws-eks";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as iam from "aws-cdk-lib/aws-iam";
import { KubectlV29Layer } from "@aws-cdk/lambda-layer-kubectl-v29";
import { Construct } from "constructs";

export class EksStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const eksCluster = new eks.Cluster(this, "Cluster", {
      version: eks.KubernetesVersion.V1_29,
      kubectlLayer: new KubectlV29Layer(this, "kubectlLayer"),
      defaultCapacity: 0,
      defaultCapacityInstance: ec2.InstanceType.of(
        ec2.InstanceClass.T2,
        ec2.InstanceSize.MEDIUM,
      ),
      clusterLogging: [
        eks.ClusterLoggingTypes.API,
        eks.ClusterLoggingTypes.AUTHENTICATOR,
        eks.ClusterLoggingTypes.AUDIT,
      ],
    });

    const tonyRole = iam.Role.fromRoleArn(
      this,
      "tonyRoleLookup",
      "arn:aws:iam::637423320304:role/CNCFHackIamRolesStack-Tony3B148DFD-pZuukCS7glMG",
    );
    const ricoRole = iam.Role.fromRoleArn(
      this,
      "ricoRolelookup",
      "arn:aws:iam::637423320304:role/CNCFHackIamRolesStack-Tony3B148DFD-pZuukCS7glMG",
    );

    // TODO:migrate away from this
    const dakotaRole = iam.Role.fromRoleArn(
      this,
      "dakotaRoleLookup",
      "arn:aws:iam::637423320304:role/OrganizationAccountAccessRole",
    );

    eksCluster.awsAuth.addMastersRole(tonyRole, "tony-cncfhack");
    eksCluster.awsAuth.addMastersRole(ricoRole, "rico-cncfhack");
    eksCluster.awsAuth.addMastersRole(dakotaRole, "dakota-cncfhack");
  }
}
