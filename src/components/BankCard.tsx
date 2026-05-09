import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ExternalLink, Info } from "lucide-react";
import type { Bank } from "@/data/banks";
import { BankLogo } from "./BankLogo";
import { pushRecent } from "@/lib/favorites";

function openOfficial(bank: Bank) {
  pushRecent(bank.id);
  if (typeof window !== "undefined") {
    window.open(bank.website, "_blank", "noopener,noreferrer");
  }
}

export function BankCard({ bank, index = 0 }: { bank: Bank; index?: number }) {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index, 10) * 0.03 }}
      className="glass shadow-soft rounded-2xl flex items-center gap-3 active:scale-[0.99] transition-transform"
    >
      <button
        onClick={() => openOfficial(bank)}
        className="flex items-center gap-3 flex-1 min-w-0 p-4 text-left"
        aria-label={`Open ${bank.name} official website`}
      >
        <BankLogo bank={bank} />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground truncate text-[15px]">{bank.name}</p>
          <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
            <ExternalLink className="w-3 h-3" /> {bank.category}
          </p>
        </div>
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate({ to: "/banks/$bankId", params: { bankId: bank.id } });
        }}
        aria-label={`View ${bank.name} details`}
        className="p-4 text-muted-foreground hover:text-foreground"
      >
        <Info className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

export function BankTile({ bank }: { bank: Bank }) {
  return (
    <button
      onClick={() => openOfficial(bank)}
      className="glass shadow-soft rounded-2xl p-4 flex flex-col items-center gap-2 min-w-[110px] active:scale-95 transition-transform"
      aria-label={`Open ${bank.name} official website`}
    >
      <BankLogo bank={bank} size="lg" />
      <p className="text-[11px] font-medium text-foreground text-center line-clamp-1">
        {bank.shortName}
      </p>
    </button>
  );
}

export function BankGridCard({ bank }: { bank: Bank }) {
  const navigate = useNavigate();
  return (
    <div className="glass shadow-soft rounded-2xl p-4 flex flex-col items-center text-center gap-2">
      <button onClick={() => openOfficial(bank)} className="contents" aria-label={`Open ${bank.name}`}>
        <BankLogo bank={bank} size="lg" />
        <p className="text-xs font-semibold text-foreground line-clamp-2 mt-2">{bank.shortName}</p>
      </button>
      <button
        onClick={() => navigate({ to: "/banks/$bankId", params: { bankId: bank.id } })}
        className="text-[10px] text-muted-foreground"
      >
        Details
      </button>
    </div>
  );
}