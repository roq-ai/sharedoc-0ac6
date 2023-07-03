import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { documentValidationSchema } from 'validationSchema/documents';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getDocuments();
    case 'POST':
      return createDocument();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getDocuments() {
    const data = await prisma.document
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'document'));
    return res.status(200).json(data);
  }

  async function createDocument() {
    await documentValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.interaction?.length > 0) {
      const create_interaction = body.interaction;
      body.interaction = {
        create: create_interaction,
      };
    } else {
      delete body.interaction;
    }
    if (body?.tag?.length > 0) {
      const create_tag = body.tag;
      body.tag = {
        create: create_tag,
      };
    } else {
      delete body.tag;
    }
    const data = await prisma.document.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
