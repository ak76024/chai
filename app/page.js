"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchAdminPayment } from "@/actions/useraction";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const [payment, setpayment] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      let payments = await fetchAdminPayment(session?.user?.email);
      setpayment(payments);
    };
    if (session?.user?.email) {
      fetchData();
    }
  }, [session]);

  return (
    <div className="px-4 w-full">
      <div className="flex md:flex-row flex-col justify-around items-center min-h-[83vh]">
        <div className="font-bold text-3xl">
          <p className="flex items-center gap-2 justify-center">Buy me a Chai <span><img src="/tea.gif" width={60} alt="" /></span></p>
          <p className="text-center">A funding platform for creators...</p>
        </div>
        {!session && (
          <div className="text-center flex gap-4">
            <Link href="/login">
              <button>Start Now</button>
            </Link>
            <Link href="/about">
              <button>Read More...</button>
            </Link>
            <a href="https://www.instagram.com/Ak76024/" target="_blank" rel="noopener noreferrer">
              <button>Created By Ak76024</button>
            </a>
          </div>
        )}
        {session && (
          <div className="text-center flex-col flex gap-4">
            <p className="text-xl">Payments Received: <span className="font-semibold">{payment.paytment}</span></p>
            <p className="text-xl">Total Earnings: <span className="font-semibold !text-green-500">₹{payment.total}</span></p>
            <button onClick={() => router.push("/payments")}>View Payments Details</button>
          </div>
        )}
      </div>
    </div>
  );
}