import type { Metadata } from "next";
import LookbookClient from "./LookbookClient";

export const metadata: Metadata = {
  title: "Lookbook",
  description: "House of Piranha — objects worn, carried, and authenticated. The armory in motion.",
};

export default function LookbookPage() {
  return <LookbookClient />;
}
