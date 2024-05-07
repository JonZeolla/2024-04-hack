import boto3
import json
from dateutil.tz import tzlocal
import datetime

def get_findings():

    client = boto3.client('guardduty')

    detectors_list = client.list_detectors()

    DetectorId = detectors_list['DetectorIds'][0]

    gd_findings = client.list_findings(
    DetectorId=DetectorId,
    FindingCriteria={
        'Criterion': {
            'service.archived': {
                'Eq': [
                    'false',
                ],
            }
        }
    }
    )

    response = client.get_findings(
        DetectorId=DetectorId,
        FindingIds=gd_findings["FindingIds"]
    )

    json_response = json.dumps(response,default=str)
    return json_response