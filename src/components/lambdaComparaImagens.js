/*
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

*/

import { RekognitionClient, CompareFacesCommand } from "@aws-sdk/client-rekognition";
export const handler = async (event) => {
const { image1, image2 } = JSON.parse(event.body);

// Eliminar el prefijo "data:image/jpeg;base64," o "data:image/png;base64,"
const cleanBase64Image1 = image1.replace(/^data:image\/\w+;base64,/, '');
const cleanBase64Image2 = image2.replace(/^data:image\/\w+;base64,/, '');

// Convertir las imágenes limpias a Buffer
const image1Bytes = Buffer.from(cleanBase64Image1, 'base64');
const image2Bytes = Buffer.from(cleanBase64Image2, 'base64');

const REGION = "us-east-1";
const config = {
    region: REGION,
    credentials: {
        accessKeyId: 'AKIAZTDBOL5IL6L7F4N5',
        secretAccessKey: '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'
    }
};

const client = new RekognitionClient(config);
const params_ = {
    SimilarityThreshold: 90,
    SourceImage: { Bytes: image1Bytes },
    TargetImage: { Bytes: image2Bytes }
};

try {
    const command = new CompareFacesCommand(params_);
    const response = await client.send(command);

    // Procesar la respuesta para generar un mensaje adecuado
    const { FaceMatches, SourceImageFace, UnmatchedFaces } = response;

    let message = '';
    if (FaceMatches.length > 0) {
        message = `Se encontraron las siguientes coincidencias: ${FaceMatches.length}.`;
        FaceMatches.forEach((match, index) => {
            message += ` Coincidencia ${index + 1}: ${match.Similarity.toFixed(2)}%`;
            message += `, BoundingBox: ${JSON.stringify(SourceImageFace.BoundingBox)}`;
        });
    } else {
        message = 'No se detectó ninguna coincidencia de estas imágenes.';
    }

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
        body: JSON.stringify({
            message,
        }),
    };

} catch (error) {
    console.log('UPS algo salió mal', error);
    return {
        statusCode: 500,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
        body: JSON.stringify({
            message: 'Hubo un error al procesar la comparación de imágenes.',
        }),
    };
}
};
