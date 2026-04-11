<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Menu Management | The Culinary Curator</title>
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
                        "secondary-fixed": "#ebddff",
                        "primary-container": "#7c3aed",
                        "on-secondary-fixed-variant": "#581db3",
                        "on-primary-fixed-variant": "#5a00c6",
                        "surface-variant": "#e1e3e4",
                        "primary-fixed-dim": "#d2bbff",
                        "on-tertiary-container": "#ffe0cd",
                        "on-error": "#ffffff",
                        "tertiary-fixed": "#ffdcc6",
                        "on-tertiary": "#ffffff",
                        "on-secondary": "#ffffff",
                        "surface-dim": "#d9dadb",
                        "surface-container-high": "#e7e8e9",
                        "tertiary-container": "#a15100",
                        "inverse-primary": "#d2bbff",
                        "on-primary-fixed": "#25005a",
                        "on-secondary-fixed": "#250059",
                        "surface-bright": "#f8f9fa",
                        "surface": "#f8f9fa",
                        "on-primary": "#ffffff",
                        "on-primary-container": "#ede0ff",
                        "error-container": "#ffdad6",
                        "tertiary-fixed-dim": "#ffb784",
                        "error": "#ba1a1a",
                        "tertiary": "#7d3d00",
                        "outline-variant": "#ccc3d8",
                        "outline": "#7b7487",
                        "on-background": "#191c1d",
                        "on-error-container": "#93000a",
                        "surface-tint": "#732ee4",
                        "background": "#f8f9fa",
                        "on-secondary-container": "#fffbff",
                        "inverse-surface": "#2e3132",
                        "surface-container-low": "#f3f4f5",
                        "surface-container-highest": "#e1e3e4",
                        "secondary-fixed-dim": "#d3bbff",
                        "surface-container": "#edeeef",
                        "on-tertiary-fixed-variant": "#713700",
                        "on-surface": "#191c1d",
                        "inverse-on-surface": "#f0f1f2",
                        "surface-container-lowest": "#ffffff",
                        "on-surface-variant": "#4a4455",
                        "primary-fixed": "#eaddff",
                        "secondary-container": "#8856e5",
                        "secondary": "#6e3aca",
                        "on-tertiary-fixed": "#301400",
                        "primary": "#630ed4"
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
        .glass-effect { backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
        .ambient-shadow { shadow-[0_40px_40px_-15px_rgba(99,14,212,0.04)]; }
    </style>
</head>
<body class="bg-surface text-on-surface flex min-h-screen">
<!-- SideNavBar -->
<aside class="fixed left-0 top-0 h-full w-72 bg-zinc-50 dark:bg-zinc-900 flex flex-col p-6 space-y-8 z-50">
<div class="flex flex-col space-y-1">
<span class="text-2xl font-black text-violet-700 dark:text-violet-500">Aura Reserve</span>
<span class="font-plus-jakarta text-label-md tracking-wider uppercase text-zinc-500 dark:text-zinc-400">Elite Management</span>
</div>
<nav class="flex-1 space-y-2">
<a class="flex items-center gap-4 p-4 text-zinc-500 dark:text-zinc-400 hover:text-violet-500 hover:translate-x-1 transition-all duration-300 active:scale-[0.98]" href="#">
<span class="material-symbols-outlined">dashboard</span>
<span class="font-plus-jakarta text-label-md tracking-wider uppercase">Dashboard</span>
</a>
<a class="flex items-center gap-4 p-4 bg-white dark:bg-zinc-800 text-violet-700 dark:text-violet-300 rounded-2xl shadow-sm font-bold hover:translate-x-1 transition-all duration-300 active:scale-[0.98]" href="#">
<span class="material-symbols-outlined">restaurant_menu</span>
<span class="font-plus-jakarta text-label-md tracking-wider uppercase">Menu Manager</span>
</a>
<a class="flex items-center gap-4 p-4 text-zinc-500 dark:text-zinc-400 hover:text-violet-500 hover:translate-x-1 transition-all duration-300 active:scale-[0.98]" href="#">
<span class="material-symbols-outlined">event_available</span>
<span class="font-plus-jakarta text-label-md tracking-wider uppercase">Reservations</span>
</a>
<a class="flex items-center gap-4 p-4 text-zinc-500 dark:text-zinc-400 hover:text-violet-500 hover:translate-x-1 transition-all duration-300 active:scale-[0.98]" href="#">
<span class="material-symbols-outlined">leaderboard</span>
<span class="font-plus-jakarta text-label-md tracking-wider uppercase">Analytics</span>
</a>
<a class="flex items-center gap-4 p-4 text-zinc-500 dark:text-zinc-400 hover:text-violet-500 hover:translate-x-1 transition-all duration-300 active:scale-[0.98]" href="#">
<span class="material-symbols-outlined">group</span>
<span class="font-plus-jakarta text-label-md tracking-wider uppercase">Staff</span>
</a>
</nav>
<button class="bg-primary text-on-primary py-4 px-6 rounded-lg font-bold hover:bg-primary-container transition-colors duration-300 active:scale-95 shadow-lg">
            Add New Dish
        </button>
<div class="pt-6 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
<a class="flex items-center gap-4 p-4 text-zinc-500 dark:text-zinc-400 hover:text-violet-500 transition-all" href="#">
<span class="material-symbols-outlined">help</span>
<span class="font-plus-jakarta text-label-md tracking-wider uppercase">Help Center</span>
</a>
<a class="flex items-center gap-4 p-4 text-zinc-500 dark:text-zinc-400 hover:text-violet-500 transition-all" href="#">
<span class="material-symbols-outlined">logout</span>
<span class="font-plus-jakarta text-label-md tracking-wider uppercase">Logout</span>
</a>
</div>
</aside>
<!-- Main Content Area -->
<main class="flex-1 ml-72 min-h-screen flex flex-col">
<!-- TopNavBar -->
<header class="sticky top-0 z-40 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl flex justify-between items-center w-full px-12 h-20 shadow-[0_40px_40px_-15px_rgba(99,14,212,0.04)]">
<div class="flex items-center gap-8 flex-1">
<span class="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">The Culinary Curator</span>
<div class="relative w-96">
<span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">search</span>
<input class="w-full bg-zinc-100/50 dark:bg-zinc-800/50 border-none rounded-full py-2.5 pl-12 pr-6 focus:ring-2 focus:ring-primary/20 transition-all font-body text-body-lg" placeholder="Search menu items..." type="text"/>
</div>
</div>
<div class="flex items-center gap-6">
<button class="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors active:scale-95">
<span class="material-symbols-outlined text-zinc-600 dark:text-zinc-400">notifications</span>
</button>
<button class="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors active:scale-95">
<span class="material-symbols-outlined text-zinc-600 dark:text-zinc-400">settings</span>
</button>
<div class="h-10 w-10 rounded-full overflow-hidden border-2 border-primary/20">
<img alt="Chef profile picture" class="w-full h-full object-cover" data-alt="professional portrait of a head chef in a white uniform with a friendly smile, warm kitchen lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjHPwkUy21cPczgI0BpHpwdXNB5bylxJskrYZ2pI8rjacMpj0oJwpNNJX5jBM87jfSkbR5PSKoTP-F-ABGxad17YzlvQl41TC-wYbZEjeTsDHDI7tlIjyy0x4F119pKo9N2HCojCLybK3fSvGbu_o93Uc1JCivCAOsIys2t4P0dkhJ24vAngkZu3N9g9fiO2X72bmtbBDkAWzF3AQ12srwPwYrd0Qy_7m3gy6LJs-YS0qvVgVKWIqqVpGjJmDL6w_aHS5-yqZ_28H9"/>
</div>
</div>
</header>
<!-- Content Canvas -->
<div class="p-12 space-y-12">
<!-- Page Header -->
<section class="flex justify-between items-end">
<div>
<h1 class="text-display-lg font-bold text-zinc-900 leading-tight">Menu Management</h1>
<p class="text-body-lg text-on-surface-variant mt-2 max-w-xl">Curate your restaurant's digital offering. Adjust pricing, status, and descriptions to reflect your seasonal flavors.</p>
</div>
<button class="bg-primary text-on-primary py-4 px-10 rounded-lg font-bold hover:bg-primary-container transition-all duration-300 active:scale-95 shadow-lg flex items-center gap-2">
<span class="material-symbols-outlined">add</span>
                    Add New Dish
                </button>
</section>
<!-- Filter Section -->
<section class="flex flex-wrap items-center justify-between gap-6">
<div class="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
<button class="bg-primary text-on-primary px-6 py-2.5 rounded-full font-bold text-label-md transition-all">All</button>
<button class="bg-surface-container-low text-on-surface-variant px-6 py-2.5 rounded-full font-bold text-label-md hover:bg-surface-container-high transition-all">Appetizers</button>
<button class="bg-surface-container-low text-on-surface-variant px-6 py-2.5 rounded-full font-bold text-label-md hover:bg-surface-container-high transition-all">Main Course</button>
<button class="bg-surface-container-low text-on-surface-variant px-6 py-2.5 rounded-full font-bold text-label-md hover:bg-surface-container-high transition-all">Desserts</button>
<button class="bg-surface-container-low text-on-surface-variant px-6 py-2.5 rounded-full font-bold text-label-md hover:bg-surface-container-high transition-all">Drinks</button>
</div>
<div class="flex items-center gap-4">
<div class="relative">
<select class="appearance-none bg-surface-container-low border-none rounded-full py-2.5 pl-6 pr-12 focus:ring-2 focus:ring-primary/20 font-bold text-label-md text-on-surface-variant cursor-pointer">
<option>Status: All</option>
<option>Status: Active</option>
<option>Status: Inactive</option>
</select>
<span class="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">expand_more</span>
</div>
</div>
</section>
<!-- Menu Grid -->
<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
<!-- Dish Card 1 -->
<div class="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_40px_40px_-15px_rgba(99,14,212,0.04)] hover:scale-[1.02] transition-all duration-300 flex flex-col">
<div class="h-64 relative overflow-hidden">
<img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="close-up of grilled seabass fillet with herb butter, lemon slices, and asparagus on a white ceramic plate, professional food photography" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgnV1scIJ4iKAaISTSITF-Rsj3oI2JjSMmbKkMxSAbpycnST_GzSS7UtlPETBtO7FMQGcoTKea7dappQU0MAZ58u4_buRfRiWO6oshJDTKb1XfVWd8ORhSrSKaj26eOwccOCpDacgsOatjgLwuuJAIKJ36vDq4AH3ZO_-B8vVKDrtcZYQKjZBuPNrJ26pfUY_OLSxdwEsndKanFjTJ7ivEuaca_MV7oySUgExdps-E8qTp0_rAEgc_YkqEcdMdEvhPIPggispQ0MJ9"/>
<div class="absolute top-4 left-4 bg-emerald-500/90 text-white px-4 py-1.5 rounded-full text-label-md font-bold glass-effect">Active</div>
<div class="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-3 bg-white/90 rounded-full text-zinc-800 hover:text-primary transition-colors glass-effect shadow-lg"><span class="material-symbols-outlined">edit</span></button>
<button class="p-3 bg-white/90 rounded-full text-zinc-800 hover:text-error transition-colors glass-effect shadow-lg"><span class="material-symbols-outlined">delete</span></button>
</div>
</div>
<div class="p-8 flex-1 flex flex-col">
<div class="flex justify-between items-start mb-2">
<h3 class="text-title-lg font-bold text-zinc-900 leading-snug">Grilled Seabass with Herb Butter</h3>
<span class="text-title-lg font-bold text-primary">$32.00</span>
</div>
<p class="text-body-lg text-on-surface-variant flex-1 mb-6">Fresh wild-caught seabass grilled to flaky perfection, topped with a signature lemon-thyme infused compound butter.</p>
<div class="flex items-center gap-2 text-zinc-400">
<span class="material-symbols-outlined text-sm">restaurant</span>
<span class="text-label-md uppercase tracking-wider font-bold">Main Course</span>
</div>
</div>
</div>
<!-- Dish Card 2 -->
<div class="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_40px_40px_-15px_rgba(99,14,212,0.04)] hover:scale-[1.02] transition-all duration-300 flex flex-col">
<div class="h-64 relative overflow-hidden">
<img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="vibrant gourmet salad bowl with fresh greens, avocado, pomegranate seeds, and honey-glazed goat cheese, top-down view" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB33AxzGnL87ZZRWNlSct841Difb7dSKQKX4BlpQnHB2AMvGKR1-D4e72aVDOqK_1gf2Jc5jhpPEGeyP6fTqUOs3-ZwNrfmSPdQ7oiZq-aaA3v2dVNYL_qIqVZfl55apUIpFKkyMHtbl_jYJ-pmOuT4I__9MDOxrO2Gobx3GUsRUef56GMFZdMX-KMCVgJ5JeRrb6kmuLRmjd8C8xvdshzKiDDm67zapzBY27IoiWwqi6Zzm6MoDsV3MNDaOhLaOkM_jAhvSQA_RBd2"/>
<div class="absolute top-4 left-4 bg-emerald-500/90 text-white px-4 py-1.5 rounded-full text-label-md font-bold glass-effect">Active</div>
<div class="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-3 bg-white/90 rounded-full text-zinc-800 hover:text-primary transition-colors glass-effect shadow-lg"><span class="material-symbols-outlined">edit</span></button>
<button class="p-3 bg-white/90 rounded-full text-zinc-800 hover:text-error transition-colors glass-effect shadow-lg"><span class="material-symbols-outlined">delete</span></button>
</div>
</div>
<div class="p-8 flex-1 flex flex-col">
<div class="flex justify-between items-start mb-2">
<h3 class="text-title-lg font-bold text-zinc-900 leading-snug">Honey-Glazed Goat Cheese Salad</h3>
<span class="text-title-lg font-bold text-primary">$18.50</span>
</div>
<p class="text-body-lg text-on-surface-variant flex-1 mb-6">Artisan mixed greens, roasted walnuts, and warm goat cheese medallions drizzled with wildflower honey.</p>
<div class="flex items-center gap-2 text-zinc-400">
<span class="material-symbols-outlined text-sm">restaurant</span>
<span class="text-label-md uppercase tracking-wider font-bold">Appetizers</span>
</div>
</div>
</div>
<!-- Dish Card 3 -->
<div class="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_40px_40px_-15px_rgba(99,14,212,0.04)] hover:scale-[1.02] transition-all duration-300 flex flex-col opacity-75">
<div class="h-64 relative overflow-hidden">
<img class="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-110" data-alt="decadent chocolate fondant with a molten center, served with vanilla bean gelato and raspberry coulis, moody elegant lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4U_MTKbwni2b6CPaNgW7xk2qMoov2ok1oqAlFCgghbrHXSwhb01_qe2QZvvL8P9cbteErzbBbzzvww0ifq3y9G_Ezdcn6kQAbMxC7e0646guTL-y87R9CLC-vW1IqC6XWLdI3ekUl8seOVYJtWFeOgG9zKYUar4zQctfp-NI2ADUgXZr5ntXeVL9wnEMj-lxvSVnbR5B6hSGmld9UKJH-aEdjESwfWiH90StIB063l_bst_dZRYvgiceLS161mFOSPvKF2wOaCzEO"/>
<div class="absolute top-4 left-4 bg-zinc-500/90 text-white px-4 py-1.5 rounded-full text-label-md font-bold glass-effect">Inactive</div>
<div class="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-3 bg-white/90 rounded-full text-zinc-800 hover:text-primary transition-colors glass-effect shadow-lg"><span class="material-symbols-outlined">edit</span></button>
<button class="p-3 bg-white/90 rounded-full text-zinc-800 hover:text-error transition-colors glass-effect shadow-lg"><span class="material-symbols-outlined">delete</span></button>
</div>
</div>
<div class="p-8 flex-1 flex flex-col">
<div class="flex justify-between items-start mb-2">
<h3 class="text-title-lg font-bold text-zinc-900 leading-snug">Molten Lava Noir</h3>
<span class="text-title-lg font-bold text-primary">$14.00</span>
</div>
<p class="text-body-lg text-on-surface-variant flex-1 mb-6">70% dark chocolate cake with a melting heart, served with Madagascar vanilla bean ice cream.</p>
<div class="flex items-center gap-2 text-zinc-400">
<span class="material-symbols-outlined text-sm">restaurant</span>
<span class="text-label-md uppercase tracking-wider font-bold">Desserts</span>
</div>
</div>
</div>
</section>
<!-- Spacer for the modal view at bottom or as standalone section -->
<div class="h-20"></div>
</div>
</main>
<!-- Static Backdrop/Overlay for "Modal" (Demonstration) -->
<div class="fixed inset-0 bg-zinc-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-6 hidden group-hover/modal:flex">
<!-- Add/Edit Dish Form Modal Content -->
<div class="bg-white rounded-xl w-full max-w-4xl max-h-[921px] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-300">
<div class="p-10">
<div class="flex justify-between items-center mb-10">
<div>
<h2 class="text-headline-md font-bold text-zinc-900">Add New Dish</h2>
<p class="text-body-lg text-on-surface-variant">Provide the exquisite details for your new menu creation.</p>
</div>
<button class="p-2 hover:bg-zinc-100 rounded-full transition-colors">
<span class="material-symbols-outlined text-zinc-400">close</span>
</button>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-12">
<!-- Left: Media Upload -->
<div class="space-y-6">
<label class="text-label-md font-bold uppercase tracking-widest text-zinc-500">Dish Imagery</label>
<div class="aspect-video bg-surface-container-low border-2 border-dashed border-outline-variant/40 rounded-lg flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-surface-container-high transition-all group/upload">
<div class="p-6 bg-white rounded-full shadow-sm group-hover/upload:scale-110 transition-transform">
<span class="material-symbols-outlined text-primary text-3xl">cloud_upload</span>
</div>
<div class="text-center">
<p class="text-body-lg font-bold text-zinc-900">Upload high-res photo</p>
<p class="text-label-md text-on-surface-variant">Recommended: 1600x900px, PNG or JPG</p>
</div>
</div>
<div class="p-6 bg-primary-fixed/20 rounded-lg border border-primary-fixed-dim/30">
<p class="text-label-md font-bold text-on-primary-fixed-variant leading-relaxed">
<span class="material-symbols-outlined align-middle mr-1 text-base">info</span>
                                Tip: High-quality lighting and plating can increase orders by up to 25%.
                            </p>
</div>
</div>
<!-- Right: Form Fields -->
<div class="space-y-8">
<div class="space-y-2">
<label class="text-label-md font-bold uppercase tracking-widest text-zinc-500">Dish Name</label>
<input class="w-full bg-surface-container-low border-none rounded-md py-4 px-6 focus:ring-1 focus:ring-primary/40 font-body text-body-lg" placeholder="e.g. Wagyu Ribeye with Truffle Jus" type="text"/>
</div>
<div class="grid grid-cols-2 gap-6">
<div class="space-y-2">
<label class="text-label-md font-bold uppercase tracking-widest text-zinc-500">Category</label>
<div class="relative">
<select class="w-full appearance-none bg-surface-container-low border-none rounded-md py-4 px-6 focus:ring-1 focus:ring-primary/40 font-body text-body-lg">
<option>Main Course</option>
<option>Appetizers</option>
<option>Desserts</option>
<option>Drinks</option>
</select>
<span class="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">expand_more</span>
</div>
</div>
<div class="space-y-2">
<label class="text-label-md font-bold uppercase tracking-widest text-zinc-500">Price ($)</label>
<input class="w-full bg-surface-container-low border-none rounded-md py-4 px-6 focus:ring-1 focus:ring-primary/40 font-body text-body-lg" placeholder="0.00" type="number"/>
</div>
</div>
<div class="space-y-2">
<label class="text-label-md font-bold uppercase tracking-widest text-zinc-500">Description</label>
<textarea class="w-full bg-surface-container-low border-none rounded-md py-4 px-6 focus:ring-1 focus:ring-primary/40 font-body text-body-lg resize-none" placeholder="Describe the flavors, ingredients, and preparation..." rows="4"></textarea>
</div>
<div class="flex items-center justify-between p-4 bg-zinc-50 rounded-lg">
<div class="flex flex-col">
<span class="text-body-lg font-bold text-zinc-900">Active Status</span>
<span class="text-label-md text-on-surface-variant">Should this dish be visible to diners?</span>
</div>
<button class="w-12 h-6 bg-primary rounded-full relative flex items-center px-1">
<div class="bg-white w-4 h-4 rounded-full ml-auto"></div>
</button>
</div>
</div>
</div>
<div class="mt-12 pt-8 border-t border-zinc-100 flex justify-end gap-4">
<button class="px-8 py-3 text-on-surface-variant font-bold hover:text-primary transition-colors">Cancel</button>
<button class="px-12 py-3 bg-primary text-on-primary rounded-lg font-bold shadow-lg hover:bg-primary-container transition-all active:scale-95">Save Creation</button>
</div>
</div>
</div>
</div>
</body></html>