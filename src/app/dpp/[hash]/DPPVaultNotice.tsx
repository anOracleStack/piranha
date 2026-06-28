import { HouseLink } from "@/components/ui/HouseButton";

export default function DPPVaultNotice() {
  return (
    <div className="dpp-registered">
      <p>Ownership registration is Vault-gated</p>
      <span>Connect credential storage before enabling product ownership writes.</span>
      <HouseLink href="/the-vault" variant="vault" className="mt-4 justify-center">
        Open Vault
      </HouseLink>
    </div>
  );
}
