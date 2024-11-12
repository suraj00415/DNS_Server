import { simpleDnsResponse } from "@/types/types";

export default function Table({ data }: { data: simpleDnsResponse }) {
  return (
    <div className="flex flex-col mt-10 mx-auto w-[70%]">
      <div className="font-bold text-2xl mb-4">DNS Response Data</div>

      {/* Header Section */}
      <div className="flex flex-col border border-zinc-600 rounded-xl p-3 gap-3 mb-4 dark:bg-zinc-800 bg-zinc-100">
        <div className="font-bold text-lg border-b border-zinc-700">Header</div>
        <div className="flex gap-1 flex-wrap ">
          {Object.entries(data.header).map(([key, value]) => (
            <div key={key} className="flex justify-between font-medium border-r  px-2 border-zinc-600">
              <span>{key}:{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Question Section */}
      <div className="flex flex-col border border-zinc-600 rounded-xl p-3 gap-3 mb-4 dark:bg-zinc-800 bg-zinc-100">
        <div className="font-bold text-lg border-b border-zinc-700">Question</div>
        {data.question.map((q, index) => (
          <div key={index} className="flex flex-row gap-10 font-medium flex-wrap">
            <div>QNAME: <span className="text-lime-300">{q.QNAME}</span></div>
            <div>QTYPE: {q.QTYPE}</div>
            <div>ClassCode: {q.ClassCode}</div>
          </div>
        ))}
      </div>

      {/* Answer Section */}
      {data.answer && data.answer.length > 0 && (
        <div className="flex flex-col border border-zinc-600 rounded-xl p-3 gap-3 mb-4 dark:bg-zinc-800 bg-zinc-100">
          <div className="font-bold text-lg border-b border-zinc-700">Answer</div>
          <div className="flex flex-wrap gap-10">
            {data.answer.map((ans, index) => (
              <div key={index} className="flex flex-col gap-1 dark:bg-zinc-900 p-3 rounded-xl border border-zinc-700">
                {Object.entries(ans).map(([key, value]) => (
                  <div key={key} className="flex gap-1 font-medium">
                    <span>{key}:</span> <span>{value}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Authority Section */}
      {data.authority && data.authority.length > 0 && (
        <div className="flex flex-col border border-zinc-600 rounded-xl p-3 gap-3 mb-4 dark:bg-zinc-800 bg-zinc-100">
          <div className="font-bold text-lg border-b border-zinc-700">Authority</div>
          <div className="flex flex-wrap gap-10">
            {data.authority.map((ans, index) => (
              <div key={index} className="flex flex-col gap-1 dark:bg-zinc-900 p-3 rounded-xl border border-zinc-700">
                {Object.entries(ans).map(([key, value]) => (
                  <div key={key} className="flex gap-1 font-medium">
                    <span>{key}:</span> <span>{value}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Additional Section */}
      {data.additional && data.additional.length > 0 && (
        <div className="flex flex-col border border-zinc-600 rounded-xl p-3 gap-3 mb-4 dark:bg-zinc-800 bg-zinc-100">
          <div className="font-bold text-lg border-b border-zinc-700">Additional</div>
          <div className="flex flex-wrap gap-10">
            {data.additional.map((ans, index) => (
              <div key={index} className="flex flex-col gap-1 dark:bg-zinc-900 p-3 rounded-xl border border-zinc-700">
                {Object.entries(ans).map(([key, value]) => (
                  <div key={key} className="flex gap-1 font-medium">
                    <span>{key}:</span> <span>{value}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
