import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { folderValidationSchema } from 'validationSchema/folders';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getFolders();
    case 'POST':
      return createFolder();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getFolders() {
    const data = await prisma.folder
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'folder'));
    return res.status(200).json(data);
  }

  async function createFolder() {
    await folderValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.document?.length > 0) {
      const create_document = body.document;
      body.document = {
        create: create_document,
      };
    } else {
      delete body.document;
    }
    const data = await prisma.folder.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
