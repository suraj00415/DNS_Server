import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { simpleDnsResponse } from "@/types/types"
import Table from "./Table"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { useState } from "react"


export default function Packet({ data, packetNumber }: { data: simpleDnsResponse, packetNumber: number }) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <Collapsible>
            <CollapsibleTrigger
                onClick={() => setIsOpen((prev) => !prev)}
                className="mx-auto flex p-3 dark:hover:bg-zinc-700 rounded-2xl w-[80%] justify-between items-center bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 font-bold "
            >
                <div className="flex flex-col items-start">
                    <div>
                        Recursion Number {packetNumber + 1}
                    </div>
                    <div className="text-sm font-medium text-blue-400">
                        {data.header.RCODE === 0 ? data.message : <div className="text-red-500">Some Error Occured / {data.message}</div>}
                    </div>
                </div>
                <div>
                    {!isOpen ? <IoIosArrowDown />
                        : <IoIosArrowUp />}
                </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
                <Table data={data} />
            </CollapsibleContent>
        </Collapsible>
    )
}
