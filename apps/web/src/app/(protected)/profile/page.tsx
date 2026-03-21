import { Container } from "@/components/ui/container";
import { ProfileForm } from "../../../components/feature/profile/ProfileForm";

export default function Profile() {
  return (
    <Container variant={"constrainedPadded"}>
      <ProfileForm />
    </Container>
  );
}
