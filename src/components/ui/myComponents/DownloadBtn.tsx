import { Download } from "lucide-react";
import { Button } from "../button";

const DownloadBtn = ({ link, text }: { link: string[] | string; text: string }) => {
  const normalizedLinks = Array.isArray(link)
    ? link
    : link.split(',').map((url) => url.trim());

    console.log(normalizedLinks);
    

  const download = () => {
    normalizedLinks.forEach((l, i) => {
      const a = document.createElement("a");
      a.href = l;
      a.download = l.split("/").pop() || `file-${i}`;
      a.target = "_blank";

      setTimeout(() => {
        a.click();
      }, i * 500); // stagger to avoid popup blocking
    });
  };

  return (
    <Button
      className="text-white px-4 py-2 bg-primary hover:bg-primary/90"
      onClick={download}
    >
      <Download className="mr-2 h-4 w-4" /> {text}
    </Button>
  );
};

export default DownloadBtn;