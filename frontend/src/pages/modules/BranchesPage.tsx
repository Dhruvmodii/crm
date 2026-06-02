import { useState, useMemo } from "react";
import { PageHeader } from "../../components/erp/PageHeader";
import { SectionCard } from "../../components/erp/SectionCard";
import { useToast } from "../../layout/ToastProvider";
import {
  Building2,
  Phone,
  MapPin,
  Copy,
  Check,
} from "lucide-react";

interface BranchInfo {
  id: string;
  name: string;
  phone: string;
  address: string;
  locationLink: string;
}

const BRANCHES_DATA: BranchInfo[] = [
  {
    id: "BR-01",
    name: "Delhi Gate Clinic",
    phone: "+91 98101 23456",
    address: "12, Netaji Subhash Marg, Daryaganj, near Delhi Gate Metro Station, New Delhi, 110002",
    locationLink: "https://maps.google.com/?q=Delhi+Gate+Metro+Station",
  },
  {
    id: "BR-02",
    name: "Noida Clinic",
    phone: "+91 98188 11223",
    address: "C-56, Sector 62, Landmark: Near Fortis Hospital, Noida, Uttar Pradesh, 201301",
    locationLink: "https://maps.google.com/?q=Sector+62+Noida",
  },
  {
    id: "BR-03",
    name: "Laxmi Nagar Clinic",
    phone: "+91 99100 44556",
    address: "A-24, Main Vikas Marg, near Laxmi Nagar Metro Station Gate No. 1, East Delhi, 110092",
    locationLink: "https://maps.google.com/?q=Laxmi+Nagar+East+Delhi",
  },
  {
    id: "BR-04",
    name: "Ghaziabad Clinic",
    phone: "+91 88002 23344",
    address: "SF-14, Second Floor, Opulent Mall, Gandhi Nagar, Grand Trunk Road, Ghaziabad, Uttar Pradesh, 201001",
    locationLink: "https://maps.google.com/?q=Opulent+Mall+Ghaziabad",
  },
];

export function BranchesPage() {
  const { pushToast } = useToast();
  const [selectedBranchId, setSelectedBranchId] = useState<string>(BRANCHES_DATA[0].id);

  const selectedBranch = useMemo(() => {
    return BRANCHES_DATA.find((b) => b.id === selectedBranchId) || BRANCHES_DATA[0];
  }, [selectedBranchId]);

  function handleCopyDetails() {
    const textToCopy = `🏢 ${selectedBranch.name}\n📞 Phone: ${selectedBranch.phone}\n📍 Address: ${selectedBranch.address}\n🗺️ Location: ${selectedBranch.locationLink}`;
    navigator.clipboard.writeText(textToCopy);
    pushToast("Branch details copied to clipboard!", "success");
  }

  return (
    <section className="stack">
      <PageHeader
        title="Clinic Branches"
        subtitle="View physical addresses, maps locations, and phone numbers of all Softone branches."
      />

      <div className="w-full stack gap-6">
        {/* Left Side: Branch Selector List */}
        <div className="w-full stack gap-4">
          <SectionCard title="Select a Branch">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {BRANCHES_DATA.map((branch) => (
                <button
                  key={branch.id}
                  type="button"
                  onClick={() => setSelectedBranchId(branch.id)}
                  className={`p-5 rounded-2xl text-left border transition-all flex flex-col justify-between h-40 ${
                    selectedBranchId === branch.id
                      ? "bg-blue-50/50 border-blue-500 shadow-md shadow-blue-50"
                      : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                  }`}
                >
                  <div className="flex items-start justify-between w-full">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl ${
                        selectedBranchId === branch.id ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                      }`}>
                        <Building2 size={18} />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-800 text-sm">{branch.name}</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{branch.id}</p>
                      </div>
                    </div>
                    {selectedBranchId === branch.id && (
                      <span className="p-1 bg-blue-100 text-blue-700 rounded-full">
                        <Check size={12} />
                      </span>
                    )}
                  </div>

                  <div className="stack gap-1.5 text-xs text-slate-600 font-semibold mt-4">
                    <div className="flex items-center gap-1.5">
                      <Phone size={13} className="text-slate-400" />
                      <span>{branch.phone}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-slate-400 shrink-0" />
                      <span className="truncate max-w-[180px]">{branch.address}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </SectionCard>

          {/* Detailed Selected Branch View */}
          <SectionCard title="Branch Contact & Location Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="stack gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Clinic Name</span>
                  <p className="text-base font-black text-slate-800">{selectedBranch.name}</p>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone Number</span>
                  <p className="text-sm font-bold text-blue-600">{selectedBranch.phone}</p>
                </div>
              </div>

              <div className="stack gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Address Location</span>
                  <p className="text-xs font-semibold text-slate-600 leading-relaxed">{selectedBranch.address}</p>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Google Maps Link</span>
                  <a
                    href={selectedBranch.locationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-indigo-600 hover:underline inline-flex items-center gap-1"
                  >
                    <MapPin size={12} /> View on Google Maps
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4 mt-4">
              <button
                type="button"
                onClick={handleCopyDetails}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-2 transition-all w-fit"
              >
                <Copy size={14} /> Copy Branch Details
              </button>
            </div>
          </SectionCard>
        </div>
      </div>
    </section>
  );
}
