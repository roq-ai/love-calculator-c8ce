import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware, notificationHandlerMiddleware } from 'server/middlewares';
import { errorLogsValidationSchema } from 'validationSchema/error-logs';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  const allowed = await prisma.error_logs
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
      return getErrorLogsById();
    case 'PUT':
      return updateErrorLogsById();
    case 'DELETE':
      return deleteErrorLogsById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getErrorLogsById() {
    const data = await prisma.error_logs.findFirst(convertQueryToPrismaUtil(req.query, 'error_logs'));
    return res.status(200).json(data);
  }

  async function updateErrorLogsById() {
    await errorLogsValidationSchema.validate(req.body);
    const data = await prisma.error_logs.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
  async function deleteErrorLogsById() {
    await notificationHandlerMiddleware(req, req.query.id as string);
    const data = await prisma.error_logs.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
