import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { folderValidationSchema } from 'validationSchema/folders';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.folder
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getFolderById();
    case 'PUT':
      return updateFolderById();
    case 'DELETE':
      return deleteFolderById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getFolderById() {
    const data = await prisma.folder.findFirst(convertQueryToPrismaUtil(req.query, 'folder'));
    return res.status(200).json(data);
  }

  async function updateFolderById() {
    await folderValidationSchema.validate(req.body);
    const data = await prisma.folder.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteFolderById() {
    const data = await prisma.folder.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
