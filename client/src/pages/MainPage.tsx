import { ModeToggle } from "@/components/toggle-theme";
import Packet from "@/MyComponents/Packet";
import Search from "@/MyComponents/Search";
import { RootState } from "@/store/store";
import { dnsResponseMain } from "@/types/types";
import { useSelector } from "react-redux";

export default function MainPage() {
    const data: dnsResponseMain | [] = useSelector((state: RootState) => state.dns.data);
    const returnAnswer = (data: dnsResponseMain | []) => {
        if (!Array.isArray(data)) {
            const ipAdress = data.data[data.data.length - 1].answer?.map((a) => {
                return a.RDATA
            })
            return ipAdress
        }
        else return null
    }
    return (
        <div className="dark:text-white flex flex-col p-3">
            <div className="font-extrabold text-3xl flex justify-between">
                DNS Resolver
                <ModeToggle />
            </div>
            <div className="justify-center flex ">
                <Search />
            </div>
            <div className="flex justify-center mt-10">{returnAnswer(data) !== null && returnAnswer(data)?.length &&
                <div className="font-bold text-xl flex">
                    Resovled Ip Address Are:
                    <div className="text-lime-300">
                        {returnAnswer(data)?.join(' , ')}
                    </div>
                </div>
            }</div>
            <div className="flex justify-center mt-10">{!returnAnswer(data)?.length && <div className="font-bold text-xl flex">No Ip Address Resolved</div>}</div>
            <div className="mt-10">
                {!Array.isArray(data) && data.data.map((d, index) => (
                    <div className="my-3" key={index}>
                        <Packet data={d} packetNumber={index} />
                    </div>
                ))}
            </div>
        </div>
    );
}
