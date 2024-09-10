import { auth } from '@/@core/infra/auth';
import { NextResponse } from 'next/server';
import { container } from '@/@core/infra/container-registry';
import { ReorderLinksUseCase } from '@/@core/application/useCases/ReorderLinks/ReorderLinksUseCase';
import { ValidationError } from '@/@core/domain/errors/ValidationError';

export async function PATCH(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { message: 'User not authenticated' },
        { status: 401 }
      );
    }

    const data = await req.json();

    const reorderLinksUseCase = container.get<ReorderLinksUseCase>(
      'ReorderLinksUseCase'
    );

    await reorderLinksUseCase.execute({
      userId: session.user.id,
      links: data.links,
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: 'Failed to reorder links' },
      { status: 500 }
    );
  }
}
