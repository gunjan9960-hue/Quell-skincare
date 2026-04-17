import AccountView from "@/components/AccountView";

export const metadata = {
  title: "My Account — QUELL",
};

export default function AccountPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <AccountView />
    </div>
  );
}
