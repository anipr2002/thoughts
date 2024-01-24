import { useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import { AiOutlineDownload } from "react-icons/ai";
import useTextEditorStore from "@/store/textEditorStore";

export const DownloadDialog = () => {
  const { downloadTxtFile, downloadName, setDownloadName } =
    useTextEditorStore();
  const dialogTriggerRef = useRef();

  useEffect(() => {
    if (dialogTriggerRef.current) {
      (dialogTriggerRef.current as HTMLElement)?.click();
    }
  }, [dialogTriggerRef]);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild ref={dialogTriggerRef}>
          <AiOutlineDownload
            size={40}
            className="opacity-50 hover:opacity-100 transition-all ease-in"
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] dark">
          <DialogHeader>
            <DialogTitle className="text-center text-[#F8A28E]">
              Download Text File
            </DialogTitle>
            <DialogDescription className="pt-4 text-center max-w-prose">
              Click 'Download' to start downloading the file. If unsure, click
              'Cancel'.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right text-white">
                Filename
              </Label>
              <input
                type="text"
                id="name"
                value={downloadName}
                onChange={(e) => setDownloadName(e.target.value)}
                className="col-span-3 border border-white rounded-md bg-[#0A0A0A] text-white p-2"
                placeholder="Enter filename"
              />
            </div>
          </div>
          <DialogFooter className="flex justify-between">
            <Button type="submit" onClick={downloadTxtFile}>
              Save changes
            </Button>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
