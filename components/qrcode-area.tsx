
import { Loader2 } from "lucide-react";
import Image from "next/image";

interface QRCodeAreaProps {
  base64: string;
  loading: boolean;
}

export const QRCodeArea = ({
  base64,
  loading
}: QRCodeAreaProps) => {
  return (
    <div className="flex justify-center items-center">
      {loading ? (
        <Loader2 className="animate-spin text-zinc-500 w-8 h-8" />
      ) : (
        <Image
          alt="qrcode"
          src={base64}
          width={400}
          height={400}
        />
      )}
    </div>

  )
}