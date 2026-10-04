
import React, { useState, useMemo, useEffect } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer
} from 'recharts';
import {
  LayoutDashboard, BarChart3, ShoppingCart, Package,
  Users, Settings, Search, Bell, Menu, X, ChevronDown,
  ArrowUpRight, ArrowDownRight, Download, Filter,
  ChevronLeft, ChevronRight, ArrowUpDown
} from 'lucide-react';

// Helper to generate random dates within the last X days
const getRandomDate = (daysAgo) => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
  return date.toISOString().split('T')[0];
};

const CATEGORIES = ['All Categories', 'Electronics', 'Clothing', 'Home', 'Accessories'];
const STATUSES = ['Completed', 'Pending', 'Failed'];

// Generate 45 realistic mock transactions
const mockTransactions = Array.from({ length: 45 }).map((_, i) => ({
  id: `TRX-${1000 + i}`,
  name: `Customer ${Math.floor(Math.random() * 1000)}`,
  date: getRandomDate(90),
  amount: parseFloat((Math.random() * 500 + 20).toFixed(2)),
  status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
  category: CATEGORIES[Math.floor(Math.random() * 4) + 1]
}));

// KPI Data
const kpiData = [
  { title: 'Total Users', value: '24,892', change: '+12.5%', isPositive: true, icon: Users },
  { title: 'Revenue', value: '$84,320', change: '+8.2%', isPositive: true, icon: BarChart3 },
  { title: 'Orders', value: '3,842', change: '-3.4%', isPositive: false, icon: ShoppingCart },
  { title: 'Conversion Rate', value: '4.68%', change: '+1.8%', isPositive: true, icon: ArrowUpRight },
];

// Chart Data
const revenueData = [
  { month: 'Jan', revenue: 4000 }, { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 5000 }, { month: 'Apr', revenue: 4500 },
  { month: 'May', revenue: 6000 }, { month: 'Jun', revenue: 7000 },
  { month: 'Jul', revenue: 8500 }, { month: 'Aug', revenue: 8200 },
  { month: 'Sep', revenue: 9000 }, { month: 'Oct', revenue: 10500 },
  { month: 'Nov', revenue: 11000 }, { month: 'Dec', revenue: 12500 }
];

const topProductsData = [
  { name: 'Wireless Headphones', sales: 4000 },
  { name: 'Smart Watch', sales: 3000 },
  { name: 'Laptop Stand', sales: 2000 },
  { name: 'Mech Keyboard', sales: 2780 },
  { name: 'USB-C Hub', sales: 1890 }
];

const trafficData = [
  { name: 'Organic', value: 45 },
  { name: 'Direct', value: 25 },
  { name: 'Social', value: 20 },
  { name: 'Referral', value: 10 }
];
const COLORS = ['#e62429', '#ff4b4b', '#ff7a7a', '#ff9e9e']; // Marvel red palette

// Generate 30 days of active users
const activeUsersData = Array.from({ length: 30 }).map((_, i) => ({
  day: `Day ${i + 1}`,
  users: Math.floor(1000 + Math.random() * 500 + (i * 20))
}));


const Sidebar = ({ isOpen, setIsOpen }) => {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, active: true },
    { name: 'Analytics', icon: BarChart3 },
    { name: 'Orders', icon: ShoppingCart },
    { name: 'Products', icon: Package },
    { name: 'Customers', icon: Users },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-neutral-900 border-r border-neutral-800
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#e62429] flex items-center justify-center rounded font-bold text-white tracking-wider">
              MV
            </div>
            <span className="text-xl font-bold text-white tracking-wide uppercase">Metrics</span>
          </div>
          <button className="lg:hidden text-neutral-400 hover:text-white" onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>
        
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.name}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${item.active 
                  ? 'bg-[#e62429]/10 text-[#e62429] font-medium border border-[#e62429]/20' 
                  : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}
              `}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};

const Topbar = ({ setSidebarOpen }) => (
  <header className="h-16 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between px-4 lg:px-8">
    <div className="flex items-center gap-4 flex-1">
      <button 
        className="lg:hidden text-neutral-400 hover:text-white"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu size={24} />
      </button>
      
      <div className="hidden md:flex items-center max-w-md w-full relative">
        <Search className="absolute left-3 text-neutral-500" size={18} />
        <input 
          type="text" 
          placeholder="Search reports..."
          className="w-full bg-neutral-800 border-none text-white text-sm rounded-full pl-10 pr-4 py-2 focus:ring-1 focus:ring-[#e62429] outline-none placeholder-neutral-500"
        />
      </div>
    </div>
    
    <div className="flex items-center gap-4 lg:gap-6">
      <button className="relative text-neutral-400 hover:text-white transition-colors">
        <Bell size={20} />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#e62429] rounded-full text-[10px] flex items-center justify-center text-white font-bold border-2 border-neutral-900">
          3
        </span>
      </button>
      
      <div className="h-8 w-px bg-neutral-800 hidden md:block"></div>
      
      <button className="flex items-center gap-3 group">
        <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 overflow-hidden flex items-center justify-center">
          <Users size={16} className="text-neutral-400" />
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-white group-hover:text-[#e62429] transition-colors">Admin User</p>
          <p className="text-xs text-neutral-500">Developer</p>
        </div>
        <ChevronDown size={16} className="text-neutral-500 hidden md:block group-hover:text-white transition-colors" />
      </button>
    </div>
  </header>
);

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dateRange, setDateRange] = useState('30');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [selectedChartFilter, setSelectedChartFilter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Table Data Processing
  const processedData = useMemo(() => {
    let data = [...mockTransactions];

    // Filter by Category
    if (categoryFilter !== 'All Categories') {
      data = data.filter(item => item.category === categoryFilter);
    }

    // Filter by Search
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      data = data.filter(item => 
        item.name.toLowerCase().includes(lowerQuery) ||
        item.category.toLowerCase().includes(lowerQuery) ||
        item.status.toLowerCase().includes(lowerQuery)
      );
    }

    // Sort
    if (sortConfig.key) {
      data.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];
        
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return data;
  }, [categoryFilter, searchQuery, sortConfig]);

  const totalPages = Math.ceil(processedData.length / rowsPerPage);
  const paginatedData = processedData.slice(
    (currentPage - 1) * rowsPerPage, 
    currentPage * rowsPerPage
  );

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const exportCSV = () => {
    const headers = ['ID', 'Name', 'Date', 'Amount', 'Status', 'Category'];
    const csvContent = [
      headers.join(','),
      ...processedData.map(row => 
        `${row.id},"${row.name}",${row.date},${row.amount},${row.status},${row.category}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'analytics_export.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-neutral-800 border-t-[#e62429] rounded-full animate-spin"></div>
          <p className="text-neutral-400 font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-neutral-200 flex overflow-hidden font-sans">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Topbar setSidebarOpen={setIsSidebarOpen} />
        
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          
          {/* Header & Global Filters */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Analytics Overview</h1>
              <p className="text-neutral-400 text-sm">Monitor your business performance and key metrics.</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 bg-neutral-900 p-1.5 rounded-lg border border-neutral-800">
              <div className="flex items-center px-3 border-r border-neutral-800">
                <Filter size={16} className="text-neutral-500 mr-2" />
                <select 
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="bg-transparent border-none text-sm text-neutral-300 focus:ring-0 outline-none cursor-pointer"
                >
                  <option value="7" className="bg-neutral-800">Last 7 Days</option>
                  <option value="30" className="bg-neutral-800">Last 30 Days</option>
                  <option value="90" className="bg-neutral-800">Last 90 Days</option>
                  <option value="custom" className="bg-neutral-800">Custom Range</option>
                </select>
              </div>
              
              <div className="px-3">
                <select 
                  value={categoryFilter}
                  onChange={(e) => {
                    setCategoryFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-transparent border-none text-sm text-neutral-300 focus:ring-0 outline-none cursor-pointer"
                >
                  {CATEGORIES.map(c => (
                    <option key={c} value={c} className="bg-neutral-800">{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Active Filter Indicator */}
          {selectedChartFilter && (
            <div className="mb-6 flex items-center gap-2">
              <span className="text-sm text-neutral-400">Chart Filter applied:</span>
              <span className="px-3 py-1 bg-[#e62429]/10 text-[#e62429] border border-[#e62429]/20 rounded-full text-xs font-semibold flex items-center gap-2">
                {selectedChartFilter}
                <button onClick={() => setSelectedChartFilter(null)} className="hover:text-white"><X size={14}/></button>
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpiData.map((kpi, idx) => (
              <div key={idx} className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-neutral-700 transition-colors shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-neutral-400 text-sm font-medium mb-1">{kpi.title}</p>
                    <h3 className="text-2xl font-bold text-white">{kpi.value}</h3>
                  </div>
                  <div className={`p-2 rounded-lg ${kpi.isPositive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                    <kpi.icon size={20} />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`flex items-center text-xs font-semibold ${kpi.isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                    {kpi.isPositive ? <ArrowUpRight size={14} className="mr-1"/> : <ArrowDownRight size={14} className="mr-1"/>}
                    {kpi.change}
                  </span>
                  <span className="text-neutral-500 text-xs">vs last period</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            
            {/* Revenue Line Chart */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 shadow-lg">
              <h3 className="text-lg font-semibold text-white mb-6">Monthly Revenue</h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData} onClick={(e) => e && e.activeLabel && setSelectedChartFilter(`Month: ${e.activeLabel}`)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                    <XAxis dataKey="month" stroke="#737373" tick={{fill: '#a3a3a3', fontSize: 12}} tickLine={false} axisLine={false} />
                    <YAxis stroke="#737373" tick={{fill: '#a3a3a3', fontSize: 12}} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }}
                      itemStyle={{ color: '#e62429' }}
                      formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                    />
                    <Line type="monotone" dataKey="revenue" stroke="#e62429" strokeWidth={3} dot={{ fill: '#e62429', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: '#fff', stroke: '#e62429' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Products Bar Chart */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 shadow-lg">
              <h3 className="text-lg font-semibold text-white mb-6">Top Products</h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topProductsData} layout="vertical" margin={{ left: 20 }} onClick={(e) => e && e.activeLabel && setSelectedChartFilter(`Product: ${e.activeLabel}`)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#262626" horizontal={false} />
                    <XAxis type="number" stroke="#737373" tick={{fill: '#a3a3a3', fontSize: 12}} tickLine={false} axisLine={false} />
                    <YAxis dataKey="name" type="category" stroke="#737373" tick={{fill: '#a3a3a3', fontSize: 12}} tickLine={false} axisLine={false} width={100} />
                    <Tooltip 
                      cursor={{ fill: '#262626' }}
                      contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }}
                      formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']}
                    />
                    <Bar dataKey="sales" fill="#e62429" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Daily Active Users Area Chart */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 shadow-lg lg:col-span-1">
              <h3 className="text-lg font-semibold text-white mb-6">Daily Active Users</h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activeUsersData}>
                    <defs>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#e62429" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#e62429" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                    <XAxis dataKey="day" hide />
                    <YAxis stroke="#737373" tick={{fill: '#a3a3a3', fontSize: 12}} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }}
                    />
                    <Area type="monotone" dataKey="users" stroke="#e62429" fillOpacity={1} fill="url(#colorUsers)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Traffic Sources Donut Chart */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 shadow-lg lg:col-span-1">
              <h3 className="text-lg font-semibold text-white mb-6">Traffic Sources</h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart onClick={(e) => e && e.name && setSelectedChartFilter(`Source: ${e.name}`)}>
                    <Pie
                      data={trafficData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {trafficData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px', color: '#fff' }}
                      formatter={(value) => [`${value}%`]}
                    />
                    <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '12px', color: '#a3a3a3' }}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-xl shadow-lg overflow-hidden flex flex-col mb-8">
            
            <div className="p-5 border-b border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search by name, category..."
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    className="w-full bg-neutral-800 border border-neutral-700 text-white text-sm rounded-lg pl-9 pr-4 py-2 focus:ring-1 focus:ring-[#e62429] outline-none placeholder-neutral-500 transition-shadow"
                  />
                </div>
                <button 
                  onClick={exportCSV}
                  className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-medium rounded-lg border border-neutral-700 transition-colors whitespace-nowrap"
                >
                  <Download size={16} />
                  <span className="hidden sm:inline">Export CSV</span>
                </button>
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-950/50 border-b border-neutral-800 text-neutral-400 text-xs uppercase tracking-wider">
                    {['Name', 'Date', 'Amount', 'Status', 'Category'].map(col => (
                      <th 
                        key={col} 
                        className="px-6 py-4 font-medium cursor-pointer hover:text-white transition-colors"
                        onClick={() => handleSort(col.toLowerCase())}
                      >
                        <div className="flex items-center gap-2">
                          {col}
                          {sortConfig.key === col.toLowerCase() ? (
                            sortConfig.direction === 'asc' ? <ChevronDown size={14} className="rotate-180" /> : <ChevronDown size={14} />
                          ) : (
                            <ArrowUpDown size={14} className="opacity-0 group-hover:opacity-100" />
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800 text-sm">
                  {paginatedData.length > 0 ? (
                    paginatedData.map((row) => (
                      <tr key={row.id} className="hover:bg-neutral-800/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-white">{row.name}</td>
                        <td className="px-6 py-4 text-neutral-400">{row.date}</td>
                        <td className="px-6 py-4 text-neutral-300 font-mono">${row.amount.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                            ${row.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                              row.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                              'bg-red-500/10 text-red-400 border-red-500/20'}
                          `}>
                            {row.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-neutral-400">{row.category}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-neutral-500">
                        No transactions found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="block md:hidden divide-y divide-neutral-800">
              {paginatedData.length > 0 ? (
                paginatedData.map((row) => (
                  <div key={row.id} className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-white">{row.name}</p>
                        <p className="text-xs text-neutral-500">{row.date}</p>
                      </div>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border
                        ${row.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                          row.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                          'bg-red-500/10 text-red-400 border-red-500/20'}
                      `}>
                        {row.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-neutral-400">{row.category}</span>
                      <span className="font-mono text-white">${row.amount.toFixed(2)}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-neutral-500 text-sm">
                  No transactions found.
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 0 && (
              <div className="px-5 py-4 border-t border-neutral-800 flex items-center justify-between bg-neutral-950/30">
                <span className="text-sm text-neutral-400">
                  Showing <span className="text-white font-medium">{((currentPage - 1) * rowsPerPage) + 1}</span> to <span className="text-white font-medium">{Math.min(currentPage * rowsPerPage, processedData.length)}</span> of <span className="text-white font-medium">{processedData.length}</span>
                </span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded-md border border-neutral-700 text-neutral-400 hover:text-white hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-1.5 rounded-md border border-neutral-700 text-neutral-400 hover:text-white hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}