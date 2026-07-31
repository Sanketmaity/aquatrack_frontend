import Sidebar from "../layout/Sidebar";
import Topbar from "../layout/Topbar";

export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-100/70 text-slate-800 relative overflow-hidden">
            {/* Fixed Left Sidebar */}
            <Sidebar />

            {/* Main Content Area - Positioned to the right of the fixed sidebar */}
            <div className="absolute inset-y-0 left-72 right-0 flex flex-col overflow-hidden">
                {/* Sticky Top Navigation */}
                <Topbar />

                {/* Scrollable Page Body */}
                <main className="flex-1 overflow-y-auto p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    {children}
                </main>
            </div>
        </div>
    );
}