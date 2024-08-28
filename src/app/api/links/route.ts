import { auth } from "@/@core/infra/auth";
import { NextResponse } from "next/server";
import { container } from "@/@core/infra/container-registry";
import { GetUserLinkListUseCase } from "@/@core/application/useCases/GetUserLinkList/GetUserLinkListUseCase";
import { AddLinkUseCase } from "@/@core/application/useCases/AddLink/AddLinkUseCase";
import { ValidationError } from "@/@core/domain/errors/ValidationError";

export async function GET() {
  try {
    const GetUserLinkListUseCase = container.get<GetUserLinkListUseCase>(
      "GetUserLinkListUseCase"
    );

    const session = await auth();
    if (!session) {
      throw new Error("User not authenticated");
    }

    const links = await GetUserLinkListUseCase.execute({
      userId: session.user.id,
    });

    const plainLinks = links.map((link) => link.toPlainObject());

    return NextResponse.json(plainLinks);
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Failed to fetch links" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const AddLinkUseCase = container.get<AddLinkUseCase>("AddLinkUseCase");

    const session = await auth();
    if (!session) {
      throw new Error("User not authenticated");
    }

    const data = await req.json();

    const newLink = await AddLinkUseCase.execute({
      ...data,
      userId: session.user.id,
    });

    return NextResponse.json(newLink.toPlainObject(), { status: 201 });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Failed to create link" },
      { status: 500 }
    );
  }
}
