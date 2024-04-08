import AppIcon from "@/components/shared/app-icon";
import AsideNav from "./aside-nav";

const Aside = () => {
  return (
    <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
      <AppIcon />
      <AsideNav />
    </aside>
  );
};

export default Aside;
