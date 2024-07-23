#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { EksStack } from '../lib/eks';
import { CNCFHackIamRolesStack } from '../lib/iam-roles';
import { SecurityToolStack } from '../lib/security-stack';
import { cncfHackCommandAndControlStack } from '../lib/c&c';

const app = new cdk.App();

new CNCFHackIamRolesStack(app, 'CNCFHackIamRolesStack')
new SecurityToolStack(app, 'cncfhack-security-tool-stack')
new EksStack(app, 'cncfhack-eks');
new cncfHackCommandAndControlStack(app, 'cncfhack-c2')