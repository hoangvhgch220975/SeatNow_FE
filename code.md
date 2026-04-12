<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Revenue &amp; Analytics | Culinary Curator</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "surface-container-low": "#f3f4f5",
              "surface-container": "#edeeef",
              "surface-bright": "#f8f9fa",
              "on-primary-container": "#ede0ff",
              "on-error-container": "#93000a",
              "secondary-fixed-dim": "#d3bbff",
              "tertiary": "#7d3d00",
              "surface-container-highest": "#e1e3e4",
              "on-tertiary-fixed-variant": "#713700",
              "secondary-container": "#8856e5",
              "on-secondary-fixed-variant": "#581db3",
              "on-primary": "#ffffff",
              "primary": "#630ed4",
              "surface-dim": "#d9dadb",
              "error-container": "#ffdad6",
              "primary-fixed": "#eaddff",
              "secondary-fixed": "#ebddff",
              "on-tertiary": "#ffffff",
              "surface": "#f8f9fa",
              "error": "#ba1a1a",
              "tertiary-fixed-dim": "#ffb784",
              "secondary": "#6e3aca",
              "primary-container": "#7c3aed",
              "surface-tint": "#732ee4",
              "primary-fixed-dim": "#d2bbff",
              "on-tertiary-container": "#ffe0cd",
              "on-primary-fixed": "#25005a",
              "outline-variant": "#ccc3d8",
              "inverse-surface": "#2e3132",
              "inverse-primary": "#d2bbff",
              "tertiary-container": "#a15100",
              "surface-variant": "#e1e3e4",
              "on-secondary-container": "#fffbff",
              "tertiary-fixed": "#ffdcc6",
              "on-error": "#ffffff",
              "inverse-on-surface": "#f0f1f2",
              "on-surface": "#191c1d",
              "on-secondary": "#ffffff",
              "on-tertiary-fixed": "#301400",
              "on-surface-variant": "#4a4455",
              "on-background": "#191c1d",
              "on-secondary-fixed": "#250059",
              "on-primary-fixed-variant": "#5a00c6",
              "background": "#f8f9fa",
              "surface-container-high": "#e7e8e9",
              "outline": "#7b7487",
              "surface-container-lowest": "#ffffff"
            },
            fontFamily: {
              "headline": ["Plus Jakarta Sans"],
              "body": ["Plus Jakarta Sans"],
              "label": ["Plus Jakarta Sans"]
            },
            borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
          },
        },
      }
    </script>
<style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .glass-effect {
            background: rgba(248, 249, 250, 0.7);
            backdrop-filter: blur(20px);
        }
        .ambient-shadow {
            box-shadow: 0 20px 40px -15px rgba(99, 14, 212, 0.04);
        }
        .chart-bar { transition: height 0.3s ease; }
    </style>
</head>
<body class="bg-surface text-on-surface flex min-h-screen">
<!-- SideNavBar Component -->
<aside class="hidden md:flex flex-col h-screen w-64 sticky top-0 bg-slate-50 dark:bg-slate-950 py-8 px-4 shrink-0 border-r border-purple-100/20">
<div class="mb-10 px-4">
<h1 class="text-xl font-bold text-purple-700 dark:text-purple-400">Culinary Curator</h1>
<p class="text-[10px] tracking-widest uppercase opacity-60 font-bold">The Digital Maître D'</p>
</div>
<nav class="flex-1 space-y-2">
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors duration-200 font-medium text-sm" href="#">
<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
            Overview
        </a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors duration-200 font-medium text-sm" href="#">
<span class="material-symbols-outlined" data-icon="restaurant_menu">restaurant_menu</span>
            Menu
        </a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors duration-200 font-medium text-sm" href="#">
<span class="material-symbols-outlined" data-icon="table_restaurant">table_restaurant</span>
            Tables
        </a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors duration-200 font-medium text-sm" href="#">
<span class="material-symbols-outlined" data-icon="event_available">event_available</span>
            Bookings
        </a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-purple-700 dark:text-purple-300 font-bold border-r-4 border-purple-600 dark:border-purple-400 bg-purple-50/50 dark:bg-purple-900/20 active:scale-[0.98] transition-transform text-sm" href="#">
<span class="material-symbols-outlined" data-icon="payments">payments</span>
            Revenue
        </a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors duration-200 font-medium text-sm" href="#">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
            Settings
        </a>
</nav>
</aside>
<!-- Main Content Area -->
<main class="flex-1 flex flex-col min-w-0 bg-surface">
<!-- TopNavBar Component -->
<header class="sticky top-0 z-40 flex justify-between items-center px-8 w-full h-20 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-purple-100/20 dark:border-purple-900/20">
<div class="flex items-center gap-8 flex-1">
<h2 class="text-lg font-semibold text-slate-900 dark:text-slate-50 whitespace-nowrap">Revenue &amp; Analytics</h2>
<div class="hidden md:flex items-center bg-surface-container-low px-4 py-2 rounded-full w-full max-w-md">
<span class="material-symbols-outlined text-on-surface-variant mr-2" data-icon="search">search</span>
<input class="bg-transparent border-none focus:ring-0 text-sm w-full" placeholder="Search transactions..." type="text"/>
</div>
</div>
<div class="flex items-center gap-6">
<button class="text-slate-500 hover:text-purple-600 transition-colors">
<span class="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
<button class="text-slate-500 hover:text-purple-600 transition-colors font-medium text-sm">Help</button>
<div class="flex items-center gap-3 border-l border-purple-100/50 pl-6 h-10">
<div class="text-right hidden sm:block">
<p class="text-sm font-bold leading-tight">Chef Julian</p>
<p class="text-[10px] text-on-surface-variant opacity-70 uppercase tracking-tighter">Owner</p>
</div>
<div class="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
<img class="w-full h-full object-cover" data-alt="Close-up portrait of a professional restaurant owner in a modern kitchen setting, confident expression, soft natural lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7Dsv6y-DdY0CwexWt1knyIU61-pLblOWgKNBUM96emFvVqS-Se0yzr_6htC1vCbPjwK_ocIyyL9TgcHScWbHLHNCQgUtHCcaKMqHswEivgzvX4q2XF3vGGiYeViBrhNtKMJlga-ACwgYfUbLjCW4Ik7ORWMvhUbgIH2ie8Yerkdu4YvH2ynOHNaNSs8PZx0idZTK7jaSxsJqehRVfbcuNRSMmAeFAQrJzVKDmMi7hskKN4x2r-XioctQFl5WMqyPxf9mwTZ6k1PHx"/>
</div>
</div>
</div>
</header>
<!-- Canvas -->
<div class="p-8 space-y-12 max-w-7xl mx-auto w-full">
<!-- Filters Row -->
<section class="flex flex-col md:flex-row md:items-center justify-between gap-6">
<div>
<h3 class="text-2xl font-bold text-on-surface">Financial Overview</h3>
<p class="text-on-surface-variant">Real-time performance metrics for your establishment.</p>
</div>
<div class="flex bg-surface-container-low p-1.5 rounded-full">
<button class="px-6 py-2 rounded-full text-sm font-medium transition-all text-on-surface-variant hover:text-primary">Day</button>
<button class="px-6 py-2 rounded-full text-sm font-medium transition-all text-on-surface-variant hover:text-primary">Week</button>
<button class="px-6 py-2 rounded-full text-sm font-medium bg-surface-container-lowest text-primary shadow-sm">Month</button>
<button class="px-6 py-2 rounded-full text-sm font-medium transition-all text-on-surface-variant hover:text-primary">Quarter</button>
<button class="px-6 py-2 rounded-full text-sm font-medium transition-all text-on-surface-variant hover:text-primary">Year</button>
</div>
</section>
<!-- KPI Cards Grid -->
<section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
<!-- Total Revenue -->
<div class="bg-surface-container-lowest p-8 rounded-xl ambient-shadow border border-outline-variant/10">
<div class="flex justify-between items-start mb-4">
<div class="p-3 bg-primary-fixed rounded-lg text-primary">
<span class="material-symbols-outlined" data-icon="payments">payments</span>
</div>
<span class="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded">+12.4%</span>
</div>
<p class="text-on-surface-variant text-sm font-medium">Total Revenue</p>
<h4 class="text-3xl font-extrabold mt-1">$124,500</h4>
</div>
<!-- Total Bookings -->
<div class="bg-surface-container-lowest p-8 rounded-xl ambient-shadow border border-outline-variant/10">
<div class="flex justify-between items-start mb-4">
<div class="p-3 bg-secondary-fixed rounded-lg text-secondary">
<span class="material-symbols-outlined" data-icon="event_available">event_available</span>
</div>
<span class="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded">+5.2%</span>
</div>
<p class="text-on-surface-variant text-sm font-medium">Total Bookings</p>
<h4 class="text-3xl font-extrabold mt-1">842</h4>
</div>
<!-- Avg Revenue per Booking -->
<div class="bg-surface-container-lowest p-8 rounded-xl ambient-shadow border border-outline-variant/10">
<div class="flex justify-between items-start mb-4">
<div class="p-3 bg-tertiary-fixed rounded-lg text-tertiary">
<span class="material-symbols-outlined" data-icon="analytics">analytics</span>
</div>
<span class="text-red-500 text-xs font-bold bg-red-50 px-2 py-1 rounded">-1.8%</span>
</div>
<p class="text-on-surface-variant text-sm font-medium">Avg. Rev / Booking</p>
<h4 class="text-3xl font-extrabold mt-1">$147.86</h4>
</div>
<!-- Occupancy Rate -->
<div class="bg-surface-container-lowest p-8 rounded-xl ambient-shadow border border-outline-variant/10">
<div class="flex justify-between items-start mb-4">
<div class="p-3 bg-primary/10 rounded-lg text-primary">
<span class="material-symbols-outlined" data-icon="grid_view">grid_view</span>
</div>
<span class="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded">+8.0%</span>
</div>
<p class="text-on-surface-variant text-sm font-medium">Occupancy Rate</p>
<h4 class="text-3xl font-extrabold mt-1">88%</h4>
</div>
</section>
<!-- Main Charts Section (Bento Style) -->
<section class="grid grid-cols-1 lg:grid-cols-3 gap-8">
<!-- Revenue Growth Chart (Area Chart Mockup) -->
<div class="lg:col-span-2 bg-surface-container-lowest p-8 rounded-xl ambient-shadow relative overflow-hidden">
<div class="flex justify-between items-center mb-10">
<div>
<h4 class="text-xl font-bold">Revenue Growth</h4>
<p class="text-sm text-on-surface-variant">Monthly performance trends</p>
</div>
</div>
<div class="h-64 flex items-end justify-between gap-2 relative">
<!-- Grid Lines -->
<div class="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 border-b border-outline">
<div class="border-t border-outline w-full h-0"></div>
<div class="border-t border-outline w-full h-0"></div>
<div class="border-t border-outline w-full h-0"></div>
</div>
<!-- Visualization via styled divs to simulate area chart -->
<div class="flex-1 bg-primary/10 rounded-t-lg h-[40%] relative group cursor-pointer hover:bg-primary/20 transition-all">
<div class="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-on-surface text-surface text-[10px] px-2 py-1 rounded whitespace-nowrap">$12k</div>
</div>
<div class="flex-1 bg-primary/15 rounded-t-lg h-[55%] relative group cursor-pointer hover:bg-primary/20 transition-all">
<div class="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-on-surface text-surface text-[10px] px-2 py-1 rounded whitespace-nowrap">$18k</div>
</div>
<div class="flex-1 bg-primary/25 rounded-t-lg h-[45%] relative group cursor-pointer hover:bg-primary/20 transition-all">
<div class="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-on-surface text-surface text-[10px] px-2 py-1 rounded whitespace-nowrap">$15k</div>
</div>
<div class="flex-1 bg-primary/40 rounded-t-lg h-[75%] relative group cursor-pointer hover:bg-primary/20 transition-all">
<div class="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-on-surface text-surface text-[10px] px-2 py-1 rounded whitespace-nowrap">$24k</div>
</div>
<div class="flex-1 bg-primary/60 rounded-t-lg h-[90%] relative group cursor-pointer hover:bg-primary/20 transition-all">
<div class="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-on-surface text-surface text-[10px] px-2 py-1 rounded whitespace-nowrap">$31k</div>
</div>
<div class="flex-1 bg-primary rounded-t-lg h-[85%] relative group cursor-pointer hover:bg-primary/20 transition-all">
<div class="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-on-surface text-surface text-[10px] px-2 py-1 rounded whitespace-nowrap">$28k</div>
</div>
</div>
<div class="flex justify-between mt-6 px-2 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
<span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
</div>
</div>
<!-- Booking Distribution Chart (Bar Chart) -->
<div class="bg-surface-container-lowest p-8 rounded-xl ambient-shadow">
<h4 class="text-xl font-bold mb-2">Booking Types</h4>
<p class="text-sm text-on-surface-variant mb-10">Distribution by group size</p>
<div class="space-y-6">
<div class="space-y-2">
<div class="flex justify-between text-sm font-medium">
<span>Couples (2-Top)</span>
<span>45%</span>
</div>
<div class="w-full bg-surface-container h-2.5 rounded-full overflow-hidden">
<div class="bg-primary h-full w-[45%] rounded-full"></div>
</div>
</div>
<div class="space-y-2">
<div class="flex justify-between text-sm font-medium">
<span>Small Groups (4-Top)</span>
<span>30%</span>
</div>
<div class="w-full bg-surface-container h-2.5 rounded-full overflow-hidden">
<div class="bg-secondary h-full w-[30%] rounded-full"></div>
</div>
</div>
<div class="space-y-2">
<div class="flex justify-between text-sm font-medium">
<span>Large Parties (6+)</span>
<span>15%</span>
</div>
<div class="w-full bg-surface-container h-2.5 rounded-full overflow-hidden">
<div class="bg-tertiary h-full w-[15%] rounded-full"></div>
</div>
</div>
<div class="space-y-2">
<div class="flex justify-between text-sm font-medium">
<span>Private Events</span>
<span>10%</span>
</div>
<div class="w-full bg-surface-container h-2.5 rounded-full overflow-hidden">
<div class="bg-primary-container h-full w-[10%] rounded-full opacity-60"></div>
</div>
</div>
</div>
</div>
</section>
<!-- Transaction Table Section -->
<section class="bg-surface-container-lowest rounded-xl ambient-shadow overflow-hidden border border-outline-variant/10">
<div class="p-8 flex justify-between items-center border-b border-surface-container">
<h4 class="text-xl font-bold">Recent Revenue Transactions</h4>
</div>
<div class="overflow-x-auto">
<table class="w-full text-left">
<thead class="bg-surface-container-low text-on-surface-variant uppercase text-[10px] font-bold tracking-widest">
<tr>
<th class="px-8 py-5">Date</th>
<th class="px-8 py-5">Booking ID</th>
<th class="px-8 py-5">Guest Name</th>
<th class="px-8 py-5">Table Type</th>
<th class="px-8 py-5 text-right">Revenue Amount</th>
</tr>
</thead>
<tbody class="divide-y divide-surface-container">
<tr class="hover:bg-surface-container-low/30 transition-colors">
<td class="px-8 py-5 text-sm">Oct 24, 2023, 7:30 PM</td>
<td class="px-8 py-5 text-sm font-mono text-primary">#BK-9842</td>
<td class="px-8 py-5">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-primary font-bold text-xs">SM</div>
<span class="text-sm font-medium">Sarah Miller</span>
</div>
</td>
<td class="px-8 py-5 text-sm">Window Booth (4-Top)</td>
<td class="px-8 py-5 text-sm font-bold text-right">$342.50</td>
</tr>
<tr class="hover:bg-surface-container-low/30 transition-colors">
<td class="px-8 py-5 text-sm">Oct 24, 2023, 6:45 PM</td>
<td class="px-8 py-5 text-sm font-mono text-primary">#BK-9841</td>
<td class="px-8 py-5">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">JH</div>
<span class="text-sm font-medium">James Hoffman</span>
</div>
</td>
<td class="px-8 py-5 text-sm">Main Floor (2-Top)</td>
<td class="px-8 py-5 text-sm font-bold text-right">$185.00</td>
</tr>
<tr class="hover:bg-surface-container-low/30 transition-colors">
<td class="px-8 py-5 text-sm">Oct 24, 2023, 6:00 PM</td>
<td class="px-8 py-5 text-sm font-mono text-primary">#BK-9840</td>
<td class="px-8 py-5">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold text-xs">RC</div>
<span class="text-sm font-medium">Robert Chen</span>
</div>
</td>
<td class="px-8 py-5 text-sm">Chef's Table (8-Top)</td>
<td class="px-8 py-5 text-sm font-bold text-right">$1,250.00</td>
</tr>
<tr class="hover:bg-surface-container-low/30 transition-colors">
<td class="px-8 py-5 text-sm">Oct 24, 2023, 5:30 PM</td>
<td class="px-8 py-5 text-sm font-mono text-primary">#BK-9839</td>
<td class="px-8 py-5">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">AW</div>
<span class="text-sm font-medium">Amanda West</span>
</div>
</td>
<td class="px-8 py-5 text-sm">Garden Patio (2-Top)</td>
<td class="px-8 py-5 text-sm font-bold text-right">$128.40</td>
</tr>
<tr class="hover:bg-surface-container-low/30 transition-colors">
<td class="px-8 py-5 text-sm">Oct 23, 2023, 9:15 PM</td>
<td class="px-8 py-5 text-sm font-mono text-primary">#BK-9838</td>
<td class="px-8 py-5">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary font-bold text-xs">DP</div>
<span class="text-sm font-medium">David Park</span>
</div>
</td>
<td class="px-8 py-5 text-sm">Bar High-Top (1-Top)</td>
<td class="px-8 py-5 text-sm font-bold text-right">$84.00</td>
</tr>
</tbody>
</table>
</div>
<div class="p-6 bg-surface-container-low/50 flex justify-center">
<button class="text-primary font-bold text-sm hover:underline py-2">View All Transactions</button>
</div>
</section>
</div>
</main>
</body></html>