import Link from 'next/link';

const footerLinks = {
  Company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Careers', href: '#' },
    { name: 'Blog', href: '#' },
  ],
  Shop: [
    { name: 'All Products', href: '/shop' },
    { name: 'New Arrivals', href: '/shop?sort=newest' },
    { name: 'Deals', href: '/shop?deals=true' },
    { name: 'Gift Cards', href: '#' },
  ],
  Support: [
    { name: 'FAQ', href: '#' },
    { name: 'Shipping Info', href: '#' },
    { name: 'Returns & Exchanges', href: '#' },
    { name: 'Warranty', href: '#' },
  ],
  Categories: [
    { name: 'Phones', href: '/category/phones' },
    { name: 'Gaming', href: '/category/gaming' },
    { name: 'Audio', href: '/category/audio' },
    { name: 'Wearables', href: '/category/wearables' },
    { name: 'Accessories', href: '/category/accessories' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#12125a] text-white mt-auto">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="2" width="14" height="22" rx="2.5" stroke="white" strokeWidth="2" fill="none"/>
                <circle cx="13" cy="21" r="1" fill="white"/>
                <rect x="21" y="7" width="2.5" height="2.5" rx="0.5" fill="white"/>
                <rect x="24.5" y="4.5" width="2" height="2" rx="0.5" fill="white" opacity="0.6"/>
                <path d="M4 20 Q13 15 26 19" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
              </svg>
              <div className="leading-tight">
                <span className="block font-bold text-base tracking-tight text-white">YeezyTech</span>
                <span className="block text-[10px] font-semibold tracking-wider text-white/60 -mt-0.5">GADGETS</span>
              </div>
            </Link>
            <p className="mt-4 text-sm text-white/50 leading-relaxed max-w-[280px]">
              Powering Smart Living. Premium electronics and accessories — authentic products, fast delivery, and expert support.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-4">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500">
            &copy; {new Date().getFullYear()} YeezyTech Gadgets. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-zinc-500">Visa</span>
            <span className="text-xs text-zinc-500">Mastercard</span>
            <span className="text-xs text-zinc-500">Apple Pay</span>
            <span className="text-xs text-zinc-500">PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
