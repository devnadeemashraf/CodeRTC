/* eslint-disable @typescript-eslint/no-explicit-any */
import { decode } from "js-base64";

import { Badge } from "@/components/ui/badge";

const Outputs = ({ outputDetails }: { outputDetails: any }) => {
  const getOutput = () => {
    const statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // compilation error
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {decode(outputDetails?.compile_output)}
        </pre>
      );
    } else if (statusId === 3) {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-green-500">
          {outputDetails.stdout !== null
            ? `${decode(outputDetails.stdout)}`
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {`Time Limit Exceeded`}
        </pre>
      );
    } else {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {decode(outputDetails?.stderr)}
        </pre>
      );
    }
  };

  return (
    <>
      <Badge className="select-none">Output</Badge>
      <div className="w-full h-full rounded-md text-white/70 font-normal text-lg overflow-y-auto px-2 pb-10 py-2">
        {outputDetails ? <>{getOutput()}</> : null}
      </div>
    </>
  );
};

export default Outputs;
