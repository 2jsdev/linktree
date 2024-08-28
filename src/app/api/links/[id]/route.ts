import { auth } from "@/@core/infra/auth";
import { NextResponse } from "next/server";
import { container } from "@/@core/infra/container-registry";
import { UpdateLinkUseCase } from "@/@core/application/useCases/UpdateLink/UpdateLinkUseCase";
import { RemoveLinkUseCase } from "@/@core/application/useCases/RemoveLink/RemoveLinkUseCase";
import { ValidationError } from "@/@core/domain/errors/ValidationError";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("User not authenticated");
    }

    const data = await req.json();

    const updateLinkUseCase =
      container.get<UpdateLinkUseCase>("UpdateLinkUseCase");

    const updatedLink = await updateLinkUseCase.execute({
      id: params.id,
      ...data,
      userId: session.user.id,
    });

    return NextResponse.json(updatedLink.toPlainObject(), { status: 200 });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Failed to update link" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("User not authenticated");
    }

    const removeLinkUseCase =
      container.get<RemoveLinkUseCase>("RemoveLinkUseCase");

    await removeLinkUseCase.execute({ id: params.id, userId: session.user.id });

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Failed to delete link" },
      { status: 500 }
    );
  }
}
