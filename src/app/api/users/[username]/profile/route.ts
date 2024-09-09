import { NextResponse } from "next/server";
import { container } from "@/@core/infra/container-registry";
import { GetPublicProfileByUsernameUseCase } from "@/@core/application/useCases/GetPublicProfileByUsername/GetPublicProfileByUsernameUseCase";
import { ValidationError } from "@/@core/domain/errors/ValidationError";

export async function GET(
  req: Request,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;

    if (!username) {
      return NextResponse.json(
        { message: "Username is required" },
        { status: 400 }
      );
    }

    const getPublicProfileByUsernameUseCase =
      container.get<GetPublicProfileByUsernameUseCase>(
        "GetPublicProfileByUsernameUseCase"
      );

    const profile = await getPublicProfileByUsernameUseCase.execute({
      username,
    });

    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Failed to fetch user profile" },
      { status: 500 }
    );
  }
}
