import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent as TabsContentHolder } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

import PlaygroundCard from "./playground-card";

import withNavigateOnClick from "@/hoc/withNavigateOnClick";

import { useAppDispatch } from "@/hooks/useTypedRTK";

interface TabsContentProps {
  loading: boolean;
  value: string;
  title: string;
  description: string;
  rooms: IRoom[];
}

const TabsContent = ({
  loading,
  value,
  title,
  description,
  rooms,
}: TabsContentProps) => {
  const dispatch = useAppDispatch();

  const [tabContentRooms, setTabContentRooms] = useState<IRoom[]>(rooms);

  useEffect(() => {
    setTabContentRooms(rooms);
  }, [rooms]);

  return (
    <TabsContentHolder value={value} className="h-full">
      <Card>
        <CardHeader className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 space-y-4">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>

          {/* <Pagination /> */}
        </CardHeader>
        {tabContentRooms.length < 1 ? (
          <CardContent className="h-full grid grid-cols-1 gap-4">
            <h1 className="w-full text-center text-muted font-mono text-lg select-none flex flex-col items-center">
              {"(>'-'<)"}
              <span>It's all empty here</span>
            </h1>
          </CardContent>
        ) : (
          <CardContent className="h-full grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-4">
            {loading == true ? (
              <>
                <Skeleton className="h-[150px] min-w-[350px] rounded-md bg-accent/20" />
                <Skeleton className="h-[150px] min-w-[350px] rounded-md bg-accent/20" />
              </>
            ) : (
              tabContentRooms.map((room) => {
                const ClickablePlaygroundCard = withNavigateOnClick(
                  PlaygroundCard,
                  `/playground/${room.id}`
                );
                return <ClickablePlaygroundCard key={room.id} room={room} />;
              })
            )}
          </CardContent>
        )}
        <CardFooter>
          {/* <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div> */}
        </CardFooter>
      </Card>
    </TabsContentHolder>
  );
};

export default TabsContent;
