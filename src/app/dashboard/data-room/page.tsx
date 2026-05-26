import { redirect } from "next/navigation";

export default function DataRoomPage() {
  redirect("/dashboard?tab=data-room");
}
