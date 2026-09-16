import React from 'react';
import { ShieldCheck, Mail, Phone, MapPin, ExternalLink, Heart } from 'lucide-react';
import { NewsCategory } from '../types';

interface FooterProps {
  onSelectCategory: (cat: NewsCategory) => void;
  onOpenCitizenModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenCitizenModal }) => {
  return (
    <footer className="bg-[#0e1014] text-neutral-300 border-t border-neutral-800 pt-12 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-neutral-800">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <span className="font-headline text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
                PORTAL MEDIA
              </span>
              <p className="text-xs text-rose-500 font-semibold tracking-widest uppercase mt-0.5">
                Kanal Warta & Jurnalisme Digital Independen
              </p>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-md">
              Portal Media berkomitmen menyajikan karya jurnalisme bermartabat, berimbang, dan berdaya guna bagi kemajuan masyarakat Indonesia. Kami menjunjung tinggi verifikasi fakta dan transparansi ruang publik.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Mematuhi Pedoman Pemberitaan Media Siber (PPMS)</span>
            </div>
          </div>

          {/* Kanal Kategori (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Kanal Pemberitaan
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              {(['Nasional', 'Ekonomi', 'Teknologi', 'Gaya Hidup', 'Olahraga', 'Opini', 'Lingkungan'] as NewsCategory[]).map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-rose-400 transition-colors"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Redaksi & Interaksi (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Ruang Redaksi & Partisipasi
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Miliki informasi berharga di sekitar Anda? Salurkan suara dan liputan warga Anda melalui rubrik jurnalisme publik kami.
            </p>

            <button
              onClick={onOpenCitizenModal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-colors shadow"
            >
              <span>Kirim Liputan Warga</span>
            </button>

            <div className="pt-2 text-xs text-neutral-500 space-y-1">
              <p>Email Redaksi: redaksi@portalmedia.id</p>
              <p>Pengaduan Pembaca: ombudsman@portalmedia.id</p>
            </div>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} PORTAL MEDIA DIGITAL INDONESIA. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-neutral-400 transition-colors">Pedoman Hak Cipta</a>
            <span>•</span>
            <a href="#" className="hover:text-neutral-400 transition-colors">Kebijakan Privasi</a>
            <span>•</span>
            <a href="#" className="hover:text-neutral-400 transition-colors">Standar Dewan Pers</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
