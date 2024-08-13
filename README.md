# compareFacesWithAwsRekognition
Permite enviar dos fotografias a una api desplegada en lambda en AWS para que por medio de Rekognition determine si es la misma persona

Lambda que recibe las imagenes y prepara todo lo necesario
para que se comparen mediante AWS ReKognition con una efectividad
de similitud de 90% en adelante.
Fecha: 13 Agosto 2024
Version: 0.0.1
Framework: NodeJS V20.123
Autor: Victor Munoz
Proyecto: Preparacion para proyecto Movilidad


Configuraciones para despliegue:
Funcion tipo: Lambda
Rol: 
    role-user-rekognition 
Politicas:
    AmazonAPIGatewayPushToCloudWatchLogs
    {
        "Version": "2012-10-17",
        "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:DescribeLogGroups",
                "logs:DescribeLogStreams",
                "logs:PutLogEvents",
                "logs:GetLogEvents",
                "logs:FilterLogEvents"
            ],
            "Resource": "*"
        }
        ]
    }
    
    AmazonRekognitionFullAccess
    {
        "Version": "2012-10-17",
        "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "rekognition:*"
            ],
            "Resource": "*"
        }
        ]
    }
    
    AWSLambda_FullAccess
    {
    "Version": "2012-10-17",
    "Statement": [
    {
        "Effect": "Allow",
        "Action": [
            "cloudformation:DescribeStacks",
            "cloudformation:ListStackResources",
            "cloudwatch:ListMetrics",
            "cloudwatch:GetMetricData",
            "ec2:DescribeSecurityGroups",
            "ec2:DescribeSubnets",
            "ec2:DescribeVpcs",
            "kms:ListAliases",
            "iam:GetPolicy",
            "iam:GetPolicyVersion",
            "iam:GetRole",
            "iam:GetRolePolicy",
            "iam:ListAttachedRolePolicies",
            "iam:ListRolePolicies",
            "iam:ListRoles",
            "lambda:*",
            "logs:DescribeLogGroups",
            "states:DescribeStateMachine",
            "states:ListStateMachines",
            "tag:GetResources",
            "xray:GetTraceSummaries",
            "xray:BatchGetTraces"
        ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": "iam:PassRole",
            "Resource": "*",
            "Condition": {
                "StringEquals": {
                    "iam:PassedToService": "lambda.amazonaws.com"
                }
            }
        },
        {
            "Effect": "Allow",
            "Action": [
                "logs:DescribeLogStreams",
                "logs:GetLogEvents",
                "logs:FilterLogEvents"
            ],
            "Resource": "arn:aws:logs:*:*:log-group:/aws/lambda/*"
        }
        ]
    }

Trigger: API GATEWAY REST 6o5jy4b309.execute-api.us-east-1.amazonaws.com/dev/compareimages
Método POST
Stage DEV

