import TopNav from "@/components/TopNav";
import BrainBubble from "@/components/BrainBubble";

export default function OsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNav />
      <main>{children}</main>
      <BrainBubble />
    </>
  );
}
