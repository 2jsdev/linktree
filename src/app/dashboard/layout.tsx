import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import MobilePreview from "@/components/dashboard/MobilePreview";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-base-200">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <Header />

        <div className="flex flex-1 overflow-hidden">
          {/* Page content */}
          <main className="flex-1 p-4 overflow-y-auto">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl">{children}</div>
            </div>
          </main>

          {/* Mobile Preview */}
          <div className="hidden lg:flex w-72 sm:w-80 md:w-96 bg-background h-full sticky top-0 right-8">
            <MobilePreview />
          </div>
        </div>
      </div>
    </div>
  );
}
