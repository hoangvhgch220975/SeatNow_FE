<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Global Portfolio Analytics | The Culinary Curator</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "on-tertiary-fixed-variant": "#713700",
              "surface-variant": "#e1e3e4",
              "on-error-container": "#93000a",
              "surface-container-lowest": "#ffffff",
              "surface-container-highest": "#e1e3e4",
              "on-primary": "#ffffff",
              "on-surface": "#191c1d",
              "surface-container-low": "#f3f4f5",
              "error-container": "#ffdad6",
              "secondary-fixed": "#ebddff",
              "surface-container-high": "#e7e8e9",
              "primary-container": "#7c3aed",
              "on-tertiary-fixed": "#301400",
              "tertiary": "#7d3d00",
              "on-tertiary-container": "#ffe0cd",
              "error": "#ba1a1a",
              "outline-variant": "#ccc3d8",
              "secondary": "#6e3aca",
              "tertiary-fixed": "#ffdcc6",
              "surface-bright": "#f8f9fa",
              "on-secondary-container": "#fffbff",
              "on-primary-fixed": "#25005a",
              "on-background": "#191c1d",
              "on-primary-container": "#ede0ff",
              "surface-tint": "#732ee4",
              "primary-fixed-dim": "#d2bbff",
              "on-secondary-fixed-variant": "#581db3",
              "outline": "#7b7487",
              "on-tertiary": "#ffffff",
              "surface-dim": "#d9dadb",
              "secondary-fixed-dim": "#d3bbff",
              "secondary-container": "#8856e5",
              "on-secondary-fixed": "#250059",
              "background": "#f8f9fa",
              "tertiary-fixed-dim": "#ffb784",
              "primary": "#630ed4",
              "tertiary-container": "#a15100",
              "inverse-on-surface": "#f0f1f2",
              "primary-fixed": "#eaddff",
              "on-secondary": "#ffffff",
              "surface-container": "#edeeef",
              "on-error": "#ffffff",
              "inverse-surface": "#2e3132",
              "surface": "#f8f9fa",
              "on-surface-variant": "#4a4455",
              "on-primary-fixed-variant": "#5a00c6",
              "inverse-primary": "#d2bbff"
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
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .glass-panel { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(20px); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
    </style>
</head>
<body class="bg-surface text-on-surface">
<!-- SideNavBar Shell -->
<aside class="h-screen w-64 fixed left-0 top-0 border-r-0 bg-slate-50 dark:bg-slate-900 flex flex-col py-8 px-4 z-50">
<div class="text-xl font-bold text-purple-700 dark:text-purple-400 mb-8 flex items-center gap-2">
<span class="material-symbols-outlined text-3xl" data-weight="fill" style="font-variation-settings: 'FILL' 1;">restaurant_menu</span>
            The Culinary Curator
        </div>
<nav class="space-y-2 flex-1">
<!-- Portfolio Overview - Inactive -->
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors duration-200 font-medium text-sm" href="#">
<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
                Portfolio Overview
            </a>
<!-- My Restaurants - Inactive -->
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors duration-200 font-medium text-sm" href="#">
<span class="material-symbols-outlined" data-icon="storefront">storefront</span>
                My Restaurants
            </a>
<!-- Global Analytics - Active -->
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-purple-700 dark:text-purple-300 font-bold border-r-4 border-purple-600 dark:border-purple-400 bg-purple-50/50 dark:bg-purple-900/20 text-sm" href="#">
<span class="material-symbols-outlined" data-icon="analytics">analytics</span>
                Global Analytics
            </a>
</nav>
<div class="mt-auto pt-8 border-t border-outline-variant/20 flex items-center gap-3 px-4">
<img alt="Owner Profile Picture" class="w-10 h-10 rounded-full object-cover bg-surface-container-high" data-alt="professional headshot of a sophisticated restaurant owner in a tailored blazer, minimalist luxury background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZAN6zhavgqdbxl34URxSA9KmuFFLhUQripCt0AsWMbjAzLQa6YWkW_M2O1Ix0UKZ46VOKPEyBSK3g_JzqIxSCBUEDS_ptgANgvjKrFJ_5JxSoaZhlHQHCHIA97u-HAequuomchX4HvLzckpxZTMhb-Q7p2CINh6YvA4pv4EekSIFPrvE8tqLK4CqciMyiM2E-mahC5r8weQIPQKyrtLJ7MkXVrJdhjOYW583IETTqvk7x1dBstGcrgYp8IcyUDMjWrEtLpjn8gYzR"/>
<div>
<p class="text-sm font-bold">Owner Profile</p>
<p class="text-xs text-on-surface-variant">Digital Maître D'</p>
</div>
</div>
</aside>
<!-- TopNavBar Shell -->
<header class="fixed top-0 right-0 w-[calc(100%-16rem)] z-40 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl flex justify-between items-center px-8 h-20">
<div class="flex-1 max-w-xl">
<div class="relative group">
<span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input class="w-full bg-surface-container-low border-none rounded-full py-2.5 pl-12 pr-4 focus:ring-2 focus:ring-purple-500/20 font-body text-sm placeholder:text-on-surface-variant/60" placeholder="Search portfolio data..." type="text"/>
</div>
</div>
<div class="flex items-center gap-6">
<button class="text-slate-600 dark:text-slate-400 hover:text-purple-600 transition-all">
<span class="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
<button class="text-slate-600 dark:text-slate-400 hover:text-purple-600 transition-all">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
</button>
<div class="h-8 w-px bg-outline-variant/30"></div>
<img alt="Owner Avatar" class="w-10 h-10 rounded-full border-2 border-primary-container/20" data-alt="minimalist profile icon of a restaurant group executive, clean white background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmeUpGbxB6FJ25QKleTIFViUrKnUtc52Pte6swD_IbMdzF8HooOgJt5j3KN9SLd6o1zMQKlxDMNHDReDwBy4bCRDUYNb_zuM69arPXjjP3nXzL3GxTM1G4JIt2xmNEZUOz3xr6ZxsI12ceKbDTePEmuLbjDZVZLnuw4BdyGCdldAtycA4akuu3I_2wGXo3H0h_NkjfPLgUdgsVktWphsk5PkzjNqHCcaMu-oyHMrVkU4GUA0sRQ26ohxq5bXMNzwFfbn5OZ_vVSbKr"/>
</div>
</header>
<!-- Main Content Canvas -->
<main class="ml-64 pt-28 pb-20 px-8 min-h-screen">
<!-- Header Section -->
<header class="mb-12 flex justify-between items-end">
<div>
<h1 class="text-4xl font-extrabold tracking-tight font-headline text-on-surface mb-2">Global Portfolio Analytics</h1>
<p class="text-on-surface-variant font-body text-lg">Real-time performance metrics for {{DATA:SCREEN:SCREEN_82}}</p>
</div>
<div class="flex gap-3">
<button class="px-6 py-2.5 rounded-full bg-surface-container-high text-on-surface font-semibold text-sm hover:bg-surface-variant transition-colors">
                    Export Report
                </button>
<button class="px-6 py-2.5 rounded-full bg-primary text-on-primary font-semibold text-sm hover:bg-primary-container transition-all shadow-lg shadow-primary/20">
                    Live View
                </button>
</div>
</header>
<!-- Section 1: Global KPIs (Bento Grid Style) -->
<section class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
<div class="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/10 group hover:shadow-xl transition-all duration-300">
<div class="flex justify-between items-start mb-4">
<span class="p-2 rounded-lg bg-purple-50 text-primary">
<span class="material-symbols-outlined" data-weight="fill">payments</span>
</span>
<span class="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+12.4%</span>
</div>
<h3 class="text-on-surface-variant text-sm font-medium mb-1">Total Portfolio Revenue</h3>
<p class="text-3xl font-extrabold text-on-surface">$1.24M</p>
</div>
<div class="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/10 group hover:shadow-xl transition-all duration-300">
<div class="flex justify-between items-start mb-4">
<span class="p-2 rounded-lg bg-blue-50 text-blue-600">
<span class="material-symbols-outlined" data-weight="fill">calendar_month</span>
</span>
<span class="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+8.2%</span>
</div>
<h3 class="text-on-surface-variant text-sm font-medium mb-1">Total Bookings</h3>
<p class="text-3xl font-extrabold text-on-surface">14.2k</p>
</div>
<div class="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/10 group hover:shadow-xl transition-all duration-300">
<div class="flex justify-between items-start mb-4">
<span class="p-2 rounded-lg bg-orange-50 text-orange-600">
<span class="material-symbols-outlined" data-weight="fill">pie_chart</span>
</span>
<span class="text-xs font-bold text-on-surface-variant bg-surface-container-low px-2 py-1 rounded-full">Target: 85%</span>
</div>
<h3 class="text-on-surface-variant text-sm font-medium mb-1">Avg. Occupancy</h3>
<p class="text-3xl font-extrabold text-on-surface">82%</p>
</div>
<div class="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/10 group hover:shadow-xl transition-all duration-300">
<div class="flex justify-between items-start mb-4">
<span class="p-2 rounded-lg bg-emerald-50 text-emerald-600">
<span class="material-symbols-outlined" data-weight="fill">location_on</span>
</span>
<span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Full Capacity</span>
</div>
<h3 class="text-on-surface-variant text-sm font-medium mb-1">Active Venues</h3>
<p class="text-3xl font-extrabold text-on-surface">12/12</p>
</div>
</section>
<!-- Section 2 & 4: Charts Row -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
<!-- Global Revenue Trend (Large Area Chart) -->
<div class="lg:col-span-2 bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/10">
<div class="flex justify-between items-center mb-8">
<div>
<h2 class="text-xl font-bold text-on-surface">Guest Type Breakdown</h2>
<p class="text-sm text-on-surface-variant">Last 6 months performance growth</p>
</div>
<select class="bg-surface-container-low border-none rounded-lg text-sm font-semibold px-4 py-2 outline-none ring-0">
<option>Monthly View</option>
<option>Weekly View</option>
</select>
</div>
<div class="h-64 relative">
<!-- Placeholder for Chart Graphics -->
<div class="absolute inset-0 flex items-end justify-between px-2">
<div class="w-full h-full flex flex-col justify-end">
<div class="relative w-full h-[70%] bg-gradient-to-t from-primary/20 to-primary/0 rounded-t-lg">
<svg class="absolute bottom-0 w-full h-full overflow-visible" preserveaspectratio="none" viewbox="0 0 100 100">
<path d="M0,80 Q25,75 50,60 T100,20 L100,100 L0,100 Z" fill="url(#grad1)"></path>
<path d="M0,80 Q25,75 50,60 T100,20" fill="none" stroke="#630ed4" stroke-width="2"></path>
<defs>
<lineargradient id="grad1" x1="0%" x2="0%" y1="0%" y2="100%">
<stop offset="0%" style="stop-color:#7c3aed;stop-opacity:0.2"></stop>
<stop offset="100%" style="stop-color:#7c3aed;stop-opacity:0"></stop>
</lineargradient>
</defs>
</svg>
</div>
</div>
</div>
<!-- Axis Labels -->
<div class="flex justify-between mt-4 text-xs font-bold text-on-surface-variant/60 uppercase tracking-widest">
<span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
</div>
</div>
</div>
<!-- Booking Distribution -->
<div class="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/10">
<h2 class="text-xl font-bold text-on-surface mb-2">Guest Type Breakdown</h2>
<p class="text-sm text-on-surface-variant mb-8">Portfolio-wide demographics</p>
<div class="space-y-6">
<div class="space-y-2">
<div class="flex justify-between text-sm">
<span class="font-medium">Couples (2 Guests)</span>
<span class="font-bold text-primary">42%</span>
</div>
<div class="h-2 w-full bg-surface-container-low rounded-full overflow-hidden">
<div class="h-full bg-primary w-[42%] rounded-full"></div>
</div>
</div>
<div class="space-y-2">
<div class="flex justify-between text-sm">
<span class="font-medium">Small Groups (4-6 Guests)</span>
<span class="font-bold text-primary">38%</span>
</div>
<div class="h-2 w-full bg-surface-container-low rounded-full overflow-hidden">
<div class="h-full bg-primary/70 w-[38%] rounded-full"></div>
</div>
</div>
<div class="space-y-2">
<div class="flex justify-between text-sm">
<span class="font-medium">Parties (8+ Guests)</span>
<span class="font-bold text-primary">20%</span>
</div>
<div class="h-2 w-full bg-surface-container-low rounded-full overflow-hidden">
<div class="h-full bg-primary/40 w-[20%] rounded-full"></div>
</div>
</div>
</div>
</div>
</div>
<div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
<!-- Section 3: Performance by Venue -->
<section>
<div class="flex justify-between items-center mb-6">
<h2 class="text-2xl font-bold text-on-surface">Top-Performing Venues</h2>
<button class="text-primary font-bold text-sm border-b-2 border-primary/20 hover:border-primary transition-all">View All Venues</button>
</div>
<div class="space-y-4">
<!-- Venue Card 1 -->
<div class="group flex items-center p-4 bg-surface-container-low rounded-xl hover:bg-surface-container-lowest hover:shadow-lg transition-all duration-300">
<img alt="Restaurant Image" class="w-16 h-16 rounded-lg object-cover bg-white" data-alt="interior of a high-end contemporary bistro with velvet seating and warm ambient lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-fS2AYs-tSxzBcjPAic7LcHKUXIDOc2UhPyJWq6GKD2Ye1chshScY835ArBcTDmKKbgwlRu4oQCBuY5D8r8IRBC67CGE72Faa0Llx5sDlCVV1zmb5O6gwbcC5KKtg6ZkyVJeY57GxCbGp8FX51LBveX6z1ZmI36lwO7wTA1oAvwafI1MoUP7GRjANzGPuXhogL8V1-WZmdTo31eK-Ua6G6hdh89SteObXukxMiEvQOok7UliECz2-O02OVtm5DUsEBf61lgcHE4qQ"/>
<div class="ml-4 flex-1">
<h4 class="font-bold text-lg text-on-surface">L'Essence Parisienne</h4>
<div class="flex items-center gap-4 text-sm text-on-surface-variant">
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm text-yellow-500" style="font-variation-settings: 'FILL' 1;">star</span> 4.9</span>
<span>High-End Dining</span>
</div>
</div>
<div class="text-right">
<p class="font-extrabold text-on-surface">$245.8k</p>
<p class="text-xs text-green-600 font-bold">Top Revenue</p>
</div>
</div>
<!-- Venue Card 2 -->
<div class="group flex items-center p-4 bg-surface-container-low rounded-xl hover:bg-surface-container-lowest hover:shadow-lg transition-all duration-300">
<img alt="Restaurant Image" class="w-16 h-16 rounded-lg object-cover bg-white" data-alt="minimalist omakase sushi counter with light wood accents and precise chef preparation area" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBV9BKMIfQlgbjV39DRy22VYa-FYZysYKX3Afp0XHjaFxof07A5MkmhyQuIvbjswVeEz33Nx66ErpHTjGnDOE6DmrWG0bOcelPyBNlMrRoWHv0L7mnEU1cFMjIBFW_GI9O455qqzniPX2FV1JJS9wQ8WdmZ5N4eGH94lEord7EqVouaF34jlu9gVHqoIr3B-NDMxJoLj5MrXr4P74GlSJzxaf8udPULEajExBXhIZVOqIf7kW2V48m56Z-4DHPSgWij9JgvsEFKYTqK"/>
<div class="ml-4 flex-1">
<h4 class="font-bold text-lg text-on-surface">Zen Sushi Atelier</h4>
<div class="flex items-center gap-4 text-sm text-on-surface-variant">
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm text-yellow-500" style="font-variation-settings: 'FILL' 1;">star</span> 4.8</span>
<span>Japanese Artisan</span>
</div>
</div>
<div class="text-right">
<p class="font-extrabold text-on-surface">$192.4k</p>
<p class="text-xs text-green-600 font-bold">+15% YoY</p>
</div>
</div>
<!-- Venue Card 3 -->
<div class="group flex items-center p-4 bg-surface-container-low rounded-xl hover:bg-surface-container-lowest hover:shadow-lg transition-all duration-300">
<img alt="Restaurant Image" class="w-16 h-16 rounded-lg object-cover bg-white" data-alt="modern rustic wine cellar and tasting room with stone walls and industrial lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJlRp98iRSZszYk_fI4MkUNJDlkd0NeLJ-z4aSiHq1CGtpqr4IraYt7ujGL8fK4yoqhNsTNHH78ZwHpczyKUE6gUnSxV6oYmGHCBuDW3iiS0hJ7h-j1LZfc-GWaEDVMCrGZsxxH8CQQC5_RIU5L1_c5sXzVvE-BZV3ES1JHaly74hu8tS0QqRCYSBnCPTHkrvWh_SNUsGzljMw2Gw4TIWF1p5mUEtCWL0rKpxMmvcygDJc5G61CWjHOM1vOoyUZPAjX2a38OCJpiE-"/>
<div class="ml-4 flex-1">
<h4 class="font-bold text-lg text-on-surface">The Vine Vault</h4>
<div class="flex items-center gap-4 text-sm text-on-surface-variant">
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm text-yellow-500" style="font-variation-settings: 'FILL' 1;">star</span> 4.7</span>
<span>Wine &amp; Tapas</span>
</div>
</div>
<div class="text-right">
<p class="font-extrabold text-on-surface">$158.2k</p>
<p class="text-xs text-on-surface-variant font-bold">Steady Growth</p>
</div>
</div>
</div>
</section>
<!-- Section 5: Recent Global Activity -->
<section>
<div class="flex justify-between items-center mb-6">
<h2 class="text-2xl font-bold text-on-surface">Recent Global Activity</h2>
<span class="flex items-center gap-2 text-xs font-bold text-on-surface-variant uppercase tracking-widest"><span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span> Live Feed</span>
</div>
<div class="bg-surface-container-lowest border border-outline-variant/10 rounded-xl overflow-hidden">
<div class="divide-y divide-outline-variant/10">
<!-- Activity Item 1 -->
<div class="p-4 flex gap-4 hover:bg-surface-container-low transition-colors">
<div class="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-primary">
<span class="material-symbols-outlined text-xl">loyalty</span>
</div>
<div class="flex-1">
<p class="text-sm font-medium"><span class="font-bold">VIP Booking:</span> Julianne Moore + 6 Guests</p>
<p class="text-xs text-on-surface-variant">Confirmed at L'Essence Parisienne • 12 mins ago</p>
</div>
<div class="text-right text-xs font-bold text-primary">High Value</div>
</div>
<!-- Activity Item 2 -->
<div class="p-4 flex gap-4 hover:bg-surface-container-low transition-colors">
<div class="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
<span class="material-symbols-outlined text-xl">celebration</span>
</div>
<div class="flex-1">
<p class="text-sm font-medium"><span class="font-bold">Corporate Event:</span> TechNova Q3 Social</p>
<p class="text-xs text-on-surface-variant">Private Room booked at The Vine Vault • 1 hr ago</p>
</div>
<div class="text-right text-xs font-bold text-on-surface-variant">$4,200.00</div>
</div>
<!-- Activity Item 3 -->
<div class="p-4 flex gap-4 hover:bg-surface-container-low transition-colors">
<div class="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
<span class="material-symbols-outlined text-xl">reviews</span>
</div>
<div class="flex-1">
<p class="text-sm font-medium"><span class="font-bold">New Review:</span> "Impeccable Service..."</p>
<p class="text-xs text-on-surface-variant">5-star rating at Zen Sushi Atelier • 3 hrs ago</p>
</div>
<div class="text-right text-xs font-bold text-green-600">5.0 Rating</div>
</div>
<!-- Activity Item 4 -->
<div class="p-4 flex gap-4 hover:bg-surface-container-low transition-colors">
<div class="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
<span class="material-symbols-outlined text-xl">assignment_late</span>
</div>
<div class="flex-1">
<p class="text-sm font-medium"><span class="font-bold">Stock Alert:</span> Vintage Krug 2008</p>
<p class="text-xs text-on-surface-variant">Low inventory across 3 venues • 5 hrs ago</p>
</div>
<div class="text-right text-xs font-bold text-orange-600">Alert</div>
</div>
</div>
</div>
</section>
</div>
</main>
</body></html>