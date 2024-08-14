import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {Bucket, CfnBucket, EventType} from "aws-cdk-lib/aws-s3";
import {Queue} from "aws-cdk-lib/aws-sqs";
import {SqsDestination} from "aws-cdk-lib/aws-s3-notifications";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class HelloCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

  //L1 and L2 Constructs of a S3 bucket
    const level1S3Bucket = new CfnBucket(this, 'MyFirstLevel1S3ConstructBucket',  {
      versioningConfiguration: {
        status:'Enabled'
      }
    })
    const level2S3Bucket = new Bucket(this, 'MyFirstLevel2S3ConstructBucket', {
      bucketName:'myfirstlevel2construct',
      versioned: true
    })

    const queue = new Queue(this, 'MyQueue',  {
      queueName: 'MyQueue',
    })

    //send a notification when there is an update in S3 bucket
    level2S3Bucket.addEventNotification(EventType.OBJECT_CREATED_COPY, new SqsDestination(queue))
  }
}
