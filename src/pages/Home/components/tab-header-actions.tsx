/* eslint-disable @typescript-eslint/no-unused-vars */

import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import PlaygroundCreationForm from "./playground-creation-form";
import PlaygroundJoiningForm from "./playground-joining-form";

const TabHeaderActions = () => {
  return (
    <div className="ml-auto flex items-center gap-2">
      {/* Playgrounds Menu */}
      <JoinPlaygroundAction />
      <CreatePlaygroundAction />
    </div>
  );
};

export const JoinPlaygroundAction = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1" variant="secondary">
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Join
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join Playground</DialogTitle>
          <DialogDescription>
            Make sure you enter the Playground ID as it is.
          </DialogDescription>
        </DialogHeader>

        <PlaygroundJoiningForm />
      </DialogContent>
    </Dialog>
  );
};

export const CreatePlaygroundAction = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5 mt-1 mr-1" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Playground
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Playground</DialogTitle>
          <DialogDescription>
            Playgrounds can take time to create. Please have patience.
          </DialogDescription>
        </DialogHeader>

        <PlaygroundCreationForm />
      </DialogContent>
    </Dialog>
  );
};

export default TabHeaderActions;
