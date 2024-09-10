import { auth } from '@/@core/infra/auth';
import { NextResponse } from 'next/server';
import { container } from '@/@core/infra/container-registry';
import { ArchiveLinkUseCase } from '@/@core/application/useCases/ArchiveLink/ArchiveLinkUseCase';
import { ValidationError } from '@/@core/domain/errors/ValidationError';
import { RestoreLinkUseCase } from '@/@core/application/useCases/RestoreLink/RestoreLinkUseCase';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { message: 'User not authenticated' },
        { status: 401 }
      );
    }

    const data = await req.json();

    const useCase = data.archived
      ? container.get<ArchiveLinkUseCase>('ArchiveLinkUseCase')
      : container.get<RestoreLinkUseCase>('RestoreLinkUseCase');

    await useCase.execute({ id: params.id, userId: session.user.id });

    return NextResponse.json(
      {
        message: `Link ${
          data.archived ? 'archived' : 'unarchived'
        } successfully`,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: 'Failed to update link status' },
      { status: 500 }
    );
  }
}
