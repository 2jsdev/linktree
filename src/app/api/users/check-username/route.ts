import { NextResponse } from "next/server";
import { container } from "@/@core/infra/container-registry";
import { ValidationError } from "@/@core/domain/errors/ValidationError";
import { CheckUsernameAvailabilityUseCase } from "@/@core/application/useCases/CheckUsernameAvailability/CheckUsernameAvailabilityUseCase";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (!username) {
      throw new ValidationError("Username is required.");
    }

    const checkUsernameAvailabilityUseCase =
      container.get<CheckUsernameAvailabilityUseCase>(
        "CheckUsernameAvailabilityUseCase"
      );

    const isAvailable = await checkUsernameAvailabilityUseCase.execute({
      username,
    });

    return NextResponse.json({ isAvailable }, { status: 200 });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Failed to check username availability" },
      { status: 500 }
    );
  }
}
