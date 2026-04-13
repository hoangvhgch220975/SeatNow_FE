<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Wallet &amp; Payouts | The Culinary Curator</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "inverse-surface": "#2e3132",
              "outline": "#7b7487",
              "on-surface-variant": "#4a4455",
              "primary-container": "#7c3aed",
              "on-error": "#ffffff",
              "secondary": "#6e3aca",
              "on-primary-fixed": "#25005a",
              "secondary-fixed-dim": "#d3bbff",
              "inverse-primary": "#d2bbff",
              "surface-container-lowest": "#ffffff",
              "surface": "#f8f9fa",
              "on-primary-fixed-variant": "#5a00c6",
              "on-primary-container": "#ede0ff",
              "surface-container": "#edeeef",
              "secondary-fixed": "#ebddff",
              "primary-fixed-dim": "#d2bbff",
              "tertiary-container": "#a15100",
              "surface-container-low": "#f3f4f5",
              "surface-dim": "#d9dadb",
              "surface-tint": "#732ee4",
              "on-tertiary-fixed": "#301400",
              "on-error-container": "#93000a",
              "on-secondary": "#ffffff",
              "on-background": "#191c1d",
              "secondary-container": "#8856e5",
              "surface-container-highest": "#e1e3e4",
              "on-secondary-fixed": "#250059",
              "on-secondary-container": "#fffbff",
              "surface-bright": "#f8f9fa",
              "inverse-on-surface": "#f0f1f2",
              "on-tertiary-container": "#ffe0cd",
              "on-secondary-fixed-variant": "#581db3",
              "surface-container-high": "#e7e8e9",
              "primary": "#630ed4",
              "on-primary": "#ffffff",
              "error-container": "#ffdad6",
              "primary-fixed": "#eaddff",
              "error": "#ba1a1a",
              "outline-variant": "#ccc3d8",
              "background": "#f8f9fa",
              "tertiary-fixed-dim": "#ffb784",
              "tertiary": "#7d3d00",
              "on-tertiary-fixed-variant": "#713700",
              "on-surface": "#191c1d",
              "tertiary-fixed": "#ffdcc6",
              "surface-variant": "#e1e3e4",
              "on-tertiary": "#ffffff"
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
      .custom-scrollbar::-webkit-scrollbar { width: 4px; }
      .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      .custom-scrollbar::-webkit-scrollbar-thumb { background: #ccc3d8; border-radius: 10px; }
      
      .tab-content { display: none; }
      .tab-content.active { display: block; }
    </style>
</head>
<body class="bg-surface text-on-surface selection:bg-primary-fixed">
<!-- SideNavBar (Authority: JSON & Design System) -->
<aside class="h-screen w-64 fixed left-0 top-0 border-r-0 bg-slate-50 flex flex-col py-6 px-4 z-50">
<div class="mb-10 px-2 flex items-center gap-3">
<div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
<span class="material-symbols-outlined" data-icon="restaurant_menu">restaurant_menu</span>
</div>
<div>
<h1 class="text-lg font-extrabold text-slate-900 tracking-tight">The Culinary Curator</h1>
<p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Partner Dashboard</p>
</div>
</div>
<nav class="flex-1 space-y-1">
<a class="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-100 rounded-lg transition-all duration-200" href="#">
<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span class="font-medium text-sm">Overview</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-100 rounded-lg transition-all duration-200" href="#">
<span class="material-symbols-outlined" data-icon="restaurant_menu">restaurant_menu</span>
<span class="font-medium text-sm">Menu</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-100 rounded-lg transition-all duration-200" href="#">
<span class="material-symbols-outlined" data-icon="table_restaurant">table_restaurant</span>
<span class="font-medium text-sm">Tables</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-100 rounded-lg transition-all duration-200" href="#">
<span class="material-symbols-outlined" data-icon="event_available">event_available</span>
<span class="font-medium text-sm">Bookings</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-100 rounded-lg transition-all duration-200" href="#">
<span class="material-symbols-outlined" data-icon="payments">payments</span>
<span class="font-medium text-sm">Revenue</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 text-purple-600 font-bold border-r-4 border-purple-600 bg-purple-50/50 rounded-l-lg transition-transform active:translate-x-1" href="#">
<span class="material-symbols-outlined" data-icon="account_balance_wallet" style="font-variation-settings: 'FILL' 1;">account_balance_wallet</span>
<span class="font-medium text-sm">Wallet</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-100 rounded-lg transition-all duration-200" href="#">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
<span class="font-medium text-sm">Settings</span>
</a>
</nav>
<div class="mt-auto pt-6 space-y-1">
<div class="h-px bg-gradient-to-r from-slate-100 to-transparent w-full mb-4"></div>
<a class="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-100 rounded-lg transition-all duration-200" href="#">
<span class="material-symbols-outlined" data-icon="help_outline">help_outline</span>
<span class="font-medium text-sm">Help Center</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 text-error hover:bg-error-container/20 rounded-lg transition-all duration-200" href="#">
<span class="material-symbols-outlined" data-icon="logout">logout</span>
<span class="font-medium text-sm">Logout</span>
</a>
</div>
</aside>
<!-- Main Content Shell -->
<main class="ml-64 min-h-screen flex flex-col">
<!-- TopAppBar (Authority: JSON & Design System) -->
<header class="fixed top-0 right-0 left-64 z-40 bg-white/70 backdrop-blur-xl shadow-[0_40px_40px_rgba(99,14,212,0.04)] px-8 py-4 flex items-center justify-between">
<div class="flex items-center gap-8 flex-1">
<h2 class="text-xl font-bold tracking-tight text-slate-900">Wallet &amp; Payouts</h2>
<div class="relative w-full max-w-md">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
<input class="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Search transactions..." type="text"/>
</div>
</div>
<div class="flex items-center gap-4">
<button class="w-10 h-10 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 transition-all">
<span class="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
<button class="w-10 h-10 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 transition-all">
<span class="material-symbols-outlined" data-icon="help">help</span>
</button>
<div class="h-8 w-px bg-slate-100 mx-2"></div>
<div class="flex items-center gap-3 pl-2 group cursor-pointer">
<div class="text-right">
<p class="text-sm font-semibold text-slate-900 leading-tight">M. Castiglione</p>
<p class="text-[11px] text-slate-400 font-medium">Owner</p>
</div>
<img alt="Restaurant Owner" class="w-10 h-10 rounded-full object-cover border-2 border-primary/10" data-alt="professional portrait of a middle-aged restaurant owner in a modern kitchen setting, soft natural lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCRrpU5J425gosT_XtbThqc3E1eJ-BW1YBdq9T8o16WJe9kDcK07frrmny-KZXw-nWgApQ4_bBvPEauydXYaEjdx58bRQhh82lC2_wQ_wc_JA_oqMZd1pXWHpNJncOkpijGix_z0w12PglhjWjVS-lcGxAt6-aVozGhOn5LicyWLwCFzlfPYqtOHmGioHWwqTC0MeL87PWFpSf1FEZrQ65FUDX7AvUM3y2NKS7AnUJi-OqfFyWRkT0D3x1hLrFyu444KYAXx7EOZ8k"/>
</div>
</div>
</header>
<!-- Canvas -->
<div class="mt-24 px-10 pb-20 space-y-12 max-w-7xl mx-auto w-full">
<!-- Financial Summary Cards (Bento Style) -->
<section class="grid grid-cols-1 md:grid-cols-3 gap-6">
<!-- Current Balance -->
<div class="bg-primary text-white p-8 rounded-xl relative overflow-hidden group">
<div class="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-500"></div>
<div class="relative z-10">
<span class="material-symbols-outlined text-white/60 mb-4" data-icon="account_balance_wallet" style="font-variation-settings: 'FILL' 1;">account_balance_wallet</span>
<h3 class="text-sm font-medium text-white/80 uppercase tracking-widest">Current Balance</h3>
<p class="text-4xl font-extrabold mt-2 tracking-tight">$4,250.00</p>
<div class="mt-6 flex items-center gap-2 text-xs font-semibold bg-white/10 w-fit px-3 py-1 rounded-full">
<span class="material-symbols-outlined text-xs">trending_up</span>
                        +12.5% from last month
                    </div>
</div>
</div>
<!-- Pending Clearance -->
<div class="bg-surface-container-lowest p-8 rounded-xl shadow-[0_40px_40px_rgba(99,14,212,0.02)] border border-outline-variant/10">
<span class="material-symbols-outlined text-purple-600 mb-4" data-icon="schedule">schedule</span>
<h3 class="text-sm font-medium text-on-surface-variant uppercase tracking-widest">Pending Clearance</h3>
<p class="text-4xl font-extrabold mt-2 tracking-tight text-slate-900">$1,120.00</p>
<p class="text-xs text-slate-400 mt-6 font-medium">Expected release: 48-72 hours</p>
</div>
<!-- Total Payouts -->
<div class="bg-surface-container-lowest p-8 rounded-xl shadow-[0_40px_40px_rgba(99,14,212,0.02)] border border-outline-variant/10">
<span class="material-symbols-outlined text-purple-600 mb-4" data-icon="payments">payments</span>
<h3 class="text-sm font-medium text-on-surface-variant uppercase tracking-widest">Total Payouts</h3>
<p class="text-4xl font-extrabold mt-2 tracking-tight text-slate-900">$12,400.00</p>
<p class="text-xs text-slate-400 mt-6 font-medium">Lifetime restaurant earnings</p>
</div>
</section>
<!-- Middle Section: Payout Request & Payout History -->
<section class="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
<!-- Payout Request Form -->
<div class="lg:col-span-2 bg-surface-container-low p-8 rounded-xl border border-outline-variant/5 space-y-8">
<div>
<h2 class="text-xl font-bold text-slate-900">Request Payout</h2>
<p class="text-sm text-on-surface-variant mt-2">Transfer your available funds to your chosen destination.</p>
</div>
<div class="space-y-6">
<div class="space-y-2">
<label class="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Withdraw Amount</label>
<div class="relative">
<span class="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
<input class="w-full bg-surface-container-lowest border-none rounded-lg py-4 pl-10 pr-4 text-lg font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 transition-all" type="number" value="4250.00"/>
</div>
</div><div class="space-y-2">
<label class="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Description</label>
<textarea class="w-full bg-surface-container-lowest border-none rounded-lg py-3 px-4 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-primary/20 transition-all min-h-[80px]" placeholder="Add a note for this payout (optional)"></textarea>
</div>
<div class="space-y-3">
<label class="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Destination</label>
<div class="grid grid-cols-2 gap-2 bg-surface-container-highest p-1 rounded-xl">
<button class="flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all bg-white text-primary shadow-sm" id="tab-link-card" onclick="switchTab('link-card')">
<span class="material-symbols-outlined text-base" data-icon="credit_card">credit_card</span>
                                Link Card
                            </button>
<button class="flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all text-slate-500 hover:text-slate-700" id="tab-upload-qr" onclick="switchTab('upload-qr')">
<span class="material-symbols-outlined text-base" data-icon="qr_code_2">qr_code_2</span>
                                Upload QR
                            </button>
</div>
<!-- Link Card Form -->
<div class="tab-content active space-y-4 pt-2" id="content-link-card"><div class="space-y-4 pt-2">
<div class="space-y-1">
<input class="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Bank: NCB" type="text"/>
</div>
<div class="space-y-1">
<input class="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all" placeholder="9704198526191432198" type="text"/>
</div>
<div class="space-y-1">
<input class="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all" placeholder="NGUYEN VAN A" type="text"/>
</div>
<div class="grid grid-cols-2 gap-4">
<input class="bg-surface-container-lowest border border-outline-variant/20 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all" placeholder="07/15" type="text"/>
<input class="bg-surface-container-lowest border border-outline-variant/20 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all" placeholder="CVV" type="text"/>
</div>
</div></div>
<!-- Upload QR Area -->
<div class="tab-content space-y-4 pt-2" id="content-upload-qr">
<div class="border-2 border-dashed border-outline-variant/40 rounded-xl p-8 flex flex-col items-center justify-center bg-surface-container-lowest hover:bg-slate-50 transition-colors cursor-pointer group">
<div class="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-primary" data-icon="cloud_upload">cloud_upload</span>
</div>
<p class="text-sm font-bold text-slate-700">Drop your QR code here</p>
<p class="text-[11px] text-slate-400 mt-1">or click to browse</p>
</div>
</div>
</div>
<button class="w-full bg-primary hover:bg-primary-container text-white font-bold py-4 rounded-full transition-all duration-300 active:scale-95 shadow-lg shadow-primary/20 flex items-center justify-center gap-2" type="button">
<span class="material-symbols-outlined text-sm" data-icon="send">send</span>
                        Withdraw Funds
                    </button>
<p class="text-[10px] text-center text-slate-400 px-4 leading-relaxed font-medium">
                        Standard payouts take 1-3 business days. Funds will be deposited into your verified destination.
                    </p>
</div>
</div>
<!-- Payout History Table -->
<div class="lg:col-span-3 bg-surface-container-lowest rounded-xl shadow-[0_40px_40px_rgba(99,14,212,0.02)] overflow-hidden">
<div class="p-8 pb-4 flex items-center justify-between">
<h2 class="text-xl font-bold text-slate-900">Payout History</h2>
<button class="text-primary text-sm font-semibold hover:underline">Download CSV</button>
</div>
<div class="overflow-x-auto">
<table class="w-full text-left">
<thead>
<tr class="border-b border-slate-50">
<th class="px-8 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Date</th>
<th class="px-4 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Payout ID</th>
<th class="px-4 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest text-right">Amount</th>
<th class="px-8 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest text-right">Status</th>
</tr>
</thead>
<tbody class="divide-y divide-slate-50">
<tr class="hover:bg-slate-50/50 transition-colors">
<td class="px-8 py-4 text-sm font-semibold text-slate-900">May 12, 2024</td>
<td class="px-4 py-4 text-sm font-medium text-slate-400">#PAY-9921</td>
<td class="px-4 py-4 text-sm font-bold text-slate-900 text-right">$3,200.00</td>
<td class="px-8 py-4 text-right">
<span class="inline-flex items-center gap-1 text-[10px] font-bold px-3 py-1 bg-green-50 text-green-600 rounded-full uppercase">
<span class="w-1 h-1 rounded-full bg-green-600"></span>
                                        Completed
                                    </span>
</td>
</tr>
<tr class="hover:bg-slate-50/50 transition-colors">
<td class="px-8 py-4 text-sm font-semibold text-slate-900">May 08, 2024</td>
<td class="px-4 py-4 text-sm font-medium text-slate-400">#PAY-9918</td>
<td class="px-4 py-4 text-sm font-bold text-slate-900 text-right">$1,450.00</td>
<td class="px-8 py-4 text-right">
<span class="inline-flex items-center gap-1 text-[10px] font-bold px-3 py-1 bg-blue-50 text-blue-600 rounded-full uppercase">
<span class="w-1 h-1 rounded-full bg-blue-600"></span>
                                        Processing
                                    </span>
</td>
</tr>
<tr class="hover:bg-slate-50/50 transition-colors">
<td class="px-8 py-4 text-sm font-semibold text-slate-900">May 01, 2024</td>
<td class="px-4 py-4 text-sm font-medium text-slate-400">#PAY-9905</td>
<td class="px-4 py-4 text-sm font-bold text-slate-900 text-right">$4,100.00</td>
<td class="px-8 py-4 text-right">
<span class="inline-flex items-center gap-1 text-[10px] font-bold px-3 py-1 bg-green-50 text-green-600 rounded-full uppercase">
<span class="w-1 h-1 rounded-full bg-green-600"></span>
                                        Completed
                                    </span>
</td>
</tr>
<tr class="hover:bg-slate-50/50 transition-colors">
<td class="px-8 py-4 text-sm font-semibold text-slate-900">Apr 24, 2024</td>
<td class="px-4 py-4 text-sm font-medium text-slate-400">#PAY-9882</td>
<td class="px-4 py-4 text-sm font-bold text-slate-900 text-right">$950.00</td>
<td class="px-8 py-4 text-right">
<span class="inline-flex items-center gap-1 text-[10px] font-bold px-3 py-1 bg-red-50 text-red-600 rounded-full uppercase">
<span class="w-1 h-1 rounded-full bg-red-600"></span>
                                        Failed
                                    </span>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</section>
<!-- Recent Transactions Table -->
<section class="bg-surface-container-lowest rounded-xl shadow-[0_40px_40px_rgba(99,14,212,0.02)] border border-outline-variant/10">
<div class="p-8 flex items-center justify-between border-b border-slate-50">
<h2 class="text-xl font-extrabold text-slate-900">Recent Transactions</h2>
<div class="flex gap-2">
<button class="px-4 py-2 rounded-full border border-slate-100 text-xs font-bold text-slate-500 hover:bg-slate-50">Filter</button>
<button class="px-4 py-2 rounded-full border border-slate-100 text-xs font-bold text-slate-500 hover:bg-slate-50">Export</button>
</div>
</div>
<div class="overflow-x-auto">
<table class="w-full text-left">
<thead>
<tr class="bg-slate-50/50">
<th class="px-8 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Date</th>
<th class="px-4 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Description</th>
<th class="px-4 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Type</th>
<th class="px-8 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest text-right">Amount</th>
</tr>
</thead>
<tbody class="divide-y divide-slate-50">
<!-- Income Row -->
<tr class="hover:bg-slate-50/50 transition-colors group">
<td class="px-8 py-5 text-sm font-semibold text-slate-900">May 15, 2024</td>
<td class="px-4 py-5">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
<span class="material-symbols-outlined text-sm" data-icon="restaurant">restaurant</span>
</div>
<span class="text-sm font-bold text-slate-900">Booking #BK-9421 Deposit</span>
</div>
</td>
<td class="px-4 py-5">
<span class="text-[10px] font-bold px-2 py-1 bg-green-50 text-green-700 rounded-md uppercase">Income</span>
</td>
<td class="px-8 py-5 text-right font-bold text-green-600">+$245.00</td>
</tr>
<!-- Fee Row -->
<tr class="hover:bg-slate-50/50 transition-colors group">
<td class="px-8 py-5 text-sm font-semibold text-slate-900">May 14, 2024</td>
<td class="px-4 py-5">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
<span class="material-symbols-outlined text-sm" data-icon="percent">percent</span>
</div>
<span class="text-sm font-bold text-slate-900">Platform Service Fee</span>
</div>
</td>
<td class="px-4 py-5">
<span class="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-600 rounded-md uppercase">Fee</span>
</td>
<td class="px-8 py-5 text-right font-bold text-slate-900">-$12.25</td>
</tr>
<!-- Income Row -->
<tr class="hover:bg-slate-50/50 transition-colors group">
<td class="px-8 py-5 text-sm font-semibold text-slate-900">May 14, 2024</td>
<td class="px-4 py-5">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
<span class="material-symbols-outlined text-sm" data-icon="restaurant">restaurant</span>
</div>
<span class="text-sm font-bold text-slate-900">Booking #BK-9419 Deposit</span>
</div>
</td>
<td class="px-4 py-5">
<span class="text-[10px] font-bold px-2 py-1 bg-green-50 text-green-700 rounded-md uppercase">Income</span>
</td>
<td class="px-8 py-5 text-right font-bold text-green-600">+$180.00</td>
</tr>
<!-- Fee Row -->
<tr class="hover:bg-slate-50/50 transition-colors group">
<td class="px-8 py-5 text-sm font-semibold text-slate-900">May 13, 2024</td>
<td class="px-4 py-5">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
<span class="material-symbols-outlined text-sm" data-icon="percent">percent</span>
</div>
<span class="text-sm font-bold text-slate-900">SMS Notification Fee</span>
</div>
</td>
<td class="px-4 py-5">
<span class="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-600 rounded-md uppercase">Fee</span>
</td>
<td class="px-8 py-5 text-right font-bold text-slate-900">-$0.15</td>
</tr>
</tbody>
</table>
</div>
<div class="p-4 bg-slate-50/50 flex justify-center border-t border-slate-50">
<button class="text-xs font-extrabold text-primary hover:text-primary-container transition-colors uppercase tracking-widest">Load More Transactions</button>
</div>
</section>
</div>
<!-- Sticky Footer CTA -->
</main>
<script>
    function switchTab(tab) {
        // Reset Tabs
        const linkCardBtn = document.getElementById('tab-link-card');
        const uploadQrBtn = document.getElementById('tab-upload-qr');
        
        linkCardBtn.className = "flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all text-slate-500 hover:text-slate-700";
        uploadQrBtn.className = "flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all text-slate-500 hover:text-slate-700";
        
        // Hide Contents
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        // Activate Selected
        if (tab === 'link-card') {
            linkCardBtn.className = "flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all bg-white text-primary shadow-sm";
            document.getElementById('content-link-card').classList.add('active');
        } else {
            uploadQrBtn.className = "flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all bg-white text-primary shadow-sm";
            document.getElementById('content-upload-qr').classList.add('active');
        }
    }
</script>
</body></html>