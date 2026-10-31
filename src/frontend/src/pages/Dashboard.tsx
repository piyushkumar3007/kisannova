{/*Drone*/}


import {
  ArrowLeft,
  Bell,
  Box,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  CreditCard,
  LayoutDashboard,
  Leaf,
  LogOut,
  Package,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Sprout,
  TrendingUp,
  Truck,
  Users,
  Wallet,
  Activity,
  MessageSquare,
  Bot,
} from "lucide-react";

type DashboardProps = {
  user: {
    name: string;
    email: string;
    role: "user" | "admin";
  };
  onBack: () => void;
  onLogout: () => void;
};

const userOrders = [
  {
    id: "NOVA-1024",
    product: "Nova Agricultural Drone",
    date: "Demo order · 28 Oct 2026",
    amount: "₹—",
    status: "Processing",
    progress: 45,
  },
  {
    id: "NOVA-1018",
    product: "Crop Monitoring Service",
    date: "Demo booking · 24 Oct 2026",
    amount: "₹—",
    status: "In progress",
    progress: 70,
  },
];

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{title}</p>
        <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <h3 className="mt-4 text-2xl font-bold text-foreground">{value}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
    </div>
  );
}

function UserDashboard({ user }: { user: DashboardProps["user"] }) {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium text-primary">USER DASHBOARD</p>
        <h1 className="mt-2 text-3xl font-bold">
          Welcome back, {user.name.split(" ")[0]}!
        </h1>
        <p className="mt-2 text-muted-foreground">
          Here's an overview of your Nova farming journey.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="My Orders" value="02" subtitle="Demo records" icon={ShoppingBag} />
        <StatCard title="Active Services" value="01" subtitle="Demo record" icon={Sprout} />
        <StatCard title="Farm Details" value="Not added" subtitle="Complete your profile" icon={Leaf} />
        <StatCard title="Notifications" value="03" subtitle="Sample notifications" icon={Bell} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">My Orders & Services</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Track your drone and service progress.
              </p>
            </div>
            <Package className="h-6 w-6 text-primary" />
          </div>

          <div className="mt-6 space-y-5">
            {userOrders.map((order) => (
              <div key={order.id} className="rounded-xl border border-border p-4">
                <div className="flex flex-wrap justify-between gap-3">
                  <div>
                    <p className="font-semibold">{order.product}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {order.id} · {order.date}
                    </p>
                  </div>
                  <span className="h-fit rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-600">
                    {order.status}
                  </span>
                </div>
                <div className="mt-5 flex justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span>{order.progress}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${order.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            These are illustrative records, not actual purchases or bookings.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">My Account</h2>
          <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <h3 className="mt-4 font-semibold">{user.name}</h3>
          <p className="mt-1 break-all text-sm text-muted-foreground">{user.email}</p>
          <div className="mt-5 border-t border-border pt-4">
            <p className="text-xs text-muted-foreground">Account type</p>
            <p className="mt-1 text-sm font-medium">Nova Customer</p>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-primary">
            <CheckCircle2 className="h-4 w-4" />
            Demo account active
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { title: "My Profile", description: "Manage your personal and farm details.", icon: Users },
          { title: "Payment History", description: "View your payment and invoice section.", icon: CreditCard },
          { title: "Help & Support", description: "Get assistance with Nova services.", icon: CircleHelp },
        ].map((item) => (
          <div key={item.title} className="rounded-2xl border border-border bg-card p-5">
            <item.icon className="h-6 w-6 text-primary" />
            <h3 className="mt-4 font-semibold">{item.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary">
              Coming soon <ChevronRight className="h-3 w-3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminDashboard() {
  const adminStats = [
    { title: "Total Users", value: "—", subtitle: "Database not connected", icon: Users },
    { title: "Drone Orders", value: "—", subtitle: "Live records unavailable", icon: ShoppingBag },
    { title: "Revenue", value: "—", subtitle: "No verified transactions", icon: Wallet },
    { title: "Active Services", value: "—", subtitle: "Live records unavailable", icon: Activity },
  ];

  const modules = [
    { title: "User Management", description: "View and manage customer accounts.", icon: Users },
    { title: "Drone Inventory", description: "Manage drone models and stock.", icon: Box },
    { title: "Orders & Delivery", description: "Monitor orders and delivery progress.", icon: Truck },
    { title: "Service Management", description: "Manage service bookings and assignments.", icon: CalendarDays },
    { title: "Payments & Finance", description: "Review transaction records and invoices.", icon: CreditCard },
    { title: "Website Analytics", description: "Monitor website activity and performance.", icon: TrendingUp },
    { title: "Nova AI Monitoring", description: "Monitor assistant activity and usage.", icon: Bot },
    { title: "Customer Support", description: "Review support requests and feedback.", icon: MessageSquare },
    { title: "Admin Settings", description: "Manage administrative preferences.", icon: Settings },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary">SUPER ADMIN PANEL</p>
          <h1 className="mt-2 text-3xl font-bold">Business Overview</h1>
          <p className="mt-2 text-muted-foreground">
            Manage and monitor the Nova platform.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <span className="text-sm font-semibold">Super Admin Demo</span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {adminStats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">Management Center</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Your platform management modules.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {modules.map((module) => (
            <button
              type="button"
              key={module.title}
              onClick={() => alert(`${module.title} will be connected after database integration.`)}
              className="group rounded-xl border border-border p-5 text-left transition-all hover:border-primary/40 hover:bg-primary/5"
            >
              <div className="flex items-center justify-between">
                <module.icon className="h-6 w-6 text-primary" />
                <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </div>
              <h3 className="mt-4 font-semibold">{module.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{module.description}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-6">
        <div className="flex items-center gap-3">
          <Activity className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Platform Status</h2>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          This is a frontend demonstration. Real customer counts, sales, payments,
          inventory and activity analytics will appear after database integration.
        </p>
      </div>
    </div>
  );
}

export default function Dashboard({
  user,
  onBack,
  onLogout,
}: DashboardProps) {
  const isAdmin = user.role === "admin";

  return (
    <main className="min-h-screen bg-background pb-16 pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to website
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>

        {isAdmin ? <AdminDashboard /> : <UserDashboard user={user} />}

        <div className="mt-10 border-t border-border pt-5 text-center text-xs text-muted-foreground">
          Nova by KisanNova · Demonstration Dashboard
        </div>
      </div>
    </main>
  );
}
