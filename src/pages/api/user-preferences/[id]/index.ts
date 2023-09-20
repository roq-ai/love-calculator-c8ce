import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware, notificationHandlerMiddleware } from 'server/middlewares';
import { userPreferencesValidationSchema } from 'validationSchema/user-preferences';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  const allowed = await prisma.user_preferences
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  if (!allowed) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  switch (req.method) {
    case 'GET':
      return getUserPreferencesById();
    case 'PUT':
      return updateUserPreferencesById();
    case 'DELETE':
      return deleteUserPreferencesById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getUserPreferencesById() {
    const data = await prisma.user_preferences.findFirst(convertQueryToPrismaUtil(req.query, 'user_preferences'));
    return res.status(200).json(data);
  }

  async function updateUserPreferencesById() {
    await userPreferencesValidationSchema.validate(req.body);
    const data = await prisma.user_preferences.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
  async function deleteUserPreferencesById() {
    await notificationHandlerMiddleware(req, req.query.id as string);
    const data = await prisma.user_preferences.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
