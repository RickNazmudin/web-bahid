import prisma from "@/lib/prisma";

export interface CreateAuditLogParams {
  userId?: string | null;
  action: string;
  entity: string;
  entityId?: string | null;
  details?: Record<string, unknown> | string | null;
  ipAddress?: string | null;
}

export async function createAuditLog(params: CreateAuditLogParams) {
  try {
    const detailsString =
      typeof params.details === "object" && params.details !== null
        ? JSON.stringify(params.details)
        : params.details || null;

    return await prisma.auditLog.create({
      data: {
        userId: params.userId || null,
        action: params.action,
        entity: params.entity,
        entityId: params.entityId || null,
        details: detailsString,
        ipAddress: params.ipAddress || null,
      },
    });
  } catch (error) {
    console.error("Failed to write audit log:", error);
    return null;
  }
}
